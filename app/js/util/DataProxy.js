var Promise = require('bluebird').Promise;

class DataProxy {
  constructor() {
    this.sources = sources;
  }

  get(url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };

      // Make the request
      req.send();
    });
  }

  post(url, params) {
    return new Promise(function(resolve, reject){
      var req = new XMLHttpRequest();   // new HttpRequest instance
      req.open("POST", url);
      req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };

      req.send(JSON.stringify(params));
    })
  }

  fetchSource(source){
    return this.get(sources[source]).then(JSON.parse);
  }

  fetchAll(){
    let all = [];
    Object.keys(sources).forEach((key) => {
      all.push(this.fetchSource(key));
    });

    return Promise.all(all);
  }
};

module.exports = DataProxy;
