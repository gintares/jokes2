<?php


ini_set( 'display_errors', 'On' );   
error_reporting( E_ALL | E_STRICT ) ;   

require_once ( __DIR__.'/vendor/Spyc.php' ); 
$spycI = new Spyc(); 
$cnfg = $spycI->YAMLLoad(__DIR__.'/cnfg_api.yml' );
//echo '<br> cnfg=<pre> '; print_r($cnfg); 

$jg = []; //contains the merged API
$jg_keyA = $cnfg['jg_keyA'] ;// containes exercise api keys ['id', 'type', 'joke', 'punch'] ;

//to make search faster, i cash keys such as type
//to further improoove the spee,d all cashed strings shall be the same length, ie - padded with zeroes
$cash_keys = $cnfg['cash_keys']; //['type'];

if(isset($cnfg['api']) && count($cnfg['api'])>0 ) {
    foreach($cnfg['api'] as $ak=>$api_cnfg) {
        
        $api_pth  = $api_cnfg[ 'api_pth' ];  //__DIR__.'/index.json'; 
        $consts = [ '__DIR__' => __DIR__ ]; //[E_PARSE] => 4
        //echo '<br> consts='; print_r($consts); 
        foreach ( $consts as $ck=>$cv ) {
            if( (strpos($api_pth,$ck) >-1 ) ) {
                $api_pth = str_replace($ck,$cv,$api_pth); 
                // it means insert the correct value for __DIR__
            }
        } // for ( $consts as $ck=>$cv  */
        //echo '<br> api_pth='; print_r($api_pth ); 
        $api_sj = file_get_contents(  $api_pth );
        $api = json_decode( $api_sj, true ); 

         //final joke library keys
        $map = $api_cnfg['api_A_keyMap']; //[ 'joke'=>'setup', 'punch'=>'punchline' ]; //map to other PAIs, if PAI has different keys names

        //$jg = array_merge($api1_A, $api2_A, $api3_A);
        //set unique id for each joke, merge different APIs
        //foreach( [$api1_A, $api2_A, $api3_A ] as $i=>$api ) {
            if( !empty($api) ) {
                foreach ( $api as $ii=>$item ) {
                    
                    //echo '<br> map = api'.($i+1).'_A_keyMap = '; print_r($map); 
                    //echo '<br> item='; print_r($item); 
                    if( !empty($map) ) {
                        $idK = count($jg);
                        foreach ($jg_keyA as $k) {
                            if( isset($map[$k]) ) { 
                                $ok = $map[$k];
                                $jg[$idK][$k] = $item[$ok]; 
                            } // if( isset($map[]) 
                            else if ( isset($item[$k]) )  {
                                $jg[$idK][$k] = $item[$k]; 
                            } // else if ( isset($item[$k]) 
                            else {
                                 $jg[$idK][$k] = null; 
                            }
                        } // foreach ($jg_keyA as $k
                    } // if( !empty($map) 
                } // foreach ($api as $i=>$item
            } // if( !empty($api) 
        //} // foreach( [$api1_A, $api2_A, $api3_A ] as $k=>$v )

    

    } // foreach($cnfg['api'] as $ak=>$api)
} // if(isset($cnfg['api']) && count($cnfg['api']>0) )
        
//echo '<br> jg=<pre>'; print_r($jg); 
//merged different APIs are saves in this file 
file_put_contents( __DIR__.'/jokes_api_task.json', json_encode($jg,true) ); 


    //cash separetely types and jokes
    foreach ( $cash_keys as $ck ) { 
        //jg_type_map =...
        ${'jg_'.$ck.'_map'}=[]; //array to cash
    }
    //jg_type_map[$type] = [ id, id, id of certain type]; 
    //jg_type_map[$joke] = [ id, id, id of certain joke]; 
    foreach ($jg as $id=>$item) {
        foreach ( $cash_keys as $ck ) { 
            if(isset($item[$ck])) {
                $k=$item[$ck];
                if( !isset(${'jg_'.$ck.'_map'}[$k]) ) { ${'jg_'.$ck.'_map'}[$k]=[]; }
                ${'jg_'.$ck.'_map'}[$k][]=$id; 
                //jg_type_map['sun]=6; 
            } // if(isset($item[$ck] )
        } // foreach ( $cash_keys as $ck )
    } // foreach ( $cash_keys as $ck ) 
    foreach ($jg as $id=>$item) {
        foreach ( $cash_keys as $ck ) {  
           // echo '<br> ck='.$ck.'  map='; print_r( $jg_{$ck.'_map'} ); 
           $succ = file_put_contents( __DIR__.'/jokes_'.$ck.'_map.json', json_encode(${'jg_'.$ck.'_map'}, true) ); 
            //echo '<br> 189_ck='.$ck.' _succ='.$succ ; 
        } // foreach ( $cash_keys as $ck 
    }




