import { Material } from "./Material.js";

export class Pel·licula extends Material{
    constructor(titol, director, genere, disponibles){
        super(titol, disponibles);
        this.director = director;
        this.genere = genere;
    }

    CrearPeli(){
        let titol = prompt("Dime el titol de la pelicula");
        let director = prompt("Dime el nom del director");
        let genere = prompt("Dime el genere")
        let disponibles = prompt("Dime la cantidad disponible");

        return new Pel·liculaCreada(titol, director, genere, disponibles);
    }
}