// Tell Node that we're in test "mode"
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const { createData } = require("../_test-common");

const db = require("../db");

beforeEach(createData);

afterAll(async () => {
  await db.end();
});

describe("GET /invoices", () => {
  test("Get array of invoices", async () => {
    const res = await request(app).get("/invoices");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      invoices: [
        { id: 1, comp_code: "apple" },
        { id: 2, comp_code: "apple" },
        { id: 3, comp_code: "ibm" },
      ],
    });
  });
});

describe("GET /invoices/1", () => {
  test("Get details of a particular invoice", async () => {
    const res = await request(app).get("/invoices/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      invoice: {
        id: 1,
        company: {
          code: "apple",
          name: "Apple Computer",
          description: "Maker of OSX.",
        },
        amt: 100,
        paid: false,
        add_date: "2018-01-01T08:00:00.000Z",
        paid_date: null,
      },
    });
  });

  test("Returns 404 if invalid id", async () => {
    const res = await request(app).get("/invoices/0");
    expect(res.status).toBe(404);
  });
});

describe("POST /invoices", () => {
  test("Creates a new invoice", async () => {
    const res = await request(app)
      .post("/invoices")
      .send({ comp_code: "apple", amt: 777 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      invoice: {
        id: 4,
        comp_code: "apple",
        amt: 777,
        add_date: expect.any(String),
        paid: false,
        paid_date: null,
      },
    });
  });
});

describe("PUT /invoices/1", () => {
  test("Should update invoice with id 1", async () => {
    const res = await request(app)
      .put("/invoices/1")
      .send({ amt: 1111, paid: false });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      invoice: {
        id: 1,
        comp_code: "apple",
        paid: false,
        amt: 1111,
        add_date: expect.any(String),
        paid_date: null,
      },
    });
  });

  test("Should return 404 for invalid invoice id", async () => {
    const res = await request(app).put("/invoices/0").send({ amt: 1234 });

    expect(res.status).toEqual(404);
  });

  test("Should return 500 for missing data", async () => {
    const res = await request(app).put("/invoices/1").send({});

    expect(res.status).toEqual(500);
  });
});

describe("DELETE /invoices/1", () => {
  test("Should delete invoice with id 1", async () => {
    const res = await request(app).delete("/invoices/1");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "deleted" });
  });

  test("Should respond with 404 if invalid invoice id", async () => {
    const res = await request(app).delete("/invoices/0");

    expect(res.status).toBe(404);
  });
});
