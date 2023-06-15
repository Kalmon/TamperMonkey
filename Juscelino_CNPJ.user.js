// ==UserScript==
// @name         Juscelino - CNPJ
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  try to take over the world!
// @author       You
// @match        https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gov.br
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @downloadURL  https://cdn.jsdelivr.net/gh/Kalmon/TamperMonkey@master/Juscelino_CNPJ.user.js
// @grant        none
// ==/UserScript==
let Scripts = ['https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.32.4/docxtemplater.js','https://unpkg.com/pizzip@3.1.3/dist/pizzip.js','https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js','https://unpkg.com/pizzip@3.1.3/dist/pizzip-utils.js'];
for(let cont=0;cont<Scripts.length;cont++){
    eval(await loadScript(Scripts[cont]));
}
(async function() {
    'use strict';



    var aux = new Object(),
        temp = null, BTNDownload;
    $(document).ready(function() {
        if($("title").text()=='Comprovante de Inscrição e de Situação Cadastral'){
            passo_1();
        }else if($("title").text()=='Consulta Quadro de Sócios e Administradores - QSA'){
            passo_2();
        }
    });

    function print(){
        $("#app").prepend(`
        <style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: !important;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
<center>
<div style="width:98%">
<table class="table">
  <tr>
    ${Object.keys(aux).map(el=>{
return `<th>${el}</th>`
        }).join("")}
  </tr>
  <tr>
   ${Object.keys(aux).map(el=>{
return `<td>${aux[el]}</td>`;
}).join("")}
  </tr>
</table>
</div>
</center>
        `);
        $("#BTN_print").click(function (e) {
            e.preventDefault();
            aux.Protocolo = prompt("Numero de protocolo?");
            if (aux.Protocolo == null || aux.Protocolo == "") {
                return null;
            }
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/",
                data: aux,
                success: ()=>{
                    aux.Protocolo = null;
                    console.log(this)
                }
            });
            return null;
            loadFile(
                "https://ipfs.io/ipfs/bafybeiedfptzlj6rr7fwhom2ldsveuy523a2kc72uslgjhfnzmoozvvj5i?filename=justelino1-03.docx",
                function (error, content) {
                    if (error) {
                        throw error;
                    }
                    var zip = new PizZip(content);
                    var doc = new window.docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });


                    aux.Protocolo = prompt("Numero de protocolo?");
                    if (aux.Protocolo == null || aux.Protocolo == "") {
                        return null;
                    }
                    console.log(aux);
                    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
                    doc.render(aux);
                    var blob = doc.getZip().generate({
                        type: "blob",
                        mimeType:
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        // compression: DEFLATE adds a compression step.
                        // For a 50MB output document, expect 500ms additional CPU time
                        compression: "DEFLATE",
                    });
                    // Output the document using Data-URI
                    console.log(aux.NumeroIncricao);
                    let nome = (aux.NumeroIncricao).replaceAll("/","");
                    nome = (nome).replaceAll(".","");
                    console.log(nome+".docx");
                    //var fileURL = URL.createObjectURL(blob);
                    //window.open(fileURL);
                    saveAs(blob, nome+".docx");
                }
            );
        });
        $("#app td").click(function(e){
            $(this).attr("style", "background-color: #A4BE7B  !important");
            navigator.clipboard.writeText($(this).text()).then(function () {

            }, function () {
                alert('Failure to copy. Check permissions for clipboard')
            });
            setTimeout(()=>{
            $(this).attr("style", "background-color: white  !important")
            },1000);
        })
    }

    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }

    function passo_2(){
        Promise.all(
            $("#principal .row").map((index,el)=>{
                if(($(el).text()).includes("CAPITAL SOCIAL:")){
                   temp = $(el).find(".col-md-9").text();
                }
            })
        ).then(()=>{
            if(temp==null){
                $("#app").css("background-color", "#FF6363");
                return false;
            }
            aux = JSON.parse(localStorage.getItem("database"));
            temp = (temp.split(" ")[0]).trim();
            aux["Capital"] = temp;
            $("#app").css("background-color", "#65C18C");
            aux.OPC = `<button class="btn btn-info" id="BTN_print"><i class="fas fa-print"></i> Imprimir</button>`;
            print();
            console.log(aux);
        });
    }

    function passo_1(){
        Promise.all(
            $("#principal table td").map((index,el)=>{
                if(($(el).text()).includes("NOME EMPRESARIAL")){
                    aux['NomeEmpresarial'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("TÍTULO DO ESTABELECIMENTO (NOME DE FANTASIA)")){
                    aux['NomeFantasia'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("NÚMERO DE INSCRIÇÃO")){
                    aux['NumeroIncricao'] = remove_t($(el).find("font b").first().text());
                }else if(($(el).text()).includes("DATA DE ABERTURA")){
                    aux['DataAbertura'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("LOGRADOURO")){
                    aux['Logradouro'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("NÚMERO")){
                    aux['Numero'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("COMPLEMENTO")){
                    aux['Complemento'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("BAIRRO/DISTRITO")){
                    aux['Bairro'] = remove_t($(el).find("font b").text());
                }else if(($(el).text()).includes("ATIVIDADE ECONÔMICA PRINCIPAL")){
                    aux['EconomicaPrincipal'] = remove_t($(el).find("font b").text());
                    aux['EconomicaPrincipal'] = aux['EconomicaPrincipal'].split(" - ")[1];
                }
            })
        ).then(()=>{
            if(Object.keys(aux).length < 9){
                $("#app").css("background-color", "#FF6363");
                return false;
            }
            aux['NomeEmpresarial'] = aux['NomeEmpresarial'].trim();
            aux['NomeFantasia'] = aux['NomeFantasia'].trim();
            aux['NumeroIncricao'] = aux['NumeroIncricao'].trim();
            aux['DataAbertura'] = aux['DataAbertura'].trim();
            aux['Logradouro'] = aux['Logradouro'].trim();
            aux['Numero'] = aux['Numero'].trim();
            aux['Complemento'] = aux['Complemento'].trim();
            aux['Bairro'] = aux['Bairro'].trim();
            aux['EconomicaPrincipal'] = typeof aux['EconomicaPrincipal'] != "undefined" ?  aux['EconomicaPrincipal'].trim() : "";
            localStorage.setItem("database",JSON.stringify(aux));
            $("#app").css("background-color", "#65C18C");
            aux["Capital"] = "_______";
            aux.OPC = `<button class="btn btn-info" id="BTN_print"><i class="fas fa-print"></i> Imprimir</button>`;
            print();
        });
    }


    // Your code here...
})();

function copy(selector){
  var $temp = $("<div>");
  $("body").append($temp);
  $temp.attr("contenteditable", true)
       .html($(selector).html()).select()
       .on("focus", function() { document.execCommand('selectAll',false,null); })
       .focus();
  document.execCommand("copy");
  $temp.remove();
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

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

function remove_t(x){
    return x.replace("\t","")
}
