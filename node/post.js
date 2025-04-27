const miconexion = require("../conexion.js"); // Importa la conexión a la base de datos

module.exports = (app) => {
    app.post("/post", (req, res) => {
        const datos = req.body; // Recibe los datos enviados por el cliente

        // Validación: Asegurarse de que todos los campos estén llenos
        for (const campo in datos) {
            if (!datos[campo]) {
                return res.status(400).json({
                    error: `Error: El campo ${campo} está vacío.`,
                });
            }
        }

        // Desestructuración de los datos
        const { id, nombre, precio, iva } = datos;

        try {
            const insertar =
                "INSERT INTO producto (id, nombre, precio, iva, estado) VALUES (?, ?, ?, ?, 1)";
            miconexion.query(insertar, [id, nombre, precio, iva], (error, resultado) => {
                if (error) {
                    console.error("Error al insertar en la base de datos:", error);
                    return res.status(500).json({
                        error: "Error al procesar la inserción en la base de datos. Posiblemete el ID ya esta registrado",
                    });
                }

                if (resultado && resultado.affectedRows > 0) {
                    return res.status(200).json({
                        mensaje: "Registro realizado exitosamente.",
                    });
                } else {
                    return res.status(500).json({
                        error: "No se pudo completar el registro.",
                    });
                }
            });
        } catch (error) {
            console.error("Error interno del servidor:", error);
            res.status(500).json({
                error: "Error interno en el servidor.",
            });
        }
    });
};