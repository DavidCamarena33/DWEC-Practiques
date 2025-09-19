import { Persones } from "./Persones.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta){
    return new Promise(resolve => rl.question(pregunta + ' ', r =>resolve(r.trim())));
}

export class Administrador extends Persones{
    constructor(nom, dni, carrec){
        super(nom, dni);
        this.carrec = carrec;
    }

    async CrearAdmin(){
        let nom = await preguntar("Dime el nom del admin");
        let dni = await preguntar("Dime el DNI");
        let carrec = await preguntar("Dime el carrec");

        return new AdministradorCreat(nom, dni, carrec);
    }
}