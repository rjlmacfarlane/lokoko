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
    db.query(`PUT QUERY HERE`)
      .then(data => {
        const templateVars = {



        };
        res.render('/users/:id', templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .redirect('error', err.message);
      });
  });
  return router;
};
