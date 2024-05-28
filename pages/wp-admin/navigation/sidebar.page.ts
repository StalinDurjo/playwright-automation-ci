import { Page } from "@playwright/test";

const selectors = {
  settingsMenu: '//div[@class="wp-menu-name"][text()="Settings"]',
  generalMenu: '//ul[contains(@class, "wp-submenu")]/li/a[text()="General"]'
};

export default class SidebarPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  settingsMenu() {
    return this.page.locator(selectors.settingsMenu);
  }

  generalMenu() {
    return this.page.locator(selectors.generalMenu);
  }

  async clickOnSettingsMenu() {
    await this.settingsMenu().click();
  }

  async clickOnGeneralMenu() {
    await this.generalMenu().click();
  }
}
