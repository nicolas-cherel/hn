function bind(e,t,n){n.target=e,n.targetPath=t;var i=n.source=n.source||e,r=n["<-"]||n["<->"]||"",a=n.twoWay="<->"in n;n.sourcePath=r,n.value;var o=n.parameters=n.parameters||i,s=n.document,l=n.components,c=n.trace,u=n.sourceScope=new Scope(i);u.parameters=o,u.document=s,u.components=l;var h=n.targetScope=new Scope(e);if(h.parameters=o,h.document=s,h.components=l,n.converter){var d=n.converter;d.convert&&(n.convert=d.convert.bind(d)),d.revert&&(n.revert=d.revert.bind(d))}else if(n.reverter){var p=n.reverter;p.convert&&(n.revert=p.convert.bind(p)),p.revert&&(n.convert=p.revert.bind(p))}var f=n.convert,g=n.revert,m=n.sourceSyntax=parse(r),v=n.targetSyntax=parse(t),y=solve(v,m);if(v=y[0],m=y[1],a&&"rangeContent"===v.type)return bindRangeContent(h,v.args[0],u,m,f,g,n,c?{sourcePath:stringify(m),targetPath:stringify(v.args[0])}:null);c&&console.log("DEFINE BINDING",t,"<-",r,e);var b=bindOneWay(h,v,u,m,f,n,c),y=solve(m,v);m=y[0],v=y[1];var _=Function.noop;return a&&(c&&console.log("DEFINE BINDING",t,"->",r,i),_=bindOneWay(u,m,h,v,g,n,c)),function(){b(),_()}}function bindOneWay(e,t,n,i,r,a,o){var s=compileObserver(i);r&&(s=Observers.makeConverterObserver(s,r,n));var l=compileBinder(t);return l(s,n,e,a,o?{sourcePath:stringify(i),targetPath:stringify(t)}:null)}function bindRangeContent(e,t,n,i,r,a,o,s){function l(e,t,n){p||(p=!0,s&&console.log("RANGE CONTENT PROPAGATED",s.targetPath,"<-",s.sourcePath,"PLUS",e,"MINUS",t,"AT",n),h.swap(n,t.length,e),p=!1)}function c(e,t,n){p||(p=!0,s&&console.log("RANGE CONTENT PROPAGATED",s.targetPath,"->",s.sourcePath,"PLUS",e,"MINUS",t,"AT",n),d.swap(n,t.length,e),p=!1)}function u(){if(d!==h){s&&console.log("RANGE CONTENT BOUND",s.targetPath,"<->",s.sourcePath),p=!0;var t=observeRangeChange(d,l,n),i=observeRangeChange(h,c,e);return p=!1,function(){s&&console.log("RANGE CONTENT UNBOUND",s.targetPath,"<->",s.sourcePath),t(),i()}}}var h,d,p,f=compileObserver(i),g=compileObserver(t),m=compileAssigner(i),v=compileAssigner(t),y=Function.noop;p=!0;var b=g(function(e){y(),y=Function.noop,s&&console.log("RANGE CONTENT TARGET",s.targetPath,"SET TO",e),e&&e.addRangeChangeListener&&(h=e,d&&h?(s&&console.log("RANGE CONTENT TARGET REPLACES SOURCE",s.targetPath,"->",s.sourcePath,"WITH",h),p=!0,d.swap(0,d.length,h),p=!1,y=u()):d||p||(s&&console.log("RANGE CONTENT TARGET INITIALIZED TO COPY OF SOURCE",s.targetPath,"<-",tarce.sourcePath,"WITH",d),m(h.clone(),n)))},e);p=!1;var _=f(function(t){y(),y=Function.noop,s&&console.log("RANGE CONTENT SOURCE",s.sourcePath,"SET TO",t),t&&t.addRangeChangeListener&&(d=t,h&&d?(s&&console.log("RANGE CONTENT SOURCE REPLACES TARGET",s.targetPath,"<-",s.sourcePath,"WITH",d),p=!0,h.swap(0,h.length,d),p=!1,y=u()):h||v(d.clone(),e))},n);return h||d||m([],n),function(){y(),b(),_()}}var parse=require("./parse"),solve=require("./algebra"),stringify=require("./stringify"),compileObserver=require("./compile-observer"),compileBinder=require("./compile-binder"),compileAssigner=require("./compile-assigner"),Observers=require("./observers"),observeRangeChange=Observers.observeRangeChange,Binders=require("./binders"),Scope=require("./scope");module.exports=bind;