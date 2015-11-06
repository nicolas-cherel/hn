"use strict";var crypto=require("crypto"),url=require("url"),util=require("util"),HttpParser=require("../http_parser"),Base=require("./base"),Hybi=require("./hybi"),Proxy=require("./proxy"),Client=function(e,t){this.version="hybi-13",Hybi.call(this,null,e,t),this.readyState=-1,this._key=Client.generateKey(),this._accept=Hybi.generateAccept(this._key),this._http=new HttpParser("response");var n=url.parse(this.url),i=n.auth&&new Buffer(n.auth,"utf8").toString("base64");this._pathname=(n.pathname||"/")+(n.search||""),this._headers.set("Host",n.host),this._headers.set("Upgrade","websocket"),this._headers.set("Connection","Upgrade"),this._headers.set("Sec-WebSocket-Key",this._key),this._headers.set("Sec-WebSocket-Version","13"),this._protocols.length>0&&this._headers.set("Sec-WebSocket-Protocol",this._protocols.join(", ")),i&&this._headers.set("Authorization","Basic "+i)};util.inherits(Client,Hybi),Client.generateKey=function(){return crypto.randomBytes(16).toString("base64")};var instance={proxy:function(e,t){return new Proxy(this,e,t)},start:function(){return-1!==this.readyState?!1:(this._write(this._handshakeRequest()),this.readyState=0,!0)},parse:function(e){return this.readyState>0?Hybi.prototype.parse.call(this,e):(this._http.parse(e),this._http.isComplete()&&(this._validateHandshake(),3!==this.readyState&&(this._open(),this.parse(this._http.body))),void 0)},_handshakeRequest:function(){var e=this._extensions.generateOffer();e&&this._headers.set("Sec-WebSocket-Extensions",e);var t="GET "+this._pathname+" HTTP/1.1",n=[t,""+this._headers,""];return new Buffer(n.join("\r\n"),"utf8")},_failHandshake:function(e){e="Error during WebSocket handshake: "+e,this.emit("error",Error(e)),this.readyState=3,this.emit("close",new Base.CloseEvent(this.ERRORS.protocol_error,e))},_validateHandshake:function(){if(this.statusCode=this._http.statusCode,this.headers=this._http.headers,101!==this._http.statusCode)return this._failHandshake("Unexpected response code: "+this._http.statusCode);var e=this._http.headers,t=e.upgrade||"",n=e.connection||"",i=e["sec-websocket-accept"]||"",r=e["sec-websocket-protocol"]||"";if(""===t)return this._failHandshake("'Upgrade' header is missing");if("websocket"!==t.toLowerCase())return this._failHandshake("'Upgrade' header value is not 'WebSocket'");if(""===n)return this._failHandshake("'Connection' header is missing");if("upgrade"!==n.toLowerCase())return this._failHandshake("'Connection' header value is not 'Upgrade'");if(i!==this._accept)return this._failHandshake("Sec-WebSocket-Accept mismatch");if(this.protocol=null,""!==r){if(0>this._protocols.indexOf(r))return this._failHandshake("Sec-WebSocket-Protocol mismatch");this.protocol=r}try{this._extensions.activate(this.headers["sec-websocket-extensions"])}catch(a){return this._failHandshake(a.message)}}};for(var key in instance)Client.prototype[key]=instance[key];module.exports=Client;