function ver() {
  var formulario = document.getElementById("formulario");
  var admin = document.getElementById("admin");
  var tipus = document.getElementById("tipus");

  var radioadm = document.getElementById("encarregat");
  var radioayu = document.getElementById("ayudante");

  if (tipus.value === "administrador") {
    admin.hidden = false;
    formulario.action = "/administrador";

    radioadm.required = true;
    radioayu.required = true;
  } else {
    admin.hidden = true;
    formulario.action = "/soci";
    radioadm.required = false;
    radioayu.required = false;
  }
}

var formulario = document.getElementById("formulario");

formulario.addEventListener("submit", (event) =>{
    event.preventDefault();

    const nombre = document.getElementById("nom").value;
    const dni = document.getElementById("dni").value;
    var tipus = document.getElementById("tipus").value;
    let url = "";

    if (nombre === ""){
        alert("Introduix el nom");
        document.getElementById("nom").focus();
        return;
    }

    if (dni === "" ){
        alert("Introdueix el dni");
        document.getElementById("dni").focus();
        return;
    }

    if (tipus === "") {
        alert("Por favor, selecciona un tipo.");
        document.getElementById("tipus").focus();
        return;
    }

    const data = {
        nom: nombre,
        dni: dni

    };

    if(tipus === "administrador"){
        const radioseleccionado = document.querySelector('input[name="carrec"]:checked');

        if(radioseleccionado){
            data["carrec"] = radioseleccionado.value;
        }
    }

    if(tipus === "soci"){
        url = "http://localhost:3000/soci";
    }
    else{
        url = "http://localhost:3000/admins";
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

})



