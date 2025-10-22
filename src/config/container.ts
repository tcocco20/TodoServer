import { Container } from "inversify";
import { TodosController } from "../todos/todos.controller.ts";
import { TodosRouter } from "../routes/todoRoutes.ts";

export const container = new Container();

container.bind(TodosController).toSelf();
container.bind(TodosRouter).toSelf();
