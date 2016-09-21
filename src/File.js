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
        let lines = data.split("\n");
        for(let i = 0; i < lines.length; i++) {
          let line = lines[i].split(delimiter);
          this.rows.push({
            lastname: line[0],
            firstname: line[1],
            gender: line[2],
            favoritecolor: line[3],
            dateofbirth: line[4]
          });
        }
        return resolve();
      });
    });
  }
  
  sortBy() {
    
  }
}

module.exports = File;
