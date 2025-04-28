const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            // Se agrega /auth/google antes de la ruta de inicio
            callbackURL: "https://tec1.nuclea.solutions/google/callback",
            passReqToCallback: true,
        },
        async (request, accessToken, refreshToken, profile, cb) => {
            try {
                const email = profile.emails[0].value;
                const [rows] = await User.fetchOne(email);

                if (rows.length == 0) {
                    request.session.warning = "Correo no encontrado";
                    return cb(null, false);
                }
                return cb(null, profile);
            } catch (err) {
                return cb(err);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
