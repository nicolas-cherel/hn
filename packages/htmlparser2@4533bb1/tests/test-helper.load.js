montageDefine("4533bb1","tests/test-helper",{dependencies:[".."],factory:function(e,t){var n=e(".."),i=n.Parser,r=n.CollectingHandler,a=5;t.writeToParser=function(e,t,n){for(var r=new i(e,t),o=0;n.length>o;o+=a)r.write(n.substr(o,a));r.end(),r.parseComplete(n)},t.getEventCollector=function(e){var t=new r({onerror:e,onend:function(){e(null,t.events.reduce(function(e,t){return"onerror"===t[0]||"onend"===t[0]||("ontext"===t[0]&&e.length&&"text"===e[e.length-1].event?e[e.length-1].data[0]+=t[1]:e.push({event:t[0].slice(2),data:t.slice(1)})),e},[]))}});return t}}});