<?php
if(AUTH !== true) die;

// estos define son para extensiones php
define('BASE','C:\wamp\www\plantillaWeb');
define('REQ', BASE.'/req/');
define('TPL', BASE.'/tpl/');
define('LOGIN', TPL.'/login/');

// estos define son para extensiones que no sean php
// define('ROOT', 'https://'.$_SERVER['SERVER_NAME'].'/tti/');
define('ROOT', 'http://localhost:8080/plantillaWeb/');
define('IMG',ROOT.'img/'); 													# Comprobar img clientes
define('CSS',ROOT.'css/'); 													# Comprobar css clientes
define('FRAMEWORK',ROOT.'framework/'); 										# Comprobar css frameworks
define('AJAX',ROOT.'ajax/');
define('JAVASCRIPT',ROOT.'js/');
