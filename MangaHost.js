
let Scripts = ['https://unpkg.com/vue'];
let temp;
for(let cont=0;cont<Scripts.length;cont++){
    if(Scripts[cont].includes(".css")){
        $('head').append('<link rel="stylesheet" href="'+Scripts[cont]+'" type="text/css" />');
    }else{
        $('head').append('<link rel="stylesheet" href="'+Scripts[cont]+'" type="text/css" />');
    }
}
(async function() {
    'use strict';
})();

async function loadScript(src) {
    return new Promise((resolv, reject) => {
        fetch(src).then(response => response.text()).then(js => {
            resolv(js);
        })
    });
}
