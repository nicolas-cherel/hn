montageDefine("3d3086e","dom",{dependencies:["collections/listen/property-changes"],factory:function(e){function t(e){o.dispatchOwnPropertyChange(e.target,"checked",e.target.checked)}function n(e){o.dispatchOwnPropertyChange(e.target,"value",e.target.value)}function i(e){o.dispatchOwnPropertyChange(e.target,"innerHTML",e.target.innerHTML),o.dispatchOwnPropertyChange(e.target,"innerText",e.target.innerText),o.dispatchOwnPropertyChange(e.target,"value",e.target.innerText)}function r(e){"checked"===e?this.addEventListener("change",t):"value"===e&&(this.addEventListener("change",n),"text"===this.type||"TEXTAREA"===this.nodeName?this.addEventListener("keyup",n):this.contentEditable&&(this.innerText=this.innerText?this.innerText:this.value,this.addEventListener("keyup",i)))}function a(e){"checked"===e?this.removeEventListener("change",t):"value"===e&&(this.removeEventListener("change",n),"text"===this.type||"TEXTAREA"===this.nodeName?this.removeEventListener("keyup",n):this.contentEditable&&this.removeEventListener("keyup",i))}var o=e("collections/listen/property-changes"),s=Object.getPrototypeOf(document.createElement("input"));s.makePropertyObservable=r,s.makePropertyUnobservable=a;var l=Object.getPrototypeOf(document.createElement("textarea"));l.makePropertyObservable=r,l.makePropertyUnobservable=a;var c=Object.getPrototypeOf(document.createElement("span"));c.makePropertyObservable=r,c.makePropertyUnobservable=a}});