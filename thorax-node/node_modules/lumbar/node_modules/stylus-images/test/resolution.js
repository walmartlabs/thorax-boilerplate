var stylus = require('stylus'),
    stylusImage = require('..');

const LO_REZ_DATA = 'data:image/png;base64,'
      + 'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJAQMAAAA4g48'
      + 'qAAAABlBMVEUAAABsbGxp5oJTAAAAAXRSTlMAQObYZg'
      + 'AAACNJREFUCB1jUBBgKLBgqKhgqPnBYP+BQf4BA/8BB'
      + 'vYGBmYGAF9nBsTug883AAAAAElFTkSuQmCC';
const HI_REZ_DATA = 'data:image/png;base64,'
      + 'iVBORw0KGgoAAAANSUhEUgAAACcAAAAwAgMAAADvHou'
      + 'FAAAADFBMVEUAAADu7u7l5uWztLMXvUdxAAAAAXRSTl'
      + 'MAQObYZgAAABRJREFUKFNjuMAAB6NMDOaDkcYEAJiHK'
      + 'GF+9t31AAAAAElFTkSuQmCC';

function runTest(test, expected, name, options, assert) {
  stylus(test)
    .use(stylusImage(options))
    .include(process.cwd() + '/test')
    .render(function(err, css) {
      // Timeout to prevent multiple errors in response to catch resend
      setTimeout(function() {
        if (err) {
          throw err;
        }

        assert.equal(css, expected, name);
      }, 0);
    });
}

exports['inline-non-updated-url'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n',

      '.test {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '  display: inline-block;\n'
    + '}\n',

    "Non-updated url",
    {res: 1.5},
    assert);
};
exports['inline-updated-url'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n',

      '.test {\n'
    + '  background-image: url("' + HI_REZ_DATA + '");\n'
    + '  display: inline-block;\n'
    + '}\n',

    "Updated inline url",
    {res: 2},
    assert);
};

exports['external-updated-url'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n',

      '.test {\n'
    + '  background-image: url("images/barrowLoRez@2x.png");\n'
    + '  display: inline-block;\n'
    + '}\n',

    "Updated external url",
    {res: 2, limit: 100},
    assert);
};
