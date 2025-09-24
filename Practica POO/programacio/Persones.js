export class Persones{
    constructor(nom, dni){
        this.nom = nom;
        this.dni = dni;
    }

    toString() {
    return `${this.nom} (DNI: ${this.dni})`;
  }
  
}