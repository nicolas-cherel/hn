montageDefine("29e7e90","tests/01-basic.json",{exports:{name:"Basic test",options:{handler:{},parser:{}},html:"<!DOCTYPE html><html><title>The Title</title><body>Hello world</body></html>",expected:[{name:"!DOCTYPE",data:"!DOCTYPE html",type:"directive"},{type:"tag",name:"html",attribs:{},children:[{type:"tag",name:"title",attribs:{},children:[{data:"The Title",type:"text"}]},{type:"tag",name:"body",attribs:{},children:[{data:"Hello world",type:"text"}]}]}]}});