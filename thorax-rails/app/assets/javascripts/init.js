//handlebars_assets generates the HandlebarsTemplates object
//alias it so Thorax can use it
Thorax.templates = HandlebarsTemplates;

//create the Application object, Application.setView() will
//place a view inside the {{layout}}
var Application = window.Application = new Thorax.ViewController({
  template: "{{layout}}"
});

//alias the special hashes for naming consitency
Application.templates = Thorax.templates;
Application.Views = Thorax.Views;
Application.Models = Thorax.Models;
Application.Collections = Thorax.Collections;
Application.Routers = Thorax.Routers;

//allows load:end and load:start events to propagate
//to the application object
Thorax.setRootObject(Application);

$(function() {
  //Application and other templates included by the base
  //Application may want to use the link and url helpers
  //which use hasPushstate, etc. so setup history, then
  //render, then dispatch
  if (!Backbone.History.started) {
    Backbone.history.start(_.extend({
      silent: true
    }, options || {}));
  }
  Application.render();
  $('body').append(Application.el);
  //mimic when a ViewController will trigger the "ready"
  //event on a view, since this is the top level object
  //it needs to be triggered manually
  Application.trigger('ready');
  Backbone.history.loadUrl();
});