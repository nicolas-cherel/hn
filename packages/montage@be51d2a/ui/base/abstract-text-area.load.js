montageDefine("be51d2a","ui/base/abstract-text-area",{dependencies:["../../core/core","../component","collections/dict"],factory:function(t,e){var n=(t("../../core/core").Montage,t("../component").Component);t("collections/dict");var i=e.AbstractTextArea=n.specialize({constructor:{value:function i(){if(this.constructor===i)throw Error("AbstractTextArea cannot be instantiated.");n.constructor.call(this),this.defineBindings({"classList.has('montage--disabled')":{"<-":"!enabled"}})}},hasTemplate:{value:!1},enabled:{value:!0},_placeholderValue:{value:null},placeholderValue:{set:function(t){this._placeholderValue=t,this.needsDraw=!0},get:function(){return this._placeholderValue}},_value:{value:null},value:{set:function(t){this._value=t,this.needsDraw=!0},get:function(){return this._value}},enterDocument:{value:function(t){t&&(this.element.addEventListener("input",this,!1),this.element.addEventListener("change",this,!1))}},draw:{value:function(){var t=this.value;this.element.value=t||!1===t?""+t:"",null!=this._placeholderValue&&this.element.setAttribute("placeholder",this._placeholderValue)}},handleChange:{value:function(){this._updateValueFromDom()}},handleInput:{value:function(){this._updateValueFromDom()}},_updateValueFromDom:{value:function(){this._value!==this.element.value&&(this._value=this.element.value,this.dispatchOwnPropertyChange("value",this._value))}}})}});