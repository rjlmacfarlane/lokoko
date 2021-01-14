const express = require('express');
const router  = express.Router();
const app = express();
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

module.exports = (db) => {

  // show favourites for specific user
  router.get("/favourites/:id", (req, res) => {
    let userId = req.params.id;

    // select the name of the person's page
    let userNameFav = "";
    db.query(`
    SELECT name FROM users
    WHERE users.id = $1
    `, [userId])
      .then(data => {
        if (data.rows.length > 0) {
          return userNameFav = data.rows[0].name;
        }
      })
      .catch(err => {
        res.status(500).redirect('error', err.message);
      });

    let queryString = `
    SELECT * FROM favourite_listings
    JOIN users ON favourite_listings.user_id = users.id
    JOIN listings ON favourite_listings.listing_id = listings.id
    WHERE users.id = $1;
    `
    db.query(queryString, [userId])
      .then(data => {
        const templateVars = {
          user: req.session.user_id,
          favourites: data.rows,
          userNameFav: userNameFav
        };

        if (req.session.user){
          templateVars["name"] =  req.session.user.name
        }
        console.log('DATA ROWS' + JSON.stringify(templateVars['favourites']))
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
