[![Build Status](https://travis-ci.org/zrrrzzt/html-validator.svg?branch=master)](https://travis-ci.org/zrrrzzt/html-validator)
[![Coverage Status](https://coveralls.io/repos/zrrrzzt/html-validator/badge.svg?branch=master&service=github)](https://coveralls.io/github/zrrrzzt/html-validator?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# html-validator

A [Node.js](https://nodejs.org/) module for validating html using [validator.w3.org/nu](https://validator.w3.org/nu/)

## Module

Supports the following modes from Validator.nu [Web Service Interface](https://github.com/validator/validator/wiki/Service-%C2%BB-HTTP-interface)
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

**url**/**data** The url to the page you want to validate or the data you want validated.

**ignore** String or array of strings you want the checker to remove in the response

#### Promise

```JavaScript
const validator = require('html-validator')
const options = {
 url: 'http://url-to-validate.com',
 format: 'text'
}

validator(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })

```

#### Callback

```JavaScript
const validator = require('html-validator')
const options = {
 url: 'http://url-to-validate.com',
 format: 'text'
}

validator(options, (error, data) => {
  if (error) {
    console.error(error)
  }
  console.log(data)
})

```

**data** The html you want to validate

#### Promise
```JavaScript
const validator = require('html-validator')
const fs = require('fs')
var options = {
  format: 'text'
}

fs.readFile( 'file-to-validate.html', 'utf8', (err, html) => {
  if (err) {
    throw err;
  }
  
  options.data = html

  validator(options)
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error(error)
    })
})
```

#### Callback
```JavaScript
const validator = require('html-validator')
const fs = require('fs')
var options = {
  format: 'text'
}

fs.readFile( 'file-to-validate.html', 'utf8', (err, html) => {
  if (err) {
    throw err;
  }
  
  options.data = html

  validator(options, (error, data) => {
    if (error) {
      console.error(error)
    }

    console.log(data)
  })
})
```

**validator** You can override the default validator as long as it exposes the same REST interface.

#### Promise

```JavaScript
const validator = require('html-validator')
const options = {
  url: 'http://url-to-validate.com',
  validator: 'http://html5.validator.nu',
  format: 'text'
};

validator(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })
```

#### Callback

```JavaScript
const validator = require('html-validator')
const options = {
  url: 'http://url-to-validate.com',
  validator: 'http://html5.validator.nu',
  format: 'text'
};

validator(options, (error, data) => {
  if (error) {
    console.error(error)
  }

  console.log(data)
})
```

**ignore** String or array of strings you want the checker to remove in the response. Requires format = text

### Promise

```JavaScript
const validator = require('html-validator')
const options = {
 url: 'http://url-to-validate.com',
 format: 'text',
 ignore: 'Error: Stray end tag “div”.'
}

validator(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })

```

#### Callback

```JavaScript
const validator = require('html-validator')
const options = {
 url: 'http://url-to-validate.com',
 format: 'text',
 ignore: 'Error: Stray end tag “div”.'
}

validator(options, (error, data) => {
  if (error) {
    console.error(error)
  }
  console.log(data)
})

```

**headers** Object of headers to pass in with the url request

### Promise

```JavaScript
const validator = require('html-validator')
const options = {
 url: 'http://url-to-validate.com',
 headers: {foo:"bar"}
}

validator(options)
  .then((data) => {
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })

```

#### Callback

```JavaScript
const validator = require('html-validator')
const options = {
 url: 'http://url-to-validate.com',
 headers: {foo:bar}
}

validator(options, (error, data) => {
  if (error) {
    console.error(error)
  }
  console.log(data)
})

```

## Related

- [html-validator-cli](https://github.com/zrrrzzt/html-validator-cli) CLI for this module

## License

[MIT](LICENSE)
