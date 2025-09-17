import { Llibre } from "./Llibre";
import { Pel·licula } from "./Pel·licula";
import { Revista } from "./Revista";
import { Soci } from "./Soci";
import { Administrador } from "./Administrador";

let opcio;
let Llibres = [];

do{
    console.log("Menu");
    console.log("1. Anyadir un llibre");
    console.log("2. Anyadir una revista");
    console.log("3. Anyadir una pel·licula");
    console.log("4. Anyadir un soci");
    console.log("5. Anyadir un admin");
    console.log("6. Prestar servici");
    console.log("7. Tornar un llibre");
    console.log("8. Llista de recursos");
    console.log("9. Llista de socis");
    console.log("10. Llista de admins");
    console.log("11. Llista de recursos de un soci");
    console.log("12. Eixir");
    opcio = prompt("Quina opcio vols fer");

    switch(opcio){
        case 1:
            let LlibreCreat = CrearLlibre();
            break;

        case 2:
            CrearRevista();
            break;

        case 3:
            CrearPeli();
            break;

        case 4:
            CrearSoci();
            break;

        case 5:
    }
}while(opcio != 12)


function PrestarServici(m, s){
    let dispo = false;
    if(m.disponibles <= 0){
        console.log("No hi han existencies");
    }
    else 
        console.log("Hi han existencies. Queden : ",m.disponibles-1);
        dispo = true;


    if(s.llista.lenght < 3 && dispo == true){
        m.disponibles -1;
        m.push(s.llista);
    }
    else
        console.log("Has superat el llimit")
}

function TornarLlibre(l, s){
    for(let i = 0; i < s.llista.lenght; i++){
        if(s.llista[i] == l){
            s.llista.filter(x => x == s.llista[i]);
            l.disponibles + 1;
        }
        else
            console.log("El llibre no esta en la teua llista");
    }
}

function MostrarSocis(socis){
    for(let i = 0; i< socis.lenght; i++){
        console.log(socis[i]);
    }
}

function MostrarAdmins(admins){
    for(let i = 0; i<admins.lenght; i++){
        console.log(admins[i]);
    }
}

function MostrarRecursosSoci(soci){
    for(let i = 0; i< soci.llista.lenght; i++){
        console.log(soci.llista[i]);
    }
}