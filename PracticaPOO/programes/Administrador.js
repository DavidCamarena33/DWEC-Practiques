import { Persones } from "./Persones.js";

export class Administrador extends Persones{
    constructor(nom, dni, carrec){
        super(nom, dni);
        this.carrec = carrec;
    }

    toString() {
    return `${super.toString()} - Administrador (${this.carrec})`;
  }

}