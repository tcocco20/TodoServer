import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import "./services/passport.ts";
import { fileURLToPath } from "node:url";
import authRoutes from "./routes/authRoutes.ts";
import cookieSession from "cookie-session";
import passport from "passport";
import { resolve } from "node:path";
import { rootPath } from "./utilities/getRoot.ts";
import { COOKIE_KEY, ENVIRONMENT, PORT } from "./config/constants.ts";
import todoRoutes from "./routes/todoRoutes.ts";

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

app.use(authRoutes);

if (ENVIRONMENT === "production") {
  app.use(express.static("client/dist"));
  app.get("/", (req, res) => {
    res.sendFile(resolve(rootPath, "../client", "dist", "index.html"));
  });
  app.get("/dashboard", (req, res) => {
    res.sendFile(resolve(rootPath, "../client", "dist", "index.html"));
  });
}

app.use(todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
