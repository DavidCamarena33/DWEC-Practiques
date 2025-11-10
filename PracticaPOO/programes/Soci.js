import { Persones } from "./Persones.js";

export class Soci extends Persones{
    constructor(nom, dni, llista){
        super(nom, dni);
        this.llista = [];
    }

    toString() {
    return `${super.toString()} - Soci amb ${this.llista.length} recursos prestats`;
  }

}