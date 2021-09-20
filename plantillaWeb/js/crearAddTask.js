function crearAddTask($listaServers){
    //parametros:
    // key: xsd:string (key estandar para todos)
    // ScriptID: xsd:string 
    // ServerKey: xsd:string (key que pinta la tabla)
    // Type: xsd:string (es un 2 fijo)
    // ExecutionTime: xsd:string (fecha actual, deberia poder elegirse)
    // Parameters: xsd:string (textarea)
    // PostScript: xsd:integer
    // Requester: xsd:string (usuario de la sesion)

    $scriptID=$("#selectGS").val();
    $postScriptID=$("#selectGPS").val();
    $parameters=$("#textAreaParameters").val().trim();
    $fechaActual=fechaActual();

    // console.log($listaServers);
    // console.log("postScriptID: "+$postScriptID);
    // console.log("scriptID: "+$scriptID);
    // console.log("ExecutionTime: "+$fechaActual);
    if($scriptID==36){
        $accionUsuario=$("#selectAccionesScript36").val();
        if($accionUsuario=="Crear usuario"){
            // Crear Usuario:
            //   Ayuda: Crea usuario según las opciones *A completar los detalles
            //   Campos habilitados: [Usuario] [UID] [Grupo]* [Descripcion] [Home] [Shell] [Password] [Forzar Cambio de password al siguiente acceso]
            //   Parámetros Internos: (si alguno de los campos está vacio o no checkeado se omite el parámetro o se usa su valor por defecto)
            //   [Usuario]    Vacio (Necesario)
            //   [UID]        Vacio (Opcional])
            //   [Grupo]      En modo desplegable (Necesario)
            //   [Descripcion]    Vacio *en el futuro buscaríamos la opción de autorellenar este campo (Opcional)
            //   [Home]       Vacio (Opcional)
            //   [Shell]      Por defecto: /usr/bin/bash (Opcional)
            //   [Password]   Por defecto Ch@ng3m3 (Opcional)
            //   [Forzar Cambio de password al siguiente acceso] Por defecto sin checkear (Opcional)
            //   Comando estrictamente en esta secuencia:
            //   [usuario] –u [UID] –g [Grupo] –c [Descripcion] –h [Home] –s [Shell] (–fc “sólo si [Forzar Cambio de password al siguiente acceso] checkeado”) –p [Password]
            // alert("en proceso de mejora");
            $OS=$("#selectOS").val();
            if($OS!="Linux"){
                alert("Script disponible sólo para Linux");
            }else{
                $usuario=$("#casillaScriptNum #Usuario").val().trim();
                $grupo=$("#casillaScriptNum #listaGrupos").val().trim();
                if($usuario!="" && $grupo!=""){
                    $parametro=$usuario;
                    $UID=$("#casillaScriptNum #UID").val().trim();
                    $descripcion=$("#casillaScriptNum #Descripcion").val().trim();
                    $home=$("#casillaScriptNum #Home").val().trim();
                    $shell=$("#casillaScriptNum #Shell").val().trim();
                    $password=$("#casillaScriptNum #Password").val().trim();

                    $("#botonCrearTarea").prop("disabled", true);
                    $("#casillaScriptNum #Password").prop("disabled", true);
                    
                    if($UID!=""){
                        $parametro=$parametro.concat(" -u "+$UID);
                    }                        
                    $parametro=$parametro.concat(" -g "+$grupo);
                    // para la creacion de grupos -g es para los existentes y -G crea si no existe
                    if($descripcion!=""){
                        $parametro=$parametro.concat(" -c "+$descripcion);
                    }                
                    if($home!=""){
                        $parametro=$parametro.concat(" -h "+$home);
                    }                       
                    if($shell!=""){
                        $parametro=$parametro.concat(" -s "+$shell);
                    }else $parametro=$parametro.concat(" -s /bin/bash");

                    if($('#changePass').is(':checked')) {
                        $parametro=$parametro.concat(" -fc");
                    }
                    if($password!=""){
                        $parametro=$parametro.concat(" -p "+$password);
                    }else $parametro=$parametro.concat(" -p Ch@ng3m3");

                    // alert($parametro);
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    // "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                }else{
                    alert("faltan campos necesarios");
                }
            }
        }
        if($accionUsuario=="Borrar usuario"){
            //   ---> Borrar Usuario:
            //   Ayuda: Borrar Usuario
            //   Campos habilitados: [Usuario]  [Borrar home de usuario]
            //   Parámetros Internos: (si alguno de los campos está vacio o no checkeado se omite el parámetro o se usa su valor por defecto)
            //   [Usuario]           Vacio (Necesario)
            //   [Borrar home de usuario]           Por defecto sin checkear
            //   Comando:
            //   [Usuario] –r                     Si [Borrar home de usuario] unchecked
            //   [Usuario] –R                    Si [Borrar home de usuario] checked
            $OS=$("#selectOS").val();
            if($OS!="Linux"){
                alert("Script disponible sólo para Linux");
            }else{
                $usuario=$("#casillaScriptNum #Usuario").val().trim();
                if($usuario!=""){
                    if($('#deletePass').is(':checked')){
                        $usuario=$usuario.concat(" -R");
                        // console.log($usuario);
                        // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                        // "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                        lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                        "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                    }else {
                        $usuario=$usuario.concat(" -r");
                        // console.log($usuario);
                        // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                        // "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                        lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                        "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                    }
                }else alert("introducir usuario");
            }
        }
        if($accionUsuario=="Reseteos/Activacion"){
            //   ---> Reseteos password / Activacion de cuenta:
            //   Ayuda: los reset de password también activan las cuentas en caso de estar desactivadas
            //   Campos habilitados: [Usuario] [Password] [Forzar Cambio de password al siguiente acceso]
            //   Parámetros Internos: (si alguno de los campos está vacio o no checkeado se omite el parámetro o se usa su valor por defecto)
            //   [Usuario]           Vacio (Necesario)
            //   [Password]        Por defecto Ch@ng3m3 (Opcional)
            //   [Forzar Cambio de password al siguiente acceso] Por defecto unchecked
            //   Comando estrictamente esta secuencia:
            //   [Usuario] –pc [Password]         Si [Forzar Cambio de password al siguiente acceso] unchecked
            //   [Usuario] –fc –pc [Password]     Si [Forzar Cambio de password al siguiente acceso] checked
            $OS=$("#selectOS").val();
            if($OS!="Linux"){
                alert("Script disponible sólo para Linux");
            }else{
                $usuario=$("#casillaScriptNum #Usuario").val().trim();
                $password=$("#casillaScriptNum #Password").val().trim();
                $correoPass=$("#casillaScriptNum #CorreoPass").val().trim();
                if($usuario!="" && $password!="" && $correoPass!=""){
                    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

                    if (caract.test($correoPass) == true){ 
                        if($('#changePass').is(':checked')){
                            // if($password!=""){
                                $usuario=window.btoa($usuario.concat(" -fc -pc "+$password+""));
                                // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                                // "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                                lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                                "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                            // }else{
                                // $usuario=$usuario.concat(" -fc -pc Ch@ng3m3");
                                // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                                // "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                                // aplicarSpinnerTablaFooter();
                            // }
                        }else {
                            // if($password!=""){
                                $usuario=window.btoa($usuario.concat(" -pc "+$password+""));
                                // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                                // "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                                lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                                "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                            // }else{
                                // $usuario=$usuario.concat(" -pc Ch@ng3m3");
                                // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                                // "parameters":$usuario,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                                // aplicarSpinnerTablaFooter();
                            // }
                        }
                    }else alert("correo incorrecto");
                }else alert("introducir todos los campos");
            }
        }
    }else if($scriptID==79){
        // # Instalation for THYSSENKRUPP showing final configuration file parameters:

    // zabbix_installer.sh -i -sp Server=10.125.15.78,10.9.62.78,127.0.0.1+ServerActive=10.125.15.78,10.9.62.78,127.0.0.1 -sap
    // siempre que sea thysen parametro entero

    // # Instalation for NETPLUS, ING, PCI showing final configuration file parameters:

    // zabbix_installer.sh -i -sp Server=10.45.12.20,127.0.0.1+ServerActive=10.45.12.20,127.0.0.1+EnableRemoteCommands=0 -sap
        


    // # Instalation for REPSOL MDP showing final configuration file parameters:

    // zabbix_installer.sh -i -sp Server=10.191.68.166,10.191.68.165,127.0.0.1+ServerActive=10.191.68.166,10.191.68.165,127.0.0.1+EnableRemoteCommands=0 -sap



    // # Instalation for TAP AIR PORTUGAL showing final configuration file parameters:

    // zabbix_installer.sh -i -sp Server=10.29.208.5,127.0.0.1+ServerActive=10.29.208.5,127.0.0.1+EnableRemoteCommands=0 -sap

    // menos el tyshen los demas aparecera un checkbox, si checkean pasamos el parametro entero, sino -i solo  

    // CHECKBOX - BURBUJA PCI - (OJO SOLO APLICA A ENTORNOS DE PROD DE ESTOS CLIENTES NETPLUS, ING, PCI, REPSOL MDP, TAP AIR PORTUGAL)

    $("#casillaScriptNum #burbujaPCI").css({"display":"none"});
    $("#casillaScriptNum #spanBurbujaPCI").css({"display":"none"});
    $clienteInstalacionZabbix=$("#cajaProcesos #selectCliente").val();
    $parametro="";
    
    if($('#casillaScriptNum #burbujaPCI').is(':checked')){
        if($clienteInstalacionZabbix=="NETPLUS" || $clienteInstalacionZabbix=="ING" || $clienteInstalacionZabbix=="PCI"){
            $parametro="-i -sp Server=10.45.12.20,127.0.0.1+ServerActive=10.45.12.20,127.0.0.1+EnableRemoteCommands=0";
        }
        if($clienteInstalacionZabbix=="REPSOL MDP"){
            $parametro="-i -sp Server=10.191.68.166,10.191.68.165,127.0.0.1+ServerActive=10.191.68.166,10.191.68.165,127.0.0.1+EnableRemoteCommands=0";
        }
        if($clienteInstalacionZabbix=="TAP AIR PORTUGAL"){
            $parametro="-i -sp Server=10.29.208.5,127.0.0.1+ServerActive=10.29.208.5,127.0.0.1+EnableRemoteCommands=0";
        }
    }else {
        if($clienteInstalacionZabbix=="THYSSENKRUPP"){
            $parametro="-i -sp Server=10.125.15.78,10.9.62.78,127.0.0.1+ServerActive=10.125.15.78,10.9.62.78,127.0.0.1"
        }else{
            $parametro="-i";
        }
    }

    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
    //     "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});

    }else if($scriptID==91){
        $accionUsuario=$("#selectAccionesScript91").val();
        if($accionUsuario=="Create"){
            // - Acción (Create)
            // - Username (“nombre usuario, Nombre completo, Descripción, Grupo)
            $OS=$("#selectOS").val();
            if($OS!="Windows"){
                alert("Script disponible sólo para windows");
            }else{
                $nombreUsuario=$("#casillaScriptNum #nombreUsuario").val().trim();
                $nombreCompleto=$("#casillaScriptNum #nombreCompleto").val().trim();
                $descripcion=$("#casillaScriptNum #descripcion").val().trim();
                $grupo=$("#casillaScriptNum #grupo").val().trim();
                if($nombreUsuario=="" || $nombreCompleto=="" || $descripcion=="" || $grupo==""){
                    alert("faltan campos por rellenar");
                }else{
                    $nombreUsuario=sustituirEspacios($nombreUsuario,"+")
                    $nombreCompleto=sustituirEspacios($nombreCompleto,"+")
                    $descripcion=sustituirEspacios($descripcion,"+")
                    $grupo=sustituirEspacios($grupo,"+")
                    $username=$nombreUsuario+" "+$nombreCompleto+" "+$descripcion+" "+$grupo;
                    $parametro=$accionUsuario.concat(' '+$username);
                    // alert($parametro);
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    // "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                }
            }
        }else if($accionUsuario=="Reset"){
            $OS=$("#selectOS").val();
            if($OS!="Windows"){
                alert("Script disponible sólo para windows");
            }else{
                $("#botonCrearTarea").prop("disabled", true);
                $("#casillaScriptNum #Contrasena").prop("disabled", true);

                $Usuario=$("#casillaScriptNum #Usuario").val().trim();
                $Passw=$("#casillaScriptNum #Contrasena").val().trim();
                $CorreoPass=$("#casillaScriptNum #CorreoPass").val().trim();
                if($Usuario=="" || $Passw=="" || $CorreoPass=="" ){
                    alert("Introducir todos los campos");
                }else{
                    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

                    if (caract.test($CorreoPass) == true){ 
                            // - formato: [Accion] [usuario]
                            $parametro=$accionUsuario+" "+$Usuario+" "+window.btoa($Passw);
                            // alert($parametro);
                            // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                            // "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                            aplicarSpinnerTablaFooter();
                            lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                            "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                    }else alert("correo incorrecto");
                }
            }
        }else{
            $OS=$("#selectOS").val();
            if($OS!="Windows"){
                alert("Script disponible sólo para windows");
            }else{
                $Usuario=$("#casillaScriptNum #Usuario").val().trim();
                if($Usuario==""){
                    alert("Introducir usuario");
                }else{
                    // - formato: [Accion] [usuario]
                    $parametro=$accionUsuario+" "+$Usuario;
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    // "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                    
                }
            }
        }
    }else if($scriptID==93){
        $accionUsuario=$("#selectAccionesScript93").val();
        $OS=$("#selectOS").val();
        $Usuario=$("#casillaScriptNum #Usuario").val().trim();
        $Correo=$("#casillaScriptNum #correoUsuario").val().trim();

        if($OS=="Windows"){
            if($accionUsuario==0){
                alert("Seleccionar opción");
            }else if($accionUsuario=="Reset"){
                
                $parametro=$Usuario+" "+$Correo;
                if($Usuario=="" || $Correo==""){
                    alert("Rellenar todos los campos");
                }else{
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    //     "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
                }
            }else if($accionUsuario=="Create"){
                if($listaServers.length==1){
                    if($("input[name='plantillaCSVscript93']:eq(0)").val() && $("#buttonCSVscript93").hasClass("clickado")==true){
                        // alert("se manda alta");
                        $listaServers[0].key="00_50_56_b1_2b_3d"; //modifico la key porque tiene que ser unica en este caso, la de la maquina se pasa por parameters
                        $URLserver=""+window.location+""; // si no pongo esto no funciona indexOf (fuerza que sea string)
                        if($URLserver.indexOf("10.29.44.163")!=-1) $parametro="TTIWPB01 "+$listaServers[0].name;
                        if($URLserver.indexOf("10.125.10.174")!=-1) $parametro="TTIWPA02 "+$listaServers[0].name;
                        // console.log($parametro);
                        // console.log($listaServers);
                        // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                        // "parameters":$parametro,"postScriptID":$postScriptID,"type":"1","scriptID":"135","ExecutionTime":$fechaActual},resultadoAddTask);
                        lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                        "parameters":$parametro,"postScriptID":$postScriptID,"type":"1","scriptID":"135","ExecutionTime":$fechaActual});

                    }else alert("Se debe subir plantilla para realizar el alta");
                }else alert("Máximo 1 servidor por tarea");
                
            }else if($accionUsuario=="Delete"){
                $parametro="Delete "+$Usuario;
                if($Usuario==""){
                    alert("Rellenar todos los campos");
                }else{
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    //     "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":"168","ExecutionTime":$fechaActual},resultadoAddTask);
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":"168","ExecutionTime":$fechaActual});
                }
            }else if($accionUsuario=="Enable"){
                $parametro="Enable "+$Usuario;
                if($Usuario==""){
                    alert("Rellenar todos los campos");
                }else{
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    //     "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":"168","ExecutionTime":$fechaActual},resultadoAddTask);
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":"168","ExecutionTime":$fechaActual});
                }
            }else if($accionUsuario=="Disable"){
                $parametro="Disable "+$Usuario;
                if($Usuario==""){
                    alert("Rellenar todos los campos");
                }else{
                    // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    //     "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":"168","ExecutionTime":$fechaActual},resultadoAddTask);
                    
                    lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                    "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":"168","ExecutionTime":$fechaActual});
                }
            }
        }else alert("Script sólo disponible para Windows");
    }else if($scriptID==114){
        // Parametros: Ruta opcion palbusc pal reemp
        $accionUsuario=$("#selectAccionesScript114").val();
        // necesito hacer dos comparaciones al compartir varios input el la misma accion
        $accionNombreUsuario=$("#selectAccionesScript114").text();
        $ruta=$("#casillaScriptNum #Ruta").val().trim();
        $palabraBusc=$("#casillaScriptNum #PalabraBusc").val().trim();
        $palabraReemp=$("#casillaScriptNum #PalabraReemp").val().trim();
        if($accionUsuario!="" && $ruta!="" && $palabraReemp!=""){
            $ruta=sustituirEspacios($ruta,"$_@");
            $palabraBusc=sustituirEspacios($palabraBusc,"$_@");
            $palabraReemp=sustituirEspacios($palabraReemp,"$_@");
            if($accionNombreUsuario=="Borrar una palabra" || $accionNombreUsuario=="Borrar todas las palabras" || $accionNombreUsuario=="Borrar líneas"){
                $parametro=$ruta.concat(' '+$accionUsuario+' '+$palabraBusc+' ""');
                // console.log($parametro);
                // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                // "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                
                lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
            }else{
                $parametro=$ruta.concat(' '+$accionUsuario+' '+$palabraBusc+' '+$palabraReemp);
                // console.log($parametro);
                // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                // "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
                lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
                "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
            }  
        }else alert("rellenar campos marcados con *");
        
    }else{
        // $.getJSON("consultasWebService.php",{"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
        // "parameters":$parameters,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual},resultadoAddTask);
        
        lanzarAddTask({"crearTarea":"crearTarea","listaServers":JSON.stringify($listaServers),
        "parameters":$parametro,"postScriptID":$postScriptID,"scriptID":$scriptID,"ExecutionTime":$fechaActual});
    }
}
