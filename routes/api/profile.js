const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateProfileInput = require("../../validation/profile");
/**
 * @route   GET api/profile/test
 * @desc    tests profile route
 * @access  Public
 */
router.get("/test", (req, res) => {
  res.json({
    msg: "Pofile works"
  });
});

/**
 * @route   GET api/profile
 * @desc    get current users profile
 * @access  Private
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    //req.user.id ->from passport session
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "The is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

/**
 * @route   POST api/profile
 * @desc    create OR edit user profile
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    //Check validation
    if(!isValid){
      // return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get values of input fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;
    //Skills - split in2 array. //come is as comma separated values
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    //social media links
    profileFields.socialM = {};
    if (req.body.youtube) profileFields.socialM.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.socialM.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.socialM.facebook = req.body.facebook;
    if (req.body.instagram)
      profileFields.socialM.instagram = req.body.instagram;
    if (req.body.linkedin) profileFields.socialM.linkedin = req.body.linkedin;

    //check for user
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //if there is a user: update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(newProfile => res.json(newProfile));
      } else {
        //no user found: create
        //check if handle already exists in DB
        Profile.findOne({ handle: profileFields.handle }).then(foundProfile => {
          if (foundProfile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          //if no profile found with existing handle: save
          new Profile(profileFields)
            .save()
            .then(savedProfile => res.json(savedProfile));
        });
      }
    });
  }
);

module.exports = router;
