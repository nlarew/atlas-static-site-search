import * as Realm from "realm-web";
import {APP_ID} from "../constants";

export class API {
  private static instance: API;

  private app;
  private user: any = null;

  private constructor() {
    this.app = new Realm.App({ id: APP_ID });
  }

  public static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }

    return API.instance;
  }

  public async searchDocs(query: string) {
    const user = await this.getUser();
    return await user.functions.searchPageContents(query);
  }

  private async getUser() {
    if (this.user) {
      return this.user;
    }

    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();

    // Authenticate the user
    this.user = await this.app.logIn(credentials);
    return this.user;
  }

}