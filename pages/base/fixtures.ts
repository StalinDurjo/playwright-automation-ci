import { test as base } from "@playwright/test";
import CommonPage from "./common.page";
import WpLoginPage from "@pages/wp-admin/auth/login.page";
import DashboardPage from "@pages/wp-admin/dashboard/dashboard.page";
import PagesPage from "@pages/wp-admin/pages/pages.page";
import PageView from "@pages/frontend/pages/page-view.page";
import PageActions from "@pages/page-actions/page-actions";
import PostPage from "@pages/wp-admin/posts/post.page";

export const test = base.extend<{
  commonPage: CommonPage;
  wpLoginPage: WpLoginPage;
  wpDashboardPage: DashboardPage;
  wpPages: PagesPage;
  postPage: PostPage;
  pageView: PageView;
  pageActions: PageActions;
}>({
  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },

  wpLoginPage: async ({ page }, use) => {
    await use(new WpLoginPage(page));
  },

  wpDashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  wpPages: async ({ page }, use) => {
    await use(new PagesPage(page));
  },

  postPage: async ({ page }, use) => {
    await use(new PostPage(page));
  },

  pageView: async ({ page }, use) => {
    await use(new PageView(page));
  },

  pageActions: async ({ page }, use) => {
    await use(new PageActions(page));
  }
});

export const expect = base.expect;
