import { inject, injectable } from "inversify";
import { User } from "./user.ts";

@injectable()
export class Post {
  constructor(@inject(User) private user: User) {}

  public createPost(title: string, content: string) {
    return { title, content, user: this.user };
  }
}
