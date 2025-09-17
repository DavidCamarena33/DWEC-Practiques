import { Llibre } from "./Llibre";
import { Pel·licula } from "./Pel·licula";
import { Revista } from "./Revista";
import { Soci } from "./Soci";
import { Administrador } from "./Administrador";


const llibre1 = new Llibre("El Quijote", "Miguel de Cervantes", 5);
const pel·licula1 = new Pel·licula("Eduardo Manostijeras", "Tim Burton","Drama", 10);
const revista1 = new Revista("Telediario", "12-03-2025", 19);
const soci1 = new Soci("Billy", "12345678V");
const admin1 = new Administrador("Juan", "12345677M", "administrador");


function PrestarServici(m, s){
    let dispo = false;
    if(m.disponibles <= 0){
        console.log("No hi han existencies");
    }
    else 
        console.log("Hi han existencies. Queden : ",m.dismponibles-1);
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
            
        }
    }
}