const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('user'); //?
const secretKey = require("../config/keys").SECRET_KEY;

const opts = {};
//will be extracted from Headers/Authorization/ value: "Bearer 023ejfjf932ii092 etc" of a request
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

module.exports = (passport) =>{
  passport.use(new JWTStrategy(opts, (jwt_payload, next)=>{
    User.findById(jwt_payload.id) //find user matching id with id in JWT paylaod
      .then(user =>{
        if(user){ //if matching user is found
          return next(null, user); //move to next with null err & user
        }
        return next(null, false)// false for no user found
      })
      .catch(err => console.log(err))
  }))
}
