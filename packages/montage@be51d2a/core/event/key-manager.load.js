montageDefine("be51d2a","core/event/key-manager",{dependencies:["../core","./event-manager","./mutable-event","./key-manager"],factory:function(t,e){var n=t("../core").Montage,i=t("./event-manager").defaultEventManager,r=t("./mutable-event").MutableEvent,a={backspace:8,tab:9,enter:13,shift:16,control:17,alt:18,capslock:20,escape:27,space:32,pageup:33,pagedown:34,end:35,home:36,left:37,up:38,right:39,down:40,"delete":46,semicolon:186,colon:186,equal:187,plus:187,comma:188,less:188,minus:189,underscore:189,period:190,greater:190,slash:191,questionmark:191,backtick:192,tilde:192,openingsquarebracket:219,openingcurlybracket:219,backslash:220,pipe:220,closingsquarebracket:221,closingcurlybracket:221,singlequote:222,doublequote:222,clear:12,meta:91,contextmenu:93,numpad0:96,numpad1:97,numpad2:98,numpad3:99,numpad4:100,numpad5:101,numpad6:102,numpad7:103,numpad8:104,numpad9:105,multiply:106,add:107,subtract:109,decimal:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,f13:124,f14:125,f15:126,f16:127,f17:128,f18:129,f19:130,f20:131,f21:132,f22:133,f23:134,f24:135},s=null,o={meta:17,control:57392,f17:63252,f18:63253,f19:63254,f20:63255,f21:63256,f22:63257,f23:63258,f24:63259},l={f13:44,f14:145,f15:19,f16:63251,f17:63252,f18:63253,f19:63254,f20:63255,f21:63256,f22:63257,f23:63258,f24:63259,meta:224},c={cmd:"command",ctl:"control",ctrl:"control",win:"meta",windows:"meta",opt:"alt",option:"alt"},h={meta:{name:"meta",value:1},alt:{name:"alt",value:2},control:{name:"control",value:4},shift:{name:"shift",value:8}},u={semicolon:";",colon:":",equal:"=",plus:"+",comma:",",less:"<",minus:"-",underscore:"_",period:".",greater:">",slash:"/",questionmark:"?",backtick:"`",tilde:"~",openingsquarebracket:"[",openingcurlybracket:"{",backslash:"\\",pipe:"|",closingsquarebracket:"]",closingcurlybracket:"}",singlequote:"'",doublequote:'"',multiply:"*",add:"+",subtract:"-",decimal:".",divide:"/"},d=null,p="keyPress",f="longKeyPress",g="keyRelease",v=e.KeyManager=n.specialize({_keyEventsListenerInstalled:{value:!1},_composerKeyMap:{value:{}},_triggeredKeys:{value:{}},_longPressKeys:{value:{}},_cleanupTimeout:{value:null},_cleanupThreshold:{value:2e3},_longPressThreshold:{value:1e3},longPressThreshold:{get:function(){return this._longPressThreshold},set:function(t){t>0&&t!==this._longPressThreshold&&(this._longPressThreshold=t,this._cleanupThreshold=this._longPressThreshold>this._cleanupThreshold-100?this._longPressThreshold+100:2e3)}},registerKey:{value:function(t){var e,n,i,r,a,s=this._normalizeKeySequence(t.keys),o=this._composerKeyMap,l=!1;if(s){if(e=this._convertKeysToModifiersAndKeyCode(s),n=o[e.modifiers],n||(n=o[e.modifiers]={}),i=n[e.keyCode]){for(a in i)if(r=i[a],r.object===t){r.refCount++,l=!0;break}l||i.push({object:t,refCount:1})}else n[e.keyCode]=[{object:t,refCount:1}];t._modifiers=e.modifiers,t._keyCode=e.keyCode,this._registerListeners()}}},unregisterKey:{value:function(t){var e,n,i,r,a=this._composerKeyMap;if(e=a[t._modifiers]){n=e[t._keyCode];for(r in n)i=n[r],i.object===t&&(i.refCount--,0>=i.refCount&&(n.splice(r,1),0===n.length&&(delete e[t._keyCode],0===Object.keys(e).length&&(delete a[t._modifiers],0===Object.keys(a).length&&this._unregisterListeners()))))}}},constructor:{value:function(){var t,e=navigator.userAgent;if(m&&console.warn("Rather than creating a new KeyManager object, you might want to use the default key manager"),e.match(/ firefox\//i)?this._firefox=!0:e.match(/ appleWebkit\//i)?(this._webkit=!0,e.match(/ chrome\//i)&&(this._chrome=!0)):e.match(/^opera\//i)&&(this._opera=!0),e.match(/macintosh/i)&&(this._mac=!0,this._opera&&(this._operaMac=!0)),h.command=this._mac?h.meta:h.control,this._operaMac)for(t in o)a[t]=o[t];if(this._firefox)for(t in l)a[t]=l[t];s={};for(var n in a){var t=a[n];void 0===s[t]&&(s[t]=n)}d={};for(var n in u){var t=u[n];void 0===d[t]&&(d[t]=n)}this._shiftKey=!1,this._altKey=!1,this._metaKey=!1,this._ctrlKey=!1}},captureKeydown:{value:function(t){var e,n,i,r=!1;this._preprocessKeyEvent(t),i=this._submap,i&&(e=this._keyCode,e&&i[e]&&(r=this._dispatchComposerKeyMatches(i[e],t)),!r&&t.keyIdentifier&&(n=a[t.keyIdentifier.toLowerCase()]||this._decodeKeyIdentifier(t.keyIdentifier),n&&n!==e&&i[n]&&this._dispatchComposerKeyMatches(i[n],t))),this._setupCleanupTimer()}},captureKeypress:{value:function(t){var e,n,i,r=t.charCode,s=!1;this._preprocessKeyEvent(t),i=this._submap,i&&(e=this._keyCode,e&&i[e]&&(s=this._dispatchComposerKeyMatches(i[e],t)),!s&&r&&r!==e&&i[r]&&(s=this._dispatchComposerKeyMatches(i[r],t)),!s&&t.keyIdentifier&&(n=a[t.keyIdentifier.toLowerCase()]||this._decodeKeyIdentifier(t.keyIdentifier),n&&n!==e&&i[n]&&this._dispatchComposerKeyMatches(i[n],t))),this._setupCleanupTimer()}},captureKeyup:{value:function(t){var e,n,i,r,s=t.keyCode,o=0,l=!1;if(this._preprocessKeyEvent(t),n=this._submap,n&&(s=this._keyCode,s&&n[s]&&(l=this._dispatchComposerKeyMatches(n[s],t),o=s),!l&&t.keyIdentifier&&(e=a[t.keyIdentifier.toLowerCase()]||this._decodeKeyIdentifier(t.keyIdentifier),e&&e!==o&&n[e]&&(l=this._dispatchComposerKeyMatches(n[e],t)))),!l)for(r in this._triggeredKeys)i=this._triggeredKeys[r],(i._keyCode==s||i._keyCode==e)&&this._dispatchComposerKeyMatches([i],t);this._cleanup()}},_normalizeKeySequence:{value:function(t){var e,n,i=[h.meta.name,h.alt.name,h.control.name,h.shift.name],r=t.toLowerCase().replace(/ /g,"").replace(/\+\+/g,"+add").split("+"),s=r.length,o=[];for(n=0;s-1>n;n++){if(e=r[n],e=c[e]||e,e=h[e],!e)return console.warn("Invalid key sequence (modifier):",t),null;o.push(e.name)}return o.sort(function(t,e){return i.indexOf(t)-i.indexOf(e)}),e=r[s-1],e.length>1&&!a[e]?(console.warn("Invalid key sequence (key):",t,e),null):o.length?o.join("+")+"+"+e:e}},_preprocessKeyEvent:{value:function(t){var e,n,i=this,r=t.type,s=t.keyCode;this._operaMac&&this._operaModifierTimeout&&(clearTimeout(this._operaModifierTimeout),this._operaModifierTimeout=null),("keydown"==r||"keyup"==r)&&(this._operaMac?(n="keydown"==r,s==a.shift?this._shiftKey=n:s==a.alt?this._altKey=n:s==a.meta?this._mac&&(this._metaKey=n):s==a.control&&(this._ctrlKey=n),"keyup"==r&&(this._operaModifierTimeout=setTimeout(function(){i._shiftKey=!1,i._altKey=!1,i._metaKey=!1,i._ctrlKey=!1,i._operaModifierTimeout=null},this._cleanupThreshold+1e3))):(this._shiftKey=t.shiftKey,this._altKey=t.altKey,this._metaKey=t.metaKey,this._ctrlKey=t.ctrlKey)),this._mac&&this._webkit&&s==a.contextmenu&&(this._metaKey=!1),this._chrome&&(this._shiftKey||s!=a.plus||"U+002B"!=t.keyIdentifier||(t.keyCode=a.add)),this._modifiers=e=(this._shiftKey?h.shift.value:0)+(this._altKey?h.alt.value:0)+(this._metaKey?h.meta.value:0)+(this._ctrlKey?h.control.value:0),this._submap=this._composerKeyMap[e],this._keyCode=t.keyCode,this._keyIdentifier=t.keyIdentifier}},_registerListeners:{value:function(){this._keyEventsListenerInstalled||(window.addEventListener("keydown",this,!0),window.addEventListener("keypress",this,!0),window.addEventListener("keyup",this,!0),this._keyEventsListenerInstalled=!0)}},_unregisterListeners:{value:function(){this._keyEventsListenerInstalled&&(window.removeEventListener("keydown",this,!0),window.removeEventListener("keypress",this,!0),window.removeEventListener("keyup",this,!0),this._keyEventsListenerInstalled=!1)}},_dispatchComposerKeyMatches:{value:function(t,e){var n,a,s,o,l=this,c=!1,h="keyup"==e.type,u="keydown"==e.type,d=h?g:p,v=t.length;for(t=t.slice(),o=0;v>o&&!c;o++){n=t[o].object||t[o];for(var m=e.target,y=n.element,b=n.element===window;!b&&(b=m===y,m!=document);)m=m.parentElement,m||(m=document);if(b||i.activeTarget==n.component){if(h){if(s=Object.keys(this._triggeredKeys),-1==s.indexOf(n.uuid))continue;n._longPressTimeout&&(clearTimeout(n._longPressTimeout),n._longPressTimeout=null,delete this._longPressKeys[n.uuid])}else{if(u)delete this._triggeredKeys[n.uuid],e.preventDefault();else if(this._triggeredKeys[n.uuid])continue;n._shouldDispatchLongPress&&!n._longPressTimeout&&(n._longPressTimeout=setTimeout(function(){var t;n._longPressTimeout=null,t=document.createEvent("CustomEvent"),t.initCustomEvent(f,!0,!0,null),t.activeElement=e.target,t.identifier=n.identifier,t=r.fromEvent(t),n.dispatchEvent(t),delete l._longPressKeys[n.uuid]},this._longPressThreshold),this._longPressKeys[n.uuid]=n)}a=document.createEvent("CustomEvent"),a.initCustomEvent(d,!0,!0,null),a.activeElement=e.target,a.identifier=n.identifier,a.keyComposer=n,a=r.fromEvent(a),this._opera&&(a.type=d),n.dispatchEvent(a),a.defaultPrevented&&e.preventDefault(),a.propagationStopped&&(e.stopPropagation(),c=!0),h?delete this._triggeredKeys[n.uuid]:this._triggeredKeys[n.uuid]=n}}if(c)for(o=h?o:0;v>o;o++)n=t[o].object||t[o],delete this._triggeredKeys[n.uuid],n._longPressTimeout&&(clearTimeout(n._longPressTimeout),n._longPressTimeout=null,delete this._longPressKeys[n.uuid]);return c}},_cleanup:{value:function(){var t,e;this._cleanupTimeout&&clearTimeout(this._cleanupTimeout);for(e in this._triggeredKeys)this._triggeredKeys.hasOwnProperty(e)&&delete this._triggeredKeys[e];for(e in this._longPressKeys)this._longPressKeys.hasOwnProperty(e)&&(t=this._longPressKeys[e],clearTimeout(t._longPressTimeout),t._longPressTimeout=null,delete this._longPressKeys[e]);this._cleanupTimeout=null}},_setupCleanupTimer:{value:function(){var t=this;this._cleanupTimeout&&clearTimeout(this._cleanupTimeout),this._cleanupTimeout=setTimeout(function(){t._cleanup()},this._cleanupThreshold)}},_convertKeysToModifiersAndKeyCode:{value:function(t){var e,n,i,r=0,s=0;for(t=t.toLowerCase().replace(/ /g,"").replace(/\+\+/g,"+add").split("+"),e=t.length,i=0;e-1>i;i++){if(n=t[i],n=c[n]||n,n=h[n],!n)return console.warn("Invalid Key sequence:",t),null;s|=n.value}return n=t[e-1],n=d[n]||n,n=u[n]||n,n.length>1?(r=a[n],n=h[c[n]||n],n&&(s|=n.value)):r=n.toUpperCase().charCodeAt(0),{modifiers:s,keyCode:r}}},_decodeKeyIdentifier:{value:function(t){return t.match(/U\+/)?parseInt(t.substring(2),16):void 0}}}),m=null;n.defineProperty(e,"defaultKeyManager",{get:function(){return m||(m=new v),m}})}});