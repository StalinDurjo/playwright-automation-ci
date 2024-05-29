import { test, expect } from "@pages/base/fixtures";

test.describe("Pages", async () => {
  test.beforeEach(async ({ wpLoginPage, pageActions }) => {
    await wpLoginPage.goto();
    await pageActions.wordpress.login("admin", "password");
  });

  test("Admin can create a new page", async ({ page, wpPages, pageView }) => {
    await wpPages.allPages.goto();
    await wpPages.allPages.clickOnAddNewPage();

    const pageTitle = "Test Page";

    await wpPages.addPage.blockEditor.enterPostTitle(pageTitle);
    await wpPages.addPage.blockEditor.clickOnPublishButton();
    await wpPages.addPage.blockEditor.clickOnPublishConfirmButton();
    await wpPages.addPage.blockEditor.clickOnViewPageLink();

    const createdPostTitle = await pageView.blockPostTitle().textContent();

    expect(createdPostTitle).toEqual(pageTitle);
  });
});
