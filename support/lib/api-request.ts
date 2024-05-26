import axios, { AxiosInstance } from "axios";
import { ContentType } from "support/types/global";

export default class ApiRequest {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create();
  }

  setBearerToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  setBasicAuth(username: string, password: string) {
    this.instance.defaults.headers.common["Authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
  }

  setContentType(contentType: ContentType) {
    this.instance.defaults.headers.common["Content-Type"] = contentType;
  }

  get(requestPath: string, queryString: string = "") {
    return this.instance.get(requestPath, {
      params: queryString
    });
  }

  post(requestPath: string, requestBody: unknown) {
    return this.instance.post(requestPath, requestBody);
  }

  put(requestPath: string, requestBody: unknown) {
    return this.instance.put(requestPath, requestBody);
  }

  delete({ requestPath, queryString, requestBody }: { requestPath: string; queryString?: string; requestBody?: unknown }) {
    return this.instance.delete(requestPath, { params: queryString, data: requestBody });
  }
}
