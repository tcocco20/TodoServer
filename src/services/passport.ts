import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import {
  DATABASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../config/constants.ts";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema.ts";

const Strategy = GoogleStrategy.Strategy;
const db = drizzle(DATABASE_URL);

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.googleId, profile.id));

      if (existingUser.length > 0) {
        console.log("User already exists in the database");
      } else {
        console.log("User does not exist in the database, creating a new user");
        const user: typeof usersTable.$inferInsert = {
          name: profile.displayName,
          googleId: profile.id,
          photoUrl: profile._json.picture,
        };

        await db.insert(usersTable).values(user);
      }
    }
  )
);
