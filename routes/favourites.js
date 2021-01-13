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
        console.log(data.rows)
        res.render('favourites', templateVars)
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });

  // add a favourite post
  // router.post("/favourites/:id", (req, res) => {
  //
  // });

  // delete a favourite post
  router.post("/favourites/:id", (req, res) => {
    const listing_id = req.body.listing_id;
    let userId = req.params.id;
    let queryString =`
    DELETE FROM favourite_listings
    WHERE user_id = $1 AND listing_id = $2;
    `;
    db.query(queryString, [userId, listing_id])
      .then(data => {
        const templateVars = {
          favourites: data.rows
        };
        res.render('favourites', templateVars)
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });

  return router;
};
