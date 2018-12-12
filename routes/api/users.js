const express = require("express");
const router = express.Router();
const User = require("../../models/User");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = require("../../config/keys").SECRET_KEY;

const passport = require("passport");

//Load Input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
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
  //Check validation
  const { errors, isValid } = validateRegisterInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }
  //create new user IF doesnt exist already
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists"
      return res.status(400).json({ errors });
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
  //Check validation
  const { errors, isValid } = validateLoginInput(req.body)
  if(!isValid){
    return res.status(400).json(errors);
  }
  //Find user by email
  User.findOne({ email: req.body.email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User email not found"
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if (isMatch) {
        // user Matched
        const payload = { 
          id: user.id, 
          name: user.name,
          avatar: user.avatar
        }; //creates JWT payload
        //Sign Token
        jwt.sign(payload, secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        errors.password = "password incorrect"
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 * @route   GET api/users/current
 * @desc    returns current user
 * @access  Private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  })
);
module.exports = router;
