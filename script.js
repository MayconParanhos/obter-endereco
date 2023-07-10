const cep = document.getElementById("cep");
const endereco = document.getElementById("endereco");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const dataCEP = {};

window.addEventListener("keydown", function(){
    cep.focus();
}, false);

cep.addEventListener("input", function(e){
    e.preventDefault();
    let len = this.value.length;
    
    if(len < 9) {
        this.value = this.value.replace(/\D/g, "");
        this.value = this.value.replace(/(\d{5})(\d)/, "$1-$2");
    } else {
        this.value = this.value.slice(0, 9).replace(/(\d{5})(\d)/, "$1-$2");

        getAddress(this.value.replace("-", ""), dataCEP);
        console.log(dataCEP.bairro);
    }
}, false);

async function getAddress(cep = "", dataObj = {}){
    const data = `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
                    <x:Header/>
                        <x:Body>
                            <cli:consultaCEP>
                                <cep>${cep}</cep>
                            </cli:consultaCEP>
                        </x:Body>
                    </x:Envelope>`;

await fetch("http://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente", {
    headers: {
        "Content-Type": "text/xml; charset=utf-8", 
    }, 
    method: "POST", 
    body: data
}).then(res => {
    res.text().then(txt => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(txt, "text/xml");

        const dataCEP = {
            bairro: xml.getElementsByTagName("bairro")[0].childNodes[0].nodeValue, 
            cep: xml.getElementsByTagName("cep")[0].childNodes[0].nodeValue, 
            cidade: xml.getElementsByTagName("cidade")[0].childNodes[0].nodeValue, 
            complemento2: xml.getElementsByTagName("complemento2")[0].childNodes[0].nodeValue, 
            end: xml.getElementsByTagName("end")[0].childNodes[0].nodeValue, 
            uf: xml.getElementsByTagName("uf")[0].childNodes[0].nodeValue
        };

        dataObj = dataCEP;
    })
}).catch(e => console.log(e));
}