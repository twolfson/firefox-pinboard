var data = require("sdk/self").data;

require("sdk/widget").Widget({
  id: "mozilla-icon",
  label: "My Mozilla Widget",
  contentURL: data.url("pin.html")
});
console.log('wat');