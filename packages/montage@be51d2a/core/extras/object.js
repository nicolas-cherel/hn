var WeakMap=require("collections/weak-map"),MODIFY="modify",STRING="string",FUNCTION="function";Object.defineProperty(Object,"getPropertyDescriptor",{value:function(t,e){var n,i=t;do n=Object.getOwnPropertyDescriptor(i,e);while(!n&&(i=i.__proto__||Object.getPrototypeOf(i)));return n},writable:!0,configurable:!0}),Object.defineProperty(Object,"getPrototypeAndDescriptorDefiningProperty",{value:function(t,e){var n,i=t;if(e){do n=Object.getOwnPropertyDescriptor(i,e);while(!n&&(i=i.__proto__||Object.getPrototypeOf(i)));return{prototype:i,propertyDescriptor:n}}},writable:!0,configurable:!0}),Object.defineProperty(Object.prototype,"clear",{value:function(){for(var t=Object.keys(this),e=t.length;e;)e--,delete this[t[e]];return this},writable:!0,configurable:!0}),Object.defineProperty(Object,"defineBinding",{value:function(t,e,n){var i=Error.stackTraceLimit;Error.stackTraceLimit=2,console.warn("Object.defineBinding deprecated.  See the comment below this warning for migration instructions.",Error("deprecated").stack),Error.stackTraceLimit=i;var r=require("frb");n.source=n.boundObject,n.oneway?n["<-"]=n.boundObjectPropertyPath:n["<->"]=n.boundObjectPropertyPath,n.boundValueMutator&&(n.convert=n.boundValueMutator),r.defineBinding(t,e,n)}}),Object.defineProperty(Object,"deleteBinding",{value:function(t,e){var n=require("frb");n.cancelBinding(t,e)}});