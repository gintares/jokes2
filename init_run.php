<?php


//ini_set( 'display_errors', 'On' );   
//error_reporting( E_ALL | E_STRICT ) ;   

require_once ( __DIR__.'/vendor/Spyc.php' ); 
$spycI = new Spyc(); 
$cnfg = $spycI->YAMLLoad(__DIR__.'/cnfg_js.yml' );
//echo '<br> cnfg=<pre> '; print_r($cnfg); 



