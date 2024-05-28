import BasePage from "@pages/base/base.page";
import BlockEditorPage from "@pages/base/common/block-editor.page";
import { Page } from "@playwright/test";

export default class AddPage extends BasePage {
  readonly blockEditor: BlockEditorPage;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.url = "/wp-admin/post-new.php?post_type=page";
    this.blockEditor = new BlockEditorPage(this.page);
  }
}
