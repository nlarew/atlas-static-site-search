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
  const res = await searchAgg(collection, "flutter write data", 10, 0);
  expect(res.length).toBe(10);
  const someDoc = res[0];
  console.log(someDoc.highlights);
  expect(
    Object.hasOwn(someDoc, "title") &&
      Object.hasOwn(someDoc, "doc_text") &&
      Object.hasOwn(someDoc, "highlights")
  ).toBe(true);
});

test("searchAgg returns expected number of results", async () => {
  const res5 = await searchAgg(collection, "flutter write data", 5, 0);
  const res10 = await searchAgg(collection, "flutter write data", 10, 0);
  expect(res5.length).toBe(5);
  expect(res10.length).toBe(10);
});

test("searchAgg paginates results", async () => {
  const firstTwoRes = await searchAgg(collection, "flutter write data", 2, 0);
  const secondRes = await searchAgg(collection, "flutter write data", 1, 1);
  expect(firstTwoRes[1]._id === secondRes[0]._id).toBe(true);
});
