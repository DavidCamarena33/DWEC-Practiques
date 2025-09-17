export class Llibre extends Material{
    constructor(titol, autor, disponibles){
        super(titol, disponibles);
        this.autor = autor;
    }

    CrearLlibre(){
        let titol = prompt("Dime el titol del llibre");
        let autor = prompt("Dime el autor del libro");
        let disponibles = prompt("Dime la cantidad disponible");

        return new Llibrecreat(titol, autor, disponibles);
    }
}