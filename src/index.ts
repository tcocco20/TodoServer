import "dotenv/config";
import express from "express";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

const Strategy = GoogleStrategy.Strategy;
const app = express();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      // Here you would typically save the user to your database
      console.log("User authenticated:", profile);
      return done(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
