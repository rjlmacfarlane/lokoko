/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Get all listings:
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)  // This query should be good as-is
      .then(data => {
        const templateVars = {



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
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)  // Finish: create a query which accepts fuzzy search terms (i.e., LIKE %searchterm%)
      .then(data => {
        const templateVars = {



        };
        res.render('index', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('listings', err.message);
      });
  });

  // Show a single listing:
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM listings;`)       // Finish: create a query which grabs listings by user ID (i.e., req.body.id)
      .then(data => {
        const templateVars = {



        };
        res.render('index', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });

  // Post a new listing form:
  router.get('/listings/new', (req, res) => {

    res.render('listings_new');

  });

  // Post a new listing
  router.post("/listings/", (req, res) => {
    db.query(`SELECT * FROM listings;`)              // Finish: send new data to database
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
