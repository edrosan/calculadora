function agregar(e){
    var text = document.getElementById(e.id).innerHTML;
    document.getElementById("pantallaDatos").value = document.getElementById("pantallaDatos").value + text;
}

function limpiar(){
    document.getElementById("pantallaDatos").value = "";
}

function igual(){
    let operacion = document.getElementById("pantallaDatos").value;
    const operadores = ['+', '-', '*', '/', '^'];
    let pila = [];
    let numstring = "0";
    let num = 0;

    for(let i = 0; i < operacion.length; i++){
        if(operadores.includes(operacion[i])){
            num = Number(numstring);
            pila.push(num);
            numstring ="";
            pila.push(operacion[i])
        }else if(i == operacion.length-1){
            numstring += operacion[i];
            num = Number(numstring);
            pila.push(num)
        }else{
            numstring += operacion[i];
        }
    }

    opera(pila);
    // document.getElementById("pantallaDatos").value = resultado(postfija(pila));
}

function llamar(){
    let indice = document.getElementById("pantallaDatos").value;
    fibo = fibonacci(indice);
    document.getElementById("pantallaDatos").value = fibo;
}

function fibonacci(indice){
    let serie = [0,1];
    let a = 0;
    let b = 0;
    indice = Number(indice) + 1;
    for(let i = 0; i < indice; i++){
        if( (indice == 0) || (indice == 1)){
            i = indice;
            serie = [0];
        }
        else if(i == 0){
            i = 1;
        }
        else{
            a = serie[0]
            serie.push(Number(serie[i-2]) + Number(serie[i-1]) );
        }
    }
    alert("Serie completa: "+serie)
    return  serie.pop();
}


function opera(pila){
    let alta = ["^"];
    let media = ["*", "/"];
    let baja = ["+", "-"];
    let a;
    let b;
    let c;


    for(let i = 0; i <pila.length; i++){
        if(alta.includes(pila[i+1])){

            a = Number(pila.splice(i,1));
            c = pila.splice((i),1);
            b = Number(pila.splice((i),1, '0'));

            c = Math.pow(a,b)
            pila[i] = c;
            i=-1;
        }
    }
    for(let i = 0; i <pila.length; i++){
        if(media.includes(pila[i+1])){
            a = Number(pila.splice(i,1));
            c = pila.splice(i,1);
            b = Number(pila.splice(i,1,0));
            const OPERANDO = {
                "*": Number(a * b),
                "/": Number(a / b),
            };
            pila[i] = OPERANDO[c];
            i=-1;
        }
    }

    for(let i = 0; i <pila.length; i++){
        if(baja.includes(pila[i+1])){
            let a = Number(pila.splice(i,1));
            let c = pila.splice(i,1);
            let b = Number(pila.splice(i,1,0));

            const OPERANDO = {
                '+': Number(a + b),
                "-": Number(a - b),
            };
            pila[i] = OPERANDO[c];
            i=-1;
        }
    }


    document.getElementById("pantallaDatos").value = pila;
    // 2^4*2-5/2+1
    // 2^2*2/2*2^2
    // 2^2*8^5-4+7^6/2
}

