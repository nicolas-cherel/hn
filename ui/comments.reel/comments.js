/**
 * @module ui/comments.reel
 */
var Component = require("montage/ui/component").Component;
var TimeAgoConverter = require("lib/time-ago-converter").TimeAgoConverter;

/**
 * @class Comments
 * @extends Component
 */

function Node(content, children, depth, nodeType) {
  this.content = content;
  this.depth = depth;
  this.children = children || [];
  this.nodeType = nodeType;
  this.depth_helper = Array.apply(null, Array(depth));
}


var fetchKids = function(node, offset, count, depth) {
    var uOffset = offset || 0;
    var uCount = count || 10;
    var allWait = [];
    var maxDepth = (depth || 0) + 3;
    // fetch node.content.kids;
    var _c, kids = (_c = node, _c = _c && _c.content, _c && _c.kids);
    kids && kids.slice(uOffset,uOffset+uCount).forEach(function(key, index) {
        var k_ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/" + key);
        (function(k_ref, current, index) {
            allWait.push(new Promise(function(resolve, reject) {
                var k_h = k_ref.on("value", function(k_snap) {
                    var content = k_snap.val();
                    var val = new Node(content, null, current.depth+1, content.type);
                    k_ref.off("value", k_h);
                    resolve(val);
                });         
            }));
        })(k_ref, node, index);
    });
    if (kids && (kids.length - uOffset) > uCount) {
        allWait.push(new Promise(function(resolve, reject) {
            resolve(new Node({parent: node}, null, node.depth, "more-next-placeholder"));
        }));
    }
    
    return Promise.all(allWait).then(function(results) {
        return Promise.all(results.map(function(n) {
            if (n && n.content && n.content.kids && n.content.kids.length > 0) {
                if (n.depth < (maxDepth+1)) {
                    return fetchKids(n, 0, null, depth);
                } else {
                    return new Promise(function(resolve, reject) {
                        n.children.push(new Node({parent: n}, null, n.depth, "more-replies-placeholder"));
                        resolve();
                    });
                }
            } 
            
        })).then(function() {
            results.forEach(function(o) {
                node.children.push(o);
            })
        });
    });
};

exports.Comments = Component.specialize(/** @lends Comments# */ {
    constructor: {
        value: function Comments() {
            this.super();
            this.addPathChangeListener("itemId", this, "_loadStory");
        }
    },

    time_ago_converter: {
        value: new TimeAgoConverter()
    },

    handleClick: {
        value: function(event) {
            var placeholder; 
            if (event.target.component && (placeholder = event.target.component.nodeData)) {
                var loadNode   = placeholder.content.parent.content;
                var loadOffset = placeholder.content.parent.children.length-1;
                var depth      = placeholder.content.parent.depth;

                fetchKids(placeholder.content.parent, loadOffset, null, depth).then(function(){
                    // remove placeholder
                    placeholder.content.parent.children.splice(loadOffset, 1);
                });
                event.stopPropagation();
                event.preventDefault();
            }
        }
    },

    _loadStory: {
        value: function() {
            if (! this.itemId) { 
                this.story = null;
                return; 
            }
            var ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/" + this.itemId);


            var component = this;
            new Promise(function(resolve, reject) {
                var h = ref.on("value", function(snap) {
                    if (!snap.val()) return;
                    node = new Node(snap.val(), null, 0, snap.val().type);
                    ref.off("value", h);
                    fetchKids(node).then(function(){
                        resolve(node);
                    });
                });
            }).then(function(node) {
                component.story = node;
            });

        }
    },

    enterDocument:  {
        value: function(firstDraw) {
            if (firstDraw) {
                this.element.addEventListener("click", this, false);
            }
        }
    }
});
