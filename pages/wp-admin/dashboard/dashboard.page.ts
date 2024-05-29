import { Page } from "@playwright/test";

const selectors = {
  heading: '//div[@id="wpbody-content"]/div[3]/h1'
};

export default class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  pageTitle() {
    return this.page.locator(selectors.heading);
  }
}
