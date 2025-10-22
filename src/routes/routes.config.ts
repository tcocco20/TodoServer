import type { Application } from "express";
import { container } from "../config/container.ts";
import TodosRouter from "./todoRoutes.ts";

export function addRoutes(app: Application): Application {
  const todosRouter = container.get(TodosRouter);

  app.use("/api/todos", todosRouter.router);

  return app;
}
