montageDefine("5c5cf9e","lib/websocket/http_parser",{dependencies:[],factory:function(e,t,n){"use strict";var i=process.binding("http_parser").HTTPParser,r=i.RESPONSE?6:4,a=function(e){this._parser="request"===e?new i(i.REQUEST||"request"):new i(i.RESPONSE||"response"),this._type=e,this._complete=!1,this.headers={};var t=null,n=this;this._parser.onHeaderField=function(e,n,i){t=e.toString("utf8",n,n+i).toLowerCase()},this._parser.onHeaderValue=function(e,i,r){var a=e.toString("utf8",i,i+r);n.headers.hasOwnProperty(t)?n.headers[t]+=", "+a:n.headers[t]=a},this._parser.onHeadersComplete=this._parser[i.kOnHeadersComplete]=function(e,t,i,r,o,s){var l=arguments[0];if("object"==typeof l&&(r=l.method,o=l.url,s=l.statusCode,i=l.headers),n.method="number"==typeof r?a.METHODS[r]:r,n.statusCode=s,n.url=o,i){for(var c,u,h=0,d=i.length;d>h;h+=2)c=i[h].toLowerCase(),u=i[h+1],n.headers.hasOwnProperty(c)?n.headers[c]+=", "+u:n.headers[c]=u;n._complete=!0}}};a.METHODS={0:"DELETE",1:"GET",2:"HEAD",3:"POST",4:"PUT",5:"CONNECT",6:"OPTIONS",7:"TRACE",8:"COPY",9:"LOCK",10:"MKCOL",11:"MOVE",12:"PROPFIND",13:"PROPPATCH",14:"SEARCH",15:"UNLOCK",16:"REPORT",17:"MKACTIVITY",18:"CHECKOUT",19:"MERGE",24:"PATCH"},a.prototype.isComplete=function(){return this._complete},a.prototype.parse=function(e){var t=6>r?1:0,n=this._parser.execute(e,0,e.length)+t;this._complete&&(this.body=e.length>n?e.slice(n):new Buffer(0))},n.exports=a}});