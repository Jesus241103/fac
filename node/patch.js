const miconexion = require("../conexion.js");
module.exports = (app) => {
    app.patch("/view/producto/:id", (req, res) => {
        let id = req.params.id; // Se obtiene el ID del producto desde los parámetros de la URL
        
        // Consulta para obtener el estado actual del producto
        let sqlGetEstado = 'SELECT estado FROM producto WHERE id=?';
        
        miconexion.query(sqlGetEstado, [id], (error, results) => {
            if (error) {
                console.error("Error al consultar el estado:", error);
                res.status(500).send("Error en el servidor.");
                return;
            }

            if (results.length === 0) {
                res.status(404).send({ message: "Producto no encontrado." });
                return;
            }

            // Aquí obtienes el estado actual
            let estadoActual = results[0].estado;

            // Comparación lógica: alternar entre 0 y 1
            let nuevoEstado = estadoActual === 0 ? 1 : 0;

            // Consulta para actualizar el estado
            let sqlUpdateEstado = 'UPDATE producto SET estado=? WHERE id=?';
            miconexion.query(sqlUpdateEstado, [nuevoEstado, id], (error, updateResults) => {
                if (error) {
                    console.error("Error al actualizar el estado:", error);
                    res.status(500).send("Error en el servidor al actualizar.");
                } else {
                    res.send({ 
                        message: "Estado actualizado exitosamente.",
                        estadoAnterior: estadoActual,
                        estadoNuevo: nuevoEstado,
                        results: updateResults
                    });
                }
            });
        });
    });
};