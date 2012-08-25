new Application.ViewController({
  //setting the parent as Application will cause
  //Application.setView(this) to be called each
  //time a route is matched on this ViewController
  parent: Application,
  routes: {
    '': 'index'
  },
  index: function() {
    var view = new Application.Views['hello-world/index'];
    this.setView(view);
  }
});