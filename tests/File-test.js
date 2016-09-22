/*jshint esnext: true, node: true, mocha: true*/
"use strict";

const File = require("../src/File");
const assert = require("assert");

const numTestLines = 5;
const expectedRows = [
  {
    lastname: "McCall",
    firstname: "Ian",
    gender: "M",
    favoritecolor: "red",
    dateofbirth: "9/21/1986"
  },{
    lastname: "Doe",
    firstname: "Jane",
    gender: "F",
    favoritecolor: "blue",
    dateofbirth: "8/16/1984"
  },{
    lastname: "Lovelace",
    firstname: "Ada",
    gender: "F",
    favoritecolor: "green",
    dateofbirth: "12/10/1815"
  },{
    lastname: "Wozniak",
    firstname: "Steve",
    gender: "M",
    favoritecolor: "yellow",
    dateofbirth: "8/11/1950"
  },{
    lastname: "Gates",
    firstname: "William",
    gender: "M",
    favoritecolor: "beige",
    dateofbirth: "10/28/1955"
  }
];
const expectedRowsSortByGender = [
  {
    lastname: "Doe",
    firstname: "Jane",
    gender: "F",
    favoritecolor: "blue",
    dateofbirth: "8/16/1984"
  },{
    lastname: "Lovelace",
    firstname: "Ada",
    gender: "F",
    favoritecolor: "green",
    dateofbirth: "12/10/1815"
  },{
    lastname: "Gates",
    firstname: "William",
    gender: "M",
    favoritecolor: "beige",
    dateofbirth: "10/28/1955"
  },{
    lastname: "McCall",
    firstname: "Ian",
    gender: "M",
    favoritecolor: "red",
    dateofbirth: "9/21/1986"
  },{
    lastname: "Wozniak",
    firstname: "Steve",
    gender: "M",
    favoritecolor: "yellow",
    dateofbirth: "8/11/1950"
  }
];
const expectedRowsSortByBirthDate = [
  {
    lastname: "Lovelace",
    firstname: "Ada",
    gender: "F",
    favoritecolor: "green",
    dateofbirth: "12/10/1815"
  },{
    lastname: "Wozniak",
    firstname: "Steve",
    gender: "M",
    favoritecolor: "yellow",
    dateofbirth: "8/11/1950"
  },{
    lastname: "Gates",
    firstname: "William",
    gender: "M",
    favoritecolor: "beige",
    dateofbirth: "10/28/1955"
  },{
    lastname: "Doe",
    firstname: "Jane",
    gender: "F",
    favoritecolor: "blue",
    dateofbirth: "8/16/1984"
  },{
    lastname: "McCall",
    firstname: "Ian",
    gender: "M",
    favoritecolor: "red",
    dateofbirth: "9/21/1986"
  }
];
const expectedRowsSortByLastName = [
  {
    lastname: "Wozniak",
    firstname: "Steve",
    gender: "M",
    favoritecolor: "yellow",
    dateofbirth: "8/11/1950"
  },{
    lastname: "McCall",
    firstname: "Ian",
    gender: "M",
    favoritecolor: "red",
    dateofbirth: "9/21/1986"
  },{
    lastname: "Lovelace",
    firstname: "Ada",
    gender: "F",
    favoritecolor: "green",
    dateofbirth: "12/10/1815"
  },{
    lastname: "Gates",
    firstname: "William",
    gender: "M",
    favoritecolor: "beige",
    dateofbirth: "10/28/1955"
  },{
    lastname: "Doe",
    firstname: "Jane",
    gender: "F",
    favoritecolor: "blue",
    dateofbirth: "8/16/1984"
  }
];

describe("File Load Test", () => {
  it("Initialize file.", () => {
    const file = new File();
    assert.deepEqual(file.rows, []);
  });
  it("Load a pipe delimited file.", () => {
    const file = new File();
    return file.load("./tests/data/test-data-pipe.txt","|")
    .then(() => {
      assert.deepEqual(file.rows, expectedRows);
    });
  });
  it("Load a pipe comma file.", () => {
    const file = new File();
    return file.load("./tests/data/test-data-comma.txt",",")
    .then(() => {
      assert.deepEqual(file.rows, expectedRows);
    });
  });
  it("Load a pipe space file.", () => {
    const file = new File();
    return file.load("./tests/data/test-data-space.txt"," ")
    .then(() => {
      assert.deepEqual(file.rows, expectedRows);
    });
  });
});

describe("File Sort Test", () => {
  const file = new File();
  
  before(() => {
    return file.load("./tests/data/test-data-pipe.txt","|");
  });
  it("Sort by Gender.", () => {
    assert.deepEqual(file.sortBy("gender"),expectedRowsSortByGender);
  });
  it("Sort by Birth Date.", () => {
    assert.deepEqual(file.sortBy("birthdate"),expectedRowsSortByBirthDate);
  });
  it("Sort by Last Name, descending.", () => {
    assert.deepEqual(file.sortBy("lastname"),expectedRowsSortByLastName);
  });
});
