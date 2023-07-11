/*
 *  THIS WEB APPLICATION WAS DESIGNED AND CODED BY MAYCON P.
 *  GITHUB PAGES: https://mayconparanhos.github.io/
 *
 */

const cep = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

window.addEventListener("keydown", function(){
    if(cep.value.replace(/\D/g, "").length < 8) {
        cep.focus();
    }
}, false);

cep.addEventListener("input", async function(e){
    e.preventDefault();
    let len = this.value.replace(/\D/g, "").length;
    if(len < 8) {
        this.value = this.value.replace(/\D/g, "");
        this.value = this.value.replace(/(\d{5})(\d)/, "$1-$2");
    } else {
        this.value = this.value.slice(0, 9).replace(/(\d{5})(\d)/, "$1-$2");

        await getAddress(this.value.replace("-", ""));
    }
}, false);

async function getAddress(cep = ""){
    await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, 
        method: "GET",
        body: null
}).then(res => {
    res.json().then(json => {
        bairro.value = json.bairro;
        complemento.value = json.complemento;
        cidade.value = json.localidade;
        endereco.value = json.logradouro;
        estado.value = json.uf;
    });
}).catch(e => console.log(e));
}