/*jshint esnext: true, node: true*/
"use strict";

const fs = require("fs");

class File {
  constructor () {
    this.rows = [];
  }
  
  load(filename, delimiter) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if(err) 
          return reject(err);
        // split each line, create object, add to this.rows
        return resolve();
      });
    });
  }
  
  sortBy() {
    
  }
}

module.exports = File;
