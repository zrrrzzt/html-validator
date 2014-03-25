var request = require('request')
  , validatorUrl = 'http://html5.validator.nu/?doc=';

module.exports = function(opts, callback){

  if(!opts.url){
    return callback(new Error('Missing required option: url'), null);
  }

  var url = validatorUrl + opts.url + '&out=json';

  request(url, function(error, response, body){
    if(error){
      return callback(error, null);
    } else {
      return callback(null, JSON.parse(body.toString()));
    }
  });
}