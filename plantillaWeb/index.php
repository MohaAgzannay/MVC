<?php
    session_start();
    ob_start();
    
    define('AUTH', true); //bloquear web desde aqui

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    require_once 'settings.php';
    require_once REQ.'functions.php';
    
    // compruebo si recibo posts para cargar mas adelante un frontal u otro
    if(isset($_POST["usuario"]) && isset($_POST["password"])){
        $usuario = $ObjFunction->sanear($_POST["usuario"]);
        $password = $ObjFunction->sanear($_POST["password"]);
        if($usuario=='root' && $password=='') $_SESSION['login']=true;
    }
    if(isset($_POST['logOut'])) unset($_SESSION["login"]);

    // ajusto hora y lenguaje
    date_default_timezone_set('Europe/Madrid');
    setlocale(LC_TIME, 'es_ES.UTF-8');

    // si hay sesion realizada cargo el index privado sino cargo el loguin
    if(isset($_SESSION['login'])){
        if($_SESSION["login"]==true){
            require_once TPL.'meta.php';
            require_once TPL.'header.php';
            if(isset($_GET['uri'])){
                require_once TPL.$_GET['uri'];
            }
            require_once TPL.'footer.php';
        }else{
            require_once TPL.'meta.php';
            require_once LOGIN.'login.php';
        }
    }else{
        require_once TPL.'meta.php';
        require_once LOGIN.'login.php';
    }
    ob_end_flush();
?>