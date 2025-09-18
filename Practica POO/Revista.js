import { Material } from "./Material.js";

export class Revista extends Material{
    constructor(titol, data, disponibles){
        super(titol, disponibles);
        this.data = data;
    }
    
    CrearRevista(){
        let titol = prompt("Dime el titol de la revista");
        let data = prompt("Dime la fecha de publicacion");
        let disponibles = prompt("Dime la cantidad disponible");

        return new RevistaCreada(titol, data, disponibles);
    }
}