
/*!
 * Stylus - plugin - url
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var stylus = require('stylus')
  , Compiler = stylus.Compiler
  , nodes = stylus.nodes
  , parse = require('url').parse
  , path = require('path')
  , basename = path.basename
  , dirname = path.dirname
  , extname = path.extname
  , utils = stylus.utils
  , fs = require('fs');

/**
 * Mime table.
 */

var mimes = {
    '.gif': 'image/gif'
  , '.png': 'image/png'
  , '.jpg': 'image/jpeg'
  , '.jpeg': 'image/jpeg'
  , '.svg': 'image/svg+xml'
};

/**
 * Return a url() function with the given `options`.
 *
 * Options:
 *
 *    - `limit` bytesize limit defaulting to 30Kb
 *    - `paths` image resolution path(s), merged with general lookup paths
 *
 * Examples:
 *
 *    stylus(str)
 *      .set('filename', __dirname + '/css/test.styl')
 *      .define('url', stylus.url({ paths: [__dirname + '/public'] }))
 *      .render(function(err, css){ ... })
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */

module.exports = function(options) {
  options = options || {};

  var sizeLimit = options.limit || 30000
    , _paths = options.paths || [];

  function url(url){
    // Inject the merge filter. This executes after the AST as been finalized and will
    // merge any duplicate data URI instances.
    if (!this.imagesSeen) {
      this.imagesSeen = {};
      this.root.nodes.push(new nodes.Call('merge-urls', new nodes.Arguments()));
    }

    // Compile the url
    var compiler = new Compiler(url);
    compiler.isURL = true;
    var url = url.nodes.map(function(node){
      return compiler.visit(node);
    }).join('');

    // Parse literal 
    var url = parse(url)
      , ext = extname(url.pathname)
      , mime = mimes[ext]
      , literal = new nodes.Literal('url("' + url.href + '")')
      , paths = _paths.concat(this.paths)
      , found
      , buf;

    this.imagesSeen[url.href] = (this.imagesSeen[url.href] || 0) + 1;

    // Not supported
    if (!mime) return literal;

    // Absolute
    if (url.protocol) return literal;

    // Lookup
    if (options.res) {
      var ext = extname(url.pathname)
        , highResFileName = basename(url.pathname, ext) + '@' + options.res + 'x' + ext
        , highResPath = dirname(url.pathname) + '/' + highResFileName;
      found = utils.lookup(highResPath, paths);

      if (found) {
        // Reset our literal path for the file too large case
        var dir = dirname(url.href) + '/';
        if (dir === './') {
          dir = '';
        }

        url.href = dir + highResFileName;
        literal = new nodes.Literal('url("' + url.href + '")');
      }
    }
    if (!found) {
      found = utils.lookup(url.pathname, paths);
    }

    // Remap relative paths
    if (options.externalPrefix && !/^\//.test(url.href)) {
      literal = new nodes.Literal('url("' + options.externalPrefix + url.href + '")');
    }

    // Failed to lookup
    if (!found) return literal;

    // Read data
    buf = fs.readFileSync(found);

    // To large
    if (buf.length > sizeLimit) {
      // If copy files flag is true and not an absolute url
      if (options.copyFiles && !/^\//.test(url.href)) {
        var relativeDir = dirname(url.pathname),
            outputDir = options.outdir || dirname(this.filename),
            components = relativeDir.split('/');

        for (var i = 0; i < components.length; i++) {
          try {
            outputDir += '/' + components[i];
            fs.mkdirSync(outputDir, 0777);
          } catch (err) {
            if (err.code !== 'EEXIST') {
              throw err;
            }
          }
        }
        fs.writeFileSync(outputDir + '/' + basename(url.href), buf);
      }
      return literal;
    }

    // Encode
    var ret = new nodes.Literal('url("data:' + mime + ';base64,' + buf.toString('base64') + '")');
    ret.url = url;
    ret.clone = function() {
      var ret = nodes.Literal.prototype.clone.call(this);
      ret.url = url;
      return ret;
    };
    return ret;
  };

  url.raw = true;
  return url;
};