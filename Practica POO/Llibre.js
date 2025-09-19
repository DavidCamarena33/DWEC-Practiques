import { Material } from "./Material.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta){
    return new Promise(resolve => rl.question(pregunta + ' ', r =>resolve(r.trim())));
}

export class Llibre extends Material{
    constructor(titol, autor, disponibles){
        super(titol, disponibles);
        this.autor = autor;
    }

    async CrearLlibre(){
        let titol = await preguntar("Dime el titol del llibre");
        let autor = await preguntar("Dime el autor del libro");
        let disponibles = await preguntar("Dime la cantidad disponible");

        return new Llibrecreat(titol, autor, disponibles);
    }
}