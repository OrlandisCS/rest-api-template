const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    //DB Conections
    this.conectionDB()
    //middlewares
    this.middleware();
    //Routes on my app
    this.routes();
  }
  async conectionDB() {
    await dbConection();
  }
  middleware() {
    //Cors
    this.app.use(cors());
    //Paser on json
    this.app.use(express.json());
    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listen on http://localhost:${this.port}`);
    });
  }
}
module.exports = Server;
