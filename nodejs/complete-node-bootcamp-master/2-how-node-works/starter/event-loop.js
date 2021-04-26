const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();

setTimeout(() => console.log("Timer 1 Finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", "utf-8", () => {
  console.log("I/O Finished");

  setTimeout(() => console.log("Timer 2 Finished"), 0);
  setTimeout(() => console.log("Timer 2 Finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));
});

console.log("Hello from top level code");

crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Password encrypted");
});

crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Password encrypted");
});
crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Password encrypted");
});
crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Password encrypted");
});
crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
  console.log(Date.now() - start, "Password encrypted");
});
