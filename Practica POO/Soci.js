import { Persones } from "./Persones.js";

export class Soci extends Persones{
    constructor(nom, dni, llista){
        super(nom, dni);
        this.llista = [];
    }

    CrearSoci(){
        let nom = prompt("Dime el nom del soci");
        let dni = prompt("Dime el DNI");

        return new SociCreat(nom, dni);
    }
}