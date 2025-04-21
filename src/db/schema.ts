import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  googleId: varchar({ length: 255 }).notNull().unique(),
  photoUrl: varchar({ length: 255 }),
});
