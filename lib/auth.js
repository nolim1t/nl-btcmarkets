var crypto = require('crypto');

const isStringEmpty = require('fuckingundefinedemptynull').isStringSet;

module.exports = (authinfo) => {
  if (isStringEmpty(authinfo.apikey) && isStringEmpty(authinfo.apisecret) && isStringEmpty(authinfo.pathinfo)) {
    var nonce = Math.round(new Date().getTime());
    var unsigned_string = authinfo.pathinfo + "\n" + nonce;
    if (authinfo.parameters !== undefined) {
      if (authinfo.parameters !== null) {
        unsigned_string = unsigned_string + "\n" + JSON.strigify(authinfo.parameters);
      }
    }
    unsigned_string = unsigned_string + "\n";
    return {
      message: 'OK',
      code: 0,
      unsigned: unsigned_string,
      headers: {
        'User-Agent': 'nl-btcmarkets client',
        'apikey': authinfo.apikey,
        'timestamp': nonce,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Charset': 'UTF-8',
        'signature': crypto.createHmac('sha512', new Buffer(authinfo.apisecret, 'base64')).update(unsigned_string).digest('base64')
      }
    };
  } else {
    return {message: 'Need more parameters', code: -1};
  }
}
