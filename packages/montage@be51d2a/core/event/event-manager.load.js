montageDefine("be51d2a","core/event/event-manager",{dependencies:["../core","../uuid","./mutable-event","core/serialization/serializer/montage-serializer","core/serialization/deserializer/montage-deserializer"],factory:function(t,e){var n,i=t("../core").Montage,r=t("../uuid"),a=t("./mutable-event").MutableEvent,o=t("core/serialization/serializer/montage-serializer").MontageSerializer,s=t("core/serialization/deserializer/montage-deserializer").MontageDeserializer;if("undefined"!=typeof window){window.Touch===void 0&&"ontouchstart"in window&&(window.Touch=function(){},function(){var t;document.addEventListener("touchstart",t=function(e){window.Touch=e.touches[0].constructor,document.nativeRemoveEventListener?document.nativeRemoveEventListener("touchstart",t,!0):document.removeEventListener("touchstart",t,!0),n&&n.isStoringPointerEvents&&(n.isStoringPointerEvents=!1,n.isStoringPointerEvents=!0)},!0)}()),i.specialize({type:{value:null},listener:{value:null},capture:{value:null}});var l=i.specialize({constructor:{value:function(t){return this.data=Array(32),this.velocity={velocity:(new h).initWithIdentifier(t)},this}},data:{enumerable:!1,writable:!0,value:null},size:{enumerable:!1,writable:!0,value:0},pos:{enumerable:!1,writable:!0,value:0},velocity:{enumerable:!1,writable:!0,value:0}}),c=i.specialize({constructor:{value:function(t,e,n){return this.clientX=t,this.clientY=e,this.timeStamp=n,this}},clientX:{enumerable:!1,writable:!0,value:null},clientY:{enumerable:!1,writable:!0,value:0},timeStamp:{enumerable:!1,writable:!0,value:0}});i.specialize({memory:{value:{}},add:{value:function(t,e,n,i){var r;(r=this.memory[t])||(r=this.memory[t]=new l(t)),(data=r.data[r.pos])?(data.clientX=e,data.clientY=n,data.timeStamp=i):data=r.data[r.pos]=new c(e,n,i),r.size<r.data.length&&r.size++,r.pos=(r.pos+1)%r.data.length}},remove:{value:function(t){delete this.memory[t]}},clear:{value:function(t){this.memory[t]&&(this.memory[t].size=0,this.memory[t].velocity.velocity.clearCache())}},getMemory:{value:function(t){return this.memory[t]}},isStored:{value:function(t){return this.memory[t]&&this.memory[t].size>0}},pointerVelocity:{value:function(t){return this.memory[t]?this.memory[t].velocity:void 0}},storeEvent:{value:function(t){var e;switch(t.type){case"mousedown":n._isMouseDragging=!0;case"mousemove":n._isStoringMouseEventsWhileDraggingOnly?n._isMouseDragging&&(this.add("mouse",t.clientX,t.clientY,t.timeStamp),Object.defineProperty(t,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}})):(this.add("mouse",t.clientX,t.clientY,t.timeStamp),Object.defineProperty(t,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}}));break;case"mouseup":this.add("mouse",t.clientX,t.clientY,t.timeStamp),Object.defineProperty(t,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}});break;case"touchstart":case"touchmove":for(e=0;t.touches.length>e;e++)this.add(t.touches[e].identifier,t.touches[e].clientX,t.touches[e].clientY,t.timeStamp);break;case"touchend":for(e=0;t.changedTouches.length>e;e++)this.add(t.changedTouches[e].identifier,t.changedTouches[e].clientX,t.changedTouches[e].clientY,t.timeStamp)}}},removeEvent:{value:function(t){var e;switch(t.type){case"mouseup":n._isMouseDragging=!1,n._isStoringMouseEventsWhileDraggingOnly&&this.clear("mouse");break;case"touchend":for(e=0;t.changedTouches.length>e;e++)this.remove(t.changedTouches[e].identifier)}}}});var h=i.specialize({_identifier:{enumerable:!1,writable:!0,value:null},initWithIdentifier:{value:function(t){return this._identifier=t,this}},clearCache:{value:function(){return this._data=this._x=this._y=this._speed=this._angle=null,this}},_data:{enumerable:!1,writable:!0,value:null},_x:{enumerable:!1,writable:!0,value:null},_y:{enumerable:!1,writable:!0,value:null},_speed:{enumerable:!1,writable:!0,value:null},_angle:{enumerable:!1,writable:!0,value:null},x:{get:function(){return null===this._x&&(null===this._data&&(this._data=n._getPointerVelocityData(this._identifier)),this._x=n._calculatePointerVelocity(this._data.time,this._data.x)),this._x},set:function(){}},y:{get:function(){return null===this._y&&(null===this._data&&(this._data=n._getPointerVelocityData(this._identifier)),this._y=n._calculatePointerVelocity(this._data.time,this._data.y)),this._y},set:function(){}},speed:{get:function(){return null===this._speed&&(this._speed=Math.sqrt(this.x*this.x+this.y*this.y)),this._speed},set:function(){}},angle:{get:function(){return null===this._angle&&(this._angle=Math.atan2(this.y,this.x)),this._angle},set:function(){}}}),u=function(){return this.listeners={},this};u._pool=[],u.checkoutRegistration=function(){return 0===this._pool.length?new this:this._pool.pop()},u.checkinRegistration=function(t){t.target=null,this._pool.push(t)},Object.defineProperties(u.prototype,{target:{enumerable:!1,writable:!0,value:null},listeners:{enumerable:!1,writable:!0,value:null}});var d=function(){return this};d._pool=[],d.checkoutRegistration=function(){return 0===this._pool.length?new this:this._pool.pop()},d.checkinRegistration=function(t){t.listener=null,this._pool.push(t)},Object.defineProperties(d.prototype,{initWithListener:{value:function(t,e,n){return this.listener=t,this.capture=e,this.bubble=n,this}},listener:{enumerable:!1,writable:!0,value:null},capture:{enumerable:!1,writable:!0,value:!0},bubble:{enumerable:!1,writable:!0,value:!1}}),o.defineSerializationUnit("listeners",function(t,e){var i,r,a,o=n,s=e.uuid,l=[];for(var c in o.registeredEventListeners)if(i=o.registeredEventListeners[c],r=i&&i[s])for(var h in r.listeners)a=r.listeners[h],l.push({type:c,listener:t.addObjectReference(a.listener),capture:a.capture});return l.length>0?l:void 0}),s.defineDeserializationUnit("listeners",function(t,e,n){for(var i,r=0;i=n[r];r++)e.addEventListener(i.type,i.listener,i.capture)});var p=Event.NONE,f=Event.CAPTURING_PHASE,g=Event.AT_TARGET,v=Event.BUBBLING_PHASE,m="function";e.EventManager=i.specialize({constructor:{value:function(){this.super()}},eventDefinitions:{value:{abort:{bubbles:!1,cancelable:!1},beforeunload:{bubbles:!1},blur:{bubbles:!1,cancelable:!1},change:{bubbles:!0,cancelable:!1},click:{bubbles:!0,cancelable:!0},close:{bubbles:!1,cancelable:!1},compositionend:{bubbles:!0,cancelable:!1},compositionstart:{bubbles:!0,cancelable:!0},compositionupdate:{bubbles:!0,cancelable:!1},contextmenu:{bubbles:!0,cancelable:!0},copy:{bubbles:!0,cancelable:!0},cut:{bubbles:!0,cancelable:!0},dblclick:{bubbles:!0,cancelable:!1},DOMActivate:{bubbles:!0,cancelable:!0,deprecated:!0},DOMMouseScroll:{bubbles:!0},drag:{bubbles:!0,cancelable:!0},dragend:{bubbles:!0,cancelable:!1},dragenter:{bubbles:!0,cancelable:!0},dragleave:{bubbles:!0,cancelable:!1},dragover:{bubbles:!0,cancelable:!0},dragstart:{bubbles:!0,cancelable:!0},drop:{bubbles:!0,cancelable:!0},error:{bubbles:function(t){return!(XMLHttpRequest.prototype.isPrototypeOf(t)||t.tagName&&"VIDEO"===t.tagName.toUpperCase()||t.tagName&&"AUDIO"===t.tagName.toUpperCase())},cancelable:!1},focus:{bubbles:!1,cancelable:!1},focusin:{bubbles:!0,cancelable:!1},focusout:{bubbles:!0,cancelable:!1},input:{bubbles:!0,cancelable:!1},keydown:{bubbles:!0,cancelable:!1},keypress:{bubbles:!0,cancelable:!1},keyup:{bubbles:!0,cancelable:!1},load:{bubbles:!1,cancelable:!1},loadend:{bubbles:!1,cancelable:!1},loadstart:{bubbles:!1,cancelable:!1},message:{bubbles:!1,cancelable:!1},mousedown:{bubbles:!0,cancelable:!0},mouseenter:{bubbles:!1,cancelable:!1},mouseleave:{bubbles:!1,cancelable:!1},mousemove:{bubbles:!0,cancelable:!0},mouseout:{bubbles:!0,cancelable:!0},mouseover:{bubbles:!0,cancelable:!0},mouseup:{bubbles:!0,cancelable:!0},mousewheel:{bubbles:!0},orientationchange:{bubbles:!1},paste:{bubbles:!0,cancelable:!0},progress:{bubbles:!1,cancelable:!1},reset:{bubbles:!0,cancelable:!1},resize:{bubbles:!1,cancelable:!1},scroll:{bubbles:function(t){return!!t.defaultView},cancelable:!1},select:{bubbles:!0,cancelable:!1},submit:{bubbles:!0,cancelable:!0},touchcancel:{bubbles:!0,cancelable:!1},touchend:{bubbles:!0,cancelable:!0},touchmove:{bubbles:!0,cancelable:!0},touchstart:{bubbles:!0,cancelable:!0},unload:{bubbles:!1,cancelable:!1},wheel:{bubbles:!0,cancelable:!0}}},_DOMPasteboardElement:{value:null,enumerable:!1},_delegate:{value:null,enumerable:!1},delegate:{enumerable:!1,get:function(){return this._delegate},set:function(t){this._delegate=t}},_application:{value:null,enumerable:!1},application:{enumerable:!1,get:function(){return this._application},set:function(t){this._application=t}},_registeredWindows:{value:null,enumerable:!1},_windowsAwaitingFinalRegistration:{value:{},enumerable:!1},initWithWindow:{enumerable:!1,value:function(t){if(this._registeredWindows)throw"EventManager has already been initialized";return this.registerWindow(t),this}},registerWindow:{enumerable:!1,value:function(t){if(t.defaultEventManager&&t.defaultEventManager!==this)throw"EventManager cannot register a window already registered to another EventManager";if(this._registeredWindows&&this._registeredWindows.indexOf(t)>=0)throw"EventManager cannot register a window more than once";if(this._registeredWindows||(this._registeredWindows=[]),t.uuid&&0!==t.uuid.length||(t.uuid=r.generate()),this._windowsAwaitingFinalRegistration[t.uuid]!==t){if(t.Element.prototype.nativeAddEventListener=t.Element.prototype.addEventListener,Object.defineProperty(t,"nativeAddEventListener",{configurable:!0,value:t.addEventListener}),Object.getPrototypeOf(t.document).nativeAddEventListener=t.document.addEventListener,t.XMLHttpRequest.prototype.nativeAddEventListener=t.XMLHttpRequest.prototype.addEventListener,t.Worker&&(t.Worker.prototype.nativeAddEventListener=t.Worker.prototype.addEventListener),t.MediaController&&(t.MediaController.prototype.nativeAddEventListener=t.MediaController.prototype.addEventListener),t.Element.prototype.nativeRemoveEventListener=t.Element.prototype.removeEventListener,Object.defineProperty(t,"nativeRemoveEventListener",{configurable:!0,value:t.removeEventListener}),Object.getPrototypeOf(t.document).nativeRemoveEventListener=t.document.removeEventListener,t.XMLHttpRequest.prototype.nativeRemoveEventListener=t.XMLHttpRequest.prototype.removeEventListener,t.Worker&&(t.Worker.prototype.nativeRemoveEventListener=t.Worker.prototype.removeEventListener),t.MediaController&&(t.MediaController.prototype.nativeRemoveEventListener=t.MediaController.prototype.removeEventListener),Object.defineProperty(t,"addEventListener",{configurable:!0,value:t.XMLHttpRequest.prototype.addEventListener=t.Element.prototype.addEventListener=Object.getPrototypeOf(t.document).addEventListener=function(e,n,i){return t.defaultEventManager.registerEventListener(this,e,n,!!i)}}),t.Worker&&(t.Worker.prototype.addEventListener=t.addEventListener),t.MediaController&&(t.MediaController.prototype.addEventListener=t.addEventListener),Object.defineProperty(t,"removeEventListener",{configurable:!0,value:t.XMLHttpRequest.prototype.removeEventListener=t.Element.prototype.removeEventListener=Object.getPrototypeOf(t.document).removeEventListener=function(e,n,i){return t.defaultEventManager.unregisterEventListener(this,e,n,!!i)}}),t.Worker&&(t.Worker.prototype.removeEventListener=t.removeEventListener),t.MediaController&&(t.MediaController.prototype.removeEventListener=t.removeEventListener),t.HTMLDivElement.prototype.addEventListener!==t.Element.prototype.nativeAddEventListener&&t.HTMLElement&&"addEventListener"in t.HTMLElement.prototype){var a,o,s=Object.getOwnPropertyNames(t),l=0,c=s.length;for(l;c>l;l++)a=s[l],a.match(/^HTML\w*Element$/)&&"function"==typeof a&&(o=a.prototype,o.nativeAddEventListener=o.addEventListener,o.addEventListener=t.Element.prototype.addEventListener,o.nativeRemoveEventListener=o.removeEventListener,o.removeEventListener=t.Element.prototype.removeEventListener)}i.defineProperty(t.Element.prototype,"eventHandlerUUID",{value:void 0,enumerable:!1}),i.defineProperty(t.Element.prototype,"component",{get:function(){return n._elementEventHandlerByUUID[this.eventHandlerUUID]},enumerable:!1}),n=t.defaultEventManager=e.defaultEventManager=this,this._registeredWindows.push(t),this._windowsAwaitingFinalRegistration[t.uuid]=t,/loaded|complete|interactive/.test(t.document.readyState)?this._finalizeWindowRegistration(t):t.document.addEventListener("DOMContentLoaded",this,!0)}}},_finalizeWindowRegistration:{enumerable:!1,value:function(t){if(this._windowsAwaitingFinalRegistration[t.uuid]!==t)throw"EventManager wasn't expecting to register this window";delete this._windowsAwaitingFinalRegistration[t.uuid],this._listenToWindow(t)}},unregisterWindow:{enumerable:!1,value:function(t){if(0>this._registeredWindows.indexOf(t))throw"EventManager cannot unregister an unregistered window";if(this._registeredWindows=this._registeredWindows.filter(function(e){return t!==e}),delete t.defaultEventManager,t.Element.prototype.addEventListener=t.Element.prototype.nativeAddEventListener,Object.defineProperty(t,"addEventListener",{configurable:!0,value:t.nativeAddEventListener}),Object.getPrototypeOf(t.document).addEventListener=t.document.nativeAddEventListener,t.XMLHttpRequest.prototype.addEventListener=t.XMLHttpRequest.prototype.nativeAddEventListener,t.Worker&&(t.Worker.prototype.addEventListener=t.Worker.prototype.nativeAddEventListener),t.Element.prototype.removeEventListener=t.Element.prototype.nativeRemoveEventListener,Object.defineProperty(t,"removeEventListener",{configurable:!0,value:t.nativeRemoveEventListener}),Object.getPrototypeOf(t.document).removeEventListener=t.document.nativeRemoveEventListener,t.XMLHttpRequest.prototype.removeEventListener=t.XMLHttpRequest.prototype.nativeRemoveEventListener,t.Worker&&(t.Worker.prototype.removeEventListener=t.Worker.prototype.nativeRemoveEventListener),t.HTMLDivElement.prototype.nativeAddEventListener!==t.Element.prototype.addEventListener&&t.HTMLElement&&"addEventListener"in t.HTMLElement.prototype&&t.Components&&t.Components.interfaces){var e,n;for(e in Components.interfaces)e.match(/^nsIDOMHTML\w*Element$/)&&(e=e.replace(/^nsIDOM/,""),(e=window[e])&&(n=e.prototype,n.addEventListener=n.nativeAddEventListener,delete n.nativeAddEventListener,n.removeEventListener=n.nativeRemoveEventListener,delete n.nativeRemoveEventListener))}delete t.Element.prototype.nativeAddEventListener,delete t.nativeAddEventListener,delete Object.getPrototypeOf(t.document).nativeAddEventListener,delete t.XMLHttpRequest.prototype.nativeAddEventListener,t.Worker&&delete t.Worker.prototype.nativeAddEventListener,delete t.Element.prototype.nativeRemoveEventListener,delete t.nativeRemoveEventListener,delete Object.getPrototypeOf(t.document).nativeRemoveEventListener,delete t.XMLHttpRequest.prototype.nativeRemoveEventListener,t.Worker&&delete t.Worker.prototype.nativeRemoveEventListener,delete t.Element.prototype.eventHandlerUUID,delete t.Element.prototype.component,this._stopListeningToWindow(t)}},unregisterWindows:{enumerable:!1,value:function(){this._registeredWindows.forEach(this.unregisterWindow)}},registeredEventListeners:{enumerable:!1,value:{}},registeredEventListenersForEventType_:{value:function(t){var e,n,i,r,a=this.registeredEventListeners[t];if(!a)return null;r={};for(e in a){n=a[e].listeners;for(i in n)r[i]=n[i]}return r}},registeredEventListenersForEventType_onTarget_:{enumerable:!1,value:function(t,e,n){var i,r;return i=e===n?n.eventManager.registeredEventListeners[t]:this.registeredEventListeners[t],i?(r=i[e.uuid],r?r.listeners:null):null}},registeredEventListenersOnTarget_:{value:function(t){var e,n,i=[];for(e in this.registeredEventListeners)n=this.registeredEventListeners[e],t.uuid in n&&i.push(n);return i}},registerEventListener:{enumerable:!1,value:function(t,e,n,i){var r,a,o,s=this.registeredEventListeners[e],l=!1,c=!1;if(t.uuid===void 0)throw Error("EventManager cannot observe a target without a uuid: "+(t.outerHTML||t));return s?((r=s[t.uuid])||((r=s[t.uuid]=u.checkoutRegistration()).target=t,l=!0),a=r.listeners[n.uuid],o=i?"capture":"bubble",a?(a[o]=!0,c=!0):(r.listeners[n.uuid]=d.checkoutRegistration().initWithListener(n,i,!i),c=!0)):(s=this.registeredEventListeners[e]={},(s[t.uuid]=u.checkoutRegistration()).target=t,s[t.uuid].listeners[n.uuid]=d.checkoutRegistration().initWithListener(n,i,!i),l=!0,c=!0),l&&"function"==typeof t.nativeAddEventListener&&this._observeTarget_forEventType_(t,e),c}},unregisterEventListener:{enumerable:!1,value:function(t,e,n,i){var r,a,o,s,l,c=this.registeredEventListeners[e];if(c&&(r=c[t.uuid])){if(a=r.listeners[n.uuid],!a){for(s in r.listeners)if(l=r.listeners[s].listener,l.originalListener&&l.originalListener.uuid===n.uuid){a=r.listeners[s],n=l;break}if(!a)return}o=i?"capture":"bubble",a[o]=!1,a.bubble||a.capture||(d.checkinRegistration(r.listeners[n.uuid]),delete r.listeners[n.uuid],0===Object.keys(r.listeners).length&&(delete c[t.uuid],u.checkinRegistration(r),0===Object.keys(c).length&&(delete this.registeredEventListeners[e],this._stopObservingTarget_forEventType_(t,e))))}}},actualDOMTargetForEventTypeOnTarget:{value:function(t,e){if(e.nativeAddEventListener){if(e.defaultView)return e;var n,i=this.eventDefinitions[t];return i?(n=typeof i.bubbles===m?i.bubbles(e):i.bubbles,n?e.screen?e.document:e.ownerDocument:e):e}return null}},_observedTarget_byEventType_:{value:{}},_observeTarget_forEventType_:{enumerable:!1,value:function(t,e){var n;!(n=this.actualDOMTargetForEventTypeOnTarget(e,t))||this._observedTarget_byEventType_[e]&&this._observedTarget_byEventType_[e][n.uuid]||(this._observedTarget_byEventType_[e]||(this._observedTarget_byEventType_[e]={}),this._observedTarget_byEventType_[e][n.uuid]=this,n.nativeAddEventListener(e,this,!0))}},_stopObservingTarget_forEventType_:{enumerable:!1,value:function(t,e){var n;n=this.actualDOMTargetForEventTypeOnTarget(e,t),n&&(delete this._observedTarget_byEventType_[e][n.uuid],n.nativeRemoveEventListener(e,this,!0))}},_activationHandler:{enumerable:!0,value:null},_listenToWindow:{enumerable:!1,value:function(t){if(!this._activationHandler){var e=this;this._activationHandler=function(t){var n,i=t.type;if("focus"===i||"mousedown"===i||"touchstart"===i)if(t.changedTouches){n=t.changedTouches.length;for(var r=0;n>r;r++)e._prepareComponentsForActivation(t.changedTouches[r].target)}else e._prepareComponentsForActivation(t.target)}}if(t.Touch?t.document.nativeAddEventListener("touchstart",this._activationHandler,!0):t.document.nativeAddEventListener("mousedown",this._activationHandler,!0),t.document.nativeAddEventListener("focus",this._activationHandler,!0),this.application){var n,i=this.registeredEventListenersOnTarget_(this.application);for(n in i)this._observeTarget_forEventType_(t,n)}}},_stopListeningToWindow:{enumerable:!1,value:function(t){var e,n=this.registeredEventListenersOnTarget_(this.application),i=this.registeredEventListenersOnTarget_(t);for(e in n)this._stopObservingTarget_forEventType_(t,e);for(e in i)this._stopObservingTarget_forEventType_(t,e)}},reset:{enumerable:!1,value:function(){var t,e,n,i;for(t in this.registeredEventListeners){e=this.registeredEventListeners[t];for(n in e.targets)i=e.targets[n],this._stopObservingTarget_forEventType_(i.target,t)}this.registeredEventListeners={},this._claimedPointers={}}},unload:{enumerable:!1,value:function(){this._stopListening()}},methodNameForBubblePhaseOfEventType:{enumerable:!1,value:function(t){return function(e,n){var i=n?e+"+"+n:e;return t[i]||(t[i]="handle"+(n?n.toCapitalized():"")+e.toCapitalized())}}({})},_methodNameForCapturePhaseByEventType_:{value:{}},methodNameForCapturePhaseOfEventType:{enumerable:!1,value:function(t){return function(e,n){var i=n?e+"+"+n:e;return t[i]||(t[i]="capture"+(n?n.toCapitalized():"")+e.toCapitalized())}}({})},_claimedPointers:{enumerable:!1,distinct:!0,value:{}},componentClaimingPointer:{value:function(t){return this._claimedPointers[t]}},isPointerClaimedByComponent:{value:function(t,e){if(!e)throw"Must specify a valid component to see if it claims the specified pointer, '"+e+"' is not valid.";return this._claimedPointers[t]===e}},claimPointer:{value:function(t,e){if(!t&&0!==t)throw"Must specify a valid pointer to claim, '"+t+"' is not valid.";if(!e)throw"Must specify a valid component to claim a pointer, '"+e+"' is not valid.";var n=this._claimedPointers[t];return n===e?!0:n?n.surrenderPointer(t,e)?(this._claimedPointers[t]=e,!0):!1:(this._claimedPointers[t]=e,!0)}},forfeitPointer:{value:function(t,e){if(e!==this._claimedPointers[t])throw"Not allowed to forfeit pointer '"+t+"' claimed by another component";delete this._claimedPointers[t]}},forfeitAllPointers:{value:function(t){var e,n;for(e in this._claimedPointers)n=this._claimedPointers[e],t===n&&delete this._claimedPointers[e]}},_isStoringPointerEvents:{enumerable:!1,value:!1},isStoringPointerEvents:{enumerable:!0,get:function(){return this._isStoringPointerEvents},set:function(t){t===!0?this._isStoringPointerEvents||(this._isStoringPointerEvents=!0,window.Touch&&Object.defineProperty(Touch.prototype,"velocity",{get:function(){return n.pointerMotion(this.identifier).velocity},set:function(){}})):(this._isStoringPointerEvents=!1,this._pointerStorage.memory={},this._isMouseDragging=!1)}},_isStoringMouseEventsWhileDraggingOnly:{enumerable:!1,value:!0},isStoringMouseEventsWhileDraggingOnly:{enumerable:!0,get:function(){return this._isStoringMouseEventsWhileDraggingOnly},set:function(t){this._isStoringMouseEventsWhileDraggingOnly=t===!0?!0:!1}},_isMouseDragging:{enumerable:!1,value:!1},_pointerStorage:{enumerable:!1,value:{memory:{},add:function(t,e){this.memory[t]||(this.memory[t]={data:Array(32),size:0,pos:0}),this.memory[t].data[this.memory[t].pos]=e,this.memory[t].size<this.memory[t].data.length&&this.memory[t].size++,this.memory[t].pos=(this.memory[t].pos+1)%this.memory[t].data.length},remove:function(t){delete this.memory[t]},clear:function(t){this.memory[t]&&(this.memory[t].size=0)},getMemory:function(t){return this.memory[t]},isStored:function(t){return this.memory[t]&&this.memory[t].size>0},storeEvent:function(t){var e;switch(t.type){case"mousedown":n._isMouseDragging=!0;case"mousemove":n._isStoringMouseEventsWhileDraggingOnly?n._isMouseDragging&&(this.add("mouse",{clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp}),Object.defineProperty(t,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}})):(this.add("mouse",{clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp}),Object.defineProperty(t,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}}));break;case"mouseup":this.add("mouse",{clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp}),Object.defineProperty(t,"velocity",{get:function(){return n.pointerMotion("mouse").velocity},set:function(){}});break;case"touchstart":case"touchmove":for(e=0;t.touches.length>e;e++)this.add(t.touches[e].identifier,{clientX:t.touches[e].clientX,clientY:t.touches[e].clientY,timeStamp:t.timeStamp});break;case"touchend":for(e=0;t.changedTouches.length>e;e++)this.add(t.changedTouches[e].identifier,{clientX:t.changedTouches[e].clientX,clientY:t.changedTouches[e].clientY,timeStamp:t.timeStamp})}},removeEvent:function(t){var e;switch(t.type){case"mouseup":n._isMouseDragging=!1,n._isStoringMouseEventsWhileDraggingOnly&&this.clear("mouse");break;case"touchend":for(e=0;t.changedTouches.length>e;e++)this.remove(t.changedTouches[e].identifier)}}}},_getPointerVelocityData:{enumerable:!1,value:function(t){var e,i,r,a,o,s,l,c,h,u=0,d=!0,p={x:[],y:[],time:[]};for(e=n._pointerStorage.getMemory(t),i=e.data.length,r=e.data[(e.pos-1+i)%i],a=o=s=r.timeStamp,l=r.clientX,c=r.clientY;d&&o>a-350&&e.size>u;)r=e.data[(e.pos-u-1+i)%i],o=r.timeStamp,h=l*l+c*c,h>2&&50>=s-o?(p.x.push(r.clientX),p.y.push(r.clientY),p.time.push(o),s=o,l=r.clientX,c=r.clientY,u++):d=!1;return p}},_fitPointerCurve:{enumerable:!1,value:function(t,e){var n,i,r,a,o,s,l,c,h,u,d,p,f,g,v,m,y,b,L,w,C,M,x,z,_,E,T,S,k,P,B,A,D,O,F,I,R,N,j=1e-4,U=e.length;do{for(d=0,p=0,f=0,g=0,v=0,m=0,b=0,L=0,w=0,C=0,M=0,x=0,_=0,E=0,T=0,S=0,k=0,P=0,A=0,D=0,O=0,F=0,I=0,R=0,u=0;U>u;u++)o=e[u],s=o.t,c=s*s,h=c*s,l=o.v,y=j*(6*(c-s)-h+2),z=6*j*(h-2*c+s),B=6*j*(c-h),N=2*j*h,m+=y*y,x+=z*z,P+=B*B,R+=N*N,d+=l*y,b+=l*z,_+=l*B,A+=l*N,f-=y,w-=z,T-=B,O-=N,p-=y*s,L-=z*s,E-=B*s,D-=N*s,g-=y*c,C-=z*c,S-=B*c,F-=N*c,v-=y*h,M-=z*h,k-=B*h,I-=N*h;j*=2}while(0===m||0===x||0===P||0===R);for(s=j/m,d*=s,p*=3*s,f*=s,g*=3*s,v*=s,s=j/x,b*=s,L*=3*s,w*=s,C*=3*s,M*=s,s=j/P,_*=s,E*=3*s,T*=s,S*=3*s,k*=s,s=j/R,A*=s,D*=3*s,O*=s,F*=3*s,I*=s,m=t[0],x=t[1],P=t[2],R=t[3],n=3*(x-P)+R-m,i=m+P-2*x,r=x-m,a=m,u=0;20>u;u++)s=d+a*f+r*p+i*g+n*v,m+=s,a+=s,n-=s,i+=s,r-=s,s=b+a*w+r*L+i*C+n*M,x+=s,n+=3*s,i-=s+s,r+=s,s=_+a*T+r*E+i*S+n*k,P+=s,n-=3*s,i+=s,s=A+a*O+r*D+i*F+n*I,R+=s,n+=s;t[0]=m,t[1]=x,t[2]=P,t[3]=R}},_pointerBezierValue:{enumerable:!1,value:function(t,e){var n=1-t;return n*n*n*e[0]+3*n*n*t*e[1]+3*n*t*t*e[2]+t*t*t*e[3]}},_calculatePointerVelocity:{enumerable:!1,value:function(t,e){var n,i,r=t.length,a=t[0],o=t[0],s=0;for(i=1;r>i;i++)a>t[i]&&(a=t[i],s=i);if(n=o-a){if(r>5){var l,c,h,u=[];for(i=0;r>i;i++)u[i]={v:e[i],t:(t[i]-a)/n};return l=u[s].v,c=u[0].v,h=[l,(2*l+c)/3,(l+2*c)/3,c],this._fitPointerCurve(h,u),5e3*(this._pointerBezierValue(.8,h)-this._pointerBezierValue(.6,h))/n}return r>1?1e3*(e[0]-e[s])/n:0}return 0}},pointerMotion:{value:function(t){if(n._pointerStorage.isStored(t)){var e={};return Object.defineProperties(e,{_data:{enumerable:!1,writable:!0,value:null},_x:{enumerable:!1,writable:!0,value:null},_y:{enumerable:!1,writable:!0,value:null},_speed:{enumerable:!1,writable:!0,value:null},_angle:{enumerable:!1,writable:!0,value:null},x:{get:function(){return null===this._x&&(null===this._data&&(this._data=n._getPointerVelocityData(t)),this._x=n._calculatePointerVelocity(this._data.time,this._data.x)),this._x},set:function(){}},y:{get:function(){return null===this._y&&(null===this._data&&(this._data=n._getPointerVelocityData(t)),this._y=n._calculatePointerVelocity(this._data.time,this._data.y)),this._y},set:function(){}},speed:{get:function(){return null===this._speed&&(this._speed=Math.sqrt(this.x*this.x+this.y*this.y)),this._speed},set:function(){}},angle:{get:function(){return null===this._angle&&(this._angle=Math.atan2(this.y,this.x)),this._angle},set:function(){}}}),{velocity:e}}return void 0}},monitorDOMModificationInEventHandling:{value:!1},domModificationEventHandler:{value:i.specialize({handleEvent:{value:function(){throw"DOM Modified"}},captureDOMSubtreeModified:{value:function(){throw"DOMSubtreeModified"}},captureDOMAttrModified:{value:function(){throw"DOMAttrModified"}},captureDOMCharacterDataModified:{value:function(){throw"DOMCharacterDataModified"}}})},handleEvent:{enumerable:!1,value:function(t){this.monitorDOMModificationInEventHandling&&(document.body.addEventListener("DOMSubtreeModified",this.domModificationEventHandler,!0),document.body.addEventListener("DOMAttrModified",this.domModificationEventHandler,!0),document.body.addEventListener("DOMCharacterDataModified",this.domModificationEventHandler,!0));var e,n,i,r,o,s,l,c,h,u,d,y,b,L,w=t.type,C=t.bubbles;for("DOMContentLoaded"===w&&(e=t.target.defaultView,e&&this._windowsAwaitingFinalRegistration[e.uuid]&&(this._finalizeWindowRegistration(e),t.target.removeEventListener("DOMContentLoaded",this,!0))),L="boolean"!=typeof t.propagationStopped?a.fromEvent(t):t,h=Element.isElement(L.target)||L.target instanceof Document||L.target===window?this._eventPathForDomTarget(L.target):this._eventPathForTarget(L.target),y=L.target.identifier?this.methodNameForCapturePhaseOfEventType(w,L.target.identifier):null,b=L.target.identifier?this.methodNameForBubblePhaseOfEventType(w,L.target.identifier):null,u=this.methodNameForCapturePhaseOfEventType(w),d=this.methodNameForBubblePhaseOfEventType(w),this.delegate&&typeof this.delegate.willDistributeEvent===m&&this.delegate.willDistributeEvent(L),this._isStoringPointerEvents&&this._pointerStorage.storeEvent(L),L.eventPhase=f,n=h.length-1;!L.propagationStopped&&(i=h[n]);n--)if(L.currentTarget=i,r=this.registeredEventListenersForEventType_onTarget_(w,i))for(l=Object.keys(r),o=0;r&&!L.immediatePropagationStopped&&(s=r[l[o]]);o++)s.capture&&(c=s.listener,this._invokeTargetListenerForEvent(i,c,L,y,u));if(!L.propagationStopped&&(L.eventPhase=g,L.currentTarget=i=L.target,r=this.registeredEventListenersForEventType_onTarget_(w,i)))for(l=Object.keys(r),o=0;r&&!L.immediatePropagationStopped&&(s=r[l[o]]);o++)c=s.listener,s.capture&&this._invokeTargetListenerForEvent(i,c,L,y,u),s.bubble&&this._invokeTargetListenerForEvent(i,c,L,b,d);for(L.eventPhase=v,n=0;C&&!L.propagationStopped&&(i=h[n]);n++)if(L.currentTarget=i,r=this.registeredEventListenersForEventType_onTarget_(w,i))for(l=Object.keys(r),o=0;r&&!L.immediatePropagationStopped&&(s=r[l[o]]);o++)s.bubble&&(c=s.listener,this._invokeTargetListenerForEvent(i,c,L,b,d));L.eventPhase=p,L.currentTarget=null,this._isStoringPointerEvents&&this._pointerStorage.removeEvent(t),this.monitorDOMModificationInEventHandling&&(document.body.removeEventListener("DOMSubtreeModified",this.domModificationEventHandler,!0),document.body.removeEventListener("DOMAttrModified",this.domModificationEventHandler,!0),document.body.removeEventListener("DOMCharacterDataModified",this.domModificationEventHandler,!0))}},_invokeTargetListenerForEvent:{value:function(t,e,n,i,r){var a;i&&typeof(a=e[i])===m||typeof(a=e[r])===m||typeof(a=e.handleEvent)===m?a.call(e,n):typeof e===m&&e.call(t,n)}},_prepareComponentsForActivation:{value:function(t){var e,n,i=t,r=i&&i.defaultView?i.defaultView:window,a=r.document?r.document:document,o=!1,s=null;do switch(i&&(n=this.eventHandlerForElement(i),n&&(o||(o=!0,s=this._findActiveTarget(n)),n._preparedForActivationEvents||(n._prepareForActivationEvents(),n._preparedForActivationEvents=!0))),e=i,i){case r:i=null;break;case a:i=r;break;case a.documentElement:i=a;break;default:i=i.parentNode}while(i&&e!==i);this.activeTarget=s}},_findActiveTarget:{value:function(t){for(var e=null,n={};!e&&t&&!(t.uuid in n);)n[t.uuid]=t,t.acceptsActiveTarget?e=t:t=t.nextTarget;return e}},_eventPathForTarget:{enumerable:!1,value:function(t){if(!t)return[];var e=t,n=this.application,i=[],r={};r[t.uuid]=t;do e.uuid in r||(i.push(e),r[e.uuid]=e),e=e.nextTarget,(!e||e.uuid in r)&&(e=n),e&&e.uuid in r&&(e=null);while(e);return i}},_eventPathForDomTarget:{enumerable:!1,value:function(t){if(!t)return[];var e,n=t,i=n&&n.defaultView?n.defaultView:window,r=i.document?i.document:document,a=this.application,o=[];do switch(n!==t&&o.push(n),e=n,n){case a:n=n.parentApplication,n&&(a=n);break;case i:n=a;break;case r:n=i;break;case r.documentElement:n=r;break;default:n=n.parentNode,n||(n=a)}while(n&&e!==n);return o}},_elementEventHandlerByUUID:{enumerable:!1,value:{}},registerEventHandlerForElement:{enumerable:!1,value:function(t,e){var n=this.eventHandlerForElement(e);n&&this.unregisterEventHandlerForElement(e),this._elementEventHandlerByUUID[e.eventHandlerUUID=t.uuid]=t}},unregisterEventHandlerForElement:{enumerable:!1,value:function(t){delete this._elementEventHandlerByUUID[t.eventHandlerUUID],delete t.eventHandlerUUID}},eventHandlerForElement:{enumerable:!1,value:function(t){return this._elementEventHandlerByUUID[t.eventHandlerUUID]}},_activeTarget:{value:null},activeTarget:{get:function(){return this._activeTarget||this.application},set:function(t){t||(t=this.application),t===this._activeTarget||this.activeTarget&&!this.activeTarget.surrendersActiveTarget(t)||(t.willBecomeActiveTarget(this.activeTarget),this._activeTarget=t,t.didBecomeActiveTarget())}}})}}});