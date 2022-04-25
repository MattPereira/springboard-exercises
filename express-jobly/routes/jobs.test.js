"use strict";

const request = require("supertest");
const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /companies */

describe("POST /jobs", function () {
  const newJob = {
    title: "New Job",
    salary: 12345,
    equity: "0.123",
    companyHandle: "c1",
  };

  test("ok for admin users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.status).toEqual(201);
    expect(resp.body).toEqual({
      job: { id: expect.any(Number), ...newJob },
    });
  });

  test("unauthorized for non admin users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "new",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        title: "test",
        companyHandle: "c1",
        salary: "not-a-number",
        equity: "0",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /companies */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs: [
        {
          id: testJobIds[0],
          title: "J1",
          salary: 1,
          equity: "0.1",
          companyHandle: "c1",
          companyName: "C1",
        },
        {
          id: testJobIds[1],
          title: "J2",
          salary: 2,
          equity: "0.2",
          companyHandle: "c1",
          companyName: "C1",
        },
        {
          id: testJobIds[2],
          title: "J3",
          salary: 3,
          equity: null,
          companyHandle: "c1",
          companyName: "C1",
        },
      ],
    });
  });

  test("works: filtering", async function () {
    const resp = await request(app).get("/jobs").query({ minSalary: 2 });
    expect(resp.body).toEqual({
      jobs: [
        {
          id: testJobIds[1],
          title: "J2",
          salary: 2,
          equity: "0.2",
          companyHandle: "c1",
          companyName: "C1",
        },
        {
          id: testJobIds[2],
          title: "J3",
          salary: 3,
          equity: null,
          companyHandle: "c1",
          companyName: "C1",
        },
      ],
    });
  });

  test("works: multiple filters", async function () {
    const resp = await request(app)
      .get("/jobs")
      .query({ hasEquity: true, minSalary: 2, title: "2" });
    expect(resp.body).toEqual({
      jobs: [
        {
          id: testJobIds[1],
          title: "J2",
          salary: 2,
          equity: "0.2",
          companyHandle: "c1",
          companyName: "C1",
        },
      ],
    });
  });

  test("bad request if invalid filter key", async function () {
    const resp = await request(app)
      .get("/jobs")
      .query({ minSalary: 2, invalid: "invalid" });
    expect(resp.status).toEqual(400);
  });

  test("fails: test next() handler", async function () {
    // there's no normal failure event which will cause this route to fail ---
    // thus making it hard to test that the error-handler works with it. This
    // should cause an error, all right :)
    await db.query("DROP TABLE companies CASCADE");
    const resp = await request(app)
      .get("/jobs")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(500);
  });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/${testJobIds[0]}`);
    expect(resp.body).toEqual({
      job: {
        id: testJobIds[0],
        title: "J1",
        salary: 1,
        equity: "0.1",
        company: {
          handle: "c1",
          name: "C1",
          description: "Desc1",
          logoUrl: "http://c1.img",
          numEmployees: 1,
        },
      },
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/0`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
  test("works for admin users", async function () {
    const resp = await request(app)
      .patch(`/jobs/${testJobIds[0]}`)
      .send({
        title: "J1-update",
        salary: 999,
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({
      job: {
        id: testJobIds[0],
        title: "J1-update",
        salary: 999,
        equity: "0.1",
        companyHandle: "c1",
      },
    });
  });

  test("unauth for non admin users", async function () {
    const resp = await request(app)
      .patch(`/jobs/${testJobIds[0]}`)
      .send({
        title: "J1-update",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.status).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/jobs/${testJobIds[0]}`).send({
      title: "J1-update",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such job", async function () {
    const resp = await request(app)
      .patch(`/jobs/0`)
      .send({
        title: "J1-update",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on companyHandle change attempt", async function () {
    const resp = await request(app)
      .patch(`/jobs/${testJobIds}`)
      .send({
        companyHandle: "c2",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data type", async function () {
    const resp = await request(app)
      .patch(`/jobs/${testJobIds[0]}`)
      .send({
        salary: "not-a-number",
      })
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /companies/:handle */

describe("DELETE /jobs/:id", function () {
  test("works for admin users", async function () {
    const resp = await request(app)
      .delete(`/jobs/${testJobIds[0]}`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.body).toEqual({ deleted: `job id: ${testJobIds[0]}` });
  });

  test("unauth for non admin users", async function () {
    const resp = await request(app)
      .delete(`/jobs/${testJobIds[0]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.status).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/jobs/${testJobIds[0]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such job", async function () {
    const resp = await request(app)
      .delete(`/jobs/0`)
      .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(404);
  });
});
