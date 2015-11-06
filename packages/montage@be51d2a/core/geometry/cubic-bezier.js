var Montage=require("../core").Montage,Point=require("./point").Point,CubicBezier=exports.CubicBezier=Montage.specialize({init:{enumerable:!1,value:function(t){return null!==t&&(2===t.length?(this.p1=t[0],this.p2=t[1]):4===t.length&&(this.p0=t[0],this.p1=t[1],this.p2=t[2],this.p3=t[3])),this}},position:{enumerable:!1,value:function(t){if(!(0>t||t>1)){t=1-t;var e=t*t*t,n=3*t*t*(1-t),i=3*t*(1-t)*(1-t),r=(1-t)*(1-t)*(1-t);return(new Point).init(this.p0.x*e+this.p1.x*n+this.p2.x*i+this.p3.x*r,this.p0.y*e+this.p1.y*n+this.p2.y*i+this.p3.y*r)}}},split:{enumerable:!1,value:function(t){return this.makeScaffolding(t),CubicBezier.create(CubicBezier).init([this.p0,this.p01,this.p012,this.p0123])}},splitToTimingFunction:{enumerable:!1,value:function(t){this.makeScaffolding(t);var e=this.p0123.x,n=this.p0123.y;return CubicBezier.create(CubicBezier).init([(new Point).init(this.p01.x/e,this.p01.y/n),(new Point).init(this.p012.x/e,this.p012.y/n)])}},makeScaffolding:{enumerable:!1,value:function(t){t=1-t;var e=1e6;Montage.defineProperty(this,"p01",{value:Point.interpolate(t,this.p0,this.p1,e)}),Montage.defineProperty(this,"p12",{value:Point.interpolate(t,this.p1,this.p2,e)}),Montage.defineProperty(this,"p23",{value:Point.interpolate(t,this.p2,this.p3,e)}),Montage.defineProperty(this,"p012",{value:Point.interpolate(t,this.p01,this.p12,e)}),Montage.defineProperty(this,"p123",{value:Point.interpolate(t,this.p12,this.p23,e)}),Montage.defineProperty(this,"p0123",{value:Point.interpolate(t,this.p012,this.p123,e)})}},p0:{enumerable:!0,value:(new Point).init(0,0)},p1:{enumerable:!0,value:(new Point).init(0,0)},p2:{enumerable:!0,value:(new Point).init(1,1)},p3:{enumerable:!0,value:(new Point).init(1,1)}});