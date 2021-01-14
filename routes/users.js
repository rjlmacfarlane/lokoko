/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/users/:id", (req, res) => {
    console.log("error here", req.params.id)
    db.query(`
    SELECT * FROM users
    WHERE id = $1
    ;`, [req.params.id])

      .then(data => {
        console.log(data.rows[0])
        const templateVars = {
          user: data.rows[0].id,
          name: data.rows[0].name,
          province: data.rows[0].province,
          city: data.rows[0].city,
          profile_picture: data.rows[0].profile_picture
        };
        res.render('user', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });
  return router;
};
