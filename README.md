[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

# html-validator

A [Node.js](https://nodejs.org/) module for validating html using [validator.w3.org/nu](https://validator.w3.org/nu/) or [html-validate](https://html-validate.org/)

Requires Node >= 14.18.1

## Webpack

If you are using Webpack you might have som problems due to `html-validate`.
You can stick to the 5.0.3 version of this module or try some of the workarounds [described here](https://html-validate.org/dev/running-in-browser.html)

## Module

Supports the following modes from Validator.nu [Web Service Interface](https://github.com/validator/validator/wiki/Service-%C2%BB-HTTP-interface)
- Document URL as a GET parameter; the service retrieves the document by URL over HTTP or HTTPS.
- Document POSTed as the HTTP entity body; parameters in query string as with GET.

From html-validate it will only validate against the WHATWG standards.

### Installation

```sh
$ npm i html-validator
```
### Usage

Create an options object.

**format** This is the formatting of the returned data. It supports json (default), html, xhtml, xml, gnu and text for W3C and json for WHATWG.

**validator** You can override the default validator (W3C) as long as it exposes the same REST interface. To use WHATWG just pass `WHATWG` as a string

**url**/**data** The url to the page you want to validate or the data you want validated.

**ignore** String or array of strings or rules (when using WHATWG) you want the checker to remove in the response

**isLocal** Set this to true if you want to validate local urls

**isFragment** Set this to true if your data input is not a complete document


#### W3C (default)

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    format: 'text'
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```
**data** The html you want to validate

```JavaScript
(async () => {
  const validator = require('html-validator')
  const { readFileSync } = require('fs')
  const options = {
    url: 'http://url-to-validate.com',
    format: 'text',
    data: readFileSync('file-to-validate.html', 'utf8')
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

**validator** You can override the default validator as long as it exposes the same REST interface. Or use the WHATWG option for validating your files locally

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    validator: 'http://html5.validator.nu',
    format: 'text'
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    validator: 'WHATWG',
    format: 'text'
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

or run the w3c validator locally with docker `$ docker run -d -p 8888:8888 validator/validator` and

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    validator: 'http://localhost:8888',
    format: 'text'
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

**ignore** String or array of strings you want the checker to remove in the response. Requires format = text

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    format: 'text',
    ignore: 'Error: Stray end tag “div”.'
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

**headers** Object of headers to pass in with the url request

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    format: 'text',
    headers: {foo:"bar"}
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

**isLocal** Set this to true if you want to validate local urls. Will lookup page and send data to validator

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    url: 'http://url-to-validate.com',
    format: 'text',
    isLocal: true
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

**isFragment** Set this to true if you want to validate something that is not a complete document

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    data: '<p>This is a fragment</p>',
    isFragment: true
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

#### WHATWG

Using this option will validate your files locally and will probably speed up your tests in addition to not sending data over the wire for validation.

You can follow all the examples from W3C as long as you changes the options validator property to `WHATWG`

```JavaScript
(async () => {
  const validator = require('html-validator')
  const options = {
    validator: 'WHATWG',
    data: '<p>This is a fragment</p>',
    isFragment: true
  }
  
  try {
    const result = await validator(options)
    console.log(result)
  } catch (error) {
    console.error(error)
  }
})()
```

## Related

- [site-validator-cli](https://github.com/p1ho/site-validator-cli) CLI for validating a whole site or multiple pages
- [html-validator-cli](https://github.com/zrrrzzt/html-validator-cli) CLI for this module
- [html-validate](https://www.npmjs.com/package/html-validate) offline HTML5 validator

## License

[MIT](LICENSE)
