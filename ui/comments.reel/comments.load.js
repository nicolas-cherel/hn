montageDefine("fbef3d3","ui/comments.reel/comments",{dependencies:["montage/ui/component","lib/time-ago-converter"],factory:function(e,n){function t(e,n,t,o){this.content=e,this.depth=t,this.children=n||[],this.nodeType=o,this.depth_helper=Array.apply(null,Array(t))}var o=e("montage/ui/component").Component,r=e("lib/time-ago-converter").TimeAgoConverter,i=function(e,n,o,r){var a,l=n||0,c=o||10,s=[],p=(r||0)+3,m=(a=e,a=a&&a.content,a&&a.kids);return m&&m.slice(l,l+c).forEach(function(n,o){var r=new Firebase("https://hacker-news.firebaseio.com/v0/item/"+n);(function(e,n){s.push(new Promise(function(o){var r=e.on("value",function(i){var a=i.val(),l=new t(a,null,n.depth+1,a.type);e.off("value",r),o(l)})}))})(r,e,o)}),m&&m.length-l>c&&s.push(new Promise(function(n){n(new t({parent:e},null,e.depth,"more-next-placeholder"))})),Promise.all(s).then(function(n){return Promise.all(n.map(function(e){return e&&e.content&&e.content.kids&&e.content.kids.length>0?p+1>e.depth?i(e,0,null,r):new Promise(function(n){e.children.push(new t({parent:e},null,e.depth,"more-replies-placeholder")),n()}):void 0})).then(function(){n.forEach(function(n){e.children.push(n)})})})};n.Comments=o.specialize({constructor:{value:function(){this.super(),this.addPathChangeListener("itemId",this,"_loadStory")}},time_ago_converter:{value:new r},handleClick:{value:function(e){var n;if(e.target.component&&(n=e.target.component.nodeData)){n.content.parent.content;var t=n.content.parent.children.length-1,o=n.content.parent.depth;i(n.content.parent,t,null,o).then(function(){n.content.parent.children.splice(t,1)}),e.stopPropagation(),e.preventDefault()}}},_loadStory:{value:function(){if(!this.itemId)return this.story=null,void 0;var e=new Firebase("https://hacker-news.firebaseio.com/v0/item/"+this.itemId),n=this;new Promise(function(n){var o=e.on("value",function(r){r.val()&&(node=new t(r.val(),null,0,r.val().type),e.off("value",o),i(node).then(function(){n(node)}))})}).then(function(e){n.story=e})}},enterDocument:{value:function(e){e&&this.element.addEventListener("click",this,!1)}}})}});