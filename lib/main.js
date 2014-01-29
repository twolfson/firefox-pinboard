var data = require("sdk/self").data;

require("sdk/widget").Widget({
  id: "mozilla-icon",
  label: "My Mozilla Widget",
  contentURL: "chrome://lib/favicon.ico"
});
console.log('wat');