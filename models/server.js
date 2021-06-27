const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');
const fileUpload = require('express-fileupload');
class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			auth: '/api/auth',
			categorias: '/api/categorias',
			productos: '/api/productos',
			usuarios: '/api/usuarios',
			uploads: '/api/uploads',
			query: '/api/query',
		};

		//DB Conections
		this.conectionDB();
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
		this.app.use(express.static('public'));
		//Manejador para la carga de archivos
		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: '/tmp/',
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.paths.auth, require('../routes/auth'));
		this.app.use(this.paths.categorias, require('../routes/categorias'));
		this.app.use(this.paths.productos, require('../routes/productos'));
		this.app.use(this.paths.usuarios, require('../routes/usuarios'));
		this.app.use(this.paths.uploads, require('../routes/uploads'));
		this.app.use(this.paths.query, require('../routes/query'));
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log(`App listen on http://localhost:${this.port}`);
		});
	}
}
module.exports = Server;
