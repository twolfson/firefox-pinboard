var data = require("sdk/self").data;

require("sdk/widget").Widget({
  id: "mozilla-icon",
  label: "My Mozilla Widget",
  contentURL: data.url("pin_32x32.png")
});
console.log('wat');