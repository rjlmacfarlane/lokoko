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
    db.query(`
    SELECT * FROM users
    WHERE id = $1
    ;`, [req.params.id])
      .then(data => {
        const templateVars = {
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
