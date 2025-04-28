const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

// Configuración general del servidor
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Montar archivos estáticos (HTML, CSS, JS)
app.use("/view", express.static(path.join(__dirname, "./view")));
app.get("/view", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./view/index.html"));
});
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./view/index.html"));
});

// Importar y usar métodos desde módulos externos
const metodo_post = require("./node/post.js");
metodo_post(app);

const metodo_post2 = require("./node/post2.js");
metodo_post2(app);

const metodo_get = require("./node/get.js");
metodo_get(app);

const metodo_get1 = require("./node/get1.js");
metodo_get1(app);

const metodo_patch = require("./node/patch.js");
metodo_patch(app);

const metodo_patch1 = require("./node/patch1.js");
metodo_patch1(app);

const endpoint = require("./node/endpoint.js");
endpoint(app);

// Exportar el servidor como función para Vercel
module.exports = app;
