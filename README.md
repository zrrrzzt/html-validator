#html-validator [![Build Status](https://travis-ci.org/zrrrzzt/html-validator.svg?branch=master)](https://travis-ci.org/zrrrzzt/html-validator)

A Node.js module/CLI app for validating html using [validator.nu](http://validator.nu/)

##Module
Supports the following modes from Validator.nu [Web Service Interface](http://wiki.whatwg.org/wiki/Validator.nu_Web_Service_Interface)
- Document URL as a GET parameter; the service retrieves the document by URL over HTTP or HTTPS.
- Document POSTed as the HTTP entity body; parameters in query string as with GET.

###Installation

```
$ npm install html-validator
```

###Test

```
$ npm test
```

###Usage

Create an options object.

**format** This is the formatting of the returned data and it is required. It supports json, html, xhtml, xml, gnu and text.


**url** The url to the page you want to validate.

```javascript
var validator = require('html-validator')
  , opts = {
      url : 'http://url-to-validate.com',
      format : 'json'
  };

validator(opts, function(err, data){
  if(err) throw err;

  console.log(data);
});

```

**data** The html you want to validate

```javascript
var validator = require('html-validator')
  , fs = require('fs')
  , opts = {
    format : 'json'
  };


fs.readFile( 'file-to-validate.html', 'utf8', function( err, html ) {
  if (err) throw err;

  opts.data = html;

  validator(opts, function(err, data){
    if(err) throw err;

    console.log(data);
  });

});
```

##CLI

Pass in --url or --file and optional --format.

###Installation

Install globally

```
$ npm install html-validator -g
```

###Usage

With url

```
$ html-validator --url=http://url-to-validate
```

With file

```
$ html-validator --file=path-to-file
```

Optional pass in format for returned data.

Valid options: json, html, xhtml, xml, gnu and text (default).

```
$ html-validator --url=http://url-to-validate --format=gnu
```