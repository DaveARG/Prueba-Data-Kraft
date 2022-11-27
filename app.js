const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

// Dotenv es variables de entorno, o variables Globales
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// Trabajar con cookies
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Capturar datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Directorio Public, ahora usaremos siempre el directorio recursos
app.use(express.static(__dirname+'/public', {maxAge: 0})); // '1d'

// Motor de Plantillas
app.set('view engine', 'ejs');

// Layouts ejs
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', './layouts/layout');

// Pool de conexiones
const { pool } = require('./database/db');

// Rutas importadas de Ajax
app.use(require("./routes/ajax-index"));

const router = require('./routes/router');
app.use(router.routes);

// Compresión
const compression = require('compression');
app.use(compression());

server.listen(
    2000, function() {
        console.log("Se está ejecutando en http://localhost:2000");
      }
);