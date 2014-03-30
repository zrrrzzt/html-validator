#html-validator#

A Node.js module for validating html using [validator.nu](http://validator.nu/)

Supports the following modes from Validator.nu [Web Service Interface](http://wiki.whatwg.org/wiki/Validator.nu_Web_Service_Interface)
- Document URL as a GET parameter; the service retrieves the document by URL over HTTP or HTTPS.
- Document POSTed as the HTTP entity body; parameters in query string as with GET.

##Installation##

```
$ npm install html-validator
```

##Usage##

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