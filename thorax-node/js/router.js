[
  Application.Router,
  Application.ViewController
].forEach(function(klass) {
  _.extend(klass.prototype, {
    //your instance methods here
  });
});