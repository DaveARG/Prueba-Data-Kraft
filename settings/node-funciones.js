const Decimal = require('decimal.js');

const generatePasswordRand = (length,type) => {
    switch(type){
        case 'num':
            characters = "0123456789";
            break;
        case 'alf':
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
        case 'rand':
            //FOR ↓
            break;
        default:
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            break;
    }
    var pass = "";
    for (i=0; i < length; i++){
        if(type == 'rand'){
            pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
        }else{
            pass += characters.charAt(Math.floor(Math.random()*characters.length));   
        }
    }
    if(type=='num'){pass=parseInt(pass);}
    return pass;
}

const fecha_hoy_UTC = () => {
    let f = new Date();
    var fmes=(f.getUTCMonth()+1).toString();
    if(f.getUTCMonth()+1<10){fmes="0"+fmes;}
    var fdia=f.getUTCDate().toString();
    if(f.getUTCDate()<10){fdia="0"+fdia;}
    let fecha_hoy = f.getUTCFullYear()+"-"+fmes+"-"+fdia;
    return fecha_hoy;
}
const hora_actual_UTC = () => {
    var t = new Date();
    var hora=t.getUTCHours().toString();
    var min=t.getUTCMinutes().toString();
    var sec=t.getUTCSeconds().toString();

    if(t.getUTCHours()<10){hora="0"+hora;}
    if(t.getUTCMinutes()<10){min="0"+min;}
    if(t.getUTCSeconds()<10){sec="0"+sec;}
    let hora_actual = hora+":"+min+":"+sec;
    return hora_actual;
}

const piscina_glob = (res, piscina, query, obj)=>{
    return new Promise((resolve,reject)=>{
        var {parametros=[], obj_cb="", callback=(respuesta, obj_cb)=>{
            if(obj_cb == "m"){ res.json({msg: 'Ok', obj: respuesta}); }
            else if(obj_cb == "v"){ res.json({msg: 'Ok', obj: respuesta[0]}); }
            else if(obj_cb == "u"){ res.json({msg: 'Ok', obj: respuesta[0][0]}); }
            else{ res.json({msg: 'Ok'}); }
        }} = obj;
        piscina.query(query, parametros, (error, results)=>{
            let respt = "";
            if(error){ res.send(error); }
            else{ respt = callback(results, obj_cb); }
            return resolve(respt);
        });
    });
}

function operar(o,a,b,prec=-1){
    a = new Decimal(a);
    switch (o) {
        case '+':
            b = a.plus(b).toNumber();
            break;
        case '-':
            b = a.minus(b).toNumber();
            break;
        case '*':
            b = a.times(b).toNumber();
            break;
        case '/':
            b = a.dividedBy(b).toNumber();
            break;
    }
    if(prec>=0){ b = truncar(b,prec); }
    return b;
}
function truncar(b,prec){
    let c = Math.pow(10,prec);
    b = parseInt(operar("*",b,c));
    b = operar("/",b,c);
    return b;
}

module.exports = {
    generatePasswordRand,
    fecha_hoy_UTC,
    hora_actual_UTC,
    piscina_glob,
    operar,
    truncar
}