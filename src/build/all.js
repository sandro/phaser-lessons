function a () {
  console.log("A");
}
exports.a = a;

var a = require("./a.js");
console.log("HI");
a.a();
