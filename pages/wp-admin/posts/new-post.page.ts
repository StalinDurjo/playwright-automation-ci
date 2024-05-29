import BasePage from "@pages/base/base.page";
import BlockEditorPage from "@pages/base/common/block-editor.page";
import { Page } from "@playwright/test";

export default class NewPostPage extends BasePage {
  private blockEditor: BlockEditorPage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = "/wp-admin/post-new.php";
    this.blockEditor = new BlockEditorPage(this.page);
  }

  async enterPostTitle(title: string) {
    await this.blockEditor.enterPostTitle(title);
  }

  async clickOnPublish() {
    await this.blockEditor.clickOnPublishButton();
  }

  async clickOnPublishConfirm() {
    await this.blockEditor.clickOnPublishConfirmButton();
  }

  async clickOnViewPostLink() {
    await this.blockEditor.clickOnViewPostLink();
  }
}
