const Realm = require("realm");
const { searchAgg } = require("../../searchPageContents");

let collection;
const appId = "docs-search-cxodi";
let app;
beforeAll(async () => {
  app = new Realm.App(appId);
  const credentials = Realm.Credentials.anonymous();
  await app.logIn(credentials);
  collection = app.currentUser
    .mongoClient("mongodb-atlas")
    .db("site-search")
    .collection("page-contents");
});

afterAll(async () => {
  await app?.currentUser.logOut();
});

test("searchAgg returns search results", async () => {
  const res = await searchAgg(collection, "flutter sdk");
  console.log(res);
});

test("searchAgg returns expected number of results", async () => {});

test("searchAgg paginates results", async () => {});
