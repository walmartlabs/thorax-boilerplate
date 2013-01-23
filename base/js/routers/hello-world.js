new (Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function() {
    var view = new Application.Views['hello-world/index'];
    Application.setView(view);
  }
}));