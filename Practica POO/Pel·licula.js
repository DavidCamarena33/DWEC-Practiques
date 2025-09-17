export class Pel·licula extends Material{
    constructor(titol, director, genere, disponibles){
        super(titol, disponibles);
        this.director = director;
        this.genere = genere;
    }
}