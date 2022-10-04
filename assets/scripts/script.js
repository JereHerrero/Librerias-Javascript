debugger;

const mostrar = document.querySelector(".exchange-rate");
const input = document.querySelector("input[type='text']");
const selectorInicial = document.querySelector(".from select");
const selectorFinal = document.querySelector(".to select");
const imagenFrom = document.querySelector(".from .select-box img");
const imagenTo = document.querySelector(".to .select-box img");
const obtenerBoton = document.querySelector("form button");

window.onload = () => {
    imagenFrom.src = "assets/images/white-flag.png";
    imagenTo.src = "assets/images/white-flag.png";
}


selectorInicial.addEventListener('change', (event) => {
    imagenFrom.src = `https://flagcdn.com/48x36/${event.target.value.toLowerCase()}.png`;
    if(selectorInicial.value == ""){
        imagenFrom.src = "assets/images/white-flag.png";
    }
});

selectorFinal.addEventListener('change', (event) => {
    imagenTo.src = `https://flagcdn.com/48x36/${event.target.value.toLowerCase()}.png`;
    if(selectorFinal.value == ""){
        imagenTo.src = "assets/images/white-flag.png";
    }
});

obtenerBoton.addEventListener('click', (e) => {
    e.preventDefault();
    obtenerTipoCambio();
});

function obtenerTipoCambio() {
    let valorMonto = input.value;
    if(valorMonto == "" || valorMonto == "0"){
       mostrar.value = "1";
       valorMonto = 1;
    }
    
    let url,monedaInicial,monedaFinal;
    for (let index = 0; index < selectorInicial.length; index++) {
        if(selectorInicial[index].value == selectorInicial.value){
            url = `https://v6.exchangerate-api.com/v6/f97e5b3cb88c6e38d88a4f49/latest/${selectorInicial[index].className}`;
            monedaInicial = selectorInicial[index].className;
        }
    }

    for (let index = 0; index < selectorFinal.length; index++) {
        if(selectorFinal[index].value == selectorFinal.value){
            monedaFinal = selectorFinal[index].className;
        }
    }

    fetch(url).then(response => response.json()).then(result =>{
        let tipoCambio = result.conversion_rates[monedaFinal];
        let tasaTotal = (valorMonto * tipoCambio).toFixed(2);
        almacenar(valorMonto, tasaTotal, monedaInicial, monedaFinal);
        mostrar.innerText = `${tasaTotal} ${monedaFinal}`;
    }).catch(() =>{
        mostrar.innerText = "Algo salio mal";
    });
}

function almacenar(montoInicial, montoFinal, monedaInicial, monedaFinal){
    localStorage.clear();

    const conversor = {
        monto_inicial: montoInicial,
        moneda_inicial: monedaInicial,
        monto_final: montoFinal,
        moneda_final: monedaFinal
    }

    const conversorJson = JSON.stringify(conversor);
    localStorage.setItem("Conversión", conversorJson);

    mostrarLocalStorage();
    mostarConsola(conversor);
}

function mostrarLocalStorage(){
    console.log(localStorage.getItem("Conversión"));
}

function mostarConsola(objeto){
    const { monto_inicial, moneda_inicial, monto_final, moneda_final } = objeto;

    console.log("Monto inicial: " + monto_inicial + " " + moneda_inicial);
    console.log("Monto final: " + monto_final + " " + moneda_final);
}
