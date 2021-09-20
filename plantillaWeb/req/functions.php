<?php
 if(AUTH !== true) die; 

class Functions{
    public function sanear($string){
        $string=trim(htmlspecialchars(strip_tags($string)));
        return $string;
    }
}
$ObjFunction = new Functions;