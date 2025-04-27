const miconexion = require("../conexion.js");
module.exports = (app) => {
    app.get('/view/productos', (req, res)=>{
    miconexion.query('SELECT * FROM producto ORDER BY estado Desc, nombre ASC', (error, filas)=>{
        if(error) 
            throw(error);
        else
        res.send({
            success: true,
            data: filas,
            message: "Datos obtenidos exitosamente",
        });
    })//fin query
})};

