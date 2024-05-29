import BasePage from "@pages/base/base.page";
import { Page } from "@playwright/test";

export default class AllPostPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = "/wp-admin/edit.php";
  }

  async clickOnAddNewPost() {
    await this.pageTitleAction("Add New Post").click();
  }
}
