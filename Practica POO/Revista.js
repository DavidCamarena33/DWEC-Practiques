import { Material } from "./Material.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta){
    return new Promise(resolve => rl.question(pregunta + ' ', r =>resolve(r.trim())));
}

export class Revista extends Material{
    constructor(titol, data, disponibles){
        super(titol, disponibles);
        this.data = data;
    }
    
    async CrearRevista(){
        let titol = await preguntar("Dime el titol de la revista");
        let data = await preguntar("Dime la fecha de publicacion");
        let disponibles = await preguntar("Dime la cantidad disponible");

        return new RevistaCreada(titol, data, disponibles);
    }
}