var Montage=require("../../core").Montage,Reviver=require("mousse/deserialization/reviver").Reviver,PropertiesDeserializer=require("./properties-deserializer").PropertiesDeserializer,SelfDeserializer=require("./self-deserializer").SelfDeserializer,UnitDeserializer=require("./unit-deserializer").UnitDeserializer,ModuleReference=require("../../module-reference").ModuleReference,Alias=require("../alias").Alias,Promise=require("../../promise").Promise,ModuleLoader=Montage.specialize({_require:{value:null},_objectRequires:{value:null},init:{value:function(t,e){if("function"!=typeof t)throw Error("Function 'require' missing.");if("string"!=typeof t.location)throw Error("Function 'require' location is missing");if("object"!=typeof e&&e!==void 0)throw Error("Parameter 'objectRequires' should be an object.");return this._require=t,this._objectRequires=e,this}},getExports:{value:function(t,e){var n;for(e=t.resolve(e),n=t.getModuleDescriptor(e);void 0!==n.redirect;)n=t.getModuleDescriptor(n.redirect);return void 0!==n.mappingRedirect?this.getExports(n.mappingRequire,n.mappingRedirect):n.exports}},getModule:{value:function(t,e){var n,i,r=this._objectRequires;return n=r&&e in r?r[e]:this._require,i=this.getExports(n,t),i||(i=n.async(t)),i}}}),MontageReviver=exports.MontageReviver=Montage.specialize.call(Reviver,{moduleLoader:{value:null},init:{value:function(t,e){return this.moduleLoader=(new ModuleLoader).init(t,e),this}},getTypeOf:{value:function(t){if(null!==t&&"object"==typeof t&&1===Object.keys(t).length){if("#"in t)return"Element";if("%"in t)return"Module"}return Reviver.prototype.getTypeOf.call(this,t)}},_checkLabel:{value:function(t,e){return e&&":"!==t[0]?Error('Aliases can only be defined in template properties (start with a colon (:)), "'+t+'".'):e||":"!==t[0]?void 0:Error('Only aliases are allowed as template properties (start with a colon (:), "'+t+'".')}},reviveRootObject:{value:function(t,e,n){var i,r="alias"in t;return i=this._checkLabel(n,r),i?Promise.reject(i):Reviver.prototype.reviveRootObject.apply(this,arguments)}},reviveElement:{value:function(t,e,n){var i=t["#"],r=e.getElementById(i);return r?(n&&e.setObjectLabel(r,n),r):Promise.reject(Error("Element with id '"+i+"' was not found."))}},reviveModule:{value:function(t,e){var n=t["%"],i=e.getRequire();n=i.resolve(n);var r=i.getModuleDescriptor(n);return(new ModuleReference).initWithIdAndRequire(r.id,r.require)}},reviveCustomObject:{value:function(t,e,n){return"alias"in t?this.reviveAlias(t,e,n):this.reviveMontageObject(t,e,n)}},reviveMontageObject:{value:function(t,e,n){var i,r,a,o=this,s=t.prototype||t.object;return s&&(r=MontageReviver.parseObjectLocationId(s),i=this.moduleLoader.getModule(r.moduleId,n),a=r.objectName),Promise.isPromise(i)?i.then(function(i){return o.instantiateMontageObject(t,i,a,e,n)},function(e){throw e.stack&&console.error(e.stack),Error('Error deserializing "'+n+'" when loading module "'+r.moduleId+"' from '"+t.prototype+"'")}):this.instantiateMontageObject(t,i,a,e,n)}},instantiateMontageObject:{value:function(t,e,n,i,r){var a,o,s=this;return a=this.getMontageObject(t,e,n,i,r),i.setObjectLabel(a,r),a.isDeserializing=!0,o=this.reviveObjectLiteral(t,i),Promise.isPromise(o)?o.then(function(t){return s.deserializeMontageObject(t,a,i,r)}):this.deserializeMontageObject(o,a,i,r)}},deserializeMontageObject:{value:function(t,e,n,i){var r;return"function"==typeof e.deserializeSelf?this.deserializeCustomMontageObject(e,t,n,i):(n.setUnitsToDeserialize(e,t,MontageReviver._unitNames),r=this.deserializeMontageObjectProperties(e,t.properties,n),Promise.isPromise(r)?r.then(function(){return e}):e)}},deserializeMontageObjectProperties:{value:function(t,e,n){var i;if("function"==typeof t.deserializeProperties){var r=(new PropertiesDeserializer).initWithReviverAndObjects(this,n);i=t.deserializeProperties(r)}else for(var a in e)t[a]=e[a];return i}},deserializeCustomMontageObject:{value:function(t,e,n,i){var r,a=(new SelfDeserializer).initWithObjectAndObjectDescriptorAndContextAndUnitNames(t,e,n,MontageReviver._unitNames);return r=t.deserializeSelf(a),Promise.isPromise(r)?r.then(function(t){return n.setObjectLabel(t,i),t}):r!==void 0?(n.setObjectLabel(r,i),r):t}},getMontageObject:{value:function(t,e,n,i,r){var a;if(i.hasUserObject(r))return i.getUserObject(r);if("prototype"in t){if(!(n in e))throw Error('Error deserializing "'+r+'": object named "'+n+'"'+' was not found in "'+t.prototype+'".'+" Available objects are: "+Object.keys(e)+".");return a=Object.create(e[n].prototype),a.isDeserializing=!0,"function"==typeof a.didCreate?a.didCreate():"function"==typeof a.constructor&&a.constructor(),a}if("object"in t){if(!(n in e))throw Error('Error deserializing "'+r+'": object named "'+a+"' was not found given '"+t.object+"'");return e[n]}throw Error("Error deserializing "+JSON.stringify(t)+', might need "prototype" or "object" on label '+JSON.stringify(r))}},reviveAlias:{value:function(t,e,n){var i=new Alias;return i.value=t.alias,e.setObjectLabel(i,n),i}},didReviveObjects:{value:function(t,e){var n,i=this;return n=this._deserializeUnits(e),Promise.isPromise(n)?n.then(function(){i._invokeDeserializedFromSerialization(t,e)}):(this._invokeDeserializedFromSerialization(t,e),void 0)}},_invokeDeserializedFromSerialization:{value:function(t,e){var n;for(var i in t)n=t[i],null!=n&&delete n.isDeserializing,e.hasUserObject(i)||n&&"function"==typeof n.deserializedFromSerialization&&n.deserializedFromSerialization(i)}},_deserializeUnits:{value:function(t){var e,n,i=t.getUnitsToDeserialize(),r=MontageReviver._unitRevivers;try{for(var a,o=0;a=i[o];o++){e=a.unitNames;for(var s,l=0;s=e[l];l++)s in a.objectDesc&&(n=(new UnitDeserializer).initWithContext(t),r[s](n,a.object,a.objectDesc[s]))}}catch(c){return Promise.reject(c)}}}},{_unitRevivers:{value:Object.create(null)},_unitNames:{value:[]},_findObjectNameRegExp:{value:/([^\/]+?)(\.reel)?$/},_toCamelCaseRegExp:{value:/(?:^|-)([^-])/g},_replaceToCamelCase:{value:function(t,e){return e.toUpperCase()}},_locationDescCache:{value:Object.create(null)},parseObjectLocationId:{value:function(t){var e,n,i,r,a=this._locationDescCache;return t in a?e=a[t]:(n=t.indexOf("["),n>0?(i=t.substr(0,n),r=t.slice(n+1,-1)):(i=t,this._findObjectNameRegExp.test(t),r=RegExp.$1.replace(this._toCamelCaseRegExp,this._replaceToCamelCase)),e={moduleId:i,objectName:r},a[t]=e),e}},defineUnitReviver:{value:function(t,e){this._unitRevivers[t]=e,this._unitNames.push(t)}},getTypeOf:{value:function(t){return this.prototype.getTypeOf.call(this,t)}}});"undefined"!=typeof exports&&(exports.MontageReviver=MontageReviver);