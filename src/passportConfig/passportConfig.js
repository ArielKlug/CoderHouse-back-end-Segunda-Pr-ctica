const passport = require("passport");
const jwt = require("passport-jwt");
const { JWT_PRIVATE_KEY } = require("../config/objectConfig");


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookie"];
    return token;
  }
};

const initPassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: JWT_PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = {
  initPassport,
};
