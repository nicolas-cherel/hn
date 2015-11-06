montageDefine("be51d2a","composer/key-composer",{dependencies:["../core/core","./composer"],factory:function(t,e){var n=t("../core/core").Montage,i=t("./composer").Composer,a="keyPress",r="longKeyPress",s="keyRelease",o=e.KeyComposer=i.specialize({_isLoaded:{value:!1},_shouldDispatchEvent:{value:!1},shouldDispatchLongPress:{value:!1},_longPressTimeout:{value:null},_keyRegistered:{value:!1},_keys:{value:null},keys:{get:function(){return this._keys},set:function(t){this._keyRegistered?(l.defaultKeyManager.unregisterKey(this),this._keys=t,l.defaultKeyManager.registerKey(this)):this._keys=t}},load:{value:function(){this._isLoaded=!0,this._shouldDispatchEvent&&!this._keyRegistered&&(l.defaultKeyManager.registerKey(this),this._keyRegistered=!0)}},unload:{value:function(){this._isLoaded=!1,l.defaultKeyManager.unregisterKey(this),this._keyRegistered=!1}},addEventListener:{value:function(t,e,n){var o=this.component;i.addEventListener.call(this,t,e,n),(t==a||t==r||t==s)&&(this._shouldDispatchEvent=!0,t==r&&(this._shouldDispatchLongPress=!0),this._isLoaded?this._keyRegistered||(l.defaultKeyManager.registerKey(this),this._keyRegistered=!0):o&&"function"!=typeof o.addComposer&&(this.element||(this.element=window),this.load()))}},constructor:{value:function(){i.constructor.call(this)}},deserializedFromTemplate:{value:function(){var t=this.component;null===this.identifier&&(this.identifier=n.getInfoForObject(this).label),t&&("function"==typeof t.addComposer?t.addComposer(this):this._isLoaded||(this.element||(this.element=window),this.load()))}}},{createKey:{value:function(t,e,n){var i=this;return this===o&&(i=new o),n||(n=t.identifier?t.identifier+e.toLowerCase().replace(/[ +]/g).toCapitalized():e.toLowerCase().replace(/[ +]/g)),i.keys=e,i.identifier=n,t.addComposer(i),i}},createGlobalKey:{value:function(t,e,n){var i=this;return this===o&&(i=new o),i.keys=e,i.identifier=n,t.addComposerForElement(i,window),i}}}),c=null,l=n.specialize({_defaultKeyManager:{value:null},_loadingDefaultKeyManager:{value:!1},_keysToRegister:{value:[]},constructor:{value:function(){}},registerKey:{value:function(e){var n=this;this._defaultKeyManager?this._defaultKeyManager.registerKey(e):(this._keysToRegister.push(e),this._loadingDefaultKeyManager||(this._loadingDefaultKeyManager=!0,t.async("core/event/key-manager").then(function(t){var e=n._defaultKeyManager=t.defaultKeyManager;n._keysToRegister.forEach(function(t){e.registerKey(t)}),n._keysToRegister.length=0}).done()))}},unregisterKey:{value:function(t){this._defaultKeyManager&&this._defaultKeyManager.unregisterKey(t)}}},{defaultKeyManager:{get:function(){return c||(c=new l),this._defaultKeyManager?this._defaultKeyManager:c}}})}});