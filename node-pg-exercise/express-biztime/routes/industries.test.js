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

describe("GET /industries", () => {
  test("Get array of industries", async () => {
    const res = await request(app).get("/industries");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      industries: [
        {
          code: "tech",
          name: "Technology",
          company_codes: ["apple", "ibm"],
        },
        {
          code: "fin",
          name: "Finance",
          company_codes: ["apple"],
        },
        {
          code: "soft",
          name: "Software",
          company_codes: ["apple", "ibm"],
        },
      ],
    });
  });
});

describe("POST /industries", () => {
  test("Add an industry", async () => {
    const res = await request(app)
      .post("/industries")
      .send({ code: "acc", name: "Accounting" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ industry: { code: "acc", name: "Accounting" } });
  });

  test("Should return 500 for missing data", async () => {
    const res = await request(app).post("/industries").send({});

    expect(res.status).toEqual(500);
  });
});

describe("POST /industries/company", () => {
  test("Associate industry to a company", async () => {
    const res = await request(app)
      .post("/industries/company")
      .send({ company_code: "ibm", industry_code: "fin" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      company_industry: { company_code: "ibm", industry_code: "fin" },
    });
  });

  test("Should return 500 for missing data", async () => {
    const res = await request(app).post("/industries/company").send({});

    expect(res.status).toEqual(500);
  });
});
