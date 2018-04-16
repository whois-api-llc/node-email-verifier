"use strict";

const assert = require("assert");
const Verifier = require("..");


const API_KEY = process.env.API_KEY;


describe("Verifier", () => {
  describe("#verifyOptions()", () => {
    it("should throw an error if no API key is supplied", () => {
      assert.throws(() => { new Verifier(); }, "API key required");
    });

    it("should throw an error if bad API key is supplied", () => {
      assert.throws(() => { new Verifier(123); }, "API key must be a string");
    });

    it("should throw an error if bad opts.retries is supplied", () => {
      assert.throws(() => { new Verifier("api key", { retries: "retries" }); }, "opts.retries must be a number");
    });
  });

  describe("#verify()", () => {
    it("should return an error if API key is invalid", (done) => {
      let verifier = new Verifier("as;ljfdsagsag");

      verifier.verify("r@rdegges.com", (err, resp) => {
        assert(typeof err.message === "string");
        done();
      });
    });

    it("should return a response", (done) => {
      let verifier = new Verifier(API_KEY);

      verifier.verify("r@rdegges.com", (err, resp) => {
        assert.ifError(err);
        assert.equal(resp.emailAddress, "r@rdegges.com");
        done();
      });
    });
  });
});

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}
