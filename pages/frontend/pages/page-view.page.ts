import BasePage from "@pages/base/base.page";
import { Page } from "@playwright/test";

const selectors = {
  blockPostTitle: '//h1[contains(@class, "entry-title")]'
};

export default class PageView extends BasePage {
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  blockPostTitle() {
    return this.page.locator(selectors.blockPostTitle);
  }
}
