montageDefine("4533bb1","tests/Events/02-template.json",{exports:{name:"Template script tags",options:{handler:{},parser:{}},html:'<p><script type="text/template"><h1>Heading1</h1></script></p>',expected:[{event:"opentagname",data:["p"]},{event:"opentag",data:["p",{}]},{event:"opentagname",data:["script"]},{event:"attribute",data:["type","text/template"]},{event:"opentag",data:["script",{type:"text/template"}]},{event:"text",data:["<h1>Heading1</h1>"]},{event:"closetag",data:["script"]},{event:"closetag",data:["p"]}]}});