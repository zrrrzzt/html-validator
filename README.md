#html-validator [![Build Status](https://travis-ci.org/zrrrzzt/html-validator.svg?branch=master)](https://travis-ci.org/zrrrzzt/html-validator)

A Node.js module/CLI app for validating html using [validator.w3.org/nu](http://validator.w3.org/nu/)

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

**format** This is the formatting of the returned data. It supports json (default), html, xhtml, xml, gnu and text.

**validator** You can override the default validator as long as it exposes the same REST interface.

**url** The url to the page you want to validate.

```javascript
var validator = require('html-validator')
  , opts = {
      url : 'http://url-to-validate.com',
      format : 'text'
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
    format : 'text'
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

**validator** You can override the default validator as long as it exposes the same REST interface.

```javascript
var validator = require('html-validator')
  , opts = {
      url : 'http://url-to-validate.com',
      validator: 'http://html5.validator.nu',
      format : 'text'
  };

validator(opts, function(err, data){
  if(err) throw err;

  console.log(data);
});

```


##CLI

Pass in <url> or --file and optional --format or --validator.

###Installation

Install globally

```
$ npm install html-validator -g
```

###Usage

With url

```
$ html-validator <url>
```

With file

```
$ html-validator --file=path-to-file
```

Optional pass in format for returned data.

Valid options: json, html, xhtml, xml, gnu and text (default).

```
$ html-validator <url> --format=gnu
```

Optional pass in another validator.

It needs to expose the same REST interface.

```
$ html-validator <url> --validator='http://html5.validator.nu'
```