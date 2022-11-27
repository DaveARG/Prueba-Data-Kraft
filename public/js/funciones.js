var searchTimer;
//  FUNCIONES DE INPUT
    function focus_blur_input(elem,tipo){
        if(tipo=="success"){
            var shadow="shadow-success";
            var shadow_blur="shadow-success-blur";
            var text="text-success";
        }else if(tipo=="warning"){
            var shadow="shadow-warning";
            var shadow_blur="shadow-warning-blur";
            var text="text-warning";
        }else if(tipo=="danger"){
            var shadow="shadow-danger";
            var shadow_blur="shadow-danger-blur";
            var text="text-danger";
        }
        let group=$(elem).attr("grupo");
        let svg=$(elem).attr("svg-i");
        if($(elem).is(":focus")) {
            $(group).removeClass(shadow_blur);
            $(group).addClass(shadow);
            $(svg).addClass(text);
        }else{
            $(group).removeClass(shadow);
            $(group).addClass(shadow_blur);
            $(svg).removeClass(text);
        }
    }

    function validar_negativo(elem){
        var letra=$(elem).val().charAt(0);
        if(letra == "-"){
            var inpu2 = $(elem).val().slice(1,$(elem).val().length);
            inpu2=inpu2.replace(/-/g, '');
            inpu2="-"+inpu2;
        }else{
            var inpu2 = $(elem).val();
            inpu2=inpu2.replace(/-/g, '');
        }
        $(elem).val(inpu2);
    }
    function validar_decimal(elem){
        var pos = $(elem).val().indexOf('.');
        if(pos >= 0) {
            pos++;
          	var inpu = $(elem).val().slice(0,pos);
            var inpu2 = $(elem).val().slice(pos,$(elem).val().length);
            inpu2=inpu2.replace(/[.]/g, '');
          	$(elem).val(inpu+inpu2);
        }
    }
    function validar_precision_decimal(elem,pres=2){
        var pos = $(elem).val().indexOf('.');        
        if(pos >= 0) {
            var num = $(elem).val().split(".");
            var decimal = num[1];
            if(decimal.length > pres){
                $(elem).val($(elem).val().slice(0,$(elem).val().indexOf('.')+pres+1));
            }
        }
    }
    function numero_vacio(elem){
        if($(elem).val()=="-"){
            $(elem).val("");
        }else{
            var mult = $(elem).val()*2;
            if(mult == 0){
                $(elem).val("");
            }
        }
    }
    function validar_largo(elem){
        let largo=parseInt($(elem).attr("largo"));
        if(largo){
            if($(elem).val().length > largo){
                $(elem).val($(elem).val().slice(0,largo));
            }
        }
    }

    function numero_entero(elem){
        $(elem).val($(elem).val().replace(/[^0-9]/g,''));
        if($(elem).is('[grupo]')){
            let group=$(elem).attr("grupo");
            let v1=$(elem).val();
            $(elem).val($(elem).val().replace(/[^0-9]/g,''));
            if(v1==$(elem).val()){
                $(group).siblings(".position-relative").children(".text-danger").addClass("invisible");
            }else{
                $(group).siblings(".position-relative").children(".text-danger").removeClass("invisible");
                des_habilitar(button,"off");
            }
        }
        var letra=$(elem).val().charAt(0);
        while(letra == "0" && $(elem).val().length>1){
            $(elem).val($(elem).val().slice(1,$(elem).val().length));
        }

        validar_largo(elem);
    }
    function numero_entero_negativo(elem){
        $(elem).val($(elem).val().replace(/[^0-9-]/g,''));
        
        validar_negativo(elem);
        
        var valor =$(elem).val();
        var letra = valor.charAt(0);
        var neg = "";
        if(letra == "-"){
        	valor = $(elem).val().slice(1,$(elem).val().length);
            letra = valor.charAt(0);
          	neg = "-";
        }
        while(letra == "0" && valor>1){
        	valor = valor.slice(1,valor.length);
            $(elem).val(neg+valor);
            letra = valor.charAt(0);
        }
        
        validar_largo(elem);
    }

    function numero_decimal(elem){
        $(elem).val($(elem).val().replace(/[^0-9.]/g,''));
        validar_decimal(elem);
        
        var valor =$(elem).val();
        var letra = valor.charAt(0);
        var letra2 = valor.charAt(1);
        var da = false;
        while(letra == "0" && valor.length>1 && letra2!="."){
        	valor = valor.slice(1,valor.length);
            $(elem).val(valor);
            letra = valor.charAt(0);
        	letra2 = valor.charAt(1);
            da=true;
        }
        if(da){
            var pos_aux = $(elem).val().indexOf('.');
            var pos = 1;
            if(pos_aux != -1 && $(elem).val().slice(0,pos_aux).length<=pos){
                $(elem)[0].setSelectionRange(pos, pos);
            }
        }
        
        validar_precision_decimal(elem);
        
        validar_largo(elem);
    }
    function numero_decimal_negativo(elem,pres=2){
        $(elem).val($(elem).val().replace(/[^0-9.-]/g,''));
        validar_negativo(elem);
        validar_decimal(elem);
        
        var valor =$(elem).val();
        var letra = valor.charAt(0);
        var letra2 = valor.charAt(1);
        var neg = "";
        var da = false;
        if(letra == "-"){
            valor = $(elem).val().slice(1,$(elem).val().length);
            letra = valor.charAt(0);
            letra2 = valor.charAt(1);
                neg = "-";
        }
        while(letra == "0" && valor.length>1 && letra2!="."){
            valor = valor.slice(1,valor.length);
            $(elem).val(neg+valor);
            letra = valor.charAt(0);
            letra2 = valor.charAt(1);
            da=true;
        }
        if(da){
            var pos_aux = $(elem).val().indexOf('.');
            var pos = 1;
            if($(elem).val().charAt(0) == "-"){
                pos = 2;
            }
            if(pos_aux != -1 && $(elem).val().slice(0,pos_aux).length<=pos){
                $(elem)[0].setSelectionRange(pos, pos);
            }
        }
        
        validar_precision_decimal(elem,pres);
        
        validar_largo(elem);
    }
    function numero_decimal_vacio(elem){
        if(/^\./.test($(elem).val())) {
            $(elem).val("0"+$(elem).val());
        }
        if(/\.$/.test($(elem).val())) {
            $(elem).val($(elem).val().slice(0,$(elem).val().length-1));
        }
        numero_vacio(elem);
    }

    function validar_Input(elem){
        let group=$(elem).attr("grupo");
        let largo=parseInt($(elem).attr("largo"));
        let button=$(elem).closest("form").attr("boton");
        if($(elem).val().length >= largo) {
            $(group).siblings(".position-relative").children(".text-success").removeClass("invisible");
            return true;
        }else{
            $(group).siblings(".position-relative").children(".text-success").addClass("invisible");
            des_habilitar(button,"off");
            return false;
        }
    }

    function validar_Form(elem,tipo){
        let form=$(elem).closest("form");
        let button=form.attr("boton");
        var i=0;
        form.find("input").each(function() {
            let group=$(this).attr("grupo");
            if(!validar_Input(this)){
                i++;
                if(tipo=="submit"){
                    $(group).siblings(".position-relative").children(".text-danger").removeClass("invisible");
                }
            }
        });
        if(i>0){
            des_habilitar(button,"off");
            return false;
        }else{
            des_habilitar(button,"on");
            return true;
        }
    }

    function validar_Input_tel_text_class(elem,igual,clase,btn){
        let id = $(elem).attr('id');
        if($(elem).val().trim().length > 0){
            if($(elem).attr('type') == "tel"){
                if($(elem).val().trim().length >= igual && $(elem).val().trim() != "-" && $(elem).val().trim() != "." && $(elem).val().trim() != "-."){
                    $("#estado-"+id).css({color: "#28a745"});
                    $("#estado-"+id).html('<i class="bi bi-check-circle-fill"></i>');
                    $("#estado-"+id).attr('listo','si');
                }else{
                    $("#estado-"+id).css({color: "#ef9210"});
                    $("#estado-"+id).html('<i class="bi bi-exclamation-triangle-fill"></i>');
                    $("#estado-"+id).attr('listo','no');
                }
            }else{
                $("#estado-"+id).css({color: "#28a745"});
                $("#estado-"+id).html('<i class="bi bi-check-circle-fill"></i>');
                $("#estado-"+id).attr('listo','si');
            }
        }else{
            $("#estado-"+id).css({color: "#ef9210"});
            $("#estado-"+id).html('<i class="bi bi-exclamation-triangle-fill"></i>');
            $("#estado-"+id).attr('listo','no');
        }
        validar_Form_class(clase,btn);
    }
    function validar_Select_class(elem,clase,btn){
        let id = $(elem).attr('id');
        if($(elem).val() != "xxx"){
            $("#estado-"+id).css({color: "#28a745"});
            $("#estado-"+id).html('<i class="bi bi-check-circle-fill"></i>');
            $("#estado-"+id).attr('listo','si');
        }else{
            $("#estado-"+id).css({color: "#ef9210"});
            $("#estado-"+id).html('<i class="bi bi-exclamation-triangle-fill"></i>');
            $("#estado-"+id).attr('listo','no');
        }
        validar_Form_class(clase,btn);
    }
    function validar_Form_class(clase,btn,tipo="attr"){
        let completo = true;
        if(tipo=="attr" || tipo=="val"){
            $(clase).each(function(i) {
                if(tipo=="attr"){
                    if($(this).attr('listo') == "no"){ completo = false; }
                }else if(tipo=="val"){
                    if(!$(this).val().trim().length || (parseFloat($(this).val()) * 2) == 0 || $(this).val().trim()=="xxx"){ completo = false; }
                    if($(this).attr('fijo')){ if(parseInt($(this).attr('fijo')) != $(this).val().trim().length){ completo = false; } }
                    if($(this).attr('opcional') == "si"){ completo = true; }
                }
            });
        }else if(tipo=="json"){
            var obj = get_inputs_class(clase);
            obj = remove_inputs_vacios_obj(obj);
            if(!Object.keys(obj).length){ completo = false; }
        }
        if(completo){ des_habilitar(btn,'on'); }
        else{ des_habilitar(btn,'off'); }
    }
    function get_inputs_class(clase){
        var obj = {};
        $(clase).each(function() {
            let val = $(this).val();
            if($(this).attr('type') == 'checkbox'){
                if($(this).is(':checked')){
                    obj[$(this).attr('nombre')] = val;
                }
            }else{
                switch ($(this).attr('tipo')) {
                    case 'f':
                        val = parseFloat(val);
                        if(isNaN(val)){val = undefined}
                        break;
                    case 'i':
                        val = parseInt(val);
                        if(isNaN(val)){val = undefined}
                        break;
                    case 'j':
                        val = JSON.stringify([val]);
                        break;
                }
                obj[$(this).attr('nombre')] = val;
            }
        });
        return obj;
    }
    function remove_inputs_class(clase){
        $(clase).each(function() {
            let val = $(this).val('');
            if($(this).attr('oninput')){
                $(this).trigger('input');
            }else if($(this).attr('onchange')){
                $(this).trigger('change');
            }
        });
    }
    function remove_inputs_vacios_obj(obj,json={vacio_0:[0,"",undefined], extras:['xxx']}){
        var {vacio_0=[0,"",undefined], extras=['xxx']} = json;
        Object.entries(obj).forEach(([key, value]) => {
            $.each(vacio_0, function(i,val){
                if(value === val){
                    delete obj[key];
                    return;
                }
            });
            $.each(extras, function(i,val){
                if(value === val){
                    delete obj[key];
                    return;
                }
            });
        });
        return obj;
    }
    function get_table_input_class(obj2){
        var {clase,empresa,suma=false,drop_onclick=''} = obj2;
        var table = `<div class="centrar-xy rounded scroll-cell shadow w-100-popover mw-100" style="background-color:#bbb;overflow-y:overlay;">
            <div class="h-100 w-100 position-relative">
                <table class="table m-0 table-light bg-light table-sm table-hover table-striped table-responsive h-100 rounded scroll-cell">
                    <thead class="thead-dark thead-fixed montserrat-r f-size-70"> 
                        <tr> 
                            <th class="align-middle">
                                <div class="centrar-xy px-1 text-warning text-nowrap">
                                    C.
                                </div>
                            </th>
                            <th class="w-100 align-middle">
                                <div class="centrar-xy">Nombre</div>
                            </th>
                            <th class="align-middle">
                                <div class="centrar-xy pl-1 text-warning text-nowrap">
                                    Prec.
                                </div>
                            </th>
                            <th class="align-middle">
                                <div class="centrar-xy text-success text-nowrap">Tot.</div>
                            </th>
                            <th class="align-middle pr-2">
                                <div class="centrar-xy px-0 text-danger">
                                    <i class="bi bi-trash-fill"></i>
                                </div>
                            </th>
                        </tr> 
                    </thead>
                    <tbody class="position-relative">`;
        var obj = get_inputs_class(clase);
        obj = remove_inputs_vacios_obj(obj);
        var sum_tot = 0;
        Object.entries(obj).forEach(([key, val]) => {
            var precios = sessionStorage.getItem(empresa+'_'+key).split('_');
            var precio = parseFloat(precios[0]);
            if(val >= 12 && parseFloat(precios[1])){ precio= parseFloat(precios[1]); }
            else if(val >= 100 && parseFloat(precios[2])){ precio= parseFloat(precios[2]); }
            var total = operar("*",val,precio,2);
            table += add_tr({tb:'xxxxx', attr_tr:'llave="'+key+'"', class_tr:'montserrat-m f-size-70', append:false, parametros:[
                {descripcion:val},
                {tipo:'scroll', descripcion:precios[3]},
                {tipo:'nowrap', descripcion:precio.toFixed(2)},
                {tipo:'nowrap', descripcion:total.toFixed(2), nowrap_class:"text-nowrap text-success"},
                {tipo:'drop', drop_onclick}
            ]});
            if(suma){sum_tot = operar("+",sum_tot,total,2);}
        });
        table += `</tbody>
                </table>
            </div>
        </div>`;
        if(suma){
            table += `<div class="px-md-4 w-100">
                <div class="bg-success centrar-xy montserrat-m rounded-bottom shadow w-100">
                    <div class="f-size-80 align-items-center row m-0 justify-content-around py-2 rounded-bottom w-100 bg-success" style="max-width: 400px;">
                        <span class="col-4 px-0 text-white text-center" style="padding-top: 3px;">TOTAL :</span>
                        <span class="col-6 badge-pill pb-1 px-3 bg-white text-success text-center" style="padding-top: 6px;">S/. <span>`+sum_tot.toFixed(2)+`</span></span>
                    </div>
                </div>
            </div>`;
        }
        return table;
    }


    function funcion_final_generica(elem,clase,url,tipo,callback){
        carga_btn({elem, tipo:'on'});
        let aux_param = get_inputs_class(clase);
        let parametros = {tipo};
        parametros = {...parametros, ...aux_param};
        post_generico({url, parametros, obj_cb: {elem, clase}, callback});
    }
    function post_generico(obj){
        return new Promise((resolve,reject)=>{
            var {url, parametros={}, obj_cb={}, retorno=undefined, res_swal=undefined, error=false, callback=(a,b)=>{}} = obj;
            $.post(url, parametros, function(res,status) {
                console.log(status);
                console.log(res);
                if(status=="success"){
                    if(res.msg=="Ok"){
                        let ret_cb = "";
                        ret_cb = callback(res,obj_cb);
                        if(res_swal){ resolve(Swal.fire(res_swal)); }
                        else if(retorno){ resolve(retorno); }
                        else{ resolve(ret_cb); }
                    }else{
                        if(res.code){
                            if(error){let ret_cb = callback(res,obj_cb); resolve(ret_cb);}
                            else{resolve(Swal.fire(res.code, '', 'error'));}
                        }
                    }
                }else{
                    resolve(Swal.fire('ERROR: Intente denuevo', '', 'error'));
                }
            });
        });
    }

    function password_eye(elem,input){
        if($(input).attr("type")=="password"){
            $(elem).animate({opacity:0}, 150, function() {
                $(elem).html('<i class="bi bi-eye-fill"></i>');
                $(input).attr("type","text");
                $(elem).css("color","#dc3545");
                $(elem).animate({opacity:1}, 150);
            });
        }else{
            $(elem).animate({opacity:0}, 150, function() {
                $(elem).html('<i class="bi bi-eye-slash-fill"></i>');
                $(input).attr("type","password");
                $(elem).css("color","#6c757d");
                $(elem).animate({opacity:1}, 150);
            });
        }
        $(input).focus();
    }

// FUNCIONES DE PANTALLA
    function pantalla_Siguiente_consecutivo(idactual,iddiv,tipo){
        $(idactual).animate({opacity: "0"}, 200);
        $(iddiv).css({"z-index": "30", "display": "inline"});
        if(tipo=='L'){
            $(iddiv).animate({left: "0%"}, 250, function() {
                $(idactual).css({left: "100%", opacity: 1});
            });
        }else{
            $(iddiv).animate({right: "0%"}, 250, function() {
                $(idactual).css({right: "100%", opacity: 1});
            });
        }
    }
    function pantalla_Siguiente(idactual,iddiv,idvolver,tipo){
        $(idactual).animate({opacity: "0"}, 200);
        $(iddiv).css({"z-index": "30", "display": "inline"});
        if(tipo=='L'){
            $(iddiv).animate({left: "0%"}, 250);
        }else{
            $(iddiv).animate({right: "0%"}, 250);
        }
        $(iddiv).queue(function() {
            $(idvolver).animate({opacity: 1}, 250);
            $(this).dequeue();
        });
    }
    function pantalla_Volver(iddiv,idactual,idvolver){
        $(idvolver).animate({opacity: 0}, 150);
        $(idactual).animate({"left": "100%"}, 250, function() {
            $(idactual).css( "display","none" );
            $(iddiv).animate({opacity: 1}, 150);
        });
    }

// OPERACIONES CON FECHAS Y HORAS
    function fecha_hoy(){
        let f = new Date();
        var fmes=(f.getMonth()+1).toString();
        if(f.getMonth()+1<10){fmes="0"+fmes;}
        var fdia=f.getDate().toString();
        if(f.getDate()<10){fdia="0"+fdia;}
        let fecha_hoy = f.getFullYear()+"-"+fmes+"-"+fdia;
        return fecha_hoy;
    }
    function hora_actual(){
        var t = new Date();
        var hora=t.getHours().toString();
        var min=t.getMinutes().toString();
        var sec=t.getSeconds().toString();

        if(t.getHours()<10){hora="0"+hora;}
        if(t.getMinutes()<10){min="0"+min;}
        if(t.getSeconds()<10){sec="0"+sec;}
        let hora_actual = hora+":"+min+":"+sec;
        return hora_actual;
    }

    function restar_fechas_hoy(fecha){
        let fecha1 = new Date(fecha);
        let fecha_Hoy = fecha_hoy();
        let fecha2 = new Date(fecha_Hoy);
        let resta = fecha1.getTime()-fecha2.getTime();
        resta = Math.round(resta/(1000*60*60*24));
        return resta;
    }
    
    function formato_12horas(hora, tipo = "LOCAL"){
        if(tipo == "LOCAL"){
            var d = new Date(hora);
        }else if(tipo == "UTC"){
            var d = new Date(hora + 'Z');
        }
        var h = d.getHours();
        var m = d.getMinutes();
        var a = "a.m.";
        if(h>=12){
            a = "p.m.";
            if(h>12){
                h = h-12;
            }
        }
        if(m<10){
            m="0"+m;
        }
        hora=h+":"+m+" "+a;
        return hora;
    }

// FUNCIONES CON STRING
    function escapar_comillas(texto){
        texto=texto.replace(/'/g, '&apos;');
        texto=texto.replace(/"/g, '&quot;');
        return texto;
    }

// FUNCIONES CON DECIMALES
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

    function dos_decimales(n) {
        let t=n.toString();
        let es_neg=false;
        if(t.includes('-')){
            es_neg=true;
            t=t.slice(1);
        }
        if(t.includes('.')){
            t=t+"00";
        }else{
            t=t+".00";
        }
        let regex=/(\d*.\d{0,2})/;
        t=t.match(regex)[0];
        if(es_neg){
            t="-"+t;
        }
        return parseFloat(t).toFixed(2);
    }

// FUNCIONES DE ANIMACIÓN Y CONTEXTO
    function sonido_whatsapp_notificacion(){
        let sonido = new Audio("/sonidos/whatsapp-notificacion.mp3");
        sonido.play();
    }
    function sonidoClick(){
        var sonido_Click = new Audio("/sonidos/click.mp3");
        sonido_Click.play();
    }
    function burbujita(event,elem) {
        var color = $(elem).attr("color");
        var x = event.clientX;
        var y = event.clientY;
        
        sonidoClick();
        if ( $("#burbujita").length ) {
            $("#burbujita").finish();
            $("#burbujita").remove();
        }
        $('#pantalla').append('<div class="position-absolute" style="border: 2px solid #0000; border-radius:100%;background-color:'+color+'70; width:0px; height:0px; opacity:1; z-index:99999; left: '+x+'px; top: '+y+'px" id="burbujita"></div>');
        $("#burbujita").animate({"width":"50px", "height":"50px", "left":x-25, "top":y-25, "opacity":"0"},400, function() {
            $("#burbujita").remove();
        });
    }

// FUNCIONES GENÉRICAS
    function getLocation(showPosition) {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }else{
            Swal.fire('Su navegador no soporta GPS', 'Por favor intente usando Google Chrome', 'error');
        }
        function showError(error) {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                Swal.fire('Permiso para GPS Denegado', 'Si no tenemos acceso a su ubicación no podrá usar muchos de los servicios que le ofrecemos', 'error');
                break;
              case error.POSITION_UNAVAILABLE:
                Swal.fire('No se pudo acceder al GPS', 'Por favor asegúrese de tener encendido su GPS', 'error');
                break;
              case error.TIMEOUT:
                Swal.fire('Tiempo de espera excedido', 'Por favor revise su conexión a internet y vuelva a intentarlo', 'error');
                break;
              case error.UNKNOWN_ERROR:
                Swal.fire('Error Desconocido', 'Por favor vuelva a intentarlo', 'error');
                break;
            }
        }
    }

    function cambiar_valor_clave(datos, tipo="u"){
        let respuesta = Object.keys(datos).reduce((acumulador, keyAnterior) => {
            let nuevaKey = datos[keyAnterior]
            if(tipo == "u"){
                acumulador[nuevaKey] = keyAnterior;
            }else if(tipo == "v"){
                if (!acumulador.hasOwnProperty(nuevaKey)){acumulador[nuevaKey] = []}
                acumulador[nuevaKey].push(keyAnterior)
            }else if(tipo == "p"){
                let aux_key = keyAnterior;
                switch (keyAnterior) {
                    case 'yape': keyAnterior = "Yape"; break;
                    case 'plin': keyAnterior = "Plin"; break;
                    case 'bbva': keyAnterior = "BBVA"; break;
                    case 'bcp': keyAnterior = "BCP"; break;
                    case 'inter': keyAnterior = "Interbank"; break;
                    case 'bn': keyAnterior = "Banco de la Nación"; break;
                }
                acumulador[nuevaKey+"|"+aux_key] = keyAnterior;
            }
            return acumulador
        }, {})
        return respuesta;
    }

    function carga_btn(obj){
        var {elem, tipo, svg='', children='div', color='warning', m='ml-2', preloader='<div class="preloader '+m+' border-top-'+color+'"></div>'} = obj;
        let svg_div = $(elem).children(children).last();
        if(tipo == "on"){
            svg_div.html(preloader);
        }else{
            svg_div.html(svg);
        }
    }

    function resaltar_div_shadow(id,tipo="success"){
        if(tipo=="success"){
            var shadow="shadow-success";
            var shadow_blur="shadow-success-blur";
        }else if(tipo=="warning"){
            var shadow="shadow-warning";
            var shadow_blur="shadow-warning-blur";
        }else if(tipo=="danger"){
            var shadow="shadow-danger";
            var shadow_blur="shadow-danger-blur";
        }
        $(id).removeClass(shadow_blur);
        $(id).addClass(shadow);
        setTimeout(function(){
            $(id).removeClass(shadow);
            $(id).addClass(shadow_blur);
        }, 1250);
    }
    function pintar_div_shadow(est,obj={}){
        var {tipo="success", id=false, elem=undefined, seccion="tr"} = obj;
        if(tipo=="success"){
            var shadow="#28a74566";
        }else if(tipo=="warning"){
            var shadow="#ffc10766";
        }else if(tipo=="danger"){
            var shadow="#dc354566";
        }
        if(id){
            id = $(id);
        }else if(elem){
            id = $(elem).closest(seccion);
        }
        if(est=="on"){id.animate({"background-color":shadow},200);}
        else{ id.animate({"background-color":""},200); }
    }
    
    async function ir_pos_tabla_bi(obj){
        var {tb, div, class_flecha=".flecha", prefijo_tb="#tb-", prefijo_tr="#tr-", sufijo_tr="-tr", pixeles=61, tiempo=1750, callback=(a,b)=>{}, obj2={}} = obj;
        var th = $(prefijo_tb+tb).prev();
        var tabla = $(th).closest('table');
        let flecha = $(th).find(class_flecha).eq(0);
        let estado = parseInt(flecha.attr('estado'));
        if(!estado){await callback(th,obj2);}
        $(prefijo_tb+tb+sufijo_tr).queue(function() {
            $(tabla).finish();
            var lugar=$(tabla).scrollTop();
            var lugarx=$(tabla).offset().top;
            $(tabla).animate({
                scrollTop: $(prefijo_tr+div).offset().top+lugar-lugarx-pixeles
            }, 1000);
            $(this).dequeue();
        });
        resaltar_div_shadow(prefijo_tr+div);
    }

    function add_thead_plegable(obj){
        var {tabla, tb, colspan, contenido, prefijo_tb='tb-', sufijo_tr='-tr', class_flecha='flecha', color_flecha_off='text-white', onclick="thead_plegable(this,{tb:'"+tb+"'});"} = obj;
        $(tabla).append(`
            <thead class="thead-dark small montserrat-r cursor-pointer" onclick="`+onclick+`">
                <tr>
                    <th colspan="`+colspan+`" class="w-100">
                        <div class="centrar-xy">
                            <div class="centrar-xy `+class_flecha+`" estado="0">
                                <i class="bi bi-caret-down-fill `+color_flecha_off+`"></i>
                            </div>
                            <div class="centrar-xy">
                                `+contenido+`
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody class="position-relative" id="`+prefijo_tb+tb+`" style="display: none;">
                    <tr class="position-absolute w-100 small montserrat-m" style="height: 0px; background-color: rgb(238, 238, 238); z-index: 1; display: table-row; opacity: 1;" id="`+prefijo_tb+tb+sufijo_tr+`"></tr>
            </tbody>`);
    }
    function thead_plegable(elem,obj){
        var {tb, prefijo_tb='#tb-', sufijo_tr='-tr', class_flecha='.flecha', color_flecha_on='text-success', color_flecha_off='text-white'} = obj;
        $(document).find("tbody tr").finish();
        let flecha = $(elem).find(class_flecha).eq(0);
        let estado = parseInt(flecha.attr('estado'));
        if(!estado){
            $(flecha).attr("estado","1");
            $(flecha).fadeOut('fast', function() {
                $(flecha).html('<i class="bi bi-caret-up-fill '+color_flecha_on+'"></i>');
                $(flecha).fadeIn('fast');
            });
            $(prefijo_tb+tb).css({"display": "table-row-group"});
            var alto = $(prefijo_tb+tb).outerHeight(true);
            $(prefijo_tb+tb).children().css({"display": "none"});
            $(prefijo_tb+tb+sufijo_tr).css({"display": "table-row"});
            $(prefijo_tb+tb+sufijo_tr).animate({height: alto},300, function() {
                $(prefijo_tb+tb).children().css({"display": "table-row"});
                $(prefijo_tb+tb+sufijo_tr).animate({opacity: 0},200, function() {
                    $(prefijo_tb+tb+sufijo_tr).css({"z-index": "-1"});
                });
            });
        }else{
            $(flecha).attr("estado","0");
            $(flecha).fadeOut('fast', function() {
                $(flecha).html('<i class="bi bi-caret-down-fill '+color_flecha_off+'"></i>');
                $(flecha).fadeIn('fast');
            });
            $(prefijo_tb+tb+sufijo_tr).css({"z-index": "1"});
            $(prefijo_tb+tb+sufijo_tr).animate({opacity: 1},200, function() {
                $(prefijo_tb+tb).children().css({"display": "none"});
                $(prefijo_tb+tb+sufijo_tr).css({"display": "table-row"});
                $(prefijo_tb+tb+sufijo_tr).animate({height: "0px"},300, function() {
                    $(prefijo_tb+tb).css({"display": "none"});
                    $(prefijo_tb+tb).children().css({"display": "table-row"});
                });
            });
        }
    }
    function add_tr(obj){
        var {tb, prefijo_tb='#tb-', attr_tr=undefined, id_tr=undefined, class_tr='montserrat-m', parametros, append=true} = obj;
        var contenido = '<tr class="'+class_tr+'"';
        if(id_tr){contenido += ' id="'+id_tr+'"';}
        if(attr_tr){contenido += ' '+attr_tr;}
        contenido += '>';
        var anterior="";
        $.each(parametros, function(i,val){
            var {class_td="position-relative", descripcion="",
            tipo='na', a_link="", a_target=true,
            scroll_style="", scroll_id=undefined, scroll_class="", scroll_class_td="px-0 w-100 scroll-cell",
            i_mm_d_obj_cuentas="", i_mm_d_obj_mmcuentas="", i_mm_d_oninput="numero_decimal(this); max_min_cuentas(this,"+i_mm_d_obj_mmcuentas+"); cuentas(this,"+i_mm_d_obj_cuentas+");", i_mm_d_oninput2="",i_mm_d_onblur="numero_decimal(this); numero_decimal_vacio(this); max_min_cuentas(this,"+i_mm_d_obj_mmcuentas+"); cuentas(this,"+i_mm_d_obj_cuentas+");", i_mm_d_onblur2="", i_mm_d_onclick_obj="", i_mm_d_onclicku="input_mas_menos('+',this"+i_mm_d_onclick_obj+"); cuentas(this,"+i_mm_d_obj_cuentas+");", i_mm_d_onclickd="input_mas_menos('-',this"+i_mm_d_onclick_obj+"); cuentas(this,"+i_mm_d_obj_cuentas+");", i_mm_d_onclick2="", i_mm_d_class="", i_mm_d_tipo="f", i_mm_d_nombre="", i_mm_d_value="", i_mm_d_max="", i_mm_d_min="", i_mm_d_btnm=false,
            nowrap_style="", nowrap_class="text-nowrap", nowrap_add_class="",
            drop_onclick=""
            } = val;
            if(val.tipo != 'scroll'){class_td += " align-middle"}
            if(val.tipo == 'scroll'){contenido += '<td style="overflow-x:overlay;" class="'+class_td+' '+scroll_class_td+'">';}
            else{contenido += '<td class="'+class_td+'">';}
            if(anterior == 'scroll'){contenido += '<div class="position-absolute h-100" style="left: -20px;top: 0;background: linear-gradient(to right, #ffffff00, #00000050);width: 20px;"></div>';}
            switch (tipo) {
                case 'a':
                    contenido += '<a href="'+a_link+'"';
                    if(a_target){ contenido += 'target="_blank"';}
                    contenido += '>'+descripcion+'</a>';
                    break;
                case 'scroll':
                    contenido += '<div class="position-absolute text-nowrap pl-1 pr-2 '+scroll_class+'" style="'+scroll_style+'"';
                    if(scroll_id){contenido += 'id="'+scroll_id+'"';}
                    contenido += '>'+descripcion+'</div>';
                    break;
                case 'input-mas_menos-decimal':
                    if(i_mm_d_btnm){i_mm_d_btnm='style="pointer-events: none;" disabled="disabled"'}else{i_mm_d_btnm=''}
                    contenido += `
                        <div class="centrar-xy">
                            <div class="centrar-xy pr-1 cursor-pointer text-secondary" onclick="`+i_mm_d_onclickd+i_mm_d_onclick2+`" style="pointer-events: none;" disabled="disabled">
                                <i class="bi bi-dash-circle-fill"></i>
                            </div>
                            <input type="tel" max="`+i_mm_d_max+`" min="`+i_mm_d_min+`" tipo="`+i_mm_d_tipo+`" nombre="`+i_mm_d_nombre+`" largo="7" placeholder="0" value="`+i_mm_d_value+`" autocomplete="off" class="`+i_mm_d_class+` form-control form-control-sm poppins-r border-0 text-center badge-pill h-auto shadow-success-focus py-0 px-0" style="background: #dee2e6; width: 25px;" oninput="`+i_mm_d_oninput+i_mm_d_oninput2+`" onblur="`+i_mm_d_onblur+i_mm_d_onblur2+`">
                            <div class="centrar-xy pl-1 cursor-pointer text-success" onclick="`+i_mm_d_onclicku+i_mm_d_onclick2+`" `+i_mm_d_btnm+`>
                                <i class="bi bi-plus-circle-fill"></i>
                            </div>
                        </div>`;
                    break;
                case 'nowrap':
                    contenido += '<span class="'+nowrap_class+' '+nowrap_add_class+'" style="'+nowrap_style+'">'+descripcion+'</span>';
                    break;
                case 'drop':
                    contenido += '<div class="centrar-xy text-danger cursor-pointer" onclick="'+drop_onclick+'"><i class="bi bi-trash-fill"></i></div>';
                    break;
                default:
                    contenido += descripcion;
            }
            contenido += '</td>';
            anterior = tipo;
        });
        contenido += '</tr>';
        if(append){$(prefijo_tb+tb).append(contenido);}
        else{return contenido}
    }
    function input_mas_menos(s,elem,obj={}){
        var {prec=2, min=0.01, max=9999999} = obj;
        var input = $(elem).siblings('input').eq(0);
        var btn = $(elem).siblings('div').eq(0);
        if(input.attr('max')){max = parseFloat(input.attr('max'));}
        if(input.attr('min')){min = parseFloat(input.attr('min'));}
        var valor = 0;
        if(input.val().trim().length){ valor = parseFloat(input.val()); }
        if(s=="+"){
            if(operar(s,valor,1,prec) >= max){
                if(operar(s,valor,1,prec) > max){new_notif("imm_max","warning","El límite para este elemento es "+max);}
                des_habilitar(elem,"off");
                $(elem).removeClass("text-success"); $(elem).addClass("text-secondary");
                input.val(truncar(max,prec));
            }else{
                des_habilitar(elem,"on");
                $(elem).removeClass("text-secondary"); $(elem).addClass("text-success");
                input.val(operar(s,valor,1,prec));
            }
            if(parseFloat(input.val()) <= min){
                if(min){
                    new_notif("imm_min","warning","El mínimo para este elemento es "+min);
                    input.val(truncar(min,prec));
                }
                des_habilitar(btn,"off");
                $(btn).removeClass("text-danger"); $(btn).addClass("text-secondary");
            }else{
                des_habilitar(btn,"on");
                $(btn).removeClass("text-secondary"); $(btn).addClass("text-danger");
            }
        }else if(s=="-"){
            if(operar(s,valor,1,prec) <= min){
                if(min){ new_notif("imm_min","warning","El mínimo para este elemento es "+min); }
                des_habilitar(elem,"off");
                $(elem).removeClass("text-danger"); $(elem).addClass("text-secondary");
                input.val(truncar(min,prec));
            }else{
                des_habilitar(elem,"on");
                $(elem).removeClass("text-secondary"); $(elem).addClass("text-danger");
                input.val(operar(s,valor,1,prec));
            }
            if(parseFloat(input.val()) >= max){
                if(parseFloat(input.val()) > max){new_notif("imm_max","warning","El límite para este elemento es "+max);}
                des_habilitar(btn,"off");
                $(btn).removeClass("text-success"); $(btn).addClass("text-secondary");
                input.val(truncar(max,prec));
            }else{
                des_habilitar(btn,"on");
                $(btn).removeClass("text-secondary"); $(btn).addClass("text-success");
            }
        }
    }
    function cuentas(elem,obj={}){
        var {tipo="c*p", class_total=".cuenta_total", class_input=".input_cant", storage=false, prec=2, divisa="S/. ", sum_total=false, on_btn=false, tipo_btn="json"} = obj;

        var tr = $(elem).closest("tr");
        var total = tr.find(class_total).eq(0);
        var input = tr.find(class_input).eq(0);
        var cant=0, precio=0;

        if(input.val().trim().length){cant=parseFloat(input.val());}
        if(storage){
            var precios = sessionStorage.getItem(storage).split('_');
            if(cant >= 100){
                precio=parseFloat(precios[2]);
                if(!precio){
                    precio=parseFloat(precios[1]);
                    if(!precio){precio=parseFloat(precios[0]);}
                }
            }
            else if(cant >= 12){
                precio=parseFloat(precios[1]);
                if(!precio){precio=parseFloat(precios[0]);}
            }
            else{precio=parseFloat(precios[0]);}
        }

        if(tipo=="c*p"){ total.html(divisa+operar("*",cant,precio,prec).toFixed(prec)); }

        if(sum_total){ suma_total_cuentas(elem,sum_total); }
        if(on_btn){ validar_Form_class(class_input,on_btn,tipo_btn); }
    }
    function suma_total_cuentas(elem,id,obj={}){
        var {class_total=".cuenta_total", prec=2} = obj;
        var tabla = $(elem).closest("table");
        suma = 0;
        tabla.find(class_total).each(function() {
            let cant = parseFloat($(this).html().split(' ')[1]);
            suma = operar("+",suma,cant,prec)
        });
        $(id).html(suma.toFixed(2));
    }
    function max_min_cuentas(elem,obj){
        var {prec=2, min=0.01, max=9999999} = obj;
        var btnd = $(elem).siblings('div').eq(0);
        var btnu = $(elem).siblings('div').eq(1);
        var cant = 0;
        if($(elem).val().trim().length){ cant = parseFloat($(elem).val()); }
        if(cant >= max){
            if(cant > max){new_notif("imm_max","warning","El límite para este elemento es "+max);}
            des_habilitar(btnu,"off");
            $(btnu).removeClass("text-success"); $(btnu).addClass("text-secondary");
            $(elem).val(truncar(max,prec));
        }else{
            des_habilitar(btnu,"on");
            $(btnu).removeClass("text-secondary"); $(btnu).addClass("text-success");
        }
        if(cant <= min){
            if(min){
                new_notif("imm_min","warning","El mínimo para este elemento es "+min);
                $(elem).val(truncar(min,prec));
            }
            des_habilitar(btnd,"off");
            $(btnd).removeClass("text-danger"); $(btnd).addClass("text-secondary");
        }else{
            des_habilitar(btnd,"on");
            $(btnd).removeClass("text-secondary"); $(btnd).addClass("text-danger");
        }
    }
    function drop_cuenta(elem,obj){
        var {tipo="eliminar", class_input=".input_cant"} = obj;
        var tr = $(elem).closest("tr");
        if(tipo=="eliminar"){
            tr.remove();
        }else if(tipo=="limpiar"){
            var input = tr.find(class_input).eq(0);
            input.val("");
            input.trigger('input');
        }
    }

    function ordenar_bidimensional(array,llave='nombre'){
        array=array.sort(function (a, b) {
            if (a[llave] > b[llave]) {
                return 1;
            }
            if (a[llave] < b[llave]) {
                return -1;
            }
            return 0;
        });
        return array;
    }

    function des_habilitar(elem,tipo){
        if(tipo=="off"){
            $(elem).css({"pointer-events": "none", opacity: 0.6});
            $(elem).attr('disabled','disabled');
        }else{
            $(elem).css({"pointer-events": "auto", opacity: 1});
            $(elem).removeAttr('disabled');
        }
    }

    function generatePasswordRand(length,type) {
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
        return pass;
    }

    function tool_tip(){
        $('[data-toggle="mensaje"]').hover(
            function() {
                $(this).css({"position": "relative"});
                let titulo=$(this).attr('title');
                let id=$(this).attr('id');
                let dir=$(this).attr('direccion');
                if(!$("#tool_tip"+id).length){
                    if(dir=="abajo"){
                        $(this).append('<div class="bg-white text-nowrap border montserrat-b position-absolute px-3 py-2 rounded shadow small text-dark" style="top: 35px; left: 0; z-index: 1; display: none;" id="tool_tip'+id+'">'+titulo+'</div>');
                    }else{
                        $(this).append('<div class="bg-white text-nowrap border montserrat-b position-absolute px-3 py-2 rounded shadow small text-dark" style="top: -35px; left: 0; z-index: 1; display: none;" id="tool_tip'+id+'">'+titulo+'</div>');
                    }
                }
                $(this).children("div").last().fadeIn(200);
            }, function() {
                $(this).children("div").last().fadeOut(200, function() {
                    $(this).remove();
                });
            }
        );
    }

    function agregar_paises_select(paises_json){
        $.each(paises_json, function (i, val) {
            $('.select_paises_cod').append('<option value="'+val.iso2+'">'+val.nombre+'</option>')
        });
        $(".select_paises_cod option[value='PE']").attr("selected", true);
        $(".select_paises_cod").trigger('change');
    }

    function popo_ver(){
        $('[data-toggle="popover"]').popover();
    }

    function get_parametros_url(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function carga_global(tipo){
        if(tipo == 'on'){
            if(!$('#div-carga_global').length){
                $('#pantalla').append(`
                    <div class="centrar-xy position-absolute vh-100 vw-100" style="background-color: #0007; top: 0; z-index: 99999999;" id="div-carga_global">
                        <div class="border-top-success h1 op-8 preloader"></div>
                    </div>
                `);
            }
        }else{
            $('#div-carga_global').remove();
        }
    }