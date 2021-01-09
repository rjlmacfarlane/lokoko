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
    db.query(`SELECT * FROM listings;`)
      .then(data => {
        const listings = data.rows;
        res.json({ listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // Get listings by search term:
  router.get("/listings", (req, res) => {
    db.query(`SELECT * FROM listings WHERE title LIKE ??????`)  // Fix: ("LIKE" what?, also, what if no such listing is found?)
      .then(data => {
        const listings = data.rows;
        res.json({ listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Show a single listing:
  router.get("/listings/:id", (req, res) => {
    db.query(`SELECT * FROM listings WHERE id = ${req.body.id}`)  // Fix: (req.body.id? I guess?)
      .then(data => {
        const listings = data.rows;
        res.json({ listings });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Post a new listing form:
  router.get('/listings/new', (req, res) => {

    res.render('listings_new');

  });


  // Post a new listing
  router.post("/listings/", (req, res) => {
    db.query(`PUT DB QUERY HERE`)                    // Fix: Put DB query here
      .then(
        res.redirect(`/listings/:${req.body.id}`)
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Update an existing listing:
  router.put("/listings/:id", (req, res) => {
    db.query(`PUT DB QUERY HERE`)                    // Fix: Put DB query here
      .then(
        res.redirect(`/listings/:${req.body.id}`)
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Delete a listing:
  router.delete("listings/:id", (req, res) => {
    db.query(`PUT DB QUERY HERE`)                    // Fix: Put DB query here
      .then(
        res.redirect(`/`)
      )
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Show entire database:
  router.get("/listings/:id", (req, res) => {
    db.query(`PUT DB QUERY HERE`)                    // Fix: Put DB query here
      .then(data => {
        res.json({ data });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};




