import { Page } from "@playwright/test";

export default class GeneralSettingsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  membershipCheckbox() {
    return this.page.getByRole("checkbox").and(this.page.locator("#users_can_register"));
  }
}
