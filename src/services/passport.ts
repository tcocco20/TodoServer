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

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, +id));

    if (user.length > 0) {
      done(null, user[0]);
    } else {
      done(new Error("User not found"));
    }
  } catch (error) {
    console.error("Error deserializing user", error);
    done(error);
  }
});

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
        done(null, existingUser[0]);
      } else {
        console.log("User does not exist in the database, creating a new user");
        const user: typeof usersTable.$inferInsert = {
          name: profile.displayName,
          googleId: profile.id,
          photoUrl: profile._json.picture,
        };

        try {
          const insertResponse = await db.insert(usersTable).values(user);
          console.log("Insert response:", insertResponse);
        } catch (error) {
          console.error("Error inserting user into the database", error);
          return done(error);
        }
        const newUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.googleId, profile.id));

        done(null, newUser[0]);
      }
    }
  )
);
