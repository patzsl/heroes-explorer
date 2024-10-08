const fs = require("fs");
const path = require("path");

const dir = "src/environments";
const file = "environment.ts";
const prodFile = "environment.ts";

const content = `${process.env.MARVEL_DETAILS}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    // Directory doesn't exist
    console.log("src doesn't exist, creating now", process.cwd());
    // Create /src
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (error) {
      console.log(`Error while creating ${dir}. Error is ${error}`);
      process.exit(1);
    }
  }
  // Now write to file
  try {
    fs.writeFileSync(dir + "/" + file, content);
    fs.writeFileSync(dir + "/" + prodFile, content);
    console.log("Created successfully in", process.cwd());
    if (fs.existsSync(dir + "/" + file)) {
      console.log("File is created", path.resolve(dir + "/" + file));
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
