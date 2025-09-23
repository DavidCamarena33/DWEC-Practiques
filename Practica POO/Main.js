import { Llibre } from "./Llibre.js";
import { Pelicula } from "./Pelicula.js";
import { Revista } from "./Revista.js";
import { Soci } from "./Soci.js";
import { Administrador } from "./Administrador.js";
import { Material } from "./Material.js";
import { Persones } from "./Persones.js";
import readline from "readline";
import { resolve } from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function preguntar(pregunta) {
  return new Promise((resolve) =>
    rl.question(pregunta + " ", (r) => resolve(r.trim()))
  );
}

let opcio;
let Llibres = [];
let Revistes = [];
let Pelis = [];
let Socis = [];
let Admins = [];

do {
  await Menu();
} while (opcio != "12");

async function Menu() {
  console.log("Menu");
  console.log("1. Anyadir un llibre");
  console.log("2. Anyadir una revista");
  console.log("3. Anyadir una pel·licula");
  console.log("4. Anyadir un soci");
  console.log("5. Anyadir un admin");
  console.log("6. Prestar servici");
  console.log("7. Tornar un llibre");
  console.log("8. Llista de recursos");
  console.log("9. Llista de socis");
  console.log("10. Llista de admins");
  console.log("11. Llista de recursos de un soci");
  console.log("12. Eixir");
  opcio = await preguntar("Que opcio vols fer");

  switch (opcio) {
    case "1":
      let LlibreCreat = await CrearLlibre();
      Llibres.push(LlibreCreat);
      break;

    case "2":
      let RevistaCrada = await CrearRevista();
      Revistes.push(RevistaCrada);
      break;

    case "3":
      let PeliCreada = await CrearPeli();
      Pelis.push(PeliCreada);
      break;

    case "4":
      let SociCreat = await CrearSoci();
      Socis.push(SociCreat);
      break;

    case "5":
      let AdminCreat = await CrearAdmin();
      Admins.push(AdminCreat);
      break;

    case "6":
      let nomsoci = await ComprobarSoci();

      console.log(" 1. Llibre / 2. Revista / 3. Pel·licula");
      let desicio = await preguntar("Que vols alquilar?");
      let alquilar;
      let item;

      if (desicio == 1) {
        MostrarLlibres();
        item = await preguntar("Quin item vols alquilar");
        alquilar = Llibres[item - 1];
      } else if (desicio == 2) {
        MostrarRevistes();
        item = await preguntar("Quin item vols alquilar");
        alquilar = Revistes[item - 1];
      } else if (desicio == 3) {
        MostrarPelis();
        item = await preguntar("Quin item vols alquilar");
        alquilar = Pelis[item - 1];
      } else console.log("Numero no valid");

      PrestarServici(alquilar, nomsoci);
      break;

    case "7":
      let socinom = await ComprobarSoci();
      for (let i = 0; i < socinom.llista.lenght; i++) {
        console.log(llista[i] + " ");
      }
      let Devolver = await preguntar("Quin llibre vols tornar");
      TornarLlibre(socinom, socinom.llista[Devolver - 1]);
      break;

    case "8":

    case "9":
      MostrarSocis();
      break;

    case "10":
      MostrarAdmins();
      break;

    case "11":
      let recursossoci = await ComprobarSoci();
      MostrarRecursosSoci(recursossoci);
      break;

    case "12":
      console.log("Final");
      break;

    default:
      console.log("Opcion no valida");
      break;
  }
}

function PrestarServici(m, s) {
  let dispo = false;
  if (m.disponibles <= 0) {
    console.log("No hi han existencies");
  } else console.log("Hi han existencies. Queden : ", m.disponibles -= 1);
  dispo = true;

  if (s.llista.lenght < 3 && dispo == true) {
    m.disponibles - 1;
    m.push(s.llista);
  } else console.log("Has superat el llimit");
}

function TornarLlibre(s, l) {
  if (s.llista.includes(l)) {
    s.llista = s.llista.filter(item => item !== l);
    l.disponibles += 1; 
    console.log("Llibre retornat correctament.");
  } else {
    console.log("El llibre no està en la teua llista");
  }
}



function MostrarLlibres() {
  for (let i = 0; i < Llibres.lenght; i++) {
    console.log(Llibres[i] + " ");
  }
}

function MostrarRevistes() {
  for (let i = 0; i < Revistes.lenght; i++) {
    console.log(Revistes[i] + " ");
  }
}

function MostrarPelis() {
  for (let i = 0; i < Pelis.lenght; i++) {
    console.log(Pelis[i] + " ");
  }
}

function MostrarSocis() {
  for (let i = 0; i < Socis.lenght; i++) {
    console.log(Socis[i] + " ");
  }
}

function MostrarAdmins() {
  for (let i = 0; i < Admins.lenght; i++) {
    console.log(Admins[i] + " ");
  }
}

function MostrarRecursosSoci(soci) {
  for (let i = 0; i < soci.llista.lenght; i++) {
    console.log(soci.llista[i] + " ");
  }
}

async function ComprobarSoci() {
  let dni = await preguntar("Dime tu dni");

  for (let i = 0; i < Socis.length; i++) {
    if ((dni === Socis[i].dni)) {
      return Socis[i];
    } 
    else console.log("No estas registrado");
    return null;
  }
}

async function CrearRevista() {
  let titol = await preguntar("Dime el titol de la revista");
  let data = await preguntar("Dime la fecha de publicacion");
  let disponibles = await preguntar("Dime la cantidad disponible");

  return new Revista(titol, data, disponibles);
}

async function CrearLlibre() {
  let titol = await preguntar("Dime el titol del llibre");
  let autor = await preguntar("Dime el autor del libro");
  let disponibles = await preguntar("Dime la cantidad disponible");

  return new Llibre(titol, autor, disponibles);
}

async function CrearPeli() {
  let titol = await preguntar("Dime el titol");
  let director = await preguntar("Dime el director");
  let genere = await preguntar("Dime el genere");
  let disponibles = await preguntar("Dime la cantitat disponible");

  return new Pel·licula(titol, director, genere, disponibles);
}

async function CrearSoci() {
  let nom = await preguntar("Dime el nom del soci");
  let dni = await preguntar("Dime el DNI");

  return new Soci(nom, dni);
}

async function CrearAdmin() {
  let nom = await preguntar("Dime el nom del admin");
  let dni = await preguntar("Dime el DNI");
  let carrec = await preguntar("Dime el carrec");

  return new Administrador(nom, dni, carrec);
}
