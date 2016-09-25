[![Build Status](https://travis-ci.org/zrrrzzt/html-validator.svg?branch=master)](https://travis-ci.org/zrrrzzt/html-validator)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/html-validator/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/html-validator?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# html-validator

A [Node.js](https://nodejs.org/) module for validating html using [validator.w3.org/nu](http://validator.w3.org/nu/)

## Module
Supports the following modes from Validator.nu [Web Service Interface](https://github.com/validator/validator/wiki/Service:-HTTP-interface)
- Document URL as a GET parameter; the service retrieves the document by URL over HTTP or HTTPS.
- Document POSTed as the HTTP entity body; parameters in query string as with GET.

### Installation

#### From npm

```sh
$ npm install html-validator
```

#### From GitHub

```sh
$ git clone git@github.com:zrrrzzt/html-validator.git
```

Then cd into directory and run the setup script

```sh
$ npm run setup
```

### Usage

Create an options object.

**format** This is the formatting of the returned data. It supports json (default), html, xhtml, xml, gnu and text.

**validator** You can override the default validator as long as it exposes the same REST interface.

**url** The url to the page you want to validate.

```javascript
var validator = require('html-validator')
var options = {
 url: 'http://url-to-validate.com',
 format: 'text'
}

validator(options, function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
})

```

**data** The html you want to validate

```javascript
var validator = require('html-validator')
var fs = require('fs')
var options = {
  format: 'text'
}

fs.readFile( 'file-to-validate.html', 'utf8', function (err, html) {
  if (err) {
    throw err;
  }
  
  opts.data = html

  validator(opts, function (error, data) {
    if (error) {
      throw error
    }

    console.log(data)
  })

})
```

**validator** You can override the default validator as long as it exposes the same REST interface.

```javascript
var validator = require('html-validator')
var options = {
  url: 'http://url-to-validate.com',
  validator: 'http://html5.validator.nu',
  format: 'text'
};

validator(options, function(error, data) {
  if (error) {
    throw error
  }

  console.log(data)
})

```

## Related
- [html-validator-cli](https://github.com/zrrrzzt/html-validator-cli) CLI for this module