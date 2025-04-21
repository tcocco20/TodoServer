import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "../config/constants.ts";

const db = drizzle(DATABASE_URL);
