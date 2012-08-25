var fs = require('fs'),
    stylus = require('stylus'),
    stylusImage = require('..');

function runTest(test, expected, imagePath, name, options, assert) {
  stylus(test, options)
    .use(stylusImage(options))
    .include(process.cwd() + '/test')
    .render(function(err, css) {
      // Timeout to prevent multiple errors in response to catch resend
      setTimeout(function() {
        if (err) {
          throw err;
        }

        assert.equal(css, expected, name);
        assert.equal(fs.statSync(imagePath).isFile(), true, imagePath);
      }, 0);
    });
}

exports['copy file'] = function(beforeExit, assert) {
  fs.mkdir('/tmp/stylus-images', 0777);

  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n',

      '.test {\n'
    + '  background-image: url("images/barrowLoRez@2x.png");\n'
    + '  display: inline-block;\n'
    + '}\n',
    '/tmp/stylus-images/images/barrowLoRez@2x.png',

    "Updated external url",
    {res: 2, limit: 100, copyFiles: true, filename: '/tmp/stylus-images/test.css'},
    assert);
};
