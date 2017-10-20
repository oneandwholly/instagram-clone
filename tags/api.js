'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const Tag = require('./model');

const router = express.Router();
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.use(bodyParser.json());

router.get('/search', requireAuth, (req, res, next) => {
    Tag.match(req.query.q, (err, list) => {
        if (err) {
          next(err);
          return;
        }
    
        res.json(list)
      })
  })

/**
 * Errors on "/api/photos/*" routes.
 */
router.use((err, req, res, next) => {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = {
      message: err.message,
      internalCode: err.code
    };
    next(err);
  });

  module.exports = router;
