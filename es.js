self.proxyTarget=function(r){"use strict";const n="array",t="function",e="null",u="object",{isArray:a}=Array,i=(r,n)=>({type:r,value:n});function o(){return this}return r.ARRAY=n,r.BIGINT="bigint",r.BOOLEAN="boolean",r.FUNCTION=t,r.NULL=e,r.NUMBER="number",r.OBJECT=u,r.STRING="string",r.SYMBOL="symbol",r.UNDEFINED="undefined",r.unwrap=r=>typeof r===t?i(t,r()):a(r)?i(...r):r,r.wrap=r=>{const s=typeof r;switch(s){case t:return o.bind(r);case u:return a(r)?[n,r]:i(r?s:e,r);default:return i(s,r)}},r}({});
