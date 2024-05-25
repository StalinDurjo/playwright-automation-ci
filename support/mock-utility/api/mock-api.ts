import ApiRequest from "support/lib/api-request";
import { ContentType } from "support/types/global";

export default class MockApi {
  protected request: ApiRequest;

  constructor() {
    this.request = new ApiRequest();
  }

  setBasicAuth(username: string, password: string) {
    this.request.setBasicAuth(username, password);
  }

  setContentType(contentType: ContentType) {
    this.request.setContentType(contentType);
  }
}
