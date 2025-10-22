import { Container } from "inversify";
import { TodosController } from "../todos/todos.controller.ts";

export const container = new Container();

container.bind(TodosController).toSelf();
