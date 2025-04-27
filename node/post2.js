const miconexion = require("../conexion.js");
module.exports = (app) => {
    app.post("/post/factura", async (req, res) => {
        const { cedula, nombre, direccion, cantidad, sub, fecha } = req.body;

        const cantidad1 = parseInt(cantidad.replace("UNIDADES:", "").trim(), 10);
        const sub1 = parseFloat(sub.replace("SUB TOTAL:", "").trim());
        console.log("Datos recibidos:", req.body);
        const insertar =
            "INSERT INTO factura (cedula, nombre, direccion, cantidad, sub, fecha) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            // Ejecución de la consulta

            miconexion.query(insertar, [cedula, nombre, direccion, cantidad1, sub1, fecha], (error, resultado) => {
                if (error) {
                    console.error("Error al insertar en la base de datos:", error);
                    return res.status(500).json({
                        error: "Error al procesar la inserción en la base de datos.",
                    });
                }

                // Verificar si se afectaron filas
                if (resultado?.affectedRows > 0) {
                    return res.status(200).json({
                        success: true,
                        mensaje: "Registro realizado exitosamente.",
                    });
                }

                return res.status(500).json({
                    error: "No se pudo completar el registro.",
                });
            });
        } catch (error) {
            console.error("Error interno del servidor:", error);
            return res.status(500).json({
                error: "Error interno en el servidor.",
            });
        }
    });
};