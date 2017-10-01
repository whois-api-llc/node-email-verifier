"use strict";

const assert = require("assert");
const Verifier = require("..");


const USERNAME = process.env.WHOIS_USERNAME;
const PASSWORD = process.env.WHOIS_PASSWORD;


describe("Verifier", () => {
  describe("#verifyOptions()", () => {
    it("should throw an error if no username is supplied", () => {
      assert.throws(() => { new Verifier(); }, "username required");
    });

    it("should throw an error if no password is supplied", () => {
      assert.throws(() => { new Verifier("username"); }, "password required");
    });

    it("should throw an error if bad username is supplied", () => {
      assert.throws(() => { new Verifier(123); }, "username must be a string");
    });

    it("should throw an error if bad password is supplied", () => {
      assert.throws(() => { new Verifier("username", 123); }, "password must be a string");
    });

    it("should throw an error if opts.retries is supplied", () => {
      assert.throws(() => { new Verifier("username", "password", { retries: "retries" }); }, "opts.retries must be a number");
    });
  });

  describe("#verify()", () => {
    it("should return an error if the username/password are invalid", (done) => {
      let verifier = new Verifier("as;ljfdsagsag", "asgddsafdsakjldsa");

      verifier.verify("r@rdegges.com", (err, resp) => {
        assert(typeof err.message === "string");
        done();
      });
    });

    it("should return a response", (done) => {
      let verifier = new Verifier(USERNAME, PASSWORD);

      verifier.verify("r@rdegges.com", (err, resp) => {
        assert.ifError(err);
        assert(resp && resp.EmailVerifyRecord);
        assert.equal(resp.EmailVerifyRecord.emailAddress, "r@rdegges.com");
        done();
      });
    });
  });
});

if (!(USERNAME && PASSWORD)) {
  throw new Error("WHOIS_USERNAME and WHOIS_PASSWORD environment variables not set.");
}
