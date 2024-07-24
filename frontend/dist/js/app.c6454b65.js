(function(){"use strict";var e={8534:function(e,l,t){var n=t(5130),o=t(6768);const a=(0,o.Lk)("span",{class:"app-title"},"Upload your ",-1),i=(0,o.Lk)("img",{alt:"App logo",src:"/logo.png",class:"app-logo mr-3",siz:""},null,-1);function r(e,l,t,n,r,s){const c=(0,o.g2)("v-toolbar-title"),u=(0,o.g2)("v-app-bar"),d=(0,o.g2)("FileUpload"),f=(0,o.g2)("v-card-actions"),p=(0,o.g2)("FileList"),h=(0,o.g2)("v-card"),F=(0,o.g2)("v-col"),g=(0,o.g2)("v-row"),v=(0,o.g2)("v-container"),y=(0,o.g2)("v-app");return(0,o.uX)(),(0,o.Wv)(y,null,{default:(0,o.k6)((()=>[(0,o.bF)(u,{app:"",color:"primary",dark:""},{default:(0,o.k6)((()=>[(0,o.bF)(c,{class:"d-flex align-center"},{default:(0,o.k6)((()=>[a,i])),_:1})])),_:1}),(0,o.bF)(v,{fluid:"","fill-height":""},{default:(0,o.k6)((()=>[(0,o.bF)(g,{align:"center",justify:"center"},{default:(0,o.k6)((()=>[(0,o.bF)(F,{cols:"12",sm:"8",md:"6"},{default:(0,o.k6)((()=>[(0,o.bF)(h,{class:"pa-4"},{default:(0,o.k6)((()=>[(0,o.bF)(f,{class:"justify-center"},{default:(0,o.k6)((()=>[(0,o.bF)(d,{onFileUploaded:s.fetchFiles},null,8,["onFileUploaded"])])),_:1}),(0,o.bF)(p,{ref:"fileList"},null,512)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}var s=t(4232);const c=e=>((0,o.Qi)("data-v-00d26960"),e=e(),(0,o.jt)(),e),u={class:"upload-container"},d=c((()=>(0,o.Lk)("h2",null,"Select your CV in PDF format",-1))),f={class:"button-container"},p={key:0,class:"file-name"},h={class:"upload-message"};function F(e,l,t,n,a,i){return(0,o.uX)(),(0,o.CE)("div",u,[d,(0,o.Lk)("div",f,[(0,o.Lk)("button",{onClick:l[0]||(l[0]=(...e)=>i.triggerFileInput&&i.triggerFileInput(...e)),class:"select-button"},"Select File"),a.selectedFile?((0,o.uX)(),(0,o.CE)("p",p,"Selected file: "+(0,s.v_)(a.selectedFile.name),1)):(0,o.Q3)("",!0),(0,o.Lk)("input",{type:"file",ref:"fileInput",onChange:l[1]||(l[1]=(...e)=>i.onFileChange&&i.onFileChange(...e)),style:{display:"none"}},null,544),a.selectedFile?((0,o.uX)(),(0,o.CE)("button",{key:1,onClick:l[2]||(l[2]=(...e)=>i.uploadFile&&i.uploadFile(...e)),class:"upload-button"},"Upload")):(0,o.Q3)("",!0)]),(0,o.Lk)("p",h,(0,s.v_)(a.uploadMessage),1)])}var g=t(4373),v={data(){return{selectedFile:null,uploadMessage:""}},methods:{triggerFileInput(){this.$refs.fileInput.click()},onFileChange(e){this.selectedFile=e.target.files[0],this.uploadMessage=null},async uploadFile(){if(!this.selectedFile)return void(this.uploadMessage="Please select a file");if("application/pdf"!==this.selectedFile.type)return alert("Only PDF files are allowed"),this.selectedFile=null,void(this.uploadMessage="Only PDF files are allowed");const e=new FormData;e.append("file",this.selectedFile);try{const l=await g.A.post("http://localhost:3000/api/upload",e,{headers:{"Content-Type":"multipart/form-data"}}),t=l.data.filename;alert(`File ${t} uploaded successfully!`),this.uploadMessage=`File ${t} uploaded successfully!`,this.selectedFile=null,this.$emit("file-uploaded"),console.log("File uploaded:",l.data)}catch(l){console.error("File upload failed",l),alert(`File upload failed: ${l.message}`),this.uploadMessage=`File upload failed: ${l.message}`}}}},y=t(1241);const b=(0,y.A)(v,[["render",F],["__scopeId","data-v-00d26960"]]);var k=b;const m=e=>((0,o.Qi)("data-v-67391808"),e=e(),(0,o.jt)(),e),w={class:"container"},L=m((()=>(0,o.Lk)("h2",null,"File List",-1))),C={class:"table-container"},_=m((()=>(0,o.Lk)("thead",null,[(0,o.Lk)("tr",null,[(0,o.Lk)("th",null,"Filename"),(0,o.Lk)("th",null,"Upload Date"),(0,o.Lk)("th",null,"Actions")])],-1))),O=["onClick"],$=["onClick"],E={key:0};function j(e,l,t,n,a,i){return(0,o.uX)(),(0,o.CE)("div",w,[L,(0,o.Lk)("div",C,[(0,o.Lk)("table",null,[_,(0,o.Lk)("tbody",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(a.files,(e=>((0,o.uX)(),(0,o.CE)("tr",{key:e.filename},[(0,o.Lk)("td",null,(0,s.v_)(e.filename),1),(0,o.Lk)("td",null,(0,s.v_)(new Date(e.upload_date).toLocaleString()),1),(0,o.Lk)("td",null,[(0,o.Lk)("button",{class:"delete-button",onClick:l=>i.deleteFile(e.filename)},"Delete",8,O),(0,o.Lk)("button",{class:"download-button",onClick:l=>i.downloadFile(e.filename)},"Download",8,$)])])))),128))])]),0===a.files.length?((0,o.uX)(),(0,o.CE)("p",E,"No files available.")):(0,o.Q3)("",!0)])])}t(4603),t(7566),t(8721);const A="http://localhost:3000/api";var M={data(){return{files:[]}},async created(){this.fetchFiles()},methods:{async fetchFiles(){try{const e=await g.A.get(`${A}/files`);this.files=e.data}catch(e){console.error("Error fetching files:",e)}},async deleteFile(e){if(confirm(`Are you sure you want to delete this file (${e})?`))try{await g.A.delete(`${A}/files/${e}`),this.fetchFiles(),alert(`File ${e} deleted successfully!`)}catch(l){console.error("Error deleting file:",l)}},async downloadFile(e){try{const l=await g.A.get(`${A}/download/${e}`,{responseType:"blob"}),t=window.URL.createObjectURL(new Blob([l.data])),n=document.createElement("a");n.href=t,n.setAttribute("download",e),document.body.appendChild(n),n.click(),n.remove(),alert(`File ${e} downloaded successfully!`)}catch(l){console.error("Error downloading file:",l)}}}};const S=(0,y.A)(M,[["render",j],["__scopeId","data-v-67391808"]]);var U=S,D={components:{FileUpload:k,FileList:U},methods:{fetchFiles(){this.$refs.fileList.fetchFiles()}}};const I=(0,y.A)(D,[["render",r]]);var P=I,X=t(4448),x=(t(5524),t(8221));const T=(0,X.$N)({theme:{themes:{light:{colors:{primary:"#1E88E5",secondary:"#FFC107"}}}},icons:{defaultSet:x.r}});var Q=T;const N=(0,n.Ef)(P);N.use(Q),N.mount("#app")}},l={};function t(n){var o=l[n];if(void 0!==o)return o.exports;var a=l[n]={exports:{}};return e[n].call(a.exports,a,a.exports,t),a.exports}t.m=e,function(){var e=[];t.O=function(l,n,o,a){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],a=e[u][2];for(var r=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(t.O).every((function(e){return t.O[e](n[s])}))?n.splice(s--,1):(r=!1,a<i&&(i=a));if(r){e.splice(u--,1);var c=o();void 0!==c&&(l=c)}}return l}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,o,a]}}(),function(){t.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(l,{a:l}),l}}(),function(){t.d=function(e,l){for(var n in l)t.o(l,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:l[n]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){var e={524:0};t.O.j=function(l){return 0===e[l]};var l=function(l,n){var o,a,i=n[0],r=n[1],s=n[2],c=0;if(i.some((function(l){return 0!==e[l]}))){for(o in r)t.o(r,o)&&(t.m[o]=r[o]);if(s)var u=s(t)}for(l&&l(n);c<i.length;c++)a=i[c],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(u)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(l.bind(null,0)),n.push=l.bind(null,n.push.bind(n))}();var n=t.O(void 0,[504],(function(){return t(8534)}));n=t.O(n)})();
//# sourceMappingURL=app.c6454b65.js.map