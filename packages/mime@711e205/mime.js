function Mime(){this.types=Object.create(null),this.extensions=Object.create(null)}var path=require("path"),fs=require("fs");Mime.prototype.define=function(e){for(var t in e){for(var n=e[t],r=0;n.length>r;r++)process.env.DEBUG_MIME&&this.types[n]&&console.warn(this._loading.replace(/.*\//,""),'changes "'+n[r]+'" extension type from '+this.types[n]+" to "+t),this.types[n[r]]=t;this.extensions[t]||(this.extensions[t]=n[0])}},Mime.prototype.load=function(e){this._loading=e;var t={},n=fs.readFileSync(e,"ascii"),r=n.split(/[\r\n]+/);r.forEach(function(e){var n=e.replace(/\s*#.*|^\s*|\s*$/g,"").split(/\s+/);t[n.shift()]=n}),this.define(t),this._loading=null},Mime.prototype.lookup=function(e,t){var n=e.replace(/.*[\.\/\\]/,"").toLowerCase();return this.types[n]||t||this.default_type},Mime.prototype.extension=function(e){var t=e.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();return this.extensions[t]};var mime=new Mime;mime.define(require("./types.json")),mime.default_type=mime.lookup("bin"),mime.Mime=Mime,mime.charsets={lookup:function(e,t){return/^text\//.test(e)?"UTF-8":t}},module.exports=mime;