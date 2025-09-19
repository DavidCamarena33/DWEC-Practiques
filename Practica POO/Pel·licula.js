import { Material } from "./Material.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta){
    return new Promise(resolve => rl.question(pregunta + ' ', r =>resolve(r.trim())));
}

export class Pel·licula extends Material{
    constructor(titol, director, genere, disponibles){
        super(titol, disponibles);
        this.director = director;
        this.genere = genere;
    }

    async CrearPeli(){
        let titol = await preguntar("Dime el titol");
        let director = await preguntar("Dime el director");
        let genere = await preguntar("Dime el genere");
        let disponibles = await preguntar("Dime la cantitat disponible");

        return new Pel·liculaCreada(titol, director, genere, disponibles);
    }
}