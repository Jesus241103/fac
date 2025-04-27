const miconexion = require("../conexion.js");
module.exports = (app) => {
    app.put("/view/producto", (req, res)=>{
        let id = [req.params.id];
        let nombre = req.body.nombre;
        let precio = req.body.precio;
        let iva = req.body.iva;
        let sql = 'UPDATE producto SET nombre=?, precio=?, iva=? WHERE id=?';
        miconexion.query(sql, [nombre, precio, iva], (error, results) => {
            if (error) 
                throw (error);
            else 
                res.send(results);
        });
})};