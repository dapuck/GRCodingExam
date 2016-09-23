/*jshint esnext: true, node: true*/
"use strict";

const File = require("./src/File");
const path = require("path");
const options = require("nomnom")
  .options({
    "file1": {
      position: 0,
      required: true,
      transform: (filename) => {
        return path.resolve(filename);
      },
      help: "Pipe delimited file"
    },
    "file2": {
      position: 1,
      required: true,
      transform: (filename) => {
        return path.resolve(filename);
      },
      help: "Comma delimited file"
    },
    "file3": {
      position: 2,
      required: true,
      transform: (filename) => {
        return path.resolve(filename);
      },
      help: "Space delimited file"
    }
  })
  .parse();

const file = new File();
file.load(options.file1,"|")
.then(() => {
  return file.load(options.file2,",");
})
.then(() => {
  return file.load(options.file3," ");
})
.then(() => {
  const byGender = file.sortBy("gender");
  console.log("Sorted by gender:");
  console.log(`LastName | FirstName | Gender | FavoriteColor | DateOfBirth`);
  byGender.forEach((row) => {
    console.log(`${row.lastname} | ${row.firstname} | ${row.gender} | ${row.favoritecolor} | ${row.dateofbirth}`);
  });
  
  const byBirthDate = file.sortBy("birthdate");
  console.log("Sorted by birth date:");
  console.log(`LastName | FirstName | Gender | FavoriteColor | DateOfBirth`);
  byBirthDate.forEach((row) => {
    console.log(`${row.lastname} | ${row.firstname} | ${row.gender} | ${row.favoritecolor} | ${row.dateofbirth}`);
  });
  
  const byLastName = file.sortBy("lastname");
  console.log("Sorted by last name, descending:");
  console.log(`LastName | FirstName | Gender | FavoriteColor | DateOfBirth`);
  byLastName.forEach((row) => {
    console.log(`${row.lastname} | ${row.firstname} | ${row.gender} | ${row.favoritecolor} | ${row.dateofbirth}`);
  });
});
