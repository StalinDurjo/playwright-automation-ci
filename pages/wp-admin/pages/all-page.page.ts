import BasePage from "@pages/base/base.page";
import { Page } from "@playwright/test";

export default class AllPagesPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = "/wp-admin/edit.php?post_type=page";
  }

  pageTitleAction(title: string) {
    return this.page.locator(".page-title-action").and(this.page.getByText(title));
  }

  async clickOnAddNewPage() {
    await this.pageTitleAction("Add New Page").click();
  }
}
