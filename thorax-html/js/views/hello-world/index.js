Application.View.extend({
  name: "hello-world/index",
  template: $('script[data-template-name="hello-world/index"]').html()
});
//this class can be retrieved from:
//Application.Views["hello-world/index"]
