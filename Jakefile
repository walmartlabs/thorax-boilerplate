var path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    async = require('async'),
    childProcess = require('child_process'),
    boilerplateDir = path.join(__dirname, 'boilerplate'),
    releaseDir = path.join(__dirname, 'release'),
    componentsDir = path.join(__dirname, 'components'),
    baseDir = path.join(__dirname, 'base'),
    releases = ['standalone', 'rails', 'mobile', 'lumbar'],
    components = {
      thorax: 'git@github.com:walmartlabs/thorax.git',
      'lumbar-loader': 'git@github.com:walmartlabs/lumbar-loader.git',
      bootstrap: 'git@github.com:twitter/bootstrap.git'
    };

function exec(command) {
  return function(next) {
    console.log(command);
    childProcess.exec(command, function(error, stdout, stderr) {
      error && process.stderr.write(error.toString());
      stdout && process.stdout.write(stdout.toString());
      stderr && process.stderr.write(stderr.toString());
      next();
    });
  };
}

function mkdir(dir) {
  return function(next) {
    console.log('mkdir ' + dir);
    try {
      return fs.mkdir(dir, function() {
        next();
      });
    } catch(e) {
      next();
    }
  }
}

function copy(from, to) {
  return exec('cp -r ' + from + ' ' + to);
}

desc('Update and build the boilerplate download');
task('release', function(options) {
  var thoraxSrc = (options && options[0]) || path.join(process.cwd(), '../thorax/build/release');

  async.series([
    // setup components
    exec('rm -rf ' + componentsDir),
    mkdir(componentsDir),
    function(next) {
      async.series(_.map(components, function(gitUrl, componentName) {
        return exec('git clone ' + gitUrl + ' ' + path.join(componentsDir, componentName));
      }), next);
    },

    // setup release directory
    exec('rm -rf ' + releaseDir),
    mkdir(releaseDir),
    copy('README.md', path.join(releaseDir, 'README.md')),
    function(next) {
      async.series(_.map(releases, function(release) {
        return exec('cp -r ' + path.join(boilerplateDir, release) + ' ' + path.join(releaseDir, release));
      }), next);
    },

    // ensure directories exist in release dirs
    mkdir(path.join(releaseDir, 'lumbar/js')),
    mkdir(path.join(releaseDir, 'lumbar/js/lib')),
    mkdir(path.join(releaseDir, 'mobile/js/lib')),
    mkdir(path.join(releaseDir, 'lumbar/static/img')),
    mkdir(path.join(releaseDir, 'mobile/static/img')),
    mkdir(path.join(releaseDir, 'lumbar/components')),
    mkdir(path.join(releaseDir, 'mobile/components')),
    mkdir(path.join(releaseDir, 'standalone/js/lib')),
    mkdir(path.join(releaseDir, 'rails/vendor/assets/javascripts')),
    mkdir(path.join(releaseDir, 'rails/vendor/assets/stylesheets')),

    // copy components to lumbar, mobile
    copy(path.join(componentsDir, 'thorax'), path.join(releaseDir, 'lumbar/components/thorax')),
    copy(path.join(componentsDir, 'thorax'), path.join(releaseDir, 'mobile/components/thorax')),
    copy(path.join(componentsDir, 'lumbar-loader'), path.join(releaseDir, 'lumbar/components/lumbar-loader')),
    copy(path.join(componentsDir, 'lumbar-loader'), path.join(releaseDir, 'mobile/components/lumbar-loader')),

    // copy bootstrap assets to lumbar
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap-responsive.css'), path.join(releaseDir, 'lumbar/styles/bootstrap-responsive.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap.css'), path.join(releaseDir, 'lumbar/styles/bootstrap.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings-white.png'), path.join(releaseDir, 'lumbar/static/img/glyphicons-halflings-white.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings.png'), path.join(releaseDir, 'lumbar/static/img/glyphicons-halflings.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/js/bootstrap.js'), path.join(releaseDir, 'lumbar/js/lib/bootstrap.js')),
    
    // copy bootstrap assets to mobile
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap-responsive.css'), path.join(releaseDir, 'mobile/styles/bootstrap-responsive.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap.css'), path.join(releaseDir, 'mobile/styles/bootstrap.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings-white.png'), path.join(releaseDir, 'mobile/static/img/glyphicons-halflings-white.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings.png'), path.join(releaseDir, 'mobile/static/img/glyphicons-halflings.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/js/bootstrap.js'), path.join(releaseDir, 'mobile/js/lib/bootstrap.js')),

    // copy bootstrap assets to standalone
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap-responsive.css'), path.join(releaseDir, 'standalone/styles/bootstrap-responsive.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap.css'), path.join(releaseDir, 'standalone/styles/bootstrap.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings-white.png'), path.join(releaseDir, 'standalone/img/glyphicons-halflings-white.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings.png'), path.join(releaseDir, 'standalone/img/glyphicons-halflings.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/js/bootstrap.js'), path.join(releaseDir, 'standalone/js/lib/bootstrap.js')),

    // copy bootstrap assets to rails
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap-responsive.css'), path.join(releaseDir, 'rails/vendor/assets/stylesheets/bootstrap-responsive.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/css/bootstrap.css'), path.join(releaseDir, 'rails/vendor/assets/stylesheets/bootstrap.css')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings-white.png'), path.join(releaseDir, 'rails/app/assets/images/glyphicons-halflings-white.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/img/glyphicons-halflings.png'), path.join(releaseDir, 'rails/app/assets/images/glyphicons-halflings.png')),
    copy(path.join(componentsDir, 'bootstrap/docs/assets/js/bootstrap.js'), path.join(releaseDir, 'rails/vendor/assets/javascripts/bootstrap.js')),
    
    // copy thorax assets to rails
    copy(path.join(thoraxSrc, 'thorax.js'), path.join(releaseDir, 'rails/vendor/assets/javascripts/thorax.js')),

    // copy thorax assets to standalone
    copy(path.join(thoraxSrc, 'thorax.js'), path.join(releaseDir, 'standalone/js/lib/thorax.js')),

    // note + "/" to copy / merge contents of directory

    // copy base js files into lumbar, mobile
    copy(path.join(baseDir, 'js'), path.join(releaseDir, 'standalone')),
    copy(path.join(baseDir, 'js') + '/', path.join(releaseDir, 'mobile/js')),
    copy(path.join(baseDir, 'js') + '/', path.join(releaseDir, 'lumbar/js')),
    copy(path.join(baseDir, 'js') + '/', path.join(releaseDir, 'rails/app/assets/javascripts')),

    // copy base templates into lumbar, mobile, rails (standalone uses inline templates)
    copy(path.join(baseDir, 'templates') + '/', path.join(releaseDir, 'mobile/templates')),
    copy(path.join(baseDir, 'templates') + '/', path.join(releaseDir, 'lumbar/templates')),
    copy(path.join(baseDir, 'templates') + '/', path.join(releaseDir, 'rails/app/assets/javascripts/templates')),

    // create a zip file of the release
    exec('zip -r release.zip ' + releaseDir)
  ]);

});
