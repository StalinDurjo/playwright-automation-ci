import { Page } from "@playwright/test";

const selectors = {
  pageTitleActionLink: "page-title-action"
};

export default class BasePage {
  protected page: Page;
  protected url: string;

  constructor(page: Page) {
    this.page = page;
    this.url = "/";
  }

  button(title: string) {
    return this.page.getByRole("button", { name: title, exact: true });
  }

  submit(title: string) {
    return this.page.locator("#submit").and(this.page.getByText(title));
  }

  pageTitleAction(title: string) {
    return this.page.locator(`.${selectors.pageTitleActionLink}`).and(this.page.getByText(title));
  }

  async goto() {
    return await this.page.goto(this.url);
  }

  async clickOnSaveChanges() {
    await this.submit("Save Changes").click();
  }
}
