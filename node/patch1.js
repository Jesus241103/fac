const miconexion = require("../conexion.js");
module.exports = (app) => {
  // Asegúrate de tener app.use(express.json()) antes de estas rutas
  app.patch("/view/actualizacion/:id", (req, res) => {
    const id = req.params.id;
    const { name, precio, iva } = req.body;  // Leemos los nuevos valores
      // Ahora actualizamos los campos name, precio e iva
      const sqlUpdate = `UPDATE producto SET nombre = ?, precio = ?, iva = ? WHERE id = ?`;
      miconexion.query(sqlUpdate, [name, precio, iva, id], (err, results) => {
        if (err) {
          console.error("Error al modificar los datos:", err);
          return res.status(500).send("Error en el servidor al modificar.");
        }
        res.json({
          success: true,
          message: "Datos modificados exitosamente.",
          results: results
        });
      });//FIN QUERY
  });//FIN PATCH
};
