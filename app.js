/*jshint esnext: true, node: true*/
"use strict";

const File = require("./src/File");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const file = new File();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/records', (req, res) => {
  let delim = req.body.delimiter;
  let row = req.body.row;
  console.log(`row: ${row}, delimiter: ${delim}`);
  file.addRow(row,delim);
  console.log(file.rows.length);
  res.send("ok");
});

app.get('/records/:field', (req, res) => {
  let data = file.sortBy(req.params.field);
  console.log(data);
  res.send(JSON.stringify(data));
});

app.listen(8080, () => {
  console.log("Server started on 8080");
});
