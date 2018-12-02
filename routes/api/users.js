const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

/**
 * @route   GET api/users/test
 * @desc    tests users  route
 * @access  Public
 */
router.get("/test", (req, res) => {
  res.json({
    msg: "Users works"
  });
});

/**
 * @route   POST api/users/register
 * @desc    register new users
 * @access  Public
 */
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route   GET api/users/login
 * @desc    login user / returns JWT token
 * @access  Public
 */
router.post("/login", (req, res) => {
  //Find user by email
  User.findOne({ email:req.body.email }).then(user => {
    //check for user
    if (!user) {
      return res.status(404).json({ email: "User email not found" });
    }
    //check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "password incorrect" });
      }
    });
  });
});

module.exports = router;
