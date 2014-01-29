const { identify } = require('sdk/ui/id');

const Thingy = Class({
  initialize: function(details) {
    let id = identify(this);
  }
});