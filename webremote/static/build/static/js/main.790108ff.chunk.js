(window.webpackJsonpremote=window.webpackJsonpremote||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(4),c=a.n(r),u=(a(14),a(5)),l=a(1),i=(a(15),a(16),function(e){var t=e.label,a=e.value,n=e.unit;return o.a.createElement("div",{className:"Indicator"},o.a.createElement("span",{className:"Label"},t),o.a.createElement("span",{className:"Value"},o.a.createElement("span",null,a),o.a.createElement("span",{className:"Unit"},n)))});a(17),a(18);function s(e){var t=e.children,a=e.className;return n.createElement("div",{className:"Toggle ".concat(a||"")},t)}s.Button=function(e){var t=e.id,a=e.value,o=e.children,r=e.onChange,c=e.checked;return n.createElement(n.Fragment,null,n.createElement("input",{type:"radio",value:a,checked:c||!1,onChange:function(e){e.target.checked&&r(a)},id:t,className:"Toggle-Option-Radio"}),n.createElement("label",{htmlFor:t,className:"Toggle-Option"},o))};var m=function(e){var t=e.onPowerChange,a=e.onModeChange,n=e.onFanSpeedChange,r=e.state,c=r.power,u=r.mode,l=r.fan_speed,i=r.temperature;return o.a.createElement(o.a.Fragment,null,o.a.createElement(s,{className:"Option-row"},o.a.createElement(s.Button,{id:"pwr-on",value:!0,checked:c,onChange:t},"On"),o.a.createElement(s.Button,{id:"pwr-off",value:!1,checked:!c,onChange:t},"Off")),o.a.createElement(s,{className:"Option-row"},o.a.createElement(s.Button,{id:"mode-auto",value:"auto",checked:"auto"===u,onChange:a},"Auto"),o.a.createElement(s.Button,{id:"mode-cooler",value:"cooler",checked:"cooler"===u,onChange:a},o.a.createElement("i",{className:"far fa-snowflake"})),o.a.createElement(s.Button,{id:"mode-heater",value:"heater",checked:"heater"===u,onChange:a},o.a.createElement("i",{className:"fas fa-sun"}))),o.a.createElement(s,{className:"Option-row"},o.a.createElement(s.Button,{id:"speed-auto",value:"auto",checked:"auto"===l,onChange:n},"Auto"),o.a.createElement(s.Button,{id:"speed-high",value:"high",checked:"high"===l,onChange:n},o.a.createElement("i",{className:"fas fa-fan"})),o.a.createElement(s.Button,{id:"speed-low",value:"low",checked:"low"===l,onChange:n},o.a.createElement("i",{className:"fas fa-fan small"}))),o.a.createElement("div",{className:"Option-row"},o.a.createElement("input",{type:"Number",min:22,max:30,value:i})))},f=a(2),p=a.n(f),d=a(6),h=a(7),v=a(8),g={mode:"auto",power:!1,fan_speed:"auto",temperature:25};function E(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?E(a,!0).forEach((function(t){Object(u.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):E(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var b=new(function(){function e(){Object(h.a)(this,e),this.url_base="/api/"}return Object(v.a)(e,[{key:"_post",value:function(e,t){var a=this.url_base+e,n={method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"}};t&&(n.body=JSON.stringify(t)),fetch(a,n)}},{key:"off",value:function(){this._post("off")}},{key:"on",value:function(){this._post("on")}},{key:"mode",value:function(e){this._post("mode",{mode:e})}},{key:"fan",value:function(e){this._post("fan",{speed:e})}},{key:"state",value:function(){var e=Object(d.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.url_base+"state");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}()),O=function(){var e=Object(n.useState)(g),t=Object(l.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!0),u=Object(l.a)(c,2),s=u[0],f=u[1],p=Object(n.useState)({temperature:29,humidity:51}),d=Object(l.a)(p,1)[0];return Object(n.useEffect)((function(){b.state().then((function(e){r(e),f(!1)}))}),[]),s?o.a.createElement("div",null,"Please wait"):o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement(i,{label:"Temperature",value:d.temperature,unit:"\xb0C"}),o.a.createElement(i,{label:"Humidity",value:d.humidity,unit:"%"})),o.a.createElement("main",{className:"App-main"},o.a.createElement(m,{onPowerChange:function(e){e?b.on():b.off(),r((function(t){return w({},t,{power:e})}))},onModeChange:function(e){b.mode(e),r((function(t){return w({},t,{mode:e})}))},onFanSpeedChange:function(e){b.fan(e),r((function(t){return w({},t,{fan_speed:e})}))},state:a})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.790108ff.chunk.js.map