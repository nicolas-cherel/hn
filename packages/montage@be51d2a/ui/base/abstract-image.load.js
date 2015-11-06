montageDefine("be51d2a","ui/base/abstract-image",{dependencies:["../../core/core","../component","../../core/mini-url"],factory:function(t,e){var n=(t("../../core/core").Montage,t("../component").Component),i=t("../../core/mini-url"),r=e.AbstractImage=n.specialize({constructor:{value:function r(){if(this.constructor===r)throw Error("AbstractImage cannot be instantiated.");n.constructor.call(this),this._image=new Image,this._image.onload=this.handleImageLoad.bind(this),this.addPathChangeListener("_ownerDocumentPart",this,"_rebaseSrc")}},emptyImageSrc:{value:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},_isLoadingImage:{value:!1},_image:{value:null},_src:{value:null},src:{set:function(t){this._src!==t&&(this._src=t,t=this._getRebasedSrc(),t?(this._isInvalidSrc=!1,this._loadImage(t)):this._isInvalidSrc=!0,this.needsDraw=!0)},get:function(){return this._src}},_loadImage:{value:function(t){this._image.src=t,this._isLoadingImage=!this._image.complete}},_isInvalidSrc:{value:!0},width:{value:null},height:{value:null},_textAlternative:{value:null},textAlternative:{set:function(t){this._textAlternative=t,this.needsDraw=!0},get:function(){return this._textAlternative}},_crossOrigin:{value:null},crossOrigin:{set:function(t){t!==this._crossOrigin&&(this._crossOrigin=t,this.needsDraw=!0)},get:function(){return this._crossOrigin}},_rebaseSrc:{value:function(){var t;t=this._getRebasedSrc(),t&&(this._isInvalidSrc=!1,this._loadImage(t),this.needsDraw=!0)}},_getRebasedSrc:{value:function(){var t,e=this._src,n=/^[\w\-]+:|^\//;if(e){if(n.test(e))return e;if(this._ownerDocumentPart&&(t=this._ownerDocumentPart.template.getBaseUrl()))return i.resolve(t,e)}return null}},enterDocument:{value:function(t){t&&this.element.setAttribute("role","img")}},draw:{value:function(){var t;t=this._isLoadingImage||this._isInvalidSrc?this.emptyImageSrc:this._getRebasedSrc(),null==this._crossOrigin||"data:"===t.slice(0,5)?this.element.removeAttribute("crossorigin"):this.element.setAttribute("crossorigin",this._crossOrigin),this.element.src=t,this.element.setAttribute("aria-label",this._textAlternative)}},handleImageLoad:{value:function(){this._isLoadingImage=!1,this.needsDraw=!0}}})}});