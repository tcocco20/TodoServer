import { injectable } from "inversify";

@injectable()
export class TodosController {
  constructor() {}

  public createTodo() {
    return {
      title: "This is a title",
      description: "This is a description",
    };
  }
}
