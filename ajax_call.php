<?php

//echo '<br> from '.__DIR__ ; 
//echo '<br> from '.__FILE__  ; 

$keyw_exA = ['a', 'the', 'is','was','it','will','be','shall'];

file_put_contents(__DIR__.'/post.php', print_r($_POST, true) ); 

$resp=[]; 
try {
    if( !empty($_POST['data']) ) {

        $data = json_decode( urldecode($_POST['data']), true); 
        //$data = [ 'keyw'=>'general', 'n'=>'5' ];
        $api_sj = file_get_contents( __DIR__.'/jokes_api_task.json' );
        //echo '<br> api_sj='; print_r($api_sj);

        $api = json_decode($api_sj,true);
        //echo '<br> api='; print_r($api); 
        $api_type_sj = file_get_contents(__DIR__.'/jokes_type_map.json') ;
        $api_joke_sj = file_get_contents(__DIR__.'/jokes_joke_map.json');
        $api_punch_sj = file_get_contents(__DIR__.'/jokes_punch_map.json');

        $api = json_decode($api_sj,true);
        $api_type = json_decode($api_type_sj,true);
        $api_joke = json_decode($api_joke_sj,true);
        $api_punch = json_decode($api_punch_sj,true);

        $n = isset($data['n']) ? $data['n'] : 1;
        $keyw = !empty($data['keyw']) ? $data['keyw'] : null; 
        if( !is_integer($n) && !empty($n) ) { $n = intval($data['n']); }
        if( !is_integer($n) || (empty($n)) ) { $n = 1; }
        if($n > 20) { $n=20; }

        //echo '<br>xx  keyw='.$keyw;
        //echo '<br>xx n='.$n;

        //if user input longer string, search for a separate words too, but exlude articles and simple words set in $keyw_exA
        if( !empty($keyw) ) { 

            $keywA=[ 0=>$keyw ];
                foreach( [',', ' '] as $sep ) {
                    //echo '<br> sep='.$sep; 
                    $keywA1 = explode( $sep, $keyw ); 
                    //echo '<br> keywA1='; print_r($keywA1);
                    if( !empty($keywA1) ) {
                        foreach ($keywA1 as $k) {
                            if( !in_array($k, $keyw_exA ) && !in_array($k, $keywA ) ) {
                                //$keyw_exA = ['is','was','it','will','be','shall'];
                                $keywA[]=$k; 
                            } // if( !in_array($k, $keyw_exA ) 
                        } // foreach ($keywA1 as $k
                    } // if( !empty( $keywA1) 
                } // foreach( [',', ' '] as $sep 


            //echo '<br> keywA='; print_r($keywA); 

            $resp=[];
            $resp['data']=[];
            foreach( $keywA as $keyw ) { 
                //echo '<br> api_type['.$keyw.']='; print_r($api_type[$keyw]); 
                if( isset($api_type[$keyw]) ) {
                    $ans_type = $api_type[$keyw]; 
                    //echo '<br> asn_type='; print_r($ans_type); 
                    if( count($ans_type) >= $n ) {
                        foreach( $ans_type as $type=>$id ) {
                            if( ( count($resp['data']) )< $n ) {
                                $resp['data'][$id] = $api[$id]; 
                            } else { break; }
                        } // foreach($ans as $id
                    } // if( count($ans)>=$n 
                } // if( isset($api_type[$keyw]) 
                
                //echo '<br> 55__resp='; print_r($resp); 

                $ans_n = count($resp['data']); 
                if( $ans_n<$n) {

                    if( ($ans_n<$n) && isset( $api_joke[$keyw])) {
                        $ans_joke = $api_joke[$keyw];
                        //echo '<br> 69___keyw='.$keyw.'  ans_n='.$ans_n.'   n='.$n; 
                        if( ( count($resp['data']) )< $n ) {
                            foreach( $ans_type as $type=>$id ) {
                                if( ( count($resp['data']) )< $n ) {
                                    $resp['data'][$id] = $api[$id]; 
                                } else { break;}
                            }
                        } // if( (count($ans_joke) + $ans_n )>=$n 
                    } // if( ($ans_n<$n) && isset( $api_joke[$keyw])

                    $ans_n = count($resp['data']); 
                    //echo '<br> 71___keyw='.$keyw.'  ans_n='.$ans_n.'   n='.$n; 
                    //echo '<br> 71__resp='; print_r($resp); 
                    if( $ans_n<$n ) {
                        foreach( $api_joke as $joke=>$idA ) {

                            $pos = strpos($joke, $keyw);//returns false of position
                            //echo '<br> 69___pos='.$pos.'  is_integer?='.is_integer($pos).'  keyw='.$keyw.'  joke='.$joke.'  idA='; print_r($idA); 

                            if( is_integer( strpos($joke, $keyw) ) ) {
                                foreach($idA as $id) {
                                    if( ( count($resp['data']) )< $n ) {
                                        $resp['data'][$id] = $api[$id]; 
                                    } else { break; }
                                }
                            } // if( strpos($joke, $keyw

                        } // foreach( $api_joke as $joke
                        //echo '<br> 59__resp='; print_r($resp); 

                        if( count($resp) < $n ) {
                            foreach( $api_punch as $punch=>$idA ) {
                                if( is_integer(strpos($joke, $punch)) ) {
                                    foreach($idA as $id) {
                                        if( ( count($resp['data']) )< $n ) {
                                            $resp['data'][$id] = $api[$id]; 
                                        } else { break; }
                                    } // foreach($idA as $id
                                } // if( strpos($joke, $keyw
                            } // foreach( $api_punch as $punch=>$idA 
                        } // if( count($resp) < $n 

                    } // if($ans_n<$n

                } // if( ($ans_n<$n)
            } // foreach( $keywA as $keyw 
        }  //  if( !is_null($keyw) )
        else {
            //select randomk values from api
            $apiKA = array_keys($api); 
            $apiL = count($apiKA)-1;
            //echo '<br> apiL='.$apiL; 
            //for ( $i=0; $i<$n; $i++) { 
            $i=0; 
            while ($i<$n) {
               $ind = rand(0, $apiL) ;
               $id = $apiKA[$ind] ;     
               //echo '<br> ind='.$ind.'  id='.$id.'  i='.$i; 
               $resp['data'][$id] = $api[$id]; 
               $i=count($resp['data']);     
            } // for ( $i=0; $i<$n; $i++
        }

        //echo '<br> 86__resp='; print_r($resp); 

        //file_put_contents(__DIR__.'/resp.php', print_r($resp, true) ); 

        if (isset($_POST['cnfg']) ) {
             $resp['cnfg'] = json_decode($_POST['cnfg'],true); 
        } // if (isset($POST['cnfg']) 
    } // if( !empty($_POST['data']) )
} 
catch (Exception $e) {
// catch  {
    //$resp['cnfg']['error'=>'Caught exception: '. $e->getMessage().PHP_EOL];  
    $resp['cnfg']=['error'=>'There is an error. Could you please coontact adminstrator'];   
} 
finally {
    
    ob_start();
        $resp_js = json_encode($resp, true);   
        echo $resp_js;
        //include( $fvs ); 
    $buffer = ob_get_clean();
    echo $buffer;           

}



                  


