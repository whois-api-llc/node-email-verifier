"use strict";

const backoff = require("backoff");
const request = require("request");
const VERSION = require("./package.json").version;


const RETRIES = 5;
const VERIFY_URI = "https://www.whoisxmlapi.com/whoisserver/EmailVerifyService";


/**
 * Class representing a Verifier object. This object allows you to verify email
 * addresses.
 */
class Verifier {

  /**
   * Create a verifier.
   *
   * @param {string} username - The username for your whoisxmlapi.com account.
   * @param {string} password - The password for your whoisxmlapi.com account.
   * @param {object} opts - An object that contains all Verifier options.
   */
  constructor(username, password, opts) {
    this.username = username;
    this.password = password;
    this.opts = opts || {};

    this.verifyOptions();
  }

  /**
   * Verifies the constructor's options to ensure all parameters are valid.
   *
   * @throws {error} Throws an error if any of the Verifier's parameters are
   *    invalid.
   */
  verifyOptions() {
    if (!this.username) {
      throw new Error("username required");
    } else if (!this.password) {
      throw new Error("password required");
    } else if (typeof this.username !== "string") {
      throw new Error("username must be a string");
    } else if (typeof this.password !== "string") {
      throw new Error("password must be a string");
    } else if (this.opts.retries && typeof this.opts.retries !== "number") {
      throw new Error("opts.retries must be a number");
    }
  }

  /**
   * Verifies an email address using the whoisxmlapi.com service.
   *
   * @param {string} email - The email address to verify.
   * @param {callback} cb - The callback to run after verification has finished.
   */
  verify(email, cb) {
    let call = backoff.call(request, {
      uri: VERIFY_URI,
      headers: {
        "User-Agent": "node-email-verifier/" + VERSION
      },
      qs: {
        username: this.username,
        password: this.password,
        emailAddress: email,
        validateDNS: (this.opts.validateDNS === false ? false : true),
        validateSMTP: (this.opts.validateSMTP === false ? false : true),
        checkCatchAll: (this.opts.checkCatchAll === false ? false : true),
        checkFree: (this.opts.checkFree === false ? false : true),
        checkDisposable: (this.opts.checkDisposable === false ? false : true),
        outputFormat: "json"
      }
    }, (err, resp, body) => {
      if (err) {
        return cb(err);
      }

      if (resp.statusCode !== 200) {
        return cb(new Error("There was an error when making the API request. Please try again."));
      }

      try {
        let json = JSON.parse(body);

        if (json && json.ErrorMessage) {
          return cb(new Error(json.ErrorMessage.msg));
        }

        if (json && !json.emailAddress) {
          console.log(json);
          return cb(new Error("Oops! It looks like whoisxmlapi.com is having issues. Sorry!"));
        }

        cb(null, json);
      } catch(err) {
        cb(err);
      }
    });

    call.retryIf(err => { return err });
    call.setStrategy(new backoff.ExponentialStrategy);
    call.failAfter(this.opts.retries || RETRIES);
    call.start();
  }
}

module.exports = Verifier;
