montageDefine("be51d2a","core/serialization/serializer/montage-builder",{dependencies:["../../core","mousse/serialization/builder","./montage-ast"],factory:function(t,e){var n=t("../../core").Montage,i=t("mousse/serialization/builder").Builder,r=t("./montage-ast"),a=n.specialize.call(i,{constructor:{value:function a(){i.call(this)}},createElementReference:{value:function(t){return(new r.ElementReference).initWithRootAndId(this._root,t)}},createModuleReference:{value:function(t){return(new r.ModuleReference).initWithRootAndModuleId(this._root,t)}}});e.MontageBuilder=a}});