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

const express = require('express');
const bodyParser = require('body-parser');
const images = require('../lib/images');

const Photo = require('./model');
const Tag = require('../tags/model');
const Comment = require('../comments/model');
const Like = require('../likes/model');
const User = require('../users/model');

const router = express.Router();


const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({ extended: false }));

/**
 * POST /api/photos
 *
 * Create a new photo.
 */
// [START]
router.post(
    '/',
    images.multer.single('file'),
    images.sendUploadToGCS,
    (req, res, next) => {
      let data = req.body;

      // Was an image uploaded? If so, we'll use its public URL
      // in cloud storage.
      if (req.file && req.file.cloudStoragePublicUrl) {
        data.image_url = req.file.cloudStoragePublicUrl;
      }

      // Save the data to the database.
      Photo.create(data, (err, photo) => {
        if (err) {
          next(err);
          return;
        }

        let photoPromise = new Promise((resolve, reject) => {

            photo.tags = [];
            photo.comments = { count: null };
            photo.likes = { count: null };
            photo.user = null;
            //tags, comment count, likes count, user info
            Tag.getTagsByPhotoId(photo.id, (err, tags) => {
              if (err) {
                reject(err);
                return;
              }
              tags.forEach((tag) => {
                photo.tags.push(tag.tag_name);
              })

              Comment.getCountByPhotoId(photo.id, (err, count) => {
                if (err) {
                  reject(err);
                  return;
                }
                photo.comments.count = count.comment_count;

                Like.getCountByPhotoId(photo.id, (err, count) => {
                  if (err) {
                    reject(err);
                    return;
                  }
                  photo.likes.count = count.like_count;

                  User.read(photo.user_id, (err, user) => {
                    if (err) {
                      reject(err);
                      return;
                    }

                    delete photo.user_id;
                    delete user.password;
                    photo.user = user;
                    resolve(photo);
                  })
                })
              })
            })


        });

        photoPromise.then((photo) => {
          res.json(photo);
        }).catch((err) => {
          next(err);
        })

        const parseTags = text => {
          let tags = [];
          let flag = false;
          let tag = '';
          for (let i=0; i<text.length; i++) {
            if (text[i] === '#') {
              flag = true;
            }

            if ((text[i+1] === ' ' || text[i+1] === ',' || i === text.length-1) && flag) {
              tag += text[i];
              tags.push(tag.substr(1))
              tag = '';
              flag = false;
            }

            if (flag) {
              tag += text[i]
            }
          }

          return tags;
        }

        parseTags(data.caption).forEach(tag => {
          Tag.create(tag, (err, res) => {
            Tag.getTagId(tag, (err, res) => {
              Tag.create_photos_tags(photo.id, res.id, (err, res => {
              }))
            })
          });
        })
      });
    }
  );
  // [END]

/**
 * GET /api/photos/:id
 *
 * Get information about a photo object.
 */

router.get('/:id', requireAuth, (req, res, next) => {

  let photoPromise = new Promise((resolve, reject) => {
    Photo.read(req.params.id, (err, photo) => {
      if (err) {
        reject(err);
        return;
      }
      photo.tags = [];
      photo.comments = { count: null };
      photo.likes = { count: null };
      photo.user = null;
      //tags, comment count, likes count, user info
      Tag.getTagsByPhotoId(photo.id, (err, tags) => {
        if (err) {
          reject(err);
          return;
        }
        tags.forEach((tag) => {
          photo.tags.push(tag.tag_name);
        })

        Comment.getCountByPhotoId(photo.id, (err, count) => {
          if (err) {
            reject(err);
            return;
          }
          photo.comments.count = count.comment_count;

          Like.getCountByPhotoId(photo.id, (err, count) => {
            if (err) {
              reject(err);
              return;
            }
            photo.likes.count = count.like_count;

            User.read(photo.user_id, (err, user) => {
              if (err) {
                reject(err);
                return;
              }

              delete photo.user_id;
              delete user.password;
              photo.user = user;
              resolve(photo);
            })
          })
        })
      })

    })
  });

  photoPromise.then((photo) => {
    res.json(photo);
  }).catch((err) => {
    next(err);
  })


})

router.delete('/:photo_id', requireAuth, (req, res, next) => {

  //delete other rows that have this photo as foriegn key
  Photo.read(req.params.photo_id, (err, photo) => {
    if(err) {
      next(err);
      return;
    }
    if (photo.user_id === req.user.id) {
      // Delete photo only if the photo belongs to the user

      // Delete likes
      connection.query(`DELETE FROM likes WHERE photo_id = ${photo.id}`, (err, result) => {
        if (err) {
          next(err);
          return;
        }

        connection.query(`DELETE FROM photos_tags WHERE photo_id = ${photo.id}`, (err, result) => {
        if (err) {
          next(err);
          return;
        }

        connection.query(`DELETE FROM comments WHERE photo_id = ${photo.id}`, (err, result) => {
          if (err) {
            next(err);
            return;
          }
          Photo.delete(req.params.photo_id, (err, result) => {
            if (err) {
              next(err);
              return;
            }
        
            res.json(result);
          })
          
        })
      })
      })

    } else {
      next();
    }
  })
  
})

router.get('/:photo_id/comments', requireAuth, (req, res, next) => {
  Comment.list(req.params.photo_id, (err, comments) => {
    if (err) {
      next(err);
      return;
    }

    res.json(comments);
  })
})

router.post('/:photo_id/comments', requireAuth, (req, res, next) => {
  Comment.create(req.user.id, req.params.photo_id, req.query.text, (err, comment) => {
    if (err) {
      next(err);
      return;
    }

    res.json(comment);
  })
})

router.delete('/:photo_id/comments/:comment_id', requireAuth, (req, res, next) => {
  Comment.delete(req.params.comment_id, (err, results) => {
    if (err) {
      next(err);
      return;
    }

    res.json(results);
  })
})

router.post('/:photo_id/likes', requireAuth, (req, res, next) => {
  Like.create(req.user.id, req.params.photo_id, (err, results) => {
    if (err) {
      next(err);
      return;
    }

    res.json(results);
  })
})

router.delete('/:photo_id/likes', requireAuth, (req, res, next) => {
  Like.delete(req.user.id, req.params.photo_id, (err, results) => {
    if (err) {
      next(err);
      return;
    }

    res.json(results);
  })
})

router.get('/:photo_id/relationship', requireAuth, (req, res, next) => {
  Like.read(req.user.id, req.params.photo_id, (err, results) => {
    if (err) {
      next(err);
      return;
    }

    let likedByUser = false;

    if (results) {
      likedByUser = true;
    }

    res.json({likedByUser});
  })
})


/**
 * GET /api/photos
 *
 * query: username
 *
 * Fetch an array of photos by username (up to ten at a time).
 */
// router.get('/', (req, res, next) => {
//   Photo.list(2, req.query.pageToken, (err, entities, cursor) => {
//     if (err) {
//       next(err);
//       return;
//     }
//     res.json({
//       photos: entities,
//       nextPageToken: cursor
//     });
//   });
// });

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
