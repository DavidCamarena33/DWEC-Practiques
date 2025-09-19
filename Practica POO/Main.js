import { Llibre } from "./Llibre.js";
import { Pel·licula } from "./Pel·licula.js";
import { Revista } from "./Revista.js";
import { Soci } from "./Soci.js";
import { Administrador } from "./Administrador.js";
import { Material } from "./Material.js";
import { Persones } from "./Persones.js";
import readline from "readline";
import { resolve } from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta){
    return new Promise(
        resolve => rl.question(
            pregunta + ' ', 
            r =>resolve(r.trim()))
    );
}

let opcio;
let Llibres = [];
let Revistes = [];
let Pelis = [];
let Socis = [];
let Admins = [];

do{
    await Menu();

}while(opcio != '12')

async function Menu(){
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
    opcio = await preguntar("Que opcio vols fer");

    switch(opcio){

        case '1':
            let LlibreCreat = CrearLlibre();
            LlibreCreat.psuh(Llibres);
            break;

        case '2':
            let RevistaCrada = CrearRevista();
            RevistaCrada.push(Revistes);
            break;

        case '3':
            let PeliCreada = CrearPeli();
            PeliCreada.push(Pelis);
            break;

        case '4':
            let SociCreat = CrearSoci();
            SociCreat.push(Socis);
            break;

        case '5':
            let AdminCreat = CrearAdmin();
            AdminCreat.push(Admins);
            break;

        case '6':
            let nomsoci = ComprobarSoci(dniso);

            console.log(" 1. Llibre / 2. Revista / 3. Pel·licula");
            let desicio = prompt("Que vols alquilar?");
            let alquilar;
            let item;

            if(desicio == 1){
                MostrarLlibres();
                item = prompt("Quin item vols alquilar");
                alquilar = Llibres[item - 1 ];
            }
            else if(desicio == 2){
                MostrarRevistes();
                item = await pregunta("Quin item vols alquilar");
                alquilar = Revistes[item - 1 ];
            }
            else if(desicio == 3){
                MostrarPelis();
                item = await pregunta("Quin item vols alquilar");
                alquilar = Pelis[item - 1 ];
            }
            else
                console.log("Numero no valid");

            PrestarServici(alquilar, nomsoci);
            break;

        case '7':
        let socinom = ComprobarSoci();
        for(let i = 0; i < socinom.llista.lenght; i ++){
            console.log(llista[i] + " ");
        }
        let Devolver = await pregunta("Quin llibre vols tornar");
        TornarLlibre(socinom, socinom.llista[Devolver - 1]);
        break;

        case '8':


        case '9':
            MostrarSocis();
            break;

        case '10':
            MostrarAdmins();
            break;

        case '11':
            let recursossoci = ComprobarSoci();
            MostrarRecursosSoci(recursossoci);
            break;

        case '12':
            console.log("Final");
            break;


        default:
            console.log("Opcion no valida");
            break;
    }
}



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
            s.llista.filter(x => x !== s.llista[i]);
            l.disponibles + 1;
        }
        else
            console.log("El llibre no esta en la teua llista");
    }
}

function MostrarLlibres(){
    for(let i = 0; i< Llibres.lenght; i++){
        console.log(Llibres[i] + " ");
    }
}

function MostrarRevistes(){
    for(let i = 0; i< Revistes.lenght; i++){
        console.log(Revistes[i] + " ");
    }
}

function MostrarPelis(){
    for(let i = 0; i< Pelis.lenght; i++){
        console.log(Pelis[i] + " ");
    }
}

function MostrarSocis(){
    for(let i = 0; i< Socis.lenght; i++){
        console.log(Socis[i] + " ");
    }
}

function MostrarAdmins(){
    for(let i = 0; i<Admins.lenght; i++){
        console.log(Admins[i] + " ");
    }
}

function MostrarRecursosSoci(soci){
    for(let i = 0; i< soci.llista.lenght; i++){
        console.log(soci.llista[i] + " ");
    }
}

async function ComprobarSoci(){
    let dni = await pregunta("Dime tu dni");

    for(let i = 0; i<Socis.length; i++){
                if(dni = Socis[i].dni){
                    nomsoci = Socis[i];
                    return nomsoci;
                }
                else
                    console.log("No estas registrado")
            }
}