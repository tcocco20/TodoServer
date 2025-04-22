import express from "express";
import "./services/passport.ts";
import { authRoutes } from "./routes/authRoutes.ts";
import cookieSession from "cookie-session";
import passport from "passport";
import { COOKIE_KEY, PORT } from "./config/constants.ts";

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
