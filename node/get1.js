const miconexion = require("../conexion.js");
module.exports = (app) => {
    app.get('/view/producto/:id', (req, res) => {
        miconexion.query('SELECT * FROM producto WHERE id = ?', [req.params.id], (error, fila) => {
            if (error) 
                throw (error);
            else 
                res.send(fila);
        }); // fin query
    });
};
