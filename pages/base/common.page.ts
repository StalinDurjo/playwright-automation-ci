import { Page } from "@playwright/test";

export default class CommonPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // arrange
  button(title: string) {
    return this.page.getByRole("button").and(this.page.getByText(title));
  }

  submit(text: string) {
    return this.page.locator("#submit").and(this.page.getByText(text));
  }

  // action
  async clickOnLogin() {
    await this.button("Log In").click();
  }

  async clickOnSaveChanges() {
    await this.submit("Save Changes").click();
  }
}
