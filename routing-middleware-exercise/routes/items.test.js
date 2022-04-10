process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let tofu = { name: "Tofu", price: 3.99 };

beforeEach(function () {
  items.push(tofu);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([tofu]);
    expect(res.body).toHaveLength(1);
  });
});

describe("GET /items/:name", () => {
  test("Get an item using name", async () => {
    const res = await request(app).get(`/items/${tofu.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(tofu);
  });

  test("Responds with 404 if invalid name", async () => {
    const res = await request(app).get(`/items/miata`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creating a new item", async () => {
    const res = await request(app)
      .post(`/items`)
      .send({ name: "mala", price: 47.95 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "mala", price: 47.95 } });
    expect(res.body.added).toHaveProperty("name");
    expect(res.body.added).toHaveProperty("price");
    expect(res.body.added.name).toEqual("mala");
    expect(res.body.added.price).toEqual(47.95);
  });

  test("Responds with 400 if no name sent", async () => {
    const res = await request(app).post("/items").send({ price: 44.44 });
    expect(res.statusCode).toBe(400);
  });

  test("Responds with 400 if no price sent", async () => {
    const res = await request(app).post("/items").send({ name: "boomerang" });
    expect(res.statusCode).toBe(400);
  });
});

describe("PATCH /items/:name", () => {
  test("Updating an item name only", async () => {
    const res = await request(app)
      .patch(`/items/${tofu.name}`)
      .send({ name: "tempeh" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "tempeh", price: 3.99 } });
  });

  test("Updating an item price only", async () => {
    const res = await request(app)
      .patch(`/items/${tofu.name}`)
      .send({ price: 1.99 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "tempeh", price: 1.99 } });
  });

  test("Responds with 404 if invalid item name", async () => {
    const res = await request(app)
      .patch(`/items/miata`)
      .send({ name: "NA", price: 7777 });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("Deleting an item", async () => {
    const res = await request(app).delete(`/items/${tofu.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });

  test("Responds with 404 for deleting an invalid item", async () => {
    const res = await request(app).delete("/items/miata");
    expect(res.statusCode).toBe(404);
  });
});
