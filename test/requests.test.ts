import app from "../lib/app";
import * as request from "supertest";

describe("GET /requests", () => {
  it("200", async() => {
    const res = await request(app).get("/requests");
    expect(res.statusCode).toEqual(200);
  });
});
