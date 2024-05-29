import { Page } from "@playwright/test";
import WordpressActions from "./wordpress-actions";

export default class PageActions {
  private page: Page;
  readonly wordpress: WordpressActions;

  constructor(page: Page) {
    this.page = page;
    this.wordpress = new WordpressActions(this.page);
  }
}
