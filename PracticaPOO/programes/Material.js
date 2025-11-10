export class Material{
    constructor(titol, disponibles){
        this.titol = titol;
        this.disponibles = disponibles;
    }

     toString() {
    return `${this.titol} (Disponibles: ${this.disponibles})`;
  }

}