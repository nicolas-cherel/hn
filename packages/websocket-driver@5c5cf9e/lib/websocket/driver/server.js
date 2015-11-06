"use strict";var util=require("util"),HttpParser=require("../http_parser"),Base=require("./base"),Draft75=require("./draft75"),Draft76=require("./draft76"),Hybi=require("./hybi"),Server=function(e){Base.call(this,null,null,e),this._http=new HttpParser("request")};util.inherits(Server,Base);var instance={EVENTS:["open","message","error","close"],_bindEventListeners:function(){this.messages.on("error",function(){}),this.on("error",function(){})},parse:function(e){if(this._delegate)return this._delegate.parse(e);if(this._http.parse(e),this._http.isComplete()){this.method=this._http.method,this.url=this._http.url,this.headers=this._http.headers,this.body=this._http.body;var t=this;this._delegate=Server.http(this,this._options),this._delegate.messages=this.messages,this._delegate.io=this.io,this._open(),this.EVENTS.forEach(function(e){this._delegate.on(e,function(n){t.emit(e,n)})},this),this.protocol=this._delegate.protocol,this.version=this._delegate.version,this.parse(this._http.body),this.emit("connect",new Base.ConnectEvent)}},_open:function(){this.__queue.forEach(function(e){this._delegate[e[0]].apply(this._delegate,e[1])},this),this.__queue=[]}};["addExtension","setHeader","start","frame","text","binary","ping","close"].forEach(function(e){instance[e]=function(){return this._delegate?this._delegate[e].apply(this._delegate,arguments):(this.__queue.push([e,arguments]),!0)}});for(var key in instance)Server.prototype[key]=instance[key];Server.isSecureRequest=function(e){if(e.connection&&void 0!==e.connection.authorized)return!0;if(e.socket&&e.socket.secure)return!0;var t=e.headers;return t?"on"===t.https?!0:"on"===t["x-forwarded-ssl"]?!0:"https"===t["x-forwarded-scheme"]?!0:"https"===t["x-forwarded-proto"]?!0:!1:!1},Server.determineUrl=function(e){var t=this.isSecureRequest(e)?"wss:":"ws:";return t+"//"+e.headers.host+e.url},Server.http=function(e,t){t=t||{},void 0===t.requireMasking&&(t.requireMasking=!0);var n=e.headers,i=this.determineUrl(e);return n["sec-websocket-version"]?new Hybi(e,i,t):n["sec-websocket-key1"]?new Draft76(e,i,t):new Draft75(e,i,t)},module.exports=Server;