var Montage=require("../core").Montage,MontageLabeler=require("./serializer/montage-labeler").MontageLabeler,MontageReviver=require("./deserializer/montage-reviver").MontageReviver,parse=require("frb/parse"),stringify=require("frb/stringify"),Serialization=Montage.specialize({_serializationString:{value:null},_serializationObject:{value:null},_serializationLabels:{value:null},initWithString:{value:function(t){return this._serializationString=t,this._serializationObject=null,this._serializationLabels=null,this}},initWithObject:{value:function(t){return this._serializationString=null,this._serializationObject=t,this._serializationLabels=null,this}},clone:{value:function(){var t=new Serialization;return t.initWithString(this.getSerializationString()),t}},getSerializationObject:{value:function(){return this._serializationObject||(this._serializationObject=JSON.parse(this._serializationString)),this._serializationObject}},getSerializationString:{value:function(){return this._serializationString||(this._serializationString=JSON.stringify(this._serializationObject)),this._serializationString}},getSerializationLabels:{value:function(){var t;return this._serializationLabels||(t=this.getSerializationObject())&&(this._serializationLabels=Object.keys(t)),this._serializationLabels}},getExternalObjectLabels:{value:function(){var t=this.getSerializationObject(),e=[];for(var n in t)0===Object.keys(t[n]).length&&e.push(n);return e}},hasSerializationLabel:{value:function(t){return t in this.getSerializationObject()}},isExternalObject:{value:function(t){var e=this.getSerializationObject();return e&&t in e?0===Object.keys(e[t]).length:!1}},isAlias:{value:function(t){var e=this.getSerializationObject();return e&&t in e?"alias"in e[t]:!1}},getElementId:{value:function(t){var e=this.getSerializationObject(),n=Montage.getPath.call(e,t+".properties.element");return n?n["#"]:void 0}},getSerializationLabelsWithElements:{value:function(t){var e=new SerializationInspector,n=[];return e.initWithSerialization(this),e.visitSerialization(function(e){"Element"===e.type&&t.indexOf(e.data)>=0&&(e=e.parent,e&&"properties"===e.name&&(e=e.parent,e&&"montageObject"===e.type&&n.push(e.label)))}),n}},renameElementReferences:{value:function(t){var e=new SerializationInspector;e.initWithSerialization(this),e.visitSerialization(function(e){"Element"===e.type&&e.data in t&&(e.data=t[e.data])})}},renameSerializationLabels:{value:function(t){var e=new SerializationInspector;e.initWithSerialization(this),e.visitSerialization(function(e){if(e.label){var n=e.label;n in t&&(e.label=t[n])}if("reference"===e.type){var i=e.data;i in t&&(e.data=t[i])}})}},mergeSerialization:{value:function(t,e){return SerializationMerger.mergeSerializations(this,t,e)}},extractSerialization:{value:function(t,e){var n=new SerializationExtractor;return n.initWithSerialization(this),n.extractSerialization(t,e)}}}),SerializationMerger=Montage.specialize(null,{mergeSerializations:{value:function(t,e,n){var i,r,a,o,s,l,c={};a=t.getSerializationLabels(),o=e.getSerializationLabels(),s=this._createCollisionTable(a,o,c,n&&n.labeler),n&&n.willMergeObjectWithLabel&&(l=this._willMergeObjectWithLabel(n,t,e,c),s=s||l),s&&(e=e.clone(),e.renameSerializationLabels(c),o=e.getSerializationLabels()),i=t.getSerializationObject(),r=e.getSerializationObject();for(var u,h=0;u=o[h];h++)-1===a.indexOf(u)&&(i[u]=r[u]);return t.initWithObject(i),c}},_willMergeObjectWithLabel:{value:function(t,e,n,i){var r,a,o,s,l,c=!1,u=n.getSerializationLabels();i&&(o=[],Object.keys(i).forEach(function(t){o.push(i[t])}));for(var h,d=0;h=u[d];d++)if(a=i&&i[h],r=t.willMergeObjectWithLabel(h,a),"string"==typeof r){if(s=this._isLabelValidInSerialization(r,e),s||(l=!this._isLabelValidInSerialization(r,n)&&-1===o.indexOf(r)),!s&&!l)throw Error("willMergeObjectWithLabel either needs to return a label that exists in the destination serialization to indicate it's the same object or return a completely new label to rename the object being merged. \""+r+'"  destination: '+e.getSerializationString()+"\n source: "+n.getSerializationString()+"\n collision table: "+JSON.stringify(i,null,4));c=!0,i[h]=r}return c}},_isLabelValidInSerialization:{value:function(t,e){var n,i;return e.hasSerializationLabel(t)?!0:(i=t.indexOf(":"),i>0&&(n=t.slice(0,i),e.hasSerializationLabel(n))?!0:!1)}},_createCollisionTable:{value:function(t,e,n,i){for(var r,a,o,s,i=i||new MontageLabeler,l=!1,c=Object.create(null),u=0;t.length>u;u++)o=t[u],s=o.indexOf(":"),s>0&&(r=o.slice(0,s),i.addLabel(r),c[r]=1),i.addLabel(o),c[o]=1;for(var u=0;o=e[u];u++)s=o.indexOf(":"),s>0?(r=o.slice(0,s),a=n[r],a?(n[o]=a+":"+o.slice(s+1),l=!0):r in c?(a=i.generateLabel(i.getLabelBaseName(r)),e.indexOf(r)>=0&&(n[r]=a),n[o]=a+o.slice(s),l=!0):i.addLabel(r)):o in c&&!(o in n)?(n[o]=i.generateLabel(i.getLabelBaseName(o)),l=!0):i.addLabel(o);return l}}}),SerializationInspector=Montage.specialize({initWithSerialization:{value:function(t){this._serialization=t}},visitSerialization:{value:function(t){var e=this._serialization.getSerializationObject();this._walkRootObjects(t,e),this._serialization.initWithObject(e)}},visitSerializationObject:{value:function(t,e){var n=this._serialization.getSerializationObject();if(!(t in n))throw Error('Object "'+t+'" does not exist in '+this._serialization.getSerializationString());this._walkRootObject(e,n,t),this._serialization.initWithObject(n)}},changeLabel:{value:function(t,e){var n,i=this._serialization.getSerializationObject();n=i[t],delete i[t],i[e]=n}},_walkRootObjects:{value:function(t,e){for(var n in e)this._walkRootObject(t,e,n)}},_walkRootObject:{value:function(t,e,n){var i=e[n];"value"in i?this._walkObject(t,i,"value",n):this._walkCustomObject(t,e,n)}},_walkObject:{value:function(t,e,n,i,r){var a,o=e[n],s=MontageReviver.getTypeOf(o);if(a={type:s},i?a.label=i:a.name=n,r&&(a.parent=r),"number"===s||"string"===s||"null"===s)a.data=o,t(a),e[n]=a.data;else if("regexp"===s)a.data=o["/"],t(a),o["/"]=a.data;else if("reference"===s)a.data=o["@"],t(a),o["@"]=a.data;else if("Element"===s)a.data=o["#"],t(a),o["#"]=a.data;else if("array"===s){a.data=o,t(a),e[n]=o=a.data;for(var l=0,c=o.length;c>l;l++)this._walkObject(t,o,""+l,null,a)}else if("object"===s){a.data=o,t(a),e[n]=o=a.data;for(var n in o)this._walkObject(t,o,n,null,a)}a.label!=i&&this.changeLabel(i,a.label)}},_walkCustomObject:{value:function(t,e,n){var i,r=e[n];i={type:"montageObject",label:n,data:r},t(i),e[n]=r=i.data,i.label!=n&&this.changeLabel(n,i.label),r.properties&&this._walkObject(t,r,"properties",null,i),r.listeners&&this._walkObject(t,r,"listeners",null,i),r.bindings&&this._walkBindings(t,r,null,i),r.localizations&&this._walkLocalizations(t,r,null,i)}},_walkBindings:{value:function(t,e,n){var i,r=e.bindings;i={type:"bindings",data:r,parent:n},t(i),e.bindings=r=i.data;for(var a in r)this._walkBinding(t,r,a,i)}},_walkBinding:{value:function(t,e,n,i){var r,a=e[n];r={type:"binding",name:n,data:a,parent:i},t(r),e[n]=a=r.data,this._walkBindingData(t,a,r)}},_walkBindingData:{value:function(t,e,n){var i,r,a=!1;i=e["<-"]||e["<->"],r=Object.clone(parse(i)),this._walksBindingReferences(r,function(e){var n={type:"reference",data:e.label};t(n),e.label!==n.data&&(e.label=n.data,a=!0)}),a&&("<-"in e?e["<-"]=stringify(r):e["<->"]=stringify(r)),e.converter&&this._walkObject(t,e,"converter",null,n)}},_walkLocalizations:{value:function(t,e,n){var i,r=e.localizations;i={type:"localizations",data:r,parent:n},t(i),e.localizations=r=i.data;for(var a in r)this._walkLocalization(t,r,a,i)}},_walkLocalization:{value:function(t,e,n,i){var r,a,o=e[n];if(r={type:"localization",name:n,data:o,parent:i},t(r),e[n]=o=r.data,"object"==typeof o.key&&this._walkBindingData(t,o.key,r),"object"==typeof o.default&&this._walkBindingData(t,o.default,r),"object"==typeof o.data){a=o.data;for(var n in a)this._walkBindingData(t,a[n],r)}}},_walksBindingReferences:{value:function(t,e){var n=t.args;if("component"===t.type&&e(t),n)for(var i=0,r=n.length;r>i;i++)this._walksBindingReferences(n[i],e)}}}),SerializationExtractor=Montage.specialize({_serialization:{value:null},initWithSerialization:{value:function(t){this._serialization=t}},extractSerialization:{value:function(t,e){var n,i=new SerializationInspector,r={},a=[];n=this._serialization.getSerializationObject(),i.initWithSerialization(this._serialization);for(var o,s=0;o=t[s];s++)r[o]=n[o],i.visitSerializationObject(o,function(e){var n;"reference"===e.type&&(n=e.data,-1===a.indexOf(n)&&-1===t.indexOf(n)&&a.push(n))});if(e)for(var o,s=0;o=e[s];s++)o in n&&!(o in r)&&(r[o]={});for(var o,s=0;o=a[s];s++)r[o]={};return(new Serialization).initWithObject(r)}}});exports.Serialization=Serialization,exports.SerializationMerger=SerializationMerger,exports.SerializationInspector=SerializationInspector,exports.SerializationExtractor=SerializationExtractor;