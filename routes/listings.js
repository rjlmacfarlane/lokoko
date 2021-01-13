/* eslint-disable camelcase */
/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const router = express.Router();
const moment = require('moment');
moment().format();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
}));

module.exports = (db) => {

  // Set user session
  router.get('/login/:id', (req, res) => {

    const userID = req.params.id;

    req.session.user_id = userID;
    res.redirect('/');

  });

  // Get all listings:
  router.get("/", (req, res) => {

    delete req.session.user_id;
    const userID = req.session.user_id;

    db.query(`SELECT * FROM listings;`)
      .then(data => {

        const templateVars = {
          user: userID,
          listings: data.rows
        };
        res.render('index', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });


  // Get listings by search term:
  router.get("/listings", (req, res) => {

    const userID = req.session.user_id;
    // Beginning of query
    let queryString = `SELECT * FROM listings`;
    let queryValues = [];
    let whereString = ' WHERE ';

    // Add applicable params to WHERE string
    if (req.query.search) {
      if (queryValues.length > 0) {
        whereString += ' AND ';
      }
      queryValues.push(`%${req.query.search}%`);
      whereString += `(LOWER(title) LIKE LOWER($${queryValues.length}) OR LOWER(description) LIKE LOWER($${queryValues.length}))`;
    }

    if (req.query.min_price) {
      if (queryValues.length > 0) {
        whereString += ' AND ';
      }
      queryValues.push(parseInt(req.query.min_price));
      whereString += ` price > $${queryValues.length}`;
    }

    if (req.query.max_price) {
      if (queryValues.length > 0) {
        whereString += ' AND ';
      }
      queryValues.push(parseInt(req.query.max_price));
      whereString += ` price < $${queryValues.length}`;
    }

    if (queryValues.length > 0) {
      queryString += whereString;
    }
    // End of query
    queryString += `ORDER BY posted_date DESC;`;

    db.query(queryString, queryValues)
      .then(data => {
        const templateVars = {
          user: userID,
          listings: data.rows,
        };
        // Add seatch string if exists
        if (req.query.search) {
          templateVars["search_string"] = req.query.search;
        }

        res.render('listings', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('listings', err.message);
      });
  });

  // Show a single listing:
  router.get("/listings/:id", (req, res) => {
    const userID = req.session.user_id;
    db.query(`
    SELECT * FROM listings
    JOIN users ON users.id = user_id
    WHERE listings.id = $1;
    `, [req.params.id])
      .then(data => {
        //console.log(data.rows)
        const templateVars = {

          user: userID,
          title: data.rows[0].title,
          description: data.rows[0].description,
          cover_photo: data.rows[0].main_photo_url,
          price: data.rows[0].price,
          posted_date: moment(data.rows[0].posted_date).fromNow(),
          user_name: data.rows[0].name

        };
        res.render('listing_show', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Post a new listing form:
  router.get('/new', (req, res) => {
    const userID = req.session.user_id;
    const templateVars = {

      user: userID

    };
    res.render('listing_new', templateVars);
  });

  // Post a new listing
  router.post("/listings", (req, res) => {

    const userID = req.session.user_id;
    let listing = req.body;


    const queryString = `INSERT INTO listings (title, description, thumbnail_photo_url, main_photo_url, price, condition, posted_date, category_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;

    const values = [listing.title, listing.description, listing.thumbnail_photo_url, listing.main_photo_url, listing.price, listing.condition, moment(Date.now()).format(), listing.category_id, userID];

    db.query(queryString, values)
      .then(data => {
        res.redirect(`/listings/${data.rows[0].id}`);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Update an existing listing:
  router.put("/listings/:id", (req, res) => {
    db.query(`SELECT * FROM listings;`)               // Finish: create a query which locates a listing by ID and updates it with new data
      .then(data => {
        const templateVars = {



        };
        res.render(`/listings/:${req.body.id}`, templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Delete a listing:
  router.delete("listings/:id", (req, res) => {
    db.query(`SELECT * FROM listings;`)                    // Finish: create a query which locates a listing by ID and deletes it from the database
      .then(
        res.redirect(`/`)
      )
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Show entire database:
  router.get("/listings/:id", (req, res) => {
    db.query(`SELECT * FROM listings;`)                    // (Temporary DEV-only route): create a query which returns the entire database, all tables
      .then(data => {
        const templateVars = {



        };
        res.render('dev', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  return router;
};
