import { Material } from "./Material.js";

export class Pelicula extends Material{
    constructor(titol, director, genere, disponibles){
        super(titol, disponibles);
        this.director = director;
        this.genere = genere;
    }

    toString() {
    return `${super.toString()} - Director: ${this.director}, Gènere: ${this.genere}`;
  }

}