/* eslint-disable camelcase */
/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const app = express();
const ENV = process.env.ENV || "development";
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const nodemailer = require('nodemailer');
const router = express.Router();
const moment = require('moment');
moment().format();


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

module.exports = (db) => {

  // Set user session
  router.get('/login/:id', (req, res) => {

    delete req.session.user_id;
    delete req.session.user;

    const userID = req.params.id;
    req.session.user_id = userID;


    db.query(`
    SELECT * FROM users
    WHERE id = $1
    ;`, [req.params.id])
      .then(data => {
        req.session.user = data.rows[0];
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Logout user session
  router.get('/logout', (req, res) => {
    delete req.session.user_id;
    res.redirect('/');
  });


  // Get all listings:
  router.get("/", (req, res) => {

    const userID = req.session.user_id;
    console.log("USER ID: ", userID)

    db.query(`
    SELECT * FROM listings
    ORDER BY posted_date DESC;`)
      .then(data => {
        const templateVars = {
          user: userID,
          listings: data.rows
        };

        if (req.session.user){
          templateVars["name"] =  req.session.user.name
        }

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
    queryString += ` ORDER BY posted_date DESC;`;

console.log(queryString)

    db.query(queryString, queryValues)
      .then(data => {
        const templateVars = {
          user: userID,
          listings: data.rows,
        };

        // Add seatch string or empty
        templateVars["search_string"] = req.query.search || "";

        if (req.session.user){
          templateVars["name"] =  req.session.user.name
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

    let foundFavourite = false;
    db.query(`
    SELECT * FROM favourite_listings
    WHERE listing_id = $1 AND user_id = $2;
    `, [req.params.id, req.session.user_id])
      .then(data => {
        if (data.rows.length > 0) {
          return foundFavourite = true;
        }
      })
      .catch(err => {
        res.status(500).redirect('error', err.message);
      });


    db.query(`
    SELECT listings.id AS listing_id, * FROM listings
    JOIN users ON users.id = user_id
    WHERE listings.id = $1;
    `, [req.params.id])
      .then(data => {
        const templateVars = {
          listing_id: data.rows[0].listing_id,
          user: userID,
          title: data.rows[0].title,
          description: data.rows[0].description,
          cover_photo: data.rows[0].main_photo_url,
          price: data.rows[0].price,
          posted_date: moment(data.rows[0].posted_date).fromNow(),
          user_name: data.rows[0].name,
          sold_date: data.rows[0].sold_date,
          foundFavourite: foundFavourite
        };

        if (req.session.user){
          templateVars["name"] =  req.session.user.name
        }

        res.render('listing_show', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Send an email to seller:
  const transporter = nodemailer.createTransport({
    port: process.env.MSG_PORT,
    host: process.env.MSG_HOST,
    auth: {
      user: process.env.MSG_EMAIL,
      pass: process.env.MSG_PWD
    },
  });

  router.post('/send', (req, res) => {
    const { text } = req.body;
    const mailData = {
      from: 'lokoko@lokoko.com',
      to: 'douglas.mccullough65@ethereal.email',
      subject: 'Someone is interested in your item!',
      text: text
    };

    transporter.sendMail(mailData, function (err, info) {

      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Error! Message not sent!' });

      } else {
        console.log(info);
        res
          .render('sent')
          .status(200).send({ message: 'Message sent!' });

      }

    });
  });

  // Post a new listing form:
  router.get('/new', (req, res) => {
    const userID = req.session.user_id;
    const templateVars = {
      user: userID
    };

    if (req.session.user){
      templateVars["name"] =  req.session.user.name
    }
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


  // Mark a listing as sold
  router.post("/listings/:id", (req, res) => {

    let listing = req.params;

    const queryString = `
    UPDATE listings
    SET sold_date = $1
    WHERE id = $2
    RETURNING *;
    `;

    const values = [moment(Date.now()).format(), listing.id];

    db.query(queryString, values)
      .then(data => {
        res.redirect(`/listings/${listing.id}`);
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
