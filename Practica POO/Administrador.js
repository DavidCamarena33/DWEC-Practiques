import { Persones } from "./Persones.js";

export class Administrador extends Persones{
    constructor(nom, dni, carrec){
        super(nom, dni);
        this.carrec = carrec;
    }

    CrearAdmin(){
        let nom = prompt("Dime el nom del admin");
        let dni = prompt("Dime el DNI");
        let carrec = prompt("Dime el carrec");

        return new AdministradorCreat(nom, dni, carrec);
    }
}