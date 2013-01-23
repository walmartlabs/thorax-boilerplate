new (Backbone.Router.extend({
  routes: module.routes,
  infiniteScroll: function() {
    var view = new Application.Views['examples/infinite-scroll'];
    Application.setView(view);
  },
  fastClick: function() {
    var view = new Application.Views['examples/fast-click'];
    Application.setView(view);
  },
  tapHighlight: function() {
    var view = new Application.Views['examples/tap-highlight'];
    Application.setView(view);
  }
}));
