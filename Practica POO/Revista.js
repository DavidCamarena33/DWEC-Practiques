export class Revista extends Material{
    constructor(titol, data, disponibles){
        super(titol, disponibles);
        this.data = data;
    }
}