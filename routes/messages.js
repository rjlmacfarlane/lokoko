/* eslint-disable camelcase */
/*
 * All routes for listings are defined here
 * Since this file is loaded in server.js into api/listings,
 *   these routes are mounted onto /listings
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const bodyParser = require('body-parser')
const router  = express.Router();
const moment = require('moment');
moment().format();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

module.exports = (db) => {
  // get all messages of a listing from logged in user
  // check if owner of listing and currentUser logged in are the same
  // can't message themself
  // sender_id should not be equal to receiver_id
  router.get("/messages/:id/:currentUser", (req, res) => {
    const userID = req.params.currentUser;
    const listingID = req.params.id;
    const otherUserID = db.query(`SELECT user_id FROM listings WHERE id = $1;`, [listingID]).then(data => {
      if (data.rows[0].user_id == userID) {
        console.log("owner of listing and current logged in user cannot be the same, can't message themself");
        res.send("owner of listing and current logged in user cannot be the same, can't message themself");
        return;
      }
      return data.rows[0].user_id;
    })
    db.query(`
      SELECT *
      FROM messages
      JOIN users senders ON sender_id = senders.id
      JOIN users receivers ON receiver_id = receivers.id
      JOIN listings ON listing_id = listings.id
      WHERE ((sender_id = $1
      AND receiver_id = $3)
      OR (sender_id = $3
      AND receiver_id = $1))
      AND listing_id = $2;`, [userID, listingID, otherUserID])
      .then(data => {
        console.log(data.rows)
        const templateVars = {
          messages: data.rows[0].message,
          time_sent: data.rows[0].time_sent,
          listing_id: data.rows[0].listing_id,
          sender_id: data.rows[0].sender_id,
          receiver_id: data.rows[0].receiver_id
        };
        res.render('messages_show', templateVars);
      })
      .catch(err => {res.status(500).redirect('error', err.message)});
  });

  return router;

};
