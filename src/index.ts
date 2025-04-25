import express from "express";
import "./services/passport.ts";
import { authRoutes } from "./routes/authRoutes.ts";
import cookieSession from "cookie-session";
import passport from "passport";
import { COOKIE_KEY, ENVIRONMENT, PORT } from "./config/constants.ts";
import { todoRoutes } from "./routes/todoRoutes.ts";

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

authRoutes(app);
todoRoutes(app);

if (ENVIRONMENT === "production") {
  app.use(express.static("client/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
