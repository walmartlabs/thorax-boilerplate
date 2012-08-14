Application['hello-world'] = (function() {
  var module = {exports: {}};
  var exports = module.exports;
  Thorax.addModuleMethods(module, Application);
  /* router : hello-world */
module.name = "hello-world";
module.routes = {"":"index"};
module.router({
  index: function() {
    var klass = Application.view('hello-world/index');
    var view = new klass();
    Application.setView(view);
  }
});
;;
Application.view('hello-world/index', {
  
});
;;
Application.template('templates/hello-world/index.handlebars', '<div class=\"hero-unit\">\n  <h1>Hello world!</h1>\n</div>\n');
  return module.exports;
}).call(this);

