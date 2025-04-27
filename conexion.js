let misql = require("mysql2");
let miconexion = misql.createConnection({
    host: "yamabiko.proxy.rlwy.net",
    database: "facturacion",
    user: "root",
    password: "xAaeLAuAJAtOEtKQXcCIwUxVBPGtpTFB",
    port:58416,
});
//mysql://root:xAaeLAuAJAtOEtKQXcCIwUxVBPGtpTFB@yamabiko.proxy.rlwy.net:58416/railway
miconexion.connect(function(err){
    if(err){
        throw err;
    }
    else{
        console.log("Conexion Exitosa.");
    }
});
module.exports = miconexion;