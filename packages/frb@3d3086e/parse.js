function parse(e,t){if(Array.isArray(e))return{type:"tuple",args:e.map(function(e){return parse(e,t)})};if(!t&&Object.prototype.hasOwnProperty.call(memo,e))return memo[e];try{var n=grammar.parse(e,t||Object.empty);return t||(memo[e]=n),n}catch(i){throw i.message=i.message.replace(/[\s\.]+$/,"")+" "+" on line "+i.line+" column "+i.column,i}}require("collections/shim");var grammar=require("./grammar"),memo={};module.exports=parse;