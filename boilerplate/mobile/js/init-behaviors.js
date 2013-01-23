function isDesktop() {
  // Dev testing only to try to prevent some of the anti-patterns that occur in developer environments
  return !('orientation' in window);
}

// Needs to be the .flex element, not body so absolutely positioned elements
// fill the height correctly.
var flexEl = $('.flex')[0];
function setMinimumHeight(orientation) {
  if (window.screen && !exports.isDesktop()) {
    // Clear out the style so we can get real values on rotation.
    flexEl.style.minHeight = '';

    var height;
    if ($.os.android) {
      // Android just wants to be fun. Like the cavities that deserts cause. Choice words removed.
      height = window.outerHeight / (exports.devicePixelRatio || 1);
    } else {
      // Default to the ios implementation and hope that it comes out in the wash
      if (orientation === 0 || orientation === 180) {
        height = screen.availHeight || screen.height;
      } else {
        height = screen.availWidth || screen.width;
      }

      // The height of the (bottom) button bar in iOS.
      if ($.os.iphone) {
        height -= 44;
      }
    }

    flexEl.style.minHeight = height + 'px';
    Thorax.Util.scrollToTop();
  }
}

// Mobile safari do not handle orientation media queries correctly (but webviews do...)
// Hack around that with a body class for landscape mode
function setLandscape() {
  $(document.body).toggleClass('landscape', Math.abs(window.orientation) === 90);
}
setLandscape();

$(window).bind('orientationchange', function() {
  setLandscape();
  setMinimumHeight(window.orientation);
});
