var Component=require("montage/ui/component").Component;exports.RawHtml=Component.specialize({constructor:{value:function(){this.super()}},_value:{value:null},value:{get:function(){return this._value},set:function(e){this._value!==e&&(this._value=e,this.needsDraw=!0)}},defaultValue:{value:""},draw:{value:function(){var e=this._value,t=e||0===e?e:this.defaultValue;this.element.innerHTML=t}}});