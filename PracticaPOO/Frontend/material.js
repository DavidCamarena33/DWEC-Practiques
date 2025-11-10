function ver(){
    var formulario = document.getElementById("formulario");
    var llibre = document.getElementById("llibre");
    var revista = document.getElementById("revista");
    var peli = document.getElementById("peli");
    var tipus = document.getElementById("tipus").value;
    var autorl = document.getElementById("autorl");
    var autorr = document.getElementById("autorr");
    var fecha = document.getElementById("fecha");
    var director = document.getElementById("director");
    var genere = document.getElementById("genere");

    llibre.hidden = true;
    revista.hidden = true;
    peli.hidden = true;

    autorl.required = false;
    autorr.required = false;
    fecha.required = false;
    director.required = false;
    genere.required = false;

    if(tipus === "llibre"){
        llibre.hidden = false;
        formulario.action = "/llibre";
        autorl.required = true;

    }else if(tipus === "revista"){
        revista.hidden = false;
        formulario.action = "/revista";
        autorr.required = true;
        fecha.required = true;

    }else if(tipus === "pelicula"){
        peli.hidden = false;
        formulario.action = "/pelicula";
        director.required = true;
        genere.required = true;
    }
}

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (event) =>{
    event.preventDefault();

    var titol = document.getElementById("titol").value;
    var disponibles = document.getElementById("disponibles").value;
    var tipus = document.getElementById("tipus").value;
    var autorl = document.getElementById("autorl").value;
    var autorr = document.getElementById("autorr").value;
    var fecha = document.getElementById("fecha").value;
    var director = document.getElementById("director").value;
    var genere = document.getElementById("genere").value; 
    let url = "";

    const data = {
        titol: titol,
        disponibles: disponibles
    };

    if(titol === ""){
        alert("Por favor, introduce un titulo.");
        document.getElementById("titol").focus();
        return;
    }

    if(disponibles === ""){
        alert("Por favor, introduce los ejemplares disponibles.");
        document.getElementById("disponibles").focus();
        return;
    }

    if (tipus === "llibre"){
        if(autorl === ""){
            alert("Por favor, introduce el autor del libro.");
            document.getElementById("autorl").focus();
            return;
        }
        data["autor"] = autorl;
        url = "http://localhost:3000/llibre";

    }else if(tipus === "revista"){
        if(autorr === ""){
            alert("Por favor, introduce el autor de la revista.");
            document.getElementById("autorr").focus();
            return;
        }

        if(fecha === ""){
            alert("Por favor, introduce la fecha de la revista.");
            document.getElementById("fecha").focus();
            return;
        }
        data["autor"] = autorr;
        data["fecha"] = fecha;
        url = "http://localhost:3000/revista";

    }else if(tipus === "pelicula"){
        if(director === ""){
            alert("Por favor, introduce el director de la pel·licula.");
            document.getElementById("director").focus();
            return;
        }

        if(genere === ""){
            alert("Por favor, introduce un genere de la pel·licula.");
            document.getElementById("genere").focus();
            return;
        }
        data["director"] = director;
        data["genere"] = genere;
        url = "http://localhost:3000/pelicula";
    }

    fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  body: JSON.stringify(data),
    })
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        "Error en la respuesta del servidor: " + response.statusText
      );
    }
    return response.json();
  })
  .then((responseData) => {
    console.log("Respuesta del servidor:", responseData);
    alert("¡Datos enviados con éxito!");
    formulario.reset();
    ver();
  })
  .catch((error) => {
    console.error("Error al enviar el formulario:", error);
    alert("Hubo un error al enviar los datos. Por favor, inténtalo de nuevo.");
  })
});