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
        let lines = data.toString().split(/\r?\n/);
        for(let i = 0; i < lines.length; i++) {
          let line = lines[i].split(delimiter);
          if(line.length === 5) {
            this.rows.push({
              lastname: line[0],
              firstname: line[1],
              gender: line[2],
              favoritecolor: line[3],
              dateofbirth: line[4]
            });
          }
        }
        return resolve();
      });
    });
  }
  
  sortBy(field) {
    field = field.toLowerCase();
    switch(field) {
      case "gender":
        return this._sortByGender();
      case "birthdate":
        return this._sortByBirthDate();
      case "lastname":
        return this._sortByLastName();
    }
  }
  
  _sortByGender() {
    return this.rows.sort((a,b) => {
      if(a.gender === 'F' && b.gender === 'M') {
        return -1;
      }
      if(a.gender === 'M' && b.gender === 'F') {
        return 1;
      }
      return a.lastname.localeCompare(b.lastname);
    });
  }
  
  _sortByBirthDate() {
    return this.rows.sort((a,b) => {
      let da = a.dateofbirth.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      let db = b.dateofbirth.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      return `${da[3]}${da[1]}${da[2]}`.localeCompare(`${db[3]}${db[1]}${db[2]}`);
    });
  }
  
  _sortByLastName() {
    return this.rows.sort((a,b) => {
      return a.lastname.localeCompare(b.lastname) * -1;
    });
  }
}

module.exports = File;
