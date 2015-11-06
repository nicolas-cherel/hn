montageDefine("be51d2a","core/document-resources",{dependencies:["./core","./promise","./mini-url"],factory:function(t,e){var n=t("./core").Montage,i=t("./promise").Promise,a=t("./mini-url"),r=n.specialize({_SCRIPT_TIMEOUT:{value:5e3},_document:{value:null},_resources:{value:null},_preloaded:{value:null},_expectedStyles:{value:null},constructor:{value:function r(){this.super(),this._expectedStyles=[]}},initWithDocument:{value:function(t){return this.clear(),this._document=t,this._populateWithDocument(t),this}},_populateWithDocument:{value:function(t){var e=t.querySelectorAll("script"),n=Array.prototype.forEach;n.call(e,function(t){t.src&&this._addResource(this.normalizeUrl(t.src))},this);var i=t.querySelectorAll("link");n.call(i,function(t){"stylesheet"===t.rel&&this._addResource(this.normalizeUrl(t.href))},this)}},clear:{value:function(){this._resources=Object.create(null),this._preloaded=Object.create(null)}},_addResource:{value:function(t){this._resources[t]=!0}},hasResource:{value:function(t){return t in this._resources}},isResourcePreloaded:{value:function(t){return this._preloaded[t]===!0}},isResourcePreloading:{value:function(t){return i.isPromise(this._preloaded[t])}},setResourcePreloadedPromise:{value:function(t,e){this._preloaded[t]=e}},setResourcePreloaded:{value:function(t){this._preloaded[t]=!0}},getResourcePreloadedPromise:{value:function(t){return this._preloaded[t]}},addScript:{value:function(t){var e=this.normalizeUrl(t.src);return e?this.isResourcePreloaded(e)?i.resolve():this.isResourcePreloading(e)?this.getResourcePreloadedPromise(e):this._importScript(t):this._importScript(t)}},_importScript:{value:function(t){var e,n,a=this,r=this._document,s=r.head,o=i.defer(),c=t.src;return c?(a._addResource(c),e=function(){a.setResourcePreloaded(c),t.removeEventListener("load",e),t.removeEventListener("error",e),clearTimeout(n),o.resolve()},t.addEventListener("load",e,!1),t.addEventListener("error",e,!1),n=setTimeout(function(){a.setResourcePreloaded(c),o.resolve()},this._SCRIPT_TIMEOUT),this.setResourcePreloadedPromise(c,o.promise)):o.resolve(),s.appendChild(r.createComment("Inserted from FIXME")),s.appendChild(t),o.promise}},addStyle:{value:function(t){var e,n=t.getAttribute("href");if(n){if(n=this.normalizeUrl(n),this.hasResource(n))return;this._addResource(n),this._expectedStyles.push(n)}e=this._document.head,e.insertBefore(t,e.firstChild)}},normalizeUrl:{value:function(t,e){return e||(e=this._document.location.href),a.resolve(e,t)}},domain:{value:window.location.protocol+"//"+window.location.host},isCrossDomain:{value:function(t){return 0!==t.indexOf(this.domain+"/")||0===t.indexOf("file://")}},preloadResource:{value:function(t,e){var n;return t=this.normalizeUrl(t),!e&&this.isCrossDomain(t)&&(n=!0),n||this.isResourcePreloaded(t)?i.resolve():this.isResourcePreloading(t)?this.getResourcePreloadedPromise(t):this._preloadResource(t)}},_preloadResource:{value:function(t){var e,n,a=this,r=new XMLHttpRequest,s=i.defer();return r.open("GET",t),e=function(){a.setResourcePreloaded(t),r.removeEventListener("load",e),r.removeEventListener("error",e),clearTimeout(n),s.resolve()},r.addEventListener("load",e,!1),r.addEventListener("error",e,!1),r.send(),n=setTimeout(function(){a.setResourcePreloaded(t),s.resolve()},this._SCRIPT_TIMEOUT),this.setResourcePreloadedPromise(t,s.promise),s.promise}},areStylesLoaded:{get:function(){var t,e;if(this._expectedStyles.length>0){t=this._document.styleSheets;for(var n,i=0;n=t[i];i++)e=this._expectedStyles.indexOf(n.href),e>=0&&this._expectedStyles.splice(e,1)}return 0===this._expectedStyles.length}}},{getInstanceForDocument:{value:function(t){var e=t.__montage_resources__;return e||(e=t.__montage_resources__=(new r).initWithDocument(t)),e}}});e.DocumentResources=r}});