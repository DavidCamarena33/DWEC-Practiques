import { Material } from "./Material.js";

export class Llibre extends Material{
    constructor(titol, autor, disponibles){
        super(titol, disponibles);
        this.autor = autor;
    }

     toString() {
    return `${super.toString()} - Autor: ${this.autor}`;
  }

}