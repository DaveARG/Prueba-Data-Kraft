const express = require('express');
const app = express();

// Pool de conexiones
const { pool } = require('../database/db');

const {piscina_glob} = require('../settings/node-funciones');

app.post('/post_generico', async (req, res)=>{
    switch (req.body.tipo) {
        case 'Nuevo Paciente':
            piscina_glob(res, pool, 'INSERT INTO pacientes(nombres, apellidos, servicio_de_salud, fecha_nacimiento, temperatura, frecuencia_cardiaca, peso, talla) VALUES (?,?,?,?,?,?,?,?)', {parametros:[req.body.nombres,req.body.apellidos,req.body.servicio_de_salud,req.body.fn,req.body.temperatura,req.body.frecuencia_cardiaca,req.body.peso,req.body.talla]});
            break;
        case 'Buscar Pacientes':
            piscina_glob(res, pool, 'SELECT * FROM pacientes', {obj_cb:'m'});
            break;
        case 'Buscar Paciente':
            piscina_glob(res, pool, 'SELECT * FROM pacientes where cod=?', {parametros: [req.body.cod], obj_cb:'v'});
            break;
    }
})

module.exports = app;