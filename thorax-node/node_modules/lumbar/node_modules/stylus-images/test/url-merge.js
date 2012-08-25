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

function runTest(test, expected, name, assert, options) {
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

exports['simple-url'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n'
    + '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n',

      '.test {\n'
    + '  display: inline-block;\n'
    + '}\n'
    + '.test,\n'
    + '.test {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '}\n',

    "Simple URL Matches",
    assert);
};

exports['single-instance'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n',

      '.test {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '  display: inline-block;\n'
    + '}\n',

    "Simple URL Matches",
    assert);
};

exports['different-properties'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '.test\n'
    + '  background url("images/barrowLoRez.png")\n',

      '.test {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '}\n'
    + '.test {\n'
    + '  background: url("' + LO_REZ_DATA + '");\n'
    + '}\n',

    "Different Properties",
    assert);
};

exports['conditional-properties'] = function(beforeExit, assert) {
  runTest(
      '.test1\n'
    + '  if true\n'
    + '    background-image url("images/barrowLoRez.png")\n'
    + '.test2\n'
    + '  background-image url("images/barrowLoRez.png")\n',

      '.test1,\n'
    + '.test2 {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '}\n',

    "True Conditional",
    assert);
  runTest(
      '.test1\n'
    + '  if false\n'
    + '    background-image url("images/barrowLoRez.png")\n'
    + '.test2\n'
    + '  background-image url("images/barrowLoRez.png")\n',

      '.test2 {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '}\n',

    "False Conditional",
    assert);
};

exports['external-url'] = function(beforeExit, assert) {
  runTest(
      '.test1\n'
    + '  background-image url("foo.png")\n'
    + '.test2\n'
    + '  background-image url("foo.png")\n',

      '.test1 {\n'
    + '  background-image: url("foo.png");\n'
    + '}\n'
    + '.test2 {\n'
    + '  background-image: url("foo.png");\n'
    + '}\n',

    "True Conditional",
    assert);
  runTest(
      '.test1\n'
    + '  if false\n'
    + '    background-image url("images/barrowLoRez.png")\n'
    + '.test2\n'
    + '  background-image url("images/barrowLoRez.png")\n',

      '.test2 {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '}\n',

    "False Conditional",
    assert);
};

exports['multiple-combine'] = function(beforeExit, assert) {
  runTest(
      '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '  display inline-block\n'
    + '.test\n'
    + '  background-image url("images/barrowLoRez.png")\n'
    + '.test2\n'
    + '  background-image url("images/barrowLoRez@2x.png")\n'
    + '  display inline-block\n'
    + '.test2\n'
    + '  background-image url("images/barrowLoRez@2x.png")\n',

      '.test {\n'
    + '  display: inline-block;\n'
    + '}\n'
    + '.test2 {\n'
    + '  display: inline-block;\n'
    + '}\n'
    + '.test,\n'
    + '.test {\n'
    + '  background-image: url("' + LO_REZ_DATA + '");\n'
    + '}\n'
    + '.test2,\n'
    + '.test2 {\n'
    + '  background-image: url("' + HI_REZ_DATA + '");\n'
    + '}\n',

    "Multiple combine Matches",
    assert);
};

exports['external-prefix'] = function(beforeExit, assert) {
  runTest(
      '.test1\n'
    + '  background-image url("foo.png")\n'
    + '.test2\n'
    + '  background-image url("/foo.png")\n'
    + '.test3\n'
    + '  background-image url("//test/foo.png")\n'
    + '.test4\n'
    + '  background-image url("http://test/foo.png")\n',

      '.test1 {\n'
    + '  background-image: url("/prefix/foo.png");\n'
    + '}\n'
    + '.test2 {\n'
    + '  background-image: url("/foo.png");\n'
    + '}\n'
    + '.test3 {\n'
    + '  background-image: url("//test/foo.png");\n'
    + '}\n'
    + '.test4 {\n'
    + '  background-image: url("http://test/foo.png");\n'
    + '}\n',

    "Load Prefix output",
    assert, {
      externalPrefix: '/prefix/'
    });
};
