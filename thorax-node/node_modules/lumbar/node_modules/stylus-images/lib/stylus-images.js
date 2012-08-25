var Scanner = require('./url-scanner'),
    url = require('./url');

function mergeUrls() {
  new Scanner(this.root, this.imagesSeen).combine();
  return new nodes.Expression(false);
}

module.exports = function(options) {
  return function(stylus) {
    stylus.define('url', url(options));
    stylus.define('merge-urls', mergeUrls);
  };
};
