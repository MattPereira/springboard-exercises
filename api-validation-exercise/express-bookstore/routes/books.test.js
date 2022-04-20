process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const Book = require("../models/book");
const db = require("../db");

let testBook;

beforeEach(async function () {
  await db.query("DELETE FROM books");

  testBook = await Book.create({
    isbn: "111111",
    amazon_url: "http://a.co/eobPtX2",
    author: "test author",
    language: "test language",
    pages: 222,
    publisher: "test publisher",
    title: "test title",
    year: 2022,
  });
});

describe("GET /books", function () {
  it("gets a list of books", async function () {
    const res = await request(app).get("/books");
    const books = res.body.books;

    expect(books).toHaveLength(1);
    expect(books[0]).toHaveProperty("isbn");
    expect(books[0]).toHaveProperty("author");
    expect(books[0]).toHaveProperty("pages");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: [testBook],
    });
  });
});

describe("GET /books/:isbn", function () {
  it("get a single one book", async function () {
    const res = await request(app).get(`/books/${testBook.isbn}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ book: testBook });
  });
  it("Responds with 404 if invalid isbn", async function () {
    const res = await request(app).get(`/books/12345`);
    expect(res.status).toBe(404);
  });
});

describe("POST /books", function () {
  it("creates a new book", async function () {
    const newBook = {
      isbn: "0691161519",
      amazon_url: "http://a.co/eobPtX2",
      author: "Matthew Lane",
      language: "english",
      pages: 264,
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017,
    };

    const res = await request(app).post("/books").send(newBook);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ book: newBook });
  });

  it("prevents creating book if missing required info", async function () {
    //missing amazon_url and pages
    const partialBook = {
      isbn: "12345567890",
      author: "Matthew Lane",
      language: "english",
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      year: 2017,
    };

    const res = await request(app).post("/books").send(partialBook);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(["error", "message"]);
  });

  it("returns 400 if invalid input types", async function () {
    //pages and year should be integers, not strings
    const invalidBook = {
      isbn: "111111",
      amazon_url: "http://a.co/eobPtX2",
      author: "test author",
      language: "test language",
      pages: "222",
      publisher: "test publisher",
      title: "test title",
      year: "2022",
    };

    const res = await request(app).post("/books").send(invalidBook);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(["error", "message"]);
  });
});

describe("PUT /books/:isbn", function () {
  it("updates a single book", async function () {
    const updateBook = {
      isbn: "111111",
      amazon_url: "http://a.co/test",
      author: "updated author",
      language: "updated language",
      pages: 777,
      publisher: "update dpub",
      title: "updated title",
      year: 1999,
    };
    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(updateBook);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ book: updateBook });
  });

  it("returns 400 if missing required info", async function () {
    //missing year and pages
    const partialBook = {
      author: "Matthew Lane",
      language: "english",
      publisher: "Princeton University Press",
      title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    };

    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(partialBook);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(["error", "message"]);
  });

  it("returns 400 if invalid input types", async function () {
    //pages and year should be integers, not strings
    const invalidBook = {
      author: "test author",
      language: "test language",
      pages: "222",
      publisher: "test publisher",
      title: "test title",
      year: "2022",
    };

    const res = await request(app)
      .put(`/books/${testBook.isbn}`)
      .send(invalidBook);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(["error", "message"]);
  });

  it("returns 404 if invalid isbn", async function () {
    const res = await request(app).put(`/books/12345`).send({
      isbn: "444444",
      amazon_url: "http://a.co/test",
      author: "updated author",
      language: "updated language",
      pages: 444,
      publisher: "update publisher",
      title: "updated title",
      year: 1991,
    });
    expect(res.status).toEqual(404);
  });
});

describe("DELETE /books/:isbn", function () {
  it("deletes an existing book", async function () {
    const res = await request(app).delete(`/books/${testBook.isbn}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Book deleted" });
  });

  it("returns 404 if invalid isbn", async function () {
    const res = await request(app).delete(`/books/12345`);
    expect(res.status).toEqual(404);
  });
});

afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
});

afterAll(async function () {
  await db.end();
});
