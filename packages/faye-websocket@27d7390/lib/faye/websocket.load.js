montageDefine("27d7390","lib/faye/websocket",{dependencies:["util","websocket-driver","./websocket/api","./websocket/client","./eventsource"],factory:function(e,t,n){var i=e("util"),r=e("websocket-driver"),a=e("./websocket/api"),s=function(e,t,n,i,s){s=s||{},this._stream=t,this._driver=r.http(e,{maxLength:s.maxLength,protocols:i});var o=this;if(this._stream&&this._stream.writable){if(!this._stream.readable)return this._stream.end();var l=function(){o._stream.removeListener("data",l)};this._stream.on("data",l),this._driver.io.write(n),a.call(this,s),process.nextTick(function(){o._driver.start()})}};i.inherits(s,a),s.isWebSocket=function(e){return r.isWebSocket(e)},s.validateOptions=function(e,t){r.validateOptions(e,t)},s.WebSocket=s,s.Client=e("./websocket/client"),s.EventSource=e("./eventsource"),n.exports=s}});