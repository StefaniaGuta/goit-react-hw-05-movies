"use strict";(self.webpackChunkreact_homework_template=self.webpackChunkreact_homework_template||[]).push([[637],{581:function(e,t,n){n.d(t,{TP:function(){return f},V0:function(){return m},XT:function(){return l},tx:function(){return d},yA:function(){return i},zv:function(){return h}});var r=n(861),a=n(757),c=n.n(a),s=n(16),u="https://api.themoviedb.org/3",o="046ac13b969fd43f0e6a6ee26ddbba59",i="https://image.tmdb.org/t/p/w500";function l(){return p.apply(this,arguments)}function p(){return(p=(0,r.Z)(c().mark((function e(){var t,n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t="".concat(u,"/trending/all/day?language=en-US&api_key=").concat(o),e.prev=1,e.next=4,fetch(t);case 4:return n=e.sent,e.next=7,n.json();case 7:return r=e.sent,e.abrupt("return",r);case 11:e.prev=11,e.t0=e.catch(1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})))).apply(this,arguments)}function f(e){return v.apply(this,arguments)}function v(){return(v=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(u,"/movie/").concat(t,"?language=en-US&api_key=").concat(o),e.prev=1,e.next=4,s.Z.get(n);case 4:if(200===(r=e.sent).status){e.next=7;break}throw new Error("Error fetching credits movies!");case 7:return e.abrupt("return",r.data);case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))).apply(this,arguments)}var h=function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(u,"/movie/").concat(t,"/credits?language=en-US&api_key=").concat(o),e.prev=1,e.next=4,s.Z.get(n);case 4:return r=e.sent,e.abrupt("return",r.data);case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(u,"/movie/").concat(t,"/reviews?language=en-US&api_key=").concat(o),e.prev=1,e.next=4,s.Z.get(n);case 4:return r=e.sent,e.abrupt("return",r.data);case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=(0,r.Z)(c().mark((function e(t){var n,r;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(u,"/search/movie?language=en-US&query=").concat(t,"&api_key=").concat(o),e.prev=1,e.next=4,s.Z.get(n);case 4:return r=e.sent,e.abrupt("return",r.data);case 8:e.prev=8,e.t0=e.catch(1),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()},637:function(e,t,n){n.r(t),n.d(t,{default:function(){return _}});var r=n(861),a=n(439),c=n(757),s=n.n(c),u=n(791),o=n(689),i=n(582),l=n(581),p=n(344),f=n(87),v="Searchbar_searcbarForm__ODlrq",h=n(184),d=function(e){var t,n=e.onSubmit,r=e.resetQuery,c=(0,f.lr)(),s=(0,a.Z)(c,2),o=s[0],i=s[1],l=(0,u.useState)(null!==(t=o.get("query"))&&void 0!==t?t:""),p=(0,a.Z)(l,2),d=p[0],m=p[1];(0,u.useEffect)((function(){m("")}),[r]);return(0,h.jsx)(h.Fragment,{children:(0,h.jsxs)("form",{onSubmit:function(e){e.preventDefault(),n(d)},className:v,children:[(0,h.jsx)("input",{type:"text",autoComplete:"off",autoFocus:!0,placeholder:"Type a movie to watch",name:"inputValue",value:d,onChange:function(e){var t=e.target.value;m(t),i(""!==t?{query:t}:{})}}),(0,h.jsx)("button",{type:"submit",children:"Search"})]})})},m="SearchMoviesList_moviesListContainer__CfZhi",x="SearchMoviesList_moviesList__1XiBb",g=function(e){var t=e.movies,n=(0,o.TH)();return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)("div",{className:m,children:t.map((function(e){return(0,h.jsxs)(f.rU,{to:"/movies/".concat(e.id),state:{from:n},className:x,children:[(0,h.jsx)("div",{children:(0,h.jsx)("img",{src:l.yA+e.backdrop_path,alt:e.title})}),(0,h.jsxs)("div",{children:[(0,h.jsx)("h3",{children:e.title}),(0,h.jsxs)("p",{children:["Release data: ",e.release_date]}),(0,h.jsxs)("p",{children:["User score: ",e.vote_average.toFixed(1)," %"]})]})]},e.id)}))})})},b=n(694),y=n.n(b),w="Movies_back__jnmbw",_=function(){var e,t,n=(0,u.useState)([]),c=(0,a.Z)(n,2),f=c[0],v=c[1],m=(0,u.useState)(""),x=(0,a.Z)(m,2),b=x[0],_=x[1],k=(0,u.useState)(!0),j=(0,a.Z)(k,2),Z=j[0],S=j[1],N=(0,u.useState)(!1),U=(0,a.Z)(N,2),C=U[0],F=U[1],E=null!==(e=null===(t=(0,o.TH)().state)||void 0===t?void 0:t.from)&&void 0!==e?e:"/";(0,u.useEffect)((function(){function e(){return(e=(0,r.Z)(s().mark((function e(){var t;return s().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==b){e.next=3;break}return S(!1),e.abrupt("return");case 3:return S(!0),e.prev=4,e.next=7,(0,l.V0)(b);case 7:0===(t=e.sent).results.length&&y().Notify.failure("No movies found with the given title!"),v(t.results),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(4),console.error("Error fetching trending movies:",e.t0),y().Notify.failure("An error occurred while searching for movies!");case 16:return e.prev=16,S(!1),F(!0),e.finish(16);case 20:case"end":return e.stop()}}),e,null,[[4,12,16,20]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[b]);return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)("div",{className:w,children:[(0,h.jsx)(i.h,{to:E,children:"\u276e Go Back"}),(0,h.jsx)(d,{onSubmit:function(e){v([]),_(e),F(!1)},resetQuery:C})]}),Z?(0,h.jsx)(p.Z,{}):(0,h.jsx)(g,{movies:f})]})}}}]);
//# sourceMappingURL=637.ee32f026.chunk.js.map