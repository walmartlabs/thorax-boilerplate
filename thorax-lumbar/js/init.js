//all templates are assumed to be in the templates directory
Thorax.templatePathPrefix = 'templates/';

//create the Application object, Application.setView() will
//place a view inside the {{layout}}
var Application = window.Application = module.exports = new (Thorax.ViewController.extend(_.extend(module.exports, {
  //set a name so it will use the applications.handlebars template
  name: 'application'
})));

//alias the special hashes for naming consitency
Application.templates = Thorax.templates;
Application.Views = Thorax.Views;
Application.Models = Thorax.Models;
Application.Collections = Thorax.Collections;
Application.Routers = Thorax.Routers;
Application.Mixins = Thorax.Mixins;

//allows load:end and load:start events to propagate
//to the application object
Thorax.setRootObject(Application);

$(function() {
  //Application and other templates included by the base
  //Application may want to use the link and url helpers
  //which use hasPushstate, etc. so setup history, then
  //render, then dispatch
  //initialize the lumbar-loader for backbone, which will
  //load modules if needed when a route is matched
  Application.initBackboneLoader();
  Backbone.history.start({
    pushState: false,
    root: '/',
    silent: true
  });  Application.render();
  $('body').append(Application.el);
  //mimic when a ViewController will trigger the "ready"
  //event on a view, since this is the top level object
  //it needs to be triggered manually
  Application.trigger('ready');
  Backbone.history.loadUrl();
});
