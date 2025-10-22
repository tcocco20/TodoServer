import { DATABASE_URL } from "../config/constants.ts";
import { drizzle } from "drizzle-orm/neon-http";
import { todosTable } from "../db/schema.ts";
import { getTodos } from "../utilities/getTodos.ts";
import { eq } from "drizzle-orm";
import { Router, type Request, type Response } from "express";
import { /* inject, */ injectable } from "inversify";
// import { TodosController } from "../todos/todos.controller.ts";

const db = drizzle(DATABASE_URL);

@injectable()
export default class TodosRouter {
  public router: Router;

  constructor(/* @inject(TodosController) private todosController: TodosController */) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", async (req: Request, res: Response) => {
      let userId;
      try {
        userId = req.user!.id as number;
      } catch (error) {
        console.error("Error getting user ID:", error);
        res.redirect("/");
        return;
      }
      const usersTodos = await getTodos(db, userId);

      res.send(usersTodos);
    });

    this.router.post("/", async (req: Request, res: Response) => {
      const { title } = req.body;
      const userId = req.user!.id;
      // const newTodo = this.todosController.createTodo(); // not used yet

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

    this.router.delete("/:id", async (req: Request, res: Response) => {
      const todoId = +req.params.id;
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
    this.router.put("/:id", async (req: Request, res: Response) => {
      const todoId = +req.params.id;
      const { title, completed } = req.body;
      const userId = req.user!.id;

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
  }
}
