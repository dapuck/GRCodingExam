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
          this.addRow(lines[i]);
        }
        return resolve();
      });
    });
  }
  
  addRow(str,delimiter) {
    let line = str.split(delimiter);
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
  
  sortBy(field) {
    field = field.toLowerCase();
    switch(field) {
      case "gender":
        this._sortByGender();
        break;
      case "birthdate":
        this._sortByBirthDate();
        break;
      case "lastname":
        this._sortByLastName();
        break;
    }
    return Array.from(this.rows);
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
