"use strict";var StreamReader=function(){this._queue=[],this._queueSize=0};StreamReader.prototype.put=function(e){e&&0!==e.length&&(e.copy||(e=new Buffer(e)),this._queue.push(e),this._queueSize+=e.length)},StreamReader.prototype.read=function(e){if(e>this._queueSize)return null;if(0===e)return new Buffer(0);var t,n=this._queue,i=n[0];if(i.length>=e)return this._queueSize-=e,i.length===e?n.shift():(t=i.slice(0,e),n[0]=i.slice(e),t);for(var r,a=e,o=0,s=n.length;s>o&&!(n[o].length>a);o++)a-=n[o].length;return r=n.splice(0,o),a>0&&n.length>0&&(r.push(n[0].slice(0,a)),n[0]=n[0].slice(a)),this._queueSize-=e,this._concat(r,e)},StreamReader.prototype._concat=function(e,t){if(Buffer.concat)return Buffer.concat(e,t);for(var n=new Buffer(t),i=0,r=0,a=e.length;a>r;r++)e[r].copy(n,i),i+=e[r].length;return n},module.exports=StreamReader;