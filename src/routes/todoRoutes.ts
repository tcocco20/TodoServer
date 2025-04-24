import { DATABASE_URL } from "../config/constants.ts";
import { drizzle } from "drizzle-orm/neon-http";
import { todosTable } from "../db/schema.ts";
import { getTodos } from "../utilities/getTodos.ts";
import { eq } from "drizzle-orm";

const db = drizzle(DATABASE_URL);

export const todoRoutes = (app: any) => {
  app.get("/api/todos", async (req: any, res: any) => {
    const userId = req.user.id;
    const usersTodos = await getTodos(db, userId);

    res.send(usersTodos);
  });

  app.post("/api/todos", async (req: any, res: any) => {
    const { title } = req.body;
    const userId = req.user.id;

    const newTodo = {
      userId,
      title,
      completed: 0,
    };

    try {
      await db.insert(todosTable).values(newTodo);
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({ error: "Failed to create todo" });
    }

    const usersTodos = await getTodos(db, userId);
    res.send(usersTodos);
  });
  app.delete("/api/todos/:id", async (req: any, res: any) => {
    const todoId = req.params.id;
    const userId = req.user.id;

    try {
      await db.delete(todosTable).where(eq(todosTable.id, todoId)).execute();
    } catch (error) {
      console.error("Error deleting todo:", error);
      res.status(500).json({ error: "Failed to delete todo " + todoId });
    }

    const usersTodos = await getTodos(db, userId);
    res.send(usersTodos);
  });
  app.put("/api/todos/:id", async (req: any, res: any) => {
    const todoId = req.params.id;
    const { title, completed } = req.body;
    const userId = req.user.id;

    try {
      await db
        .update(todosTable)
        .set({ title, completed })
        .where(eq(todosTable.id, todoId))
        .execute();
    } catch (error) {
      console.error("Error updating todo:", error);
      res.status(500).json({ error: "Failed to update todo" });
    }

    const usersTodos = await getTodos(db, userId);
    res.send(usersTodos);
  });
};
