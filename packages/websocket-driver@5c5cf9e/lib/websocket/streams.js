"use strict";var Stream=require("stream").Stream,util=require("util"),IO=function(e){this.readable=this.writable=!0,this._paused=!1,this._driver=e};util.inherits(IO,Stream),IO.prototype.pause=function(){this._paused=!0,this._driver.messages._paused=!0},IO.prototype.resume=function(){this._paused=!1,this.emit("drain");var e=this._driver.messages;e._paused=!1,e.emit("drain")},IO.prototype.write=function(e){return this.writable?(this._driver.parse(e),!this._paused):!1},IO.prototype.end=function(e){if(this.writable){void 0!==e&&this.write(e),this.writable=!1;var t=this._driver.messages;t.readable&&(t.readable=t.writable=!1,t.emit("end"))}},IO.prototype.destroy=function(){this.end()};var Messages=function(e){this.readable=this.writable=!0,this._paused=!1,this._driver=e};util.inherits(Messages,Stream),Messages.prototype.pause=function(){this._driver.io._paused=!0},Messages.prototype.resume=function(){this._driver.io._paused=!1,this._driver.io.emit("drain")},Messages.prototype.write=function(e){return this.writable?("string"==typeof e?this._driver.text(e):this._driver.binary(e),!this._paused):!1},Messages.prototype.end=function(e){void 0!==e&&this.write(e)},Messages.prototype.destroy=function(){},exports.IO=IO,exports.Messages=Messages;