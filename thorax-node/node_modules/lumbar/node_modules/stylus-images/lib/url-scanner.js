var stylus = require('stylus'),
    Visitor = stylus.Visitor
    nodes = stylus.nodes;

var Scanner = module.exports = function Scanner(root, imagesSeen) {
  Visitor.call(this, root);
  this.imagesSeen = imagesSeen;
  this.imageGroups = {};
  this.tree = [];
};

Scanner.prototype.__proto__ = Visitor.prototype;

Scanner.prototype.combine = function() {
  this.visit(this.root);

  // Replace duplicated data URIs when possible
  for (var name in this.imageGroups) {
    var imageGroup = this.imageGroups[name],
        group = undefined,
        block;
    if (imageGroup.length >= 2) {
      for (var i = 0; i < imageGroup.length; i++) {
        var imageRef = imageGroup[i];
        if (!group) {
          group = new nodes.Group();
          block = new nodes.Block();
          block.push(imageRef.ref);
        }

        var originalNodes = imageRef.tree[imageRef.tree.length-1].block.nodes
        for (var n = 0; n < originalNodes.length; n++) {
          if (originalNodes[n] == imageRef.ref) {
            originalNodes.splice(n, 1);
            break;
          }
        }

        group.push(this.generateSelector(imageRef.tree));
      }

      if (group) {
        // Finalize the group and insert
        group.block = block;
        this.root.nodes.push(group);
      }
    }
  }
};

Scanner.prototype.generateSelector = function(tree) {
  // Originally implemented in stylus compiler.js
  function groupSelectors(group) {
    var curr = [];

    // Construct an array of arrays
    // representing the selector hierarchy
    group.nodes.forEach(function(node){
      curr.push(node.parent
          ? node
          : node.val);
    });
    return curr;
  }

  // Reverse recurse the
  // hierarchy array to build
  // up the selector combinations.
  // When we reach root, we have our
  // selector string built
  var selectors = []
    , buf = [];
  function join(arr, i) {
    if (i) {
      groupSelectors(arr[i]).forEach(function(str){
        buf.unshift(str);
        join(arr, i - 1);
        buf.shift();
      });
    } else {
      groupSelectors(arr[0]).forEach(function(selector){
        var str = selector.trim();
        if (buf.length) {
          for (var i = 0, len = buf.length; i < len; ++i) {
            if (~buf[i].indexOf('&')) {
              str = buf[i].replace(/&/g, str).trim();
            } else {
              str += ' ' + buf[i].trim();
            }
          }
        }
        selectors.push(str.trimRight());
      });
    }
  }

  join(tree, tree.length - 1);
  return new nodes.Selector([ new nodes.Literal(selectors.join(','))]);
};

Scanner.prototype.visitLiteral = function(lit) {
  if (lit.url && this.imagesSeen[lit.url.href] > 1) {
    this.dupeUrl = lit.url;
  }
};

Scanner.prototype.visitProperty = function(prop) {
  this.visit(prop.expr);
};

Scanner.prototype.visitRoot =
Scanner.prototype.visitBlock = function(block) {
  var nodes = block.nodes;
  for (var i = 0; i < nodes.length; i++) {
    this.visit(nodes[i]);
    if (this.dupeUrl) {
      var name = this.dupeUrl.href + ' ' + nodes[i],
          group = this.imageGroups[name] = this.imageGroups[name] || [];
      group.push({ tree: this.tree.slice(), ref: nodes[i] });
    }
    this.dupeUrl = undefined;
  }
};
Scanner.prototype.visitArguments =
Scanner.prototype.visitExpression = function(expr) {
  expr.nodes.forEach(function(node) {
    this.visit(node);
  }, this);
};

Scanner.prototype.visitKeyframes = function(node) {
  node.frames.forEach(function(frame) {
    this.visit(frame.block);
  }, this);
};

Scanner.prototype.visitGroup = function(group) {
  this.tree.push(group);
  this.visit(group.block);
  this.tree.pop();
};

Scanner.prototype.visitFontFace =
Scanner.prototype.visitMedia =
Scanner.prototype.visitPage = function(page) {
  this.visit(page.block);
};

Scanner.prototype.visitCall = function(call) {
  call.args.nodes.forEach(function(arg) {
    this.visit(arg);
  }, this);
};

Scanner.prototype.visitImport =
Scanner.prototype.visitJSLiteral =
Scanner.prototype.visitComment =
Scanner.prototype.visitFunction =
Scanner.prototype.visitVariable =
Scanner.prototype.visitCharset =
Scanner.prototype.visitBoolean =
Scanner.prototype.visitRGBA =
Scanner.prototype.visitHSLA =
Scanner.prototype.visitUnit =
Scanner.prototype.visitIdent =
Scanner.prototype.visitString =
Scanner.prototype.visitNull = function() {};
