montageDefine("be51d2a","core/enum",{dependencies:["./core","./logger"],factory:function(t,e){var n=t("./core").Montage,i=t("./logger").logger("enum");e.Enum=n.specialize({_value:{value:0},constructor:{value:function(){this.super()}},init:{value:function(){return Object.isSealed(this)&&i.error(this,"Object is sealed"),this}},initWithMembers:{value:function(){if(Object.isSealed(this))return i.error(this,"Object is sealed"),this;var t,e;for(e=0;(t=arguments[e])!==void 0;e++)null!==t?this.addMember(t):i.error(this,"Member at index "+e+" is null");return Object.seal(this)}},addMember:{value:function(t){this[t]===void 0&&(Object.defineProperty(this,t,{writable:!1,configurable:!1,enumerable:!0,value:this._value}),this._value++)}},seal:{value:function(){return Object.isSealed(this)?void 0:Object.seal(this)}}})}});