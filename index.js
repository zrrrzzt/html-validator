var request = require('request');

function mkReqOpts(opts){
  var newOpts = {
    uri: 'http://html5.validator.nu',
    qs: {out:opts.format},
    method: 'GET'
  };

  if(opts.url){
    newOpts.qs.doc = opts.url;
  }

  if(opts.data){
    newOpts.body = opts.data;
    newOpts.method = 'POST';
    newOpts.headers = {
      'Content-Type': 'text/html; charset=utf-8'
    };
  }

  return newOpts;
}

module.exports = function(opts, callback){

  if(!opts.format || (!opts.url && !opts.data)){
    return callback(new Error('Missing required params'), null)
  }

  var reqOpts = mkReqOpts(opts);

  request(reqOpts, function(error, response, result){

    if(error){
      return callback(error, null);
    }

    var data = opts.format == 'json' ? JSON.parse(result) : result;

    return callback(null, data);

  });
};