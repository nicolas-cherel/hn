montageDefine("5c5cf9e","lib/websocket/driver/headers",{dependencies:[],factory:function(e,t,n){"use strict";var i=function(){this.clear()};i.prototype.ALLOWED_DUPLICATES=["set-cookie","set-cookie2","warning","www-authenticate"],i.prototype.clear=function(){this._sent={},this._lines=[]},i.prototype.set=function(e,t){if(void 0!==t){e=this._strip(e),t=this._strip(t);var n=e.toLowerCase();(!this._sent.hasOwnProperty(n)||this.ALLOWED_DUPLICATES.indexOf(n)>=0)&&(this._sent[n]=!0,this._lines.push(e+": "+t+"\r\n"))}},i.prototype.toString=function(){return this._lines.join("")},i.prototype._strip=function(e){return(""+e).replace(/^ */,"").replace(/ *$/,"")},n.exports=i}});