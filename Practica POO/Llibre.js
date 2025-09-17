export class Llibre extends Material{
    constructor(titol, autor, disponibles){
        super(titol, disponibles);
        this.autor = autor;
    }
}