// ==UserScript==
// @name         Maskeiko Mangas
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  Ola Mundo!
// @author       Dedo Not Found
// @match        https://mangahost4.com/*
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://i.pinimg.com/236x/b8/a9/6a/b8a96a8026d59b815cef59f98b8c48ec.jpg
// @updateURL    https://raw.githubusercontent.com/Kalmon/TamperMonkey/main/MangaHost.js
// @downloadURL  https://raw.githubusercontent.com/Kalmon/TamperMonkey/main/MangaHost.js
// ==/UserScript==

$("body").append(`
<style>
  .app-shadw{
    box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06),0 2px 6px hsla(0, 0%, 0%, 0.06),0 3px 8px hsla(0, 0%, 0%, 0.09);
  }
  #recomanim {
    margin: 1% 1% 0px;
    height:300px;
    width:500px;
    overflow-y: scroll;
}
.stat {
    position: absolute;
    z-index: 10;
    color: #FFF;
    padding: 3px 6px;
    font-size: 10px;
    border-radius: 3px;
    top: 5px;
    right: 5px;
}
.recobox {
    margin-bottom: 20px;
    padding: 5px;
    background-image: linear-gradient(to bottom, #E8E8E8 0px, #F5F5F5 100%);
    background-repeat: repeat-x;
    border: 1px solid #DBDBDB;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 1px 0px rgba(255, 255, 255, 0.1);
}
.anim {
    float: left;
    margin: 5px;
    border: 1px solid #CCC;
    border-radius: 3px;
    position: relative;
    width: 100px;
    height: 150px;
    overflow: hidden;
}
.stat.ongo {
    background: none repeat scroll 0% 0% #DC3535;
}
.anim a {
    display: block;
    font-size: 0px;
}
.anim img {
    width: 100%;
    height: 100%;
}
.anim p {
    margin: 0px;
    font-size: 11px;
    background: none repeat scroll 0% 0% rgba(0, 0, 0, 0.5);
    color: #FFF;
    position: absolute;
    bottom: 0px;
    z-index: 200;
    padding: 4px 6px 5px;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    width:100%;
}
.w-100{
width:100%;}
#BTN_fav{
background: #f05f70;
bottom: 4em;
    right: 0em;
    position: absolute;
}
.st-button-main2{
font-size: 24px;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
}


.lancFav {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.gridChild{
flex: 0 0 100%;
text-align: left;

padding-left: 10px;
    padding-right: 10px;
}
.gridChild i{
    padding-right: 10px;
}
.st-panel{
    width: 500px;
}
</style>
<div id='MyApp' class="grid">
    <div class="st-actionContainer right-bottom" >
  <div class="st-panel">
    <div class="st-panel-header"><i class="fa fa-bars" aria-hidden="true"></i> <a href="https://www.jqueryscript.net/menu/">Menu</a></div>
    <div class="st-panel-contents">
      <div id='recomanim'>
         <div v-for="(Fav,index) in DataBase.Favs" class='anim'>
            <span @click="deletMang(index)" class='stat ongo'><i class="fa-solid fa-trash"></i></span>
            <a :href="'/manga/'+Fav.Link">
              <img :src='Fav.Capa' :title='Fav.Nome'/>
              <p>{{Fav.Nome}}</p>
            </a>
         </div>
      </div>


    </div>
    <div class="grid w-100">
        <a @click="changeUser" style="margin-bottom: 1px;" class="gridChild"><i class="fa fa-user" aria-hidden="true"></i> {{usuario}}</a>
        <a @click="changeScrool" style="flex: 0 0 20%; margin-right: 1px;"  class="gridChild"><i class="fa fa-file" aria-hidden="true"></i>{{DataBase.scrool ? 'INFI' : 'NORM'}}</a>
        <a style="flex: 0 0 79.5%;" class="gridChild"><i class="fa-solid fa-database"></i>{{fireBase}}</a>
      </div>
  </div>
  <div id="BTN_menu" class="st-btn-container right-bottom" style="display:none">
    <div  class="st-button-main"><i class="fa fa-bars" aria-hidden="true"></i></div>
  </div>
  <div @click="AddFav" id="BTN_fav" class="st-btn-container right-bottom" style="display:none">
    <div  class="st-button-main2"><i :class="DataBase.Favs.length== 0 || Manga==null ? 'fa-regular fa-heart' : 'fa-solid fa-heart'"></i></div>
  </div>
</div>
</div>
<script>
setTimeout(()=>{
  $('#BTN_menu').launchBtn({
   openDuration: 600,
   closeDuration: 200,
  });
  $("#BTN_menu").show();
 },2000)
</script>
`);
setTimeout(()=>{
    $(".adsbygoogle, .google-auto-placed").remove();
},5000)

let Scripts = ['https://www.jqueryscript.net/demo/Material-style-Floating-Button-Panel-Plugin-For-jQuery-st-action-panel/js/st.action-panel.js','https://www.jqueryscript.net/demo/Material-style-Floating-Button-Panel-Plugin-For-jQuery-st-action-panel/css/st.action-panel.css','https://www.gstatic.com/firebasejs/5.0.4/firebase.js','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css','https://unpkg.com/vue'];
let temp;
for(let cont=0;cont<Scripts.length;cont++){
    if(Scripts[cont].includes(".css")){
        $('head').append('<link rel="stylesheet" href="'+Scripts[cont]+'" type="text/css" />');
    }else{
        $("body").append(`<script src="${Scripts[cont]}"></script>`);
    }
}
var MyApp;
(async function() {
    'use strict';
    while(typeof Vue == 'undefined'){
        console.log("Nada do vue ou do launchBtn...");
        await sleep(1000);
    }

    MyApp = Vue.createApp({
        data() {
            return {
                fireBase: localStorage.getItem("fireBase") == null ? "https://favmangahost-default-rtdb.firebaseio.com/" : localStorage.getItem("fireBase"),
                menu:null,
                BTN_fav:false,
                Manga: null,
                usuario: localStorage.getItem("Usuario") == null ? "" : localStorage.getItem("Usuario"),
                DataBase : {
                    Favs: [],
                    scrool: false
                }
            }
        },
        methods:{
            changeScrool(){
                this.DataBase.scrool = !this.DataBase.scrool;
                firebase.database().ref(MD5(MyApp.usuario)).set(MyApp.DataBase);
            },
            deletMang(index){
                MyApp.DataBase.Favs.splice(index, 1);
                firebase.database().ref(MD5(MyApp.usuario)).set(MyApp.DataBase);
                MyApp.Manga = indexFav(manga);
            },
            changeUser(){
                let Email = prompt("Insira seu email maskeioko");
                localStorage.setItem("Usuario",Email);
                window.location.reload();
            },
            AddFav(){
                let manga = {
                    Nome: $("title").text().split(" | Mang")[0],
                    Capa: $(".image-3").attr("src"),
                    Link: (window.location.href).split("/manga/")[1]
                };
                manga.Nome = manga.Nome.trim();
                let check = indexFav(manga);
                if(check==null){
                    manga.Link = manga.Link.split("-");
                    manga.Link.pop();
                    manga.Link = manga.Link.join("-");
                    console.log(manga);
                    MyApp.DataBase.Favs.push(manga);
                }else{
                    MyApp.DataBase.Favs.splice(check, 1);
                }

                firebase.database().ref(MD5(MyApp.usuario)).set(MyApp.DataBase);
                MyApp.Manga = indexFav(manga);
            }
        },
        onMounted(){

        }
    }).mount('#MyApp');




    firebase.initializeApp({
        databaseURL: MyApp.fireBase,
    });

    //firebase.database().ref(MyApp.usuario).set("");
    firebase.database().ref().child(MD5(MyApp.usuario)).on('value', function (snap){
        if(snap.val()!=null){
            MyApp.DataBase = snap.val();
            let manga = {
                Nome: $("title").text().split(" | Mang")[0]
            };
            MyApp.Manga = indexFav(manga);
            checkLanc();
        }
    });
    $("#mais").click(function() {
      checkLanc();
    });
})();

function leituraEscorrida(){
    if(MyApp.DataBase.scrool==false){
        return null;
    }
    $(".read-slide").css("position","initial");
    $(".read-slide").css("visibility","visible");
    $(".read-slide").css("opacity","100");
    $(".read-slide").css("left","auto");
    $(".read-slide").css("top","auto");
    $(".read-slideshow").css("display","grid");
}

function checkLanc(){
  let temp = new Array();
    if((window.location.href).includes("/manga/")){
        $("#BTN_fav").show();
        leituraEscorrida();
    }else{
        $(".ekfaA.w-row").map((index,el)=>{
            if(indexFav({Nome:$(el).find(".title-1 a").text()})!=null){
                $(el).addClass('lancFav');
                temp.push($(el));
                $(el).remove();
                //$("#dados").prepend(temp);
            }
        })
        temp.reverse();
        temp.forEach(el=>{
            $("#dados").prepend(el);
        });
    }
}

function indexFav(Manga){
    console.log(Manga)
    for(let cont=0;cont<MyApp.DataBase.Favs.length;cont++){
        if(MyApp.DataBase.Favs[cont]['Nome'].toLowerCase()==Manga['Nome'].toLowerCase()){
            return cont;
        }
    }
    return null;
}

async function loadScript(src) {
    return new Promise((resolv, reject) => {
        fetch(src).then(response => response.text()).then(js => {
            resolv(js);
        })
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
var MD5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

