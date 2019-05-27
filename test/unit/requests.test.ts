import * as mongoose from "mongoose";
import { RequestSchema, PriceSchema } from "../../lib/models/request";
import { STATUSES } from "../../lib/models/enums";

let Request, Price;

describe("Request model", () => {
  beforeAll(() => {
    Request = mongoose.model('Request', RequestSchema);
    Price = mongoose.model('Price', PriceSchema);
  });
  it("empty object", (done) => {
    const req = new Request({});
    req.validate(err => {
      expect(err.errors.created_by).toBeDefined();
      expect(err.errors.description).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.price).toBeDefined();
      done();
    });
  });

  it("valid object", done => {
    const price = new Price({
      value: 1,
      currency: "USD"
    });

    const req = new Request({
      name: "Test",
      description: "lorem ipsum",
      created_at: new Date(),
      created_by: "Tester",
      status: STATUSES.PENDING,
      price: price,
      fav_state: true
    });

    req.validate(err => {
      expect(err).toBeNull();
      done();
    });
  });

  it("transform request", done => {
    const id = "123";
    const req = { _id: id, __v: "12345" };
    const res = { id };

    Request.schema._userProvidedOptions.toJSON.transform({}, req, {});
    expect(req).toMatchObject(res);
    done();
  });

  it("transform price", done => {
    const id = "123";
    const req = { _id: id, __v: "12345" };
    const res = {};

    Price.schema._userProvidedOptions.toJSON.transform({}, req, {});
    expect(req).toMatchObject(res);
    done();
  });
});
