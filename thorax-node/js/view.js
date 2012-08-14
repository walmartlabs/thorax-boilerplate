[
  Application.View,
  Application.ViewController,
  Application.LayoutView
].forEach(function(klass) {
  _.extend(klass.prototype, {
    //your instance methods here
  });
});
