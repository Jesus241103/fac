fetch('http://localhost:3000/scanner/valores', {
    method: 'DELETE', // Método DELETE para borrar
})
    .then(response => response.json()) // Parsear la respuesta como JSON
    .then(data => {
        console.log("Respuesta del servidor:", data); // Mostrar la respuesta del servidor
    })
    .catch(error => {
        console.error("Error al intentar borrar la memoria:", error); // Manejar errores
    });


    const express = require("express");
const { spawn } = require("child_process");
const app = express();

app.use(express.json());

app.post("/ejecutar-camara", (req, res) => {
    // Ejecuta el script Python que abre la cámara
    const procesoPython = spawn("python", ["ruta_del_script.py"]);

    procesoPython.stdout.on("data", (data) => {
        console.log(`Salida de Python: ${data.toString()}`);
    });

    procesoPython.stderr.on("data", (error) => {
        console.error(`Error de Python: ${error.toString()}`);
    });

    procesoPython.on("close", (code) => {
        console.log(`Proceso Python terminado con código: ${code}`);
    });

    res.status(200).json({ mensaje: "Script Python ejecutado correctamente." });
});

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});