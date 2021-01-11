/* eslint-disable camelcase */
/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bodyParser = require('body-parser');
const router  = express.Router();
const moment = require('moment');
moment().format();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

module.exports = (db) => {

  // Get all listings:
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)  // This query should be good as-is
      .then(data => {
        const templateVars = {
          listings: data.rows
        };
        console.log(data.rows);
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
    db.query(`SELECT * FROM listings;`)  // Finish: create a query which accepts fuzzy search terms (i.e., LIKE %searchterm%)
      .then(data => {
        const templateVars = { //Finish: update templateVars to pull the searched listings
          listings: data.rows
        };
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

    db.query(`
    SELECT * FROM listings
    JOIN users ON users.id = user_id
    WHERE listings.id = $1;
    `, [req.params.id])       // Finish: create a query which grabs listings by user ID (i.e., req.body.id)
      .then(data => {
        //console.log(data.rows)
        const templateVars = {
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
    res.render('listing_new');
  });

  // Post a new listing
  router.post("/listings", (req, res) => {
    let listing = req.body;

    const queryString = `INSERT INTO listings (title, description, thumbnail_photo_url, main_photo_url, price, condition, posted_date, category_id, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;

    const values = [listing.title, listing.description, listing.thumbnail_photo_url, listing.main_photo_url, listing.price, listing.condition, listing.posted_date, listing.category_id, listing.user_id];

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
