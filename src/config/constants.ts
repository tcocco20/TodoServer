import "dotenv/config";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const COOKIE_KEY = process.env.COOKIE_KEY || "";
export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT = process.env.NODE_ENV || "development";
