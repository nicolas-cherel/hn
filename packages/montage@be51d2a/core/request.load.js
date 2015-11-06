montageDefine("be51d2a","core/request",{dependencies:["./promise"],factory:function(t,e,n){var i=t("./promise").Promise;e=n.exports=function(t){t=e.normalizeRequest(t);var n=i.defer(),r=t.xhr||new XMLHttpRequest;r.open(t.method,t.url,!0),r.onload=function(){var t={status:r.status,headers:e.parseResponseHeaders(r.getAllResponseHeaders()),body:r.response,xhr:r};n.resolve(t)},r.onerror=function(){n.reject(Error("Could not load"))};var a=t.headers;for(var o in a){var s=a[o];if(Array.isArray(s))for(var l=0;s.length>l;l++)r.setRequestHeader(o,s[l]);else r.setRequestHeader(o,s)}var c=t.options;for(var u in c)r[u]=c[u];return t.overrideMimeType&&r.overrideMimeType(t.overrideMimeType),r.send(t.body),n.promise},e.request=e,e.makeOk=function(t){return function(n){n=e.normalizeRequest(n);var r=n.url;return i.when(t(n),function(t){if(t.status>=200&&300>t.status)return t;var e=Error("Could not load "+JSON.stringify(r)+": "+t.status+" "+t.xhr.statusText);throw e.response=t,e})}},e.ok=e.makeOk(e.request),e.makeJson=function(t){return function(n){n=e.normalizeRequest(n);var r=n.url;return n.headers.accept=n.headers.accept||"application/json",n.headers["content-type"]=n.headers["content-type"]||"application/json","object"==typeof n.body&&(n.body=JSON.stringify(n.body)),n.overrideMimeType=n.overrideMimeType||"application/json",n.options.responseType=n.options.responseType||"json",i.when(t(n),function(t){if(null===t.body||"string"==typeof t.body)try{t.body=JSON.parse(t.body)}catch(e){throw Error("Could not parse JSON from "+JSON.stringify(r)+": "+e.message)}return t})}},e.json=e.makeJson(e.request),e.normalizeRequest=function(t){return"string"==typeof t&&(t={url:t}),t.method=t.method||"GET",t.headers=t.headers||{},t.options=t.options||{},t},e.parseResponseHeaders=function(t){var e={};return t?(t.replace(/^([^:]+):(.*)$/gm,function(t,n,i){n=n.trim().toLowerCase(),i=i.trim(),n in e?("string"==typeof e[n]&&(e[n]=[e[n]]),e[n].push(i)):e[n]=i}),e):e}}});