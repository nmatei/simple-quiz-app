!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r=function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o="data/answers.json";function a(e){return(location.search.split(e+"=")[1]||"").split("&")[0]}var i=function(e){return e=[].concat(e),Promise.all(e.map((function(e){return new Promise((function(t){var n=document.createElement("script");n.type="text/javascript",n.src=e,n.async=!1,n.onload=function(){t()},document.getElementsByTagName("head")[0].appendChild(n)}))})))};function u(e,t,n,r){void 0===r&&(r=!0);var o=t.filter((function(e){return(!n||e.level===n)&&(!r||(e.answers&&e.answers.length||"number"===e.answerType))}));return e.shuffle&&o.shuffle(),o=o.sort((function(e,t){return e.level-t.level})).slice(0,e.displayLimit)}function c(e){document.querySelector(e).style.display="none"}function s(){var e={js:"ace/mode/javascript",html:"ace/mode/html"};Array.from(document.querySelectorAll("article .code")).forEach((function(t){var n=t.getAttribute("data-type"),r="true"===t.getAttribute("data-readOnly"),o="true"===t.getAttribute("data-copy"),a=ace.edit(t),i=ace.require("ace/ext/beautify"),u=a.getSession();a.setReadOnly(r),o||u.selection.on("changeSelection",(function(){u.selection.clearSelection()})),a.setTheme("ace/theme/monokai"),u.setMode(e[n]),i.beautify(u),a.setOptions({maxLines:1/0})}))}function l(e){var t=new Date,n=t.getMonth()+t.getDate(),r=Math.floor((new Date).getTime()/6e4),o=function(e){return window.ALL_QUESTIONS.map((function(t,n){return e.some((function(e){return e===t.id}))?n:-1})).filter((function(e){return e>=0}))}(e);return o.shuffle(),function(e){var t,n,r,o="";for(t=0,n=(e+="").length;t<n;t++)o+=(r=e.charCodeAt(t).toString(16)).length<2?"0"+r:r;return o}(o.map((function(e){return e+n})).join("-")+"."+r)}function f(e){if(!(e=e||a("test")))return null;var t=new Date,n=t.getMonth()+t.getDate(),r=Math.floor((new Date).getTime()/6e4),o=(function(e){var t,n=[],r=0;for(t=(e+="").length;r<t;r+=2){var o=parseInt(e.substr(r,1),16),a=parseInt(e.substr(r+1,1),16);if(isNaN(o)||isNaN(a))return!1;n.push(o<<4|a)}return String.fromCharCode.apply(String,n)}(e)||"."+r).split("."),i=o[0].split("-"),u=parseInt(o[1]);return r-u>3?(console.error("Link Expired",r-u),alert("Link Expired"),[1,2]):i.map((function(e){return parseInt(e)-n})).sort((function(e,t){return e-t}))}var d,p,h,v,m,y=function(e,t,n){var r=document.createElement("div");return r.classList.add("level-selector"),e&&e.length&&(r.innerHTML='\n      <label>\n        Nivel\n        <select name="levelSelector">\n          '+e.map((function(e){return'<option value="'+e.value+'" '+(e.value===t?'selected="selected"':"")+">"+e.text+"</option>"})).join("")+"\n        </select>\n      </label>\n    ",r.querySelector("select").addEventListener("change",n)),r},b=(p={"&amp;":"&","&gt;":">","&lt;":"<","&quot;":'"',"&#39;":"'"},h={},v=function(){var e=[];for(var t in p){var n=p[t];h[n]=t,e.push(n)}return new RegExp("("+e.join("|")+")","g")}(),m=function(e,t){return h[t]},{reset:function(e){Array.from(document.querySelectorAll("#questions article")).forEach((function(e){e.parentNode.removeChild(e)})),b.render(e,d),document.querySelector("#result .q-point").innerHTML="&nbsp;",document.querySelector("#test-result .q-point").innerHTML="&nbsp;",document.querySelector("#submit-test").style.display=""},render:function(e,t){var n="id"===a("index");e.forEach((function(e,r){!function(e,t,n){var r=t.q,o=t.type||"js";"html"===o&&"string"==typeof r?r=function(e){return e=e.replace(/</g,"&lt;")}(r):"function"==typeof r?r=function(e){var t=e.trim();return t=(t=(t=t.replace(/\s*\(\s*\)\s*=>\s*{/,"")).replace(/function\s+q\d+\(\)\s*\{/,"")).substring(0,t.length-1),w(t)}(r.toString()):r&&(r=w(r));var a=t.answerType||"checkbox",i=t.answers?S(t.id,t.answers,a,e):"",u=void 0!==t.id?t.id:n,c=g(t.text,r,i,n,u,o,t);document.querySelector("#questions").appendChild(c)}(t,e,function(e,t,n){return e?"["+t.level+"-"+t.id+"] "+n:""+n}(n,e,r+1))})),(d=t)&&d.afterRender(),b.correctAnswers(e)},isText:function(e){return"text"===e||"number"===e},correctAnswers:function(e){window.questions=e,e=e.filter((function(e){return e.answers})),window.correctAnswers=e.reduce((function(e,t){var n;if(b.isText(t.answerType))n=t.answers[0].correct;else{var r=t.answers.find((function(e){return!0===e.correct}));r&&(n=r.id)}return void 0!==n&&(e[t.id]=[n]),e}),{})},htmlEncode:function(e){return e?String(e).replace(v,m):e},sanitizeAnswer:function(e){var t=b.htmlEncode(e.text);switch(e.type){case"mixed":t=e.text;break;case"js":case"html":case"css":case"code":t="<code>"+t+"</code>"}return t},checkPoints:function(e,t){return t||(console.warn("no correctAnswers for ",e,e[0].id),console.warn("question",document.querySelector('input[name="'+e[0].id+'"]').parentNode.parentNode.parentNode),t=[]),e.map((function(e){var n,o;return b.isText(e.type)?(n=!0,o=e.value==t[0]?1:0):(n=t.indexOf(e.value)>=0,o=e.checked&&n?1:e.checked?-1:0),r(r({},e),{point:o,required:n})}))},markResults:function(e){e.forEach((function(e){var t=b.isText(e.type),n=(t?document.querySelector('input[name="'+e.id+'"]'):document.querySelector('input[name="'+e.id+'"][value="'+e.value+'"]')).parentNode;n.classList.remove("correct-answer"),n.classList.remove("required-answer"),n.classList.remove("incorrect-answer"),e.required&&e.checked?!t||e.point?n.classList.add("correct-answer"):n.classList.add("incorrect-answer"):e.required&&!e.checked?n.classList.add("required-answer"):!e.required&&e.checked&&n.classList.add("incorrect-answer")}))}});Array.prototype.shuffle=function(){var e,t,n=this.length;if(0==n)return this;for(;--n;)e=Math.floor(Math.random()*(n+1)),t=this[n],this[n]=this[e],this[e]=t;return this};var w=function(e){return e=(e=(e=e.replace(/</g,"&lt;")).replace(/\}\}/g,"} } ")).replace(/\n\s*\n/g,"\n")};var g=function(e,t,n,r,o,a,i){var u=n?'<ol type="A" class="'+(i.answerDisplay||"")+'">\n         '+n+"\n       </ol>":"";r=r?r+") ":"";var c=void 0!==i.copy&&i.copy,s=void 0!==i.readOnly?i.readOnly:!c,l=t?'<pre class="code" data-type="'+a+'" data-readOnly="'+s+'" data-copy="'+c+'">'+t+"</pre>":"",f=document.createElement("article");return f.id="q-"+o,f.innerHTML='<h2><span class="q-point"></span><span class="q-nr">'+r+"</span>"+e+"</h2>\n    "+l+"\n    "+u,f},S=function(e,t,n,r){return r.shuffle&&t.shuffle(),"<li>"+(t||[]).map((function(t){return'<label><input class="answer" type="'+n+'" name="'+e+'" value="'+(b.isText(n)?"":t.id)+'">'+b.sanitizeAnswer(t)+"</label>"})).join("</li><li>")+"</li>"},x=function(e,t){var n=b.checkPoints(e,t);b.markResults(n);var r=n.reduce((function(e,t){return e+t.point}),0),o=t.length;return 0===o&&(o=1),(r>0?r:0)/o},j=function(e,t){var n=Object.keys(e).length,r=0;for(var o in e)if(e.hasOwnProperty(o)){var i=x(e[o],t[o]),u=Math.round(100*i)/100;document.querySelector("#q-"+o+" .q-point").innerHTML=""+u,1===u&&document.querySelector("#q-"+o).classList.add("correct"),r+=i}r=r.toFixed(2),document.querySelector("#result .q-point").innerHTML=r+"/"+n,document.querySelector("#test-result .q-point").innerHTML=r+"/"+n,document.querySelector("#submit-test").disabled=!0,q(!0),a("test")&&window.print()},q=function(e){Array.from(document.querySelectorAll("input.answer")).forEach((function(t){"radio"===t.type||"checkbox"===t.type?t.disabled=e:t.readOnly=e}))};window.submitTest=function(){var e=Array.from(document.querySelectorAll("input.answer")).map((function(e){var t=e.type,n=b.isText(t);return{id:e.name,value:n?e.value:1*e.value,checked:n?""!==e.value:e.checked,type:t}})).reduce((function(e,t){return e[t.id]=e[t.id]||[],e[t.id].push(t),e}),{});"{}"!==JSON.stringify(window.correctAnswers)?j(e,window.correctAnswers):fetch(o).then((function(e){return e.json()})).then((function(t){j(e,t)}))};var k=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}c((r=r.apply(e,t||[])).next())}))},L=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},T=[],A=function(e){return Object.keys(window.ALL_QUESTIONS.reduce((function(e,t){return e[t.level]=t.level,t.level||console.warn("no level",t),e}),{})).map((function(t){return{value:parseInt(t),text:e.levelNames&&e.levelNames[t]||t}}))},I={shuffle:!0,displayLimit:10,init:function(){return k(this,void 0,void 0,(function(){var e;return L(this,(function(t){switch(t.label){case 0:return e=["js/questions/js.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ext-beautify.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-javascript.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.js"],String.prototype.padStart||e.push("https://cdn.jsdelivr.net/npm/string-polyfills"),[4,i(e)];case 1:return t.sent(),T=A(this),[2]}}))}))},levelNames:{5:"Basics",6:"JSON Intro",10:"Intro",11:"Expressions",15:"Classes",20:"Timeout"},getLevelSelector:function(e,t){return y(T,e,t)},afterRender:function(){s()},generateQuestions:function(e){return u(I,window.ALL_QUESTIONS,e,!0)},reset:function(){}},O=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}c((r=r.apply(e,t||[])).next())}))},M=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},E=[{value:10,text:"Clasa I. Adunare cu trecere peste ordin - &#128288;",generator:function(){return N("+",3,"radio")}},{value:11,text:"Clasa I. Adunare cu trecere peste ordin - &#9997;",generator:function(){return N("+",3,"number")}},{value:12,text:"Clasa I. Adunare - afla numarul necunoscut - &#128288;",generator:function(){return N("+",0,"radio")}},{value:13,text:"Clasa I. Adunare - afla numarul necunoscut - &#9997;",generator:function(){return N("+",0,"number")}},{value:14,text:"Clasa I. Scaderea cu trecere peste ordin - &#128288;",generator:function(){return N("-",3,"radio")}},{value:15,text:"Clasa I. Scaderea cu trecere peste ordin - &#9997;",generator:function(){return N("-",3,"number")}},{value:16,text:"Clasa I. Scaderea - afla numarul necunoscut - &#128288;",generator:function(){return N("-",0,"radio")}},{value:17,text:"Clasa I. Scaderea - afla numarul necunoscut - &#9997;",generator:function(){return N("-",0,"number")}},{value:18,text:"Clasa I. Adunare si Scaderea (99) - &#9997;",generator:function(){return N("",0,"number")}},{value:22,text:"Clasa II. Adunare si Scaderea (999) - &#9997;",generator:function(){return N("",0,"number",100,1e3)}},{value:24,text:"Clasa II. Înmulțirea (1...10) - &#9997;",generator:function(){return N("*",3,"number",2,10)}},{value:25,text:"Clasa II. Îpărțirea (1...10) - &#9997;",generator:function(){return N("/",3,"number",2,10)}}];function C(e,t){return void 0===e&&(e=20),void 0===t&&(t=100),Math.floor(Math.random()*(t-e))+e}var N=function(e,t,n,r,o){void 0===n&&(n="radio"),void 0===r&&(r=20),void 0===o&&(o=100);for(var a,i=[],u=0;u<10;u++){var c=e||(Math.random()<.5?"+":"-"),s=void 0,l=void 0,f=void 0;switch(c){case"+":l=(f=C(r,o))-(s=C(f%10+1,f));break;case"-":f=(s=C(r,o))-(l=C(s%10+1,s));break;case"*":f=(s=C(r,o))*(l=C(r,o));break;case"/":l=C(r,o),s=(f=C(r,o))*l}var d=t||1+C(0,2),p=void 0,h=(a=void 0,(a="abcdefghijklmnopqrstuvwxyz")[Math.floor(Math.random()*a.length)]);1===d?(p=s,s=h):2===d?(p=l,l=h):(p=f,f="?");var v=P(p,n);i.push({id:u,level:10,text:s+" "+c+" "+l+" = "+f,answerType:n,answerDisplay:"inline-block",answers:v})}return i},P=function(e,t){var n=[];if("radio"===t)for(var r=Math.min(C(0,4),e),o=0;o<4;o++,r--)n.push({id:o,text:e-r,correct:0===r});else n.push({id:0,text:"",correct:e});return n};var D={shuffle:!0,displayLimit:10,init:function(){return O(void 0,void 0,void 0,(function(){var e;return M(this,(function(t){switch(t.label){case 0:return c("#test-result"),e=[],String.prototype.padStart||e.push("https://cdn.jsdelivr.net/npm/string-polyfills"),[4,i(e)];case 1:return t.sent(),[2]}}))}))},getLevelSelector:function(e,t){return y(E,e,t)},afterRender:function(){},generateQuestions:function(e){var t=E.find((function(t){return t.value===e}));return t||(console.warn("TODO find closest generator"),t=E[0]),t.generator()},reset:function(){}},_=function(e,t,n,r){return new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}c((r=r.apply(e,t||[])).next())}))},H=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}},Q=[];function R(){c("#submit-test"),c("#test-result"),c("#reset"),c("#result")}var U={shuffle:!1,displayLimit:999,init:function(){return _(this,void 0,void 0,(function(){var e;return H(this,(function(t){switch(t.label){case 0:return R(),e=["js/questions/constants.js","js/questions/js-homework.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ext-beautify.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-javascript.js","https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/mode-html.js"],String.prototype.padStart||e.push("https://cdn.jsdelivr.net/npm/string-polyfills"),[4,i(e)];case 1:return t.sent(),Q=A(this),[2]}}))}))},levelNames:{},getLevelSelector:function(e,t){return y(Q,e,t)},afterRender:function(){s()},generateQuestions:function(e){return u(U,window.ALL_QUESTIONS,e,!1)},reset:function(){R()}},z=function(e,t){var n,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(o=2&a[0]?r.return:a[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,a[1])).done)return o;switch(r=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,r=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],r=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}};function G(){var e=new Date,t=e.getUTCFullYear()+"-"+(e.getUTCMonth()+1).toString().padStart(2,"0")+"-"+e.getUTCDate().toString().padStart(2,"0"),n=e.getHours().toString().padStart(2,"0")+":"+e.getMinutes().toString().padStart(2,"0");return document.querySelector("#test-date").innerHTML=t+" "+n,t}(function(e,t,n,r){new(n||(n=Promise))((function(o,a){function i(e){try{c(r.next(e))}catch(e){a(e)}}function u(e){try{c(r.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(i,u)}c((r=r.apply(e,t||[])).next())}))})(void 0,void 0,void 0,(function(){var e,t,n,r,o,i,u,s,d,p,h,v,m,y,w;return z(this,(function(g){switch(g.label){case 0:return t=f(),n=a("domain")||"js",function(e){var t=a("limit");t&&(e.displayLimit=parseInt(t));var n=a("shuffle");n&&(e.shuffle="true"===n||"1"===n)}(r=function(e){switch(e){case"js":return I;case"js-homework":return U;case"math":return D}}(n)),[4,r.init()];case 1:return g.sent(),o=function(){var e=a("level");return e=e?parseInt(e):10}(),i=G(),t?(u=a("type")||"theoretical",1===t.length&&(console.info("Generate Test link..."),s="quiz-"+n+"-"+u,d=localStorage.getItem(s)||"",p=prompt("Add all questions",d).split(/\s*,\s*/gi),console.debug("ids",p),localStorage.setItem(s,p.join(", ")),h=l(p),t=f(h),console.debug("indexes",t),v="?domain="+n+"&type="+u+"&test="+h,window.history.pushState({},"",v)),m=localStorage.getItem("quiz-user-name")||"",y=prompt("Enter you full name (firstname & lastname)",m)||m,localStorage.setItem("quiz-user-name",y),document.title=u+"-test-"+i+"-"+y,document.querySelector("#student-name").innerHTML=y,c("#reset"),e=function(e,t){var n=t.map((function(e){return window.ALL_QUESTIONS[e]}));return e.shuffle&&n.shuffle(),n}(r,t)):e=r.generateQuestions(o),t||(w=r.getLevelSelector(o,(function(t){var n=parseInt(t.target.value),a=window.location.search.replace("&level="+o,"");history.pushState(null,"",a+"&level="+n),o=n,e=r.generateQuestions(o),b.reset(e),r.reset(),G()})),document.querySelector("#questions").appendChild(w)),b.render(e,r),[2]}}))}))}]);