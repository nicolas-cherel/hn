"use strict";var Montage=require("../core").Montage,Promise=require("../promise").Promise,RemoteReference=require("./remote-reference").RemoteReference,BinderModule=require("./binder"),logger=require("../logger").logger("blueprint");exports.BinderReference=RemoteReference.create(RemoteReference,{constructor:{value:function(){this.superForValue("constructor")()}},identifier:{get:function(){return this._reference||(this._reference=this.referenceFromValue(this._value)),["binder",this._reference.binderName.toLowerCase(),"reference"].join("_")}},valueFromReference:{value:function(t,e){var n=t.binderName,i=t.binderModuleId,r=Promise.defer(),a=BinderModule.Binder.manager.binderForName(n);if(a)r.resolve(a);else try{var o=e,s=i.indexOf("/");if(s>0){var l=i.substring(0,s),c=e.mappings;l in c&&(i=i.substring(s+1),o=o.getPackage(c[l].location))}r=BinderModule.Binder.getBinderWithModuleId(i,o)}catch(u){r.reject(Error("Error cannot find Blueprint Binder "+i))}return r.promise}},referenceFromValue:{value:function(t){var e={};return e.binderName=t.name,e.binderModuleId=t.binderModuleId,e}}});