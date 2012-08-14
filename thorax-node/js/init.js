Thorax.templatePathPrefix = 'templates/';
var Application = window.Application = module.exports = new Thorax.Application(module.exports);
$(document).ready(function() {
  $('body').append(Application.el);
  Application.start({
    pushState: false,
    root: '/'
  });
});
