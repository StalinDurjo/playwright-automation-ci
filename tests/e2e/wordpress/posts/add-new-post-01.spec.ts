import { expect, test } from "@pages/base/fixtures";

test.describe("Posts", async () => {
  test.beforeEach(async ({ wpLoginPage, pageActions }) => {
    await wpLoginPage.goto();
    await pageActions.wordpress.login("admin", "password");
  });

  test("Admin is able to add new post by filling only post title", async ({ page, pageView, postPage }) => {
    await postPage.allPost.goto();
    await postPage.allPost.clickOnAddNewPost();

    const pageTitle = "Test Post Title";

    await postPage.newPost.enterPostTitle(pageTitle);
    await postPage.newPost.clickOnPublish();
    await postPage.newPost.clickOnPublishConfirm();
    await postPage.newPost.clickOnViewPostLink();

    const createdPostTitle = await pageView.blockPostTitle().textContent();
    expect(createdPostTitle).toEqual(pageTitle);
  });
});
