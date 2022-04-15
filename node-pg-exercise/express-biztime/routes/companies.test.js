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

describe("GET /companies", () => {
  test("Get array of companies", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      companies: [
        { code: "apple", name: "Apple Computer" },
        { code: "ibm", name: "IBM" },
      ],
    });
  });
});

describe("GET /companies/:code", () => {
  test("Get a single company", async () => {
    const res = await request(app).get(`/companies/apple`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      company: {
        code: "apple",
        name: "Apple Computer",
        description: "Maker of OSX.",
        invoices: [1, 2],
        industries: ["Technology", "Finance", "Software"],
      },
    });
  });

  test("It should return 404 for invalid company code", async () => {
    const res = await request(app).get(`/companies/oops`);
    expect(res.status).toBe(404);
  });
});

describe("POST /companies", () => {
  test("Creating a company and slugify", async () => {
    const res = await request(app)
      .post(`/companies`)
      .send({ name: "E Corp", description: "The most evil corp" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      company: {
        code: "e-corp",
        name: "E Corp",
        description: "The most evil corp",
      },
    });
  });
});

describe("PUT /companies", () => {
  test("Updating a company name and description", async () => {
    const res = await request(app).put(`/companies/ibm`).send({
      name: "International Business Machines",
      description: "Maker of microchips",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      company: {
        code: "ibm",
        name: "International Business Machines",
        description: "Maker of microchips",
      },
    });
  });

  test("Responds with 404 if invalid company code", async () => {
    const res = await request(app)
      .put(`/companies/oops`)
      .send({ name: "oopsie", description: "dasie" });
    expect(res.status).toBe(404);
  });

  test("It should return 500 for missing data", async () => {
    const res = await request(app).put("/companies/apple").send({});

    expect(res.status).toEqual(500);
  });
});

describe("DELETE /companies/:code", () => {
  test("Deletes a company", async () => {
    const res = await request(app).delete("/companies/apple");

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ status: "deleted" });
  });

  test("Returns 404 if company code does not exist", async () => {
    const res = await request(app).delete("/companies/oopsie");

    expect(res.status).toBe(404);
  });
});
