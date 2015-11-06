var Montage=require("../core/core").Montage,Composer=require("./composer").Composer,MutableEvent=require("../core/event/mutable-event").MutableEvent,PressComposer=exports.PressComposer=Composer.specialize({load:{value:function(){window.Touch?this._element.addEventListener("touchstart",this,!0):this._element.addEventListener("mousedown",this,!0)}},unload:{value:function(){window.Touch?this._element.removeEventListener("touchstart",this,!0):this._element.removeEventListener("mousedown",this,!0)}},delegate:{value:null},cancelPress:{value:function(){return this._state===PressComposer.PRESSED?(this._dispatchPressCancel(),this._endInteraction(),!0):!1}},addEventListener:{value:function(t,e,n){Composer.addEventListener.call(this,t,e,n),"longPress"===t&&(this._shouldDispatchLongPress=!0)}},UNPRESSED:{value:0},PRESSED:{value:1},CANCELLED:{value:2},_state:{enumerable:!1,value:0},state:{get:function(){return this._state}},_shouldDispatchLongPress:{enumerable:!1,value:!1},_longPressThreshold:{enumerable:!1,value:1e3},longPressThreshold:{get:function(){return this._longPressThreshold},set:function(t){this._longPressThreshold!==t&&(this._longPressThreshold=t)}},_longPressTimeout:{enumberable:!1,value:null},_observedPointer:{enumerable:!1,value:null},_startInteraction:{enumerable:!1,value:function(t){if("enabled"in this.component&&!this.component.enabled||null!==this._observedPointer)return!1;var e;"touchstart"===t.type?(e=t.changedTouches.length,1===e&&(this._observedPointer=t.changedTouches[0].identifier),document.addEventListener("touchend",this,!1),document.addEventListener("touchcancel",this,!1)):"mousedown"===t.type&&(this._observedPointer="mouse",document.addEventListener("mouseup",this,!1),document.addEventListener("click",this,!1)),this._element.addEventListener("dragstart",this,!1),this.component.eventManager.claimPointer(this._observedPointer,this),this._dispatchPressStart(t)}},_interpretInteraction:{value:function(t){var e,n,i;if(null===this._observedPointer)return this._endInteraction(t),void 0;for(e=!this.component.eventManager.isPointerClaimedByComponent(this._observedPointer,this),n=t.target;n!==this._element&&n&&n.parentNode;)n=n.parentNode;if(i=n===this._element,e&&"click"===t.type)return t.preventDefault(),this._endInteraction(t),void 0;if("mouseup"===t.type){if(!e&&i)return this._dispatchPress(t),this._endInteraction(t),void 0;if(!e&&!i)return this._dispatchPressCancel(t),this._endInteraction(t),void 0;this._endInteraction(t)}}},_endInteraction:{value:function(){document.removeEventListener("touchend",this),document.removeEventListener("touchcancel",this),document.removeEventListener("click",this),document.removeEventListener("mouseup",this),this.component.eventManager.isPointerClaimedByComponent(this._observedPointer,this)&&this.component.eventManager.forfeitPointer(this._observedPointer,this),this._observedPointer=null,this._state=PressComposer.UNPRESSED}},_changedTouchisObserved:{value:function(t){if(null===this._observedPointer)return!1;for(var e=0,n=t.length;n>e;e++)if(t[e].identifier===this._observedPointer)return e;return!1}},surrenderPointer:{value:function(t,e){var n=this.callDelegateMethod("surrenderPointer",t,e);return n!==void 0&&n===!1?!1:(this._dispatchPressCancel(),!0)}},captureTouchstart:{value:function(t){this._startInteraction(t)}},handleTouchend:{value:function(t){return null===this._observedPointer?(this._endInteraction(t),void 0):(this._changedTouchisObserved(t.changedTouches)!==!1&&(this.component.eventManager.isPointerClaimedByComponent(this._observedPointer,this)?this._dispatchPress(t):t.preventDefault(),this._endInteraction(t)),void 0)}},handleTouchcancel:{value:function(t){(null===this._observedPointer||this._changedTouchisObserved(t.changedTouches)!==!1)&&(this.component.eventManager.isPointerClaimedByComponent(this._observedPointer,this)&&this._dispatchPressCancel(t),this._endInteraction(t))}},captureMousedown:{value:function(t){this._startInteraction(t)}},handleClick:{value:function(t){this._interpretInteraction(t)}},handleMouseup:{value:function(t){this._interpretInteraction(t)}},handleDragstart:{value:function(t){this._dispatchPressCancel(t),this._endInteraction()}},_createPressEvent:{enumerable:!1,value:function(t,e){var n,i;return e||(e=document.createEvent("CustomEvent"),e.initCustomEvent(t,!0,!0,null)),n=new PressEvent,n.event=e,n.type=t,n.pointer=this._observedPointer,n.targetElement=e.target,e.changedTouches&&(i=this._changedTouchisObserved(e.changedTouches))!==!1&&(n.touch=e.changedTouches[i]),n}},_dispatchPressStart:{enumerable:!1,value:function(t){if(this._state=PressComposer.PRESSED,this.dispatchEvent(this._createPressEvent("pressStart",t)),this._shouldDispatchLongPress){var e=this;this._longPressTimeout=setTimeout(function(){e._dispatchLongPress()},this._longPressThreshold)}}},_dispatchPress:{enumerable:!1,value:function(t){this._shouldDispatchLongPress&&(clearTimeout(this._longPressTimeout),this._longPressTimeout=null),this.dispatchEvent(this._createPressEvent("press",t)),this._state=PressComposer.UNPRESSED}},_dispatchLongPress:{enumerable:!1,value:function(t){this._shouldDispatchLongPress&&(this.dispatchEvent(this._createPressEvent("longPress",t)),this._longPressTimeout=null)}},_dispatchPressCancel:{enumerable:!1,value:function(t){this._shouldDispatchLongPress&&(clearTimeout(this._longPressTimeout),this._longPressTimeout=null),this._state=PressComposer.CANCELLED,this.dispatchEvent(this._createPressEvent("pressCancel",t))}}}),PressEvent=function(){var t,e,n,i,a,r;for(t=MutableEvent.specialize({type:{value:"press"},_event:{enumerable:!1,value:null},event:{get:function(){return this._event},set:function(t){this._event=t}},_touch:{enumerable:!1,value:null},touch:{get:function(){return this._touch},set:function(t){this._touch=t}}}),e=["altKey","ctrlKey","metaKey","shiftKey","cancelBubble","currentTarget","defaultPrevented","eventPhase","timeStamp","preventDefault","stopImmediatePropagation","stopPropagation"],n=["clientX","clientY","pageX","pageY","screenX","screenY","target"],i=function(t){return{get:function(){return this._event[t]}}},a=function(t){return{get:function(){return this._touch?this._touch[t]:this._event[t]}}},r=e.length-1;r>=0;r--)Montage.defineProperty(t,e[r],i(e[r]));for(r=n.length-1;r>=0;r--)Montage.defineProperty(t,n[r],a(n[r]));return t}();