montageDefine("be51d2a","ui/base/abstract-number-field",{dependencies:["../../core/core","./abstract-control","../../composer/key-composer","collections/dict"],factory:function(t,e){var n=(t("../../core/core").Montage,t("./abstract-control").AbstractControl),i=t("../../composer/key-composer").KeyComposer;t("collections/dict");var r=e.AbstractNumberField=n.specialize({constructor:{value:function r(){if(this.constructor===r)throw Error("AbstractNumberField cannot be instantiated.");n.constructor.call(this),this._propertyNamesUsed={},this.defineBinding("classList.has('montage--disabled')",{"<-":"!enabled"})}},enterDocument:{value:function(t){if(t){var e=this._propertyNamesUsed;e.min||(this.min=this.element.getAttribute("min")||this._min),e.max||(this.max=this.element.getAttribute("max")||this._max),e.step||(this.step=this.element.getAttribute("step")||this._step),e.value||(this.value=this.element.getAttribute("value")||this._value),delete this._propertyNamesUsed,this._numberFieldTextFieldComponent.addEventListener("action",this,!1),this._numberFieldMinusComponent.addEventListener("action",this,!1),this._numberFieldPlusComponent.addEventListener("action",this,!1),this._numberFieldTextFieldComponent.delegate=this,this.element.addEventListener("mousedown",this,!1),this.element.tabIndex="-1",this._upKeyComposer=i.createKey(this,"up","increase"),this._downKeyComposer=i.createKey(this,"down","decrease"),this._rightKeyComposer=i.createKey(this,"right","increase"),this._leftKeyComposer=i.createKey(this,"left","decrease")}}},textFieldShouldBeginEditing:{value:function(){return this.enabled}},textFieldDidChange:{value:function(){}},textFieldDidEndEditing:{value:function(){this.value=this._numberFieldTextFieldComponent.value}},textFieldShouldAcceptValue:{value:function(){return this._activeValueChange===!0?!0:void 0}},prepareForActivationEvents:{value:function(){this._upKeyComposer.addEventListener("keyPress",this,!1),this._downKeyComposer.addEventListener("keyPress",this,!1),this._leftKeyComposer.addEventListener("keyPress",this,!1),this._rightKeyComposer.addEventListener("keyPress",this,!1)}},draw:{value:function(){this.element.setAttribute("aria-valuemax",this.max),this.element.setAttribute("aria-valuemin",this.min),this.element.setAttribute("aria-valuenow",this.value)}},acceptsActiveTarget:{value:!0},handleMousedown:{value:function(){this.element.focus()}},handlePlusAction:{value:function(){this._activeValueChange=!0;var t=this.step*this._stepDecimal,e="number"==typeof this.min?this.min*this._stepDecimal:0,n=this.value*this._stepDecimal-e;n%t?0>n?n-=n%t:n+=t-n%t:n+=t,this.value=(n+e)/this._stepDecimal,this._activeValueChange=!1}},handleMinusAction:{value:function(){this._activeValueChange=!0;var t=this.step*this._stepDecimal,e="number"==typeof this.min?this.min*this._stepDecimal:0,n=this.value*this._stepDecimal-e;n-=n%t?n>0?n%t:t+n%t:t,this.value=(n+e)/this._stepDecimal,this._activeValueChange=!1}},handleKeyPress:{value:function(t){this.enabled&&("increase"===t.identifier?this.handlePlusAction():"decrease"===t.identifier&&this.handleMinusAction())}},handleAction:{value:function(t){(t.target===this._numberFieldTextFieldComponent||t.target===this._numberFieldMinusComponent||t.target===this._numberFieldPlusComponent)&&(t.stopPropagation(),this.dispatchActionEvent())}},_value:{value:0},_required:{value:!1},_min:{value:"any"},_max:{value:"any"},_step:{value:1},min:{get:function(){return this._min},set:function(t){return"any"!==t&&isNaN(t=parseFloat(t))?!1:(this._min!==t&&(this._propertyNamesUsed&&(this._propertyNamesUsed.min=!0),this._min=t,this.needsDraw=!0,"number"==typeof t&&t>this.value&&(this.value=t)),void 0)}},max:{get:function(){return this._max},set:function(t){return"any"!==t&&isNaN(t=parseFloat(t))?!1:(this._max!==t&&(this._propertyNamesUsed&&(this._propertyNamesUsed.max=!0),this._max=t,this.needsDraw=!0,"number"==typeof t&&this.value>t&&(this.value=t)),void 0)}},_stepDecimal:{value:1},step:{get:function(){return this._step},set:function(t){if(isNaN(t=parseFloat(t))||0>=t)return!1;if(this._step!==t){this._propertyNamesUsed&&(this._propertyNamesUsed.step=!0),this._step=t;var e=(t+"").match(/\.(\d+)$/);this._stepDecimal=e?Math.pow(10,e[1].length):1}}},value:{get:function(){return this._value},set:function(t){null==t||t.valueOf===void 0?this._value="":isNaN(t=parseFloat(t))||("number"==typeof this.min&&this.min>t&&(t=this.min),"number"==typeof this.max&&t>this.max&&(t=this.max),this._value!==t&&(this._propertyNamesUsed&&(this._propertyNamesUsed.value=!0),this._value=t,this.needsDraw=!0)),this._numberFieldTextFieldComponent&&this._value!==this._numberFieldTextFieldComponent.value&&(this._numberFieldTextFieldComponent.value=this._value)}},enabled:{value:!0},_numberFieldTextFieldComponent:{value:null},_numberFieldMinusComponent:{value:null},_numberFieldPlusComponent:{value:null},_activeValueChange:{value:!1}})}});