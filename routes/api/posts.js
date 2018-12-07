const express = require("express");
const router = express.Router();
const moongoose = require("mongoose");
const passport = require("passport");
//Post model import
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
//import post input validation
const validatePostInput = require("../../validation/post");

/**
 * @route   GET api/posts/test
 * @desc    tests post route
 * @access  Public
 */
router.get("/test", (req, res) => {
  res.json({
    msg: "posts works"
  });
});
/////CREATE A POST
/**
 * @route   POsT api/posts
 * @desc    create a post
 * @access  Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // check validation
    if (!isValid) res.status(400).json(errors);

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
/////GET ALL POSTS
/**
 * @route   GET api/posts
 * @desc    get all posts
 * @access  Public
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No post found" }));
});
/////GET SINGLE POST
/**
 * @route   GET api/posts/:post_id
 * @desc    get a single post by id
 * @access  Public
 */
router.get("/:post_id", (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: "No post found" }));
});
/////DELETE A POST
/**
 * @route   DELETE api/posts/:post_id
 * @desc    delete a post
 * @access  Private
 */
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //first check if the user deleting post is author of a post
    //find profile doc, whose user has ref to req.user.id
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      Post.findById(req.params.post_id)
        .then(foundPost => {
          //check for post owner
          if (foundPost.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete(if posts owner)
          foundPost.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(400).json({ nopostfound: "No post found" }));
    });
  }
);

///// - LIKE A POST
/**
 * @route   POST api/posts/like/:post_id
 * @desc    like a post
 * @access  Private
 */
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find profile doc, whose user has ref to req.user.id
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      Post.findById(req.params.post_id)
        .then(foundPost => {
          //check if user already liked a post
          if(foundPost.likes.filter(like=>like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({alreadyliked:"User already liked this post"})
          }
          //Add user id to likes array
          foundPost.likes.push({user: req.user.id})
          foundPost.save().then(post=> res.json(post))
        })
        .catch(err => res.status(400).json({ nopostfound: "No post found" }));
    });
  }
);

///// - UNLIKE A POST
/**
 * @route   POST api/posts/unlike/:post_id
 * @desc    Unlike a post
 * @access  Private
 */
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find profile doc, whose user has ref to req.user.id
    Profile.findOne({ user: req.user.id }).then(foundProfile => {
      Post.findById(req.params.post_id)
        .then(foundPost => {
          //check if user already liked a post
          if(foundPost.likes.filter(like=>like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({notliked:"You have nt yet  liked this post"})
          }
          //Get remove index
          const removeIndex = foundPost.likes
            .map(i=>i.user.toString()) //gives array of users
            .indexOf(req.user.id) //get index of user where user === req.user.id
          //Splice out of array
          foundPost.likes.splice(removeIndex, 1);
          //save
          foundPost.save().then(post=> res.json(post))
        })
        .catch(err => res.status(400).json({ nopostfound: "No post found" }));
    });
  }
);

module.exports = router;
