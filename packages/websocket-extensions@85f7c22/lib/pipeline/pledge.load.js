montageDefine("85f7c22","lib/pipeline/pledge",{dependencies:["./ring_buffer"],factory:function(e,t,n){"use strict";var i=e("./ring_buffer"),r=function(){this._complete=!1,this._callbacks=new i(r.QUEUE_SIZE)};r.QUEUE_SIZE=4,r.all=function(e){var t=new r,n=e.length,i=n;for(0===n&&t.done();i--;)e[i].then(function(){n-=1,0===n&&t.done()});return t},r.prototype.then=function(e){this._complete?e():this._callbacks.push(e)},r.prototype.done=function(){this._complete=!0;for(var e,t=this._callbacks;e=t.shift();)e()},n.exports=r}});