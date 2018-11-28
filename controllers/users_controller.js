const User = require('../models/User');

module.exports = {
  signup(req, res, next) {
    const data = req.body;
    console.log('[SIGN UP DATA] ', data);
    let user = new User(data);
    User.findOne({
      $or: [{ username: data.username }, { email: data.email }]
    }).then(u => {
      if (u) {
        if (u.username === data.username) {
          res.send({
            valid: false,
            message: 'Username already used.'
          });
        }
        if (u.email === data.email) {
          res.send({
            valid: false,
            message: 'Email already used.'
          });
        }
        console.log('USER FOUND');
      } else {
        user
          .save()
          .then(u =>
            res.send({
              valid: true,
              username: u.username,
              token: u._id
            })
          )
          .catch(next);
      }
    });
  },

  signin(req, res, next) {
    const data = req.body;
    console.log('[SIGN IN DATA] ', data);
    User.findOne({ username: data.username })
      .then(user => {
        if (!user) {
          res.send({
            token: null,
            message: 'Wrong username.'
          });
        } else {
          if (!user.checkPassword(data.password, user.password)) {
            res.send({
              token: null,
              message: 'Wrong username or password.'
            });
          } else {
            res.send({
              token: user._id,
              username: user.username,
              message: 'Successfully signed in.'
            });
          }
        }
      })
      .catch(next);
  },

  auth(req, res, next) {
    const { id } = req.params;
    if (!id) {
      res.send({
        valid: false
      });
    } else {
      User.findById({ _id: id })
        .then(user => {
          res.send({
            valid: true,
            username: user.username,
            token: user._id
          });
        })
        .catch(err => {
          res.send({
            valid: false,
            error: err.message
          });
        });
    }
  }
};
