const request = require('request');
const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;
const buildquerystring = require('obj-to-querystring');
const auth = require('./auth');

module.exports = {
  private: (requestinfo, callback) => {
    if (isStringEmpty(requestinfo.endpoint) && isStringEmpty(requestinfo.apikey) && isStringEmpty(requestinfo.apisecret)) {
      var baseurl = requestinfo.baseurl || 'https://api.btcmarkets.net';
      var method = requestinfo.method || 'POST';
      var fullurl = baseurl + requestinfo.endpoint;
      var requestParams = {
        uri: fullurl,
        method: method
      };
      var authResult = auth({apikey: requestinfo.apikey, apisecret: requestinfo.apisecret, pathinfo: requestinfo.endpoint});
      if (authResult['code'] == 0) {
        requestParams['headers'] = authResult['headers']
      };
      if (requestinfo.parameetere) {

      }
      request(requestParams, (e,r,b) => {
        if (!e) {
          try {
            callback({
              message: 'Done',
              response: JSON.parse(b)
            });
          } catch (jsonparseError) {
            callback({
              message: 'Error parsing response',
            });
          }
        } else {
          callback({
            message: 'Error received from API',
            error: e
          });
        }
      });
    } else {
      callback({message: 'Missing Parameter: \'endpoint\''});
    }
  },
  public: (requestinfo, callback) => {
    if (isStringEmpty(requestinfo.endpoint)) {
      var baseurl = requestinfo.baseurl || 'https://api.btcmarkets.net';
      var method = requestinfo.method || 'GET';
      var fullurl = baseurl + requestinfo.endpoint;
      request({uri: fullurl, method: method}, function(e,r,b) {
        if (!e) {
          try {
            callback({
              message: 'Done',
              response: JSON.parse(b)
            });
          } catch (jsonparseError) {
            callback({
              message: 'Error parsing response',
            });
          }
        } else {
          callback({
            message: 'Error received from API',
            error: e
          });
        }
      });
    } else {
      callback({message: 'Missing Parameter: \'endpoint\''});
    }
  }
};
