const express = require("express");
let valoresAlmacenados = []; // Lista en memoria para almacenar los valores

module.exports = (app) => {
    // Asegúrate de que `express.json()` esté configurado al nivel de la aplicación
    app.use(express.json());

    // Endpoint para recibir y almacenar valores
    app.post('/scanner', (req, res) => {
        const { valor } = req.body; // Extrae el valor enviado en el cuerpo de la solicitud

        // Verificación básica
        if (!valor) {
            return res.status(400).json({ error: "No se recibió ningún valor." });
        }

        // Guardar el valor en la lista en memoria
        valoresAlmacenados.push(valor);

        // Respuesta exitosa
        res.status(200).json({
            mensaje: "Valor recibido y almacenado en memoria.",
            valoresAlmacenados, // Opcional: enviar la lista completa
        });
    });

    // Endpoint para consultar los valores almacenados
    app.get('/scanner/valores', (req, res) => {
        res.status(200).json({
            mensaje: "Lista de valores almacenados.",
            valores: valoresAlmacenados,
        });
    });
};