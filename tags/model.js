'use strict';

const mysql = require('mysql');
const config = require('../config');

const options = {
  user: config.get('MYSQL_USER'),
  password: config.get('MYSQL_PASSWORD'),
  database: 'instaclone'
};

if (config.get('INSTANCE_CONNECTION_NAME') && config.get('NODE_ENV') === 'production') {
  options.socketPath = `/cloudsql/${config.get('INSTANCE_CONNECTION_NAME')}`;
}

const connection = mysql.createConnection(options);

function getTagsByPhotoId (photo_id, cb) {
    connection.query(
        `SELECT tag_name FROM photos_tags INNER JOIN tags ON tag_id = id WHERE photo_id=${photo_id}`, (err, results) => {
          if (err) {
            cb(err);
            return;
          }
          cb(null, results);
        });
}

function create (tag_name, cb) {
  connection.query(
      `INSERT IGNORE INTO tags (tag_name) VALUES ('${tag_name}');`, (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, results);
      });
}

function getTagId (tag_name, cb) {
  connection.query(
      `SELECT id from tags where tag_name = '${tag_name}';`, (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, results[0]);
      });
}

function create_photos_tags (photo_id, tag_id, cb) {
  connection.query(
      `INSERT INTO photos_tags (photo_id, tag_id) VALUES (${photo_id}, ${tag_id});`, (err, results) => {
        if (err) {
          cb(err);
          return;
        }
        cb(null, results);
      });
}

module.exports = {
  create,
  create_photos_tags,
  getTagId,
    getTagsByPhotoId
  };
