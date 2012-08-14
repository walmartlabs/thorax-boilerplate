var view = new Thorax.View({
  template: '<h1>Hello World!</h1>'
});

$(function() {
  view.render();
  document.body.appendChild(view.el);
});

