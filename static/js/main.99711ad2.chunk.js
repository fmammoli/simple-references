(this["webpackJsonpsimple-references"]=this["webpackJsonpsimple-references"]||[]).push([[0],{16:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),i=n.n(r),a=n(8),s=n.n(a),o=(n(16),n(10)),l=n(2),u=n(7),j=n.n(u),d=n(9),h=n(5);function b(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",c=i.a.useState(t),r=Object(l.a)(c,2),a=r[0],s=r[1],o=i.a.useState(!1),u=Object(l.a)(o,2),b=u[0],f=u[1],p=i.a.useState(!1),O=Object(l.a)(p,2),v=O[0],x=O[1],m=i.a.useState({url:e,options:Object(h.a)({},n)}),g=Object(l.a)(m,2),S=g[0],y=g[1];return i.a.useEffect((function(){function e(){return(e=Object(d.a)(j.a.mark((function e(t){var n,c,r,i=arguments;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=i.length>1&&void 0!==i[1]?i[1]:"",t){e.next=3;break}return e.abrupt("return");case 3:if(console.log("fetching"),x(!1),f(!0),e.prev=6,console.log("with options ".concat(n.mode)),!n){e.next=14;break}return e.next=11,fetch(t,Object(h.a)({},n));case 11:e.t0=e.sent,e.next=17;break;case 14:return e.next=16,fetch(t);case 16:e.t0=e.sent;case 17:return c=e.t0,e.next=20,c.json();case 20:r=e.sent,console.log(r),s(r),e.next=28;break;case 25:e.prev=25,e.t1=e.catch(6),x(!0);case 28:f(!1);case 29:case"end":return e.stop()}}),e,null,[[6,25]])})))).apply(this,arguments)}console.log("to fetch"),S.url&&function(t){e.apply(this,arguments)}(S.url,S.options)}),[S]),[{data:a,isLoading:b,isError:v},y]}n(18);function f(e){var t=e.reference,n=["jan","fev","mar","abr","maio","jun","jul","ago","set","out","nov","dez"];return Object(c.jsx)("p",{children:function(e){return["".concat(e.authors.flatMap((function(e){return"".concat(e.family.toUpperCase(),", ").concat(e.given)})).join("; "),"."),e.title?"".concat(e.title,"."):"",e.journal?"".concat(e.journal,","):"",e.volume?"v. ".concat(e.volume,","):"",e.issue?"n. ".concat(e.issue,","):"",e.pages?"p. ".concat(e.pages,","):"",e.month?"".concat(n[e.month-1],"."):"",e.year?"".concat(e.year,"."):"",e.availableAt?"Dispon\xedvel em: <".concat(e.availableAt,">"):"",e.doi?"DOI: ".concat(e.doi):""].filter((function(e){return e})).join(" ")}(t)})}function p(e){var t,n,r,i,a,s,o=e.item,l=e.setDOI,u=e.setSearchList;return Object(c.jsxs)("li",{children:[Object(c.jsxs)("p",{children:["Title: ",o.title[0]]}),Object(c.jsxs)("p",{children:["Subtitle: ",null===(t=o.subtitle)||void 0===t?void 0:t[0]]}),Object(c.jsxs)("p",{children:["URL: ",o.URL]}),Object(c.jsxs)("p",{children:["Type: ",o.type]}),Object(c.jsxs)("p",{children:["Publisher: ",o.publisher]}),Object(c.jsxs)("p",{children:["Author: ",null===(n=o.author)||void 0===n?void 0:n[0].given," ",null===(r=o.author)||void 0===r?void 0:r[0].family]}),Object(c.jsxs)("p",{children:["Year: ",null===(i=o.issued)||void 0===i||null===(a=i["date-parts"])||void 0===a||null===(s=a[0])||void 0===s?void 0:s[0]]}),Object(c.jsx)("button",{onClick:function(e){return l(o.DOI),void u([])},children:"Add"})]})}function O(e){var t=e.setDOI,n=i.a.useState(""),r=Object(l.a)(n,2),a=r[0],s=r[1];return Object(c.jsxs)("form",{onSubmit:function(e){!function(e){e.preventDefault(),t(a),s("")}(e)},children:["DOI input:",Object(c.jsx)("input",{type:"text",value:a,onChange:function(e){return s(e.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"Search"})]})}function v(e){var t=e.setSearchQuery,n=i.a.useState(""),r=Object(l.a)(n,2),a=r[0],s=r[1];return Object(c.jsxs)("form",{onSubmit:function(e){!function(e){e.preventDefault(),t(a),s("")}(e)},children:["Free Text Search:",Object(c.jsx)("input",{type:"text",value:a,onChange:function(e){return s(e.target.value)}}),Object(c.jsx)("button",{type:"Submit",children:"Search"})]})}var x=function(){var e=i.a.useState({references:[]}),t=Object(l.a)(e,2),n=t[0],r=t[1],a=function(e){var t={headers:new Headers({Accept:"application/vnd.citationstyles.csl+json, application/rdf+xml, text/x-bibliography; style=associacao-brasileira-de-norams-tecnicas"}),mode:"cors"},n=b(e,"",t),c=Object(l.a)(n,2),r=c[0],a=r.data,s=r.isLoading,o=r.isError,u=c[1],j=i.a.useState(""),d=Object(l.a)(j,2),f=d[0],p=d[1];return i.a.useEffect((function(){var e,t,n,c,r,i;if(a){var s={authors:a.author,title:a.title,subTitle:a.subtitle,journal:a["container-title"]?a["container-title"]:"",volume:a.volume,issue:a.issue,pages:a.page,month:null===(e=a.issued)||void 0===e||null===(t=e["date-parts"])||void 0===t?void 0:t[0][1],year:null===(n=a.issued)||void 0===n||null===(c=n["date-parts"])||void 0===c?void 0:c[0][0],availableAt:null===(r=a.link)||void 0===r||null===(i=r[0])||void 0===i?void 0:i.URL,doi:a.URL,type:a.type};p(s)}}),[a]),[{data:f,isLoading:s,isError:o},function(e){var n=e.includes("https://doi.org/")?e:"https://doi.org/"+e;u({url:n,options:Object(h.a)({},t)})}]}(""),s=Object(l.a)(a,2),u=s[0],j=u.data,d=u.isLoading,x=u.isError,m=s[1],g=i.a.useState([]),S=Object(l.a)(g,2),y=S[0],L=S[1],I=function(e){var t=b(e,""),n=Object(l.a)(t,2),c=n[0],r=c.data,i=c.isLoading,a=c.isError,s=n[1];return[{data:r,isLoading:i,isError:a},function(e){var t=e.split(" ").join("+");console.log("Searching for for ".concat(t)),s({url:"https://api.crossref.org/works?query.bibliographic=".concat(t,"&mailto=fmammoli@gmail.com")})}]}(""),D=Object(l.a)(I,2),k=D[0],E=k.data,A=k.isLoading,C=k.isError,T=D[1];return i.a.useEffect((function(){E&&L(E.message.items)}),[E]),i.a.useEffect((function(){j&&r((function(e){return console.log("Addins ".concat(j.title," to dataList")),{references:[j].concat(Object(o.a)(e.references))}}))}),[j]),Object(c.jsxs)("main",{className:"App",children:[Object(c.jsx)("h1",{children:"Simple Reference"}),Object(c.jsxs)("section",{children:[Object(c.jsx)("p",{children:"Input a DOI and get a ABNT formatted reference."}),Object(c.jsx)("p",{children:"* It only works for journal articles yet*"}),Object(c.jsx)("p",{children:"This uses simple content negotiation to retrieve metadata from DOIs."}),Object(c.jsx)("p",{children:"You can search by text in the Free Text Search. Text searches uses the CrossRef API, so it works better for journal articles than books."}),Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{children:"Here are some DOIs you can test:"}),Object(c.jsx)("div",{children:"https://doi.org/10.1590/S0104-59702015000200006"}),Object(c.jsx)("div",{children:"https://doi.org/10.1177/0306312717730428"}),Object(c.jsx)("div",{children:"https://doi.org/10.1177/0306312718783087"})]}),Object(c.jsx)("p",{}),Object(c.jsxs)("article",{children:["DOI Search",Object(c.jsx)(O,{setDOI:m})]}),Object(c.jsx)("p",{}),Object(c.jsxs)("article",{children:["Free Form Search",Object(c.jsx)(v,{setSearchQuery:T})]})]}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Search Results"}),Object(c.jsx)("button",{onClick:function(e){return L([])},children:"Clear Search"}),A&&Object(c.jsx)("div",{children:"Loading search..."}),C&&Object(c.jsx)("div",{children:"Opps, search: not found..."}),Object(c.jsx)("ul",{className:"left",children:y.map((function(e,t){return Object(c.jsx)(p,{item:e,index:t,setDOI:m,setSearchList:L},t)}))})]}),Object(c.jsxs)("section",{children:[Object(c.jsx)("h2",{children:"Reference List"}),x&&Object(c.jsx)("div",{children:"Opps, DOI: not found..."}),d&&Object(c.jsx)("div",{children:"Loading..."}),Object(c.jsx)("ul",{className:"left",children:n.references.map((function(e,t){return Object(c.jsx)(f,{reference:e,index:t},t)}))})]})]})},m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,20)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),i(e),a(e)}))};s.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(x,{})}),document.getElementById("root")),m()}},[[19,1,2]]]);
//# sourceMappingURL=main.99711ad2.chunk.js.map