var passport = require('passport');
var GoogleStategy = require('passport-google-oauth20');
var TwitterStrategy = require('passport-twitter');
var User = require('../models/user-models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null,user);
  })
});


//Google Sign in
passport.use(new GoogleStategy({
  //options for strat
  callbackURL: process.env.GOOGLE_CALLBACKURL,
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET
}, (accessToken, refreshToken, profile, done) => {
  //Check if user already exists in the db
  User.findOne({googleId: profile.id}).then((currentUser) => {
    if (currentUser) {
      //already have the user
      console.log('user is:', currentUser);
      done(null, currentUser);
    } else {
      //if not, create a new user on db
      new User({username: profile.displayName, googleId: profile.id, thumbnail: profile._json.image.url}).save().then((newUser) => {
        console.log('new user created' + newUser);
        done(null, newUser);
      })
    }
  });
}))

//Twitter Login
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMERKEY,
    consumerSecret: process.env.TWITTER_CONSUMERSECRET,
    callbackURL: process.env.TWITTER_CALLBACKURL
  },
  (token, tokenSecret, profile, done) => {
    // console.log(profile);
    User.findOne({twitterId: profile._json.id_str}).then((currentUser) => {
      if (currentUser) {
        //already have the user
        console.log('user is:', currentUser);
        done(null, currentUser);
      } else {
        //if not, create a new user on db
        new User({name: profile._json.name, twitterId: profile._json.id_str, profilePicture: profile._json.profile_image_url_https}).save().then((newUser) =>{
          console.log('new user created' + newUser);
          done(null, newUser);
        })
      }
    })
  }
));
