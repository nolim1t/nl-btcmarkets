var apirequest = require('./lib/request');

module.exports = {
  test: (info, callback) => {
    callback({message: "Not implemented", input: info});
  },
  public: (info, callback) => {
    apirequest.public(info, (apicallback) => {
      callback(apicallback);
    });
  },
  private: (info, callback) => {
    apirequest.private(info, (apicallback) => {
      callback(apicallback);
    })
  }
};
