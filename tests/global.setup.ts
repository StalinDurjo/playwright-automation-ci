import { test } from "@pages/base/fixtures";
// import { isSetupRequired } from "support/testability";

test.skip("Setup", async ({ page, pageActions }, testInfo) => {
  //   if (process.env.CI === "true" || (await isSetupRequired(testInfo.project.use.baseURL))) {
  console.log("Running setup...");
  await pageActions.wordpress.login("admin", "password");
  // change permalink structure
  await pageActions.wordpress.setPermalinksStructure("Post name");
  // set anyone can register to true
  await pageActions.wordpress.setAnyoneCanRegister(true);
  //   }
});
