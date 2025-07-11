import express from "express";
import "./services/passport.ts";
import { fileURLToPath } from "url";
import { authRoutes } from "./routes/authRoutes.ts";
import cookieSession from "cookie-session";
import passport from "passport";
import { dirname, resolve } from "path";
import { COOKIE_KEY, ENVIRONMENT, PORT } from "./config/constants.ts";
import { todoRoutes } from "./routes/todoRoutes.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  app.get("/", (req, res) => {
    res.sendFile(resolve(__dirname, "client", "dist", "index.html"));
  });
  app.get("/dashboard", (req, res) => {
    res.sendFile(resolve(__dirname, "../client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
