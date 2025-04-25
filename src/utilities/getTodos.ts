import { eq } from "drizzle-orm";
import { todosTable } from "../db/schema.ts";

export const getTodos = async (db: any, userId: number) => {
  const usersTodos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId));
  return usersTodos;
};
