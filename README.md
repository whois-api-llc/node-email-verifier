# node-email-verifier

[![NPM Version](https://img.shields.io/npm/v/email-verifier.svg?style=flat)](https://npmjs.org/package/email-verifier)
[![NPM Downloads](http://img.shields.io/npm/dm/email-verifier.svg?style=flat)](https://npmjs.org/package/email-verifier)
[![Build Status](https://img.shields.io/travis/rdegges/node-email-verifier.svg?style=flat)](https://travis-ci.org/rdegges/node-email-verifier)

*The best possible way to verify and validate an email address in Node.*

![Email Verifier Icon](https://github.com/rdegges/node-email-verifier/raw/master/images/verify-email.png)


## Meta

- Author: Randall Degges
- Email: r@rdegges.com
- Twitter: [@rdegges](https://twitter.com/rdegges)
- Site: https://www.rdegges.com
- Status: production ready


## Prerequisites

To use this library, you'll need to create a free WhoisAPI account:
https://www.whoisxmlapi.com/email-verification-api.php

If you haven't done this yet, please do so now.


## Installation

To install `email-verifier` using [npm](https://www.npmjs.org/), simply run:

```console
$ npm install email-verifier
```

In the root of your project directory.


## Usage

Once you have `email-verifier` installed, you can use it to easily verify an
email address. Email verification performs a number of checks to ensure a given
email address is actually valid:

- Syntax checks
- Fake email pattern detection
- Typo and curse word checks
- Mail server existence check
- Mail existence check
- Catch-all domain email check
- Disposable email address check

This library gives you access to all sorts of email verification data that you
can use in your application in any number of ways.

```javascript
const Verifier = require("email-verifier");

let verifier = new Verifier("your_whoisapi_username", "your_whoisapi_password");
verifier.verify("r@rdegges.com", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

Here's the sort of data you might get back when running all checks at once:

```json
{
  "catchAll": "false",
  "disposable": "false",
  "dns": "OK",
  "emailAddress": "r@rdegges.com",
  "free": "false",
  "mxs": [ "mail.protonmail.ch" ],
  "smtp": "OK",
  "validFormat": "OK"
}
```

By default, when verifying an email address all types of verification checks
will be performed. This can take a while (up to two seconds), and may not be
ideal for your use case.

If you prefer to only check certain types of email verification information, you
can pass in your preferred checks when creating the `Verifier` object:

```javascript:
const Verifier = require("email-verifier");

let verifier = new Verifier("your_whoisapi_username", "your_whoisapi_password", {
  checkCatchAll: false,
  checkDisposable: false,
  checkFree: false,
  validateDNS: false,
  validateSMTP: false
});
```

By default, this library also handles retrying failed HTTP requests for you. For
instance: if the verification API service is currently down or having issues,
your request will be retried up to five consecutive times before failing.

Again: this can add more request time, and may not be what you want in all
cases.

If you'd prefer to lower the amount of retries that this library will perform on
your behalf, you can pass in a `retries` option like so:

```javascript
const Verifier = require("email-verifier");

let verifier = new Verifier("your_whoisapi_username", "your_whoisapi_password", {
  retries: 2
});
```


## Changelog

**No releases yet.**
