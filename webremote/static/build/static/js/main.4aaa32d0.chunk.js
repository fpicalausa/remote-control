(window.webpackJsonpremote=window.webpackJsonpremote||[]).push([[0],[,,,,,,,,,function(e,t,n){e.exports=n(20)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(3),c=n.n(o),i=(n(14),n(4)),l=n(8),u=(n(15),n(16),function(e){var t=e.label,n=e.value,a=e.unit;return r.a.createElement("div",{className:"Indicator"},r.a.createElement("span",{className:"Label"},t),r.a.createElement("span",{className:"Value"},r.a.createElement("span",null,n),r.a.createElement("span",{className:"Unit"},a)))});n(17),n(18);function s(e){var t=e.children,n=e.className;return a.createElement("div",{className:"Toggle ".concat(n||"")},t)}s.Button=function(e){var t=e.id,n=e.value,r=e.children,o=e.onChange,c=e.checked;return a.createElement(a.Fragment,null,a.createElement("input",{type:"radio",value:n,checked:c||!1,onChange:function(e){e.target.checked&&o(n)},id:t,className:"Toggle-Option-Radio"}),a.createElement("label",{htmlFor:t,className:"Toggle-Option"},r))};var m="power",p="mode",f=function(e){var t=e.onChange,n=e.state,a=n.power,o=n.mode;function c(e){t({action:m,payload:e})}function i(e){t({action:p,payload:e})}return r.a.createElement(r.a.Fragment,null,r.a.createElement(s,{className:"Option-row"},r.a.createElement(s.Button,{id:"pwr-on",value:!0,checked:a,onChange:c},"On"),r.a.createElement(s.Button,{id:"pwr-off",value:!1,checked:!a,onChange:c},"Off")),r.a.createElement(s,{className:"Option-row"},r.a.createElement(s.Button,{id:"mode-auto",value:"auto",checked:"auto"===o,onChange:i},"Auto"),r.a.createElement(s.Button,{id:"mode-cooler",value:"cooler",checked:"cooler"===o,onChange:i},r.a.createElement("i",{className:"far fa-snowflake"})),r.a.createElement(s.Button,{id:"mode-heater",value:"heater",checked:"heater"===o,onChange:i},r.a.createElement("i",{className:"fas fa-sun"}))))},d=n(1),h=n.n(d),v=n(5),w=n(6),g=n(7);function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(n,!0).forEach((function(t){Object(i.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=new(function(){function e(){Object(w.a)(this,e),this.url_base="/api/"}return Object(g.a)(e,[{key:"_post",value:function(e){var t=this.url_base+e;fetch(t,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=UTF-8"}})}},{key:"off",value:function(){this._post("off")}},{key:"on",value:function(){this._post("on")}},{key:"state",value:function(){var e=Object(v.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(this.url_base+"state");case 2:return t=e.sent,e.next=5,t.json();case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),e}()),y=function(){var e=Object(a.useState)({loading:!0,remote:{power:!1,mode:"cooler"},current:{temperature:29,humidity:51}}),t=Object(l.a)(e,2),n=t[0],o=t[1],c=n.loading,i=n.remote,s=n.current;if(Object(a.useEffect)((function(){O.state().then((function(e){return o((function(t){return E({},t,{remote:e,loading:!1})}))}))}),[]),c)return r.a.createElement("div",null,"Please wait");return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(u,{label:"Temperature",value:s.temperature,unit:"\xb0C"}),r.a.createElement(u,{label:"Humidity",value:s.humidity,unit:"%"})),r.a.createElement("main",{className:"App-main"},r.a.createElement(f,{onChange:function(e){var t=e.action,a=e.payload;switch(t){case m:a?O.on():O.off(),o(E({},n,{remote:{mode:i.mode,power:a}}));break;case p:o(E({},n,{remote:{mode:a,power:i.power}}))}},state:i})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[9,1,2]]]);
//# sourceMappingURL=main.4aaa32d0.chunk.js.map