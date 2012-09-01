Thorax.View.extend({
  name: 'examples/fast-click',
  events: {
    rendered: function() {
      //registered with zepto directly and not in the events hash as
      //the events hash will treat "click" as a fast click
      this.$('#normal-click').on('click', _.bind(function() {
        this.log('Normal Click');
      }, this));
    }
  },
  buttonHandler: function() {
    this.log('Fast Click');
  },
  clear: function() {
    this.$('#console-text').val('');
  },
  log: function(text) {
    var $el = this.$('#console-text');
    $el.val($el.val() + '\n' + text);
  }
});
