montageDefine("be51d2a","core/converter/currency-converter",{dependencies:["../core","./converter","./number-converter"],factory:function(t,e){t("../core").Montage,t("./converter"),t("./number-converter").numericValueToString;var n=t("./number-converter").NumberConverter;e.CurrencyConverter=n.specialize({currency:{value:"$"},decimals:{value:2},useParensForNegative:{value:!1},showCurrencyBeforeNumber:{value:!1},forceDecimals:{value:!0},convert:{value:function(t){var e=this.super(t);return 0>t&&this.useParensForNegative&&(e="("+e.substring(1,e.length)+")"),e=this.showCurrencyBeforeNumber?this.currency+" "+e:e+" "+this.currency}}})}});