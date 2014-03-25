#html-validator#

A Node.js module for validating html against [validator.nu](http://validator.nu/)

At the moment only the URL as a GET parameter is implemented from the Validator.nu [Web Service Interface](http://wiki.whatwg.org/wiki/Validator.nu_Web_Service_Interface)

##Installation##

```
$ npm install html-validator
```

##Usage##

Create an options object.

**url** is required and is the url to the page you want to validate.

**format** defaults to json but also supports html, xhtml, xml, gnu and text. This is the formatting of the returned data.

```javascript
var validator = require('html-validator'),
  , opts = {
      url : 'http://url-to-validate.com',
      format : 'json'
  };

validator(opts, function(err, data){
  if(err) throw err;

  console.log(data);
});

```