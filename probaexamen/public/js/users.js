document.addEventListener("DOMContentLoaded", () => {

  let formulario = document.getElementById("formulario");
  
  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let pass = document.getElementById("pass").value;
    let role = document.getElementById("role").value;

    if (name === "") {
      alert("intordueix el nom");
      document.getElementById("name").focus();
      return;
    }

    if (pass === "") {
      alert("intordueix la contrasenya");
      document.getElementById("pass").focus();
      return;
    }

    if (role === "") {
      alert("selecciona un rol");
      document.getElementById("role").focus();
      return;
    }

    const data = {
      name: name,
      password: pass,
      role: role,
    };

    let url = "http://localhost:3000/usuarios";

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
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
        alert(
          "Hubo un error al enviar los datos. Por favor, inténtalo de nuevo."
        );
      });
  });
});
