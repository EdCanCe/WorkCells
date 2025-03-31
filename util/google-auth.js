const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            // Se agrega /auth/google antes de la ruta de inicio
            callbackURL: "http://localhost:3000/google/callback",
            passReqToCallback: true,
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
