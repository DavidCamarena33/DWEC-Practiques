import { Persones } from "./Persones.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta){
    return new Promise(resolve => rl.question(pregunta + ' ', r =>resolve(r.trim())));
}

export class Soci extends Persones{
    constructor(nom, dni, llista){
        super(nom, dni);
        this.llista = [];
    }

    async CrearSoci(){
        let nom = await preguntar("Dime el nom del soci");
        let dni = await preguntar("Dime el DNI");

        return new SociCreat(nom, dni);
    }
}