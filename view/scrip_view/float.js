document.getElementById("formulario").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const datosFormulario = {
        id: document.getElementById("id").value,
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        iva: document.getElementById("iva").value,
    };

    try {
        const respuesta = await fetch("http://localhost:3000/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datosFormulario),
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            Swal.fire({
                title: "Registro exitoso",
                text: resultado.mensaje,
                icon: "success",
            });
            document.getElementById("reset").click(); // Reinicia el formulario
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: resultado.error,
            });
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de conexión",
            text: "No se pudo conectar al servidor.",
        });
        console.error("Error en la solicitud:", error);
    }
});