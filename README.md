# node-email-verifier

[![NPM Version](https://img.shields.io/npm/v/email-verifier.svg?style=flat)](https://npmjs.org/package/email-verifier)
[![NPM Downloads](http://img.shields.io/npm/dm/email-verifier.svg?style=flat)](https://npmjs.org/package/email-verifier)
[![Build Status](https://img.shields.io/travis/whois-api-llc/node-email-verifier.svg?style=flat)](https://travis-ci.org/whois-api-llc/node-email-verifier)

*The best possible way to verify and validate an email address in Node.*

![Email Verifier Icon](https://github.com/whois-api-llc/node-email-verifier/raw/master/images/verify-email.png)


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


## Verification Methods

Email verification is a tricky thing to do properly. There are a number of
different ways to "verify" an email address, and not all of them may be
appropriate for your use case.

This library is really flexible, and allows you to pick and choose what types of
verification are done in a granular way. Here is a list of all the different
types of email verification this library handles. This list includes all of the
latest and greatest checks, which are fully supported.

All checking mechanisms conform to best practices, and provide confident
verification.

**Syntax Checking**: This checks the email addresses and ensures that it
conforms to IETF standards using a complete syntactical email validation engine.

**Fake Email Pattern Detection**: This checks the email address against a
powerful built-in fake email pattern detector algorithm. The fake email pattern
detector is capable of detecting thousands of fake emails automatically with
very high accuracy.

**Typo/Curse Words Check**: This checks the email address against all known
common typos for most email domains. This will also detect certain curse words
present in the email address. This is useful if you're building an application
where profanity is something you want to filter.

**Mail Server Existence Check**: This checks the availability of the email
address domain using DNS MX records.

**Mail Existence Check**: This checks if the email address really exists and can
receive email via SMTP connections and email-sending emulation techniques.

**Catch-all Domain Email Check**: This checks to see if the email domain will
receive all of the email messages addressed to that domain, even if their
addresses do not exist in the mail server. This tells you whether or not you've
been given a wildcard/catch-all address, or an individual mailbox.

**Disposable Email Address Check**: This checks if the email is provided by a
known Disposable Email Address (DEA) provider such as Mailinator, 10MinuteMail,
GuerrillaMail and about 2000 more.


## Usage

Once you have `email-verifier` installed, you can use it to easily verify an
email address. Email verification performs a number of checks to ensure a given
email address is actually valid.

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

0.1.0: *10-1-2017*

- First release!
