import { Page } from "@playwright/test";

const selectors = {
  blockPostTitle: '//h1[contains(@class, "wp-block-post-title")]',
  componentModalCloseButton: '//div[@class="components-modal__header"]/button',
  publishButton: '(//button[text()="Publish"])[1]',
  publishConfirmButton: '(//button[text()="Publish"])[2]',
  publishViewPageButton: '//div[contains(@class, "post-publish-panel__postpublish-buttons")]/a[text()="View Page"]',
  publishViewPostButton: '//div[contains(@class, "post-publish-panel__postpublish-buttons")]/a[text()="View Post"]'
};

export default class BlockEditorPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  postTitle() {
    return this.page.locator(selectors.blockPostTitle);
  }

  publishButton() {
    return this.page.locator(selectors.publishButton);
  }

  publishConfirmButton() {
    return this.page.locator(selectors.publishConfirmButton);
  }

  viewPageLink() {
    return this.page.locator(selectors.publishViewPageButton);
  }

  viewPostLink() {
    return this.page.locator(selectors.publishViewPostButton);
  }

  async componentModalCloseButton() {
    await this.page.waitForSelector(selectors.componentModalCloseButton, { state: "visible" });
    return this.page.locator(selectors.componentModalCloseButton);
  }

  async enterPostTitle(text: string) {
    await this.postTitle().click();
    await this.postTitle().fill(text);
  }

  async closeComponentModal() {
    await (await this.componentModalCloseButton()).click();
  }

  async clickOnPublishButton() {
    await this.publishButton().click();
  }

  async clickOnPublishConfirmButton() {
    await this.publishConfirmButton().click();
  }

  // async clickOnViewPage() {
  //   await this.page.getByLabel("View Page", { exact: true }).click();
  // }

  async clickOnViewPageLink() {
    await this.viewPageLink().click();
  }

  async clickOnViewPostLink() {
    await this.viewPostLink().click();
  }
}
