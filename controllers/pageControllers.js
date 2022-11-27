// Variables Globales
const glob = require('../settings/variables');

vista_Index = (req, res)=>{
    var locals = {
        title: 'Data Kraft',
        description: 'Formulario de Triaje',
        color: '#28a745'
    };
    res.render('index', locals);
}

module.exports = {
    vista_Index
}