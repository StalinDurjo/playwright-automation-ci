import BasePage from "@pages/base/base.page";
import { Page } from "@playwright/test";
import NewPostPage from "./new-post.page";
import AllPostPage from "./all-post.page";

export default class PostPage extends BasePage {
  readonly newPost: NewPostPage;
  readonly allPost: AllPostPage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.newPost = new NewPostPage(this.page);
    this.allPost = new AllPostPage(this.page);
  }
}
