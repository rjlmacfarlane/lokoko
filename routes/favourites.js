const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/favourites/:id", (req, res) => {
    let userId = req.params.id;
    let queryString = `
    SELECT * FROM favourite_listings
    JOIN users ON favourite_listings.user_id = users.id
    JOIN listings ON favourite_listings.listing_id = listings.id
    WHERE users.id = $1;
    `
    db.query(queryString, [userId])
      .then(data => {
        const templateVars = {
          favourites: data.rows
        };
        // Note: id and listing_id of data.rows is identical
        res.render('favourites', templateVars)
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });

  // add a favourite post
  router.post("/favourites", (req, res) => {
    const userId = req.session.user_id;
    const listing_id = req.body.listing_id;
    const queryString =`
    INSERT INTO favourite_listings (user_id, listing_id)
    VALUES ($1, $2);
    `;
    db.query(queryString, [userId, listing_id])
      .then(data => {
        // the data object is about the insert, console log to terminal is optional
        // Optional: send anything back in network tab or keep it pending
        res.status(200).send(200);
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });

  // delete a favourite post
  router.post("/favourites/:id", (req, res) => {
    const listing_id = req.body.listing_id;
    const userId = req.params.id;
    const queryString =`
    DELETE FROM favourite_listings
    WHERE user_id = $1 AND listing_id = $2;
    `;
    db.query(queryString, [userId, listing_id])
      .then(data => {
        // the data object is about the delete, console log to terminal is optional
        // Optional: send anything back in network tab or keep it pending
        res.status(200).send(200);
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });

  return router;
};
