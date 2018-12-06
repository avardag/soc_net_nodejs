const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
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
      .populate("user", ["name", "avatar"])
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
    const { errors, isValid } = validateProfileInput(req.body);

    //Check validation
    if (!isValid) {
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

/**
 * @route   GET api/profile/handle/:handle
 * @desc    get profile by handle
 * @access  Public
 */

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(foundProfile => {
      if (!foundProfile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(foundProfile);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route   GET api/profile/user/:user_id
 * @desc    get profile by user id
 * @access  Public
 */

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(foundProfile => {
      if (!foundProfile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(foundProfile);
    })
    .catch(err =>
      res.status(404).json({ noprofile: "There is no profile for this user" })
    );
});

/**
 * @route   GET api/profile/all
 * @desc    get all profiles
 * @access  Public
 */
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(foundProfiles => {
      if (!foundProfiles) {
        errors.noprofile = "There are no profiles";
        res.status(404).json(errors);
      }
      res.json(foundProfiles);
    })
    .catch(err => res.status(404).json({ noprofile: "There are no profile" }));
});

/**
 * @route   POST api/profile/experience
 * @desc    add experience to profile
 * @access  Private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experience array
      foundProfile.experience.unshift(newExp);
      foundProfile.save().then(profile => res.json(profile));
    });
  }
);
/**
 * @route   POST api/profile/education
 * @desc    add education to profile
 * @access  Private
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check validation
    if (!isValid) {
      // return any errors with 400 status
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experience array
      foundProfile.education.unshift(newEdu);
      foundProfile.save().then(profile => res.json(profile));
    });
  }
);
//DELETE EXP
/**
 * @route   DELETE api/profile/experience/:exp_id
 * @desc    delete experience to profile
 * @access  Private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      //get remove index
      const removeIndex = foundProfile.experience
        .map(exp => exp.id)
        .indexOf(req.params.exp_id);
      //Splice out of array
      foundProfile.experience.splice(removeIndex, 1);
      //Save
      foundProfile.save().then(profile=> res.json(profile))
    })
    .catch(err=> res.status(404).json(err))
  }
);
//DELETE Education
/**
 * @route   DELETE api/profile/education/:edu_id
 * @desc    delete education to profile
 * @access  Private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      //get remove index
      const removeIndex = foundProfile.education
        .map(edu => edu.id)
        .indexOf(req.params.edu_id);
      //Splice out of array
      foundProfile.education.splice(removeIndex, 1);
      //Save
      foundProfile.save().then(profile=> res.json(profile))
    })
    .catch(err=> res.status(404).json(err))
  }
);
//DELETE User/Profile
/**
 * @route   DELETE api/profile
 * @desc    delete profile
 * @access  Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(()=>{
        User.findOneAndRemove({_id: req.user.id})
          .then(()=>{
            return res.json({success: true})
          })
      })
    .catch(err=> res.status(404).json(err))
  }
);
module.exports = router;
