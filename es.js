self.proxyTarget=function(r){"use strict";const n="array",t="function",e="null",a="object",{isArray:o}=Array,u=(r,n)=>({type:r,value:n});return r.ARRAY=n,r.BIGINT="bigint",r.BOOLEAN="boolean",r.FUNCTION=t,r.NULL=e,r.NUMBER="number",r.OBJECT=a,r.STRING="string",r.SYMBOL="symbol",r.UNDEFINED="undefined",r.pair=u,r.unwrap=r=>typeof r===t?u(t,r):o(r)?u(n,r):r,r.wrap=r=>{const n=null===r?e:typeof r;return n===t||n===a&&o(r)?r:u(n,r)},r}({});
