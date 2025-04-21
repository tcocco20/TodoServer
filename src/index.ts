import "dotenv/config";
import express from "express";
import "./services/passport.ts";
import { authRoutes } from "./routes/authRoutes.ts";

const app = express();
authRoutes(app);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
