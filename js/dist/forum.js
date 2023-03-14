/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t={648:(t,e,r)=>{var n=r(288).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",s=u.asyncIterator||"@@asyncIterator",l=u.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),u=new E(n||[]);return a(i,"_invoke",{value:k(t,r,u)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var d={};function v(){}function m(){}function y(){}var g={};f(g,c,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(P([])));w&&w!==r&&i.call(w,c)&&(g=w);var x=y.prototype=v.prototype=Object.create(g);function _(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,a,u,c){var s=h(t[o],t,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==n(f)&&i.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,u,c)}),(function(t){r("throw",t,u,c)})):e.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return r("throw",t,u,c)}))}c(s.arg)}var o;a(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function k(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=O(a,r);if(u){if(u===d)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function O(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function P(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:T}}function T(){return{value:void 0,done:!0}}return m.prototype=y,a(x,"constructor",{value:y,configurable:!0}),a(y,"constructor",{value:m,configurable:!0}),m.displayName=f(y,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===m||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,f(t,l,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},_(L.prototype),f(L.prototype,s,(function(){return this})),e.AsyncIterator=L,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new L(p(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},_(x),f(x,l,"Generator"),f(x,c,(function(){return this})),f(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=P,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],a=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),c=i.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:P(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},288:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},357:(t,e,r)=>{var n=r(648)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";function t(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function e(e){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=e.apply(r,n);function u(e){t(a,o,i,u,c,"next",e)}function c(e){t(a,o,i,u,c,"throw",e)}u(void 0)}))}}r.r(n);var o=r(357),i=r.n(o);function a(t,e){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},a(t,e)}const u=flarum.core.compat["common/Component"];var c=r.n(u);const s=flarum.core.compat["common/components/Button"];var l=r.n(s);const f=flarum.core.compat["common/components/Tooltip"];var p=r.n(f);const h=flarum.core.compat["forum/app"];var d=r.n(h),v=function(t){var e,r;function n(){for(var e,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))||this).loading=void 0,e}r=t,(e=n).prototype=Object.create(r.prototype),e.prototype.constructor=e,a(e,r);var o=n.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.loading=!1},o.oncreate=function(e){t.prototype.oncreate.call(this,e)},o.onClick=function(){var t=this;this.loading=!0,d().discussions.refresh().then((function(){t.loading=!1,d().discussionsUpdates=[],d().setTitleCount(0),m.redraw()}))},o.view=function(){var t=d().discussionsUpdates.length;if(t){var e=d().translator.trans("nearata-websocket.forum.discussions_tooltip_label");return m(p(),{text:e},m(l(),{class:"Button",onclick:this.onClick.bind(this),loading:this.loading,"aria-label":e},t))}},n}(c());const y=flarum.core.compat["common/extend"],g=flarum.core.compat["forum/components/DiscussionList"];var b=r.n(g);const w=flarum.core.compat["forum/components/IndexPage"];var x=r.n(w),_=["index","following"];function L(t){if(_.includes(d().current.get("routeName"))){var e=d().discussions.getParams();if(!(e.q||e.sort||e.filter)){var r=String(t.data.discussionId);if(-1===d().discussionsUpdates.indexOf(r)){if("following"===d().current.get("routeName")){var n=d().store.getById("discussions",r);if("follow"!==(null==n?void 0:n.attribute("subscription")))return}d().discussionsUpdates.push(r),d().setTitleCount(d().discussionsUpdates.length),m.redraw()}}}}var k=function(){function t(){this.main=void 0}var r=t.prototype;return r.init=function(){var t,r=d().forum.attribute("nearataWebsocketUrl"),n=new Centrifuge(r,{getToken:(t=e(i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=d().forum.attribute("apiUrl"),t.next=3,d().request({url:e+"/nearata/websocket/refreshMainToken",method:"POST"}).then((function(t){return t.token})).catch((function(){return""}));case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)}))),function(){return t.apply(this,arguments)})});n.connect(),this.main=n},r.getMain=function(){return this.main},r.subscribe=function(t,r){var n,o,a;void 0===r&&(r="/nearata/websocket/refreshChannelToken");var u,c=null==(n=this.main)?void 0:n.getSubscription(t);return c||(c=null==(o=this.main)?void 0:o.newSubscription(t,{getToken:(u=e(i().mark((function e(){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d().forum.attribute("apiUrl"),e.next=3,d().request({url:""+n+r,method:"POST",body:{channel:t}}).then((function(t){return t.token})).catch((function(){return""}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)}))),function(){return u.apply(this,arguments)})}),null==(a=c)||a.subscribe(),c)},r.unsubscribe=function(t){var e,r,n=null==(e=this.main)?void 0:e.getSubscription(t);n&&(n.unsubscribe(),n.removeAllListeners(),null==(r=this.main)||r.removeSubscription(n))},t}();d().initializers.add("nearata-websocket",(function(){d().websocket=e(i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,import("//cdnjs.cloudflare.com/ajax/libs/centrifuge/3.1.0/centrifuge.min.js");case 2:return(e=new k).init(),t.abrupt("return",e);case 5:case"end":return t.stop()}}),t)})))(),d().discussionsUpdates=[],(0,y.extend)(x().prototype,"actionItems",(function(t){_.includes(d().current.get("routeName"))&&t.setContent("refresh",v.component())})),(0,y.extend)(b().prototype,"oninit",(function(){this.listener1=function(t){var e;t.channel==="flarum:#"+(null==(e=d().session.user)?void 0:e.id())&&"discussions"===t.data.type&&L(t)}})),(0,y.extend)(b().prototype,"oncreate",(function(){var t=this;d().discussionsUpdates=[],d().websocket.then((function(e){var r,n;null==(r=e.getMain())||r.on("publication",t.listener1),null==(n=e.subscribe("flarum:discussions"))||n.on("publication",L.bind(t))}))})),(0,y.extend)(b().prototype,"onremove",(function(){var t=this;d().websocket.then((function(e){var r;null==(r=e.getMain())||r.removeListener("publication",t.listener1),e.unsubscribe("flarum:discussions")}))})),d().websocket.then((function(t){var e;null==(e=t.getMain())||e.on("publication",(function(t){var e,r,n,o;t.channel==="flarum:#"+(null==(e=d().session.user)?void 0:e.id())&&"notifications"===t.data.type&&(null==(r=d().session.user)||r.pushAttributes({unreadNotificationCount:(null!=(n=d().session.user.unreadNotificationCount())?n:0)+1,newNotificationCount:(null!=(o=d().session.user.newNotificationCount())?o:0)+1}),d().notifications.clear(),m.redraw())}))}))}))})(),module.exports=n})();
//# sourceMappingURL=forum.js.map