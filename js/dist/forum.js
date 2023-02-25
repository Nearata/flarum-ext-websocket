/*! For license information please see forum.js.LICENSE.txt */
(()=>{var t={648:(t,e,r)=>{var n=r(288).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},r=Object.prototype,i=r.hasOwnProperty,a=Object.defineProperty||function(t,e,r){t[e]=r.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",s=u.asyncIterator||"@@asyncIterator",f=u.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function p(t,e,r,n){var o=e&&e.prototype instanceof v?e:v,i=Object.create(o.prototype),u=new S(n||[]);return a(i,"_invoke",{value:k(t,r,u)}),i}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=p;var d={};function v(){}function y(){}function m(){}var g={};l(g,c,(function(){return this}));var b=Object.getPrototypeOf,w=b&&b(b(T([])));w&&w!==r&&i.call(w,c)&&(g=w);var x=m.prototype=v.prototype=Object.create(g);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,a,u,c){var s=h(t[o],t,a);if("throw"!==s.type){var f=s.arg,l=f.value;return l&&"object"==n(l)&&i.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,u,c)}),(function(t){r("throw",t,u,c)})):e.resolve(l).then((function(t){f.value=t,u(f)}),(function(t){return r("throw",t,u,c)}))}c(s.arg)}var o;a(this,"_invoke",{value:function(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}})}function k(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=j(a,r);if(u){if(u===d)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function j(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,j(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),d;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function T(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:P}}function P(){return{value:void 0,done:!0}}return y.prototype=m,a(x,"constructor",{value:m,configurable:!0}),a(m,"constructor",{value:y,configurable:!0}),y.displayName=l(m,f,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,f,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},L(_.prototype),l(_.prototype,s,(function(){return this})),e.AsyncIterator=_,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new _(p(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(x),l(x,f,"Generator"),l(x,c,(function(){return this})),l(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=T,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],a=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var u=i.call(o,"catchLoc"),c=i.call(o,"finallyLoc");if(u&&c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),d}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},288:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},357:(t,e,r)=>{var n=r(648)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};(()=>{"use strict";function t(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void r(t)}u.done?e(c):Promise.resolve(c).then(n,o)}function e(e){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=e.apply(r,n);function u(e){t(a,o,i,u,c,"next",e)}function c(e){t(a,o,i,u,c,"throw",e)}u(void 0)}))}}r.r(n);var o=r(357),i=r.n(o);const a=flarum.core.compat["common/components/Button"];var u=r.n(a);const c=flarum.core.compat["common/extend"],s=flarum.core.compat["forum/app"];var f=r.n(s);const l=flarum.core.compat["forum/components/DiscussionList"];var p=r.n(l);const h=flarum.core.compat["forum/components/IndexPage"];var d=r.n(h);f().initializers.add("nearata-websocket",(function(){var t=function(){var t=e(i().mark((function t(e){return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",f().request({url:f().forum.attribute("apiUrl")+"/nearata/websocket/refreshChannelToken",method:"POST",body:{channel:e}}).then((function(t){return t.token})).catch((function(){return""})));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();f().centrifuge=import("//cdnjs.cloudflare.com/ajax/libs/centrifuge/3.1.0/centrifuge.min.js").then((function(){var r,n=f().forum.attribute("nearataWebsocketUrl"),o=new Centrifuge(n,{getToken:(r=e(i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=f().request({url:f().forum.attribute("apiUrl")+"/nearata/websocket/refreshMainToken",method:"POST"}).then((function(t){return t.token})).catch((function(){return""})),t.next=3,e;case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)}))),function(){return r.apply(this,arguments)})});o.connect();var a,u=o.newSubscription("flarum:discussions",{getToken:(a=e(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("discussions");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(){return a.apply(this,arguments)})});u.subscribe();var c,s=o.newSubscription("flarum:notifications",{getToken:(c=e(i().mark((function e(){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t("notifications");case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),function(){return c.apply(this,arguments)})});return s.subscribe(),{main:o,discussions:u,notifications:s}})),f().centrifuge.then((function(t){t.notifications.on("publication",(function(){var t,e,r;null==(t=f().session.user)||t.pushAttributes({unreadNotificationCount:null!=(e=f().session.user.unreadNotificationCount())?e:1,newNotificationCount:null!=(r=f().session.user.newNotificationCount())?r:1}),f().notifications.clear(),m.redraw()}))})),f().pushedUpdates=[],(0,c.extend)(p().prototype,"view",(function(t){var e=this;if(f().pushedUpdates){var r=f().pushedUpdates.length;r&&"object"==typeof t&&t&&"children"in t&&t.children instanceof Array&&t.children.unshift(u().component({className:"Button Button--block DiscussionList-update",onclick:function(){e.attrs.state.refresh().then((function(){e.loadingUpdated=!1,f().pushedUpdates=[],f().setTitleCount(0),m.redraw()})),e.loadingUpdated=!0},loading:this.loadingUpdated},f().translator.trans("nearata-websocket.forum.show_updates_text",{count:r})))}})),(0,c.extend)(p().prototype,"oncreate",(function(){f().centrifuge.then((function(t){t.discussions.on("publication",(function(t){var e=t.data,r=f().discussions.getParams();if(!r.q&&!r.sort&&!r.filter){var n=String(e.discussionId);f().current.get("discussion")&&n===f().current.get("discussion").id()||-1!==f().pushedUpdates.indexOf(n)||(f().pushedUpdates.push(n),f().current.matches(d())&&f().setTitleCount(f().pushedUpdates.length),m.redraw())}}))}))})),(0,c.extend)(d().prototype,"actionItems",(function(t){t.remove("refresh")}))}))})(),module.exports=n})();
//# sourceMappingURL=forum.js.map