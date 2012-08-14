module.router({
  index: function() {
    var klass = Application.view('hello-world/index');
    var view = new klass();
    Application.setView(view);
  }
});
