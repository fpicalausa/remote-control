(window.webpackJsonpremote=window.webpackJsonpremote||[]).push([[0],{0:function(e,t){e.exports=PropTypes},1:function(e,t){e.exports=React},12:function(e,t){e.exports=ReactDOM},229:function(e,t,a){e.exports=a(471)},230:function(e,t,a){},232:function(e,t,a){},233:function(e,t,a){},234:function(e,t,a){},235:function(e,t,a){},280:function(e,t){e.exports=ObjectAssign},291:function(e,t,a){},292:function(e,t,a){},47:function(e,t){e.exports=reactLifecyclesCompat},471:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(12),o=a.n(c),u=(a(230),a(187)),i=a(19),s=a.n(i),l=a(51),m=a(25),p=(a(232),a(233),function(e){var t=e.label,a=e.value,n=e.unit;return r.a.createElement("div",{className:"Indicator"},r.a.createElement("span",{className:"Label"},t),r.a.createElement("span",{className:"Value"},r.a.createElement("span",null,a),r.a.createElement("span",{className:"Unit"},n)))});a(234),a(235);function f(e){var t=e.children,a=e.className;return n.createElement("div",{className:"Toggle ".concat(a||"")},t)}f.Button=function(e){var t=e.id,a=e.value,r=e.children,c=e.onChange,o=e.checked;return n.createElement(n.Fragment,null,n.createElement("input",{type:"radio",value:a,checked:o||!1,onChange:function(e){e.target.checked&&c(a)},id:t,className:"Toggle-Option-Radio"}),n.createElement("label",{htmlFor:t,className:"Toggle-Option"},r))};var d=a(203),h=(a(290),function(e){var t=e.onPowerChange,a=e.onModeChange,c=e.onFanSpeedChange,o=e.onTemperatureChange,u=e.state,i=u.power,s=u.mode,l=u.fan_speed,p=u.temperature,h="heater"===s?20:22,y=Object(n.useState)(p),v=Object(m.a)(y,2),g=v[0],E=v[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(f,{className:"Option-row"},r.a.createElement(f.Button,{id:"pwr-on",value:!0,checked:i,onChange:t},"On"),r.a.createElement(f.Button,{id:"pwr-off",value:!1,checked:!i,onChange:t},"Off")),r.a.createElement(f,{className:"Option-row"},r.a.createElement(f.Button,{id:"mode-auto",value:"auto",checked:"auto"===s,onChange:a},"Auto"),r.a.createElement(f.Button,{id:"mode-cooler",value:"cooler",checked:"cooler"===s,onChange:a},r.a.createElement("i",{className:"far fa-snowflake"})),r.a.createElement(f.Button,{id:"mode-heater",value:"heater",checked:"heater"===s,onChange:a},r.a.createElement("i",{className:"fas fa-sun"})),r.a.createElement(f.Button,{id:"mode-dry",value:"dry",checked:"dry"===s,onChange:a},"Dry"),r.a.createElement(f.Button,{id:"mode-fan",value:"fan",checked:"fan"===s,onChange:a},r.a.createElement("i",{className:"fas fa-fan small"}))),r.a.createElement(f,{className:"Option-row"},r.a.createElement(f.Button,{id:"speed-auto",value:"auto",checked:"auto"===l,onChange:c},"Auto"),r.a.createElement(f.Button,{id:"speed-high",value:"high",checked:"high"===l,onChange:c},r.a.createElement("i",{className:"fas fa-fan"})),r.a.createElement(f.Button,{id:"speed-low",value:"low",checked:"low"===l,onChange:c},r.a.createElement("i",{className:"fas fa-fan small"})),r.a.createElement(f.Button,{id:"speed-quiet",value:"quiet",checked:"quiet"===l,onChange:c},r.a.createElement("i",{className:"fas fa-volume-mute"})),r.a.createElement(f.Button,{id:"speed-natural",value:"natural",checked:"natural"===l,onChange:c},r.a.createElement("i",{className:"fas fa-tree"}))),r.a.createElement("div",{className:"Option-row Option-row_slider"},r.a.createElement(d.a,{min:h,max:30,value:g,onChange:E,onAfterChange:o,trackStyle:{backgroundColor:"transparent",height:6},railStyle:{backgroundColor:"#106d82",height:6},handleStyle:{border:"1px solid #106d82",height:20,width:20,marginLeft:0,marginTop:-7,backgroundColor:"white"}}),r.a.createElement("div",{className:"Target-temperature"},g,"\xb0C")))}),y=a(191),v=a(192),g=function(){function e(){Object(y.a)(this,e),this.url_base="/api/"}return Object(v.a)(e,[{key:"_post",value:function(e,t){var a=this.url_base+e,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"}};t&&(n.body=JSON.stringify(t)),fetch(a,n)}},{key:"off",value:function(){this._post("off")}},{key:"on",value:function(){this._post("on")}},{key:"mode",value:function(e){this._post("mode",{mode:e})}},{key:"fan",value:function(e){this._post("fan",{speed:e})}},{key:"temperature",value:function(e){this._post("temperature",{temperature:e})}},{key:"history",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.url_base+"sensor");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"sensor",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.url_base+"sensor");case 2:return t=e.sent,e.next=5,t.json();case 5:if(0!==(a=e.sent).length){e.next=8;break}return e.abrupt("return",null);case 8:return e.abrupt("return",a[0]);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"state",value:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",E);case 3:return t=e.sent,e.next=6,t.json();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}(),E={mode:"auto",power:!1,fan_speed:"auto",temperature:25},b=(a(291),function(e){var t=e.children,a=Object(n.useState)(!1),c=Object(m.a)(a,2),o=c[0],u=c[1];return r.a.createElement("div",{className:"Drawer"},r.a.createElement("div",{className:"Drawer-Content "+(o?"Open":"")},t),r.a.createElement("button",{className:"Drawer-Button",onClick:function(){return u(!o)}},o?r.a.createElement("i",{className:"fa fa-chevron-up"}):r.a.createElement("i",{className:"fa fa-chevron-down"})))}),O=a(66),k=(a(292),a(193)),w=a.n(k),j=a(26),C=function(e){var t=e.x,a=e.y,n=(e.stroke,e.payload);return r.a.createElement("g",{transform:"translate(".concat(t,",").concat(a,")")},r.a.createElement("text",{x:0,y:-8,dy:16,textAnchor:"end",fill:"#666",transform:"rotate(-45)"},w()(1e3*n.value).local().format("DD-MM HH:mm")))},N=function(e){var t=e.history,a=Math.min.apply(Math,Object(O.a)(t.map((function(e){return e.temperature})))),n=Math.max.apply(Math,Object(O.a)(t.map((function(e){return e.temperature})))),c=Math.min.apply(Math,Object(O.a)(t.map((function(e){return e.humidity})))),o=Math.max.apply(Math,Object(O.a)(t.map((function(e){return e.humidity}))));return r.a.createElement(j.d,{className:"Chart"},r.a.createElement(j.c,{data:t.sort((function(e,t){return e.timestamp-t.timestamp})),margin:{top:60,left:10,right:10}},r.a.createElement(j.a,{strokeDasharray:"10 10",strokeOpacity:"0.2"}),r.a.createElement(j.e,{dataKey:"timestamp",minTickGap:0,tickCount:5,tick:C,height:100}),r.a.createElement(j.f,{yAxisId:"temperature",domain:[a-2,n+2],label:{value:"Temperature",angle:-90,position:"insideLeft",fill:"#cf2d2d",style:{textAnchor:"middle"}}}),r.a.createElement(j.f,{yAxisId:"humidity",orientation:"right",domain:[c-2,o+2],label:{value:"Humidity",angle:90,position:"insideRight",fill:"#7a7391",style:{textAnchor:"middle"}}}),r.a.createElement(j.b,{yAxisId:"temperature",type:"monotone",dataKey:"temperature",strokeWidth:2,stroke:"#cf2d2d",isAnimationActive:!1,dot:!1}),r.a.createElement(j.b,{yAxisId:"humidity",type:"monotone",dataKey:"humidity",strokeWidth:2,stroke:"#7a7391",dot:!1,isAnimationActive:!1})))};function x(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function A(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?x(a,!0).forEach((function(t){Object(u.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):x(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var B=new g,S=function(){var e=Object(n.useState)(E),t=Object(m.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!0),u=Object(m.a)(o,2),i=u[0],f=u[1],d=Object(n.useState)(null),y=Object(m.a)(d,2),v=y[0],g=y[1],O=Object(n.useState)([]),k=Object(m.a)(O,2),w=k[0],j=k[1];return Object(n.useEffect)((function(){function e(){return(e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,B.history();case 2:t=e.sent,j(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),Object(n.useEffect)((function(){B.state().then((function(e){c(e),B.sensor().then((function(e){g(e)})),f(!1)}))}),[]),i?r.a.createElement("div",null,"Please wait"):r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("div",{className:"Indicators"},r.a.createElement(p,{label:"Temperature",value:v?v.temperature:"N/A",unit:"\xb0C"}),r.a.createElement(p,{label:"Humidity",value:v?v.humidity:"N/A",unit:"%"}))),r.a.createElement("main",{className:"App-main"},r.a.createElement(b,null,0===w.length?"Collecting data...":r.a.createElement(N,{history:w})),r.a.createElement(h,{onPowerChange:function(e){e?B.on():B.off(),c((function(t){return A({},t,{power:e})}))},onModeChange:function(e){B.mode(e),c((function(t){return A({},t,{mode:e})}))},onFanSpeedChange:function(e){B.fan(e),c((function(t){return A({},t,{fan_speed:e})}))},onTemperatureChange:function(e){B.temperature(e),c((function(t){return A({},t,{temperature:e})}))},state:a})))};o.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[229,1,2]]]);
//# sourceMappingURL=main.922a55be.chunk.js.map