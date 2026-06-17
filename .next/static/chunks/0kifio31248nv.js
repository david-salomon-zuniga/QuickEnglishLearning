(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74574,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.baseAssetPath=void 0;let a="u">typeof window&&void 0!==window.document?window.document.currentScript:null,n="/";a&&(n=a.src.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^/]+$/,"/")),i.baseAssetPath=n},22237,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.defaultModelFetcher=void 0,i.defaultModelFetcher=t=>fetch(t).then(t=>t.arrayBuffer())},74389,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.log=void 0;let a=t=>r=>{console.log(`VAD | ${t} >`,r)};i.log={error:a("error"),debug:a("debug"),warn:a("warn")}},42827,(t,r,i)=>{"use strict";var a,n;Object.defineProperty(i,"__esModule",{value:!0}),i.Message=void 0,(n=a||(i.Message=a={})).AudioFrame="AUDIO_FRAME",n.SpeechStart="SPEECH_START",n.VADMisfire="VAD_MISFIRE",n.SpeechEnd="SPEECH_END",n.SpeechStop="SPEECH_STOP",n.SpeechRealStart="SPEECH_REAL_START",n.FrameProcessed="FRAME_PROCESSED"},43489,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.FrameProcessor=i.validateOptions=i.defaultFrameProcessorOptions=void 0;let a=t.r(74389),n=t.r(42827);i.defaultFrameProcessorOptions={positiveSpeechThreshold:.3,negativeSpeechThreshold:.25,preSpeechPadMs:800,redemptionMs:1400,minSpeechMs:400,submitUserSpeechOnPause:!1},i.validateOptions=function(t){(t.positiveSpeechThreshold<0||t.positiveSpeechThreshold>1)&&a.log.error("positiveSpeechThreshold should be a number between 0 and 1"),(t.negativeSpeechThreshold<0||t.negativeSpeechThreshold>t.positiveSpeechThreshold)&&a.log.error("negativeSpeechThreshold should be between 0 and positiveSpeechThreshold"),t.preSpeechPadMs<0&&a.log.error("preSpeechPadMs should be positive"),t.redemptionMs<0&&a.log.error("redemptionMs should be positive"),t.minSpeechMs<0&&a.log.error("minSpeechMs should be positive")};let s=t=>{let r=t.reduce((t,r)=>(t.push(t.at(-1)+r.length),t),[0]),i=new Float32Array(r.at(-1));return t.forEach((t,a)=>{let n=r[a];i.set(t,n)}),i};function o(t,r){let i=Math.floor(t.redemptionMs/r);return{redemptionFrames:i,preSpeechPadFrames:Math.floor(t.preSpeechPadMs/r),minSpeechFrames:Math.floor(t.minSpeechMs/r)}}i.FrameProcessor=class{constructor(t,r,i,a){this.modelProcessFunc=t,this.modelResetFunc=r,this.options=i,this.msPerFrame=a,this.speaking=!1,this.redemptionCounter=0,this.speechFrameCount=0,this.active=!1,this.speechRealStartFired=!1,this.setOptions=t=>{this.options={...this.options,...t};let{redemptionFrames:r,preSpeechPadFrames:i,minSpeechFrames:a}=o(this.options,this.msPerFrame);this.redemptionFrames=r,this.preSpeechPadFrames=i,this.minSpeechFrames=a},this.reset=()=>{this.speaking=!1,this.speechRealStartFired=!1,this.audioBuffer=[],this.modelResetFunc(),this.redemptionCounter=0,this.speechFrameCount=0},this.pause=t=>{this.active=!1,this.options.submitUserSpeechOnPause?this.endSegment(t):this.reset()},this.resume=()=>{this.active=!0},this.endSegment=t=>{let r=this.audioBuffer;this.audioBuffer=[];let i=this.speaking;if(this.reset(),i)if(r.reduce((t,r)=>r.isSpeech?t+1:t,0)>=this.minSpeechFrames){let i=s(r.map(t=>t.frame));t({msg:n.Message.SpeechEnd,audio:i})}else t({msg:n.Message.VADMisfire});return{}},this.process=async(t,r)=>{if(!this.active)return;let i=await this.modelProcessFunc(t),a=i.isSpeech>=this.options.positiveSpeechThreshold;if(r({probs:i,msg:n.Message.FrameProcessed,frame:t}),this.audioBuffer.push({frame:t,isSpeech:a}),a&&(this.speechFrameCount++,this.redemptionCounter=0),a&&!this.speaking&&(this.speaking=!0,r({msg:n.Message.SpeechStart})),this.speaking&&this.speechFrameCount===this.minSpeechFrames&&!this.speechRealStartFired&&(this.speechRealStartFired=!0,r({msg:n.Message.SpeechRealStart})),i.isSpeech<this.options.negativeSpeechThreshold&&this.speaking&&++this.redemptionCounter>=this.redemptionFrames){this.redemptionCounter=0,this.speechFrameCount=0,this.speaking=!1,this.speechRealStartFired=!1;let t=this.audioBuffer;if(this.audioBuffer=[],t.reduce((t,r)=>r.isSpeech?t+1:t,0)>=this.minSpeechFrames){let i=s(t.map(t=>t.frame));r({msg:n.Message.SpeechEnd,audio:i})}else r({msg:n.Message.VADMisfire})}if(!this.speaking){for(;this.audioBuffer.length>this.preSpeechPadFrames;)this.audioBuffer.shift();this.speechFrameCount=0}},this.audioBuffer=[];const{redemptionFrames:l,preSpeechPadFrames:u,minSpeechFrames:d}=o(this.options,this.msPerFrame);this.redemptionFrames=l,this.preSpeechPadFrames=u,this.minSpeechFrames=d,this.reset()}}},74450,(t,r,i)=>{"use strict";var a,n,s,o,l,u,d,p,c,h,f,m,g,y,_,b,w,$,v,x,S,T,E,k,I,C,A,z,O,R,M,B,D,P,N,U,L,F,V,q,G,W,j,H,K,Z,Y,X,Q,J,ee,et,er,ei,ea,en,es,eo,el,eu,ed,ep,ec,eh,ef,em,eg,ey,e_,eb,ew,e$,ev,ex,eS,eT,eE,ek,eI,eC,eA,ez,eO,eR,eM,eB,eD,eP,eN,eU,eL,eF,eV,eq,eG,eW,ej,eH,eK,eZ,eY,eX,eQ,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,tr,ti,ta,tn,ts,to,tl,tu,td,tp,tc,th,tf,tm,tg,ty,t_,tb,tw,t$,tv,tx,tS,tT,tE,tk,tI,tC,tA,tz,tO,tR,tM,tB,tD,tP,tN,tU,tL,tF,tV,tq,tG,tW,tj,tH,tK,tZ,tY,tX,tQ,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t7,t9,re,rt,rr,ri,ra,rn,rs,ro,rl,ru,rd,rp,rc,rh,rf,rm,rg,ry,r_,rb,rw,r$,rv,rx,rS,rT,rE,rk,rI,rC,rA,rz,rO,rR,rM,rB,rD,rP,rN,rU,rL,rF,rV,rq,rG,rW,rj,rH,rK,rZ,rY,rX,rQ,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r7,r9,ie,it,ir,ii,ia,is,io,il,iu,id,ip,ic,ih,im,ig,iy,i_,ib,iw,i$,iv,ix,iS,iT,iE,ik,iI,iC,iA,iz,iO,iR,iM,iB,iD,iP,iN,iU,iL,iF,iV,iq,iG,iW,ij,iH,iK,iZ,iY,iX,iQ,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i7,i9,ae,at,ar,ai,aa,an,as,ao,al,au,ad,ap,ac,ah,af,am,ag,ay,a_,ab,aw,a$,av,ax,aS,aT,aE,ak,aI,aC,aA,az,aO,aR,aM,aB,aD,aP,aN,aU,aL,aF,aV,aq,aG,aW,aj,aH,aK,aZ,aY,aX,aQ,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a7,a9,ne,nt,nr,ni,na,nn,ns,no,nl,nu,nd,np,nc,nh,nf,nm,ng,ny,n_,nb,nw,n$,nv,nx,nS,nT,nE,nk,nI,nC,nA,nz,nO,nR,nM,nB,nD,nP,nN,nU,nL,nF,nV,nq,nG,nW,nj,nH,nK,nZ,nY,nX,nQ,nJ,n0,n1,n2,n3,n4,n6,n8,n5,n7,n9,se,st,sr,si,sa,sn,ss,so,sl,su,sd,sp,sc,sh,sf,sm,sg,sy,s_,sb,sw,s$,sv,sx,sS,sT,sE,sk,sI,sC,sA,sz,sO,sR,sM,sB,sD,sP,sN,sU,sL,sF,sV,sq,sG,sW,sj,sH,sK,sZ,sY,sX,sQ,sJ,s0,s1,s2,s3,s4,s6,s8,s5,s7;let s9;a=Object.defineProperty,n=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,l=t.t,u=(t,r)=>()=>(t&&(r=t(t=0)),r),d=(t,r)=>{for(var i in r)a(t,i,{get:r[i],enumerable:!0})},p=t=>((t,r,i,l)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let u of s(r))o.call(t,u)||u===i||a(t,u,{get:()=>r[u],enumerable:!(l=n(r,u))||l.enumerable});return t})(a({},"__esModule",{value:!0}),t),y=u(()=>{c=new Map,h=[],f=(t,r,i)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let a=c.get(t);if(void 0===a)c.set(t,{backend:r,priority:i});else{if(a.priority>i)return;if(a.priority===i&&a.backend!==r)throw Error(`cannot register backend "${t}" using priority ${i}`)}if(i>=0){let r=h.indexOf(t);-1!==r&&h.splice(r,1);for(let r=0;r<h.length;r++)if(c.get(h[r]).priority<=i)return void h.splice(r,0,t);h.push(t)}return}throw TypeError("not a valid backend")},m=async t=>{let r=c.get(t);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let i=!!r.initPromise;try{return i||(r.initPromise=r.backend.init(t)),await r.initPromise,r.initialized=!0,r.backend}catch(t){return i||(r.error=`${t}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},g=async t=>{let r=t.executionProviders||[],i=r.map(t=>"string"==typeof t?t:t.name),a=0===i.length?h:i,n,s=[],o=new Set;for(let t of a){let r=await m(t);"string"==typeof r?s.push({name:t,err:r}):(n||(n=r),n===r&&o.add(t))}if(!n)throw Error(`no available backend found. ERR: ${s.map(t=>`[${t.name}] ${t.err}`).join(", ")}`);for(let{name:t,err:r}of s)i.includes(t)&&console.warn(`removing requested execution provider "${t}" from session options because it is not available: ${r}`);let l=r.filter(t=>o.has("string"==typeof t?t:t.name));return[n,new Proxy(t,{get:(t,r)=>"executionProviders"===r?l:Reflect.get(t,r)})]}}),_=u(()=>{y()}),w=u(()=>{b="1.25.1"}),x=u(()=>{w(),$="warning",Object.defineProperty(v={wasm:{},webgl:{},webgpu:{},versions:{common:b},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);$=e}},get logLevel(){return $}},"logLevel",{enumerable:!0})}),T=u(()=>{x(),S=v}),I=u(()=>{E=(t,r)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=t.dims[3],i.height=t.dims[2];let a=i.getContext("2d");if(null!=a){let n,s;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=t.dims[2],s=t.dims[3]):(n=t.dims[3],s=t.dims[2]);let o=r?.format!==void 0?r.format:"RGB",l=r?.norm,u,d;void 0===l||void 0===l.mean?u=[255,255,255,255]:"number"==typeof l.mean?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],0],void 0!==l.mean[3]&&(u[3]=l.mean[3])),void 0===l||void 0===l.bias?d=[0,0,0,0]:"number"==typeof l.bias?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(d[3]=l.bias[3]));let p=s*n,c=0,h=p,f=2*p,m=-1;"RGBA"===o?(c=0,h=p,f=2*p,m=3*p):"RGB"===o?(c=0,h=p,f=2*p):"RBG"===o&&(c=0,f=p,h=2*p);for(let r=0;r<s;r++)for(let i=0;i<n;i++)a.fillStyle="rgba("+(t.data[c++]-d[0])*u[0]+","+(t.data[h++]-d[1])*u[1]+","+(t.data[f++]-d[2])*u[2]+","+(-1===m?255:(t.data[m++]-d[3])*u[3])+")",a.fillRect(i,r,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},k=(t,r)=>{let i="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(null!=i){let n,s,o;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=t.dims[2],s=t.dims[1],o=t.dims[3]):(n=t.dims[3],s=t.dims[2],o=t.dims[1]);let l=void 0!==r&&void 0!==r.format?r.format:"RGB",u=r?.norm,d,p;void 0===u||void 0===u.mean?d=[255,255,255,255]:"number"==typeof u.mean?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],void 0!==u.mean[3]&&(d[3]=u.mean[3])),void 0===u||void 0===u.bias?p=[0,0,0,0]:"number"==typeof u.bias?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(p[3]=u.bias[3]));let c=s*n;if(void 0!==r&&(void 0!==r.format&&4===o&&"RGBA"!==r.format||3===o&&"RGB"!==r.format&&"BGR"!==r.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,f=1,m=2,g=3,y=0,_=c,b=2*c,w=-1;"RGBA"===l?(y=0,_=c,b=2*c,w=3*c):"RGB"===l?(y=0,_=c,b=2*c):"RBG"===l&&(y=0,b=c,_=2*c),a=i.createImageData(n,s);for(let r=0;r<s*n;h+=4,f+=4,m+=4,g+=4,r++)a.data[h]=(t.data[y++]-p[0])*d[0],a.data[f]=(t.data[_++]-p[1])*d[1],a.data[m]=(t.data[b++]-p[2])*d[2],a.data[g]=-1===w?255:(t.data[w++]-p[3])*d[3]}else throw Error("Can not access image data");return a}}),B=u(()=>{W(),C=(t,r)=>{if(void 0===t)throw Error("Image buffer must be defined");if(void 0===r.height||void 0===r.width)throw Error("Image height and width must be defined");if("NHWC"===r.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:a}=r,n=r.norm??{mean:255,bias:0},s,o;s="number"==typeof n.mean?[n.mean,n.mean,n.mean,n.mean]:[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],o="number"==typeof n.bias?[n.bias,n.bias,n.bias,n.bias]:[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let l=void 0!==r.format?r.format:"RGBA",u=void 0!==r.tensorFormat&&void 0!==r.tensorFormat?r.tensorFormat:"RGB",d=i*a,p=new Float32Array("RGBA"===u?4*d:3*d),c=4,h=0,f=1,m=2,g=3,y=0,_=d,b=2*d,w=-1;"RGB"===l&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===u?w=3*d:"RBG"===u?(y=0,b=d,_=2*d):"BGR"===u&&(b=0,_=d,y=2*d);for(let r=0;r<d;r++,h+=c,m+=c,f+=c,g+=c)p[y++]=(t[h]+o[0])/s[0],p[_++]=(t[f]+o[1])/s[1],p[b++]=(t[m]+o[2])/s[2],-1!==w&&-1!==g&&(p[w++]=(t[g]+o[3])/s[3]);return"RGBA"===u?new G("float32",p,[1,4,i,a]):new G("float32",p,[1,3,i,a])},A=async(t,r)=>{let i="u">typeof HTMLImageElement&&t instanceof HTMLImageElement,a="u">typeof ImageData&&t instanceof ImageData,n="u">typeof ImageBitmap&&t instanceof ImageBitmap,s="string"==typeof t,o,l=r??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=t=>"u">typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||t instanceof OffscreenCanvas?t.getContext("2d"):null;if(i){let i=u();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let i=t.height,n=t.width;if(void 0!==r&&void 0!==r.resizedHeight&&void 0!==r.resizedWidth&&(i=r.resizedHeight,n=r.resizedWidth),void 0!==r){if(l=r,void 0!==r.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=i,l.width=n}else l.tensorFormat="RGBA",l.height=i,l.width=n;a.drawImage(t,0,0),o=a.getImageData(0,0,n,i).data}else throw Error("Can not access image data")}else if(a){let i,a;if(void 0!==r&&void 0!==r.resizedWidth&&void 0!==r.resizedHeight?(i=r.resizedHeight,a=r.resizedWidth):(i=t.height,a=t.width),void 0!==r&&(l=r),l.format="RGBA",l.height=i,l.width=a,void 0!==r){let r=u();r.width=a,r.height=i;let n=d(r);if(null!=n)n.putImageData(t,0,0),o=n.getImageData(0,0,a,i).data;else throw Error("Can not access image data")}else o=t.data}else if(n){if(void 0===r)throw Error("Please provide image config with format for Imagebitmap");let i=u();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let r=t.height,i=t.width;return a.drawImage(t,0,0,i,r),o=a.getImageData(0,0,i,r).data,l.height=r,l.width=i,C(o,l)}throw Error("Can not access image data")}else{if(s)return new Promise((r,i)=>{let a=u(),n=d(a);if(!t||!n)return i();let s=new Image;s.crossOrigin="Anonymous",s.src=t,s.onload=()=>{a.width=s.width,a.height=s.height,n.drawImage(s,0,0,a.width,a.height);let t=n.getImageData(0,0,a.width,a.height);l.height=a.height,l.width=a.width,r(C(t.data,l))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return C(o,l);throw Error("Input data provided is not supported - aborted tensor creation")},z=(t,r)=>{let{width:i,height:a,download:n,dispose:s}=r;return new G({location:"texture",type:"float32",texture:t,dims:[1,a,i,4],download:n,dispose:s})},O=(t,r)=>{let{dataType:i,dims:a,download:n,dispose:s}=r;return new G({location:"gpu-buffer",type:i??"float32",gpuBuffer:t,dims:a,download:n,dispose:s})},R=(t,r)=>{let{dataType:i,dims:a,download:n,dispose:s}=r;return new G({location:"ml-tensor",type:i??"float32",mlTensor:t,dims:a,download:n,dispose:s})},M=(t,r,i)=>new G({location:"cpu-pinned",type:t,data:r,dims:i??[r.length]})}),L=u(()=>{D=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),P=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),N=!1,U=()=>{if(!N){N=!0;let t="u">typeof BigInt64Array&&BigInt64Array.from,r="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,a="u">typeof i&&i.from;t&&(D.set("int64",BigInt64Array),P.set(BigInt64Array,"int64")),r&&(D.set("uint64",BigUint64Array),P.set(BigUint64Array,"uint64")),a?(D.set("float16",i),P.set(i,"float16")):D.set("float16",Uint16Array)}}}),q=u(()=>{W(),F=t=>{let r=1;for(let i=0;i<t.length;i++){let a=t[i];if("number"!=typeof a||!Number.isSafeInteger(a))throw TypeError(`dims[${i}] must be an integer, got: ${a}`);if(a<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${a}`);r*=a}return r},V=(t,r)=>{switch(t.location){case"cpu":return new G(t.type,t.data,r);case"cpu-pinned":return new G({location:"cpu-pinned",data:t.data,type:t.type,dims:r});case"texture":return new G({location:"texture",texture:t.texture,type:t.type,dims:r});case"gpu-buffer":return new G({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:r});case"ml-tensor":return new G({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:r});default:throw Error(`tensorReshape: tensor location ${t.location} is not supported`)}}}),W=u(()=>{I(),B(),L(),q(),G=class{constructor(t,r,i){let a,n;if(U(),"object"==typeof t&&"location"in t)switch(this.dataLocation=t.location,a=t.type,n=t.dims,t.location){case"cpu-pinned":{let r=D.get(a);if(!r)throw TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(t.data instanceof r))throw TypeError(`buffer should be of type ${r.name}`);this.cpuData=t.data;break}case"texture":if("float32"!==a)throw TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break;case"gpu-buffer":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break;case"ml-tensor":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint64"!==a&&"int8"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if("string"==typeof t)if(a=t,o=i,"string"===t){if(!Array.isArray(r))throw TypeError("A string tensor's data must be a string array.");s=r}else{let i=D.get(t);if(void 0===i)throw TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if("float16"===t&&i===Uint16Array||"uint4"===t||"int4"===t)throw TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${i.name} as data.`);s="uint64"===t||"int64"===t?i.from(r,BigInt):i.from(r)}else if(r instanceof i)s=r;else if(r instanceof Uint8ClampedArray)if("uint8"===t)s=Uint8Array.from(r);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===t&&r instanceof Uint16Array&&i!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw TypeError(`A ${a} tensor's data must be type of ${i}`)}else if(o=r,Array.isArray(t)){if(0===t.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let r=typeof t[0];if("string"===r)a="string",s=t;else if("boolean"===r)a="bool",s=Uint8Array.from(t);else throw TypeError(`Invalid element type of data array: ${r}.`)}else if(t instanceof Uint8ClampedArray)a="uint8",s=Uint8Array.from(t);else{let r=P.get(t.constructor);if(void 0===r)throw TypeError(`Unsupported type for tensor data: ${t.constructor}.`);a=r,s=t}if(void 0===o)o=[s.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let s=F(n);if(this.cpuData&&s!==this.cpuData.length&&("uint4"!==a&&"int4"!==a||Math.ceil(s/2)!==this.cpuData.length))throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=n,this.size=s}static async fromImage(t,r){return A(t,r)}static fromTexture(t,r){return z(t,r)}static fromGpuBuffer(t,r){return O(t,r)}static fromMLTensor(t,r){return R(t,r)}static fromPinnedBuffer(t,r,i){return M(t,r,i)}toDataURL(t){return E(this,t)}toImageData(t){return k(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return V(this,t)}}}),H=u(()=>{W(),j=G}),ee=u(()=>{x(),K=(t,r)=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeStamp(`${t}::ORT::${r}`)},Z=(t,r)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let n=0;n<i.length;n++){if(a&&!i[n].includes("TRACE_FUNC")){let a=`FUNC_${t}::${i[n].trim().split(" ")[1]}`;r&&(a+=`::${r}`),K("CPU",a);return}i[n].includes("TRACE_FUNC")&&(a=!0)}},Y=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("BEGIN",t)},X=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("END",t)},Q=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.time(`ORT::${t}`)},J=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeEnd(`ORT::${t}`)}}),er=u(()=>{y(),H(),ee(),et=class t{constructor(t){this.handler=t}async run(t,r,i){Y(),Q("InferenceSession.run");let a={},n={};if("object"!=typeof t||null===t||t instanceof j||Array.isArray(t))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof r){if(null===r)throw TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof j)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(0===r.length)throw TypeError("'fetches' cannot be an empty array.");for(let t of(s=!1,r)){if("string"!=typeof t)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(t))throw RangeError(`'fetches' contains invalid output name: ${t}.`);a[t]=null}if("object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else{let t=!1,o=Object.getOwnPropertyNames(r);for(let i of this.outputNames)if(-1!==o.indexOf(i)){let n=r[i];(null===n||n instanceof j)&&(t=!0,s=!1,a[i]=n)}if(t){if("object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else n=r}}else if("u">typeof r)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof t[r]>"u")throw Error(`input '${r}' is missing in 'feeds'.`);if(s)for(let t of this.outputNames)a[t]=null;let o=await this.handler.run(t,a,n),l={};for(let t in o)if(Object.hasOwnProperty.call(o,t)){let r=o[t];r instanceof j?l[t]=r:l[t]=new j(r.type,r.data,r.dims)}return J("InferenceSession.run"),X(),l}async release(){return this.handler.dispose()}static async create(r,i,a,n){Y(),Q("InferenceSession.create");let s,o={};if("string"==typeof r){if(s=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof Uint8Array){if(s=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&r instanceof SharedArrayBuffer){let t=0,l=r.byteLength;if("object"==typeof i&&null!==i)o=i;else if("number"==typeof i){if(!Number.isSafeInteger(t=i))throw RangeError("'byteOffset' must be an integer.");if(t<0||t>=r.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(l=r.byteLength-t,"number"==typeof a){if(!Number.isSafeInteger(l=a))throw RangeError("'byteLength' must be an integer.");if(l<=0||t+l>r.byteLength)throw RangeError(`'byteLength' is out of range (0, ${r.byteLength-t}].`);if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if("u">typeof a)throw TypeError("'byteLength' must be a number.")}else if("u">typeof i)throw TypeError("'options' must be an object.");s=new Uint8Array(r,t,l)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,u]=await g(o),d=await l.createInferenceSessionHandler(s,u);return J("InferenceSession.create"),X(),new t(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ea=u(()=>{er(),ei=et}),en=u(()=>{}),es=u(()=>{}),eo=u(()=>{}),el=u(()=>{}),d(eu={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Q,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Y,TRACE_FUNC_END:()=>X,Tensor:()=>j,env:()=>S,registerBackend:()=>f}),ed=u(()=>{_(),T(),ea(),H(),en(),es(),ee(),eo(),el()}),ep=u(()=>{}),d(ec={},{default:()=>ef}),em=u(()=>{sO(),eR(),eE(),(eh=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":ez(i.wasm).then(()=>{s$(i).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})})},t=>{postMessage({type:r,err:t})});break;case"init-ep":{let{epName:t,env:a}=i;sv(a,t).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})});break}case"copy-from":{let{buffer:t}=i,a=sT(t);postMessage({type:r,out:a});break}case"create":{let{model:t,options:a}=i;sE(t,a).then(t=>{postMessage({type:r,out:t})},t=>{postMessage({type:r,err:t})});break}case"release":sk(i),postMessage({type:r});break;case"run":{let{sessionId:t,inputIndices:a,inputs:n,outputIndices:s,options:o}=i;sC(t,a,n,s,Array(s.length).fill(null),o).then(t=>{t.some(t=>"cpu"!==t[3])?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:t},sz([...n,...t]))},t=>{postMessage({type:r,err:t})});break}case"end-profiling":sA(i),postMessage({type:r})}}catch(t){postMessage({type:r,err:t})}}),ef=eh?null:t=>new Worker(t??ey,{type:"classic",name:"ort-wasm-proxy-worker"})}),eE=u(()=>{ep(),eg=typeof location>"u"?void 0:location.origin,ey="u">typeof document?document.currentScript?.src:"u">typeof self?self.location?.href:void 0,e_=()=>{if(ey&&!ey.startsWith("blob:"))return ey.substring(0,ey.lastIndexOf("/")+1)},eb=(t,r)=>{try{let i=r??ey;return(i?new URL(t,i):new URL(t)).origin===eg}catch{return!1}},ew=async t=>{let r=await (await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},e$=async t=>(await import(t)).default,ev=(em(),p(ec)).default,ex=async()=>{if(!ey)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(eb(ey))return[void 0,ev()];let t=await ew(ey);return[t,ev(t)]},eS=void 0,eT=async(t,r,i,a)=>{let n=eS&&!(t||r);if(n)if(ey)n=eb(ey)||a&&!i;else if(a&&!i)n=!0;else throw Error("cannot determine the script source URL.");if(n)return[void 0,eS];{let a,n,s="ort-wasm-simd-threaded.jsep.mjs",o=t??((t,r)=>{let i=r??ey;try{return(i?new URL(t,i):new URL(t)).href}catch{return}})(s,r),l=i&&o&&!eb(o,r),u=l?await ew(o):o??(a=s,n=r,`${n??"./"}${a}`);return[l?u:void 0,await e$(u)]}}}),eR=u(()=>{eE(),eI=!1,eC=!1,eA=!1,ez=async t=>{if(eI)return Promise.resolve();if(eC)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eA)throw Error("previous call to 'initializeWebAssembly()' failed.");eC=!0;let r=t.initTimeout,i=t.numThreads;if(!1!==t.simd){if("relaxed"===t.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let a=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!a&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=i=1);let n=t.wasmPaths,s="string"==typeof n?n:void 0,o=n?.mjs,l=o?.href??o,u=n?.wasm,d=u?.href??u,p=t.wasmBinary,[c,h]=await eT(l,s,i>1,!!p||!!d),f=!1,m=[];if(r>0&&m.push(new Promise(t=>{setTimeout(()=>{f=!0,t()},r)})),m.push(new Promise((t,r)=>{let a={numThreads:i};if(p)a.wasmBinary=p,a.locateFile=t=>t;else if(d||s)a.locateFile=t=>d??s+t;else if(l&&0!==l.indexOf("blob:"))a.locateFile=t=>new URL(t,l).href;else if(c){let t=e_();t&&(a.locateFile=r=>t+r)}h(a).then(r=>{eC=!1,eI=!0,ek=r,t(),c&&URL.revokeObjectURL(c)},t=>{eC=!1,eA=!0,r(t)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`)},eO=()=>{if(eI&&ek)return ek;throw Error("WebAssembly is not initialized yet.")}}),eP=u(()=>{eR(),eM=(t,r)=>{let i=eO(),a=i.lengthBytesUTF8(t)+1,n=i._malloc(a);return i.stringToUTF8(t,n,a),r.push(n),n},eB=(t,r,i,a)=>{if("object"==typeof t&&null!==t){if(i.has(t))throw Error("Circular reference in options");i.add(t)}Object.entries(t).forEach(([t,n])=>{let s=r?r+t:t;if("object"==typeof n)eB(n,s+".",i,a);else if("string"==typeof n||"number"==typeof n)a(s,n.toString());else if("boolean"==typeof n)a(s,n?"1":"0");else throw Error(`Can't handle extra config type: ${typeof n}`)})},eD=t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetLastError(a,a+i);let n=Number(r.getValue(a,4===i?"i32":"i64")),s=r.getValue(a+i,"*"),o=s?r.UTF8ToString(s):"";throw Error(`${t} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{r.stackRestore(i)}}}),eU=u(()=>{eR(),eP(),eN=t=>{let r=eO(),i=0,a=[],n=t||{};try{if(t?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if("number"!=typeof t.logSeverityLevel||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if("number"!=typeof t.logVerbosityLevel||!Number.isInteger(t.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(n.terminate=!1);let s=0;return t?.tag!==void 0&&(s=eM(t.tag,a)),i=r._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),0===i&&eD("Can't create run options."),t?.extra!==void 0&&eB(t.extra,"",new WeakSet,(t,n)=>{let s=eM(t,a),o=eM(n,a);0!==r._OrtAddRunConfigEntry(i,s,o)&&eD(`Can't set a run config entry: ${t} - ${n}.`)}),[i,a]}catch(t){throw 0!==i&&r._OrtReleaseRunOptions(i),a.forEach(t=>r._free(t)),t}}}),eq=u(()=>{eR(),eP(),eL=(t,r,i,a)=>{let n=eM(r,a),s=eM(i,a);0!==eO()._OrtAddSessionConfigEntry(t,n,s)&&eD(`Can't set a session config entry: ${r} - ${i}.`)},eF=async(t,r,i)=>{for(let a of r.executionProviders){let r="string"==typeof a?a:a.name,n=[];switch(r){case"webnn":if(r="WEBNN","string"!=typeof a){let r=a?.deviceType;r&&eL(t,"deviceType",r,i)}break;case"webgpu":if(r="JS","string"!=typeof a&&a?.preferredLayout){if("NCHW"!==a.preferredLayout&&"NHWC"!==a.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);eL(t,"preferredLayout",a.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${r}`)}let s=eM(r,i),o=n.length,l=0,u=0;if(o>0){l=eO()._malloc(o*eO().PTR_SIZE),i.push(l),u=eO()._malloc(o*eO().PTR_SIZE),i.push(u);for(let t=0;t<o;t++)eO().setValue(l+t*eO().PTR_SIZE,n[t][0],"*"),eO().setValue(u+t*eO().PTR_SIZE,n[t][1],"*")}await eO()._OrtAppendExecutionProvider(t,s,l,u,o)!==0&&eD(`Can't append execution provider: ${r}.`)}},eV=async t=>{var r;let i,a=eO(),n=0,s=[],o=t||{};(r=o).extra||(r.extra={}),r.extra.session||(r.extra.session={}),(i=r.extra.session).use_ort_model_bytes_directly||(i.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(t=>("string"==typeof t?t:t.name)==="webgpu")&&(r.enableMemPattern=!1);try{let t=(t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${t}`)}})(o.graphOptimizationLevel??"all"),r=(t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${t}`)}})(o.executionMode??"sequential"),i="string"==typeof o.logId?eM(o.logId,s):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log severity level is not valid: ${l}`);let u=o.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let d="string"==typeof o.optimizedModelFilePath?eM(o.optimizedModelFilePath,s):0;if(n=a._OrtCreateSessionOptions(t,!!o.enableCpuMemArena,!!o.enableMemPattern,r,!!o.enableProfiling,0,i,l,u,d),0===n&&eD("Can't create session options."),o.executionProviders&&await eF(n,o,s),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);eL(n,"enableGraphCapture",o.enableGraphCapture.toString(),s)}if(o.freeDimensionOverrides)for(let[t,r]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof t)throw Error(`free dimension override name must be a string: ${t}`);if("number"!=typeof r||!Number.isInteger(r)||r<0)throw Error(`free dimension override value must be a non-negative integer: ${r}`);let i=eM(t,s);0!==a._OrtAddFreeDimensionOverride(n,i,r)&&eD(`Can't set a free dimension override: ${t} - ${r}.`)}return void 0!==o.extra&&eB(o.extra,"",new WeakSet,(t,r)=>{eL(n,t,r,s)}),[n,s]}catch(t){throw 0!==n&&0!==a._OrtReleaseSessionOptions(n)&&eD("Can't release session options."),s.forEach(t=>a._free(t)),t}}}),eQ=u(()=>{eG=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${t}`)}},eW=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${t}`)}},ej=(t,r)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],a="number"==typeof r?r:r.reduce((t,r)=>t*r,1);return i>0?Math.ceil(a*i):void 0},eH=t=>{switch(t){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${t}`)}},eK=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${t}`)}},eZ=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eY=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint64"===t||"int8"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eX=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${t}`)}}}),e0=u(()=>{ep(),eJ=async t=>{if("string"!=typeof t)return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t);{let r=await fetch(t);if(!r.ok)throw Error(`failed to load external data file: ${t}`);let i=r.headers.get("Content-Length"),a=i?parseInt(i,10):0;if(a<0x40000000)return new Uint8Array(await r.arrayBuffer());{if(!r.body)throw Error(`failed to load external data file: ${t}, no response body.`);let i=r.body.getReader(),n;try{n=new ArrayBuffer(a)}catch(t){if(t instanceof RangeError){let t=Math.ceil(a/65536);n=new WebAssembly.Memory({initial:t,maximum:t}).buffer}else throw t}let s=0;for(;;){let{done:t,value:r}=await i.read();if(t)break;let a=r.byteLength;new Uint8Array(n,s,a).set(r),s+=a}return new Uint8Array(n,0,a)}}}}),e8=u(()=>{eQ(),e1=["V","I","W","E","F"],e4=(t,r)=>{e2=t,e3=r},e6=(...t)=>{e3&&((t,r)=>{var i,a;let n=eK(t);n>=eK(e2)&&(i=n,a="function"==typeof r?r():r,console.log(`[${e1[i]},${new Date().toISOString()}]${a}`))})(...t)}}),ta=u(()=>{e5=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},e7=class{static calcShape(t,r,i=!1){let a=t.length,n=r.length;if(0===a)return r;if(0===n)return t;let s=Math.max(t.length,r.length),o=Array(s);if(i){if(a<2||n<2)return;let i=e5.calcMatMulShape([t[a-2],t[a-1]],[r[n-2],r[n-1]]);if(void 0===i)return;[o[s-2],o[s-1]]=i}for(let l=i?3:1;l<=s;l++){let i=a-l<0?1:t[a-l],u=n-l<0?1:r[n-l];if(i!==u&&i>1&&u>1)return;let d=Math.max(i,u);if(i&&u)o[s-l]=Math.max(i,u);else{if(d>1)return;o[s-l]=0}}return o}static isValidBroadcast(t,r){let i=t.length,a=r.length;if(i>a)return!1;for(let n=1;n<=i;n++)if(1!==t[i-n]&&t[i-n]!==r[a-n])return!1;return!0}},e9=class t{static size(r){return t.getSizeFromDimensionRange(r,0,r.length)}static convertShape(t,r=4){let i=t.length;if(0===i)return[];let a=Array(i),n=i-1;for(;n>=0;){if(t[n]%r==0){a[n]=t[n]/r;break}if(r%t[n]!=0)throw Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(r,i){if(i<0||i>r.length)throw Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${r.length} dimensions.`);return t.getSizeFromDimensionRange(r,i,r.length)}static sizeToDimension(r,i){if(i<0||i>r.length)throw Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${r.length} dimensions.`);return t.getSizeFromDimensionRange(r,0,i)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(0===r)return[];if(1===r)return[1];let i=Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(r=>t[r]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((t,a)=>t+r[a]+r[a+i])}static areEqual(t,r){return t.length===r.length&&t.every((t,i)=>t===r[i])}},te=class t{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let t=0;t<r.length-2;t++)t>=i.length?i.push(r[t+2]):i[t]=r[t+2];for(let t=0;t<i.length;t++)if(t<a.length){if(a[t]<0)throw Error("strides should be greater than or equal to 1")}else a.push(1);for(let t=0;t<i.length;t++)if(t<n.length){if(n[t]<0)throw Error("dilations should be greater than or equal to 1")}else n.push(1);for(let t=0;t<2*i.length;t++)if(t<s.length){if(s[t]<0)throw Error("pad should be greater than or equal to 1")}else s.push(0);for(let t=0;t<i.length;t++){if(i[t]<=0)throw Error("kernel shapes need to be greater than 0");if(s[t]>=i[t]||s[t+i.length]>=i[t])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(r,i,a,n,s,o,l){if(l){if(s.length!==2*(r.length-2))throw Error("length of pads should be twice the length of data dimensions");if(i.length!==r.length-2)throw Error("length of strides should be the length of data dimensions");if(n.length!==r.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<r.length-2;u++)t.adjustPadAndReturnShape(r[u+(o?1:2)],i[u],a[u],n[u],s,u,u+r.length-2,l)}}static computePoolOutputShape(r,i,a,n,s,o,l){if(i.length<=0)throw Error("input shape must be of size greater than 0");let u=[i[0],i[1]];return t.computeShapeHelper(r,i,u,a,n,s,o,l),u}static computeConvOutputShape(r,i,a,n,s,o,l){if(r.length<=0||i.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let u=[r[0],i[0]];return t.computeShapeHelper(!1,r,u,a,n,s,o,l),u}static computeShapeHelper(r,i,a,n,s,o,l,u){if(r)for(let t=0;t<i.length-2;t++)a.push(1);else for(let r=0;r<i.length-2;r++)a.push(t.adjustPadAndReturnShape(i[r+2],n[r],s[r],o[r],l,r,r+i.length-2,u))}static adjustPadAndReturnShape(t,r,i,a,n,s,o,l){let u=i*(a-1)+1;if(!l||"NOTSET"===l)return Math.floor((t+n[s]+n[o]-u)/r+1);switch(l){case"VALID":return n[s]=0,n[o]=0,Math.floor((t-u)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==i)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let i=((t+r-1)/r-1)*r+a-t;return n[s]=Math.floor("SAME_LOWER"===l?(i+1)/2:i/2),n[o]=i-n[s],Math.floor((t+i-a)/r+1)}default:throw Error("Unsupported AutoPad type")}}},tt=class{static getShapeOfGemmResult(t,r,i,a,n){let s,o,l;if(2!==t.length||2!==i.length)throw Error("shape need to be of size 2");r?(s=t[1],o=t[0]):(s=t[0],o=t[1]);let u=-1;if(a?(l=i[0],u=1):(l=i[1],u=0),i[u]!==o)throw Error("dimension mismatch");if(s<=0||l<=0||o<=0)throw Error("invalid shape specified");if(n&&!e7.isValidBroadcast(n,[s,l]))throw Error("gemm: invalid bias shape for broadcast");return[s,l,o]}},tr=-34028234663852886e22,ti=34028234663852886e22}),ts=u(()=>{eQ(),tn=(t,r)=>new(eH(r))(t)}),t_=u(()=>{eQ(),e8(),to=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),tl=(t,r)=>{if("int32"===r)return t;let i=to.get(r);if(!i)throw Error(`WebNN backend does not support data type: ${r}`);let a=i/8;if(t.byteLength%a!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${a}.`);let n=t.byteLength/a,s=new(eH(r))(t.buffer,t.byteOffset,n);switch(r){case"int64":case"uint64":{let t=new Int32Array(n);for(let r=0;r<n;r++){let i=s[r];if(i>2147483647n||i<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");t[r]=Number(i)}return new Uint8Array(t.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===r&&s.some(t=>t>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(s,Number).buffer);default:throw Error(`Unsupported data conversion from ${r} to 'int32'`)}},tu=(t,r)=>{if("int32"===r)return t;if(t.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=t.byteLength/4,a=new Int32Array(t.buffer,t.byteOffset,i);switch(r){case"int64":return new Uint8Array(BigInt64Array.from(a,BigInt).buffer);case"uint64":if(a.some(t=>t<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(a,BigInt).buffer);case"int8":if(a.some(t=>t<-128||t>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(a,Number).buffer);case"uint8":if(a.some(t=>t<0||t>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(a,Number);case"uint32":if(a.some(t=>t<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(a,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${r}`)}},td=1,tp=()=>td++,tc=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),th=(t,r)=>{let i=to.get(t);if(!i)throw Error(`WebNN backend does not support data type: ${t}`);return r.length>0?Math.ceil(r.reduce((t,r)=>t*r)*i/8):0},tf=class{constructor(t){this.isDataConverted=!1;let{sessionId:r,context:i,tensor:a,dataType:n,shape:s,fallbackDataType:o}=t;this.sessionId=r,this.mlContext=i,this.mlTensor=a,this.dataType=n,this.tensorShape=s,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return th(this.dataType,this.tensorShape)}destroy(){e6("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){if(!this.fallbackDataType)return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor);{let r=tu(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return t?void(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(r):r.buffer}}canReuseTensor(t,r,i){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===i.length&&this.tensorShape.every((t,r)=>t===i[r])}setIsDataConverted(t){this.isDataConverted=t}},tm=class{constructor(t,r){this.tensorManager=t,this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,i,a){let n=this.tensorManager.getMLContext(t),s=this.tensorManager.getMLOpSupportLimits(t),o;if(!s?.input.dataTypes.includes(r)){if(!(o=tc.get(r))||s?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${r}`);e6("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,r,i))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==th(r,i))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let l=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,i,l,!0,!0,o),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let r=t;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)r=tl(t,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(t.byteLength===this.wrapper.byteLength)return void this.wrapper.write(r);e6("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(t){if(this.activeUpload){let r=this.wrapper?.isDataConverted?tu(this.activeUpload,this.wrapper?.type):this.activeUpload;return t?void(t instanceof ArrayBuffer?new Uint8Array(t).set(r):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(r)):r.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},tg=class{constructor(t){this.backend=t,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw Error("MLContext not found for session.");return r}getMLOpSupportLimits(t){return this.backend.getMLOpSupportLimits(t)}reserveTensorId(){let t=tp();return this.tensorTrackersById.set(t,new tm(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,i,a,n){e6("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${i}, shape: ${a}, copyOld: ${n}}`);let s=this.tensorTrackersById.get(r);if(!s)throw Error("Tensor not found.");return s.ensureTensor(t,i,a,n)}upload(t,r){let i=this.tensorTrackersById.get(t);if(!i)throw Error("Tensor not found.");i.upload(r)}async download(t,r){e6("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let i=this.tensorTrackersById.get(t);if(!i)throw Error("Tensor not found.");return i.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,i,a){let n=this.getMLContext(t),s=tp(),o=new tf({sessionId:t,context:n,tensor:r,dataType:i,shape:a});return this.tensorTrackersById.set(s,new tm(this,o)),this.externalTensors.add(o),s}async getCachedTensor(t,r,i,a,n,s,o){let l=this.getMLContext(t);for(let[a,n]of this.freeTensors.entries())if(n.canReuseTensor(l,r,i)){e6("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${i}`);let n=this.freeTensors.splice(a,1)[0];return n.sessionId=t,n}e6("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${i}}`);let u=await l.createTensor({dataType:o??r,shape:i,dimensions:i,usage:a,writable:n,readable:s});return new tf({sessionId:t,context:l,tensor:u,dataType:r,shape:i,fallbackDataType:o})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},ty=(...t)=>new tg(...t)}),t$=u(()=>{eQ(),eR(),ts(),t_(),e8(),tb=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),tw=class{constructor(t){this.tensorManager=ty(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,e4(t.logLevel,!!t.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(t){e6("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){e6("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let t of r)e6("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(r=>r.gpuDevice===t);if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:r}),r}}if(void 0===t){let t=this.mlContextCache.findIndex(t=>void 0===t.options&&void 0===t.gpuDevice);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:t}),t}}let r=this.mlContextCache.findIndex(r=>((t,r)=>{if(t===r)return!0;if(void 0===t||void 0===r)return!1;let i=Object.keys(t).sort(),a=Object.keys(r).sort();return i.length===a.length&&i.every((i,n)=>i===a[n]&&t[i]===r[i])})(r.options,t));if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let i=this.sessionIdsByMLContext.get(r);i||(i=new Set,this.sessionIdsByMLContext.set(r,i)),i.add(t),this.mlOpSupportLimitsBySessionId.has(t)||this.mlOpSupportLimitsBySessionId.set(t,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(t,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t),this.sessionGraphOutputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t),this.mlOpSupportLimitsBySessionId.delete(t);let i=this.sessionIdsByMLContext.get(r);if(i.delete(t),0===i.size){this.sessionIdsByMLContext.delete(r);let t=this.mlContextCache.findIndex(t=>t.mlContext===r);-1!==t&&this.mlContextCache.splice(t,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}getMLOpSupportLimits(t){return this.mlOpSupportLimitsBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){e6("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,i,a,n){let s=tb.get(i);if(!s)throw Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,s,a,n)}async createTemporaryTensor(t,r,i){e6("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${i}}`);let a=tb.get(r);if(!a)throw Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,n,a,i,!1);let s=this.temporarySessionTensorIds.get(t);return s?s.push(n):this.temporarySessionTensorIds.set(t,[n]),n}uploadTensor(t,r){if(!eO().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");e6("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let i=await this.tensorManager.download(t);return tn(i,r)}}registerMLTensor(t,r,i,a){let n=tb.get(i);if(!n)throw Error(`Unsupported ONNX data type: ${i}`);let s=this.tensorManager.registerTensor(t,r,n,a);return e6("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${n}, dimensions: ${a}} -> {tensorId: ${s}}`),s}registerMLConstant(t,r,i,a,n,s,o=!1){if(!s)throw Error("External mounted files are not available.");let l=t;t.startsWith("./")&&(l=t.substring(2));let u=s.get(l);if(!u)throw Error(`File with name ${l} not found in preloaded files.`);if(r+i>u.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(r,r+i).buffer,p;switch(n.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":o?(p=new Int32Array(tl(new Uint8Array(d),"int64").buffer),n.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return e6("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),a.constant(n,p)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}registerGraphOutput(t){this.temporaryGraphOutputs.push(t)}isGraphInput(t,r){let i=this.sessionGraphInputs.get(t);return!!i&&i.includes(r)}isGraphOutput(t,r){let i=this.sessionGraphOutputs.get(t);return!!i&&i.includes(r)}isGraphInputOutputTypeSupported(t,r,i=!0){let a=tb.get(eG(r)),n=this.mlOpSupportLimitsBySessionId.get(t);return!(typeof a>"u")&&(i?!!n?.input.dataTypes.includes(a):!!n?.output.dataTypes.includes(a))}flush(){}}}),tv=u(()=>{}),tz=u(()=>{e8(),tv(),tx=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),tS=[],tT=t=>16*Math.ceil(Number(t)/16),tE=1,tk=()=>tE++,tI=async(t,r,i,a)=>{let n=tT(i),s=t.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=t.getCommandEncoder();t.endComputePass(),o.copyBufferToBuffer(r,0,s,0,n),t.flush(),await s.mapAsync(GPUMapMode.READ);let l=s.getMappedRange();if(!a)return new Uint8Array(l.slice(0,i));{let t=a();return t.set(new Uint8Array(l,0,i)),t}}finally{s.destroy()}},tC=class{constructor(t){for(let[r]of(this.backend=t,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,tx))tS.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let i=r.buffer,a=r.byteOffset,n=r.byteLength,s=tT(n),o=this.storageCache.get(t);if(!o)throw Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==n)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${n}`);let l=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(l.getMappedRange()).set(new Uint8Array(i,a,n)),l.unmap();let u=this.backend.device.createCommandEncoder();u.copyBufferToBuffer(l,0,o.gpuData.buffer,0,s),this.backend.device.queue.submit([u.finish()]),l.destroy(),e6("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let i=this.storageCache.get(t);if(!i)throw Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(r);if(!a)throw Error("destination gpu data for memcpy does not exist");if(i.originalSize!==a.originalSize)throw Error("inconsistent source and destination gpu data size");let n=tT(i.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(i.gpuData.buffer,0,a.gpuData.buffer,0,n)}registerExternalBuffer(t,r,i){let a;if(i){if(a=i[0],t===i[1])return e6("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=tk();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:t},originalSize:r}),e6("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${a}, registered.`),a}unregisterExternalBuffer(t){void 0!==t&&(this.storageCache.delete(t),e6("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=(t=>{for(let r=0;r<tS.length;r++){let i=tS[r];if(t<=i)return i}return 16*Math.ceil(t/16)})(t),a,n=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||s){let t=(n?this.freeBuffers:this.freeUniformBuffers).get(i);a=t&&t.length>0?t.pop():this.backend.device.createBuffer({size:i,usage:r})}else a=this.backend.device.createBuffer({size:i,usage:r});let o={id:tk(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(t)}),e6("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${o.id}`),o}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r="bigint"==typeof t?Number(t):t,i=this.storageCache.get(r);if(!i){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return e6("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(t,r){let i=this.storageCache.get(Number(t));if(!i)throw Error("data does not exist");await tI(this.backend,i.gpuData.buffer,i.originalSize,r)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let t of this.buffersPending){let r=tx.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(t.size)||[];void 0===r||i.length>=r?t.destroy():i.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(t.size)||[];void 0===r||i.length>=r?t.destroy():i.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let r of(t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t)),this.buffersPending))t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,0===this.sessionCount&&(e6("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},tA=(...t)=>new tC(...t)}),tM=u(()=>{tO=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},tR=t=>new tO(t)}),tQ=u(()=>{eQ(),ta(),tB=64,tD=(t,r)=>{if(3===r)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(t)){case 10:return r>1?`vec${r}<f16>`:"f16";case 1:return r>1?`vec${r}<f32>`:"f32";case 6:return r>1?`vec${r}<i32>`:"i32";case 12:return r>1?`vec${r}<u32>`:"u32";case 7:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==r)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${t}`)}},tP=(t,r=1)=>{let i=tD(t,r);return"string"==typeof i?i:i[0]},tN=(t,r=1)=>{let i=tD(t,r);return"string"==typeof i?i:i[1]},tU=(...t)=>{let r=[];return t.forEach(t=>{0!==t.length&&r.push({type:12,data:t},{type:12,data:e9.computeStrides(t)})}),r},tL=t=>t%4==0?4:t%2==0?2:1,tF=(t="f32",r,i="0")=>r&&1!==r?`vec${r}<${t}>(${i})`:`${t}(${i})`,tV=(t,r,i)=>"f32"===t?i:1===r?`f32(${i})`:`vec${r}<f32>(${i})`,tq=(t,r)=>4===r?`(${t}.x + ${t}.y + ${t}.z + ${t}.w)`:2===r?`(${t}.x + ${t}.y)`:3===r?`(${t}.x + ${t}.y + ${t}.z)`:t,tG=(t,r,i,a)=>t.startsWith("uniforms.")&&i>4?"string"==typeof r?"f16"===a?`${t}[(${r}) / 8][(${r}) % 8 / 4][(${r}) % 8 % 4]`:`${t}[(${r}) / 4][(${r}) % 4]`:"f16"===a?`${t}[${Math.floor(r/8)}][${Math.floor(r%8/4)}][${r%8%4}]`:`${t}[${Math.floor(r/4)}][${r%4}]`:i>1?`${t}[${r}]`:t,tW=(t,r,i,a,n)=>{let s,o,l,u,d="number"==typeof i,p=d?i:i.length,c=[...Array(p).keys()],h=p<2?"u32":p<=4?`vec${p}<u32>`:`array<u32, ${p}>`,f=tD(r,n),m="string"==typeof f?f:f[1],g={indices:h,value:m,storage:"string"==typeof f?f:f[0],tensor:r},y=t=>"string"==typeof t?t:`${t}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=d?"uniforms.":"",w=`${b}${t}_shape`,$=`${b}${t}_strides`,v="";for(let t=0;t<p-1;t++)v+=`
    let dim${t} = current / ${tG($,t,p)};
    let rest${t} = current % ${tG($,t,p)};
    indices[${t}] = dim${t};
    current = rest${t};
    `;v+=`indices[${p-1}] = current;`;let x=p<2?"":`
  fn o2i_${t}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${v}
    return indices;
  }`,S=[];if(p>=2)for(let t=p-1;t>=0;t--)S.push(`${tG($,t,p)} * (indices[${t}])`);let T=p<2?"":`
  fn i2o_${t}(indices: ${g.indices}) -> u32 {
    return ${S.join("+")};
  }`,E=(...t)=>0===p?"0u":`${g.indices}(${t.map(y).join(",")})`,k=(t,r)=>p<2?`${t}`:`${tG(t,r,p)}`,I={},C=(r,i)=>(()=>{if(g.storage===g.value)return`${t}[${r}]=${i};`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`${t}[${r}]=vec2<u32>(u32(${i}), select(0u, 0xFFFFFFFFu, ${i} < 0));`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`${t}[${r}]=vec2<u32>(u32(${i}), 0u);`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`${t}[${r}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${i}));`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),A=r=>(()=>{if(g.storage===g.value)return`${t}[${r}]`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`i32(${t}[${r}].x)`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`u32(${t}[${r}].x)`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`vec4<bool>(bool(${t}[${r}] & 0xFFu), bool(${t}[${r}] & 0xFF00u), bool(${t}[${r}] & 0xFF0000u), bool(${t}[${r}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),z=p<2?"":`
  fn get_${t}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${A(`i2o_${t}(indices)`)};
  }`,O=p<2?"":(s=c.map(t=>`d${t}: u32`).join(", "),o=c.map(t=>`d${t}`).join(", "),`
  fn get_${t}(${s}) -> ${m} {
    return get_${t}ByIndices(${E(o)});
  }`),R=p<2?"":`
  fn set_${t}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${C(`i2o_${t}(indices)`,"value")}
  }`,M=p<2?"":(l=c.map(t=>`d${t}: u32`).join(", "),u=c.map(t=>`d${t}`).join(", "),`
  fn set_${t}(${l}, value: ${m}) {
    set_${t}ByIndices(${E(u)}, value);
  }`);return{impl:()=>{let t=[],r=!1;return _.offsetToIndices&&(t.push(x),r=!0),_.indicesToOffset&&(t.push(T),r=!0),_.broadcastedIndicesToOffset&&(Object.values(I).forEach(r=>t.push(r)),r=!0),_.set&&(t.push(M),r=!0),_.setByIndices&&(t.push(R),r=!0),_.get&&(t.push(O),r=!0),_.getByIndices&&(t.push(z),r=!0),!d&&r&&t.unshift(`const ${w} = ${g.indices}(${i.join(",")});`,`const ${$} = ${g.indices}(${e9.computeStrides(i).join(",")});`),t.join(`
`)},type:g,offsetToIndices:r=>(_.offsetToIndices=!0,p<2?r:`o2i_${t}(${r})`),indicesToOffset:r=>(_.indicesToOffset=!0,p<2?r:`i2o_${t}(${r})`),broadcastedIndicesToOffset:(r,i)=>{_.broadcastedIndicesToOffset=!0;let a=`${i.name}broadcastedIndicesTo${t}Offset`;if(a in I)return`${a}(${r})`;let n=[];for(let t=p-1;t>=0;t--){let r=i.indicesGet("outputIndices",t+i.rank-p);n.push(`${k($,t)} * (${r} % ${k(w,t)})`)}return I[a]=`fn ${a}(outputIndices: ${i.type.indices}) -> u32 {
             return ${n.length>0?n.join("+"):"0u"};
           }`,`${a}(${r})`},indices:E,indicesGet:k,indicesSet:(t,r,i)=>p<2?`${t}=${i};`:`${tG(t,r,p)}=${i};`,set:(...r)=>{if(r.length!==p+1)throw Error(`indices length must be ${p}`);let i=r[p];if("string"!=typeof i)throw Error("value must be string");let a=r.slice(0,p).map(y).join(",");return 0===p?C("0u",i):1===p?C(a[0],i):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${t}(${a}, ${i})`)},setByOffset:C,setByIndices:(r,i)=>p<2?C(r,i):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${t}ByIndices(${r}, ${i});`),get:(...r)=>{if(r.length!==p)throw Error(`indices length must be ${p}`);let i=r.map(y).join(",");return 0===p?A("0u"):1===p?A(i[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${t}(${i})`)},getByOffset:A,getByIndices:r=>p<2?A(r):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${t}ByIndices(${r})`),usage:a,name:t,strides:$,shape:w,rank:p}},tj=(t,r,i,a=1)=>tW(t,r,i,"input",a),tH=(t,r,i,a=1)=>tW(t,r,i,"output",a),tK=(t,r,i)=>tW(t,r,i,"atomicOutput",1),tZ=(t,r,i,a=1)=>tW(t,r,i,"internal",a),tY=class{constructor(t,r){this.normalizedDispatchGroup=t,this.limits=r,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${"number"==typeof t?`${t}u`:t}) { return; }`}mainStart(t=tB){let r="number"==typeof t?t:t[0],i="number"==typeof t?1:t[1],a="number"==typeof t?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${r}, ${i}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*i*a>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${r}, ${i}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],s=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*i*a}u + local_idx;`;return`@compute @workgroup_size(${r}, ${i}, ${a})
  fn main(${s}) {
    ${o}
  `}appendVariableUniforms(t){0!==t.rank&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if("internal"===t.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let i="input"===t.usage?"read":"read_write",a="atomicOutput"===t.usage?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${i}> ${t.name}: array<${a}>;`}declareVariables(...t){return t.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if("internal"!==t.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(t,r,i=1){return this.uniforms.push({name:t,type:r,length:i}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let t=[];for(let{name:r,type:i,length:a}of this.uniforms)if(a&&a>4)"f16"===i?t.push(`@align(16) ${r}:array<mat2x4<${i}>, ${Math.ceil(a/8)}>`):t.push(`${r}:array<vec4<${i}>, ${Math.ceil(a/4)}>`);else{let n=null==a||1===a?i:`vec${a}<${i}>`;t.push(`${r}:${n}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(t=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(t.type)],t.length??1])}},tX=(t,r)=>new tY(t,r)}),t3=u(()=>{eQ(),ta(),tM(),tQ(),tJ=(t,r)=>0!==r.length?r:[...Array(t).keys()].reverse(),t0=(t,r)=>{let i,a,n=t.dataType,s=t.dims.length,o=tJ(s,r),l=(i=t.dims,a=o,e9.sortBasedOnPerm(i,tJ(i.length,a))),u=t.dims,d=l;if(s<2||((t,r)=>{let i=0;for(let a=0;a<t.length;++a)if(1!==r[t[a]]){if(t[a]<i)return!1;i=t[a]}return!0})(o,t.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=e9.size(l);return{outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(r/64/4)},programUniforms:[{type:12,data:Math.ceil(r/4)}]}},getShaderSource:t=>{let r=tj("input",n,u,4),i=tH("output",n,d,4);return`
  ${t.registerUniform("output_size","u32").declareVariables(r,i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:p,newPerm:c}=((t,r)=>{let i=[],a=[];for(let n=0;n<t.length;++n)1!==t[n]&&i.push(t[n]),1!==t[r[n]]&&a.push(r[n]);return{newShape:i,newPerm:a}})(t.dims,o),h=e9.areEqual(c,[2,3,1]),f=e9.areEqual(c,[3,1,2]);return 2===p.length||h||f?(d=[(u=h?[p[0],p[1]*p[2]]:f?[p[0]*p[1],p[2]]:p)[1],u[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=e9.size(l);return{outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(d[1]/16),y:Math.ceil(d[0]/16)},programUniforms:[{type:12,data:r},...tU(u,d)]}},getShaderSource:t=>{let r=tj("a",n,u.length),i=tH("output",n,d.length);return`
  ${t.registerUniform("output_size","u32").declareVariables(r,i)}
  var<workgroup> tile : array<array<${i.type.value}, 17>, 16>;
  ${t.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${r.getByIndices(`${r.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${i.setByIndices(`${i.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>{let r=e9.size(l);return{outputs:[{dims:l,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...tU(u,d)]}},getShaderSource:t=>{let r=tj("a",n,u.length),i=tH("output",n,d.length);return`
  ${t.registerUniform("output_size","u32").declareVariables(r,i)}

  ${((t,r,i,a)=>{let n=`fn perm(i: ${a.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let i=0;i<r;++i)n+=`a[${t[i]}]=i[${i}];`;return n+"return a;}"})(o,s,r,i)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${i.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${i.setByOffset("global_idx",r.getByIndices("aIndices"))}
  }`}}},t1=(t,r)=>{((t,r)=>{if(!t||1!==t.length)throw Error("Transpose requires 1 input.");if(0!==r.length&&r.length!==t[0].dims.length)throw Error(`perm size ${r.length} does not match input rank ${t[0].dims.length}`)})(t.inputs,r.perm),t.compute(t0(t.inputs[0],r.perm))},t2=t=>tR({perm:t.perm})}),ru=u(()=>{eQ(),ta(),tQ(),rE(),t3(),t4={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},t6={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},t8={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},t5={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},t7=(t,r,i,a)=>{var n,s,o,l,u,d,p;let c,h,f,m,g,y,_,b=1===t.inputs.length?i:rh(t.inputs,i),w=b.axes;0!==w.length||b.noopWithEmptyAxes||(w=t.inputs[0].dims.map((t,r)=>r));let $=e9.normalizeAxes(w,t.inputs[0].dims.length),v=$,x=t.inputs[0],S=((t,r)=>{let i=[];if(!((t,r)=>{for(let i=0;i<t.length;++i)if(t[t.length-i-1]!==r-1-i)return!1;return!0})(t,r)){for(let a=0;a<r;++a)-1===t.indexOf(a)&&i.push(a);t.forEach(t=>i.push(t))}return i})(v,t.inputs[0].dims.length);S.length>0&&(x=t.compute(t0(t.inputs[0],S),{inputs:[0],outputs:[-1]})[0],v=((t,r)=>{let i=[];for(let a=r-t;a<r;++a)i.push(a);return i})(v.length,x.dims.length));let[T,E]=((t,r)=>{let i=[],a=t.length;for(let n=0;n<a;n++)-1===r.indexOf(n)&&i.push(t[n]);return[i,r.map(r=>t[r])]})(x.dims,v),k=T;b.keepDims&&(k=((t,r)=>{let i=t.length+r.length,a=[],n=0;for(let s=0;s<i;s++)-1===r.indexOf(s)?a.push(t[n++]):a.push(1);return a})(T,$)),t.compute((n=r,s=b.cacheKey,o=[x],l=a,u=t.inputs[0].dataType,d=k,p=E,c=o[0].dims,h=e9.size(d),f=e9.size(p),m=tj("_A",o[0].dataType,c),g=tH("output",u,d),y=64,1===h&&(y=256),_=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,{name:n,shaderCache:{hint:`${s};${y}`,inputDependencies:["type"]},getShaderSource:t=>`
        ${t.registerUniform("reduceSize","u32").declareVariables(m,g)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${t.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${t8[l]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${t4[l]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${t6[l]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${"mean"===l?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${t5[l]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:d,dataType:u}],dispatchGroup:{x:h},programUniforms:[{type:12,data:f}]})}),{inputs:[x]})},t9=(t,r)=>{t7(t,"ReduceMeanShared",r,"mean")},re=(t,r)=>{t7(t,"ReduceL1Shared",r,"l1")},rt=(t,r)=>{t7(t,"ReduceL2Shared",r,"l2")},rr=(t,r)=>{t7(t,"ReduceLogSumExpShared",r,"logSumExp")},ri=(t,r)=>{t7(t,"ReduceMaxShared",r,"max")},ra=(t,r)=>{t7(t,"ReduceMinShared",r,"min")},rn=(t,r)=>{t7(t,"ReduceProdShared",r,"prod")},rs=(t,r)=>{t7(t,"ReduceSumShared",r,"sum")},ro=(t,r)=>{t7(t,"ReduceSumSquareShared",r,"sumSquare")},rl=(t,r)=>{t7(t,"ReduceLogSumShared",r,"logSum")}}),rE=u(()=>{eQ(),ta(),tM(),tQ(),ru(),rd=t=>{if(!t||0===t.length||t.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===t.length&&1!==t[1].dims.length)throw Error("Invalid axes input dims.")},rp=t=>["","",`var value = ${t.getByIndices("input_indices")};`,""],rc=(t,r,i,a,n,s,o=!1,l=!1)=>{let u=[],d=i[0].dims,p=d.length,c=e9.normalizeAxes(n,p),h=!l&&0===c.length;d.forEach((t,r)=>{h||c.indexOf(r)>=0?o&&u.push(1):u.push(t)});let f=u.length,m=e9.size(u);return{name:t,shaderCache:r,getShaderSource:t=>{let r=[],n=tj("_A",i[0].dataType,p),l=tH("output",s,f),u=a(n,l,c),m=u[2];for(let t=0,i=0;t<p;t++)h||c.indexOf(t)>=0?(o&&i++,m=`for(var j${t}: u32 = 0; j${t} < ${d[t]}; j${t}++) {
                  ${u[2].includes("last_index")?`let last_index = j${t};`:""}
                  ${n.indicesSet("input_indices",t,`j${t}`)}
                  ${m}
                }`):(r.push(`${n.indicesSet("input_indices",t,l.indicesGet("output_indices",i))};`),i++);return`

        ${t.registerUniform("output_size","u32").declareVariables(n,l)}

        ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${n.type.indices};
          let output_indices = ${l.offsetToIndices("global_idx")};

          ${r.join(`
`)}
          ${u[0]}       // init ops for reduce max/min
          ${u[1]}
          ${m}
          ${u[3]}
          ${4===u.length?l.setByOffset("global_idx","value"):u.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:s}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...tU(d,u)]})}},rh=(t,r)=>{let i=[];return t[1].dims[0]>0&&t[1].getBigInt64Array().forEach(t=>i.push(Number(t))),tR({axes:i,keepDims:r.keepDims,noopWithEmptyAxes:r.noopWithEmptyAxes})},rf=(t,r,i,a)=>{let n=t.inputs,s=1===n.length?i:rh(n,i);t.compute(rc(r,{hint:s.cacheKey,inputDependencies:["rank"]},[n[0]],s.noopWithEmptyAxes&&0===s.axes.length?rp:a,s.axes,n[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},rm=(t,r,i)=>{if(0===r.length)return i;let a=1,n=1;for(let i=0;i<r.length;i++)-1===r.indexOf(i)?a*=t[i]:n*=t[i];return n<32&&a>1024},rg=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceMean",a,(t,r,a)=>{let n=1;for(let r=0;r<t.rank;r++)(a.indexOf(r)>=0||0===a.length)&&(n*=i.inputs[0].dims[r]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${n});`]})):t9(t,r)},ry=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceL1",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])):re(t,r)},r_=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceL2",a,(t,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):rt(t,r)},rb=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceLogSumExp",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])):rr(t,r)},rw=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceMax",a,(t,r,i)=>{let a=[];for(let r=0;r<t.rank;r++)(i.indexOf(r)>=0||0===i.length)&&a.push(t.indicesSet("input_indices",r,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})):ri(t,r)},r$=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceMin",a,(t,r,i)=>{let a=[];for(let r=0;r<t.rank;r++)(i.indexOf(r)>=0||0===i.length)&&a.push(`input_indices[${r}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})):ra(t,r)},rv=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceProd",a,(t,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])):rn(t,r)},rx=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceSum",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])):rs(t,r)},rS=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceSumSquare",a,(t,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])):ro(t,r)},rT=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceLogSum",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])):rl(t,r)}}),rz=u(()=>{eQ(),tM(),rE(),rk=t=>{if(!t||0===t.length||t.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==t[0].dataType)throw Error("Invalid input type.")},rI=(t,r)=>{rk(t.inputs),t.compute(rc("ArgMin",{hint:r.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],(t,i,a)=>{let n=[];for(let r=0;r<t.rank;r++)(a.indexOf(r)>=0||0===a.length)&&n.push(`input_indices[${r}] = 0;`);return[`${n.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${r.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rC=(t,r)=>{rk(t.inputs),t.compute(rc("argMax",{hint:r.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],(t,i,a)=>{let n=[];for(let r=0;r<t.rank;r++)(a.indexOf(r)>=0||0===a.length)&&n.push(`input_indices[${r}] = 0;`);return[`${n.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${r.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rA=t=>tR(t)}),rB=u(()=>{eQ(),ta(),tv(),tQ(),rO=(t,r,i)=>r&&t?`
      let total_sequence_length_input = u32(${r.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${t?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,rR=(t,r,i,a,n,s,o,l,u,d,p,c)=>{var h,f,m,g,y,_,b,w,$,v,x,S,T,E,k,I,C,A,z,O,R,M,B,D,P;let N,U,L,F,V,q,G,W,j,H,K,Z,Y,X,Q,J,ee,et,er,ei,ea,en,es,eo,el,eu,ed,ep,ec,eh,ef,em,eg,ey=Math.min(t.outputCount,1+ +!!o+ +!!l),e_=ey>1?d.pastSequenceLength:0,eb=e_+d.kvSequenceLength,ew=u&&e9.size(u.dims)>0?u:void 0,e$=[r,i];ey>1&&o&&e9.size(o.dims)>0&&e$.push(o),ew&&e$.push(ew),p&&e$.push(p),c&&e$.push(c);let ev=t.compute((h=ey,f=r,m=i,g=o,y=ew,_=d,b=e_,w=p,$=c,N=b+_.kvSequenceLength,U=[_.batchSize,_.numHeads,_.sequenceLength,N],L=h>1&&g,F=_.kvNumHeads?_.kvNumHeads:_.numHeads,V=L?[_.batchSize,F,N,_.headSize]:void 0,q=_.nReps?_.nReps:1,G=0===_.scale?1/Math.sqrt(_.headSize):_.scale,W=tL(_.headSize),j=_.headSize/W,H={x:Math.ceil(N/12),y:Math.ceil(_.sequenceLength/12),z:_.batchSize*_.numHeads},K=[{type:12,data:_.sequenceLength},{type:12,data:j},{type:12,data:N},{type:12,data:_.numHeads},{type:12,data:_.headSize},{type:1,data:G},{type:12,data:b},{type:12,data:_.kvSequenceLength},{type:12,data:q}],Z=L&&g&&e9.size(g.dims)>0,Y=["type","type"],Z&&Y.push("type"),y&&Y.push("type"),w&&Y.push("type"),$&&Y.push("type"),X=[{dims:U,dataType:f.dataType,gpuDataType:0}],L&&X.push({dims:V,dataType:f.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${W};${void 0!==y};${void 0!==g};${h}`,inputDependencies:Y},getRunData:()=>({outputs:X,dispatchGroup:H,programUniforms:K}),getShaderSource:t=>{let r=tj("q",f.dataType,f.dims,W),i=[r,tj("key",m.dataType,m.dims,W)];if(Z){let t=tj("past_key",g.dataType,g.dims,W);i.push(t)}y&&i.push(tj("attention_bias",y.dataType,y.dims));let a=w?tj("seq_lens",w.dataType,w.dims):void 0;a&&i.push(a);let n=$?tj("total_sequence_length_input",$.dataType,$.dims):void 0;n&&i.push(n);let s=tH("output",f.dataType,U),o=[s];L&&o.push(tH("present_key",f.dataType,V,W));let l=tN(1,W);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${r.type.storage}, 144>;
  var<workgroup> tileK: array<${r.type.storage}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...o)}
  ${t.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===q?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===q?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${rO(a,n,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${Z&&L?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${L?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${Z&&L?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${L?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${l}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(W){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${W}`)}})()};
        output[outputIdx] = ${s.type.value} (sum * uniforms.alpha) + ${y?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:e$,outputs:ey>1?[-1,1]:[-1]})[0];t.compute((v=ev,x=d.batchSize,S=d.numHeads,T=e_,E=d.sequenceLength,k=eb,I=p,C=c,Q=tL(I?1:k),J=64,(ee=k/Q)<64&&(J=32),et=[{type:12,data:x},{type:12,data:S},{type:12,data:T},{type:12,data:E},{type:12,data:ee},{type:12,data:Math.ceil(k/Q/J)}],er=tP(v.dataType,Q),ei=tN(1,Q),ea=["type"],I&&ea.push("type"),C&&ea.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${J};${er};${Q}`,inputDependencies:ea},getShaderSource:t=>{let r=tH("x",v.dataType,v.dims,Q),i=[r],a=I?tj("seq_lens",I.dataType,I.dims):void 0;a&&i.push(a);let n=C?tj("total_sequence_length_input",C.dataType,C.dims):void 0;n&&i.push(n);let s=tN(v.dataType);return`
  var<workgroup> thread_max: array<f32, ${J}>;
  var<workgroup> thread_sum: array<f32, ${J}>;
  ${t.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...i)}
  ${t.mainStart([J,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${rO(a,n,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${J}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${I?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${ei}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${ei}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(Q){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${Q}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${J}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${ei}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${ei}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(Q){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${Q}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${J}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${r.type.value}(${s}(1.0) / ${s}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${ei}(x[offset + i]);
        x[offset + i] = ${r.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${I?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${r.type.value}(${s}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:E,z:x*S},programUniforms:et})}),{inputs:p&&c?[ev,p,c]:[ev],outputs:[]});let ex=[ev,a];ey>1&&l&&e9.size(l.dims)>0&&ex.push(l),p&&ex.push(p),c&&ex.push(c),t.compute((A=ey,z=ev,O=a,R=l,M=d,B=e_,D=p,P=c,en=B+M.kvSequenceLength,es=M.nReps?M.nReps:1,eo=M.vHiddenSize*es,el=A>1&&R,eu=M.kvNumHeads?M.kvNumHeads:M.numHeads,ed=el?[M.batchSize,eu,en,M.headSize]:void 0,ep=[M.batchSize,M.sequenceLength,eo],ec={x:Math.ceil(M.vHeadSize/12),y:Math.ceil(M.sequenceLength/12),z:M.batchSize*M.numHeads},eh=[{type:12,data:M.sequenceLength},{type:12,data:en},{type:12,data:M.vHeadSize},{type:12,data:M.numHeads},{type:12,data:M.headSize},{type:12,data:eo},{type:12,data:B},{type:12,data:M.kvSequenceLength},{type:12,data:es}],ef=el&&R&&e9.size(R.dims)>0,em=["type","type"],ef&&em.push("type"),D&&em.push("type"),P&&em.push("type"),eg=[{dims:ep,dataType:z.dataType,gpuDataType:0}],el&&eg.push({dims:ed,dataType:z.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==R};${A}`,inputDependencies:em},getRunData:()=>({outputs:eg,dispatchGroup:ec,programUniforms:eh}),getShaderSource:t=>{let r=tj("probs",z.dataType,z.dims),i=[r,tj("v",O.dataType,O.dims)];ef&&i.push(tj("past_value",R.dataType,R.dims));let a=D?tj("seq_lens",D.dataType,D.dims):void 0;D&&i.push(a);let n=P?tj("total_sequence_length_input",P.dataType,P.dims):void 0;P&&i.push(n);let s=[tH("output",z.dataType,ep)];return el&&s.push(tH("present_value",z.dataType,ed)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${r.type.value}, 144>;
  var<workgroup> tileV: array<${r.type.value}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...s)}
  ${t.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===es?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===es?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${rO(a,n,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${ef&&el?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${el?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${r.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${ef&&el?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${el?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}),{inputs:ex,outputs:ey>1?[0,2]:[0]})},rM=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c=((t,r)=>{let i=t[0],a=t[1],n=t[2],s=t[3],o=t[4],l=t[5];if(o&&l)throw Error("Attention cannot have both past and attention_bias");if(3!==i.dims.length)throw Error('Input "input" must have 3 dimensions');let u=i.dims[0],d=i.dims[1],p=i.dims[2];if(1!==n.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==a.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==a.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=n.dims[0]/3,h=c,f=h;if(r.qkvHiddenSizes.length>0){if(3!==r.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let t of r.qkvHiddenSizes)if(t%r.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");c=r.qkvHiddenSizes[0],h=r.qkvHiddenSizes[1],f=r.qkvHiddenSizes[2]}if(c!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==c+h+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(o){if(h!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==o.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==o.dims[0])throw Error('Input "past" first dimension must be 2');if(o.dims[1]!==u)throw Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==r.numHeads)throw Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==h/r.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');r.pastPresentShareBuffer||(m=o.dims[3])}let g=d+m;if(s)throw Error("Mask not supported");if(o)throw Error("past is not supported");if(l){if(4!==l.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==u||l.dims[1]!==r.numHeads||l.dims[2]!==d||l.dims[3]!==g)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:d,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:p,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/r.numHeads),vHeadSize:Math.floor(f/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(t.inputs,r),[h,f,m]=(i=t,n=[(a=c).batchSize,a.numHeads,a.sequenceLength,a.headSize],s=a.sequenceLength,o=a.inputHiddenSize,l=a.headSize,u={x:Math.ceil(a.headSize/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},d=[i.inputs[0],i.inputs[1],i.inputs[2]],p=[{type:12,data:s},{type:12,data:o},{type:12,data:l},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:a.hiddenSize},{type:12,data:a.hiddenSize+a.hiddenSize+a.vHiddenSize}],i.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:i.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:t=>{let r=tH("output_q",d[0].dataType,n),i=tH("output_k",d[0].dataType,n),a=tH("output_v",d[0].dataType,n),s=tj("input",d[0].dataType,d[0].dims),o=tj("weight",d[1].dataType,d[1].dims),l=tj("bias",d[2].dataType,d[2].dims),u=s.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${u}, 144>;
  var<workgroup> tileWeightQ: array<${u}, 144>;
  var<workgroup> tileWeightK: array<${u}, 144>;
  var<workgroup> tileWeightV: array<${u}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(s,o,l,r,i,a)}
  ${t.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${u}(0);
    var valueK = ${u}(0);
    var valueV = ${u}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:d,outputs:[-1,-1,-1]}));return rR(t,h,f,m,t.inputs[4],void 0,void 0,void 0,t.inputs[5],c)}}),rP=u(()=>{ed(),eQ(),ta(),tM(),tQ(),rD=(t,r)=>{let i,{inputs:a,outputCount:n}=t,s=(i={...r,outputCount:n},tR(i));if(S.webgpu.validateInputContent&&((t,r)=>{if(!t||5!==t.length)throw Error("BatchNormalization requires 5 inputs");let i=(t,r,i)=>{let a=r.length;if(a!==t.length)throw Error(`${i}: num dimensions != ${a}`);r.forEach((r,a)=>{if(r!==t[a])throw Error(`${i}: dim[${a}] do not match`)})};if(t[0].dims.length>1){let a="NHWC"===r.format?r.spatial?t[0].dims.slice(-1):t[0].dims.slice(-1).concat(t[0].dims.slice(1,t[0].dims.length-1)):t[0].dims.slice(1,r.spatial?2:void 0);i(t[1].dims,a,"Invalid input scale"),i(t[2].dims,a,"Invalid input B"),i(t[3].dims,a,"Invalid input mean"),i(t[4].dims,a,"Invalid input var")}else i(t[1].dims,[1],"Invalid input scale"),i(t[2].dims,[1],"Invalid input B"),i(t[3].dims,[1],"Invalid input mean"),i(t[4].dims,[1],"Invalid input var")})(a,s),r.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");t.compute(((t,r)=>{let{epsilon:i,spatial:a,format:n}=r,s=t[0].dims,o=a?tL(s[s.length-1]):1,l="NHWC"===n&&s.length>1?o:1,u=e9.size(s)/o,d=a?s.length:s,p=tj("x",t[0].dataType,t[0].dims,o),c=tj("scale",t[1].dataType,t[1].dims,l),h=tj("bias",t[2].dataType,t[2].dims,l),f=tj("inputMean",t[3].dataType,t[3].dims,l),m=tj("inputVar",t[4].dataType,t[4].dims,l),g=tH("y",t[0].dataType,d,o);return{name:"BatchNormalization",shaderCache:{hint:`${r.epsilon}_${r.format}_${a}_${o}`,inputDependencies:a?["rank","type","type","type","type"]:void 0},getShaderSource:t=>`
  const epsilon = ${i};
  ${t.registerUniform("outputSize","u32").declareVariables(p,c,h,f,m,g)}
  ${t.mainStart()}
  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${(()=>{let t="";if(a)t=`let cOffset = ${1===s.length?"0u":"NHWC"===n?`outputIndices[${s.length-1}] / ${o}`:"outputIndices[1]"};`;else if("NCHW"===n)t=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{t=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let r=1;r<c.rank;r++)t+=`cIndices[${r}] = outputIndices[${r}];`;t+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return t})()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:a?[{type:12,data:u},...tU(s)]:[{type:12,data:u}]})}})(a,s))}}),rU=u(()=>{ta(),tQ(),rN=t=>{var r;let i,a,n,s,o,l,u,d;(t=>{if(3!==t[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(t[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==t[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw Error("last dimension of input and bias are not the same")})(t.inputs),t.compute((i=(r=t.inputs)[0].dims,a=r[0].dims[2],n=e9.size(i)/4,s=r[0].dataType,o=tj("input",s,i,4),l=tj("bias",s,[a],4),u=tj("residual",s,i,4),d=tH("output",s,i,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:t=>`
  const channels = ${a}u / 4;
  ${t.declareVariables(o,l,u,d)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${o.getByOffset("global_idx")}
      + ${l.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}))}}),iw=u(()=>{eQ(),ta(),tM(),tQ(),rL=(t,r,i,a,n,s=t.dataType,o,l)=>{let u=[{type:12,data:Math.ceil(e9.size(t.dims)/4)}];return o&&u.push(...o),{name:r,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:r=>{var n,o,u,d,p,c,h;let f,m,g,y,_;return n=r,o=e9.size(t.dims),u=t.dataType,d=s,p=i,c=a,h=l,f=Math.ceil(o/4),m="",m="string"==typeof p?`${p}(a)`:p("a"),g=tj("inputData",u,[f],4),y=tH("outputData",d,[f],4),_=[{name:"vec_size",type:"u32"}],h&&_.push(...h),`
      ${n.registerUniforms(_).declareVariables(g,y)}

  ${c??""}

  ${n.mainStart()}
    ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${g.getByOffset("global_idx")};
    ${y.setByOffset("global_idx",m)}
  }`},getRunData:r=>({outputs:[{dims:t.dims,dataType:s}],dispatchGroup:{x:Math.ceil(e9.size(r[0].dims)/64/4)},programUniforms:u})}},rF=t=>{t.compute(rL(t.inputs[0],"Abs","abs"))},rV=t=>{t.compute(rL(t.inputs[0],"Acos","acos"))},rq=t=>{t.compute(rL(t.inputs[0],"Acosh","acosh"))},rG=t=>{t.compute(rL(t.inputs[0],"Asin","asin"))},rW=t=>{t.compute(rL(t.inputs[0],"Asinh","asinh"))},rj=t=>{t.compute(rL(t.inputs[0],"Atan","atan"))},rH=t=>{t.compute(rL(t.inputs[0],"Atanh","atanh"))},rK=t=>tR(t),rZ=(t,r)=>{let i;switch(r.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${r.to}`)}t.compute(rL(t.inputs[0],"Cast",i,void 0,r.cacheKey,r.to))},rY=(t,r)=>{let i=r||(t=>{let r,i,a=t.length>=2&&0!==t[1].data,n=t.length>=3&&0!==t[2].data;switch(t[0].dataType){case 1:r=a?t[1].getFloat32Array()[0]:-34028234663852886e22,i=n?t[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:r=a?t[1].getUint16Array()[0]:64511,i=n?t[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return tR({min:r,max:i})})(t.inputs),a=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Clip",t=>`clamp(${t}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:t.inputs[0].dataType,data:i.min},{type:t.inputs[0].dataType,data:i.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},rX=t=>{t.compute(rL(t.inputs[0],"Ceil","ceil"))},rQ=t=>{t.compute(rL(t.inputs[0],"Cos","cos"))},rJ=t=>{t.compute(rL(t.inputs[0],"Cosh","cosh"))},r0=t=>tR(t),r1=(t,r)=>{let i=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${i}(${r.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,r.cacheKey))},r2=(t="f32")=>`
const r0: ${t} = 0.3275911;
const r1: ${t} = 0.254829592;
const r2: ${t} = -0.284496736;
const r3: ${t} = 1.421413741;
const r4: ${t} = -1.453152027;
const r5: ${t} = 1.061405429;

fn erf_vf32(v: vec4<${t}>) -> vec4<${t}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,r3=t=>{let r=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Erf",t=>`erf_vf32(${t})`,r2(r)))},r4=t=>{t.compute(rL(t.inputs[0],"Exp","exp"))},r6=t=>{t.compute(rL(t.inputs[0],"Floor","floor"))},r8=t=>{let r=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Gelu",t=>`0.5 * ${t} * (1.0 + erf_vf32(${t} * 0.7071067811865475))`,r2(r)))},r5=(t,r)=>{let i=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${r.alpha});`,r.cacheKey))},r7=t=>{t.compute(rL(t.inputs[0],"Not",t=>`!${t}`))},r9=t=>{t.compute(rL(t.inputs[0],"Neg",t=>`-${t}`))},ie=t=>{t.compute(rL(t.inputs[0],"Reciprocal",t=>`1.0/${t}`))},it=t=>{let r=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Relu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > vec4<${r}>(0.0))`))},ir=t=>{t.compute(rL(t.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ii=t=>tR(t),ia=(t,r)=>{let i=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"HardSigmoid",t=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${r.alpha} * ${t} + vec4<${i}>(${r.beta})))`,void 0,r.cacheKey))},is=t=>{t.compute(rL(t.inputs[0],"Sin","sin"))},io=t=>{t.compute(rL(t.inputs[0],"Sinh","sinh"))},il=t=>{t.compute(rL(t.inputs[0],"Sqrt","sqrt"))},iu=t=>{t.compute(rL(t.inputs[0],"Tan","tan"))},id=t=>`sign(${t}) * (1 - exp(-2 * abs(${t}))) / (1 + exp(-2 * abs(${t})))`,ip=t=>{t.compute(rL(t.inputs[0],"Tanh",id))},ic=(t="f32")=>`
const fast_gelu_a: ${t} = 0.5;
const fast_gelu_b: ${t} = 0.7978845608028654;
const fast_gelu_c: ${t} = 0.035677408136300125;

fn tanh_v(v: vec4<${t}>) -> vec4<${t}> {
  return ${id("v")};
}
`,ih=t=>`(fast_gelu_a + fast_gelu_a * tanh_v(${t} * (fast_gelu_c * ${t} * ${t} + fast_gelu_b))) * ${t}`,im=t=>{let r=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"FastGelu",ih,ic(r),void 0,t.inputs[0].dataType))},ig=(t,r)=>{let i=tN(t.inputs[0].dataType);return t.compute(rL(t.inputs[0],"ThresholdedRelu",t=>`select(vec4<${i}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${r.alpha});`,r.cacheKey)),0},iy=t=>{t.compute(rL(t.inputs[0],"Log","log"))},i_=t=>`quick_gelu_impl(${t})`,ib=(t,r)=>{let i,a,n=tN(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"QuickGelu",i_,(i=n,a=r.alpha,`
const alpha = vec4<${i}>(${a});
const one = ${i}(1.0);
const zero = ${i}(0.0);

fn quick_gelu_impl(x: vec4<${i}>) -> vec4<${i}> {
  let v = x *alpha;
  var x1 : vec4<${i}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),r.cacheKey,t.inputs[0].dataType))}}),iv=u(()=>{ta(),tQ(),iw(),i$=t=>{var r;let i,a,n,s,o,l;(t=>{if(3!==t[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(t[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==t[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw Error("last dimension of input and bias are not the same")})(t.inputs),t.compute(((i=(r=t.inputs)[0].dims.slice())[2]=i[2]/2,a=tj("input",r[0].dataType,r[0].dims,4),n=tj("bias",r[0].dataType,[r[0].dims[2]],4),s=tH("output",r[0].dataType,i,4),o=e9.size(i)/4,l=tP(r[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${t.declareVariables(a,n,s)}

  ${r2(l)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${s.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),iM=u(()=>{eQ(),ta(),tQ(),ix=(t,r,i,a,n,s)=>{t.compute(((t,r,i,a,n,s,o=i.dataType)=>{let l=i.dims.map(Number),u=a.dims.map(Number),d=!e9.areEqual(l,u),p=l,c=e9.size(l),h=!1,f=!1,m=[d];if(d){let t=e7.calcShape(l,u,!1);if(!t)throw Error("Can't perform binary op on the given tensors");p=t.slice(),c=e9.size(p);let r=1===e9.size(l),i=1===e9.size(u),a=l.length>0&&l[l.length-1]%4==0,n=u.length>0&&u[u.length-1]%4==0;m.push(r),m.push(i),m.push(a),m.push(n);let s=1;for(let t=1;t<p.length;t++){let r=l[l.length-t];if(r===u[u.length-t])s*=r;else break}s%4==0?(f=!0,h=!0):(r||i||a||n)&&(h=!0)}else h=!0;return m.push(h),{name:t,shaderCache:{hint:r+m.map(t=>t.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:t=>((t,r,i,a,n,s,o,l,u,d,p,c)=>{let h,f;"string"==typeof l?h=f=(t,r)=>`${l}((${t}),(${r}))`:"function"==typeof l?h=f=l:(h=l.scalar,f=l.vector);let m=tH("outputData",p,a.length,4),g=tj("aData",u,r.length,4),y=tj("bData",d,i.length,4),_;if(n)if(s){let t=1===e9.size(r),a=1===e9.size(i),n=r.length>0&&r[r.length-1]%4==0,s=i.length>0&&i[i.length-1]%4==0;_=t||a?m.setByOffset("global_idx",f(t?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),a?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(o||n?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||s?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!s)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let t=(t,r,i="")=>{let a=`aData[indexA${r}][componentA${r}]`,n=`bData[indexB${r}][componentB${r}]`;return`
            let outputIndices${r} = ${m.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offsetA${r} = ${g.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let offsetB${r} = ${y.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let indexA${r} = offsetA${r} / 4u;
            let indexB${r} = offsetB${r} / 4u;
            let componentA${r} = offsetA${r} % 4u;
            let componentB${r} = offsetB${r} % 4u;
            ${t}[${r}] = ${i}(${h(a,n)});
          `};_=9===p?`
            var data = vec4<u32>(0);
            ${t("data",0,"u32")}
            ${t("data",1,"u32")}
            ${t("data",2,"u32")}
            ${t("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${t("outputData[global_idx]",0)}
            ${t("outputData[global_idx]",1)}
            ${t("outputData[global_idx]",2)}
            ${t("outputData[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(g,y,m)}

        ${c??""}

        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`})(t,l,u,p,h,d,f,n,i.dataType,a.dataType,o,s),getRunData:()=>({outputs:[{dims:p,dataType:o}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(e9.size(p)/4)},...tU(l,u,p)]})}})(r,n??"",t.inputs[0],t.inputs[1],i,a,s))},iS=t=>{ix(t,"Add",(t,r)=>`${t}+${r}`)},iT=t=>{ix(t,"Div",(t,r)=>`${t}/${r}`)},iE=t=>{ix(t,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ik=t=>{ix(t,"Mul",(t,r)=>`${t}*${r}`)},iI=t=>{let r=tj("input",t.inputs[0].dataType,t.inputs[0].dims).type.value;ix(t,"Pow",{scalar:(t,r)=>`pow_custom(${t},${r})`,vector:(t,r)=>`pow_vector_custom(${t},${r})`},`
    fn pow_custom(a : ${r}, b : ${r}) -> ${r} {
      if (b == ${r}(0.0)) {
        return ${r}(1.0);
      } else if (a < ${r}(0.0) && f32(b) != floor(f32(b))) {
        return ${r}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${r}(1.0), round(f32(abs(b) % ${r}(2.0))) != 1.0) * ${r}(${"i32"===r?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${r}>, b : vec4<${r}>) -> vec4<${r}> {
      // TODO: implement vectorized pow
      return vec4<${r}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},iC=t=>{ix(t,"Sub",(t,r)=>`${t}-${r}`)},iA=t=>{ix(t,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},iz=t=>{ix(t,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},iO=t=>{ix(t,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},iR=t=>{ix(t,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),iP=u(()=>{eQ(),ta(),tM(),tQ(),iB=(t,r)=>{let i=t.inputs,a=i[0].dims,n=e9.normalizeAxis(r.axis,a.length);var s=i,o=n;if(!s||s.length<1)throw Error("too few inputs");let l=s[0],u=l.dataType,d=l.dims.length;s.forEach((t,r)=>{if(0!==r){if(t.dataType!==u)throw Error("input tensors should be one type");if(t.dims.length!==d)throw Error("input tensors should have the same shape");t.dims.forEach((t,r)=>{if(r!==o&&t!==l.dims[r])throw Error("non concat dimensions must match")})}});let p=a.slice();p[n]=i.reduce((t,r)=>t+(r.dims.length>n?r.dims[n]:0),0);let c=i.filter(t=>e9.size(t.dims)>0);t.compute(((t,r,i,a)=>{let n=e9.size(i),s=Array(t.length),o=Array(t.length),l=0,u=[],d=[],p=[{type:12,data:n}];for(let i=0;i<t.length;++i)l+=t[i].dims[r],s[i]=l,d.push(t[i].dims.length),o[i]=tj(`input${i}`,a,d[i]),u.push("rank"),p.push({type:12,data:s[i]});for(let r=0;r<t.length;++r)p.push(...tU(t[r].dims));p.push(...tU(i));let c=tH("output",a,i.length),h=c.indicesGet("indices",r),f=Array.from(Array(s.length).keys()).map(t=>`uniforms.sizeInConcatAxis${t}`).join(",");return{name:"Concat",shaderCache:{hint:`${r}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:r=>{let i,a;return`

  ${(()=>{r.registerUniform("outputSize","u32");for(let i=0;i<t.length;i++)r.registerUniform(`sizeInConcatAxis${i}`,"u32");return r.declareVariables(...o,c)})()}

  ${i=s.length,a=f,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${i}u>(${a});
    for (var i: u32 = 0u; i < ${i}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${i}u;
  }`}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((t,r)=>{let i=t.length,a=[];for(let n=0;n<i;++n){let s=r.setByOffset("global_idx",t[n].getByIndices("indices"));1===i?a.push(s):0===n?a.push(`if (inputIndex == ${n}u) { ${s} }`):n===i-1?a.push(`else { ${s} }`):a.push(`else if (inputIndex == ${n}) { ${s} }`)}return a.join(`
`)})(o,c)}
  }`}}})(c,n,p,i[0].dataType),{inputs:c})},iD=t=>tR({axis:t.axis})}),iV=u(()=>{eQ(),ta(),iN=(t,r,i="f32")=>{switch(t.activation){case"Relu":return`value = max(value, ${r}(0.0));`;case"Sigmoid":return`value = (${r}(1.0) / (${r}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${r}(${i}(uniforms.clip_min)), ${r}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${r}(0.0), min(${r}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${r}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${t.activation}`)}},iU=(t,r)=>{"Clip"===t.activation?r.push({type:1,data:t.clipMax},{type:1,data:t.clipMin}):"HardSigmoid"===t.activation?r.push({type:1,data:t.alpha},{type:1,data:t.beta}):"LeakyRelu"===t.activation&&r.push({type:1,data:t.alpha})},iL=(t,r)=>{"Clip"===t.activation?r.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===t.activation?r.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===t.activation&&r.push({name:"alpha",type:"f32"})},iF=t=>{let r=t?.activation||"";if("HardSigmoid"===r){let[i,a]=t?.activation_params||[.2,.5];return{activation:r,alpha:i,beta:a}}if("Clip"===r){let[i,a]=t?.activation_params||[tr,ti];return{activation:r,clipMax:a,clipMin:i}}if("LeakyRelu"===r){let[i]=t?.activation_params||[.01];return{activation:r,alpha:i}}return{activation:r}}}),iW=u(()=>{iq=(t,r)=>{switch(t){case 1:return r;case 2:return`vec2<${r}>`;case 3:return`vec3<${r}>`;case 4:return`vec4<${r}>`;default:throw Error(`${t}-component is not supported.`)}},iG=t=>`
      ${t?"value = value + getBiasByOutputCoords(coords);":""}
      `}),iH=u(()=>{ij=t=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${t}.x), i32(${t}.y), i32(${t}.z), 1));
}
`}),iY=u(()=>{eQ(),ta(),tQ(),iV(),iK=(t,r,i,a,n)=>{let s=a-i;return`
      ${Array.from({length:i}).map((i,o)=>`
      if (${tG(r.shape,o,r.rank)} != 1) {
        ${r.indicesSet(t,o,tG(n,o+s,a))}
      } else {
        ${r.indicesSet(t,o,0)}
      }`).join("")}
`},iZ=(t,r,i,a,n=!1,s)=>{let o=t[0].dims,l=t[1].dims,u=o[o.length-2],d=l[l.length-1],p=o[o.length-1],c=tL(d),h=tL(p),f=tL(u),m=e9.size(i)/c/f,g=t.length>2,y=a?a.slice(0,-2):i.slice(0,-2),_=[e9.size(y),u,d],b=[{type:12,data:m},{type:12,data:u},{type:12,data:d},{type:12,data:p}];return iU(r,b),b.push(...tU(y,o,l)),g&&b.push(...tU(t[2].dims)),b.push(...tU(_)),{name:"MatMulNaive",shaderCache:{hint:`${r.activation};${c};${h};${f};${n}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:a=>{let s=tZ("batch_dims",t[0].dataType,y.length),u=tj("a",t[0].dataType,o.length,h),d=tj("b",t[1].dataType,l.length,c),p=tH("output",t[0].dataType,_.length,c),m=tP(p.type.tensor),b=iN(r,p.type.value,m),w=[u,d],$="";if(g){let r=n?c:1;w.push(tj("bias",t[2].dataType,t[2].dims.length,r)),$=`${n?`value += bias[col / ${r}];`:`value += ${p.type.value}(bias[row + i]);`}`}let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return iL(r,v),`
  ${a.registerUniforms(v).registerInternalVariables(s).declareVariables(...w,p)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===i.length?"":`let batch_indices = ${s.offsetToIndices("batch")};`}

    var a_indices: ${u.type.indices};
    ${iK("a_indices",u,u.rank-2,s.rank,"batch_indices")}
    ${u.indicesSet("a_indices",u.rank-2,0)}
    ${u.indicesSet("a_indices",u.rank-1,0)}
    let a_offset = ${u.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${iK("b_indices",d,d.rank-2,s.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${(()=>{let t=`var a_data: ${u.type.value};`;for(let r=0;r<h;r++)t+=`
              let b_data${r} = b[(b_offset + (k + ${r}) * uniforms.N + col) / ${c}];`;for(let r=0;r<f;r++){t+=`a_data = a[(a_offset + (row + ${r}) * uniforms.K + k) / ${h}];`;for(let i=0;i<h;i++)t+=`
            values[${r}] = fma(${d.type.value}(a_data${1===h?"":`[${i}]`}), b_data${i}, values[${r}]);
`}return t})()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${$}
      ${b}
      let cur_indices = ${p.type.indices}(batch, row + i, col);
      let offset = ${p.indicesToOffset("cur_indices")};
      ${p.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `}}}}),i1=u(()=>{eQ(),ta(),tQ(),iV(),iY(),iW(),iX=(t,r,i="f32",a,n=!1,s=32,o=!1,l=32)=>{let u,d,p,c,h=r[1]*t[1],f=r[0]*t[0],m=n?h:s,g=n?s:h,y=m/r[0],_=s/r[1];if(!((n&&4===y&&4===t[1]||!n&&(3===y||4===y))&&m%r[0]==0&&s%r[1]==0&&4===t[0]))throw Error(`If transposeA ${n} is true, innerElementSize ${y} and workPerThread[1] ${t[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${r[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${r[1]}. colPerThread ${t[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${i}>, ${m/y}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${f/t[0]}>, ${s}>;

const rowPerThread = ${t[1]};
const colPerThread = ${t[0]};
const innerElementSize = ${y};
const tileInner = ${s};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${h};

  let num_tiles = ${o?`${Math.ceil(l/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${u=n,d=a,u?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${d?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${d?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===y?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${p=n,c=y,p?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===c?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},iQ=(t,r)=>t?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${r?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${r?", batchIndices":""});
            `,iJ=(t,r,i="f32",a,n=!1,s=32,o=!1,l=32,u=!1)=>{let d=t[1]*r[1],p=t[0]*r[0],c=n?d:s,h=n?s:d;if(h%r[1]!=0||c%r[0]!=0||s%r[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${r[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${r[0]}, tileInner ${s} must be divisible by workgroupSize[1]${r[1]}`);let f=h/r[1],m=c/r[0],g=s/r[1],y=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${r[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${r[0]}) {
          ${iQ(n,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${r[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${r[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${r[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${r[1]}];`:`mm_Asub[localRow + innerRow * ${r[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${r[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${r[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${iQ(n,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${n?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${c}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${p}>, ${s}>;
  const rowPerThread = ${t[1]};
  const colPerThread = ${t[0]};
  const tileInner = ${s};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(l/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${y}
  }
`},i0=(t,r,i,a,n=!1,s)=>{let o=t[0].dims,l=t[1].dims,u=o.slice(0,-2),d=l.slice(0,-2),p=a?a.slice(0,-2):i.slice(0,-2),c=e9.size(p),h=o[o.length-2],f=o[o.length-1],m=l[l.length-1],g=f%4==0&&m%4==0,y=h<=8?[4,1,1]:[4,4,1],_=[8,8,1],b=[Math.ceil(m/_[0]/y[0]),Math.ceil(h/_[1]/y[1]),Math.ceil(c/_[2]/y[2])],w=g?4:1,$=[...u,h,f/w],v=$.length,x=[...d,f,m/w],S=x.length,T=[c,h,m/w],E=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];iU(r,E),E.push(...tU(p,$,x));let k=["rank","rank"],I=t.length>2;return I&&(E.push(...tU(t[2].dims)),k.push("rank")),E.push(...tU(T)),{name:"MatMul",shaderCache:{hint:`${y};${r.activation};${g};${n}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:s?s(i):i,dataType:t[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:E}),getShaderSource:i=>{let a=p.length,s=tZ("batchDims",t[0].dataType,a,1),o=tP(t[0].dataType),l=tj("a",t[0].dataType,v,w),u=tj("b",t[1].dataType,S,w),d=tH("result",t[0].dataType,T.length,w),c=[l,u];if(I){let r=n?w:1;c.push(tj("bias",t[2].dataType,t[2].dims.length,r))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];iL(r,h);let f=tP(d.type.tensor),m=((t,r,i,a,n=!1)=>{let[s,o,l,u]=a,d=tP(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${iq(t,d)} {
      var value = ${iq(t,d)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${iK("aIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${iq(t,d)} {
      var value = ${iq(t,d)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${iK("bIndices",l,l.rank-2,s.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${iq(t,d)}) {
      let col = colIn * ${t};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${r?`value = value + ${n?"bias[colIn]":`${iq(t,d)}(bias[row])`};`:""}
        ${i}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})(w,I,iN(r,d.type.value,f),[s,l,u,d],n);return`
  ${i.registerUniforms(h).registerInternalVariables(s).declareVariables(...c,d)}
  ${m}
  ${g?iX(y,_,o,s):iJ(y,_,o,s)}
                   `}}}}),i3=u(()=>{eQ(),e8(),tQ(),iV(),iW(),iH(),i1(),i2=(t,r,i,a,n,s,o,l,u)=>{let d="NHWC"===r.format,p=d?t[0].dims[3]:t[0].dims[1],c=i[0],h=d?i[2]:i[3],f=d?i[1]:i[2],m=d?i[3]:i[1],g=d&&(p%4==0||p%3==0)&&m%4==0,y=d?m:h*f,_=d?h*f:m,b=[8,8,1],w=a<=8?[4,1,1]:[4,4,1],$=[Math.ceil(y/b[0]/w[0]),Math.ceil(_/b[1]/w[1]),Math.ceil(c/b[2]/w[2])];e6("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${$}`);let v=g?d&&p%4!=0?3:4:1,x=b[1]*w[1],S=b[0]*w[0],T=Math.max(b[0]*v,b[1]),E=a%x==0,k=n%S==0,I=s%T==0,C=g?[v,4,4]:[1,1,1],A=[{type:6,data:a},{type:6,data:n},{type:6,data:s},{type:6,data:[r.pads[0],r.pads[1]]},{type:6,data:r.strides},{type:6,data:r.dilations}];iU(r,A),A.push(...tU(t[0].dims,t[1].dims));let z=["rank","rank"];return o&&(A.push(...tU(t[2].dims)),z.push("rank")),A.push(...tU(i)),{name:"Conv2DMatMul",shaderCache:{hint:`${r.cacheKey};${v};${g};${E};${k};${I};${x};${S};${T}`,inputDependencies:z},getRunData:()=>({outputs:[{dims:u?u(i):i,dataType:t[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:A}),getShaderSource:a=>{let n=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];iL(r,n);let s=g?4:1,u=tP(t[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${u}>`:u}) {
        result[flatIndex] = ${g?`vec4<${u}>`:u}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${u}>`:u}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,c=[tj("x",t[0].dataType,t[0].dims.length,3===v?1:v),tj("w",t[1].dataType,t[1].dims.length,s)],h=tH("result",t[0].dataType,i.length,s);if(o){let r=tj("bias",t[2].dataType,t[2].dims.length,s);c.push(r),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${u}>`:u} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${ij("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${a.registerUniforms(n).declareVariables(...c,h)}
        ${p}
        ${((t,r,i,a,n=!1,s,o=4,l=4,u=4,d="f32")=>{let p=t=>{switch(t){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${t} is not supported.`)}},c=t?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=t?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,f=t?"row":"col",m=t?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${f} / outWidth;
    let outCol = ${f} % outWidth;

    let WRow = ${m} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${m} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${m} % inChannels;
    var resData = ${iq(o,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(t=>{switch(t){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${t} is not supported.`)}})(o)}
    }
    return resData;`,y=t?r&&a?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${iq(o,d)}(0.0);`:a&&i?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${iq(o,d)}(0.0);`,_=t?a&&i?p(l):`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(l)}
    }
    return ${iq(l,d)}(0.0);`:`
    let col = colIn * ${l};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(l)}
    }
    return ${iq(l,d)}(0.0);`,b=iq(u,d),w=t?iq(o,d):iq(l,d),$=t?iq(l,d):iq(o,d),v=iN(s,b,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${w} {
      ${t?y:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${t?_:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${b}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${iG(n)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(d,E,k,I,o,r,C[0],C[1],C[2],u)}
        ${g?iX(w,b,u,void 0,!d,T):iJ(w,b,u,void 0,!d,T,!1,void 0,l)}`}}}}),i9=u(()=>{eQ(),e8(),ta(),tQ(),iV(),iW(),i4=t=>"number"==typeof t?[t,t,t]:t,i6=(t,r)=>r<=1?t:t+(t-1)*(r-1),i8=(t,r,i,a,n)=>{null==n&&(n=((t,r,i,a=1)=>{let n=i6(r,a);return Math.floor((t[0]*(i-1)-i+n)/2)})(t,r[0],a[0]));let s=[0,0,0,i];for(let i=0;i<3;i++)t[i]+2*n>=r[i]&&(s[i]=Math.trunc((t[i]-r[i]+2*n)/a[i]+1));return s},i5=(t,r,i,a,n,s=!1,o="channelsLast")=>{let l,u,d,p,c;if("channelsLast"===o)[l,u,d,p,c]=t;else if("channelsFirst"===o)[l,c,u,d,p]=t;else throw Error(`Unknown dataFormat ${o}`);let[h,,f,m,g]=r,[y,_,b]=i4(i),[w,$,v]=i4(a),x=i6(f,w),S=i6(m,$),T=i6(g,v),{padInfo:E,outDepth:k,outHeight:I,outWidth:C}=((t,r,i,a,n,s,o,l,u,d)=>{let p,c,h,f;if("VALID"===t&&(t=0),"number"==typeof t){p={top:t,bottom:t,left:t,right:t,front:t,back:t};let m=i8([r,i,a,1],[l,u,d],1,[n,s,o],t);c=m[0],h=m[1],f=m[2]}else if(Array.isArray(t)){if(!t.every((t,r,i)=>t===i[0]))throw Error(`Unsupported padding parameter: ${t}`);p={top:t[0],bottom:t[1],left:t[2],right:t[3],front:t[4],back:t[5]};let m=i8([r,i,a,1],[l,u,d],1,[n,s,o],t[0]);c=m[0],h=m[1],f=m[2]}else if("SAME_UPPER"===t){c=Math.ceil(r/n),h=Math.ceil(i/s),f=Math.ceil(a/o);let t=(c-1)*n+l-r,m=(h-1)*s+u-i,g=(f-1)*o+d-a,y=Math.floor(t/2),_=Math.floor(m/2),b=Math.floor(g/2);p={top:_,bottom:m-_,left:b,right:g-b,front:y,back:t-y}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:p,outDepth:c,outHeight:h,outWidth:f}})(n,u,d,p,y,_,b,x,S,T),A=s?h*c:h,z=[0,0,0,0,0];return"channelsFirst"===o?z=[l,A,k,I,C]:"channelsLast"===o&&(z=[l,k,I,C,A]),{batchSize:l,dataFormat:o,inDepth:u,inHeight:d,inWidth:p,inChannels:c,outDepth:k,outHeight:I,outWidth:C,outChannels:A,padInfo:E,strideDepth:y,strideHeight:_,strideWidth:b,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:x,effectiveFilterHeight:S,effectiveFilterWidth:T,dilationDepth:w,dilationHeight:$,dilationWidth:v,inShape:t,outShape:z,filterShape:r}},i7=(t,r,i,a,n,s)=>{let o="channelsLast"===s,l=[Math.ceil((t=>{let r=1;for(let i=0;i<t.length;i++)r*=t[i];return r})((o?t[0].dims[3]:t[0].dims[1],{x:i.map((t,r)=>r)}).x.map(t=>i[t]))/64),1,1];e6("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${l}`);let u=[{type:12,data:e9.size(i)},{type:12,data:a},{type:12,data:n},{type:12,data:r.strides},{type:12,data:r.dilations}];iU(r,u),u.push(...tU(t[0].dims,t[1].dims));let d=["rank","rank"],p=3===t.length;return p&&(u.push(...tU(t[2].dims)),d.push("rank")),u.push(...tU(i)),{name:"Conv3DNaive",shaderCache:{hint:`${r.cacheKey};${o};1;${p}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:l[0],y:l[1],z:l[2]},programUniforms:u}),getShaderSource:s=>{let l=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:r.strides.length},{name:"dilations",type:"u32",length:r.dilations.length}];iL(r,l);let u=tP(t[0].dataType),d=tj("x",t[0].dataType,t[0].dims.length,1),c=tj("W",t[1].dataType,t[1].dims.length,1),h=[d,c],f=tH("result",t[0].dataType,i.length,1),m="";if(p){let r=tj("bias",t[2].dataType,t[2].dims.length,1);h.push(r),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u} {
          return bias[${o?tG("coords",4,5):tG("coords",1,5)}];
        }`}let g=iq(1,u),y=iN(r,g,u);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${d.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${c.getByIndices("aIndices")};
            }
          ${s.registerUniforms(l).declareVariables(...h,f)}
          ${s.mainStart()}
          ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${f.offsetToIndices("global_idx")};
              let batch = ${tG("coords",0,d.rank)};
              let d2 = ${o?tG("coords",d.rank-1,d.rank):tG("coords",1,d.rank)};
              let xFRCCorner = vec3<u32>(${o?tG("coords",1,d.rank):tG("coords",2,d.rank)},
              ${o?tG("coords",2,d.rank):tG("coords",3,d.rank)},
              ${o?tG("coords",3,d.rank):tG("coords",4,d.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?tG("uniforms.x_shape",1,d.rank):tG("uniforms.x_shape",2,d.rank)};
              let xShapeZ = ${o?tG("uniforms.x_shape",2,d.rank):tG("uniforms.x_shape",3,d.rank)};
              let xShapeW = ${o?tG("uniforms.x_shape",3,d.rank):tG("uniforms.x_shape",4,d.rank)};
              let xShapeU = ${o?tG("uniforms.x_shape",4,d.rank):tG("uniforms.x_shape",1,d.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${p?"value = value + getBiasByOutputCoords(coords)":""};
              ${y}
              result[global_idx] = f32(value);
          }`}}}}),ar=u(()=>{eQ(),ta(),tQ(),iV(),ae=(t,r,i,a)=>{let n=t.length>2,s=n?"value += b[output_channel];":"",o=t[0].dims,l=t[1].dims,u="NHWC"===r.format,d=u?i[3]:i[1],p=d/r.group,c=u&&p>=4?tL(d):1,h=e9.size(i)/c,f=[{type:12,data:h},{type:12,data:r.dilations},{type:12,data:[r.strides[0],r.strides[1]]},{type:12,data:[r.pads[0],r.pads[1]]},{type:12,data:p}];return iU(r,f),f.push(...tU(o,[l[0],l[1],l[2],l[3]/c])),f.push(...tU([i[0],i[1],i[2],i[3]/c])),{name:"GroupedConv",shaderCache:{hint:`${r.cacheKey}_${c}`,inputDependencies:n?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(i):i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:a=>{let d=tH("output",t[0].dataType,i.length,c),p=tP(d.type.tensor),h=iN(r,d.type.value,p),f=tj("x",t[0].dataType,o.length),m=tj("w",t[1].dataType,l.length,c),g=[f,m];n&&g.push(tj("b",t[2].dataType,t[2].dims,c));let y=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:r.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];iL(r,y);let _=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${f.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${m.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${f.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${m.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${a.registerUniforms(y).declareVariables(...g,d)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${d.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${d.type.value} = ${d.type.value}(0);
    ${_}
    ${s}
    ${h}
    ${d.setByOffset("global_idx","value")}
  }`}}},at=(t,r,i,a)=>{let n=t.length>2,s=tL(i[3]),o=tL(i[2]),l=e9.size(i)/s/o,u=[t[0].dims[0],t[0].dims[1],t[0].dims[2],t[0].dims[3]/s],d=[t[1].dims[0],t[1].dims[1],t[1].dims[2],t[1].dims[3]/s],p=[i[0],i[1],i[2],i[3]/s],c=[{type:12,data:l},{type:6,data:[r.strides[0],r.strides[1]]},{type:6,data:[r.pads[0],r.pads[1]]}];iU(r,c),c.push(...tU(u,d,p));let h=(o-1)*r.strides[1]+d[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${r.cacheKey};${s};${o};${h};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(i):i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:i=>{let a=tH("output",t[0].dataType,p.length,s),l=tP(a.type.tensor),c=iN(r,a.type.value,l),f=tj("x",t[0].dataType,u.length,s),m=tj("w",t[1].dataType,d.length,s),g=[f,m];n&&g.push(tj("b",t[2].dataType,t[2].dims,s));let y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return iL(r,y),`
  ${i.registerUniforms(y).declareVariables(...g,a)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${h}>;
    var values: array<${a.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${f.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${f.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${m.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${n?"value += b[output_channel];":""}
      ${c}
      ${a.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),al=u(()=>{ta(),i3(),i9(),i1(),ar(),iV(),iY(),t3(),ai=[2,3,1,0],aa=(t,r)=>{let i=t.kernelShape.slice();i.length<r[1].dims.length-2&&i.push(...Array(r[1].dims.length-2-i.length).fill(0));for(let t=2;t<r[1].dims.length;++t)0===i[t-2]&&(i[t-2]=r[1].dims[t]);let a=t.pads.slice();te.adjustPadsBasedOnAutoPad(r[0].dims,t.strides,t.dilations,i,a,"NHWC"===t.format,t.autoPad);let n=Object.assign({},t);return Object.assign(n,{kernelShape:i,pads:a}),n},an=t=>{let r=iF(t),i=t.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],format:i,dilations:t.dilations,group:t.group,kernelShape:t.kernel_shape,pads:t.pads,strides:t.strides,wIsConst:t.w_is_const(),...r,cacheKey:`${t.format};${r.activation};`}},as=(t,r,i,a)=>{var n,s,o,l,u,d;let p,c,h,f,m,g,y="NHWC"===i.format,_=(n=r[0].dims,s=r[1].dims,o=i.dilations,l=i.pads,u=i.strides,d=y,p=n[0],h=(c=n.slice(d?1:2,d?3:4)).length,f=s[0],m=s.slice(2).map((t,r)=>t+(t-1)*(o[r]-1)),(g=c.map((t,r)=>t+l[r]+l[r+h]).map((t,r)=>Math.floor((t-m[r]+u[r])/u[r]))).splice(0,0,p),g.splice(d?3:1,0,f),g);if(1!==i.group){let n=[r[0]];if(y){let a=t.kernelCustomData.wT??t.compute(t0(r[1],ai),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=a),n.push(a)}else n.push(r[1]);3===r.length&&n.push(r[2]),!t.adapterInfo.isArchitecture("ampere")&&y&&r[1].dims[0]===i.group&&1===r[1].dims[1]&&1===i.dilations[0]&&1===i.dilations[1]?t.compute(at(n,i,_,a),{inputs:n}):t.compute(ae(n,i,_,a),{inputs:n});return}let b=3===r.length,w=r[0].dims[y?1:2],$=r[0].dims[y?2:3],v=r[0].dims[y?3:1],x=r[1].dims[2],S=r[1].dims[3],T=_[y?1:2],E=_[y?2:3],k=_[y?3:1],I=y&&x===w&&S===$&&0===i.pads[0]&&0===i.pads[1];if(I||1===x&&1===S&&1===i.dilations[0]&&1===i.dilations[1]&&1===i.strides[0]&&1===i.strides[1]&&0===i.pads[0]&&0===i.pads[1]){let n=_[0],s,o,l,u=[];if(y){let a=t.kernelCustomData.wT??t.compute(t0(r[1],ai),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=a),I){let t=w*$*v;s=r[0].reshape([1,n,t]),o=a.reshape([1,t,k]),l=[1,n,k]}else s=r[0].reshape([n,w*$,v]),o=a.reshape([1,v,k]),l=[n,T*E,k];u.push(s),u.push(o)}else s=r[0].reshape([n,v,w*$]),o=r[1].reshape([1,k,v]),l=[n,k,T*E],u.push(o),u.push(s);b&&u.push(r[2]);let d=l[2],p=u[0].dims[u[0].dims.length-1];d<8&&p<8?t.compute(iZ(u,i,_,l,y,a),{inputs:u}):t.compute(i0(u,i,_,l,y,a),{inputs:u});return}let C=t.kernelCustomData.wT??t.compute(t0(r[1],ai),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=C);let A=[r[0],C];b&&A.push(r[2]);let z=y?T*E:k,O=y?k:T*E,R=x*S*v;t.compute(i2(A,i,_,z,O,R,b,!0,a),{inputs:A})},ao=(t,r)=>{var i,a,n,s,o;if(((t,r)=>{if(!t||2!==t.length&&3!==t.length)throw Error("Conv requires 2 or 3 inputs");if(t[0].dims.length>5)throw Error("greater than 5D is not supported");if(t[0].dims.length!==t[1].dims.length)throw Error("filter does not have same dimension as input");if(t[0].dims["NHWC"===r.format?t[0].dims.length-1:1]!==t[1].dims[1]*r.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===t.length&&(1!==t[2].dims.length||t[1].dims[0]!==t[2].dims[0]))throw Error("invalid bias");let i=t[0].dims.length-2;if(r.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(r.strides.length!==i)throw Error(`strides should be ${i}D`);if(r.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(0!==r.kernelShape.length&&r.kernelShape.length!==t[1].dims.length-2)throw Error("invalid kernel shape")})(t.inputs,r),3===t.inputs[0].dims.length){let n,s,o,l,u,d,p;i=t,n="NHWC"===(a=r).format,s=[i.inputs[0].reshape(n?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&s.push(i.inputs[2]),o=[0,a.pads[0],0,a.pads[1]],l=[1].concat(a.strides),u=[1].concat(a.dilations),d=[1].concat(a.kernelShape),p=aa({...a,pads:o,strides:l,dilations:u,kernelShape:d},s),as(i,s,p,t=>n?[t[0],t[2],t[3]]:[t[0],t[1],t[3]])}else if(5===t.inputs[0].dims.length){let i,a,l,u;n=t,s=t.inputs,i="NHWC"===(o=r).format?"channelsLast":"channelsFirst",a=aa(o,s),l="NOTSET"===o.autoPad?o.pads:o.autoPad,u=i5(s[0].dims,s[1].dims,o.strides,o.dilations,l,!1,i),n.compute(i7(s,a,u.outShape,[u.filterDepth,u.filterHeight,u.filterWidth],[u.padInfo.front,u.padInfo.top,u.padInfo.left],i))}else{let i=aa(r,t.inputs);as(t,t.inputs,i)}}}),ad=u(()=>{eQ(),e8(),ta(),tQ(),au=(t,r,i)=>{let a=t.length>2,n=r.outputShape,s="NHWC"===r.format,o=r.group,l=t[1].dims,u=l[2]/o,d=l[3],p=s?tL(u):1,c=s&&1===d&&u>=4,h=c?4*Math.floor(u/4):Math.floor(u/p)*p,f=u-h,m=s?tL(d):1,g=s?1===d?p:m:1,y=e9.size(n)/m,_=[Math.ceil(y/64),1,1];e6("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let b=["rank","rank"],w=[r.strides[0],r.strides[1]],$=[r.kernelShape[s?1:2],r.kernelShape[s?2:3]],v=[r.dilations[0],r.dilations[1]],x=[$[0]+(r.dilations[0]<=1?0:(r.kernelShape[s?1:2]-1)*(r.dilations[0]-1)),$[1]+(r.dilations[1]<=1?0:(r.kernelShape[s?2:3]-1)*(r.dilations[1]-1))],S=[x[0]-1-Math.floor((r.pads[0]+r.pads[2])/2),x[1]-1-Math.floor((r.pads[1]+r.pads[3])/2)],T=[{type:12,data:y},{type:12,data:w},{type:12,data:$},{type:12,data:v},{type:12,data:x},{type:6,data:S},{type:12,data:h},{type:12,data:u},{type:12,data:d},...tU(t[0].dims,t[1].dims)];return a&&(T.push(...tU(t[2].dims)),b.push("rank")),T.push(...tU(n)),{name:"ConvTranspose2D",shaderCache:{hint:`${r.cacheKey};${p}${g}${m}${c}${f}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:i?i(n):n,dataType:t[0].dataType}],programUniforms:T}),getShaderSource:r=>{let i=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:w.length},{name:"filter_dims",type:"u32",length:$.length},{name:"dilations",type:"u32",length:$.length},{name:"effective_filter_dims",type:"u32",length:x.length},{name:"pads",type:"i32",length:S.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],o=tP(t[0].dataType),l=s?1:2,u=s?2:3,d=s?3:1,h=tj("W",t[1].dataType,t[1].dims.length,g),y=tj("Dy",t[0].dataType,t[0].dims.length,p),_=[y,h];a&&_.push(tj("bias",t[2].dataType,[n[d]].length,m));let b=tH("result",t[0].dataType,n.length,m),v=`
            let outputIndices = ${b.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${b.indicesGet("outputIndices",0)};
            let d1 = ${b.indicesGet("outputIndices",d)};
            let r = ${b.indicesGet("outputIndices",l)};
            let c = ${b.indicesGet("outputIndices",u)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${b.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${l}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${u}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${h.indicesToOffset(`${h.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${g};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:p}) {
                  ${(()=>{let t="";if(c)4===p?t+=`
        let xValue = ${y.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?t+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(t+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}, ${y.getByOffset("x_offset + 2u")}, ${y.getByOffset("x_offset + 3u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(t+=`
                  let xValue = ${s?y.getByOffset(`${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):y.get("batch","inputChannel","idyR","idyC")};
        `,1===p)t+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let r=0;r<p;r++)t+=`
            let wValue${r} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${r}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${r}] * wValue${r};`;return t})()}
                  inputChannel = inputChannel + ${c?4:p};
                }
                ${(()=>{if(0===f)return"";if(!c)throw Error(`packInputAs4 ${c} is not true.`);let t="";if(1===p){t+="dotProd = dotProd";for(let r=0;r<f;r++)t+=`
            + ${y.getByOffset(`x_offset + ${r}`)} * ${h.getByOffset(`w_offset + ${r}`)}`;t+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);t+=`
          let xValue = ${y.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return t})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${m}]`:""};
            ${b.setByOffset("global_idx","value")};
          `;return`
    ${r.registerUniforms(i).declareVariables(..._,b)}
      ${r.mainStart()}
      ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${v}}`}}}}),ay=u(()=>{ad(),iV(),t3(),ap=(t,r,i,a,n,s)=>(t-1)*r+i+(a-1)*n+1-s,ac=(t,r,i,a,n)=>{let s=Math.floor(t/2);"SAME_UPPER"===r?(i[a]=s,i[n]=t-s):"SAME_LOWER"===r&&(i[a]=t-s,i[n]=s)},ah=(t,r)=>{let i=t.kernelShape.slice();if(0===t.kernelShape.length||0===t.kernelShape.reduce((t,r)=>t*r,1)){i.length=0;for(let t=2;t<r[1].dims.length;++t)i.push(r[1].dims[t])}let a="NHWC"===t.format;i.splice(0,0,r[1].dims[0]),i.splice(a?3:1,0,r[1].dims[1]);let n=t.pads.slice(),s=t.outputShape.slice(),o=t.outputPadding.slice(),l=r[0].dims,u=t.dilations.slice();0===u.reduce((t,r)=>t+r,0)&&(u=Array(r[0].dims.length-2).fill(1));let d=t.strides.slice();0===d.reduce((t,r)=>t+r,0)&&(d=Array(r[0].dims.length-2).fill(1)),((t,r,i,a,n,s,o,l,u,d)=>{let p=t.length-2,c=0===d.length;u.length<p&&u.push(...Array(p-u.length).fill(0));let h=t[0],f=r[l?3:1]*n;for(let n=0,h=t.length-p-!!l;n<p;++n,++h){let l=t[h],f=c?l*o[n]:d[n];ac(ap(l,o[n],s[n],r[h],i[n],f),a,s,n,n+p),c&&d.push(o[n]*(l-1)+u[n]+(r[h]-1)*i[n]+1-s[n]-s[n+p])}d.splice(0,0,h),d.splice(l?3:1,0,f)})(l,i,u,t.autoPad,t.group,n,d,a,o,s);let p=Object.assign({},t);return Object.assign(p,{kernelShape:i,pads:n,outputPadding:o,outputShape:s,dilations:u,strides:d}),p},af=t=>{let r=iF(t),i=t.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof t.autoPad>"u"?0:t.autoPad],n=t.dilations,s=t.group??1,o=t.kernelShape,l=t.pads,u=t.strides,d=t.wIsConst();return{autoPad:a,format:i,dilations:n,group:s,kernelShape:o,outputPadding:t.outputPadding,outputShape:t.outputShape,pads:l,strides:u,wIsConst:d,...r,cacheKey:`${t.format};${r.activation};`}},am=(t,r,i,a)=>{let n=t.kernelCustomData.wT??t.compute(t0(r[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=n);let s=[r[0],n];3===r.length&&s.push(r[2]),t.compute(au(s,i,a),{inputs:s})},ag=(t,r)=>{if(((t,r)=>{if(!t||2!==t.length&&3!==t.length)throw Error("Conv requires 2 or 3 inputs");if(4!==t[0].dims.length&&3!==t[0].dims.length)throw Error("currently only support 2-dimensional conv");if(t[0].dims.length!==t[1].dims.length)throw Error("filter does not have same dimension as input");if(t[0].dims["NHWC"===r.format?t[0].dims.length-1:1]!==t[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=t[1].dims[1]*r.group;if(3===t.length&&(1!==t[2].dims.length||t[2].dims[0]!==i))throw Error("invalid bias");let a=t[0].dims.length-2;if(r.dilations.reduce((t,r)=>t+r,0)>0&&r.dilations.length!==a)throw Error(`dilations should be ${a}D`);if(r.strides.reduce((t,r)=>t+r,0)>0&&r.strides.length!==a)throw Error(`strides should be ${a}D`);if(r.pads.reduce((t,r)=>t+r,0)>0&&r.pads.length!==2*a)throw Error(`pads should be ${2*a}D`);if(r.outputPadding.length!==a&&0!==r.outputPadding.length)throw Error(`output_padding should be ${a}D`);if(r.kernelShape.reduce((t,r)=>t+r,0)>0&&0!==r.kernelShape.length&&r.kernelShape.length!==t[1].dims.length-2)throw Error("invalid kernel shape");if(0!==r.outputShape.length&&r.outputShape.length!==t[0].dims.length-2)throw Error("invalid output shape")})(t.inputs,r),3===t.inputs[0].dims.length){var i,a;let n,s,o,l,u,d,p,c;i=t,n="NHWC"===(a=r).format,s=[i.inputs[0].reshape(n?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&s.push(i.inputs[2]),(0===(o=a.kernelShape).length||0===o[0])&&(o=[i.inputs[1].dims[2]]),(0===(l=a.dilations).length||0===l[0])&&(l=[1]),(0===(u=a.strides).length||0===u[0])&&(u=[1]),0===(d=a.pads).length&&(d=[0,0]),d=[0,d[0],0,d[1]],u=[1].concat(u),l=[1].concat(l),o=[1].concat(o),p=[0].concat(p=a.outputPadding),c=ah({...a,pads:d,strides:u,dilations:l,kernelShape:o,outputPadding:p},s),am(i,s,c,t=>n?[t[0],t[2],t[3]]:[t[0],t[1],t[3]])}else{let i=ah(r,t.inputs);am(t,t.inputs,i)}}}),aw=u(()=>{eQ(),ta(),tM(),tQ(),a_=(t,r)=>{var i,a,n,s;let o,l,u,d,p,c,h=t.inputs[0].dims,f=t.inputs[0].dataType,m=t.inputs[1];t.compute((i=f,a=h,n=m,s=r,o=e9.size(a),l=a.length,u=tj("input",i,l),d=tH("output",i,l),p=6===n.dataType?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),c=e9.normalizeAxis(p,l),{name:"CumSum",shaderCache:{hint:s.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...tU(a,a)]}),getShaderSource:t=>{let r=` i32(${u.indicesGet("inputIndices","uniforms.axis")}) `,i=tG("uniforms.input_shape","uniforms.axis",l),a=s.reverse?r+(s.exclusive?" + 1":""):"0",n=s.reverse?i:r+(s.exclusive?"":" + 1");return`
                ${t.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(u,d)}
                ${t.mainStart()}
                  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${a};
                  let last : i32 = ${n};
                  for (var i : i32 = first; i < last; i++) {
                    ${u.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${u.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},ab=t=>{let r=1===t.exclusive,i=1===t.reverse;return tR({exclusive:r,reverse:i})}}),ax=u(()=>{eQ(),ta(),tM(),tQ(),a$=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c,h,f,m,g,y,_;(t=>{if(!t||1!==t.length)throw Error("DepthToSpace requires 1 input.");if(4!==t[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(t.inputs),t.compute((i=t.inputs[0],p="NHWC"===(a=r).format,c=a.blocksize,h="DCR"===a.mode,p?([n,s,o,l]=i.dims,u=h?[n,s,o,c,c,l/c**2]:[n,s,o,l/c**2,c,c],d=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,s,o,l]=[i.dims[0],i.dims[2],i.dims[3],i.dims[1]],u=h?[n,c,c,l/c**2,s,o]:[n,l/c**2,c,c,s,o],d=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]),m=(f=i.reshape(u)).dims.length,g=i.dataType,y=tj("a",g,m),_=tH("output",g,m),{name:"DepthToSpace",shaderCache:{hint:`${i.dims};${a.blocksize};${a.mode}`,inputDependencies:["rank"]},getRunData:t=>{let r=p?[n,s*c,o*c,l/c**2]:[n,l/c**2,s*c,o*c],i=e9.size(r),a=f.dims,u=e9.sortBasedOnPerm(a,d);return{outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...tU(a,u)]}},getShaderSource:t=>`
  ${t.registerUniform("output_size","u32").declareVariables(y,_)}

  ${((t,r,i,a)=>{let n=[];n.push(`fn perm(i: ${a.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let a=0;a<r;++a)n.push(i.indicesSet("a",t[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)})(d,m,y,_)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`}))},av=t=>tR({blocksize:t.blocksize,mode:t.mode,format:t.format})}),aO=u(()=>{eQ(),ta(),tM(),tQ(),aE="^"+(aT="("+(aS="[a-zA-Z]|\\.\\.\\.")+")+")+"$",ak="^"+("("+aT+",)*")+aT+"$",aI=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let i=this.symbolToIndices.get(t);void 0===i?i=[r]:i.push(r),this.symbolToIndices.set(t,i)}},aC=class{constructor(t,r){this.equation=r,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[i,a]=r.includes("->")?r.split("->",2):[r,""];if(!i.match(RegExp(ak)))throw Error("Invalid LHS term");if(i.split(",").forEach((r,i)=>{let a=t[i].dims.slice();if(!r.match(RegExp(aE)))throw Error("Invalid LHS term");let n=this.processTerm(r,!0,a,i);this.lhs.push(n)}),""===a)a+=[...this.symbolToInfo.entries()].filter(([t,r])=>1===r.count||"..."===t).map(([t])=>t).join("");else if(!a.match(RegExp(aT)))throw Error("Invalid RHS");a.match(RegExp(aS,"g"))?.forEach(t=>{if("..."===t)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let r=this.symbolToInfo.get(t);if(void 0===r)throw Error("Invalid RHS symbol");this.outputDims.push(r.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(t,r,i){let a=this.symbolToInfo.get(t);if(void 0!==a){if(a.dimValue!==r&&1!==a.count)throw Error("Dimension mismatch");a.count++,a.inputIndices.push(i)}else a={count:1,dimValue:r,inputIndices:[i]};this.symbolToInfo.set(t,a)}processTerm(t,r,i,a=-1){let n=i.length,s=!1,o=[],l=0;if(!t.match(RegExp(aE))&&!r&&""!==t)throw Error("Invalid LHS term");let u=t.match(RegExp(aS,"g")),d=new aI(a);return u?.forEach((t,p)=>{if("..."===t){if(s)throw Error("Only one ellipsis is allowed per input term");s=!0;let t=n-u.length+1;if(t<0)throw Error("Ellipsis out of bounds");if(o=i.slice(l,l+t),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error("Ellipsis must be specified in the LHS");for(let t=0;t<o.length;t++){let r=String.fromCharCode(48+t);d.addSymbol(r,p+t),this.addSymbol(r,i[l++],a)}}else d.addSymbol(t,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(t,i[l++],a)}),d}},aA=(t,r)=>{var i,a,n,s;let o,l,u,d,p=new aC(t.inputs,r.equation),c=p.outputDims,h=t.inputs.map((t,r)=>t.dims);t.compute((i=h,a=t.inputs[0].dataType,n=p,s=c,o=i.map(t=>t.length).map((t,r)=>tj(`input${r}`,a,t)),l=e9.size(s),u=tH("output",a,s.length),d=[...n.symbolToInfo.keys()].filter(t=>!n.rhs.symbolToIndices.has(t)),{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:i.map(()=>"rank")},getRunData:()=>{let t=d.filter(t=>n.symbolToInfo.has(t)).map(t=>({type:12,data:n.symbolToInfo.get(t)?.dimValue||0}));t.push({type:12,data:l});let r=i.map((t,r)=>[...tU(t)]).reduce((t,r)=>t.concat(r),t);return r.push(...tU(s)),{outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:r}},getShaderSource:t=>{let r=[],i=[],a=[],s=[],l=[],p=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((t,d)=>{if(n.rhs.symbolToIndices.has(d)){let i=n.rhs.symbolToIndices.get(d)?.[0];void 0!==i&&n.lhs.forEach((a,n)=>{if(t.inputIndices.includes(n)){let t=a.symbolToIndices.get(d);if(void 0===t)throw Error("Invalid symbol error");t.forEach(t=>{r.push(`${o[n].indicesSet(`input${n}Indices`,t,u.indicesGet("outputIndices",i))}`)})}})}else{let r;n.lhs.forEach((r,a)=>{if(t.inputIndices.includes(a)){let t=r.symbolToIndices.get(d);if(void 0===t)throw Error("Invalid symbol error");t.forEach(t=>{i.push(`${o[a].indicesSet(`input${a}Indices`,t,`${d}`)}`)}),l.push(`prod *= ${o[a].getByIndices(`input${a}Indices`)};`)}}),a.push(`for(var ${d}: u32 = 0; ${d} < uniforms.${(r=d)+"_max"}; ${d}++) {`),s.push("}")}});let c=p?[...r,`let sum = ${o.map((t,r)=>t.getByIndices(`input${r}Indices`)).join(" * ")};`]:[...r,"var sum = 0.0;",...a,...i,"var prod = 1.0;",...l,"sum += prod;",...s];return`
            ${t.registerUniforms(d.map(t=>{let r;return{name:`${(r=t)+"_max"}`,type:"u32"}})).registerUniform("outputSize","u32").declareVariables(...o,u)}

            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${u.offsetToIndices("global_idx")};
            ${o.map((t,r)=>`var input${r}Indices: ${o[r].type.indices};`).join(`
`)}
            ${c.join(`
`)};
            ${u.setByOffset("global_idx","sum")};
          }`}}))},az=t=>{let r=t.equation.replace(/\s+/g,"");return tR({equation:r})}}),aB=u(()=>{eQ(),ta(),tQ(),aR=(t,r)=>{let i=t.length-r.length,a=[];for(let r=0;r<i;++r)a.push(t[r]);for(let n=0;n<r.length;++n)a.push(1===r[n]?t[n+i]:r[n]);return a},aM=t=>{var r;let i,a,n,s,o,l,u,d,p,c;(t=>{if(!t||2!==t.length)throw Error("Expand requires 2 input.");let r=t[0].dims,i=Array.from(t[1].getBigInt64Array(),Number),a=i.length<r.length?0:i.length-r.length,n=r.length<i.length?0:r.length-i.length;for(;a<i.length&&n<r.length;++a,++n)if(i[a]!==r[n]&&1!==i[a]&&1!==r[n])throw Error("Expand requires shape to be broadcastable to input")})(t.inputs),t.compute((s=(i=n=(r=t.inputs)[0].dims,a=Array.from(r[1].getBigInt64Array(),Number),i.length>a.length?aR(i,a):aR(a,i)),l=9===(o=r[0].dataType)||1===e9.size(n),u=9===o||n.length>0&&n[n.length-1]%4==0?4:1,d=l||s.length>0&&s[s.length-1]%4==0?4:1,c=[{type:12,data:p=Math.ceil(e9.size(s)/d)},...tU(n,s)],{name:"Expand",shaderCache:{hint:`${s.length};${u}${d}`,inputDependencies:["rank"]},getShaderSource:t=>{let r=tj("input",o,n.length,u),i=tH("output",o,s.length,d),a;if(9===o){let t=(t,a,n="")=>`
          let outputIndices${a} = ${i.offsetToIndices(`outputOffset + ${a}u`)};
          let offset${a} = ${r.broadcastedIndicesToOffset(`outputIndices${a}`,i)};
          let index${a} = offset${a} / 4u;
          let component${a} = offset${a} % 4u;
          ${t}[${a}] = ${n}(${r.getByOffset(`index${a}`)}[component${a}]);
        `;a=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${t("data",0,"u32")}
        ${t("data",1,"u32")}
        ${t("data",2,"u32")}
        ${t("data",3,"u32")}
        ${i.setByOffset("global_idx","data")}
      }`}else a=`
        let outputIndices = ${i.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${r.broadcastedIndicesToOffset("outputIndices",i)};
        let data = ${i.type.value}(${r.getByOffset(`inputOffset / ${u}`)});
        ${i.setByOffset("global_idx","data")}
      }`;return`
    ${t.registerUniform("vec_size","u32").declareVariables(r,i)}
    ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${a}`},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c})}),{inputs:[0]})}}),aP=u(()=>{eQ(),ta(),tQ(),iw(),aD=t=>{var r;let i,a,n,s;t.inputs.length<2||0===e9.size(t.inputs[1].dims)?im(t):t.compute((i=(r=t.inputs)[0].dataType,a=e9.size(r[0].dims),s=(n=e9.size(r[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${s}`,inputDependencies:["type","type"]},getShaderSource:t=>{let r=tj("x",i,[1],4),a=tj("bias",i,[1],4),n=tH("y",i,[1],4),o=t=>`
      let bias${t}_offset: u32 = (global_idx * 4 + ${t}) % uniforms.bias_size;
      let bias${t} = ${a.getByOffset(`bias${t}_offset / 4`)}[bias${t}_offset % 4];`,l=s?`
      let bias = ${a.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${o(0)}${o(1)}${o(2)}${o(3)}
      let bias = ${r.type.value}(bias0, bias1, bias2, bias3);`;return`${t.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(r,a,n)}

    ${ic(tN(i))}

    ${t.mainStart(tB)}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${r.getByOffset("global_idx")};
      ${l}
      let x_in = x + bias;
      ${n.setByOffset("global_idx",ih("x_in"))}
    }`},getRunData:t=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],programUniforms:[{type:12,data:Math.ceil(a/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(a/tB/4)}})}))}}),aL=u(()=>{eQ(),ta(),tM(),tQ(),aN=t=>tR({axis:t.axis}),aU=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c,h;(t=>{if(!t||2!==t.length)throw Error("Gather requires 2 inputs.")})(t.inputs),t.compute((i=t.inputs,a=r,n=i[0].dims,s=i[1].dims,o=n.length,l=e9.normalizeAxis(a.axis,o),(u=n.slice(0)).splice(l,1,...s),d=n[l],p=9===i[0].dataType?4:1,h=[{type:12,data:c=Math.ceil(e9.size(u)/p)},{type:6,data:d},{type:12,data:l},...tU(i[0].dims,i[1].dims,u)],{name:"Gather",shaderCache:{hint:a.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:u,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:t=>{let r=tj("data",i[0].dataType,i[0].dims.length,p),a=tj("inputIndices",i[1].dataType,i[1].dims.length),n=tH("output",i[0].dataType,u.length,p),d=t=>{let i=s.length,n=`var indicesIndices${t}  = ${a.type.indices}(0);`;for(let r=0;r<i;r++)n+=`${i>1?`indicesIndices${t}[${r}]`:`indicesIndices${t}`} = ${u.length>1?`outputIndices${t}[uniforms.axis + ${r}]`:`outputIndices${t}`};`;n+=`
          var idx${t} = ${a.getByIndices(`indicesIndices${t}`)};
          if (idx${t} < 0) {
            idx${t} = idx${t} + uniforms.axisDimLimit;
          }
          var dataIndices${t} : ${r.type.indices};
        `;for(let r=0,a=0;r<o;r++)r===l?(n+=`${o>1?`dataIndices${t}[${r}]`:`dataIndices${t}`} = u32(idx${t});`,a+=i):(n+=`${o>1?`dataIndices${t}[${r}]`:`dataIndices${t}`} = ${u.length>1?`outputIndices${t}[${a}]`:`outputIndices${t}`};`,a++);return n},c;if(9===i[0].dataType){let t=(t,i,a="")=>`
          let outputIndices${i} = ${n.offsetToIndices(`outputOffset + ${i}u`)};
          ${d(i)};
          let offset${i} = ${r.indicesToOffset(`dataIndices${i}`)};
          let index${i} = offset${i} / 4u;
          let component${i} = offset${i} % 4u;
          ${t}[${i}] = ${a}(${r.getByOffset(`index${i}`)}[component${i}]);
        `;c=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${t("value",0,"u32")}
        ${t("value",1,"u32")}
        ${t("value",2,"u32")}
        ${t("value",3,"u32")}
        ${n.setByOffset("global_idx","value")}
      `}else c=`
      let outputIndices = ${n.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${r.getByIndices("dataIndices")};
      ${n.setByOffset("global_idx","value")};
      `;return`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(r,a,n)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${c}
      }`}}))}}),aq=u(()=>{eQ(),ta(),tQ(),aF=(t,r)=>{var i,a,n,s,o,l;let u,d,p=t.inputs,c=p[0].dims,h=p[0].dataType,f=p[1].dims,m=f[f.length-1],g=e9.sizeToDimension(f,f.length-1),y=e9.sizeFromDimension(c,r.batchDims+m),_=e9.sizeToDimension(c,r.batchDims),b=e9.sizeFromDimension(c,r.batchDims),w=Array(m),$=y;for(let t=0;t<m;++t)w[m-1-t]=$,$*=c[r.batchDims+m-1-t];let v=(i=t,a=p[1],n=w,s=r.batchDims,o=c,u=[{type:12,data:l=g},{type:12,data:s},{type:12,data:o},{type:12,data:n},{type:12,data:g/_},{type:12,data:b},{type:12,data:m}],d=[l],u.push(...tU(a.dims,d)),i.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${n.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:i.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:t=>{let r=tj("indices_data",a.dataType,a.dims.length),i=tH("input_slice_offsets_data",12,1,1),s=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:n.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${t.registerUniforms(s).declareVariables(r,i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${1===o.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===n.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[a],outputs:[-1]})[0]),x=r.batchDims+m;if(x>c.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let S=f.slice(0,-1).concat(c.slice(x)),T=e9.size(S),E=[{type:12,data:T},{type:12,data:y},...tU(p[0].dims,v.dims,S)];t.compute({name:"GatherND",shaderCache:{hint:r.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:h}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:E}),getShaderSource:t=>{let r=tj("data",p[0].dataType,p[0].dims.length),i=tj("slice_offsets",12,v.dims.length),a=tH("output",p[0].dataType,S.length);return`
          ${t.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(r,i,a)}
            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[p[0],v]})},aV=t=>({batchDims:t.batch_dims,cacheKey:""})}),aj=u(()=>{eQ(),ta(),tM(),tQ(),aG=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c,h,f;((t,r)=>{if(t.length<3||t.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=e9.normalizeAxis(r.quantizeAxis,t[0].dims.length),a=r.blockSize,n=t[0],s=t[2],o=4===t.length?t[3]:void 0;if(s.dims.length!==n.dims.length||!n.dims.map((t,r)=>r===i?Math.ceil(t/a)===s.dims[r]:t===s.dims[r]).reduce((t,r)=>t&&r,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==n.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==s.dims.length||!o.dims.map((t,r)=>t===s.dims[r]).reduce((t,r)=>t&&r,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(t.inputs,r),t.compute((i=t.inputs,a=r,n=i[0].dims,s=i[1].dims,o=n.length,l=e9.normalizeAxis(a.gatherAxis,o),u=e9.normalizeAxis(a.quantizeAxis,o),(d=n.slice(0)).splice(l,1,...s),p=e9.size(d),c=i[2].dataType,h=22===i[0].dataType,f=[{type:12,data:p},{type:12,data:u},{type:12,data:l},{type:12,data:a.blockSize},...tU(...i.map((t,r)=>t.dims),d)],{name:"GatherBlockQuantized",shaderCache:{hint:`${a.cacheKey};${i.filter((t,r)=>1!==r).map(t=>t.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:i.length},(t,r)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:t=>{let r=tj("data",i[0].dataType,i[0].dims.length),a=tj("inputIndices",i[1].dataType,i[1].dims.length),o=tj("scales",i[2].dataType,i[2].dims.length),u=i.length>3?tj("zeroPoint",i[3].dataType,i[3].dims.length):void 0,p=tH("output",c,d.length),f=[r,a,o];return u&&f.push(u),`
        ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...f,p)}
        ${t.mainStart()}
        let output_indices = ${p.offsetToIndices("global_idx")};
        var indices_indices = ${a.type.indices}(0);
        ${s.length>1?`
          for (var i: u32 = 0; i < ${s.length}; i++) {
            let index = ${p.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${a.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${p.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${r.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${p.indicesGet("output_indices","i")};
          ${r.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${a.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[l]};
        }
        ${r.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${p.indicesGet("output_indices",`i + ${s.length} - 1`)};
          ${r.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${r.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${r.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${o.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${o.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${o.getByIndices("scale_indices")};
        ${u?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${u.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${u.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tN(c)}(quantized_data - zero_point) * scale;
        ${p.setByOffset("global_idx","dequantized_data")};
    }`}}))},aW=t=>tR({blockSize:t.blockSize,gatherAxis:t.gatherAxis,quantizeAxis:t.quantizeAxis})}),aZ=u(()=>{eQ(),ta(),tM(),tQ(),aH=t=>tR({axis:t.axis}),aK=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c,h,f,m,g,y;(t=>{if(!t||2!==t.length)throw Error("GatherElements requires 2 inputs.");if(t[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(t[0].dims.length!==t[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(t.inputs),t.compute((i=t.inputs,a=r,n=i[0].dims,s=i[0].dataType,o=n.length,l=i[1].dims,u=i[1].dataType,p=n[d=e9.normalizeAxis(a.axis,o)],c=l.slice(0),h=e9.size(c),f=tj("input",s,o),m=tj("indicesInput",u,l.length),g=tH("output",s,c.length),(y=[{type:12,data:h},{type:6,data:p},{type:12,data:d}]).push(...tU(n,l,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:t=>`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,g)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}))}}),aQ=u(()=>{eQ(),ta(),tQ(),aY=t=>({transA:t.transA,transB:t.transB,alpha:t.alpha,beta:t.beta,cacheKey:`${t.transA};${t.transB};${1===t.alpha}`}),aX=(t,r)=>{(t=>{if(!t)throw Error("Input is missing");if(t.length<2||t.length>3)throw Error("Invaid input number.");if(3===t.length&&t[2].dims.length>2)throw Error("Invalid input shape of C");if(t[0].dataType!==t[1].dataType||3===t.length&&t[0].dataType!==t[2].dataType)throw Error("Input types are mismatched")})(t.inputs),t.compute(((t,r)=>{let i=t[0].dims.slice(),a=t[1].dims.slice(),[n,s,o]=tt.getShapeOfGemmResult(i,r.transA,a,r.transB,3===t.length?t[2].dims:void 0),l=[n,s],u=Math.ceil(s/16),d=Math.ceil(n/16),p=(e9.size(l),[{type:12,data:u},{type:12,data:n},{type:12,data:s},{type:12,data:o},{type:1,data:r.alpha},{type:1,data:r.beta}]),c=["type","type"];return 3===t.length&&(p.push(...tU(t[2].dims)),c.push("rank")),p.push(...tU(l)),{name:"GemmShared",shaderCache:{hint:`${r.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:l,dataType:t[0].dataType}],dispatchGroup:{x:u*d},programUniforms:p}),getShaderSource:i=>{let a=tj("a",t[0].dataType,t[0].dims),n=tj("b",t[1].dataType,t[1].dims),s=null,o=[a,n];3===t.length&&(s=tj("c",t[2].dataType,t[2].dims.length),o.push(s));let u=tH("output",t[0].dataType,l.length);o.push(u);let d="",p="";r.transA&&r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):r.transA&&!r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!r.transA&&r.transB?(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):r.transA||r.transB||(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${n.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let c=1===r.alpha?"":"value *= uniforms.alpha;";return`
  ${i.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${a.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${n.type.storage}, 16>, 16>;
  ${i.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${u.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${p}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${d}
      }
      workgroupBarrier();
    }

    ${c}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=s?`let cOffset = ${s.broadcastedIndicesToOffset("vec2(m, n)",u)}; value += ${u.type.value}(uniforms.beta) * ${s.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(t.inputs,r))}}),a8=u(()=>{eQ(),ta(),tM(),tQ(),[aJ,a0,a1,a2]=[0,1,2,3],a3=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,a4=(t,r)=>{var i,a;let n,s,o,l,u,d,p;(t=>{if(4!==t[0].dims.length)throw Error("only 4-D tensor is supported.");if(t[0].dims.length!==t[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(t[0].dims.length-2!==t[1].dims[t[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${t[0].dims.length-2}`);if(t[0].dims[0]!==t[1].dims[0])throw Error("grid batch size must match input batch size")})(t.inputs),t.compute((i=t.inputs,a=r,n=tj("x",i[0].dataType,i[0].dims.length),s=[i[1].dims[0],i[1].dims[1],i[1].dims[2]],o=tj("grid",i[1].dataType,s.length,2),l=[i[0].dims[0],i[0].dims[1],i[1].dims[1],i[1].dims[2]],"NHWC"===a.format&&(l=[i[0].dims[0],i[1].dims[1],i[1].dims[2],i[0].dims[3]],[aJ,a0,a1,a2]=[0,3,1,2]),u=tH("output",i[0].dataType,l.length),d=n.type.value,p=[{type:12,data:e9.size(l)},...tU(i[0].dims,s,l)],{name:"GridSample",shaderCache:{hint:`${a.cacheKey}`,inputDependencies:["type","type"]},getRunData:t=>{let r=e9.size(l);return{outputs:[{dims:l,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p}},getShaderSource:t=>{let r,i,s,l,p,c,h,f,m;return`
  ${t.registerUniform("output_size","u32").declareVariables(n,o,u)}
  ${a3}
  ${r=d,`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${i=a,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===i.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${s=a,`
  ${"reflection"===s.paddingMode?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`}
  ${l=n,p=d,c=a,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${p} {
     var pixel = ${p}(0);
     var indices = vec4<u32>(0);
     indices[${aJ}] = batch;
     indices[${a0}] = channel;`+(()=>{switch(c.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${a1}] = u32(r);
            indices[${a2}] = u32(c);
          } else {
            return ${p}(0);
          }
        `;case"border":return`
          indices[${a1}] = u32(clamp(r, 0, H - 1));
          indices[${a2}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${a1}] = gs_reflect(r, border[1], border[3]);
          indices[${a2}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${c.paddingMode} is not supported`)}})()+`
    return ${l.getByIndices("indices")};
  }
`}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${a1}]);
      let W_in = i32(uniforms.x_shape[${a2}]);

      ${0===a.alignCorners?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${u.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${aJ}], indices[${a1}], indices[${a2}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${h=u,f=d,m=a,(()=>{switch(m.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${aJ}], indices[${a0}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${aJ}], indices[${a0}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${aJ}], indices[${a0}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${aJ}], indices[${a0}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${aJ}], indices[${a0}], border);

          let dx2 = ${f}(f32(x2) - x);
          let dx1 = ${f}(x - f32(x1));
          let dy2 = ${f}(f32(y2) - y);
          let dy1 = ${f}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${f}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${aJ}], indices[${a0}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${m.mode} is not supported`)}})()+`${h.setByOffset("global_idx","result")}`}
  }`}}))},a6=t=>tR({alignCorners:t.align_corners,mode:t.mode,paddingMode:t.padding_mode,format:t.format})}),nr=u(()=>{eQ(),ta(),tM(),tv(),rB(),tQ(),t3(),a5=(t,r)=>t.length>r&&t[r].dims.length>0?t[r]:void 0,a7=t=>tR({...t}),a9=tR({perm:[0,2,1,3]}),ne=(t,r,i,a,n,s,o,l)=>{var u,d,p,c,h,f,m;let g,y,_,b=s;if(!(o&&e9.size(o.dims)>0))return 3===s.dims.length&&(b=s.reshape([r,a,i,n])),1===i||1===a?b:t.compute(t0(b,a9.perm),{inputs:[b],outputs:[-1]})[0];if(1===a)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return b=(u=t,d=s,p=o,c=r,h=a,f=i*n,m=l,g=[c,h,f],_=[{type:12,data:y=e9.size(g)},{type:12,data:m},{type:12,data:f}],b=u.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:g,dataType:d.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:t=>{let r=tH("qkv_with_bias",d.dataType,g),i=tj("qkv",d.dataType,g),a=tj("bias",p.dataType,g);return`
  ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(i,a,r)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[d,p],outputs:[-1]})[0]).reshape([r,a,i,n]),1===i||1===a?b:t.compute(t0(b,a9.perm),{inputs:[b],outputs:[-1]})[0]},nt=(t,r)=>{let i=((t,r)=>{let i,a=t[0],n=a5(t,1),s=a5(t,2),o=a5(t,3),l=a5(t,4),u=a5(t,5),d=a5(t,6),p=a5(t,7);if(3!==a.dims.length&&5!==a.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let c=a.dims[0],h=a.dims[1],f=3===a.dims.length?a.dims[2]:r.numHeads*a.dims[4],m=h,g=0,y=0,_=Math.floor(f/r.numHeads);if(d&&p&&e9.size(d.dims)&&e9.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==r.numHeads||d.dims[3]!==_)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==r.numHeads||p.dims[3]!==_)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],y=d.dims[2]}else if(d&&e9.size(d.dims)||p&&e9.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(n&&e9.size(n.dims)>0){if(3!==a.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(a.dims[0]!==n.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===n.dims.length){if(n.dims[2]!==a.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');i=2,m=n.dims[1]}else if(5===n.dims.length){if(n.dims[2]!==r.numHeads||2!==n.dims[3]||n.dims[4]!==_)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');i=5,m=n.dims[1]}else{if(n.dims[1]!==r.numHeads||n.dims[3]!==_)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');i=0,m=n.dims[2]}}else{if(5!==a.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(a.dims[2]!==r.numHeads||3!==a.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');i=3}if(o&&e9.size(o.dims)>0){if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(n&&5===n.dims.length&&2===n.dims[3])throw Error("bias is not allowed for packed kv.")}let b=g+m,w=0;if(l&&e9.size(l.dims)>0){w=8;let t=l.dims;throw 1===t.length?t[0]===c?w=1:t[0]===3*c+2&&(w=3):2===t.length&&t[0]===c&&t[1]===b&&(w=5),8===w?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let $=!1,v=f;if(s&&e9.size(s.dims)>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(a.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(m!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=s.dims[2]}else{if(m!==s.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=s.dims[1]*s.dims[3],$=!0}}if(l&&e9.size(l.dims)>0)throw Error("Key padding mask is not supported");if(u&&e9.size(u.dims)>0){if(4!==u.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==r.numHeads||u.dims[2]!==h||u.dims[3]!==b)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:f,vHiddenSize:v,headSize:_,vHeadSize:Math.floor(v/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:w,scale:r.scale,broadcastResPosBias:!1,passPastInKv:$,qkvFormat:i}})(t.inputs,r),a=t.inputs[0],n=a5(t.inputs,1),s=a5(t.inputs,2),o=a5(t.inputs,3),l=a5(t.inputs,4),u=a5(t.inputs,5),d=a5(t.inputs,6),p=a5(t.inputs,7);if(5===a.dims.length)throw Error("Packed QKV is not implemented");if(n?.dims.length===5)throw Error("Packed KV is not implemented");let c=n&&s&&4===n.dims.length&&4===s.dims.length,h=ne(t,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,a,o,0);if(c)return rR(t,h,n,s,l,void 0,d,p,u,i);if(!n||!s)throw Error("key and value must be provided");let f=ne(t,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,n,o,i.hiddenSize),m=ne(t,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,s,o,2*i.hiddenSize);rR(t,h,f,m,l,void 0,d,p,u,i)}}),ns=u(()=>{eQ(),ta(),tM(),tQ(),ni=(t,r)=>{let i=t[0].dims,a=e9.size(i),n=t[0].dataType,s=e9.normalizeAxis(r.axis,i.length),o=Array(r.numOutputs),l=tj("input",n,i.length),u=Array(r.numOutputs),d=[],p=[],c=0,h=[{type:12,data:a}];for(let a=0;a<r.numOutputs;a++){c+=r.splitSizes[a],u[a]=c;let l=i.slice();l[s]=r.splitSizes[a],p.push(l),o[a]=tH(`output${a}`,n,l.length),d.push({dims:p[a],dataType:t[0].dataType})}return h.push({type:12,data:u},...tU(i,...p)),{name:"Split",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getShaderSource:t=>{let r;return`
  ${t.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(l,...o)}
  ${r=u.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${tG("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`}
  ${(t=>{let r=t.length,i=[];for(let a=0;a<r;++a){let n=t[a].setByIndices("indices","input[global_idx]");1===r?i.push(n):0===a?i.push(`if (output_number == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (output_number == ${a}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${t[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`})(o)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tG("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${l.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h})}},na=(t,r)=>{let i,a;var n,s,o=t.inputs;if(!o||o.length<1)throw Error("too few inputs");let l=1===t.inputs.length?r:(n=t.inputs,i=[],a=(s=r).numOutputs,n[1].dims[0]>0&&(n[1].getBigInt64Array().forEach(t=>i.push(Number(t))),a=i.length),tR({numOutputs:a,axis:s.axis,splitSizes:i}));t.compute(ni(t.inputs,l),{inputs:[0]})},nn=t=>{let r=t.axis,i=t.splitSizes,a=t.numOutputs<0?i.length:t.numOutputs;if(a!==i.length)throw Error("numOutputs and splitSizes length must be equal");return tR({axis:r,numOutputs:a,splitSizes:i})}}),nu=u(()=>{eQ(),ta(),tM(),tQ(),no=(t,r)=>{let{interleaved:i,numHeads:a,rotaryEmbeddingDim:n,scale:s}=r,o=t[0].dims[0],l=e9.sizeFromDimension(t[0].dims,1),u=t[0].dims[t[0].dims.length-2],d=l/u,p=t[2].dims[1],c=0===n?2*p:d/a,h=[o,u,d/c,c-p],f=e9.computeStrides(h),m=[{type:1,data:s},{type:12,data:h},{type:12,data:f},...3===t[0].dims.length?Array({type:12,data:[l,d,c,1]}):[],...4===t[0].dims.length?Array({type:12,data:[l,c,u*c,1]}):[],...tU(t[0].dims,t[1].dims,t[2].dims,t[3].dims,t[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:tR({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:r=>{let a=tj("input",t[0].dataType,t[0].dims.length),n=tj("position_ids",t[1].dataType,t[1].dims.length),s=tj("cos_cache",t[2].dataType,t[2].dims.length),o=tj("sin_cache",t[3].dataType,t[3].dims.length),l=tH("output",t[0].dataType,t[0].dims.length);return r.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${r.declareVariables(a,n,s,o,l)}

        ${r.mainStart(tB)}
          let half_rotary_emb_dim = uniforms.${s.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${r.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${n.broadcastedIndicesToOffset("bsnh.xy",tH("",n.type.tensor,2))};
            let position_id =
                u32(${n.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${a.getByOffset("i")} * ${s.get("position_id","bsnh[3]")} -
                ${a.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${l.setByOffset("i","re")}
            let im = ${a.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} +
                ${a.getByOffset("j")} * ${s.get("position_id","bsnh[3]")};
            ${l.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${l.setByOffset("k",a.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(e9.size(h)/tB)},programUniforms:m})}},nl=(t,r)=>{((t,r)=>{let[i,a,n,s]=t,{numHeads:o,rotaryEmbeddingDim:l}=r;if(3!==i.dims.length&&4!==i.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!e9.areEqual(a.dims,[])&&!e9.areEqual(a.dims,[1])&&2!==a.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(2!==n.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!e9.areEqual(n.dims,s.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&0===o)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let u=i.dims[0],d=i.dims[i.dims.length-2],p=n.dims[0],c=e9.sizeFromDimension(i.dims,1)/d,h=0===l?2*n.dims[1]:c/o;if(l>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===a.dims.length){if(u!==a.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(d!==a.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(h/2!==n.dims[1]&&l/2!==n.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")})(t.inputs,r),t.compute(no(t.inputs,r))}}),nh=u(()=>{tM(),eQ(),rB(),nr(),ns(),t3(),nu(),tQ(),nd=tR({perm:[0,2,1,3]}),np=(t,r,i)=>{let a=r,n=i.kvNumHeads;return 3===r.dims.length&&0!==i.kvSequenceLength&&(a=r.reshape([i.batchSize,i.kvSequenceLength,n,i.headSize]),a=t.compute(t0(a,nd.perm),{inputs:[a],outputs:[-1]})[0]),a},nc=(t,r)=>{let i=((t,r)=>{if(r.doRotary&&t.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=t[0],a=t[1],n=t[2],s=t[3],o=t[4];if(0!==r.doRotary&&t.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==r.localWindowSize)throw Error("Local attention is not supported");if(0!==r.softcap)throw Error("Softcap is not supported");if(0!==r.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(r.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let l=i.dims[0],u=i.dims[1],d=3===i.dims.length?i.dims[2]:r.numHeads*i.dims[4],p=u,c=0,h=!a||0===a.dims.length,f=Math.floor(h?d/(r.numHeads+2*r.kvNumHeads):d/r.numHeads);h&&(d=f*r.numHeads);let m=s&&0!==s.dims.length,g=o&&0!==o.dims.length;if(m&&4===s.dims.length&&s.dims[0]===l&&s.dims[1]!==r.kvNumHeads&&s.dims[2]===r.kvNumHeads&&s.dims[3]===f)throw Error("BSNH pastKey/pastValue is not supported");if(m&&g){if(4!==s.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==o.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');c=s.dims[2]}else if(m||g)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(a&&a.dims.length>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(i.dims[2]%a.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');p=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==r.numHeads||2!==a.dims[3]||a.dims[4]!==f)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw Error('Expect "value" be none when "key" has packed kv format.');p=a.dims[1]}else{if(a.dims[1]!==r.numHeads||a.dims[3]!==f)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=a.dims[2]}}else{if(3!==i.dims.length&&5!==i.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===i.dims.length&&(i.dims[2]!==r.numHeads||3!==i.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let _=!1,b=r.kvNumHeads?f*r.kvNumHeads:d;if(n&&n.dims.length>0){if(3!==n.dims.length&&4!==n.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==n.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===n.dims.length){if(p!==n.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');b=n.dims[2]}else{if(p!==n.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');b=n.dims[1]*n.dims[3],_=!0}}let w=t.length>4?t[5]:void 0;if(w&&1!==w.dims.length&&w.dims[0]!==l)throw Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:u,pastSequenceLength:c,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:b,headSize:f,vHeadSize:Math.floor(b/r.kvNumHeads),numHeads:r.numHeads,kvNumHeads:r.kvNumHeads,nReps:r.numHeads/r.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:y}})(t.inputs,r);if(5===t.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(t.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let a=t.inputs[0],n=t.inputs[1]&&t.inputs[1].dims.length>0?t.inputs[1]:void 0,s=t.inputs[2]&&t.inputs[2].dims.length>0?t.inputs[2]:void 0,o=t.inputs[3]&&0!==t.inputs[3].dims.length?t.inputs[3]:void 0,l=t.inputs[4]&&0!==t.inputs[4].dims.length?t.inputs[4]:void 0,u=t.inputs.length>4?t.inputs[5]:void 0,d=t.inputs.length>5?t.inputs[6]:void 0,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,c=tR({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,p*i.headSize,p*i.headSize]}),[h,f,m]=n||s?[a,n,s]:t.compute(ni([a],c),{inputs:[a],outputs:[-1,-1,-1]}),g,y;if(r.doRotary){var _,b,w,$;let a,n,s,o=t.compute((_=i.batchSize,b=i.sequenceLength,w=u,$=d,a=[_*b],s=[{type:12,data:n=_*b},{type:12,data:b},{type:12,data:_}],{name:"GeneratePositionIds",shaderCache:{hint:`${_};${b}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:s}),getShaderSource:t=>{let r=tj("seq_lens",w.dataType,w.dims),i=tj("total_seq_lens",$.dataType,$.dims),n=tH("pos_ids",7,a);return`
  ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(r,i,n)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${i.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${r.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${n.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${n.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${n.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[u,d],outputs:[-1]})[0],l=t.inputs[7],p=t.inputs[8],c=tR({interleaved:0!==r.rotaryInterleaved,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:r.scale}),m=[h,o,l,p],v=[-1];g=t.compute(no(m,c),{inputs:m,outputs:v})[0],m.splice(0,1,f);let x=tR({interleaved:0!==r.rotaryInterleaved,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:r.scale});y=t.compute(no(m,x),{inputs:m,outputs:v})[0]}let v=ne(t,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r.doRotary?g:h,void 0,0),x=np(t,r.doRotary?y:f,i),S=np(t,m,i);rR(t,v,x,S,void 0,void 0,o,l,void 0,i,u,d)}}),ng=u(()=>{eQ(),ta(),t3(),tQ(),nf=(t,r,i,a,n,s,o,l)=>{let u=tL(s),d=1===u?"f32":`vec${u}f`,p=1===u?"vec2f":`mat2x${u}f`,c=n*o,h=64;1===c&&(h=256);let f=[n,o,s/u],m=[n,o,2],g=[];return g.push(...tU(f,m)),t.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${l};${h}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:g}),getShaderSource:t=>{let n=tj("x",r.dataType,3,u),s=[n,tj("scale",i.dataType,i.dims),tj("bias",a.dataType,a.dims),tH("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${t.declareVariables(...s)}
  ${t.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${n.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${tq("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${tq("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[r,i,a],outputs:[-1]})[0]},nm=(t,r)=>{var i,a,n;let s,o,l,u,d,p,c,h,f;"NHWC"===r.format?((t,r,i)=>{let a=r[0].dims,n=a[0],s=a[a.length-1],o=e9.sizeFromDimension(a,1)/s,l=tL(s),u=e9.size(a)/l,d=[{type:12,data:o},{type:12,data:Math.floor(s/l)}],p=!1,c=[0,a.length-1];for(let t=0;t<a.length-2;t++)p=p||1!==a[t+1],c.push(t+1);let h=(p=p&&1!==a[a.length-1])?t.compute(t0(t.inputs[0],c),{inputs:[t.inputs[0]],outputs:[-1]})[0]:t.inputs[0].reshape(Array.from({length:a.length},(t,r)=>a[c[r]])),f=nf(t,h,r[1],r[2],n,o,s,i.epsilon);t.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:t=>{let i=tP(r[0].dataType),n=1===l?"vec2f":`mat${l}x2f`,s=t=>{let r=0===t?"x":"y",a=1===l?"f32":`vec${l}f`;switch(l){case 1:return`${i}(${a}(scale.${r}))`;case 2:return`vec2<${i}>(${a}(scale[0].${r}, scale[1].${r}))`;case 4:return`vec4<${i}>(${a}(scale[0].${r}, scale[1].${r}, scale[2].${r}, scale[3].${r}))`;default:throw Error(`Not supported compoents ${l}`)}},o=tj("input",r[0].dataType,r[0].dims,l),u=tH("output",r[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${n}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${u.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${t.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${s(0)}, ${s(1)});
  }`}},{inputs:[r[0],f]})})(t,t.inputs,r):(i=t,a=t.inputs,n=r,o=(s=a[0].dims)[0],l=s[1],u=e9.sizeFromDimension(s,2),d=tL(u),p=e9.size(s)/d,c=nf(i,a[0],a[1],a[2],o,u,l,n.epsilon),h=[o,l,u/d],f=[o,l],i.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:s,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...tU(h,f,h)]}),getShaderSource:t=>{let r=tj("x",a[0].dataType,h.length,d),i=tj("scale_shift",1,f.length,2),n=tH("output",a[0].dataType,h.length,d),s=[r,i,n];return`
  ${t.registerUniform("output_size","u32").declareVariables(...s)}
  ${t.mainStart()}
  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${n.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${i.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${r.getByOffset("global_idx")} * ${n.type.value}(scale_shift.x) + ${n.type.value}(scale_shift.y);
      ${n.setByOffset("global_idx","value")};
  }`}},{inputs:[a[0],c]}))}}),n_=u(()=>{eQ(),ta(),tQ(),ny=(t,r)=>{(t=>{if(!t||t.length<2)throw Error("layerNorm requires at least 2 inputs.")})(t.inputs),t.compute(((t,r,i)=>{let a=r.simplified,n=t[0].dims,s=t[1],o=!a&&t[2],l=e9.normalizeAxis(r.axis,n.length),u=e9.sizeToDimension(n,l),d=e9.sizeFromDimension(n,l),p=e9.size(s.dims),c=o?e9.size(o.dims):0;if(p!==d||o&&c!==d)throw Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${c}`);let h=[];for(let t=0;t<n.length;++t)t<l?h.push(n[t]):h.push(1);let f=tL(d),m=["type","type"],g=[{type:12,data:u},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:r.epsilon}];o&&m.push("type");let y=i>1,_=i>2,b=[{dims:n,dataType:t[0].dataType}];return y&&b.push({dims:h,dataType:1}),_&&b.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${i};${a}`,inputDependencies:m},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(u/64)},programUniforms:g}),getShaderSource:r=>{let i=tP(t[0].dataType),l=[tj("x",t[0].dataType,t[0].dims,f),tj("scale",s.dataType,s.dims,f)];return o&&l.push(tj("bias",o.dataType,o.dims,f)),l.push(tH("output",t[0].dataType,n,f)),y&&l.push(tH("mean_data_output",1,h)),_&&l.push(tH("inv_std_output",1,h)),`
  ${r.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...l)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tF("f32",f)};
    var mean_square_vector = ${tF("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tV(i,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${tq("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${tq("mean_square_vector",f)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tV(i,f,"x[j + offset]")};
      let f32scale = ${tV(i,f,"scale[j]")};
      output[j + offset] = ${l[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${tV(i,f,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(t.inputs,r,t.outputCount))}}),nw=u(()=>{ta(),iY(),i1(),nb=t=>{var r=t.inputs;if(!r||2!==r.length)throw Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw Error("shared dimension does not match.");let i=e7.calcShape(t.inputs[0].dims,t.inputs[1].dims,!0);if(!i)throw Error("Can't use matmul on the given tensors");let a=i[i.length-1],n=t.inputs[0].dims[t.inputs[0].dims.length-1];if(a<8&&n<8)t.compute(iZ(t.inputs,{activation:""},i));else{let r=i[i.length-2],s=e9.size(t.inputs[0].dims.slice(0,-2)),o=e9.size(t.inputs[1].dims.slice(0,-2));if(1!==s&&1===r&&1===o){let r=t.inputs[0].reshape([1,s,n]),o=t.inputs[1].reshape([1,n,a]),l=[1,s,a],u=[r,o];t.compute(i0(u,{activation:""},i,l),{inputs:u})}else t.compute(i0(t.inputs,{activation:""},i))}}}),nx=u(()=>{eQ(),ta(),tM(),tQ(),n$=(t,r)=>{var i,a,n,s;let o,l,u,d,p,c,h,f,m,g,y,_,b,w,$,v,x,S,T,E,k,I,C,A,z,O,R,M,B,D,P,N,U,L,F,V,q,G,W,j,H,K;((t,r)=>{if(t.length<3||t.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let i=t[0],a=i.dims.length;if(i.dims[a-1]!==r.k)throw Error("The last dim of input shape does not match the k value");let n=Math.floor((r.k+r.blockSize-1)/r.blockSize),s=r.blockSize/8*r.bits,o=t[1];if(!e9.areEqual(o.dims,[r.n,n,s]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let l=t[2].dims;if(e9.size(l)!==r.n*n)throw Error("scales input size error.");if(4===t.length){let i=t[3].dims,a=r.n*(8===r.bits?n:Math.floor((n*r.bits+7)/8));if(e9.size(i)!==a)throw Error("zeroPoints input size error.")}})(t.inputs,r),32===r.blockSize&&t.adapterInfo.isVendor("intel")&&t.adapterInfo.isArchitecture("gen-12lp")?t.compute((i=t.inputs,a=r,l=(o=i[0].dims).length,u=o[l-2],d=a.k,p=a.n,c=o.slice(0,l-2),h=e9.size(c),f=i[1].dims[2]/4,m=i[0].dataType,g=tL(a.k),y=tL(f),_=c.concat([u,p]),w=128/(b=p%8==0?8:p%4==0?4:1),x=(v=w*y*($=Math.floor(32/a.bits)))/g,S=v/a.blockSize,T=e9.size(_)/b,E=[],k=[h,u,d/g],(I=e9.convertShape(i[1].dims).slice()).splice(-1,1,f/y),E.push(...tU(k)),E.push(...tU(I)),E.push(...tU(i[2].dims)),4===i.length&&E.push(...tU(e9.convertShape(i[3].dims))),C=[h,u,p],E.push(...tU(C)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${a.blockSize};${g};${y};${w};${b}`,inputDependencies:Array(i.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:T},programUniforms:E}),getShaderSource:t=>{let r=k.length,n=tj("a",i[0].dataType,r,g),s=tj("b",12,I.length,y),o=tj("scales",i[2].dataType,i[2].dims.length),l=[n,s,o],u=4===i.length?tj("zero_points",12,i[3].dims.length):void 0;u&&l.push(u);let d=C.length,p=tH("output",i[0].dataType,d),c=tP(i[0].dataType),h=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${n.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${p.type.value}, ${w}>, ${b}>;
        ${t.declareVariables(...l,p)}
        ${t.mainStart([w,b,1])}
          let output_indices = ${p.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${n.getByIndices(`${n.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${n.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${u?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/a.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${a.bits}u);
            let zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${c}((zero_point_word) & ${2===a.bits?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,a.bits-1)} for unsigned ${a.bits}-bit quantization.
            let zero_point = ${c}(${Math.pow(2,a.bits-1).toFixed(1)});`}
            let scale = ${o.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${s.getByIndices(`${s.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${a.blockSize/g};
            for (var i: u32 = 0; i < ${y}; i++) {
              let b_value = ${1===y?"b_data":"b_data[i]"};
              ${(()=>{let t=Math.floor($/8),r="";for(let i=0;i<t;i++){let t=i*a.bits*4,n=t+a.bits;r+=`
              ${h()}
              {${2===a.bits?`
                let half_word = b_value >> ${16*i}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${t}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${n}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${c}>(${Array.from({length:4},(t,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${c}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(t,r)=>`dot(a_data${r}, b_dequantized_values[${r}])`).join(" + ")};
              }
              word_offset += ${8/g};`}return r})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            for (var b = 0u; b < ${w}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${p.setByIndices(`${p.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):t.compute((n=t.inputs,s=r,z=(A=n[0].dims).length,O=A[z-2],R=s.k,M=s.n,B=A.slice(0,z-2),D=e9.size(B),P=n[1].dims[2]/4,N=n[0].dataType,U=tL(s.k),L=tL(P),F=tL(M),V=B.concat([O,M]),q=O>1&&M/F%2==0?2:1,G=e9.size(V)/F/q,W=[],j=[D,O,R/U],(H=e9.convertShape(n[1].dims).slice()).splice(-1,1,P/L),W.push(...tU(j)),W.push(...tU(H)),W.push(...tU(n[2].dims)),4===n.length&&W.push(...tU(e9.convertShape(n[3].dims))),K=[D,O,M/F],W.push(...tU(K)),{name:"MatMulNBits",shaderCache:{hint:`${s.blockSize};${s.bits};${U};${L};${F};${q};64`,inputDependencies:Array(n.length).fill("rank")},getRunData:()=>({outputs:[{dims:V,dataType:N}],dispatchGroup:{x:G},programUniforms:W}),getShaderSource:t=>{let r=j.length,i=tj("a",n[0].dataType,r,U),a=tj("b",12,H.length,L),o=tj("scales",n[2].dataType,n[2].dims.length),l=[i,a,o],u=4===n.length?tj("zero_points",12,n[3].dims.length):void 0;u&&l.push(u);let d=K.length,p=tH("output",n[0].dataType,d,F),c=tP(n[0].dataType),h=(()=>{switch(U){case 1:return`array<${c}, 8>`;case 2:return`mat4x2<${c}>`;case 4:return`mat2x4<${c}>`;default:throw Error(`${U}-component is not supported.`)}})(),f=Math.floor(32/s.bits),m=Math.floor(f/8);return`
        var<workgroup> workgroup_shared: array<${p.type.value}, ${64*q}>;
        ${t.declareVariables(...l,p)}
        ${t.mainStart([64,1,1])}
          let output_indices = ${p.offsetToIndices(`(global_idx / 64) * ${q}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${s.blockSize/U};
            ${(()=>{let t=`
            var col_index = col * ${F};
            ${u?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/s.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,s.bits-1)} for unsigned ${s.bits}-bit quantization.
            let zero_point = ${c}(${Math.pow(2,s.bits-1).toFixed(1)});`}
            `;for(let r=0;r<F*q;r++)t+=`
            let scale${r} = ${o.getByOffset("col_index * nBlocksPerCol + block")};
            ${u?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${s.bits}u);
            zero_point_word = ${u.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${r} = ${c}((zero_point_word) & ${2===s.bits?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return t})()}
            for (var word: u32 = 0; word < ${P}; word += ${L}) {
              ${(()=>{let t=`col_index = col * ${F};`;for(let r=0;r<F*q;r++)t+=`
            let b${r}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return t+`
            var b_value: u32;
            let b_mask: u32 = ${2===s.bits?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${h};
            var b_dequantized_values: ${h};`})()}
              for (var i: u32 = 0; i < ${L}; i++) {
                ${(()=>{let t="";for(let r=0;r<m;r++){let a=r*s.bits*4,n=a+s.bits;t+=`
          // reuse a data (pass ${r})
            var input_offset${r>0?r:""} = ${0===r?i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${r>0?r:""}: ${h};
            for (var j${r>0?r:""}: u32 = 0; j${r>0?r:""} < ${8/U}; j${r>0?r:""}++) {
              a_data${r>0?r:""}[j${r>0?r:""}] = ${i.getByOffset(`input_offset${r>0?r:""}`)};
              input_offset${r>0?r:""}++;
            }
          `;for(let i=0;i<F*q;i++)t+=`
            b_value = ${1===L?`b${i}_data`:`b${i}_data[i]`};
            ${2===s.bits?`{
              let half_word = b_value >> ${16*r}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${a}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${n}u) & b_mask);`}
            b_quantized_values = ${h}(${Array.from({length:4},(t,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
            b_dequantized_values = ${1===U?`${h}(${Array.from({length:8},(t,r)=>`(b_quantized_values[${r}] - ${u?`zero_point${i}`:"zero_point"}) * scale${i}`).join(", ")});`:`(b_quantized_values - ${h}(${Array(8).fill(`${u?`zero_point${i}`:"zero_point"}`).join(",")})) * scale${i};`};
            workgroup_shared[local_id.x * ${q} + ${Math.floor(i/F)}]${F>1?`[${i%F}]`:""} += ${Array.from({length:8/U},(t,i)=>`${1===U?`a_data${r>0?r:""}[${i}] * b_dequantized_values[${i}]`:`dot(a_data${r>0?r:""}[${i}], b_dequantized_values[${i}])`}`).join(" + ")};
          `}return t})()}
                word_offset += ${f/U};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${q}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${q};
            }
            ${p.setByIndices(`${p.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},nv=t=>tR(t)}),nT=u(()=>{eQ(),ta(),tQ(),nS=(t,r)=>{let i,a,n,s;var o,l,u=t.inputs;if(!u||u.length<1)throw Error("Too few inputs");if(1!==u[0].dataType&&10!==u[0].dataType)throw Error("Input type must be float or float16.");if(u.length>=2){let t=2*u[0].dims.length===u[1].dims[0];if(4===u.length&&(t=2*u[3].dims[0]===u[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let d=((t,r)=>{if(!(t.length>1))return r;{let i=t[1].getBigInt64Array(),a=t.length>=3&&t[2].data?10===t[2].dataType?t[2].getUint16Array()[0]:t[2].getFloat32Array()[0]:0,n=t[0].dims.length,s=new Int32Array(2*n).fill(0);if(t.length>=4){let r=t[3].getBigInt64Array();for(let t=0;t<r.length;t++)s[Number(r[t])]=Number(i[t]),s[Number(r[t])+n]=Number(i[t+r.length])}else i.forEach((t,r)=>s[Number(r)]=Number(t));let o=[];return s.forEach(t=>o.push(t)),{mode:r.mode,value:a,pads:o}}})(t.inputs,r);t.compute((o=t.inputs,l=d,i=e9.padShape(o[0].dims.slice(),l.pads),a=o[0].dims,n=[{type:12,data:e9.size(i)},{type:6,data:l.pads}],s=o.length>=3&&o[2].data,0===l.mode&&n.push({type:s?o[2].dataType:1,data:l.value}),n.push(...tU(o[0].dims,i)),{name:"Pad",shaderCache:{hint:`${l.mode}${s}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:o[0].dataType}],dispatchGroup:{x:Math.ceil(e9.size(i)/64)},programUniforms:n}),getShaderSource:t=>{let r=tH("output",o[0].dataType,i.length),n=tj("x",o[0].dataType,a.length),u=n.type.value,d=((t,r,i)=>{switch(i.mode){case 0:var a=t,n=r,s=i.pads.length;let o="";for(let t=n-1;t>=0;--t)o+=`
            k = i32(${a.indicesGet("indices",t)}) - ${tG("uniforms.pads",t,s)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tG("uniforms.x_shape",t,n)})) {
              break;
            }
            offset += k * i32(${tG("uniforms.x_strides",t,n)});
        `;return`
          value = ${a.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `;case 1:var l=t,u=r,d=i.pads.length;let p="";for(let t=u-1;t>=0;--t)p+=`
                k = i32(${l.indicesGet("indices",t)}) - ${tG("uniforms.pads",t,d)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tG("uniforms.x_shape",t,u)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tG("uniforms.x_shape",t,u)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tG("uniforms.x_strides",t,u)});
            `;return`
              var offset = 0;
              var k = 0;
              ${p}
              value = x[offset];
          `;case 2:var c=t,h=r,f=i.pads.length;let m="";for(let t=h-1;t>=0;--t)m+=`
                k = i32(${c.indicesGet("indices",t)}) - ${tG("uniforms.pads",t,f)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tG("uniforms.x_shape",t,h)})) {
                  k = i32(${tG("uniforms.x_shape",t,h)}) - 1;
                }
                offset += k * i32(${tG("uniforms.x_strides",t,h)});
            `;return`
              var offset = 0;
              var k = 0;
              ${m}
              value = x[offset];
          `;case 3:var g=t,y=r,_=i.pads.length;let b="";for(let t=y-1;t>=0;--t)b+=`
                k = i32(${g.indicesGet("indices",t)}) - ${tG("uniforms.pads",t,_)};
                if (k < 0)  {
                  k += i32(${tG("uniforms.x_shape",t,y)}]);
                }
                if (k >= i32(${tG("uniforms.x_shape",t,y)})) {
                  k -= i32(${tG("uniforms.x_shape",t,y)});
                }
                offset += k * i32(${tG("uniforms.x_strides",t,y)});
            `;return`
              var offset = 0;
              var k = 0;
              ${b}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(r,a.length,l),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:l.pads.length}];return 0===l.mode&&p.push({name:"constant_value",type:s?u:"f32"}),`
            ${t.registerUniforms(p).declareVariables(n,r)}
            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${r.offsetToIndices("global_idx")};

            var value = ${u}(0);
            ${d}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),nq=u(()=>{ed(),eQ(),ta(),tQ(),nE=t=>{if(S.webgpu.validateInputContent&&(!t||1!==t.length))throw Error("Pool ops requires 1 input.")},nk=(t,r,i)=>{let a="NHWC"===r.format,n=t.dims.slice();a&&n.splice(1,0,n.pop());let s=Object.hasOwnProperty.call(r,"dilations"),o=r.kernelShape.slice(),l=r.strides.slice(),u=s?r.dilations.slice():[],d=r.pads.slice();te.adjustPoolAttributes(i,n,o,l,u,d);let p=te.computePoolOutputShape(i,n,l,u,o,d,r.autoPad),c=Object.assign({},r);s?Object.assign(c,{kernelShape:o,strides:l,pads:d,dilations:u,cacheKey:r.cacheKey}):Object.assign(c,{kernelShape:o,strides:l,pads:d,cacheKey:r.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[c,a?h:p]},nI=(t,r)=>{let i="NHWC"===r.format,a=[{type:12,data:e9.size(t)},{type:12,data:e9.size(r.kernelShape)}],n=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(r.kernelShape.length<=2){let t=r.kernelShape[r.kernelShape.length-1],i=r.strides[r.strides.length-1],s=r.pads[r.pads.length/2-1],o=r.pads[r.pads.length-1],l=!!(s+o);a.push({type:12,data:t},{type:12,data:i},{type:12,data:s},{type:12,data:o}),n.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let u=!1;if(2===r.kernelShape.length){let t=r.kernelShape[r.kernelShape.length-2],i=r.strides[r.strides.length-2],s=r.pads[r.pads.length/2-2],o=r.pads[r.pads.length-2];u=!!(s+o),a.push({type:12,data:t},{type:12,data:i},{type:12,data:s},{type:12,data:o}),n.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,n,!0,l,u]}{if(i)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let t=e9.computeStrides(r.kernelShape);return a.push({type:12,data:t},{type:12,data:r.pads},{type:12,data:r.strides}),n.push({name:"kernelStrides",type:"u32",length:t.length},{name:"pads",type:"u32",length:r.pads.length},{name:"strides",type:"u32",length:r.strides.length}),[a,n,!!r.pads.reduce((t,r)=>t+r),!1,!1]}},nC=(t,r,i,a,n,s,o,l,u,d,p,c)=>{let h="NHWC"===n.format,f=r.type.value,m=tH("output",r.type.tensor,a);if(n.kernelShape.length<=2){let a="",d="",g="",y=i-(h?2:1);if(a=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${y}] < 0 || xIndices[${y}]
                      >= uniforms.x_shape[${y}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${s}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${s}
                }`,2===n.kernelShape.length){let t=i-(h?3:2);d=c?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${t}] = indices[${t}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${t}] < 0 || xIndices[${t}] >= uniforms.x_shape[${t}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${t}] = indices[${t}] * uniforms.sh - uniforms.phStart + j;
                `,g=`
              }
            `}return`
            ${t.registerUniforms(u).declareVariables(r,m)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${l});
              var pad = 0;
              ${d}
              ${a}
              ${g}
              ${o}

              output[global_idx] = value;
            }`}{if(h)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=n.kernelShape.length,p=n.pads.length,c="";return c=d?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${r.indicesToOffset("xIndices")}];
                ${s}
              }`:`
              }
              let x_val = x[${r.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${t.registerUniforms(u).declareVariables(r,m)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${a}>;

              var value = ${f}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${a-1}u; j++) {
                  offsets[j] = offset / ${tG("uniforms.kernelStrides","j",a)};
                  offset -= offsets[j] * ${tG("uniforms.kernelStrides","j",a)};
                }
                offsets[${a-1}] = offset;

                isPad = false;
                for (var j = ${i-a}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${tG("uniforms.strides",`j - ${i-a}u`,a)}
                    + offsets[j - ${i-a}u] - ${tG("uniforms.pads","j - 2u",p)};
                  ${c}
              }
              ${o}

              output[global_idx] = value;
            }`}},nA=t=>`${t.format};${t.ceilMode};${t.autoPad};${t.kernelShape.length}`,nz=t=>({format:t.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],ceilMode:t.ceil_mode,kernelShape:t.kernel_shape,strides:t.strides,pads:t.pads}),nO=(t,r,i,a)=>{let[n,s]=nk(r,a,i),o=tj("x",r.dataType,r.dims.length),l=o.type.value,u="";n.countIncludePad?u+=`value /= ${l}(uniforms.kernelSize);`:u+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[d,p,c,h,f]=nI(s,n);return d.push(...tU(r.dims,s)),{name:t,shaderCache:{hint:`${a.cacheKey};${c};${h};${f}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(e9.size(s)/64)},programUniforms:d}),getShaderSource:t=>nC(t,o,r.dims.length,s.length,n,"value += x_val;",u,0,p,c,h,f)}},nR=t=>{let r,i=0!==t.count_include_pad,a=nz(t);if(0!==a.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:i,...a,cacheKey:""};return{...n,cacheKey:(r=n,`${nA(r)};${r.countIncludePad}`)}},nM=(t,r)=>{nE(t.inputs),t.compute(nO("AveragePool",t.inputs[0],!1,r))},nB={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},nD=t=>{let r=t.format;return{format:r,...nB,cacheKey:r}},nP=(t,r)=>{nE(t.inputs),t.compute(nO("GlobalAveragePool",t.inputs[0],!0,r))},nN=(t,r,i,a)=>{let[n,s]=nk(r,a,i),o=`
      value = max(x_val, value);
    `,l=tj("x",r.dataType,r.dims.length),[u,d,p,c,h]=nI(s,n);return u.push(...tU(r.dims,s)),{name:t,shaderCache:{hint:`${a.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(e9.size(s)/64)},programUniforms:u}),getShaderSource:t=>nC(t,l,r.dims.length,s.length,n,o,"",10===r.dataType?-65504:-1e5,d,p,c,h)}},nU=(t,r)=>{nE(t.inputs),t.compute(nN("MaxPool",t.inputs[0],!1,r))},nL=t=>{let r,i=t.storage_order,a=t.dilations,n=nz(t);if(0!==i)throw Error("column major storage order is not yet supported for MaxPool");if(0!==n.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let s={storageOrder:i,dilations:a,...n,cacheKey:""};return{...s,cacheKey:(r=s,`${nA(r)};${r.storageOrder};${r.dilations}`)}},nF=t=>{let r=t.format;return{format:r,...nB,cacheKey:r}},nV=(t,r)=>{nE(t.inputs),t.compute(nN("GlobalMaxPool",t.inputs[0],!0,r))}}),nj=u(()=>{eQ(),ta(),tM(),tQ(),nG=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c,h,f,m,g,y,_,b,w,$,v,x,S,T,E,k;((t,r)=>{if(t.length<2||t.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===t.length&&t[1].dims===t[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===t.length&&t[0].dataType!==t[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(0!==t[1].dims.length&&1!==t[1].dims.length&&t[1].dims.length!==t[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(t.length>2){if(t[0].dataType!==t[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(t[1].dims.length!==t[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!t[1].dims.map((r,i)=>r===t[2].dims[i]).reduce((t,r)=>t&&r,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(r.blockSize>0){if(0===t[1].dims.length||1===t[1].dims.length&&1===t[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!t[1].dims.map((i,a)=>a===r.axis||i===t[0].dims[a]).reduce((t,r)=>t&&r,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(t[1].dims.length!==t[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let i=t[0].dims[r.axis],a=t[1].dims[r.axis];if(r.blockSize<Math.ceil(i/a)||r.blockSize>Math.ceil(i/(a-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(t.inputs,r),t.compute((i=t.inputs,a=r,n=e9.normalizeAxis(a.axis,i[0].dims.length),o=3===(s=i[0].dataType),l=i[0].dims,u=i[1].dataType,d=e9.size(l),c=(p=3===s||2===s)?[Math.ceil(e9.size(i[0].dims)/4)]:i[0].dims,h=i[1].dims,m=(f=i.length>2?i[2]:void 0)?p?[Math.ceil(e9.size(f.dims)/4)]:f.dims:void 0,y=!1==(g=0===h.length||1===h.length&&1===h[0])&&1===h.length,_=tL(d),w=(b=g&&(!p||4===_))?_:1,$=tj("input",p?12:s,c.length,b&&!p?_:1),v=tj("scale",u,h.length),x=f?tj("zero_point",p?12:s,m.length):void 0,S=tH("output",u,l.length,w),T=[$,v],x&&T.push(x),E=[c,h],f&&E.push(m),k=[{type:12,data:d/w},{type:12,data:n},{type:12,data:a.blockSize},...tU(...E,l)],{name:"DequantizeLinear",shaderCache:{hint:a.cacheKey,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getShaderSource:t=>`
      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...T,S)}
      ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${$.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===w?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${$.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${v.getByOffset("0")}`:y?`
            let scale_index = ${S.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${x?g?p?`
                let zero_point_input = ${x.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset("0")}`:y?p?`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${x.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${x.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${x.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices("scale_indices")};`:`let zero_point_value = ${p?o?"i32":"u32":$.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx",`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:l,dataType:u}],dispatchGroup:{x:Math.ceil(d/w/64),y:1,z:1},programUniforms:k})}))},nW=t=>tR({axis:t.axis,blockSize:t.blockSize})}),nK=u(()=>{ed(),eQ(),tQ(),nH=t=>{var r,i,a,n;let s,o,l,u=0,d=0,p=0;6===t.inputs[0].dataType?(u=t.inputs[0].getInt32Array()[0],d=t.inputs[1].getInt32Array()[0],p=t.inputs[2].getInt32Array()[0]):1===t.inputs[0].dataType&&(u=t.inputs[0].getFloat32Array()[0],d=t.inputs[1].getFloat32Array()[0],p=t.inputs[2].getFloat32Array()[0]),S.webgpu.validateInputContent&&((t,r,i)=>{if(t===r||t<r&&i<0||t>r&&i>0)throw Error("Range these inputs' contents are invalid.")})(u,d,p),t.compute((r=u,i=d,a=p,n=t.inputs[0].dataType,o=[s=Math.abs(Math.ceil((i-r)/a))],l=[{type:12,data:s},{type:n,data:r},{type:n,data:a},...tU(o)],{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:t=>{let r=tH("output",n,o.length),i=r.type.value;return`
        ${t.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:i},{name:"delta",type:i}]).declareVariables(r)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${i}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:l})}),{inputs:[]})}}),nX=u(()=>{eQ(),ta(),tM(),tQ(),nZ=t=>tR({reduction:t.reduction}),nY=(t,r)=>{var i,a;let n,s,o,l,u,d;t.compute((i=t.inputs,a=r,n=i[0].dims,s=i[1].dims,o=Math.ceil(e9.sizeToDimension(s,s.length-1)/1),l=s[s.length-1],u=e9.sizeFromDimension(n,l),d=[{type:12,data:o},{type:12,data:l},{type:12,data:u},...tU(i[1].dims,i[2].dims,n)],{name:"ScatterND",shaderCache:{hint:`${a.cacheKey}_${a.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:t=>{let r=tj("indices",i[1].dataType,i[1].dims.length),s=tj("updates",i[2].dataType,i[2].dims.length,1),o="none"!==a.reduction&&""!==a.reduction?tK("output",i[0].dataType,n.length):tH("output",i[0].dataType,n.length,1);return`
      ${t.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(r,s,o)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===i[0].dims.length?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${((t,r,i,a)=>{if("none"!==t&&"i32"!==a&&"u32"!==a&&"f32"!==a)throw Error(`Input ${a} is not supported with reduction ${t}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${r}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(t){case"none":return`${r}=${i};`;case"add":return"i32"===a||"u32"===a?`atomicAdd(&${r}, bitcast<${a}>(${i}));`:`
              ${n}bitcast<${a}>(oldValue) + (${i})${s}`;case"max":return"i32"===a||"u32"===a?`atomicMax(&${r}, bitcast<${a}>(${i}));`:`
                ${n}max(bitcast<f32>(oldValue), (${i}))${s}`;case"min":return"i32"===a||"u32"===a?`atomicMin(&${r}, bitcast<${a}>(${i}));`:`${n}min(bitcast<${a}>(oldValue), (${i}))${s}`;case"mul":return`${n}(bitcast<${a}>(oldValue) * (${i}))${s}`;default:throw Error(`Reduction ${t} is not supported.`)}})(a.reduction,"output[data_offset + i]","value",o.type.value)}
  }

      }`}}),{inputs:[t.inputs[1],t.inputs[2]],outputs:[]})}}),n2=u(()=>{eQ(),ta(),tM(),tQ(),nQ=(t,r,i,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${t}) * (${r});
  let whole = ${a}(big / (${i}));
  let fract = ${a}(big % (${i})) / ${a}(${i});
  return whole + fract;
`,nJ=(t,r,i,a)=>t.rank>a?`
    ${t.indicesSet("input_indices",r,"channel")};
    ${t.indicesSet("input_indices",i,"batch")};
`:"",n0=(t,r)=>{var i,a,n,s,o,l,u,d,p,c,h,f;let m,g,y,_,b,w,$,v,x,S,T,E,k,I,C,A,z=[],O=[],R=[],M=new Uint32Array(m=t.customDataBuffer,m.byteOffset,1)[0];if(0!==r.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((t,r,i,a,n,s)=>{let[o,l,u]=i>10?[1,2,3]:[-1,t.length>1?1:-1,-1],d=t[0].dims.length;if(o>0&&t.length>o&&t[o].dims.length>0)t[o].getFloat32Array().forEach(t=>s.push(t));else if("tf_crop_and_resize"===r.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&t.length>l&&1===t[l].dims.length&&t[l].dims[0]>0){var p,c,h;let n;if(t[l].getFloat32Array().forEach(t=>a.push(t)),0!==a.length&&a.length!==d&&i>=18&&a.length!==r.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((t,r)=>{if(t.every(t=>t>0||(()=>{throw Error("Resize requires scales input values to be positive")})),t.length>0){if("linear"===r.mode){if(2!==t.length&&3!==t.length&&(4!==t.length||1!==t[0]||1!==t[1])&&(4!==t.length||1!==t[0]||1!==t[3])&&(5!==t.length||1!==t[0]||1!==t[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===r.mode&&2!==t.length&&(4!==t.length||1!==t[0]||1!==t[1])&&(4!==t.length||1!==t[0]||1!==t[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(a,r),r.axes.length>0&&(p=a,c=r.axes,h=d,c.every(t=>t>=0&&t<h||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),n=Array(h).fill(1),c.forEach((t,r)=>n[t]=p[r]),n).forEach((t,r)=>a[r]=t)}if(u>0&&t.length>u&&1===t[u].dims.length&&t[u].dims[0]>0&&(t[u].getBigInt64Array().forEach(t=>n.push(Number(t))),0!==n.length&&n.length!==d&&i>=18&&n.length!==r.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(r.axes.length>0){if(0!==a.length&&a.length!==r.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==n.length&&n.length!==r.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof a&&"u">typeof n&&a.length>0&&n.length>d)throw Error("Resize requires only of scales or sizes to be specified")})(t.inputs,r,M,z,O,R),t.compute((i=t.inputs[0],a=r,n=M,s=z,o=O,l=R,_=i.dims,b=(u=l,d=a.axes,g=Array(p=_.length).fill(0).concat(Array(p).fill(1)),y=0===u.length?g:u.slice(),d.length>0?(d.forEach((t,r)=>{g[t]=y[r],g[r+p]=y[d.length+r]}),g):y),w=((t,r,i,a)=>{let n=[];if(i.length>0)if(a.length>0){if(t.forEach(t=>n.push(t)),Math.max(...a)>t.length)throw Error("axes is out of bound");a.forEach((t,r)=>n[t]=i[r])}else i.forEach(t=>n.push(t));else{if(0===r.length)throw Error("Resize requires either scales or sizes.");n=t.map((t,i)=>Math.round(t*r[i]))}return n})(_,s,o,a.axes),$=s.slice(),0===s.length&&($=_.map((t,r)=>0===t?1:w[r]/t),"stretch"!==a.keepAspectRatioPolicy&&(c=_,h=$,f=a,v=(()=>{switch(f.keepAspectRatioPolicy){case"not_larger":return f.axes.length>0?Math.min(...f.axes.map(t=>h[t]),Number.MAX_VALUE):Math.min(...h,Number.MAX_VALUE);case"not_smaller":return f.axes.length>0?Math.max(...f.axes.map(t=>h[t]),5e-324):Math.max(...h,5e-324);default:throw Error(`Keep aspect ratio policy ${f.keepAspectRatioPolicy} is not supported`)}})(),h.fill(1,0,h.length),x=c.slice(),f.axes.length>0?(f.axes.forEach(t=>h[t]=v),f.axes.forEach(t=>x[t]=Math.round(c[t]*h[t]))):(h.fill(v,0,h.length),x.forEach((t,r)=>x[r]=Math.round(t*h[r]))),w=x)),S=tH("output",i.dataType,w.length),T=tj("input",i.dataType,_.length),E=e9.size(w),k=_.length===w.length&&_.every((t,r)=>t===w[r]),I="tf_crop_and_resize"===a.coordinateTransformMode,C=a.extrapolationValue,A=T.type.value,{name:"Resize",shaderCache:{hint:`${a.cacheKey}|${n}|${$.length>0?"cubic"===a.mode?$:$.length:""}|${o.length>0?o:""}|${b.length>0?b:""}|${k}|${"nearest"===a.mode?_.length:_}`,inputDependencies:["rank"]},getShaderSource:t=>{let r,i;return`
      ${k?"":`
      ${r=a.coordinateTransformMode,i=A,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${i} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${i}(xResized) / ${i}(xScale);
          } else {
            ${nQ("xResized","lengthOriginal","lengthResized",i)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${i}(xResized) + 0.5) / ${i}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${i}(xResized) + 0.5) / ${i}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${nQ("xResized","lengthOriginal - 1","lengthResized - 1",i)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${i}(roiStart) * ${i}(lengthOriginal - 1) +
                        (${i}(xResized) * ${i}(roiEnd - roiStart) * ${i}(lengthOriginal - 1)) /
                        ${i}(lengthResized - 1);
                  } else {
                    return 0.5 * ${i}(roiStart + roiEnd) * ${i}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${i}xScale * ${i}(lengthResized);
                  const adjustment = ${i}(lengthResized) / outputWidth;
                  const center = ${i}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;case"half_pixel":return`return ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${r} is not supported`)}})()+"}"};
      ${(()=>{switch(a.mode){case"nearest":let t,r,i,s,o,l,u,d,p,c,h,f;return`
              ${t=T,r=_,`
    fn checkInputIndices(input_indices: ${t.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var input_index = ${t.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tG("uniforms.input_shape","i",r.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${i=a.nearestMode,s=n,o=A,`fn getNearestPixelFromOriginal(xOriginal: ${o}, isDownSample: bool) -> ${o} {`+(()=>{switch(i){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(s<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${i} is not supported`)}})()+"}"};
              ${l=T,u=S,d=_,p=w,c=$.length,h=b.length,f=I,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${u.type.indices}) -> ${l.type.indices} {
      var input_indices: ${l.type.indices};
      for (var i:u32 = 0; i < ${p.length}; i++) {
        var output_index = ${u.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tG("uniforms.scales","i",c)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tG("uniforms.roi","i",h)};
          var roi_hi = ${tG("uniforms.roi",`i + ${d.length}`,h)};
          var input_shape_i = ${tG("uniforms.input_shape","i",d.length)};
          var output_shape_i = ${tG("uniforms.output_shape","i",p.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${f} || (original_idx >= 0 && original_idx < ${u.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${u.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${l.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let m,g,y,v,x;return`
              ${m=S,g=_,y=w,v=$.length,x=b.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> array<${m.type.value}, ${y.length}> {
      var original_indices: array<${m.type.value}, ${y.length}>;
      for (var i:u32 = 0; i < ${y.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var scale = ${tG("uniforms.scales","i",v)};
        var roi_low = ${tG("uniforms.roi","i",x)};
        var roi_hi = ${tG("uniforms.roi",`i + ${g.length}`,x)};
        if (scale == 1.0) {
          original_indices[i] = ${m.type.value}(output_index);
        } else {
          var input_shape_i = ${tG("uniforms.input_shape","i",g.length)};
          var output_shape_i = ${tG("uniforms.output_shape","i",y.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===_.length||4===_.length)return`${((t,r,i,a,n)=>{let[s,o,l,u]=2===i.length?[-1,0,1,-1]:[0,2,3,1],d=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",o,`max(0, min(row, ${i[o]} - 1))`)};
      ${t.indicesSet("input_indices",l,`max(0, min(col, ${i[l]} - 1))`)};
      ${nJ(t,u,s,2)}
      return ${t.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${r.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${l}];
      ${a?`if (row < 0 || row > (${i[o]} - 1) || col < 0 || col > (${i[l]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${i[o]} - 1));
      col = max(0, min(col, ${i[l]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`})(T,S,_,I,C)}`;if(3===_.length||5===_.length)return`${((t,r,i,a,n)=>{let[s,o,l,u,d]=3===i.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",o,`max(0, min(depth, ${i[o]} - 1))`)};
      ${t.indicesSet("input_indices",l,`max(0, min(height, ${i[l]} - 1))`)};
      ${t.indicesSet("input_indices",u,`max(0, min(width, ${i[u]} - 1))`)};
      ${nJ(t,d,s,3)}
      return ${t.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${r.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${o}];
      var height:${p} = originalIndices[${l}];
      var width:${p} = originalIndices[${u}];
      ${a?`if (depth < 0 || depth > (${i[o]} - 1) || height < 0 || height > (${i[l]} - 1) || width < 0 || (width > ${i[u]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${i[o]} - 1));
      height = max(0, min(height, ${i[l]} - 1));
      width = max(0, min(width, ${i[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`})(T,S,_,I,C)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===_.length||4===_.length)return`${((t,r,i,a,n,s,o,l,u,d)=>{let[p,c]=2===i.length?[0,1]:[2,3],h=t.type.value,f=o=>{let c=o===p?"row":"col";return`
      fn ${c}CubicInterpolation(input_indices: ${t.type.indices}, output_indices: ${r.type.indices}) -> ${h} {
        var output_index = ${r.indicesGet("output_indices",o)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[o]},
        ${a[o]}, ${i[o]}, ${s[o]}, ${s[o]} + ${i.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${i[o]} - 1))) {
          return ${u};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${c}: ${h} = originalIdx + ${h}(i);
          if (${c} < 0 || ${c} >= ${i[o]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${u};`:`${c} = max(0, min(${c}, ${i[o]} - 1));`};
          }
        var input_indices_copy: ${t.type.indices} = input_indices;
          ${t.indicesSet("input_indices_copy",o,`u32(${c})`)};
          data[i + 1] = ${o===p?t.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(c)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${r.type.indices}) -> ${h} {
    var input_indices: ${t.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(T,S,_,w,$,b,a.cubicCoeffA,I,a.extrapolationValue,a.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${t.registerUniform("output_size","u32").registerUniform("scales","f32",$.length).registerUniform("roi","f32",b.length).declareVariables(T,S)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${k?"output[global_idx] = input[global_idx];":`
        let output_indices = ${S.offsetToIndices("global_idx")};
        var input_indices: ${T.type.indices};
        ${(()=>{switch(a.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${T.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${a.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===_.length||4===_.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${a.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:w,dataType:i.dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},{type:1,data:$},{type:1,data:b},...tU(_,w)]})}),{inputs:[0]})},n1=t=>{let r=t.antialias,i=t.axes,a=t.coordinateTransformMode,n=t.cubicCoeffA,s=0!==t.excludeOutside,o=t.extrapolationValue,l=t.keepAspectRatioPolicy,u=t.mode,d=""===t.nearestMode?"simple":t.nearestMode;return tR({antialias:r,axes:i,coordinateTransformMode:a,cubicCoeffA:n,excludeOutside:s,extrapolationValue:o,keepAspectRatioPolicy:l,mode:u,nearestMode:d})}}),n4=u(()=>{eQ(),ta(),tQ(),n3=(t,r)=>{var i,a,n,s;let o,l,u,d,p,c,h,f,m,g,y,_,b;(t=>{if(!t||t.length<3)throw Error("layerNorm requires at least 3 inputs.");let r=t[0],i=t[1],a=t[2];if(r.dataType!==i.dataType||r.dataType!==a.dataType)throw Error("All inputs must have the same data type");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Input must be 2D or 3D");if(3!==i.dims.length&&2!==i.dims.length)throw Error("Skip must be 2D or 3D");let n=r.dims[r.dims.length-1],s=r.dims[r.dims.length-2];if(i.dims[i.dims.length-1]!==n)throw Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==s)throw Error("Skip must have the same sequence length as input");if(1!==a.dims.length)throw Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==n)throw Error("Gamma must have the same hidden size as input");if(t.length>3){let r=t[3];if(1!==r.dims.length)throw Error("Beta must be 1D");if(r.dims[r.dims.length-1]!==n)throw Error("Beta must have the same hidden size as input")}if(t.length>4){let r=t[4];if(1!==r.dims.length)throw Error("Bias must be 1D");if(r.dims[r.dims.length-1]!==n)throw Error("Bias must have the same hidden size as input")}})(t.inputs);let w=[0];t.outputCount>1&&w.push(-3),t.outputCount>2&&w.push(-3),t.outputCount>3&&w.push(3),t.compute((i=t.inputs,a=r,n=t.outputCount,s=!1,o=a.simplified,l=i[0].dims,u=e9.size(l),d=l.slice(-1)[0],p=s?l.slice(0,-1).concat(1):[],c=!o&&i.length>3,h=i.length>4,f=s&&n>1,m=s&&n>2,g=n>3,_=[{type:12,data:u},{type:12,data:y=tL(d)},{type:12,data:d},{type:1,data:a.epsilon}],b=[{dims:l,dataType:i[0].dataType}],n>1&&b.push({dims:p,dataType:1}),n>2&&b.push({dims:p,dataType:1}),n>3&&b.push({dims:l,dataType:i[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${g}`,inputDependencies:i.map((t,r)=>"type")},getShaderSource:t=>{let r=[tj("x",i[0].dataType,i[0].dims,y),tj("skip",i[1].dataType,i[1].dims,y),tj("gamma",i[2].dataType,i[2].dims,y)];c&&r.push(tj("beta",i[3].dataType,i[3].dims,y)),h&&r.push(tj("bias",i[4].dataType,i[4].dims,y)),r.push(tH("output",i[0].dataType,l,y)),f&&r.push(tH("mean_output",1,p)),m&&r.push(tH("inv_std_output",1,p)),g&&r.push(tH("input_skip_bias_sum",i[0].dataType,l,y));let a=tP(i[0].dataType),n=tP(1,y);return`

      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...r)}
      var<workgroup> sum_shared : array<${n}, 64>;
      var<workgroup> sum_squared_shared : array<${n}, 64>;

      ${t.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":a+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tV(a,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${tq("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${tq("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:_})}),{outputs:w})}}),n9=u(()=>{eQ(),ta(),tM(),tQ(),n6=(t,r)=>{let i=[];if(t.length>r)if(7===t[r].dataType)t[r].getBigInt64Array().forEach(t=>i.push(Number(t)));else if(6===t[r].dataType)t[r].getInt32Array().forEach(t=>i.push(Number(t)));else throw Error(`Input ${r} must be an array of int32 or int64`);return i},n8=(t,r,i,a,n)=>{let s=t;return t<0&&(s+=i[a[r]]),n[r]<0?Math.max(0,Math.min(s,i[a[r]]-1)):Math.max(0,Math.min(s,i[a[r]]))},n5=(t,r)=>{var i=t.inputs,a=r;if(!i||i.length<1)throw Error("too few inputs");if(0!==a.axes.length){if(a.axes.length!==a.starts.length||a.axes.length!==a.ends.length)throw Error("axes, starts and ends must have the same length")}else if(a.starts.length!==a.ends.length)throw Error("starts and ends must have the same length");i.slice(1).forEach((t,r)=>{if(6!==i[r+1].dataType&&7!==i[r+1].dataType)throw Error(`Input ${r} must be an array of int32 or int64`)});let n=((t,r)=>{if(!(t.length>1))return r;{let r=n6(t,1),i=n6(t,2),a=n6(t,3);return 0===a.length&&(a=[...Array(t[0].dims.length).keys()]),tR({starts:r,ends:i,axes:a})}})(t.inputs,r);t.compute(((t,r)=>{let i=t[0].dims,a=e9.size(i),n=r.axes.length>0?e9.normalizeAxes(r.axes,i.length):[...Array(i.length).keys()],s=n6(t,4);s.forEach(t=>0!==t||(()=>{throw Error("step cannot be 0")})),0===s.length&&(s=Array(n.length).fill(1));let o=r.starts.map((t,r)=>n8(t,r,i,n,s)),l=r.ends.map((t,r)=>n8(t,r,i,n,s));if(n.length!==o.length||n.length!==l.length)throw Error("start, ends and axes should have the same number of elements");if(n.length!==i.length)for(let t=0;t<i.length;++t)n.includes(t)||(o.splice(t,0,0),l.splice(t,0,i[t]),s.splice(t,0,1));let u=s.map(t=>Math.sign(t));s.forEach((t,r,i)=>{if(t<0){let a=(l[r]-o[r])/t,n=o[r],u=n+a*s[r];o[r]=u,l[r]=n,i[r]=-t}});let d=i.slice(0);n.forEach((t,r)=>{d[t]=Math.ceil((l[t]-o[t])/s[t])});let p={dims:d,dataType:t[0].dataType},c=tH("output",t[0].dataType,d.length),h=tj("input",t[0].dataType,t[0].dims.length),f=e9.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:s.length}],g=[{type:12,data:f},{type:12,data:o},{type:6,data:u},{type:12,data:s},...tU(t[0].dims,d)];return{name:"Slice",shaderCache:{hint:`${u.length}_${o.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:t=>{let r,a,n;return`
      ${t.registerUniforms(m).declareVariables(h,c)}
        ${r=h,a=c,n=i,`fn calculateInputIndices(output_indices: ${a.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length-1}; i >= 0; i--) {
            let input_shape_i = ${tG("uniforms.input_shape","i",n.length)};
            let steps_i = ${tG("uniforms.steps","i",n.length)};
            let signs_i = ${tG("uniforms.signs","i",n.length)};
            let starts_i = ${tG("uniforms.starts","i",n.length)};
            var output_index = ${a.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:g})}})(t.inputs,n),{inputs:[0]})},n7=t=>{let r=t.starts,i=t.ends,a=t.axes;return tR({starts:r,ends:i,axes:a})}}),sr=u(()=>{eQ(),ta(),tM(),t3(),tQ(),se=(t,r)=>{var i,a;let n,s,o,l,u,d,p,c,h,f,m,g,y,_,b,w,$,v,x;(t=>{if(!t||1!==t.length)throw Error("Softmax op requires 1 input.")})(t.inputs),i=t,a=r,s=(n=i.inputs[0]).dims,o=e9.size(s),l=s.length,d=(u=e9.normalizeAxis(a.axis,l))<s.length-1,c=[],d?((c=Array.from({length:l},(t,r)=>r))[u]=l-1,c[l-1]=u,p=i.compute(t0(n,c),{inputs:[n],outputs:[-1]})[0]):p=n,m=o/(f=(h=p.dims)[l-1]),g=tL(f),y=f/g,_=64,1===m&&(_=256),b=tj("x",p.dataType,p.dims,g),w=tH("result",p.dataType,p.dims,g),$=b.type.value,v="f32"===tP(p.dataType)?`var threadMax = ${$}(-3.4028234663852886e+38f);`:`var threadMax = ${$}(-65504.0h);`,x=i.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:p.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:t=>{let r;return`
      var<workgroup> rowMaxShared : ${$};
      var<workgroup> rowSumShared : ${$};
      var<workgroup> threadShared : array<${$}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${$} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${$}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${t.registerUniform("packedCols","i32").declareVariables(b,w)}
      ${t.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${$}(${r="threadShared[0]",4===g?`max(max(${r}.x, ${r}.y), max(${r}.z, ${r}.w))`:2===g?`max(${r}.x, ${r}.y)`:3===g?`max(max(${r}.x, ${r}.y), ${r}.z)`:r});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${$}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${$}(${tq("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${$}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[p],outputs:[d?-1:0]})[0],d&&i.compute(t0(x,c),{inputs:[x]})},st=t=>tR({axis:t.axis})}),sn=u(()=>{eQ(),ta(),tQ(),si=t=>Array.from(t.getBigInt64Array(),Number),sa=t=>{var r,i;let a,n,s,o,l,u,d;(t=>{if(!t||2!==t.length)throw Error("Tile requires 2 inputs.");if(1!==t[0].dataType&&10!==t[0].dataType&&6!==t[0].dataType&&12!==t[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==t[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==t[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(si(t[1]).length!==t[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(t.inputs),t.compute((a=(r=t.inputs)[0].dims,s=((t,r)=>{let i=[];for(let a=0;a<t.length;++a)i.push(t[a]*r[a]);return i})(a,n=i??si(r[1])),o=e9.size(s),l=r[0].dataType,u=tj("input",l,a.length),d=tH("output",l,s.length),{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},...tU(r[0].dims,s)]}),getShaderSource:t=>`
      const inputShape = ${u.indices(...a)};
      ${t.registerUniform("output_size","u32").declareVariables(u,d)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${a.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),so=u(()=>{eQ(),ta(),tQ(),ss=t=>{t.compute((t=>{let r=t[1].dims,i=t[2].dims,a=t[0].dims,n=t[1].dataType,s=!(e9.areEqual(r,i)&&e9.areEqual(i,a)),o=r,l=e9.size(r);if(s){let t=e7.calcShape(e7.calcShape(r,i,!1),a,!1);if(!t)throw Error("Can't perform where op on the given tensors");o=t,l=e9.size(o)}let u=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:r=>((t,r,i,a,n)=>{let s=tH("output_data",n,i.length,4),o=tj("a_data",r[1].dataType,r[1].dims.length,4),l=tj("b_data",r[2].dataType,r[2].dims.length,4),u=tj("c_data",r[0].dataType,r[0].dims.length,4),d,p=(t,r,i)=>`select(${r}, ${t}, ${i})`;if(a){let t=(t,r,i="")=>{let a=`a_data[index_a${r}][component_a${r}]`,n=`b_data[index_b${r}][component_b${r}]`,d=`bool(c_data[index_c${r}] & (0xffu << (component_c${r} * 8)))`;return`
            let output_indices${r} = ${s.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offset_a${r} = ${o.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let offset_b${r} = ${l.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let offset_c${r} = ${u.broadcastedIndicesToOffset(`output_indices${r}`,s)};
            let index_a${r} = offset_a${r} / 4u;
            let index_b${r} = offset_b${r} / 4u;
            let index_c${r} = offset_c${r} / 4u;
            let component_a${r} = offset_a${r} % 4u;
            let component_b${r} = offset_b${r} % 4u;
            let component_c${r} = offset_c${r} % 4u;
            ${t}[${r}] = ${i}(${p(a,n,d)});
          `};d=9===n?`
            var data = vec4<u32>(0);
            ${t("data",0,"u32")}
            ${t("data",1,"u32")}
            ${t("data",2,"u32")}
            ${t("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${t("output_data[global_idx]",0)}
            ${t("output_data[global_idx]",1)}
            ${t("output_data[global_idx]",2)}
            ${t("output_data[global_idx]",3)}
          `}else d=s.setByOffset("global_idx",p(o.getByOffset("global_idx"),l.getByOffset("global_idx"),u.getByOffset("global_idx")));return`
        ${t.registerUniform("vec_size","u32").declareVariables(u,o,l,s)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`})(r,t,o,s,n),getRunData:()=>({outputs:[{dims:o,dataType:n}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:u},...tU(a,r,i,o)]})}})(t.inputs))}}),su=u(()=>{rz(),rB(),rP(),rU(),iv(),iM(),iP(),al(),ay(),aw(),ax(),aO(),aB(),aP(),aL(),aq(),aj(),aZ(),aQ(),a8(),nh(),ng(),n_(),nw(),nx(),nr(),nT(),nq(),nj(),nK(),nX(),rE(),n2(),nu(),n4(),n9(),sr(),ns(),sn(),t3(),iw(),so(),sl=new Map([["Abs",[rF]],["Acos",[rV]],["Acosh",[rq]],["Add",[iS]],["ArgMax",[rC,rA]],["ArgMin",[rI,rA]],["Asin",[rG]],["Asinh",[rW]],["Atan",[rj]],["Atanh",[rH]],["Attention",[rM]],["AveragePool",[nM,nR]],["BatchNormalization",[rD]],["BiasAdd",[rN]],["BiasSplitGelu",[i$]],["Cast",[rZ,rK]],["Ceil",[rX]],["Clip",[rY]],["Concat",[iB,iD]],["Conv",[ao,an]],["ConvTranspose",[ag,af]],["Cos",[rQ]],["Cosh",[rJ]],["CumSum",[a_,ab]],["DepthToSpace",[a$,av]],["DequantizeLinear",[nG,nW]],["Div",[iT]],["Einsum",[aA,az]],["Elu",[r1,r0]],["Equal",[iE]],["Erf",[r3]],["Exp",[r4]],["Expand",[aM]],["FastGelu",[aD]],["Floor",[r6]],["FusedConv",[ao,an]],["Gather",[aU,aN]],["GatherElements",[aK,aH]],["GatherBlockQuantized",[aG,aW]],["GatherND",[aF,aV]],["Gelu",[r8]],["Gemm",[aX,aY]],["GlobalAveragePool",[nP,nD]],["GlobalMaxPool",[nV,nF]],["Greater",[iA]],["GreaterOrEqual",[iO]],["GridSample",[a4,a6]],["GroupQueryAttention",[nc]],["HardSigmoid",[ia,ii]],["InstanceNormalization",[nm]],["LayerNormalization",[ny]],["LeakyRelu",[r5,r0]],["Less",[iz]],["LessOrEqual",[iR]],["Log",[iy]],["MatMul",[nb]],["MatMulNBits",[n$,nv]],["MaxPool",[nU,nL]],["Mul",[ik]],["MultiHeadAttention",[nt,a7]],["Neg",[r9]],["Not",[r7]],["Pad",[nS]],["Pow",[iI]],["QuickGelu",[ib,r0]],["Range",[nH]],["Reciprocal",[ie]],["ReduceMin",[r$]],["ReduceMean",[rg]],["ReduceMax",[rw]],["ReduceSum",[rx]],["ReduceProd",[rv]],["ReduceL1",[ry]],["ReduceL2",[r_]],["ReduceLogSum",[rT]],["ReduceLogSumExp",[rb]],["ReduceSumSquare",[rS]],["Relu",[it]],["Resize",[n0,n1]],["RotaryEmbedding",[nl]],["ScatterND",[nY,nZ]],["Sigmoid",[ir]],["Sin",[is]],["Sinh",[io]],["Slice",[n5,n7]],["SkipLayerNormalization",[n3]],["Split",[na,nn]],["Sqrt",[il]],["Softmax",[se,st]],["Sub",[iC]],["Tan",[iu]],["Tanh",[ip]],["ThresholdedRelu",[ig,r0]],["Tile",[sa]],["Transpose",[t1,t2]],["Where",[ss]]])}),sp=u(()=>{ed(),e8(),tQ(),sd=class{constructor(t){this.backend=t,this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,i,a,n){Y(t.programInfo.name);let s=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let l=[];for(let t of r)l.push({binding:l.length,resource:{buffer:t.buffer}});for(let t of i)l.push({binding:l.length,resource:{buffer:t.buffer}});n&&l.push({binding:l.length,resource:n});let u=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:l,label:t.programInfo.name});if("capturing"===this.backend.sessionStatus){let r={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:u,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(r)}o.setPipeline(t.computePipeline),o.setBindGroup(0,u),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),X(t.programInfo.name)}dispose(){}build(t,r){Y(t.name);let i=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(t=>{i.features.has(t.feature)&&a.push(`enable ${t.extension};`)});let n=tX(r,this.backend.device.limits),s=t.getShaderSource(n),o=`${a.join(`
`)}
${n.additionalImplementations}
${s}`,l=i.createShaderModule({code:o,label:t.name});e6("verbose",()=>`[WebGPU] ${t.name} shader code: ${o}`);let u=i.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:t.name});return X(t.name),{programInfo:t,computePipeline:u,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(t){let r="number"==typeof t?t:t.x,i="number"==typeof t?1:t.y||1,a="number"==typeof t?1:t.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=n&&i<=n&&a<=n)return[r,i,a];let s=r*i*a,o=Math.ceil(Math.sqrt(s));if(!(o>n))return[o,o,1];if((o=Math.ceil(Math.cbrt(s)))>n)throw Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}}}),d(sc={},{WebGpuBackend:()=>sf}),sm=u(()=>{ed(),eQ(),e8(),ts(),tz(),su(),sp(),sh=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},sf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let i=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},n=t=>r.features.has(t)&&i.push(t)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await r.requestDevice(a),this.adapterInfo=new sh(r.info||await r.requestAdapterInfo()),this.gpuDataManager=tA(this),this.programManager=new sd(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,e4(t.logLevel,!!t.debug),this.device.onuncapturederror=t=>{t.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${t.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};"at-passes"===this.queryType&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let t;this.commandEncoder&&(Y(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),t=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),i=this.pendingQueries.get(t);for(let t=0;t<r.length/2;t++){let a=i[t],n=a.kernelId,s=this.kernels.get(n),o=s.kernelType,l=s.kernelName,u=a.programName,d=a.inputTensorViews,p=a.outputTensorViews,c=r[2*t],h=r[2*t+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=c);let f=Number(c-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(t=>({dims:t.dims,dataType:eW(t.dataType)})),outputsMetadata:p.map(t=>({dims:t.dims,dataType:eW(t.dataType)})),kernelId:n,kernelType:o,kernelName:l,programName:u,startTime:f,endTime:m});else{let t="";d.forEach((r,i)=>{t+=`input[${i}]: [${r.dims}] | ${eW(r.dataType)}, `});let r="";p.forEach((t,i)=>{r+=`output[${i}]: [${t.dims}] | ${eW(t.dataType)}, `}),console.log(`[profiling] kernel "${n}|${o}|${l}|${u}" ${t}${r}start time: ${f} ns, execution time: ${m-f} ns`)}K("GPU",`${u}::${c}::${h}`)}t.unmap(),this.pendingQueries.delete(t)}),X())}run(t,r,i,a,n,s){var o,l,u;let d,p;Y(t.name);let c=[];for(let t=0;t<r.length;++t){let i=r[t].data;if(0===i)continue;let a=this.gpuDataManager.get(i);if(!a)throw Error(`no GPU data for input: ${i}`);c.push(a)}let{outputs:h,dispatchGroup:f,programUniforms:m}=t.getRunData(r),g=0===i.length?h.map((t,r)=>r):i;if(g.length!==h.length)throw Error(`Output size ${g.length} must be equal to ${h.length}.`);let y=[],_=[];for(let t=0;t<h.length;++t){if(!Number.isInteger(g[t])||g[t]<-3||g[t]>=s)throw Error(`Invalid output index: ${g[t]}`);if(-3===g[t])continue;let r=-1===g[t],i=-2===g[t],o=r||i?n(h[t].dataType,h[t].dims):a(g[t],h[t].dataType,h[t].dims);if(y.push(o),0===o.data)continue;let l=this.gpuDataManager.get(o.data);if(!l)throw Error(`no GPU data for output: ${o.data}`);if(r&&this.temporaryData.push(l),i){let t=this.kernelPersistentData.get(this.currentKernelId);t||(t=[],this.kernelPersistentData.set(this.currentKernelId,t)),t.push(l)}_.push(l)}if(c.length!==r.length||_.length!==y.length){if(0===_.length)return X(t.name),y;throw Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(m){let t=0,r=[];m.forEach(i=>{let a="number"==typeof i.data?[i.data]:i.data;if(0===a.length)return;let n=10===i.type?2:4,s,o;10===i.type?(o=a.length>4?16:a.length>2?8:a.length*n,s=a.length>4?16:n*a.length):(o=a.length<=2?a.length*n:16,s=16),t=Math.ceil(t/o)*o,r.push(t);let l=10===i.type?8:4;t+=a.length>4?Math.ceil(a.length/l)*s:a.length*n});let i=new ArrayBuffer(t=16*Math.ceil(t/16));m.forEach((t,a)=>{let n=r[a],s="number"==typeof t.data?[t.data]:t.data;if(6===t.type)new Int32Array(i,n,s.length).set(s);else if(12===t.type)new Uint32Array(i,n,s.length).set(s);else if(10===t.type)new Uint16Array(i,n,s.length).set(s);else if(1===t.type)new Float32Array(i,n,s.length).set(s);else throw Error(`Unsupported uniform type: ${eW(t.type)}`)});let a=this.gpuDataManager.create(t,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(a.buffer,0,i,0,t),this.gpuDataManager.release(a.id),d={offset:0,size:t,buffer:a.buffer}}let b=this.programManager.normalizeDispatchGroupSize(f),w=(o=t,l=r,u=1===b[1]&&1===b[2],p=o.name,o.shaderCache?.hint&&(p+="["+o.shaderCache.hint+"]"),p+=":"+u+`:${((t,r)=>{if(r.length!==t.length)throw Error(`inputDependencies length ${r.length} is not equal to inputTensors length ${t.length}.`);let i=[];for(let a=0;a<t.length;++a){let n=t[a].dataType;switch(r[a]){case"none":i.push("");break;case"type":i.push(`${n}`);break;case"rank":{let r=t[a].dims.length;i.push(`${n};${r}`);break}case"dims":{let r=t[a].dims.join(",");i.push(`${n};${r}`);break}default:throw Error(`unsupported input dependency: ${r[a]}`)}}return i.join("|")})(l,o.shaderCache?.inputDependencies??Array(l.length).fill("dims"))}`),$=this.programManager.getArtifact(w);if($||($=this.programManager.build(t,b),this.programManager.setArtifact(w,$),e6("info",()=>`[artifact] key: ${w}, programName: ${t.name}`)),m&&$.uniformVariablesInfo){if(m.length!==$.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${$.uniformVariablesInfo.length}, got ${m.length} in program "${$.programInfo.name}".`);for(let t=0;t<m.length;t++){let r=m[t],i=r.type,a="number"==typeof r.data?1:r.data.length,[n,s]=$.uniformVariablesInfo[t];if(i!==n||a!==s)throw Error(`Uniform variable ${t} mismatch: expect type ${n} with size ${s}, got type ${i} with size ${a} in program "${$.programInfo.name}".`)}}if(e6("info",()=>`[ProgramManager] run "${t.name}" (key=${w}) with ${b[0]}x${b[1]}x${b[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let t={kernelId:this.currentKernelId,programName:$.programInfo.name,inputTensorViews:r,outputTensorViews:y};this.pendingKernels.push(t),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(t)}return this.programManager.run($,c,_,b,d),X(t.name),y}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,i,a){let n=sl.get(t);if(!n)throw Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:a,kernelEntry:n[0],attributes:[n[1],i]};this.kernels.set(r,s)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,i){let a=this.kernels.get(t);if(!a)throw Error(`kernel not created: ${t}`);let n=a.kernelType,s=a.kernelName,o=a.kernelEntry,l=a.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${n}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,l[0]&&(l[1]=l[0](l[1]),l[0]=void 0),e6("info",()=>`[WebGPU] Start to run kernel "[${n}] ${s}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),o(r,l[1]),0}catch(t){return i.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${s}" failed. ${t}`)),1}finally{for(let t of(u&&i.push(this.device.popErrorScope().then(t=>t?`GPU validation error for kernel "[${n}] ${s}": ${t.message}`:null)),this.temporaryData))this.gpuDataManager.release(t.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,i,a){let n=this.sessionExternalDataMapping.get(t);n||(n=new Map,this.sessionExternalDataMapping.set(t,n));let s=n.get(r),o=this.gpuDataManager.registerExternalBuffer(i,a,s);return n.set(r,[o,i]),o}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,i){return async()=>{let a=await tI(this,t,r);return tn(a.buffer,i)}}writeTimestamp(t){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){e6("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){e6("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){e6("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),i=t.length;this.pendingKernels=[];for(let a=0;a<i;a++){let i=this.getComputePassEncoder(),n=t[a];this.writeTimestamp(2*this.pendingDispatchNumber),i.setPipeline(n.computePipeline),i.setBindGroup(0,n.bindGroup),i.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(r[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}}),d(sg={},{init:()=>sb}),sw=u(()=>{eQ(),e8(),ta(),t$(),sy=class t{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(r){if(e9.size(r)!==e9.size(this.dims))throw Error("Invalid new shape");return new t(this.module,this.dataType,this.data,r)}},s_=class{constructor(t,r,i){this.module=t,this.backend=r,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=r.adapterInfo;let a=t.PTR_SIZE,n=i/t.PTR_SIZE,s=4===a?"i32":"i64";this.opKernelContext=Number(t.getValue(a*n++,s));let o=Number(t.getValue(a*n++,s));this.outputCount=Number(t.getValue(a*n++,s)),this.customDataOffset=Number(t.getValue(a*n++,"*")),this.customDataSize=Number(t.getValue(a*n++,s));let l=[];for(let r=0;r<o;r++){let r=Number(t.getValue(a*n++,s)),i=Number(t.getValue(a*n++,"*")),o=Number(t.getValue(a*n++,s)),u=[];for(let r=0;r<o;r++)u.push(Number(t.getValue(a*n++,s)));l.push(new sy(t,r,i,u))}this.inputs=l}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let i=r?.inputs?.map(t=>"number"==typeof t?this.inputs[t]:t)??this.inputs,a=r?.outputs??[],n=(t,r,i)=>new sy(this.module,r,this.output(t,i),i),s=(t,r)=>{let i=ej(t,r);if(!i)throw Error(`Unsupported data type: ${t}`);let a=i>0?this.backend.gpuDataManager.create(i).id:0;return new sy(this.module,t,a,r)};return this.backend.run(t,i,a,n,s,this.outputCount)}output(t,r){let i=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=4===i?"i32":"i64",n=this.module.stackAlloc((1+r.length)*i);this.module.setValue(n,r.length,a);for(let t=0;t<r.length;t++)this.module.setValue(n+i*(t+1),r[t],a);return this.module._JsepOutput(this.opKernelContext,t,n)}catch(i){throw Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(i)}}},sb=async(t,r,i,a)=>{let n=r.jsepInit;if(!n)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===t){let t=new(sm(),p(sc)).WebGpuBackend;await t.initialize(i,a),n("webgpu",[t,r=>t.alloc(Number(r)),r=>t.free(r),(i,a,n,s=!1)=>{if(s)e6("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(a)}, size=${Number(n)}`),t.memcpy(Number(i),Number(a));else{e6("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(a)}, size=${Number(n)}`);let s=r.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(n));t.upload(Number(a),s)}},async(i,a,n)=>{e6("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${a}, size=${n}`),await t.download(Number(i),()=>r.HEAPU8.subarray(Number(a)>>>0,Number(a+n)>>>0))},(i,a,n)=>t.createKernel(i,Number(a),n,r.UTF8ToString(r._JsepGetNodeName(Number(a)))),r=>t.releaseKernel(r),(i,a,n,s)=>{e6("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${n}, kernel=${i}, contextDataOffset=${a}`);let o=new s_(r,t,Number(a));return t.computeKernel(Number(i),o,s)},()=>t.captureBegin(),()=>t.captureEnd(),()=>t.replay()])}else{let t=new tw(i);n("webnn",[t,()=>t.reserveTensorId(),r=>t.releaseTensorId(r),async(r,i,a,n,s)=>t.ensureTensor(r,i,a,n,s),(r,i)=>{t.uploadTensor(r,i)},async(r,i)=>t.downloadTensor(r,i),(r,i)=>t.registerMLContext(r,i),!!i.trace])}}}),sO=u(()=>{ed(),eU(),eq(),eQ(),eR(),eP(),e0(),s$=async t=>{var r,i;r=t.wasm.numThreads,i=eK(t.logLevel),0!==eO()._OrtInit(r,i)&&eD("Can't initialize onnxruntime.")},sv=async(t,r)=>{eO().asyncInit?.();let i=t.webgpu.adapter;if("webgpu"===r){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=t.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let a=t.webgpu.forceFallbackAdapter;if(void 0!==a&&"boolean"!=typeof a)throw Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===r&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let a=(sw(),p(sg)).init;"webgpu"===r&&await a("webgpu",eO(),t,i),"webnn"===r&&await a("webnn",eO(),t)}},sx=new Map,sS=(t,r)=>{let i=eO(),a=i.stackSave(),n=0;try{let a=i.PTR_SIZE,s=i.stackAlloc(2*a);0!==i._OrtGetInputOutputMetadata(t,r,s,s+a)&&eD("Can't get session input/output metadata.");let o=Number(i.getValue(s,"*"));n=Number(i.getValue(s+a,"*"));let l=i.HEAP32[n/4];if(0===l)return[o,0];let u=i.HEAPU32[n/4+1],d=[];for(let t=0;t<u;t++){let r=Number(i.getValue(n+8+t*a,"*"));d.push(0!==r?i.UTF8ToString(r):Number(i.getValue(n+8+(t+u)*a,"*")))}return[o,l,d]}finally{i.stackRestore(a),0!==n&&i._OrtFree(n)}},sT=t=>{let r=eO(),i=r._malloc(t.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return r.HEAPU8.set(t,i),[i,t.byteLength]},sE=async(t,r)=>{let i,a,n=eO();Array.isArray(t)?[i,a]=t:t.buffer===n.HEAPU8.buffer?[i,a]=[t.byteOffset,t.byteLength]:[i,a]=sT(t);let s=0,o=0,l=0,u=[],d=[],p=[];try{if([o,u]=await eV(r),r?.externalData&&n.mountExternalData){let t=[];for(let i of r.externalData){let r="string"==typeof i?i:i.path;t.push(eJ("string"==typeof i?i:i.data).then(t=>{n.mountExternalData(r,t)}))}await Promise.all(t)}for(let t of r?.executionProviders??[])if(("string"==typeof t?t:t.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,"string"!=typeof t){let r=t?.context,i=t?.gpuDevice,a=t?.deviceType,s=t?.powerPreference;r?n.currentContext=r:i?n.currentContext=await n.webnnCreateMLContext(i):n.currentContext=await n.webnnCreateMLContext({deviceType:a,powerPreference:s})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(i,a,o),n.webgpuOnCreateSession?.(s),0===s&&eD("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[t,c]=(t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);0!==r._OrtGetInputOutputCount(t,a,a+i)&&eD("Can't get session input/output count.");let n=4===i?"i32":"i64";return[Number(r.getValue(a,n)),Number(r.getValue(a+i,n))]}finally{r.stackRestore(i)}})(s),h=!!r?.enableGraphCapture,f=[],m=[],g=[],y=[],_=[];for(let r=0;r<t;r++){let[t,i,a]=sS(s,r);0===t&&eD("Can't get an input name."),d.push(t);let o=n.UTF8ToString(t);f.push(o),g.push(0===i?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:eW(i),shape:a})}for(let i=0;i<c;i++){let[a,o,l]=sS(s,i+t);0===a&&eD("Can't get an output name."),p.push(a);let u=n.UTF8ToString(a);m.push(u),y.push(0===o?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:eW(o),shape:l});{if(h&&r?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let t="string"==typeof r?.preferredOutputLocation?r.preferredOutputLocation:r?.preferredOutputLocation?.[u]??"cpu",i=n.webnnIsGraphOutput;if("cpu"===t&&i&&i(s,u)){_.push("ml-tensor-cpu-output");continue}if("cpu"!==t&&"cpu-pinned"!==t&&"gpu-buffer"!==t&&"ml-tensor"!==t)throw Error(`Not supported preferred output location: ${t}.`);if(h&&"gpu-buffer"!==t)throw Error(`Not supported preferred output location: ${t}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(t)}}let b=null;return _.some(t=>"gpu-buffer"===t||"ml-tensor"===t||"ml-tensor-cpu-output"===t)&&(l=n._OrtCreateBinding(s),0===l&&eD("Can't create IO binding."),b={handle:l,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(t=>"ml-tensor-cpu-output"===t?"ml-tensor":t).map(t=>eX(t))}),sx.set(s,[s,d,p,b,h,!1]),[s,f,m,g,y]}catch(t){throw d.forEach(t=>n._OrtFree(t)),p.forEach(t=>n._OrtFree(t)),0!==l&&0!==n._OrtReleaseBinding(l)&&eD("Can't release IO binding."),0!==s&&0!==n._OrtReleaseSession(s)&&eD("Can't release session."),t}finally{n._free(i),0!==o&&0!==n._OrtReleaseSessionOptions(o)&&eD("Can't release session options."),u.forEach(t=>n._free(t)),n.unmountExternalData?.()}},sk=t=>{let r=eO(),i=sx.get(t);if(!i)throw Error(`cannot release session. invalid session id: ${t}`);let[a,n,s,o,l]=i;o&&(l&&0!==r._OrtClearBoundOutputs(o.handle)&&eD("Can't clear bound outputs."),0!==r._OrtReleaseBinding(o.handle)&&eD("Can't release IO binding.")),r.jsepOnReleaseSession?.(t),r.webnnOnReleaseSession?.(t),r.webgpuOnReleaseSession?.(t),n.forEach(t=>r._OrtFree(t)),s.forEach(t=>r._OrtFree(t)),0!==r._OrtReleaseSession(a)&&eD("Can't release session."),sx.delete(t)},sI=async(t,r,i,a,n,s,o=!1)=>{if(!t)return void r.push(0);let l=eO(),u=l.PTR_SIZE,d=t[0],p=t[1],c=t[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===c){let r=t[2].gpuBuffer;m=ej(eG(d),p);{let t=l.jsepRegisterBuffer;if(!t)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=t(a,s,r,m)}}else if("ml-tensor"===c){let r=t[2].mlTensor;m=ej(eG(d),p);let i=l.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=i(a,r,eG(d),p)}else{let r=t[2];if(Array.isArray(r)){m=u*r.length,f=l._malloc(m),i.push(f);for(let t=0;t<r.length;t++){if("string"!=typeof r[t])throw TypeError(`tensor data at index ${t} is not a string`);l.setValue(f+t*u,eM(r[t],i),"*")}}else{let t=l.webnnIsGraphInput,s=l.webnnIsGraphOutput;if("string"!==d&&t&&s){let o=l.UTF8ToString(n);if(t(a,o)||s(a,o)){let t=eG(d);m=ej(t,p),h="ml-tensor";let i=l.webnnCreateTemporaryTensor,n=l.webnnUploadTensor;if(!i||!n)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await i(a,t,p);n(s,new Uint8Array(r.buffer,r.byteOffset,r.byteLength)),f=s}else m=r.byteLength,f=l._malloc(m),i.push(f),l.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}else m=r.byteLength,f=l._malloc(m),i.push(f),l.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}}let g=l.stackSave(),y=l.stackAlloc(4*p.length);try{p.forEach((t,r)=>l.setValue(y+r*u,t,4===u?"i32":"i64"));let t=l._OrtCreateTensor(eG(d),f,m,y,p.length,eX(h));0===t&&eD(`Can't create tensor for input/output. session=${a}, index=${s}.`),r.push(t)}finally{l.stackRestore(g)}},sC=async(t,r,i,a,n,s)=>{let o=eO(),l=o.PTR_SIZE,u=sx.get(t);if(!u)throw Error(`cannot run inference. invalid session id: ${t}`);let d=u[0],p=u[1],c=u[2],h=u[3],f=u[4],m=u[5],g=r.length,y=a.length,_=0,b=[],w=[],$=[],v=[],x=[],S=o.stackSave(),T=o.stackAlloc(g*l),E=o.stackAlloc(g*l),k=o.stackAlloc(y*l),I=o.stackAlloc(y*l);try{let u;[_,b]=eN(s),Q("wasm prepareInputOutputTensor");for(let a=0;a<g;a++)await sI(i[a],w,v,t,p[r[a]],r[a],f);for(let r=0;r<y;r++)await sI(n[r],$,v,t,c[a[r]],g+a[r],f);J("wasm prepareInputOutputTensor");for(let t=0;t<g;t++)o.setValue(T+t*l,w[t],"*"),o.setValue(E+t*l,p[r[t]],"*");for(let t=0;t<y;t++)o.setValue(k+t*l,$[t],"*"),o.setValue(I+t*l,c[a[t]],"*");if(h&&!m){let{handle:i,outputPreferredLocations:s,outputPreferredLocationsEncoded:l}=h;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);Q("wasm bindInputsOutputs");for(let a=0;a<g;a++){let n=r[a];await o._OrtBindInput(i,p[n],w[a])!==0&&eD(`Can't bind input[${a}] for session=${t}.`)}for(let r=0;r<y;r++){let u=a[r];n[r]?.[3]?(x.push($[r]),0!==o._OrtBindOutput(i,c[u],$[r],0)&&eD(`Can't bind pre-allocated output[${r}] for session=${t}.`)):0!==o._OrtBindOutput(i,c[u],0,l[u])&&eD(`Can't bind output[${r}] to ${s[r]} for session=${t}.`)}J("wasm bindInputsOutputs"),sx.set(t,[d,p,c,h,f,!0])}o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),u=h?await o._OrtRunWithBinding(d,h.handle,y,k,_):await o._OrtRun(d,E,T,g,I,y,k,_),0!==u&&eD("failed to call OrtRun().");let S=[],C=[];Q("wasm ProcessOutputTensor");for(let r=0;r<y;r++){let i=Number(o.getValue(k+r*l,"*"));if(i===$[r]||x.includes($[r])){S.push(n[r]),i!==$[r]&&0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.");continue}let s=o.stackSave(),u=o.stackAlloc(4*l),d=!1,p,c=0;try{0!==o._OrtGetTensorData(i,u,u+l,u+2*l,u+3*l)&&eD(`Can't access output tensor data on index ${r}.`);let n=4===l?"i32":"i64",s=Number(o.getValue(u,n));c=o.getValue(u+l,"*");let f=o.getValue(u+2*l,"*"),m=Number(o.getValue(u+3*l,n)),g=[];for(let t=0;t<m;t++)g.push(Number(o.getValue(f+t*l,n)));0!==o._OrtFree(f)&&eD("Can't free memory for tensor dims.");let y=g.reduce((t,r)=>t*r,1);p=eW(s);let _=h?.outputPreferredLocations[a[r]];if("string"===p){if("gpu-buffer"===_||"ml-tensor"===_)throw Error("String tensor is not supported on GPU.");let t=[];for(let r=0;r<y;r++){let i=o.getValue(c+r*l,"*"),a=o.getValue(c+(r+1)*l,"*"),n=r===y-1?void 0:a-i;t.push(o.UTF8ToString(i,n))}S.push([p,g,t,"cpu"])}else if("gpu-buffer"===_&&y>0){let t=o.jsepGetBuffer;if(!t)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let r=t(c),a=ej(s,y);if(void 0===a||!eZ(p))throw Error(`Unsupported data type: ${p}`);d=!0,S.push([p,g,{gpuBuffer:r,download:o.jsepCreateDownloader(r,a,p),dispose:()=>{0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===_&&y>0){let r=o.webnnEnsureTensor,a=o.webnnIsGraphInputOutputTypeSupported;if(!r||!a)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===ej(s,y)||!eY(p))throw Error(`Unsupported data type: ${p}`);if(!a(t,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let n=await r(t,c,s,g,!1);d=!0,S.push([p,g,{mlTensor:n,download:o.webnnCreateMLTensorDownloader(c,p),dispose:()=>{o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===_&&y>0){let t=o.webnnCreateMLTensorDownloader(c,p)(),r=S.length;d=!0,C.push((async()=>{let a=[r,await t];return o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i),a})()),S.push([p,g,[],"cpu"])}else{let t=new(eH(p))(y);new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(o.HEAPU8.subarray(c,c+t.byteLength)),S.push([p,g,t,"cpu"])}}finally{o.stackRestore(s),"string"===p&&c&&o._free(c),d||o._OrtReleaseTensor(i)}}for(let[r,i]of(h&&!f&&(0!==o._OrtClearBoundOutputs(h.handle)&&eD("Can't clear bound outputs."),sx.set(t,[d,p,c,h,f,!1])),await Promise.all(C)))S[r][2]=i;return J("wasm ProcessOutputTensor"),S}finally{o.webnnOnRunEnd?.(d),o.stackRestore(S),w.forEach(t=>o._OrtReleaseTensor(t)),$.forEach(t=>o._OrtReleaseTensor(t)),v.forEach(t=>o._free(t)),0!==_&&o._OrtReleaseRunOptions(_),b.forEach(t=>o._free(t))}},sA=t=>{let r=eO(),i=sx.get(t);if(!i)throw Error("invalid session id");let a=i[0],n=r._OrtEndProfiling(a);0===n&&eD("Can't get an profile file name."),r._OrtFree(n)},sz=t=>{let r=[];for(let i of t){let t=i[2];!Array.isArray(t)&&"buffer"in t&&r.push(t.buffer)}return r}}),sX=u(()=>{ed(),sO(),eR(),eE(),sR=()=>!!S.wasm.proxy&&"u">typeof document,sB=!1,sD=!1,sP=!1,sL=new Map,sF=(t,r)=>{let i=sL.get(t);i?i.push(r):sL.set(t,[r])},sV=()=>{if(sB||!sD||sP||!sM)throw Error("worker not ready")},sq=t=>{switch(t.data.type){case"init-wasm":sB=!1,t.data.err?(sP=!0,sU[1](t.data.err)):(sD=!0,sU[0]()),sN&&(URL.revokeObjectURL(sN),sN=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let r=sL.get(t.data.type);t.data.err?r.shift()[1](t.data.err):r.shift()[0](t.data.out)}}},sG=async()=>{if(!sD){if(sB)throw Error("multiple calls to 'initWasm()' detected.");if(sP)throw Error("previous call to 'initWasm()' failed.");if(sB=!0,sR())return new Promise((t,r)=>{sM?.terminate(),ex().then(([i,a])=>{try{(sM=a).onerror=t=>r(t),sM.onmessage=sq,sU=[t,r];let n={type:"init-wasm",in:S};if(!n.in.wasm.wasmPaths&&i){let t=e_();t&&(n.in.wasm.wasmPaths=t)}sM.postMessage(n),sN=i}catch(t){r(t)}},r)});try{await ez(S.wasm),await s$(S),sD=!0}catch(t){throw sP=!0,t}finally{sB=!1}}},sW=async t=>{if(sR())return sV(),new Promise((r,i)=>{sF("init-ep",[r,i]);let a={type:"init-ep",in:{epName:t,env:S}};sM.postMessage(a)});await sv(S,t)},sj=async t=>sR()?(sV(),new Promise((r,i)=>{sF("copy-from",[r,i]),sM.postMessage({type:"copy-from",in:{buffer:t}},[t.buffer])})):sT(t),sH=async(t,r)=>{if(!sR())return sE(t,r);if(r?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return sV(),new Promise((i,a)=>{sF("create",[i,a]);let n={type:"create",in:{model:t,options:{...r}}},s=[];t instanceof Uint8Array&&s.push(t.buffer),sM.postMessage(n,s)})},sK=async t=>{if(sR())return sV(),new Promise((r,i)=>{sF("release",[r,i]),sM.postMessage({type:"release",in:t})});sk(t)},sZ=async(t,r,i,a,n,s)=>{if(!sR())return sC(t,r,i,a,n,s);if(i.some(t=>"cpu"!==t[3]))throw Error("input tensor on GPU is not supported for proxy.");if(n.some(t=>t))throw Error("pre-allocated output tensor is not supported for proxy.");return sV(),new Promise((n,o)=>{sF("run",[n,o]),sM.postMessage({type:"run",in:{sessionId:t,inputIndices:r,inputs:i,outputIndices:a,options:s}},sz(i))})},sY=async t=>{if(sR())return sV(),new Promise((r,i)=>{sF("end-profiling",[r,i]),sM.postMessage({type:"end-profiling",in:t})});sA(t)}}),s1=u(()=>{ed(),sX(),eQ(),ep(),e0(),sQ=(t,r)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${t.location} for ${r()}`)}},sJ=t=>{switch(t[3]){case"cpu":return new j(t[0],t[2],t[1]);case"gpu-buffer":{let r=t[0];if(!eZ(r))throw Error(`not supported data type: ${r} for deserializing GPU tensor`);let{gpuBuffer:i,download:a,dispose:n}=t[2];return j.fromGpuBuffer(i,{dataType:r,dims:t[1],download:a,dispose:n})}case"ml-tensor":{let r=t[0];if(!eY(r))throw Error(`not supported data type: ${r} for deserializing MLTensor tensor`);let{mlTensor:i,download:a,dispose:n}=t[2];return j.fromMLTensor(i,{dataType:r,dims:t[1],download:a,dispose:n})}default:throw Error(`invalid data location: ${t[3]}`)}},s0=class{async fetchModelAndCopyToWasmMemory(t){return sj(await eJ(t))}async loadModel(t,r){let i;Y(),i="string"==typeof t?await this.fetchModelAndCopyToWasmMemory(t):t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await sH(i,r),X()}async dispose(){return sK(this.sessionId)}async run(t,r,i){Y();let a=[],n=[];Object.entries(t).forEach(t=>{let r=t[0],i=t[1],s=this.inputNames.indexOf(r);if(-1===s)throw Error(`invalid input '${r}'`);a.push(i),n.push(s)});let s=[],o=[];Object.entries(r).forEach(t=>{let r=t[0],i=t[1],a=this.outputNames.indexOf(r);if(-1===a)throw Error(`invalid output '${r}'`);s.push(i),o.push(a)});let l=a.map((t,r)=>sQ(t,()=>`input "${this.inputNames[n[r]]}"`)),u=s.map((t,r)=>t?sQ(t,()=>`output "${this.outputNames[o[r]]}"`):null),d=await sZ(this.sessionId,n,l,o,u,i),p={};for(let t=0;t<d.length;t++)p[this.outputNames[o[t]]]=s[t]??sJ(d[t]);return X(),p}startProfiling(){}endProfiling(){sY(this.sessionId)}}}),d(s2={},{OnnxruntimeWebAssemblyBackend:()=>s4,initializeFlags:()=>s3,wasmBackend:()=>s6}),s8=u(()=>{ed(),sX(),s1(),s3=()=>{("number"!=typeof S.wasm.initTimeout||S.wasm.initTimeout<0)&&(S.wasm.initTimeout=0);let t=S.wasm.simd;if("boolean"!=typeof t&&void 0!==t&&"fixed"!==t&&"relaxed"!==t&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),S.wasm.simd=!1),"boolean"!=typeof S.wasm.proxy&&(S.wasm.proxy=!1),"boolean"!=typeof S.wasm.trace&&(S.wasm.trace=!1),"number"!=typeof S.wasm.numThreads||!Number.isInteger(S.wasm.numThreads)||S.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)S.wasm.numThreads=1;else{let t=typeof navigator>"u"?l("node:os").cpus().length:navigator.hardwareConcurrency;S.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},s6=new(s4=class{async init(t){s3(),await sG(),await sW(t)}async createInferenceSessionHandler(t,r){let i=new s0;return await i.loadModel(t,r),i}})}),d(s5={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Q,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Y,TRACE_FUNC_END:()=>X,Tensor:()=>j,default:()=>s7,env:()=>S,registerBackend:()=>f}),ed(),ed(),ed(),s7=eu,s9=(s8(),p(s2)).wasmBackend,f("webgpu",s9,5),f("webnn",s9,5),f("cpu",s9,10),f("wasm",s9,10),Object.defineProperty(S.versions,"web",{value:"1.25.1",enumerable:!0}),r.exports=p(s5)},56801,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0})},48869,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.SileroLegacy=void 0;let a=t.r(74389);class n{constructor(t,r,i,a,n){this.ortInstance=t,this._session=r,this._h=i,this._c=a,this._sr=n,this.reset_state=()=>{let t=Array(128).fill(0);this._h=new this.ortInstance.Tensor("float32",t,[2,1,64]),this._c=new this.ortInstance.Tensor("float32",t,[2,1,64])},this.process=async t=>{let r={input:new this.ortInstance.Tensor("float32",t,[1,t.length]),h:this._h,c:this._c,sr:this._sr},i=await this._session.run(r);this._h=i.hn,this._c=i.cn;let[a]=i.output?.data;return{notSpeech:1-a,isSpeech:a}},this.release=async()=>{await this._session.release(),this._h.dispose(),this._c.dispose(),this._sr.dispose()}}}i.SileroLegacy=n,n.new=async(t,r)=>{a.log.debug("initializing vad");let i=await r(),s=await t.InferenceSession.create(i),o=new t.Tensor("int64",[16000n]),l=Array(128).fill(0),u=new t.Tensor("float32",l,[2,1,64]),d=new t.Tensor("float32",l,[2,1,64]);return a.log.debug("vad is initialized"),new n(t,s,u,d,o)}},18816,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.SileroV5=void 0;let a=t.r(74389);function n(t){let r=Array(256).fill(0);return new t.Tensor("float32",r,[2,1,128])}class s{constructor(t,r,i,a){this._session=t,this._state=r,this._sr=i,this.ortInstance=a,this.reset_state=()=>{this._state=n(this.ortInstance)},this.process=async t=>{let r={input:new this.ortInstance.Tensor("float32",t,[1,t.length]),state:this._state,sr:this._sr},i=await this._session.run(r);if(!i.stateN)throw Error("No state from model");if(this._state=i.stateN,!i.output?.data)throw Error("No output from model");let a=i.output.data[0];if("number"!=typeof a)throw Error("Weird output data");return{notSpeech:1-a,isSpeech:a}},this.release=async()=>{await this._session.release(),this._state.dispose(),this._sr.dispose()}}}i.SileroV5=s,s.new=async(t,r)=>{a.log.debug("Loading VAD...");let i=await r(),o=await t.InferenceSession.create(i),l=new t.Tensor("int64",[16000n]),u=n(t);return a.log.debug("...finished loading VAD"),new s(o,u,l,t)}},57289,(t,r,i)=>{"use strict";var a=t.e&&t.e.__createBinding||(Object.create?function(t,r,i,a){void 0===a&&(a=i);var n=Object.getOwnPropertyDescriptor(r,i);(!n||("get"in n?!r.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(t,a,n)}:function(t,r,i,a){void 0===a&&(a=i),t[a]=r[i]}),n=t.e&&t.e.__exportStar||function(t,r){for(var i in t)"default"===i||Object.prototype.hasOwnProperty.call(r,i)||a(r,t,i)};Object.defineProperty(i,"__esModule",{value:!0}),i.SileroV5=i.SileroLegacy=void 0,n(t.r(56801),i);var s=t.r(48869);Object.defineProperty(i,"SileroLegacy",{enumerable:!0,get:function(){return s.SileroLegacy}});var o=t.r(18816);Object.defineProperty(i,"SileroV5",{enumerable:!0,get:function(){return o.SileroV5}})},58868,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.Resampler=void 0;let a=t.r(74389);i.Resampler=class{constructor(t){this.options=t,this.process=t=>{let r=[];for(let i of t)for(this.inputBuffer.push(i);this.hasEnoughDataForFrame();){let t=this.generateOutputFrame();r.push(t)}return r},t.nativeSampleRate<16e3&&a.log.error("nativeSampleRate is too low. Should have 16000 = targetSampleRate <= nativeSampleRate"),this.inputBuffer=[]}async *stream(t){for(let r of t)for(this.inputBuffer.push(r);this.hasEnoughDataForFrame();){let t=this.generateOutputFrame();yield t}}hasEnoughDataForFrame(){return this.inputBuffer.length*this.options.targetSampleRate/this.options.nativeSampleRate>=this.options.targetFrameSize}generateOutputFrame(){let t=new Float32Array(this.options.targetFrameSize),r=0,i=0;for(;r<this.options.targetFrameSize;){let a=0,n=0;for(;i<Math.min(this.inputBuffer.length,(r+1)*this.options.nativeSampleRate/this.options.targetSampleRate);){let t=this.inputBuffer[i];void 0!==t&&(a+=t,n++),i++}t[r]=a/n,r++}return this.inputBuffer=this.inputBuffer.slice(i),t}}},73852,(t,r,i)=>{"use strict";var a=t.e&&t.e.__createBinding||(Object.create?function(t,r,i,a){void 0===a&&(a=i);var n=Object.getOwnPropertyDescriptor(r,i);(!n||("get"in n?!r.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(t,a,n)}:function(t,r,i,a){void 0===a&&(a=i),t[a]=r[i]}),n=t.e&&t.e.__setModuleDefault||(Object.create?function(t,r){Object.defineProperty(t,"default",{enumerable:!0,value:r})}:function(t,r){t.default=r}),s=t.e&&t.e.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&a(r,t,i);return n(r,t),r};Object.defineProperty(i,"__esModule",{value:!0}),i.NonRealTimeVAD=i.defaultNonRealTimeVADOptions=void 0;let o=s(t.r(74450)),l=t.r(74574),u=t.r(22237),d=t.r(43489),p=t.r(42827),c=t.r(57289),h=t.r(58868);i.defaultNonRealTimeVADOptions={...d.defaultFrameProcessorOptions,modelURL:l.baseAssetPath+"silero_vad_legacy.onnx",modelFetcher:u.defaultModelFetcher},i.NonRealTimeVAD=class{static async new(t={}){let r={...i.defaultNonRealTimeVADOptions,...t};(0,d.validateOptions)(r),void 0!==r.ortConfig&&r.ortConfig(o);let a=()=>r.modelFetcher(r.modelURL),n=await c.SileroLegacy.new(o,a),s=new d.FrameProcessor(n.process,n.reset_state,{positiveSpeechThreshold:r.positiveSpeechThreshold,negativeSpeechThreshold:r.negativeSpeechThreshold,redemptionMs:r.redemptionMs,preSpeechPadMs:r.preSpeechPadMs,minSpeechMs:r.minSpeechMs,submitUserSpeechOnPause:r.submitUserSpeechOnPause},96);return s.resume(),new this(a,o,r,s)}constructor(t,r,i,a){this.modelFetcher=t,this.ort=r,this.options=i,this.frameProcessor=a,this.frameSamples=1536}async *run(t,r){let i={nativeSampleRate:r,targetSampleRate:16e3,targetFrameSize:this.frameSamples},a=new h.Resampler(i),n=0,s=0,o=0;for await(let r of a.stream(t)){let t=[];for(let i of(await this.frameProcessor.process(r,r=>{t.push(r)}),t))switch(i.msg){case p.Message.SpeechStart:n=o*this.frameSamples/16;break;case p.Message.SpeechEnd:s=(o+1)*this.frameSamples/16,yield{audio:i.audio,start:n,end:s}}o++}let l=[];for(let t of(this.frameProcessor.endSegment(t=>{l.push(t)}),l))t.msg===p.Message.SpeechEnd&&(yield{audio:t.audio,start:n,end:o*this.frameSamples/16})}}},84407,(t,r,i)=>{"use strict";function a(t,r,i){for(let a=0;a<i.length;a++)t.setUint8(r+a,i.charCodeAt(a))}Object.defineProperty(i,"__esModule",{value:!0}),i.audioFileToArray=i.encodeWAV=i.arrayBufferToBase64=i.minFramesForTargetMS=void 0,i.minFramesForTargetMS=function(t,r,i=16e3){return Math.ceil(t*i/1e3/r)},i.arrayBufferToBase64=function(t){let r=new Uint8Array(t),i=r.byteLength,a=Array(i);for(let t=0;t<i;t++){let i=r[t];if(void 0===i)break;a[t]=String.fromCharCode(i)}return btoa(a.join(""))},i.encodeWAV=function(t,r=3,i=16e3,n=1,s=32){let o=s/8,l=n*o,u=new ArrayBuffer(44+t.length*o),d=new DataView(u);return a(d,0,"RIFF"),d.setUint32(4,36+t.length*o,!0),a(d,8,"WAVE"),a(d,12,"fmt "),d.setUint32(16,16,!0),d.setUint16(20,r,!0),d.setUint16(22,n,!0),d.setUint32(24,i,!0),d.setUint32(28,i*l,!0),d.setUint16(32,l,!0),d.setUint16(34,s,!0),a(d,36,"data"),d.setUint32(40,t.length*o,!0),1===r?function(t,r,i){for(let a=0;a<i.length;a++,r+=2){let n=Math.max(-1,Math.min(1,i[a]));t.setInt16(r,n<0?32768*n:32767*n,!0)}}(d,44,t):function(t,r,i){for(let a=0;a<i.length;a++,r+=4)t.setFloat32(r,i[a],!0)}(d,44,t),u},i.audioFileToArray=async function(t){let r=new OfflineAudioContext(1,1,44100),i=new FileReader,a=null;if(await new Promise(n=>{i.addEventListener("loadend",()=>{let t=i.result;r.decodeAudioData(t,t=>{a=t,r.startRendering().then(()=>{console.log("Rendering completed successfully"),n()}).catch(t=>{console.error("Rendering failed: ",t)})},t=>{console.log("Error with decoding audio data: ",t)})}),i.readAsArrayBuffer(t)}),null===a)throw Error("some shit");let n=a,s=new Float32Array(n.length);for(let t=0;t<n.length;t++)for(let r=0;r<n.numberOfChannels;r++){let i=n.getChannelData(r)[t],a=s[t];if(void 0===i||void 0===a)throw Error("sample or out[i] is undefined");s[t]=a+i}return{audio:s,sampleRate:n.sampleRate}}},5937,(t,r,i)=>{"use strict";var a,n,s,o,l,u,d,p,c,h,f,m,g,y,_,b,w,$,v,x,S,T,E,k,I,C,A,z,O,R,M,B,D,P,N,U,L,F,V,q,G,W,j,H,K,Z,Y,X,Q,J,ee,et,er,ei,ea,en,es,eo,el,eu,ed,ep,ec,eh,ef,em,eg,ey,e_,eb,ew,e$,ev,ex,eS,eT,eE,ek,eI,eC,eA,ez,eO,eR,eM,eB,eD,eP,eN,eU,eL,eF,eV,eq,eG,eW,ej,eH,eK,eZ,eY,eX,eQ,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,tr,ti,ta,tn,ts,to,tl,tu,td,tp,tc,th,tf,tm,tg,ty,t_,tb,tw,t$,tv,tx,tS,tT,tE,tk,tI,tC,tA,tz,tO;let tR;a=Object.defineProperty,n=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,l=t.t,u=(t,r)=>()=>(t&&(r=t(t=0)),r),d=(t,r)=>{for(var i in r)a(t,i,{get:r[i],enumerable:!0})},p=t=>((t,r,i,l)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let u of s(r))o.call(t,u)||u===i||a(t,u,{get:()=>r[u],enumerable:!(l=n(r,u))||l.enumerable});return t})(a({},"__esModule",{value:!0}),t),y=u(()=>{c=new Map,h=[],f=(t,r,i)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let a=c.get(t);if(void 0===a)c.set(t,{backend:r,priority:i});else{if(a.priority>i)return;if(a.priority===i&&a.backend!==r)throw Error(`cannot register backend "${t}" using priority ${i}`)}if(i>=0){let r=h.indexOf(t);-1!==r&&h.splice(r,1);for(let r=0;r<h.length;r++)if(c.get(h[r]).priority<=i)return void h.splice(r,0,t);h.push(t)}return}throw TypeError("not a valid backend")},m=async t=>{let r=c.get(t);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let i=!!r.initPromise;try{return i||(r.initPromise=r.backend.init(t)),await r.initPromise,r.initialized=!0,r.backend}catch(t){return i||(r.error=`${t}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},g=async t=>{let r=t.executionProviders||[],i=r.map(t=>"string"==typeof t?t:t.name),a=0===i.length?h:i,n,s=[],o=new Set;for(let t of a){let r=await m(t);"string"==typeof r?s.push({name:t,err:r}):(n||(n=r),n===r&&o.add(t))}if(!n)throw Error(`no available backend found. ERR: ${s.map(t=>`[${t.name}] ${t.err}`).join(", ")}`);for(let{name:t,err:r}of s)i.includes(t)&&console.warn(`removing requested execution provider "${t}" from session options because it is not available: ${r}`);let l=r.filter(t=>o.has("string"==typeof t?t:t.name));return[n,new Proxy(t,{get:(t,r)=>"executionProviders"===r?l:Reflect.get(t,r)})]}}),_=u(()=>{y()}),w=u(()=>{b="1.25.1"}),x=u(()=>{w(),$="warning",Object.defineProperty(v={wasm:{},webgl:{},webgpu:{},versions:{common:b},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);$=e}},get logLevel(){return $}},"logLevel",{enumerable:!0})}),T=u(()=>{x(),S=v}),I=u(()=>{E=(t,r)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=t.dims[3],i.height=t.dims[2];let a=i.getContext("2d");if(null!=a){let n,s;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=t.dims[2],s=t.dims[3]):(n=t.dims[3],s=t.dims[2]);let o=r?.format!==void 0?r.format:"RGB",l=r?.norm,u,d;void 0===l||void 0===l.mean?u=[255,255,255,255]:"number"==typeof l.mean?u=[l.mean,l.mean,l.mean,l.mean]:(u=[l.mean[0],l.mean[1],l.mean[2],0],void 0!==l.mean[3]&&(u[3]=l.mean[3])),void 0===l||void 0===l.bias?d=[0,0,0,0]:"number"==typeof l.bias?d=[l.bias,l.bias,l.bias,l.bias]:(d=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(d[3]=l.bias[3]));let p=s*n,c=0,h=p,f=2*p,m=-1;"RGBA"===o?(c=0,h=p,f=2*p,m=3*p):"RGB"===o?(c=0,h=p,f=2*p):"RBG"===o&&(c=0,f=p,h=2*p);for(let r=0;r<s;r++)for(let i=0;i<n;i++)a.fillStyle="rgba("+(t.data[c++]-d[0])*u[0]+","+(t.data[h++]-d[1])*u[1]+","+(t.data[f++]-d[2])*u[2]+","+(-1===m?255:(t.data[m++]-d[3])*u[3])+")",a.fillRect(i,r,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},k=(t,r)=>{let i="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(null!=i){let n,s,o;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(n=t.dims[2],s=t.dims[1],o=t.dims[3]):(n=t.dims[3],s=t.dims[2],o=t.dims[1]);let l=void 0!==r&&void 0!==r.format?r.format:"RGB",u=r?.norm,d,p;void 0===u||void 0===u.mean?d=[255,255,255,255]:"number"==typeof u.mean?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],void 0!==u.mean[3]&&(d[3]=u.mean[3])),void 0===u||void 0===u.bias?p=[0,0,0,0]:"number"==typeof u.bias?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(p[3]=u.bias[3]));let c=s*n;if(void 0!==r&&(void 0!==r.format&&4===o&&"RGBA"!==r.format||3===o&&"RGB"!==r.format&&"BGR"!==r.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,f=1,m=2,g=3,y=0,_=c,b=2*c,w=-1;"RGBA"===l?(y=0,_=c,b=2*c,w=3*c):"RGB"===l?(y=0,_=c,b=2*c):"RBG"===l&&(y=0,b=c,_=2*c),a=i.createImageData(n,s);for(let r=0;r<s*n;h+=4,f+=4,m+=4,g+=4,r++)a.data[h]=(t.data[y++]-p[0])*d[0],a.data[f]=(t.data[_++]-p[1])*d[1],a.data[m]=(t.data[b++]-p[2])*d[2],a.data[g]=-1===w?255:(t.data[w++]-p[3])*d[3]}else throw Error("Can not access image data");return a}}),B=u(()=>{W(),C=(t,r)=>{if(void 0===t)throw Error("Image buffer must be defined");if(void 0===r.height||void 0===r.width)throw Error("Image height and width must be defined");if("NHWC"===r.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:a}=r,n=r.norm??{mean:255,bias:0},s,o;s="number"==typeof n.mean?[n.mean,n.mean,n.mean,n.mean]:[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],o="number"==typeof n.bias?[n.bias,n.bias,n.bias,n.bias]:[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let l=void 0!==r.format?r.format:"RGBA",u=void 0!==r.tensorFormat&&void 0!==r.tensorFormat?r.tensorFormat:"RGB",d=i*a,p=new Float32Array("RGBA"===u?4*d:3*d),c=4,h=0,f=1,m=2,g=3,y=0,_=d,b=2*d,w=-1;"RGB"===l&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===u?w=3*d:"RBG"===u?(y=0,b=d,_=2*d):"BGR"===u&&(b=0,_=d,y=2*d);for(let r=0;r<d;r++,h+=c,m+=c,f+=c,g+=c)p[y++]=(t[h]+o[0])/s[0],p[_++]=(t[f]+o[1])/s[1],p[b++]=(t[m]+o[2])/s[2],-1!==w&&-1!==g&&(p[w++]=(t[g]+o[3])/s[3]);return"RGBA"===u?new G("float32",p,[1,4,i,a]):new G("float32",p,[1,3,i,a])},A=async(t,r)=>{let i="u">typeof HTMLImageElement&&t instanceof HTMLImageElement,a="u">typeof ImageData&&t instanceof ImageData,n="u">typeof ImageBitmap&&t instanceof ImageBitmap,s="string"==typeof t,o,l=r??{},u=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=t=>"u">typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||t instanceof OffscreenCanvas?t.getContext("2d"):null;if(i){let i=u();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let i=t.height,n=t.width;if(void 0!==r&&void 0!==r.resizedHeight&&void 0!==r.resizedWidth&&(i=r.resizedHeight,n=r.resizedWidth),void 0!==r){if(l=r,void 0!==r.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=i,l.width=n}else l.tensorFormat="RGBA",l.height=i,l.width=n;a.drawImage(t,0,0),o=a.getImageData(0,0,n,i).data}else throw Error("Can not access image data")}else if(a){let i,a;if(void 0!==r&&void 0!==r.resizedWidth&&void 0!==r.resizedHeight?(i=r.resizedHeight,a=r.resizedWidth):(i=t.height,a=t.width),void 0!==r&&(l=r),l.format="RGBA",l.height=i,l.width=a,void 0!==r){let r=u();r.width=a,r.height=i;let n=d(r);if(null!=n)n.putImageData(t,0,0),o=n.getImageData(0,0,a,i).data;else throw Error("Can not access image data")}else o=t.data}else if(n){if(void 0===r)throw Error("Please provide image config with format for Imagebitmap");let i=u();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let r=t.height,i=t.width;return a.drawImage(t,0,0,i,r),o=a.getImageData(0,0,i,r).data,l.height=r,l.width=i,C(o,l)}throw Error("Can not access image data")}else{if(s)return new Promise((r,i)=>{let a=u(),n=d(a);if(!t||!n)return i();let s=new Image;s.crossOrigin="Anonymous",s.src=t,s.onload=()=>{a.width=s.width,a.height=s.height,n.drawImage(s,0,0,a.width,a.height);let t=n.getImageData(0,0,a.width,a.height);l.height=a.height,l.width=a.width,r(C(t.data,l))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return C(o,l);throw Error("Input data provided is not supported - aborted tensor creation")},z=(t,r)=>{let{width:i,height:a,download:n,dispose:s}=r;return new G({location:"texture",type:"float32",texture:t,dims:[1,a,i,4],download:n,dispose:s})},O=(t,r)=>{let{dataType:i,dims:a,download:n,dispose:s}=r;return new G({location:"gpu-buffer",type:i??"float32",gpuBuffer:t,dims:a,download:n,dispose:s})},R=(t,r)=>{let{dataType:i,dims:a,download:n,dispose:s}=r;return new G({location:"ml-tensor",type:i??"float32",mlTensor:t,dims:a,download:n,dispose:s})},M=(t,r,i)=>new G({location:"cpu-pinned",type:t,data:r,dims:i??[r.length]})}),L=u(()=>{D=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),P=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),N=!1,U=()=>{if(!N){N=!0;let t="u">typeof BigInt64Array&&BigInt64Array.from,r="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,a="u">typeof i&&i.from;t&&(D.set("int64",BigInt64Array),P.set(BigInt64Array,"int64")),r&&(D.set("uint64",BigUint64Array),P.set(BigUint64Array,"uint64")),a?(D.set("float16",i),P.set(i,"float16")):D.set("float16",Uint16Array)}}}),q=u(()=>{W(),F=t=>{let r=1;for(let i=0;i<t.length;i++){let a=t[i];if("number"!=typeof a||!Number.isSafeInteger(a))throw TypeError(`dims[${i}] must be an integer, got: ${a}`);if(a<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${a}`);r*=a}return r},V=(t,r)=>{switch(t.location){case"cpu":return new G(t.type,t.data,r);case"cpu-pinned":return new G({location:"cpu-pinned",data:t.data,type:t.type,dims:r});case"texture":return new G({location:"texture",texture:t.texture,type:t.type,dims:r});case"gpu-buffer":return new G({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:r});case"ml-tensor":return new G({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:r});default:throw Error(`tensorReshape: tensor location ${t.location} is not supported`)}}}),W=u(()=>{I(),B(),L(),q(),G=class{constructor(t,r,i){let a,n;if(U(),"object"==typeof t&&"location"in t)switch(this.dataLocation=t.location,a=t.type,n=t.dims,t.location){case"cpu-pinned":{let r=D.get(a);if(!r)throw TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(t.data instanceof r))throw TypeError(`buffer should be of type ${r.name}`);this.cpuData=t.data;break}case"texture":if("float32"!==a)throw TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break;case"gpu-buffer":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break;case"ml-tensor":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint64"!==a&&"int8"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if("string"==typeof t)if(a=t,o=i,"string"===t){if(!Array.isArray(r))throw TypeError("A string tensor's data must be a string array.");s=r}else{let i=D.get(t);if(void 0===i)throw TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if("float16"===t&&i===Uint16Array||"uint4"===t||"int4"===t)throw TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${i.name} as data.`);s="uint64"===t||"int64"===t?i.from(r,BigInt):i.from(r)}else if(r instanceof i)s=r;else if(r instanceof Uint8ClampedArray)if("uint8"===t)s=Uint8Array.from(r);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===t&&r instanceof Uint16Array&&i!==Uint16Array)s=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw TypeError(`A ${a} tensor's data must be type of ${i}`)}else if(o=r,Array.isArray(t)){if(0===t.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let r=typeof t[0];if("string"===r)a="string",s=t;else if("boolean"===r)a="bool",s=Uint8Array.from(t);else throw TypeError(`Invalid element type of data array: ${r}.`)}else if(t instanceof Uint8ClampedArray)a="uint8",s=Uint8Array.from(t);else{let r=P.get(t.constructor);if(void 0===r)throw TypeError(`Unsupported type for tensor data: ${t.constructor}.`);a=r,s=t}if(void 0===o)o=[s.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let s=F(n);if(this.cpuData&&s!==this.cpuData.length&&("uint4"!==a&&"int4"!==a||Math.ceil(s/2)!==this.cpuData.length))throw Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=n,this.size=s}static async fromImage(t,r){return A(t,r)}static fromTexture(t,r){return z(t,r)}static fromGpuBuffer(t,r){return O(t,r)}static fromMLTensor(t,r){return R(t,r)}static fromPinnedBuffer(t,r,i){return M(t,r,i)}toDataURL(t){return E(this,t)}toImageData(t){return k(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return V(this,t)}}}),H=u(()=>{W(),j=G}),ee=u(()=>{x(),K=(t,r)=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeStamp(`${t}::ORT::${r}`)},Z=(t,r)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let n=0;n<i.length;n++){if(a&&!i[n].includes("TRACE_FUNC")){let a=`FUNC_${t}::${i[n].trim().split(" ")[1]}`;r&&(a+=`::${r}`),K("CPU",a);return}i[n].includes("TRACE_FUNC")&&(a=!0)}},Y=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("BEGIN",t)},X=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("END",t)},Q=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.time(`ORT::${t}`)},J=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeEnd(`ORT::${t}`)}}),er=u(()=>{y(),H(),ee(),et=class t{constructor(t){this.handler=t}async run(t,r,i){Y(),Q("InferenceSession.run");let a={},n={};if("object"!=typeof t||null===t||t instanceof j||Array.isArray(t))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if("object"==typeof r){if(null===r)throw TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof j)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(0===r.length)throw TypeError("'fetches' cannot be an empty array.");for(let t of(s=!1,r)){if("string"!=typeof t)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(t))throw RangeError(`'fetches' contains invalid output name: ${t}.`);a[t]=null}if("object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else{let t=!1,o=Object.getOwnPropertyNames(r);for(let i of this.outputNames)if(-1!==o.indexOf(i)){let n=r[i];(null===n||n instanceof j)&&(t=!0,s=!1,a[i]=n)}if(t){if("object"==typeof i&&null!==i)n=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else n=r}}else if("u">typeof r)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof t[r]>"u")throw Error(`input '${r}' is missing in 'feeds'.`);if(s)for(let t of this.outputNames)a[t]=null;let o=await this.handler.run(t,a,n),l={};for(let t in o)if(Object.hasOwnProperty.call(o,t)){let r=o[t];r instanceof j?l[t]=r:l[t]=new j(r.type,r.data,r.dims)}return J("InferenceSession.run"),X(),l}async release(){return this.handler.dispose()}static async create(r,i,a,n){Y(),Q("InferenceSession.create");let s,o={};if("string"==typeof r){if(s=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof Uint8Array){if(s=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&r instanceof SharedArrayBuffer){let t=0,l=r.byteLength;if("object"==typeof i&&null!==i)o=i;else if("number"==typeof i){if(!Number.isSafeInteger(t=i))throw RangeError("'byteOffset' must be an integer.");if(t<0||t>=r.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(l=r.byteLength-t,"number"==typeof a){if(!Number.isSafeInteger(l=a))throw RangeError("'byteLength' must be an integer.");if(l<=0||t+l>r.byteLength)throw RangeError(`'byteLength' is out of range (0, ${r.byteLength-t}].`);if("object"==typeof n&&null!==n)o=n;else if("u">typeof n)throw TypeError("'options' must be an object.")}else if("u">typeof a)throw TypeError("'byteLength' must be a number.")}else if("u">typeof i)throw TypeError("'options' must be an object.");s=new Uint8Array(r,t,l)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,u]=await g(o),d=await l.createInferenceSessionHandler(s,u);return J("InferenceSession.create"),X(),new t(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ea=u(()=>{er(),ei=et}),en=u(()=>{}),es=u(()=>{}),eo=u(()=>{}),el=u(()=>{}),d(eu={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Q,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Y,TRACE_FUNC_END:()=>X,Tensor:()=>j,env:()=>S,registerBackend:()=>f}),ed=u(()=>{_(),T(),ea(),H(),en(),es(),ee(),eo(),el()}),ep=u(()=>{}),d(ec={},{default:()=>ef}),em=u(()=>{tr(),eR(),eE(),(eh=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":ez(i.wasm).then(()=>{e1(i).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})})},t=>{postMessage({type:r,err:t})});break;case"init-ep":{let{epName:t,env:a}=i;e2(a,t).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})});break}case"copy-from":{let{buffer:t}=i,a=e6(t);postMessage({type:r,out:a});break}case"create":{let{model:t,options:a}=i;e8(t,a).then(t=>{postMessage({type:r,out:t})},t=>{postMessage({type:r,err:t})});break}case"release":e5(i),postMessage({type:r});break;case"run":{let{sessionId:t,inputIndices:a,inputs:n,outputIndices:s,options:o}=i;e9(t,a,n,s,Array(s.length).fill(null),o).then(t=>{t.some(t=>"cpu"!==t[3])?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:t},tt([...n,...t]))},t=>{postMessage({type:r,err:t})});break}case"end-profiling":te(i),postMessage({type:r})}}catch(t){postMessage({type:r,err:t})}}),ef=eh?null:t=>new Worker(t??ey,{type:"classic",name:"ort-wasm-proxy-worker"})}),eE=u(()=>{ep(),eg=typeof location>"u"?void 0:location.origin,ey="u">typeof document?document.currentScript?.src:"u">typeof self?self.location?.href:void 0,e_=()=>{if(ey&&!ey.startsWith("blob:"))return ey.substring(0,ey.lastIndexOf("/")+1)},eb=(t,r)=>{try{let i=r??ey;return(i?new URL(t,i):new URL(t)).origin===eg}catch{return!1}},ew=async t=>{let r=await (await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},e$=async t=>(await import(t)).default,ev=(em(),p(ec)).default,ex=async()=>{if(!ey)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(eb(ey))return[void 0,ev()];let t=await ew(ey);return[t,ev(t)]},eS=void 0,eT=async(t,r,i,a)=>{let n=eS&&!(t||r);if(n)if(ey)n=eb(ey)||a&&!i;else if(a&&!i)n=!0;else throw Error("cannot determine the script source URL.");if(n)return[void 0,eS];{let a,n,s="ort-wasm-simd-threaded.mjs",o=t??((t,r)=>{let i=r??ey;try{return(i?new URL(t,i):new URL(t)).href}catch{return}})(s,r),l=i&&o&&!eb(o,r),u=l?await ew(o):o??(a=s,n=r,`${n??"./"}${a}`);return[l?u:void 0,await e$(u)]}}}),eR=u(()=>{eE(),eI=!1,eC=!1,eA=!1,ez=async t=>{if(eI)return Promise.resolve();if(eC)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(eA)throw Error("previous call to 'initializeWebAssembly()' failed.");eC=!0;let r=t.initTimeout,i=t.numThreads;if(!1!==t.simd){if("relaxed"===t.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let a=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!a&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=i=1);let n=t.wasmPaths,s="string"==typeof n?n:void 0,o=n?.mjs,l=o?.href??o,u=n?.wasm,d=u?.href??u,p=t.wasmBinary,[c,h]=await eT(l,s,i>1,!!p||!!d),f=!1,m=[];if(r>0&&m.push(new Promise(t=>{setTimeout(()=>{f=!0,t()},r)})),m.push(new Promise((t,r)=>{let a={numThreads:i};if(p)a.wasmBinary=p,a.locateFile=t=>t;else if(d||s)a.locateFile=t=>d??s+t;else if(l&&0!==l.indexOf("blob:"))a.locateFile=t=>new URL(t,l).href;else if(c){let t=e_();t&&(a.locateFile=r=>t+r)}h(a).then(r=>{eC=!1,eI=!0,ek=r,t(),c&&URL.revokeObjectURL(c)},t=>{eC=!1,eA=!0,r(t)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`)},eO=()=>{if(eI&&ek)return ek;throw Error("WebAssembly is not initialized yet.")}}),eP=u(()=>{eR(),eM=(t,r)=>{let i=eO(),a=i.lengthBytesUTF8(t)+1,n=i._malloc(a);return i.stringToUTF8(t,n,a),r.push(n),n},eB=(t,r,i,a)=>{if("object"==typeof t&&null!==t){if(i.has(t))throw Error("Circular reference in options");i.add(t)}Object.entries(t).forEach(([t,n])=>{let s=r?r+t:t;if("object"==typeof n)eB(n,s+".",i,a);else if("string"==typeof n||"number"==typeof n)a(s,n.toString());else if("boolean"==typeof n)a(s,n?"1":"0");else throw Error(`Can't handle extra config type: ${typeof n}`)})},eD=t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetLastError(a,a+i);let n=Number(r.getValue(a,4===i?"i32":"i64")),s=r.getValue(a+i,"*"),o=s?r.UTF8ToString(s):"";throw Error(`${t} ERROR_CODE: ${n}, ERROR_MESSAGE: ${o}`)}finally{r.stackRestore(i)}}}),eU=u(()=>{eR(),eP(),eN=t=>{let r=eO(),i=0,a=[],n=t||{};try{if(t?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if("number"!=typeof t.logSeverityLevel||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if("number"!=typeof t.logVerbosityLevel||!Number.isInteger(t.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(n.terminate=!1);let s=0;return t?.tag!==void 0&&(s=eM(t.tag,a)),i=r._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,s),0===i&&eD("Can't create run options."),t?.extra!==void 0&&eB(t.extra,"",new WeakSet,(t,n)=>{let s=eM(t,a),o=eM(n,a);0!==r._OrtAddRunConfigEntry(i,s,o)&&eD(`Can't set a run config entry: ${t} - ${n}.`)}),[i,a]}catch(t){throw 0!==i&&r._OrtReleaseRunOptions(i),a.forEach(t=>r._free(t)),t}}}),eq=u(()=>{eR(),eP(),eL=(t,r,i,a)=>{let n=eM(r,a),s=eM(i,a);0!==eO()._OrtAddSessionConfigEntry(t,n,s)&&eD(`Can't set a session config entry: ${r} - ${i}.`)},eF=async(t,r,i)=>{for(let a of r.executionProviders){let r="string"==typeof a?a:a.name,n=[];switch(r){case"webnn":if(r="WEBNN","string"!=typeof a){let r=a?.deviceType;r&&eL(t,"deviceType",r,i)}break;case"webgpu":if(r="JS","string"!=typeof a&&a?.preferredLayout){if("NCHW"!==a.preferredLayout&&"NHWC"!==a.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);eL(t,"preferredLayout",a.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${r}`)}let s=eM(r,i),o=n.length,l=0,u=0;if(o>0){l=eO()._malloc(o*eO().PTR_SIZE),i.push(l),u=eO()._malloc(o*eO().PTR_SIZE),i.push(u);for(let t=0;t<o;t++)eO().setValue(l+t*eO().PTR_SIZE,n[t][0],"*"),eO().setValue(u+t*eO().PTR_SIZE,n[t][1],"*")}await eO()._OrtAppendExecutionProvider(t,s,l,u,o)!==0&&eD(`Can't append execution provider: ${r}.`)}},eV=async t=>{var r;let i,a=eO(),n=0,s=[],o=t||{};(r=o).extra||(r.extra={}),r.extra.session||(r.extra.session={}),(i=r.extra.session).use_ort_model_bytes_directly||(i.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(t=>("string"==typeof t?t:t.name)==="webgpu")&&(r.enableMemPattern=!1);try{let t=(t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${t}`)}})(o.graphOptimizationLevel??"all"),r=(t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${t}`)}})(o.executionMode??"sequential"),i="string"==typeof o.logId?eM(o.logId,s):0,l=o.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log severity level is not valid: ${l}`);let u=o.logVerbosityLevel??0;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log verbosity level is not valid: ${u}`);let d="string"==typeof o.optimizedModelFilePath?eM(o.optimizedModelFilePath,s):0;if(n=a._OrtCreateSessionOptions(t,!!o.enableCpuMemArena,!!o.enableMemPattern,r,!!o.enableProfiling,0,i,l,u,d),0===n&&eD("Can't create session options."),o.executionProviders&&await eF(n,o,s),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);eL(n,"enableGraphCapture",o.enableGraphCapture.toString(),s)}if(o.freeDimensionOverrides)for(let[t,r]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof t)throw Error(`free dimension override name must be a string: ${t}`);if("number"!=typeof r||!Number.isInteger(r)||r<0)throw Error(`free dimension override value must be a non-negative integer: ${r}`);let i=eM(t,s);0!==a._OrtAddFreeDimensionOverride(n,i,r)&&eD(`Can't set a free dimension override: ${t} - ${r}.`)}return void 0!==o.extra&&eB(o.extra,"",new WeakSet,(t,r)=>{eL(n,t,r,s)}),[n,s]}catch(t){throw 0!==n&&0!==a._OrtReleaseSessionOptions(n)&&eD("Can't release session options."),s.forEach(t=>a._free(t)),t}}}),eQ=u(()=>{eG=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${t}`)}},eW=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${t}`)}},ej=(t,r)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],a="number"==typeof r?r:r.reduce((t,r)=>t*r,1);return i>0?Math.ceil(a*i):void 0},eH=t=>{switch(t){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${t}`)}},eK=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${t}`)}},eZ=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eY=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint64"===t||"int8"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eX=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${t}`)}}}),e0=u(()=>{ep(),eJ=async t=>{if("string"!=typeof t)return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t);{let r=await fetch(t);if(!r.ok)throw Error(`failed to load external data file: ${t}`);let i=r.headers.get("Content-Length"),a=i?parseInt(i,10):0;if(a<0x40000000)return new Uint8Array(await r.arrayBuffer());{if(!r.body)throw Error(`failed to load external data file: ${t}, no response body.`);let i=r.body.getReader(),n;try{n=new ArrayBuffer(a)}catch(t){if(t instanceof RangeError){let t=Math.ceil(a/65536);n=new WebAssembly.Memory({initial:t,maximum:t}).buffer}else throw t}let s=0;for(;;){let{done:t,value:r}=await i.read();if(t)break;let a=r.byteLength;new Uint8Array(n,s,a).set(r),s+=a}return new Uint8Array(n,0,a)}}}}),tr=u(()=>{ed(),eU(),eq(),eQ(),eR(),eP(),e0(),e1=async t=>{var r,i;r=t.wasm.numThreads,i=eK(t.logLevel),0!==eO()._OrtInit(r,i)&&eD("Can't initialize onnxruntime.")},e2=async(t,r)=>{eO().asyncInit?.();let i=t.webgpu.adapter;if("webgpu"===r){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=t.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let a=t.webgpu.forceFallbackAdapter;if(void 0!==a&&"boolean"!=typeof a)throw Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===r&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment")},e3=new Map,e4=(t,r)=>{let i=eO(),a=i.stackSave(),n=0;try{let a=i.PTR_SIZE,s=i.stackAlloc(2*a);0!==i._OrtGetInputOutputMetadata(t,r,s,s+a)&&eD("Can't get session input/output metadata.");let o=Number(i.getValue(s,"*"));n=Number(i.getValue(s+a,"*"));let l=i.HEAP32[n/4];if(0===l)return[o,0];let u=i.HEAPU32[n/4+1],d=[];for(let t=0;t<u;t++){let r=Number(i.getValue(n+8+t*a,"*"));d.push(0!==r?i.UTF8ToString(r):Number(i.getValue(n+8+(t+u)*a,"*")))}return[o,l,d]}finally{i.stackRestore(a),0!==n&&i._OrtFree(n)}},e6=t=>{let r=eO(),i=r._malloc(t.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return r.HEAPU8.set(t,i),[i,t.byteLength]},e8=async(t,r)=>{let i,a,n=eO();Array.isArray(t)?[i,a]=t:t.buffer===n.HEAPU8.buffer?[i,a]=[t.byteOffset,t.byteLength]:[i,a]=e6(t);let s=0,o=0,l=[],u=[],d=[];try{if([o,l]=await eV(r),r?.externalData&&n.mountExternalData){let t=[];for(let i of r.externalData){let r="string"==typeof i?i:i.path;t.push(eJ("string"==typeof i?i:i.data).then(t=>{n.mountExternalData(r,t)}))}await Promise.all(t)}for(let t of r?.executionProviders??[])if(("string"==typeof t?t:t.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,"string"!=typeof t){let r=t?.context,i=t?.gpuDevice,a=t?.deviceType,s=t?.powerPreference;r?n.currentContext=r:i?n.currentContext=await n.webnnCreateMLContext(i):n.currentContext=await n.webnnCreateMLContext({deviceType:a,powerPreference:s})}else n.currentContext=await n.webnnCreateMLContext();break}s=await n._OrtCreateSession(i,a,o),n.webgpuOnCreateSession?.(s),0===s&&eD("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(s,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[t,p]=(t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);0!==r._OrtGetInputOutputCount(t,a,a+i)&&eD("Can't get session input/output count.");let n=4===i?"i32":"i64";return[Number(r.getValue(a,n)),Number(r.getValue(a+i,n))]}finally{r.stackRestore(i)}})(s),c=!!r?.enableGraphCapture,h=[],f=[],m=[],g=[];for(let r=0;r<t;r++){let[t,i,a]=e4(s,r);0===t&&eD("Can't get an input name."),u.push(t);let o=n.UTF8ToString(t);h.push(o),m.push(0===i?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:eW(i),shape:a})}for(let r=0;r<p;r++){let[i,a,o]=e4(s,r+t);0===i&&eD("Can't get an output name."),d.push(i);let l=n.UTF8ToString(i);f.push(l),g.push(0===a?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:eW(a),shape:o})}return e3.set(s,[s,u,d,null,c,!1]),[s,h,f,m,g]}catch(t){throw u.forEach(t=>n._OrtFree(t)),d.forEach(t=>n._OrtFree(t)),0!==s&&0!==n._OrtReleaseSession(s)&&eD("Can't release session."),t}finally{n._free(i),0!==o&&0!==n._OrtReleaseSessionOptions(o)&&eD("Can't release session options."),l.forEach(t=>n._free(t)),n.unmountExternalData?.()}},e5=t=>{let r=eO(),i=e3.get(t);if(!i)throw Error(`cannot release session. invalid session id: ${t}`);let[a,n,s,o,l]=i;o&&(l&&0!==r._OrtClearBoundOutputs(o.handle)&&eD("Can't clear bound outputs."),0!==r._OrtReleaseBinding(o.handle)&&eD("Can't release IO binding.")),r.jsepOnReleaseSession?.(t),r.webnnOnReleaseSession?.(t),r.webgpuOnReleaseSession?.(t),n.forEach(t=>r._OrtFree(t)),s.forEach(t=>r._OrtFree(t)),0!==r._OrtReleaseSession(a)&&eD("Can't release session."),e3.delete(t)},e7=async(t,r,i,a,n,s,o=!1)=>{if(!t)return void r.push(0);let l=eO(),u=l.PTR_SIZE,d=t[0],p=t[1],c=t[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if("gpu-buffer"===c){let r=t[2].gpuBuffer;m=ej(eG(d),p);{let t=l.jsepRegisterBuffer;if(!t)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=t(a,s,r,m)}}else if("ml-tensor"===c){let r=t[2].mlTensor;m=ej(eG(d),p);let i=l.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=i(a,r,eG(d),p)}else{let r=t[2];if(Array.isArray(r)){m=u*r.length,f=l._malloc(m),i.push(f);for(let t=0;t<r.length;t++){if("string"!=typeof r[t])throw TypeError(`tensor data at index ${t} is not a string`);l.setValue(f+t*u,eM(r[t],i),"*")}}else{let t=l.webnnIsGraphInput,s=l.webnnIsGraphOutput;if("string"!==d&&t&&s){let o=l.UTF8ToString(n);if(t(a,o)||s(a,o)){let t=eG(d);m=ej(t,p),h="ml-tensor";let i=l.webnnCreateTemporaryTensor,n=l.webnnUploadTensor;if(!i||!n)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let s=await i(a,t,p);n(s,new Uint8Array(r.buffer,r.byteOffset,r.byteLength)),f=s}else m=r.byteLength,f=l._malloc(m),i.push(f),l.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}else m=r.byteLength,f=l._malloc(m),i.push(f),l.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}}let g=l.stackSave(),y=l.stackAlloc(4*p.length);try{p.forEach((t,r)=>l.setValue(y+r*u,t,4===u?"i32":"i64"));let t=l._OrtCreateTensor(eG(d),f,m,y,p.length,eX(h));0===t&&eD(`Can't create tensor for input/output. session=${a}, index=${s}.`),r.push(t)}finally{l.stackRestore(g)}},e9=async(t,r,i,a,n,s)=>{let o=eO(),l=o.PTR_SIZE,u=e3.get(t);if(!u)throw Error(`cannot run inference. invalid session id: ${t}`);let d=u[0],p=u[1],c=u[2],h=u[3],f=u[4],m=(u[5],r.length),g=a.length,y=0,_=[],b=[],w=[],$=[],v=[],x=o.stackSave(),S=o.stackAlloc(m*l),T=o.stackAlloc(m*l),E=o.stackAlloc(g*l),k=o.stackAlloc(g*l);try{let u;[y,_]=eN(s),Q("wasm prepareInputOutputTensor");for(let a=0;a<m;a++)await e7(i[a],b,$,t,p[r[a]],r[a],f);for(let r=0;r<g;r++)await e7(n[r],w,$,t,c[a[r]],m+a[r],f);J("wasm prepareInputOutputTensor");for(let t=0;t<m;t++)o.setValue(S+t*l,b[t],"*"),o.setValue(T+t*l,p[r[t]],"*");for(let t=0;t<g;t++)o.setValue(E+t*l,w[t],"*"),o.setValue(k+t*l,c[a[t]],"*");o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),u=await o._OrtRun(d,T,S,m,k,g,E,y),0!==u&&eD("failed to call OrtRun().");let x=[],I=[];Q("wasm ProcessOutputTensor");for(let r=0;r<g;r++){let i=Number(o.getValue(E+r*l,"*"));if(i===w[r]||v.includes(w[r])){x.push(n[r]),i!==w[r]&&0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.");continue}let s=o.stackSave(),u=o.stackAlloc(4*l),d=!1,p,c=0;try{0!==o._OrtGetTensorData(i,u,u+l,u+2*l,u+3*l)&&eD(`Can't access output tensor data on index ${r}.`);let n=4===l?"i32":"i64",s=Number(o.getValue(u,n));c=o.getValue(u+l,"*");let f=o.getValue(u+2*l,"*"),m=Number(o.getValue(u+3*l,n)),g=[];for(let t=0;t<m;t++)g.push(Number(o.getValue(f+t*l,n)));0!==o._OrtFree(f)&&eD("Can't free memory for tensor dims.");let y=g.reduce((t,r)=>t*r,1);p=eW(s);let _=h?.outputPreferredLocations[a[r]];if("string"===p){if("gpu-buffer"===_||"ml-tensor"===_)throw Error("String tensor is not supported on GPU.");let t=[];for(let r=0;r<y;r++){let i=o.getValue(c+r*l,"*"),a=o.getValue(c+(r+1)*l,"*"),n=r===y-1?void 0:a-i;t.push(o.UTF8ToString(i,n))}x.push([p,g,t,"cpu"])}else if("gpu-buffer"===_&&y>0){let t=o.jsepGetBuffer;if(!t)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let r=t(c),a=ej(s,y);if(void 0===a||!eZ(p))throw Error(`Unsupported data type: ${p}`);d=!0,x.push([p,g,{gpuBuffer:r,download:o.jsepCreateDownloader(r,a,p),dispose:()=>{0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===_&&y>0){let r=o.webnnEnsureTensor,a=o.webnnIsGraphInputOutputTypeSupported;if(!r||!a)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===ej(s,y)||!eY(p))throw Error(`Unsupported data type: ${p}`);if(!a(t,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let n=await r(t,c,s,g,!1);d=!0,x.push([p,g,{mlTensor:n,download:o.webnnCreateMLTensorDownloader(c,p),dispose:()=>{o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===_&&y>0){let t=o.webnnCreateMLTensorDownloader(c,p)(),r=x.length;d=!0,I.push((async()=>{let a=[r,await t];return o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i),a})()),x.push([p,g,[],"cpu"])}else{let t=new(eH(p))(y);new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(o.HEAPU8.subarray(c,c+t.byteLength)),x.push([p,g,t,"cpu"])}}finally{o.stackRestore(s),"string"===p&&c&&o._free(c),d||o._OrtReleaseTensor(i)}}for(let[r,i]of(h&&!f&&(0!==o._OrtClearBoundOutputs(h.handle)&&eD("Can't clear bound outputs."),e3.set(t,[d,p,c,h,f,!1])),await Promise.all(I)))x[r][2]=i;return J("wasm ProcessOutputTensor"),x}finally{o.webnnOnRunEnd?.(d),o.stackRestore(x),b.forEach(t=>o._OrtReleaseTensor(t)),w.forEach(t=>o._OrtReleaseTensor(t)),$.forEach(t=>o._free(t)),0!==y&&o._OrtReleaseRunOptions(y),_.forEach(t=>o._free(t))}},te=t=>{let r=eO(),i=e3.get(t);if(!i)throw Error("invalid session id");let a=i[0],n=r._OrtEndProfiling(a);0===n&&eD("Can't get an profile file name."),r._OrtFree(n)},tt=t=>{let r=[];for(let i of t){let t=i[2];!Array.isArray(t)&&"buffer"in t&&r.push(t.buffer)}return r}}),t$=u(()=>{ed(),tr(),eR(),eE(),ti=()=>!!S.wasm.proxy&&"u">typeof document,tn=!1,ts=!1,to=!1,td=new Map,tp=(t,r)=>{let i=td.get(t);i?i.push(r):td.set(t,[r])},tc=()=>{if(tn||!ts||to||!ta)throw Error("worker not ready")},th=t=>{switch(t.data.type){case"init-wasm":tn=!1,t.data.err?(to=!0,tu[1](t.data.err)):(ts=!0,tu[0]()),tl&&(URL.revokeObjectURL(tl),tl=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let r=td.get(t.data.type);t.data.err?r.shift()[1](t.data.err):r.shift()[0](t.data.out)}}},tf=async()=>{if(!ts){if(tn)throw Error("multiple calls to 'initWasm()' detected.");if(to)throw Error("previous call to 'initWasm()' failed.");if(tn=!0,ti())return new Promise((t,r)=>{ta?.terminate(),ex().then(([i,a])=>{try{(ta=a).onerror=t=>r(t),ta.onmessage=th,tu=[t,r];let n={type:"init-wasm",in:S};if(!n.in.wasm.wasmPaths&&i){let t=e_();t&&(n.in.wasm.wasmPaths=t)}ta.postMessage(n),tl=i}catch(t){r(t)}},r)});try{await ez(S.wasm),await e1(S),ts=!0}catch(t){throw to=!0,t}finally{tn=!1}}},tm=async t=>{if(ti())return tc(),new Promise((r,i)=>{tp("init-ep",[r,i]);let a={type:"init-ep",in:{epName:t,env:S}};ta.postMessage(a)});await e2(S,t)},tg=async t=>ti()?(tc(),new Promise((r,i)=>{tp("copy-from",[r,i]),ta.postMessage({type:"copy-from",in:{buffer:t}},[t.buffer])})):e6(t),ty=async(t,r)=>{if(!ti())return e8(t,r);if(r?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return tc(),new Promise((i,a)=>{tp("create",[i,a]);let n={type:"create",in:{model:t,options:{...r}}},s=[];t instanceof Uint8Array&&s.push(t.buffer),ta.postMessage(n,s)})},t_=async t=>{if(ti())return tc(),new Promise((r,i)=>{tp("release",[r,i]),ta.postMessage({type:"release",in:t})});e5(t)},tb=async(t,r,i,a,n,s)=>{if(!ti())return e9(t,r,i,a,n,s);if(i.some(t=>"cpu"!==t[3]))throw Error("input tensor on GPU is not supported for proxy.");if(n.some(t=>t))throw Error("pre-allocated output tensor is not supported for proxy.");return tc(),new Promise((n,o)=>{tp("run",[n,o]),ta.postMessage({type:"run",in:{sessionId:t,inputIndices:r,inputs:i,outputIndices:a,options:s}},tt(i))})},tw=async t=>{if(ti())return tc(),new Promise((r,i)=>{tp("end-profiling",[r,i]),ta.postMessage({type:"end-profiling",in:t})});te(t)}}),tT=u(()=>{ed(),t$(),eQ(),ep(),e0(),tv=(t,r)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${t.location} for ${r()}`)}},tx=t=>{switch(t[3]){case"cpu":return new j(t[0],t[2],t[1]);case"gpu-buffer":{let r=t[0];if(!eZ(r))throw Error(`not supported data type: ${r} for deserializing GPU tensor`);let{gpuBuffer:i,download:a,dispose:n}=t[2];return j.fromGpuBuffer(i,{dataType:r,dims:t[1],download:a,dispose:n})}case"ml-tensor":{let r=t[0];if(!eY(r))throw Error(`not supported data type: ${r} for deserializing MLTensor tensor`);let{mlTensor:i,download:a,dispose:n}=t[2];return j.fromMLTensor(i,{dataType:r,dims:t[1],download:a,dispose:n})}default:throw Error(`invalid data location: ${t[3]}`)}},tS=class{async fetchModelAndCopyToWasmMemory(t){return tg(await eJ(t))}async loadModel(t,r){let i;Y(),i="string"==typeof t?await this.fetchModelAndCopyToWasmMemory(t):t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await ty(i,r),X()}async dispose(){return t_(this.sessionId)}async run(t,r,i){Y();let a=[],n=[];Object.entries(t).forEach(t=>{let r=t[0],i=t[1],s=this.inputNames.indexOf(r);if(-1===s)throw Error(`invalid input '${r}'`);a.push(i),n.push(s)});let s=[],o=[];Object.entries(r).forEach(t=>{let r=t[0],i=t[1],a=this.outputNames.indexOf(r);if(-1===a)throw Error(`invalid output '${r}'`);s.push(i),o.push(a)});let l=a.map((t,r)=>tv(t,()=>`input "${this.inputNames[n[r]]}"`)),u=s.map((t,r)=>t?tv(t,()=>`output "${this.outputNames[o[r]]}"`):null),d=await tb(this.sessionId,n,l,o,u,i),p={};for(let t=0;t<d.length;t++)p[this.outputNames[o[t]]]=s[t]??tx(d[t]);return X(),p}startProfiling(){}endProfiling(){tw(this.sessionId)}}}),d(tE={},{OnnxruntimeWebAssemblyBackend:()=>tI,initializeFlags:()=>tk,wasmBackend:()=>tC}),tA=u(()=>{ed(),t$(),tT(),tk=()=>{("number"!=typeof S.wasm.initTimeout||S.wasm.initTimeout<0)&&(S.wasm.initTimeout=0);let t=S.wasm.simd;if("boolean"!=typeof t&&void 0!==t&&"fixed"!==t&&"relaxed"!==t&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),S.wasm.simd=!1),"boolean"!=typeof S.wasm.proxy&&(S.wasm.proxy=!1),"boolean"!=typeof S.wasm.trace&&(S.wasm.trace=!1),"number"!=typeof S.wasm.numThreads||!Number.isInteger(S.wasm.numThreads)||S.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)S.wasm.numThreads=1;else{let t=typeof navigator>"u"?l("node:os").cpus().length:navigator.hardwareConcurrency;S.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},tC=new(tI=class{async init(t){tk(),await tf(),await tm(t)}async createInferenceSessionHandler(t,r){let i=new tS;return await i.loadModel(t,r),i}})}),d(tz={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Q,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Y,TRACE_FUNC_END:()=>X,Tensor:()=>j,default:()=>tO,env:()=>S,registerBackend:()=>f}),ed(),ed(),ed(),tO=eu,tR=(tA(),p(tE)).wasmBackend,f("cpu",tR,10),f("wasm",tR,10),Object.defineProperty(S.versions,"web",{value:"1.25.1",enumerable:!0}),r.exports=p(tz)},86962,(t,r,i)=>{"use strict";var a=t.e&&t.e.__createBinding||(Object.create?function(t,r,i,a){void 0===a&&(a=i);var n=Object.getOwnPropertyDescriptor(r,i);(!n||("get"in n?!r.__esModule:n.writable||n.configurable))&&(n={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(t,a,n)}:function(t,r,i,a){void 0===a&&(a=i),t[a]=r[i]}),n=t.e&&t.e.__setModuleDefault||(Object.create?function(t,r){Object.defineProperty(t,"default",{enumerable:!0,value:r})}:function(t,r){t.default=r}),s=t.e&&t.e.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&a(r,t,i);return n(r,t),r};Object.defineProperty(i,"__esModule",{value:!0}),i.MicVAD=i.getDefaultRealTimeVADOptions=i.ort=i.DEFAULT_MODEL=void 0;let o=s(t.r(5937)),l=t.r(22237),u=t.r(43489),d=t.r(74389),p=t.r(42827),c=t.r(57289),h=t.r(58868);async function f(t,r,i,a,n){await i.audioWorklet.addModule(t),r.processorOptions={...r.processorOptions??{},frameSamples:a};let s=new AudioWorkletNode(i,"vad-helper-worklet",r);return s.port.onmessage=async t=>{let r=t.data;if(!("object"==typeof r&&r&&"message"in r))return void console.error("Invalid message event",r);if(r.message===p.Message.AudioFrame){if(!("data"in r&&r.data instanceof ArrayBuffer))return void console.log("Audio frame message has no data");let t=new Float32Array(r.data);await n(t)}},s}async function m(t,r,i){let a=new h.Resampler({nativeSampleRate:t.sampleRate,targetSampleRate:16e3,targetFrameSize:r});d.log.debug("using script processor");let n=t.createScriptProcessor(4096,1,1),s=!1;return n.onaudioprocess=async t=>{if(!s){s=!0;try{let r=t.inputBuffer.getChannelData(0);for(let n of(t.outputBuffer.getChannelData(0).fill(0),a.process(r)))await i(n)}catch(t){console.error("Error processing audio:",t)}finally{s=!1}}},n.connect(t.destination),n}i.DEFAULT_MODEL="legacy",i.ort=o,i.getDefaultRealTimeVADOptions=t=>({...u.defaultFrameProcessorOptions,onFrameProcessed:()=>{},onVADMisfire:()=>{d.log.debug("VAD misfire")},onSpeechStart:()=>{d.log.debug("Detected speech start")},onSpeechEnd:()=>{d.log.debug("Detected speech end")},onSpeechRealStart:()=>{d.log.debug("Detected real speech start")},baseAssetPath:"./",onnxWASMBasePath:"./",model:t,workletOptions:{},getStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),pauseStream:async t=>{t.getTracks().forEach(t=>{t.stop()})},resumeStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),ortConfig:t=>{t.env.logLevel="error"},startOnLoad:!0,processorType:"auto"});class g{constructor(t,r,i,a,n=!1,s=null,o=null,l=null,u=null,c=null,h=null,g="uninitialized",y=!1){this.options=t,this.frameProcessor=r,this.model=i,this.frameSamples=a,this.listening=n,this.errored=s,this._stream=o,this._audioContext=l,this._vadNode=u,this._mediaStreamAudioSourceNode=c,this._audioProcessorAdapterType=h,this.initializationState=g,this.ownsAudioContext=y,this.getAudioInstances=()=>{if(null===this._stream||null===this._audioContext||null==this._vadNode||null==this._mediaStreamAudioSourceNode)throw Error("MicVAD has null stream, audio context, or processor adapter");return{stream:this._stream,audioContext:this._audioContext,vadNode:this._vadNode,mediaStreamAudioSourceNode:this._mediaStreamAudioSourceNode}},this.setErrored=t=>{this.initializationState="errored",this.errored=t},this.start=async()=>{switch(this.initializationState){case"uninitialized":d.log.debug("initializing micVAD"),this.initializationState="initializing",this.frameProcessor.resume();try{this._stream=await this.options.getStream()}catch(t){throw t instanceof Error?this.setErrored(t.message):this.setErrored(String(t)),t}if(this.options.audioContext?(console.log("using custom audio context"),this._audioContext=this.options.audioContext):(console.log("using default audio context"),this._audioContext=new AudioContext,this.ownsAudioContext=!0),!this._audioContext)throw this.setErrored("Audio context is null"),Error("Audio context is null");switch(this._audioProcessorAdapterType="auto"==this.options.processorType?"audioWorklet"in this._audioContext&&"function"==typeof AudioWorkletNode?"AudioWorklet":"ScriptProcessor":this.options.processorType,this._audioProcessorAdapterType){case"AudioWorklet":this._vadNode=await f(this.options.baseAssetPath+"vad.worklet.bundle.min.js",this.options.workletOptions,this._audioContext,this.frameSamples,this.processFrame);break;case"ScriptProcessor":this._vadNode=await m(this._audioContext,this.frameSamples,this.processFrame);break;default:throw Error(`Unsupported audio processor adapter type: ${this._audioProcessorAdapterType}`)}this._mediaStreamAudioSourceNode=new MediaStreamAudioSourceNode(this._audioContext,{mediaStream:this._stream}),this._mediaStreamAudioSourceNode.connect(this._vadNode),d.log.debug("started micVAD"),this.listening=!0,this.initializationState="initialized";break;case"initializing":d.log.warn("start called while initializing");break;case"initialized":{if(this.listening)return;this.listening=!0,this.frameProcessor.resume();let{stream:t,audioContext:r,vadNode:i}=this.getAudioInstances();this._stream=await this.options.resumeStream(t);let a=new MediaStreamAudioSourceNode(r,{mediaStream:this._stream});this._mediaStreamAudioSourceNode=a,a.connect(i);break}case"destroyed":d.log.warn("start called after destroyed");break;case"errored":d.log.error("start called after errored");break;default:d.log.warn("weird initialization state")}},this.pause=async()=>{if(!this.listening)return;this.listening=!1;let{stream:t,mediaStreamAudioSourceNode:r}=this.getAudioInstances();await this.options.pauseStream(t),r.disconnect(),this.frameProcessor.pause(this.handleFrameProcessorEvent)},this.destroy=async()=>{d.log.debug("destroy called"),this.initializationState="destroyed";let{vadNode:t}=this.getAudioInstances();t instanceof AudioWorkletNode&&t.port.postMessage(p.Message.SpeechStop),this.listening&&await this.pause(),await this.model.release(),this.ownsAudioContext&&await this._audioContext?.close()},this.setOptions=t=>{this.frameProcessor.setOptions(t)},this.processFrame=async t=>{await this.frameProcessor.process(t,this.handleFrameProcessorEvent)},this.handleFrameProcessorEvent=t=>{switch(t.msg){case p.Message.FrameProcessed:this.options.onFrameProcessed(t.probs,t.frame);break;case p.Message.SpeechStart:this.options.onSpeechStart();break;case p.Message.SpeechRealStart:this.options.onSpeechRealStart();break;case p.Message.VADMisfire:this.options.onVADMisfire();break;case p.Message.SpeechEnd:this.options.onSpeechEnd(t.audio)}}}static async new(t={}){let r,a={...(0,i.getDefaultRealTimeVADOptions)(t.model??i.DEFAULT_MODEL),...t};(0,u.validateOptions)(a),i.ort.env.wasm.wasmPaths=a.onnxWASMBasePath,void 0!==a.ortConfig&&a.ortConfig(i.ort);let n="v5"===a.model?"silero_vad_v5.onnx":"silero_vad_legacy.onnx",s=a.baseAssetPath+n,o="v5"===a.model?c.SileroV5.new:c.SileroLegacy.new;try{r=await o(i.ort,()=>(0,l.defaultModelFetcher)(s))}catch(t){throw console.error(`Encountered an error while loading model file ${s}`),t}let d="v5"===a.model?512:1536,p=new u.FrameProcessor(r.process,r.reset_state,{positiveSpeechThreshold:a.positiveSpeechThreshold,negativeSpeechThreshold:a.negativeSpeechThreshold,redemptionMs:a.redemptionMs,preSpeechPadMs:a.preSpeechPadMs,minSpeechMs:a.minSpeechMs,submitUserSpeechOnPause:a.submitUserSpeechOnPause},d/16),h=new g(a,p,r,d);if(a.startOnLoad)try{await h.start()}catch(t){throw console.error("Error starting micVad",t),t}return h}}i.MicVAD=g},95311,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.getDefaultRealTimeVADOptions=i.MicVAD=i.DEFAULT_MODEL=i.utils=i.NonRealTimeVAD=i.Message=i.FrameProcessor=i.defaultModelFetcher=i.baseAssetPath=void 0;var a=t.r(74574);Object.defineProperty(i,"baseAssetPath",{enumerable:!0,get:function(){return a.baseAssetPath}});var n=t.r(22237);Object.defineProperty(i,"defaultModelFetcher",{enumerable:!0,get:function(){return n.defaultModelFetcher}});var s=t.r(43489);Object.defineProperty(i,"FrameProcessor",{enumerable:!0,get:function(){return s.FrameProcessor}});var o=t.r(42827);Object.defineProperty(i,"Message",{enumerable:!0,get:function(){return o.Message}});var l=t.r(73852);Object.defineProperty(i,"NonRealTimeVAD",{enumerable:!0,get:function(){return l.NonRealTimeVAD}});let u=t.r(84407);i.utils={audioFileToArray:u.audioFileToArray,minFramesForTargetMS:u.minFramesForTargetMS,arrayBufferToBase64:u.arrayBufferToBase64,encodeWAV:u.encodeWAV};var d=t.r(86962);Object.defineProperty(i,"DEFAULT_MODEL",{enumerable:!0,get:function(){return d.DEFAULT_MODEL}}),Object.defineProperty(i,"MicVAD",{enumerable:!0,get:function(){return d.MicVAD}}),Object.defineProperty(i,"getDefaultRealTimeVADOptions",{enumerable:!0,get:function(){return d.getDefaultRealTimeVADOptions}})},69538,t=>{"use strict";var r,i=t.i(43476),a=t.i(26732),n=t.i(71645),s=t.i(18566),o=t.i(22016),l=t.i(21732),u=t.i(72751);t.i(47167);var d=t.i(95311);function p(t,r){(null==r||r>t.length)&&(r=t.length);for(var i=0,a=Array(r);i<r;i++)a[i]=t[i];return a}let c=Object.entries,h=Object.setPrototypeOf,f=Object.isFrozen,m=Object.getPrototypeOf,g=Object.getOwnPropertyDescriptor,y=Object.freeze,_=Object.seal,b=Object.create,w="u">typeof Reflect&&Reflect,$=w.apply,v=w.construct;y||(y=function(t){return t}),_||(_=function(t){return t}),$||($=function(t,r){for(var i=arguments.length,a=Array(i>2?i-2:0),n=2;n<i;n++)a[n-2]=arguments[n];return t.apply(r,a)}),v||(v=function(t){for(var r=arguments.length,i=Array(r>1?r-1:0),a=1;a<r;a++)i[a-1]=arguments[a];return new t(...i)});let x=q(Array.prototype.forEach),S=q(Array.prototype.lastIndexOf),T=q(Array.prototype.pop),E=q(Array.prototype.push),k=q(Array.prototype.splice),I=Array.isArray,C=q(String.prototype.toLowerCase),A=q(String.prototype.toString),z=q(String.prototype.match),O=q(String.prototype.replace),R=q(String.prototype.indexOf),M=q(String.prototype.trim),B=q(Number.prototype.toString),D=q(Boolean.prototype.toString),P="u"<typeof BigInt?null:q(BigInt.prototype.toString),N="u"<typeof Symbol?null:q(Symbol.prototype.toString),U=q(Object.prototype.hasOwnProperty),L=q(Object.prototype.toString),F=q(RegExp.prototype.test),V=(r=TypeError,function(){for(var t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];return v(r,i)});function q(t){return function(r){r instanceof RegExp&&(r.lastIndex=0);for(var i=arguments.length,a=Array(i>1?i-1:0),n=1;n<i;n++)a[n-1]=arguments[n];return $(t,r,a)}}function G(t,r){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:C;if(h&&h(t,null),!I(r))return t;let a=r.length;for(;a--;){let n=r[a];if("string"==typeof n){let t=i(n);t!==n&&(f(r)||(r[a]=t),n=t)}t[n]=!0}return t}function W(t){let r=b(null);for(let a of c(t)){var i=function(t){if(Array.isArray(t))return t}(a)||function(t){var r=null==t?null:"u">typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var i,a,n,s,o=[],l=!0,u=!1;try{n=(r=r.call(t)).next,!1;for(;!(l=(i=n.call(r)).done)&&(o.push(i.value),2!==o.length);l=!0);}catch(t){u=!0,a=t}finally{try{if(!l&&null!=r.return&&(s=r.return(),Object(s)!==s))return}finally{if(u)throw a}}return o}}(a)||function(t){if(t){if("string"==typeof t)return p(t,2);var r=({}).toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(t,2):void 0}}(a)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();let n=i[0],s=i[1];U(t,n)&&(I(s)?r[n]=function(t){for(let r=0;r<t.length;r++)U(t,r)||(t[r]=null);return t}(s):s&&"object"==typeof s&&s.constructor===Object?r[n]=W(s):r[n]=s)}return r}function j(t,r){for(;null!==t;){let i=g(t,r);if(i){if(i.get)return q(i.get);if("function"==typeof i.value)return q(i.value)}t=m(t)}return function(){return null}}let H=y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),K=y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Z=y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Y=y(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),X=y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Q=y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),J=y(["#text"]),ee=y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),et=y(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),er=y(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ei=y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ea=_(/{{[\w\W]*|^[\w\W]*}}/g),en=_(/<%[\w\W]*|^[\w\W]*%>/g),es=_(/\${[\w\W]*/g),eo=_(/^data-[\-\w.\u00B7-\uFFFF]+$/),el=_(/^aria-[\-\w]+$/),eu=_(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ed=_(/^(?:\w+script|data):/i),ep=_(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ec=_(/^html$/i),eh=_(/^[a-z][.\w]*(-[.\w]+)+$/i),ef=_(/<[/\w!]/g),em=_(/<[/\w]/g),eg=_(/<\/no(script|embed|frames)/i),ey=_(/\/>/i),e_=function(t,r){if("object"!=typeof t||"function"!=typeof t.createPolicy)return null;let i=null,a="data-tt-policy-suffix";r&&r.hasAttribute(a)&&(i=r.getAttribute(a));let n="dompurify"+(i?"#"+i:"");try{return t.createPolicy(n,{createHTML:t=>t,createScriptURL:t=>t})}catch(t){return console.warn("TrustedTypes policy "+n+" could not be created."),null}},eb=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},ew=function(t,r,i,a){return U(t,r)&&I(t[r])?G(a.base?W(a.base):{},t[r],a.transform):i};var e$=function t(){let r,i,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"u"<typeof window?null:window,n=r=>t(r);if(n.version="3.4.10",n.removed=[],!a||!a.document||9!==a.document.nodeType||!a.Element)return n.isSupported=!1,n;let s=a.document,o=s,l=o.currentScript;a.DocumentFragment;let u=a.HTMLTemplateElement,d=a.Node,p=a.Element,h=a.NodeFilter;void 0===a.NamedNodeMap&&(a.NamedNodeMap||a.MozNamedAttrMap),a.HTMLFormElement;let f=a.DOMParser,m=a.trustedTypes,g=p.prototype,w=j(g,"cloneNode"),$=j(g,"remove"),v=j(g,"nextSibling"),q=j(g,"childNodes"),e$=j(g,"parentNode"),ev=j(g,"shadowRoot"),ex=j(g,"attributes"),eS=d&&d.prototype?j(d.prototype,"nodeType"):null,eT=d&&d.prototype?j(d.prototype,"nodeName"):null;if("function"==typeof u){let t=s.createElement("template");t.content&&t.content.ownerDocument&&(s=t.content.ownerDocument)}let eE="",ek=!1,eI=0,eC=function(){if(eI>0)throw V('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},eA=function(t){eC(),eI++;try{return r.createHTML(t)}finally{eI--}},ez=function(t){eC(),eI++;try{return r.createScriptURL(t)}finally{eI--}},eO=s,eR=eO.implementation,eM=eO.createNodeIterator,eB=eO.createDocumentFragment,eD=eO.getElementsByTagName,eP=o.importNode,eN=eb();n.isSupported="function"==typeof c&&"function"==typeof e$&&eR&&void 0!==eR.createHTMLDocument;let eU=eu,eL=null,eF=G({},[...H,...K,...Z,...X,...J]),eV=null,eq=G({},[...ee,...et,...er,...ei]),eG=Object.seal(b(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),eW=null,ej=null,eH=Object.seal(b(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),eK=!0,eZ=!0,eY=!1,eX=!0,eQ=!1,eJ=!0,e0=!1,e1=!1,e2=!1,e3=!1,e4=!1,e6=!1,e8=!0,e5=!1,e7="user-content-",e9=!0,te=!1,tt={},tr=null,ti=G({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),ta=null,tn=G({},["audio","video","img","source","image","track"]),ts=null,to=G({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),tl="http://www.w3.org/1998/Math/MathML",tu="http://www.w3.org/2000/svg",td="http://www.w3.org/1999/xhtml",tp=td,tc=!1,th=null,tf=G({},[tl,tu,td],A),tm=y(["mi","mo","mn","ms","mtext"]),tg=G({},tm),ty=y(["annotation-xml"]),t_=G({},ty),tb=G({},["title","style","font","a","script"]),tw=null,t$=["application/xhtml+xml","text/html"],tv=null,tx=null,tS=s.createElement("form"),tT=function(t){return t instanceof RegExp||t instanceof Function},tE=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(tx&&tx===t)return;t&&"object"==typeof t||(t={}),t=W(t),tv="application/xhtml+xml"===(tw=-1===t$.indexOf(t.PARSER_MEDIA_TYPE)?"text/html":t.PARSER_MEDIA_TYPE)?A:C,eL=ew(t,"ALLOWED_TAGS",eF,{transform:tv}),eV=ew(t,"ALLOWED_ATTR",eq,{transform:tv}),th=ew(t,"ALLOWED_NAMESPACES",tf,{transform:A}),ts=ew(t,"ADD_URI_SAFE_ATTR",to,{transform:tv,base:to}),ta=ew(t,"ADD_DATA_URI_TAGS",tn,{transform:tv,base:tn}),tr=ew(t,"FORBID_CONTENTS",ti,{transform:tv}),eW=ew(t,"FORBID_TAGS",W({}),{transform:tv}),ej=ew(t,"FORBID_ATTR",W({}),{transform:tv}),tt=!!U(t,"USE_PROFILES")&&(t.USE_PROFILES&&"object"==typeof t.USE_PROFILES?W(t.USE_PROFILES):t.USE_PROFILES),eK=!1!==t.ALLOW_ARIA_ATTR,eZ=!1!==t.ALLOW_DATA_ATTR,eY=t.ALLOW_UNKNOWN_PROTOCOLS||!1,eX=!1!==t.ALLOW_SELF_CLOSE_IN_ATTR,eQ=t.SAFE_FOR_TEMPLATES||!1,eJ=!1!==t.SAFE_FOR_XML,e0=t.WHOLE_DOCUMENT||!1,e3=t.RETURN_DOM||!1,e4=t.RETURN_DOM_FRAGMENT||!1,e6=t.RETURN_TRUSTED_TYPE||!1,e2=t.FORCE_BODY||!1,e8=!1!==t.SANITIZE_DOM,e5=t.SANITIZE_NAMED_PROPS||!1,e9=!1!==t.KEEP_CONTENT,te=t.IN_PLACE||!1,eU=!function(t){try{return F(t,""),!0}catch(t){return!1}}(t.ALLOWED_URI_REGEXP)?eu:t.ALLOWED_URI_REGEXP,tp="string"==typeof t.NAMESPACE?t.NAMESPACE:td,tg=U(t,"MATHML_TEXT_INTEGRATION_POINTS")&&t.MATHML_TEXT_INTEGRATION_POINTS&&"object"==typeof t.MATHML_TEXT_INTEGRATION_POINTS?W(t.MATHML_TEXT_INTEGRATION_POINTS):G({},tm),t_=U(t,"HTML_INTEGRATION_POINTS")&&t.HTML_INTEGRATION_POINTS&&"object"==typeof t.HTML_INTEGRATION_POINTS?W(t.HTML_INTEGRATION_POINTS):G({},ty);let a=U(t,"CUSTOM_ELEMENT_HANDLING")&&t.CUSTOM_ELEMENT_HANDLING&&"object"==typeof t.CUSTOM_ELEMENT_HANDLING?W(t.CUSTOM_ELEMENT_HANDLING):b(null);if(eG=b(null),U(a,"tagNameCheck")&&tT(a.tagNameCheck)&&(eG.tagNameCheck=a.tagNameCheck),U(a,"attributeNameCheck")&&tT(a.attributeNameCheck)&&(eG.attributeNameCheck=a.attributeNameCheck),U(a,"allowCustomizedBuiltInElements")&&"boolean"==typeof a.allowCustomizedBuiltInElements&&(eG.allowCustomizedBuiltInElements=a.allowCustomizedBuiltInElements),_(eG),eQ&&(eZ=!1),e4&&(e3=!0),tt&&(eL=G({},J),eV=b(null),!0===tt.html&&(G(eL,H),G(eV,ee)),!0===tt.svg&&(G(eL,K),G(eV,et),G(eV,ei)),!0===tt.svgFilters&&(G(eL,Z),G(eV,et),G(eV,ei)),!0===tt.mathMl&&(G(eL,X),G(eV,er),G(eV,ei))),eH.tagCheck=null,eH.attributeCheck=null,U(t,"ADD_TAGS")&&("function"==typeof t.ADD_TAGS?eH.tagCheck=t.ADD_TAGS:I(t.ADD_TAGS)&&(eL===eF&&(eL=W(eL)),G(eL,t.ADD_TAGS,tv))),U(t,"ADD_ATTR")&&("function"==typeof t.ADD_ATTR?eH.attributeCheck=t.ADD_ATTR:I(t.ADD_ATTR)&&(eV===eq&&(eV=W(eV)),G(eV,t.ADD_ATTR,tv))),U(t,"ADD_URI_SAFE_ATTR")&&I(t.ADD_URI_SAFE_ATTR)&&G(ts,t.ADD_URI_SAFE_ATTR,tv),U(t,"FORBID_CONTENTS")&&I(t.FORBID_CONTENTS)&&(tr===ti&&(tr=W(tr)),G(tr,t.FORBID_CONTENTS,tv)),U(t,"ADD_FORBID_CONTENTS")&&I(t.ADD_FORBID_CONTENTS)&&(tr===ti&&(tr=W(tr)),G(tr,t.ADD_FORBID_CONTENTS,tv)),e9&&(eL["#text"]=!0),e0&&G(eL,["html","head","body"]),eL.table&&(G(eL,["tbody"]),delete eW.tbody),t.TRUSTED_TYPES_POLICY){if("function"!=typeof t.TRUSTED_TYPES_POLICY.createHTML)throw V('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof t.TRUSTED_TYPES_POLICY.createScriptURL)throw V('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let i=r;r=t.TRUSTED_TYPES_POLICY;try{eE=eA("")}catch(t){throw r=i,t}}else null===t.TRUSTED_TYPES_POLICY?(r=void 0,eE=""):(void 0===r&&(ek||(i=e_(m,l),ek=!0),r=i),r&&"string"==typeof eE&&(eE=eA("")));(eN.uponSanitizeElement.length>0||eN.uponSanitizeAttribute.length>0)&&eL===eF&&(eL=W(eL)),eN.uponSanitizeAttribute.length>0&&eV===eq&&(eV=W(eV)),y&&y(t),tx=t},tk=G({},[...K,...Z,...Y]),tI=G({},[...X,...Q]),tC=function(t){var r,i,a;let n=e$(t);n&&n.tagName||(n={namespaceURI:tp,tagName:"template"});let s=C(t.tagName),o=C(n.tagName);return!!th[t.namespaceURI]&&(t.namespaceURI===tu?(r=n).namespaceURI===td?"svg"===s:r.namespaceURI===tl?"svg"===s&&("annotation-xml"===o||tg[o]):!!tk[s]:t.namespaceURI===tl?(i=n).namespaceURI===td?"math"===s:i.namespaceURI===tu?"math"===s&&t_[o]:!!tI[s]:t.namespaceURI===td?((a=n).namespaceURI!==tu||!!t_[o])&&(a.namespaceURI!==tl||!!tg[o])&&!tI[s]&&(tb[s]||!tk[s]):"application/xhtml+xml"===tw&&!!th[t.namespaceURI])},tA=function(t){E(n.removed,{element:t});try{e$(t).removeChild(t)}catch(r){if($(t),!e$(t))throw V("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},tz=function(t){let r=q(t);if(r){let t=[];x(r,r=>{E(t,r)}),x(t,t=>{try{$(t)}catch(t){}})}let i=ex(t);if(i)for(let r=i.length-1;r>=0;--r){let a=i[r],n=a&&a.name;if("string"==typeof n)try{t.removeAttribute(n)}catch(t){}}},tO=function(t,r){try{E(n.removed,{attribute:r.getAttributeNode(t),from:r})}catch(t){E(n.removed,{attribute:null,from:r})}if(r.removeAttribute(t),"is"===t)if(e3||e4)try{tA(r)}catch(t){}else try{r.setAttribute(t,"")}catch(t){}},tR=function(t){let r=ex(t);if(r)for(let i=r.length-1;i>=0;--i){let a=r[i],n=a&&a.name;if("string"==typeof n&&!eV[tv(n)])try{t.removeAttribute(n)}catch(t){}}},tM=function(t){let r=[t];for(;r.length>0;){let t=r.pop();(eS?eS(t):t.nodeType)===1&&tR(t);let i=q(t);if(i)for(let t=i.length-1;t>=0;--t)r.push(i[t])}},tB=function(t){let i=null,a=null;if(e2)t="<remove></remove>"+t;else{let r=z(t,/^[\r\n\t ]+/);a=r&&r[0]}"application/xhtml+xml"===tw&&tp===td&&(t='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+t+"</body></html>");let n=r?eA(t):t;if(tp===td)try{i=new f().parseFromString(n,tw)}catch(t){}if(!i||!i.documentElement){i=eR.createDocument(tp,"template",null);try{i.documentElement.innerHTML=tc?eE:n}catch(t){}}let o=i.body||i.documentElement;return(t&&a&&o.insertBefore(s.createTextNode(a),o.childNodes[0]||null),tp===td)?eD.call(i,e0?"html":"body")[0]:e0?i.documentElement:o},tD=function(t){return eM.call(t.ownerDocument||t,t,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},tP=function(t){return t=O(t,ea," "),t=O(t,en," "),t=O(t,es," ")},tN=function(t){var r;t.normalize();let i=eM.call(t.ownerDocument||t,t,h.SHOW_TEXT|h.SHOW_COMMENT|h.SHOW_CDATA_SECTION|h.SHOW_PROCESSING_INSTRUCTION,null),a=i.nextNode();for(;a;)a.data=tP(a.data),a=i.nextNode();let n=null==(r=t.querySelectorAll)?void 0:r.call(t,"template");n&&x(n,t=>{tL(t.content)&&tN(t.content)})},tU=function(t){let r=eT?eT(t):null;return"string"==typeof r&&"form"===tv(r)&&("string"!=typeof t.nodeName||"string"!=typeof t.textContent||"function"!=typeof t.removeChild||t.attributes!==ex(t)||"function"!=typeof t.removeAttribute||"function"!=typeof t.setAttribute||"string"!=typeof t.namespaceURI||"function"!=typeof t.insertBefore||"function"!=typeof t.hasChildNodes||t.nodeType!==eS(t)||t.childNodes!==q(t))},tL=function(t){if(!eS||"object"!=typeof t||null===t)return!1;try{return 11===eS(t)}catch(t){return!1}},tF=function(t){if(!eS||"object"!=typeof t||null===t)return!1;try{return"number"==typeof eS(t)}catch(t){return!1}};function tV(t,r,i){0!==t.length&&x(t,t=>{t.call(n,r,i,tx)})}let tq=function(t,r){if(!eW[r]&&tH(r)&&(eG.tagNameCheck instanceof RegExp&&F(eG.tagNameCheck,r)||eG.tagNameCheck instanceof Function&&eG.tagNameCheck(r)))return!1;if(e9&&!tr[r]){let r=e$(t),i=q(t);if(i&&r){let a=i.length;for(let n=a-1;n>=0;--n){let a=te?i[n]:w(i[n],!0);r.insertBefore(a,v(t))}}}return tA(t),!0},tG=function(t){if(tV(eN.beforeSanitizeElements,t,null),tU(t))return tA(t),!0;let r=tv(eT?eT(t):t.nodeName);if(tV(eN.uponSanitizeElement,t,{tagName:r,allowedTags:eL}),eJ&&t.hasChildNodes()&&!tF(t.firstElementChild)&&F(ef,t.textContent)&&F(ef,t.innerHTML)||eJ&&t.namespaceURI===td&&"style"===r&&tF(t.firstElementChild)||7===t.nodeType||eJ&&8===t.nodeType&&F(em,t.data)||0)return tA(t),!0;if(eW[r]||!(eH.tagCheck instanceof Function&&eH.tagCheck(r))&&!eL[r])return tq(t,r);if((eS?eS(t):t.nodeType)===1&&!tC(t)||("noscript"===r||"noembed"===r||"noframes"===r)&&F(eg,t.innerHTML))return tA(t),!0;if(eQ&&3===t.nodeType){let r=tP(t.textContent);t.textContent!==r&&(E(n.removed,{element:t.cloneNode()}),t.textContent=r)}return tV(eN.afterSanitizeElements,t,null),!1},tW=function(t,r,i){if(ej[r]||e8&&("id"===r||"name"===r)&&(i in s||i in tS))return!1;let a=eV[r]||eH.attributeCheck instanceof Function&&eH.attributeCheck(r,t);if(eZ&&F(eo,r));else if(eK&&F(el,r));else if(a){if(ts[r]);else if(F(eU,O(i,ep,"")));else if(("src"===r||"xlink:href"===r||"href"===r)&&"script"!==t&&0===R(i,"data:")&&ta[t]);else if(eY&&!F(ed,O(i,ep,"")));else if(i)return!1}else if(!(tH(t)&&(eG.tagNameCheck instanceof RegExp&&F(eG.tagNameCheck,t)||eG.tagNameCheck instanceof Function&&eG.tagNameCheck(t))&&(eG.attributeNameCheck instanceof RegExp&&F(eG.attributeNameCheck,r)||eG.attributeNameCheck instanceof Function&&eG.attributeNameCheck(r,t))||"is"===r&&eG.allowCustomizedBuiltInElements&&(eG.tagNameCheck instanceof RegExp&&F(eG.tagNameCheck,i)||eG.tagNameCheck instanceof Function&&eG.tagNameCheck(i))))return!1;return!0},tj=G({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),tH=function(t){return!tj[C(t)]&&F(eh,t)},tK=function(t,i,a,n){if(r&&"object"==typeof m&&"function"==typeof m.getAttributeType&&!a)switch(m.getAttributeType(t,i)){case"TrustedHTML":return eA(n);case"TrustedScriptURL":return ez(n)}return n},tZ=function(t,r,i,a){try{i?t.setAttributeNS(i,r,a):t.setAttribute(r,a),tU(t)?tA(t):T(n.removed)}catch(i){tO(r,t)}},tY=function(t){tV(eN.beforeSanitizeAttributes,t,null);let r=t.attributes;if(!r||tU(t))return;let i={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:eV,forceKeepAttr:void 0},a=r.length,n=tv(t.nodeName);for(;a--;){let s=r[a],o=s.name,l=s.namespaceURI,u=s.value,d=tv(o),p="value"===o?u:M(u);if(i.attrName=d,i.attrValue=p,i.keepAttr=!0,i.forceKeepAttr=void 0,tV(eN.uponSanitizeAttribute,t,i),p=i.attrValue,e5&&("id"===d||"name"===d)&&0!==R(p,e7)&&(tO(o,t),p=e7+p),eJ&&F(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,p)||"attributename"===d&&z(p,"href")){tO(o,t);continue}if(!i.forceKeepAttr){if(!i.keepAttr||!eX&&F(ey,p)||(eQ&&(p=tP(p)),!tW(n,d,p))){tO(o,t);continue}(p=tK(n,d,l,p))!==u&&tZ(t,o,l,p)}}tV(eN.afterSanitizeAttributes,t,null)},tX=function(t){let r=null,i=tD(t);for(tV(eN.beforeSanitizeShadowDOM,t,null);r=i.nextNode();)if(tV(eN.uponSanitizeShadowNode,r,null),tG(r),tY(r),tL(r.content)&&tX(r.content),(eS?eS(r):r.nodeType)===1){let t=ev(r);tL(t)&&(tQ(t),tX(t))}tV(eN.afterSanitizeShadowDOM,t,null)},tQ=function(t){let r=[{node:t,shadow:null}];for(;r.length>0;){let t=r.pop();if(t.shadow){tX(t.shadow);continue}let i=t.node,a=(eS?eS(i):i.nodeType)===1,n=q(i);if(n)for(let t=n.length-1;t>=0;--t)r.push({node:n[t],shadow:null});if(a){let t=eT?eT(i):null;if("string"==typeof t&&"template"===tv(t)){let t=i.content;tL(t)&&r.push({node:t,shadow:null})}}if(a){let t=ev(i);tL(t)&&r.push({node:null,shadow:t},{node:t,shadow:null})}}};return n.sanitize=function(t){let i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=null,s=null,l=null,u=null;if((tc=!t)&&(t="<!-->"),"string"!=typeof t&&!tF(t)&&"string"!=typeof(t=function(t){switch(typeof t){case"string":return t;case"number":return B(t);case"boolean":return D(t);case"bigint":return P?P(t):"0";case"symbol":return N?N(t):"Symbol()";case"undefined":default:return L(t);case"function":case"object":{if(null===t)return L(t);let r=j(t,"toString");if("function"==typeof r){let i=r(t);return"string"==typeof i?i:L(i)}return L(t)}}}(t)))throw V("dirty is not a string, aborting");if(!n.isSupported)return t;e1||tE(i),n.removed=[];let d=te&&"string"!=typeof t&&tF(t);if(d){let r=eT?eT(t):t.nodeName;if("string"==typeof r){let t=tv(r);if(!eL[t]||eW[t])throw V("root node is forbidden and cannot be sanitized in-place")}if(tU(t))throw V("root node is clobbered and cannot be sanitized in-place");try{tQ(t)}catch(r){throw tz(t),r}}else if(tF(t))1===(s=(a=tB("<!---->")).ownerDocument.importNode(t,!0)).nodeType&&"BODY"===s.nodeName||"HTML"===s.nodeName?a=s:a.appendChild(s),tQ(s);else{if(!e3&&!eQ&&!e0&&-1===t.indexOf("<"))return r&&e6?eA(t):t;if(!(a=tB(t)))return e3?null:e6?eE:""}a&&e2&&tA(a.firstChild);let p=tD(d?t:a);try{for(;l=p.nextNode();)tG(l),tY(l),tL(l.content)&&tX(l.content)}catch(r){throw d&&tz(t),r}if(d)return x(n.removed,t=>{t.element&&tM(t.element)}),eQ&&tN(t),t;if(e3){if(eQ&&tN(a),e4)for(u=eB.call(a.ownerDocument);a.firstChild;)u.appendChild(a.firstChild);else u=a;return(eV.shadowroot||eV.shadowrootmode)&&(u=eP.call(o,u,!0)),u}let c=e0?a.outerHTML:a.innerHTML;return e0&&eL["!doctype"]&&a.ownerDocument&&a.ownerDocument.doctype&&a.ownerDocument.doctype.name&&F(ec,a.ownerDocument.doctype.name)&&(c="<!DOCTYPE "+a.ownerDocument.doctype.name+">\n"+c),eQ&&(c=tP(c)),r&&e6?eA(c):c},n.setConfig=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};tE(t),e1=!0},n.clearConfig=function(){tx=null,e1=!1,r=i,eE=""},n.isValidAttribute=function(t,r,i){return tx||tE({}),tW(tv(t),tv(r),i)},n.addHook=function(t,r){"function"==typeof r&&E(eN[t],r)},n.removeHook=function(t,r){if(void 0!==r){let i=S(eN[t],r);return -1===i?void 0:k(eN[t],i,1)[0]}return T(eN[t])},n.removeHooks=function(t){eN[t]=[]},n.removeAllHooks=function(){eN=eb()},n}(),ev=t.i(88715);(0,ev.createClient)("https://oajklfnwkrcefanrsfsp.supabase.co","sb_publishable_n9jFpyLuuCqL736NgZz54g_n3jpttp3"),(0,ev.createClient)("https://oajklfnwkrcefanrsfsp.supabase.co","sb_publishable_n9jFpyLuuCqL736NgZz54g_n3jpttp3");let ex=({isTutorActive:t,isRecordingActive:r,setIsTutorActive:i,setIsRecordingActive:s,tutorSpeechCount:o,MAX_SPEECHES:l,setTutorSpeechCount:u,userMistakes:p,setUserMistakes:c,lessonHistory:h,setLessonHistory:f,numericLevelId:m})=>{let{stopAudio:g,handleVerifySpeech:y,handleGenerateSpeech:_,currentQuestionRef:b,initializationLockRef:w,vadRef:$,isExitingRef:v,isProcessingRef:x}=((t,r,i,s,o,l,u)=>{let{data:d}=(0,a.useSession)();(0,n.useEffect)(()=>{i(r)},[r]);let p=(0,n.useRef)(null),c=(0,n.useRef)(null),h=(0,n.useRef)(""),f=(0,n.useRef)(!1),m=(0,n.useRef)(!1),g=(0,n.useRef)(null),y=(t,i=!0)=>new Promise(async a=>{if(!r&&!m.current)return a();if(console.log("🎙️ [DEBUG SYNTH] Iniciando síntesis con texto:",t?t.substring(0,50)+"...":"VACÍO"),!t||""===t.trim())return console.error("❌ [DEBUG SYNTH] Bloqueado: Texto vacío"),a();try{let n=d?.accessToken,s=await fetch("http://localhost:8080/api/call-tutor-pipeline",{method:"POST",headers:{"Content-Type":"application/json",...n&&{Authorization:`Bearer ${n}`}},body:JSON.stringify({text:t})});if(!s.ok)throw Error("TTS Backend Error");let l=await s.blob(),u=URL.createObjectURL(l),p=new Audio(u);c.current=p,p.onended=()=>{i&&r&&!m.current&&o(!0),c.current=null,URL.revokeObjectURL(u),a()},p.onerror=t=>{console.error("🔴 [ERROR] Error de Audio:",t),c.current=null,URL.revokeObjectURL(u),a()},await p.play()}catch(t){a()}}),_=(0,n.useCallback)((t=!1)=>{t&&(m.current=!1,f.current=!1),m.current||(f.current=!1),c.current&&(c.current.pause(),c.current.currentTime=0,c.current=null),o(!1)},[o]),b=async t=>{if(!f.current){f.current=!0;try{let r=d?.accessToken,a=new Blob([new Float32Array(t)],{type:"application/octet-stream"}),n=await fetch("http://localhost:8080/api/tutor/verify",{method:"POST",body:a,headers:{"X-Tutor-Context":h.current.replace(/[^\x00-\x7F]/g,""),...r&&{Authorization:`Bearer ${r}`}}});if(!n.ok){let t=await n.text();throw console.error("❌ Error del servidor:",t),Error(t||"Error en la petición")}let s=await n.json();console.log("🔍 [DEBUG VERIFY] Resultado recibido:",s);let l=s.analysis||"...",p=e$.sanitize(l);u(t=>[...t,`Amy: ${h.current}`,`Analisis: ${p}`]),s.analysis?(console.log("🗣️ [DEBUG VERIFY] Preparando voz para análisis:",s.analysis),m.current=!0,await y(s.analysis,!1),await new Promise(t=>setTimeout(t,500))):console.warn("⚠️ [DEBUG VERIFY] result.analysis venía vacío o null"),g.current=null,o(!1),i(!1)}catch(t){}finally{f.current=!1,m.current=!1,!r&&p.current&&p.current.pause()}}};return{isTutorActive:r,setIsTutorActive:i,isRecordingActive:s,setIsRecordingActive:o,lessonHistory:l,setLessonHistory:u,stopAudio:_,handleVerifySpeech:b,handleGenerateSpeech:y,currentQuestionRef:h,initializationLockRef:g,vadRef:p,isProcessingRef:f,isExitingRef:m}})(0,t,i,r,s,h,f),S=(()=>{let{data:t}=(0,a.useSession)();return t?.accessToken})(),T=(0,n.useRef)(o),E={level:m,content:[],title:"",description:""};(0,n.useEffect)(()=>{!t&&(g(!0),x.current=!1,v.current=!1,w.current=null,$.current&&$.current.pause())},[t,m,g]),(0,n.useEffect)(()=>{t||g()},[t,g]),(0,n.useEffect)(()=>{T.current=o},[o]),(0,n.useEffect)(()=>{f([]),c([]),w.current=null,v.current=!1,x.current=!1},[m]);let k=()=>{let t=["Hi! What’s good?","What’s the story?","What’s the deal?","What’s crackin'?","What’s the haps?","What’s new?","Yo! Hi.","Ayo!","Heyo!","Alright?","How’s it?","How’s it going?","How’s things?","How ya doing?","How ya been?","Yo, bro.","What’s up, man?","Greetings, homie.","Yo, G.","My man!","Cheers.","Ey.","How you living?","How’s life treating you?","You good?","Everything straight?","Is you good?","How’s the grind?","How’s the hustle?","Keeping busy?","Still out here?","Staying out of trouble?","Wassup?","Whaddup?","Whazzup?","Ahoy!","What’s the craic?","Look who it is!","Hey! Hi! If it isn’t my favorite person!","Long time no see.","What’s the sitch?","How goes it?","What’s the vibe check?","You been keeping out of trouble?","What’s been keeping you busy?","How’s the family?","How’s the squad?","Everything gravy?","Everything wavy?","Yellow!","Greetings and salutations.","Peace and love.","Stay safe out there.","Catch you on the flip side."];return t[Math.floor(Math.random()*t.length)]+" "},I=(0,n.useCallback)(async(t,r)=>{if(x.current||!E)return;x.current=!0;let i=r||h,a=E.content||[],n=a[t]||a[0],s={levelId:m,title:E.title,description:E.description,currentStep:t,history:i.slice(-5),specificInstruction:n?.itemD,contextItems:{itemA:n?.itemA,itemB:n?.itemB,itemC:n?.itemC}};m<=3?s.contextType="TITLE":m<=8?(s.contextType="WORDS",s.targetWord=n?.itemA||"the topic"):s.contextType="DESCRIPTION";try{if(!S)return void console.error("No hay token disponible, abortando fetch.");let t=await fetch("http://localhost:8080/api/tutor/get-dynamic-question",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${S}`},body:JSON.stringify(s)}),r=(await t.json()).question;r.includes("Excellent work")&&s.specificInstruction&&(r=s.specificInstruction);let i=k()+r;b.current=i,await _(i,!0)}catch(t){console.error("Backend Error:",t)}finally{x.current=!1}},[S,h,m,E,k,_]);return(0,n.useEffect)(()=>{let r=`${m}-${o}`;t&&!w.current&&E&&!x.current&&(w.current=r,console.log("🚀 Initializing Tutor:",r),I(o)),t||(w.current=null)},[t,E,I,m,o]),(0,n.useEffect)(()=>{(async()=>{$.current||(console.log("🛠️ Creating VAD Engine..."),$.current=await d.MicVAD.new({startOnLoad:!1,model:"v5",baseAssetPath:"/",onnxWASMBasePath:"/",onSpeechEnd:async t=>{$.current&&$.current.pause(),s(!1),await y(t)}}))})()},[]),(0,n.useEffect)(()=>{(async()=>{if($.current)if(t&&r&&!v.current){console.log("🎤 Mic Starting...");try{await $.current.start()}catch(t){console.error("VAD Start Error:",t)}}else console.log("🔇 Mic Pausing..."),$.current.pause()})()},[r,t]),null};var eS=t.i(87663),eT=t.i(33213),eE=t.i(34895),ek=t.i(86746),eI=t.i(57937),eC=t.i(69170),eA=t.i(59394),ez=t.i(55025),eO=t.i(6732);t.s(["default",0,function({params:t}){var r;let d=Number((0,n.use)(t).levelId),{data:p}=(0,a.useSession)(),c=(0,s.useSearchParams)(),h=(0,s.useRouter)(),f=p?.user?.id||"",[m,g]=(0,n.useState)(!1),[y,_]=(0,n.useState)(!1),[b,w]=(0,n.useState)([]),[$,v]=(0,n.useState)([]),[x,S]=(0,n.useState)(""),[T,E]=(0,n.useState)(null),[k,I]=(0,n.useState)({score:0,successes:0,mistakes:0}),[C,A]=(0,n.useState)(null),[z,O]=(0,n.useState)(()=>(0,eE.shuffleArray)(Object.values(eT.PracticeType))),[R,M]=(0,n.useState)([]),[B,D]=(0,n.useState)(!0),P=d>=4,N=p?.accessToken,U=parseInt(c.get("step")||"0",10),L=parseInt(c.get("substep")||"0",10);(0,n.useEffect)(()=>{!async function(){if(isNaN(d))return;D(!0);let{data:t,error:r}=await l.supabase.from("level_content").select("item_a, item_b, item_c, item_d, audio_url, order_index").eq("level_id",d).order("order_index",{ascending:!0});if(r)return D(!1);(A(45),t&&t.length>0)?M([{stepIndex:0,content:t.map(t=>({itemA:t.item_a,itemB:t.item_b,itemC:t.item_c,itemD:t.item_d,audioUrl:t.audio_url}))}]):console.warn("⚠️ AVISO: Supabase devolvió datos vacíos o el filtro .eq('level_id', numericLevelId) no encontró nada para el nivel:",d),D(!1)}()},[d]);let{step:F,subStep:V,goNext:q,goBack:G,setStep:W,setSubStep:j,showPractice:H,practiceText:K,setPracticeText:Z}=(0,u.useLevelNavigation)({numericLevelId:d,currentLevelContent:R,isVocabLevel:P,userId:f,token:N,initialStep:U,initialSubstep:L}),Y=(0,n.useMemo)(()=>R.reduce((t,r)=>t+(r.content?.length||0),0),[R]),X=(0,n.useMemo)(()=>R.slice(0,F).reduce((t,r)=>t+(r.content?.length||0),0),[R,F])+V+1,Q=Y>0?X/Y*100:0,J=R.length>0&&R[F]?R[F].content[V]:null,ee=R[F]?.content?.length||0,et=F===R.length-1&&V+1===ee,er=P&&J?.itemA&&(H||X%10==0)&&!et,ei=(0,n.useMemo)(()=>(0,eE.shuffleArray)([...eT.AUDIO_PRACTICE_DATA])[0],[er]),ea=(0,n.useMemo)(()=>(0,eE.shuffleArray)([...eT.VIDEO_PRACTICE_DATA])[0],[er]);(0,n.useEffect)(()=>{O((0,eE.shuffleArray)(Object.values(eT.PracticeType)))},[d]);let en=Math.floor(X/10)%(z.length||1),es=z[en]||eT.PracticeType.IMAGE_PARAGRAPH,eo=`https://picsum.photos/seed/${d}-${X}/800/600`,el=`https://picsum.photos/seed/action-${d}-${X}/800/600`,[eu,ed]=(0,n.useState)(V),ep=t=>{window.speechSynthesis.cancel();let r=new SpeechSynthesisUtterance(t);r.lang="en-US",window.speechSynthesis.speak(r)};(0,n.useEffect)(()=>{S($.map((t,r)=>{let i=r%2==0,a=`${i?"Amy (Tutor)":"You"}: ${t}`;if(!i){let t=b[Math.floor(r/2)];t&&(a+=`

✨ Amy's Feedback:
${t}`)}return a}).join("\n\n"+"—".repeat(20)+"\n\n"))},[$,b]),(0,n.useEffect)(()=>{ed(V),v([]),w([])},[V,d]);let ec=async()=>{D(!0);let t=p?.accessToken;await (0,eS.updateProgress)(f,1,0,0,t);let r=window.location.pathname.includes("/pro/");h.refresh(),h.push(`${r?"/dashboard/level/pro":"/dashboard/level"}/1?step=0&substep=0`)};return!p||B?(0,i.jsx)("div",{className:"flex h-screen items-center justify-center bg-gray-50 text-gray-500",children:"Syncing Pro Experience..."}):null!==d&&null!==C&&d>C?(0,i.jsx)("div",{className:"w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-4 md:p-8",children:(0,i.jsxs)("div",{className:"w-full flex-1 md:h-[calc(100vh-100px)] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[40px] shadow-2xl relative p-6 md:p-12 flex flex-col items-center justify-center text-center text-white overflow-hidden",children:[(0,i.jsx)("div",{className:"mb-8 animate-bounce",children:(0,i.jsx)("span",{className:"text-8xl",children:"🏆"})}),(0,i.jsx)("h1",{className:"text-4xl md:text-6xl font-black mb-4 tracking-tight",children:"MISSION ACCOMPLISHED!"}),(0,i.jsx)("p",{className:"text-xl md:text-2xl font-light max-w-2xl mb-12 opacity-90",children:"You've successfully completed all available levels. Your journey through the curriculum is complete for now!"}),(0,i.jsxs)("div",{className:"flex flex-col md:flex-row gap-4",children:[(0,i.jsx)("button",{onClick:ec,className:"bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg",children:"Restart Journey"}),(0,i.jsx)(o.default,{href:"/dashboard",className:"bg-blue-700/50 text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700/70 transition-all shadow-lg",children:"Return to Dashboard"})]}),(0,i.jsx)("div",{className:"absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"}),(0,i.jsx)("div",{className:"absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"})]})}):(0,i.jsxs)("div",{className:"w-full h-screen flex flex-col items-center justify-center bg-gray-50 p-2 md:p-4 font-sans overflow-hidden",children:[(0,i.jsx)(ex,{tutorSpeechCount:eu,MAX_SPEECHES:4,setTutorSpeechCount:ed,isTutorActive:m,isRecordingActive:y,setIsTutorActive:g,setIsRecordingActive:_,userMistakes:b,setUserMistakes:w,lessonHistory:$,setLessonHistory:v,numericLevelId:d}),(0,i.jsxs)("div",{className:"w-full min-h-[90vh] md:h-[92vh] bg-white rounded-[40px] shadow-xl border border-gray-100 relative p-4 md:p-10 flex flex-col items-center z-10 overflow-hidden",children:[(0,i.jsx)(o.default,{href:"/dashboard",className:"absolute top-6 right-8 text-gray-300 hover:text-red-500 transition-colors text-2xl",children:"✕"}),(0,i.jsx)("div",{className:"absolute top-0 left-0 w-full h-1.5 bg-gray-100 overflow-hidden rounded-t-[40px]",children:(0,i.jsx)("div",{className:"h-full bg-blue-500 transition-all duration-1000 ease-out",style:{width:`${Q}%`}})}),(0,i.jsx)("div",{className:"w-full flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto overflow-y-auto",children:er?(0,i.jsxs)("div",{className:"w-full flex-1 flex flex-col items-center justify-center gap-6 overflow-hidden",children:[es===eT.PracticeType.IMAGE_PARAGRAPH&&(0,i.jsx)(ek.ImageParagraphPractice,{practiceImage:eo,practiceText:K,setPracticeText:Z,speak:ep}),es===eT.PracticeType.ACTION_REACTION&&(0,i.jsx)(eI.ActionReactionPractice,{actionImage:el,practiceText:K,setPracticeText:Z}),es===eT.PracticeType.LISTEN_SPEAK&&(0,i.jsx)(eC.ListenSpeakPractice,{practiceText:K,setPracticeText:Z,speakQuestions:()=>{ep(eT.PLACEHOLDER_QUESTIONS[Math.floor(Math.random()*eT.PLACEHOLDER_QUESTIONS.length)])}}),es===eT.PracticeType.LISTENING_COMPREHENSION&&(0,i.jsx)(eA.ListeningComprehensionPractice,{...ei,practiceText:K,setPracticeText:Z}),es===eT.PracticeType.VIDEO&&(0,i.jsx)("div",{className:"w-full flex flex-col items-center gap-2 md:gap-4 h-full max-h-[70vh]",children:(0,i.jsx)("div",{className:"w-full flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto p-4",children:(0,i.jsx)(ez.VideoPractice,{...ea,practiceText:K,setPracticeText:Z})})}),es===eT.PracticeType.TEXT&&(0,i.jsx)(eO.TextPractice,{practiceText:K,setPracticeText:Z})]}):J?(0,i.jsxs)("div",{className:"flex flex-col items-center text-center animate-in fade-in zoom-in duration-700 w-full space-y-4",children:[(0,i.jsx)("div",{className:`font-medium text-blue-500 w-full leading-tight ${J?.itemC?.length>20?"text-base md:text-xl":"text-xl md:text-3xl"}`,children:J?.itemC}),(0,i.jsxs)("div",{className:"flex flex-col items-center gap-4 w-full",children:[(0,i.jsx)("div",{className:`text-gray-900 leading-tight select-none break-words w-full px-4 whitespace-pre-wrap ${(r=J.itemA,42===d||43===d?r.length>100?"text-[9px] md:text-base font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center leading-tight":r.length>60?"text-[11px] md:text-lg font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center":"text-xs md:text-xl font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center":r.length>2?"text-[11px] md:text-lg font-normal bg-gray-50 p-2 md:p-5 rounded-2xl border border-gray-200 text-center":"text-3xl md:text-[6rem] font-bold text-center")}`,children:J.itemA}),(0,i.jsxs)("div",{className:"flex flex-row items-center gap-4",children:[2===d&&0!==V&&1!==V&&2!==V&&3!==V?(0,i.jsx)("button",{onClick:()=>{new Audio(`/audio/track_${X}.mp3`).play().catch(t=>console.error("Error playing audio:",t))},className:"cursor-pointer p-3 md:p-5 rounded-full shadow-lg transition-all border border-gray-100 bg-white hover:shadow-2xl active:bg-blue-500 active:scale-95",children:(0,i.jsx)("span",{className:"text-2xl",children:"🔊"})}):(0,i.jsx)("button",{disabled:m,onClick:()=>g(!0),className:`cursor-pointer p-3 md:p-5 rounded-full shadow-lg transition-all border border-gray-100 ${m?"bg-amber-400 opacity-50 cursor-not-allowed":"bg-white hover:shadow-2xl active:scale-95"}`,children:(0,i.jsx)("span",{className:`text-2xl ${m?"animate-pulse":""}`,children:y?"🔴":"🔊"})}),(0,i.jsx)("button",{onClick:()=>{g(!1),_(!1),ed(V),v([]),w([])},className:"cursor-pointer p-3 md:p-5 rounded-full shadow-lg transition-all border border-gray-100 bg-white hover:shadow-2xl active:bg-amber-400 active:scale-95",children:(0,i.jsx)("span",{className:"text-2xl",children:"↻"})})]})]}),P&&d<8&&(0,i.jsx)("div",{className:"flex flex-wrap justify-center gap-1 px-4",children:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(t=>(0,i.jsx)("button",{onClick:()=>(t=>{for(let r=0;r<R.length;r++){let i=R[r].content.findIndex(r=>r?.itemA?.trim().toUpperCase().startsWith(t));if(-1!==i){W(r),j(i);let t=new URLSearchParams(window.location.search);t.set("step",r.toString()),t.set("substep",i.toString()),h.replace(`${window.location.pathname}?${t.toString()}`);return}}})(t),className:"text-blue-400 font-bold text-[10px] hover:text-blue-700 transition-all px-0.5",children:t},t))}),(0,i.jsxs)("div",{className:"w-full max-w-xl",children:[(0,i.jsx)("label",{className:"block text-center text-[9px] font-black text-blue-300 uppercase mb-1 tracking-widest",children:"Conversation Transcript & AI Scoring"}),(0,i.jsx)("textarea",{className:"w-full p-2 bg-gray-50 border border-gray-200 rounded-2xl text-gray-700 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none font-mono text-[10px] leading-relaxed shadow-inner h-14 md:h-20 overflow-y-auto",value:x,placeholder:"You can use this text area as a diary to practice whatever you want...",onChange:t=>S(t.target.value),readOnly:!1})]})]},`content-${d}-${F}-${V}`):(0,i.jsx)("div",{className:"text-gray-400 italic",children:"Syncing level data..."})}),(0,i.jsxs)("div",{className:"w-full flex items-center justify-between mt-auto pt-2 border-t border-gray-50",children:[(0,i.jsxs)("div",{className:`flex items-center gap-2 group ${m?"opacity-30 cursor-not-allowed":"cursor-pointer"}`,onClick:()=>!m&&G(er),children:[(0,i.jsx)("span",{className:"text-gray-300 group-hover:text-gray-600 transition-colors text-xl",children:"←"}),(0,i.jsx)("span",{className:"text-gray-300 font-bold uppercase tracking-widest text-[10px] group-hover:text-gray-600 transition-colors",children:"Back"})]}),(0,i.jsxs)("div",{className:"flex items-center gap-4",children:[(0,i.jsxs)("span",{className:"text-gray-200 font-mono text-xs hidden sm:block",children:[X," / ",Y]}),(0,i.jsx)("button",{disabled:m,onClick:()=>!m&&q(er),className:`flex items-center justify-center transition-all p-2 ${m?"opacity-30 cursor-not-allowed":"hover:scale-110"}`,children:(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:4,stroke:"#374151",className:"w-8 h-8",children:(0,i.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"})})})]})]})]})]})}],69538)}]);