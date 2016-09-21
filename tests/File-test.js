/*jshint esnext: true, node: true, mocha: true*/
"use strict";

const File = require("../src/File");
const assert = require("assert");

const numTestLines = 5;

describe("FileTest", () => {
  it("Initialize file.", () => {
    const file = new File();
    assert.strictEqual(file.rows.length, 0);
  });
  it("Load a pipe delimited file.", () => {
    const file = new File();
    return file.load("./tests/data/test-data-pipe.txt","|")
    .then(() => {
      assert.strictEqual(file.rows.length, numTestLines);
    });
  });
  it("Load a pipe comma file.", () => {
    const file = new File();
    return file.load("./tests/data/test-data-comma.txt",",")
    .then(() => {
      assert.strictEqual(file.rows.length, numTestLines);
    });
  });
  it("Load a pipe space file.", () => {
    const file = new File();
    return file.load("./tests/data/test-data-space.txt"," ")
    .then(() => {
      assert.strictEqual(file.rows.length, numTestLines);
    });
  });
});
