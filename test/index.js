const assert = require("assert");
const Verifier = require("..");

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
});
