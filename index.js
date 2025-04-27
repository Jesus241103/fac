const app = require("./server.js"); // Conecta tu servidor principal
module.exports = (req, res) => {
  app(req, res); // Maneja las solicitudes con Express
};