/*jshint esnext: true, node: true, mocha: true*/
"use strict";

const File = require("../app.js");
const assert = require("assert");
const http = require("http");
const querystring = require("querystring");

function postData(row,delimiter) {
  return new Promise((resolve, reject) => {
    let data = querystring.stringify({
      "row": row,
      "delimiter": delimiter
    });
    let req = http.request({
      hostname: "localhost",
      port: 8080,
      path: "/records",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(data)
      }
    }, (res) => {
      resolve(res);
    });
    req.on('error', (e) => {
      reject(e);
    });
    req.write(data);
    req.end();
  });
}

describe("POST /records", () => {
  it("Pipe", () => {
    return postData("McCall|Ian|M|red|9/21/1986", "pipe")
    .then((res) => {
      assert.equal(200,res.statusCode);
    });
  });
  it("Comma", () => {
    return postData("McCall,Ian,M,red,9/21/1986", "comma")
    .then((res) => {
      assert.equal(200,res.statusCode);
    });
  });
  it("Space", () => {
    return postData("McCall Ian M red 9/21/1986", "space")
    .then((res) => {
      assert.equal(200,res.statusCode);
    });
  });
});

describe("GET /records/:field", () => {
  before(() => {
    return postData("McCall|Ian|M|red|9/21/1986", "pipe")
    .then(() => {
      return postData("Doe|Jane|F|blue|8/16/1984");
    }).then(() => {
      return postData("Lovelace|Ada|F|green|12/10/1815");
    }).then(() => {
      return postData("Wozniak|Steve|M|yellow|8/11/1950");
    }).then(() => {
      return postData("Gates|William|M|beige|10/28/1955");
    });
  });
  
  it("Gender", (done) => {
    http.get("http://localhost:8080/records/gender", (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it("Birthdate", (done) => {
    http.get("http://localhost:8080/records/birthdate", (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it("Name", (done) => {
    http.get("http://localhost:8080/records/name", (res) => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
