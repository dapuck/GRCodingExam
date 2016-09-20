/*jshint esnext: true, node: true*/
"use strict";

const File = require("./src/File");
const path = require("path");
const options = require("nomnom")
  .options({
    "delimiter": {
      abbr: "d",
      default: "|",
      transform: (delim) => {
        switch(delim) {
          case "pipe":
            return "|";
          case "comma":
            return ",";
          case "space":
            return " ";
        }
      }
    },
    "order": {
      abbr: "o",
      default: "gender",
      choices: ["gender","dob","name"]
    },
    "file": {
      position: 0,
      required: true,
      transform: (filename) => {
        return path.resolve(filename);
      }
    }
  })
  .parse();

const file = new File();
file.load(options.file,options.delimiter)
.then(() => {
  
});
