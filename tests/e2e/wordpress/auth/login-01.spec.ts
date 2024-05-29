import { test, expect } from "@pages/base/fixtures";

test.describe("WordPress Login", async () => {
  test.beforeEach(async ({ page }) => {});

  test("User successfully loggedin using valid credentials", async ({ page, wpLoginPage, wpDashboardPage }) => {
    await wpLoginPage.goto();
    await wpLoginPage.enterUsername("admin");
    await wpLoginPage.enterPassword("password");
    await wpLoginPage.clickOnLogin();

    const dashboardTitle = await wpDashboardPage.pageTitle().textContent();
    expect(dashboardTitle).toEqual("Dashboard");
  });
});
