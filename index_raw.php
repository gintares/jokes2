<!DOCTYPE html><html lang='EN'><head><title> TODO supply a title VDD </title><meta charset="UTF-8" >
<meta name="viewport" content="width=device-width, initial-scale=1.0" >
<meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta http-equiv="Content-Security-Policy" content="default-src 'self' www.google-analytics.com; connect-src 'self' www.sandbox.paypal.com/xoplatform/logger/api/logger www.paypal.com/xoplatform/logger/api/logger api.sandbox.braintreegateway.com  client-analytics.sandbox.braintreegateway.com  *.braintree-api.com  www.google-analytics.com stats.g.doubleclick.net; object-src 'none';  script-src  'self' 'unsafe-inline' www.sandbox.paypal.com/tagmanager/pptm.js www.paypal.com/tagmanager/pptm.js www.paypal.com/sdk/js js.braintreegateway.com assets.braintreegateway.com www.paypalobjects.com platform.twitter.com/widgets.js  connect.facebook.net/en_US/sdk.js  apis.google.com/js/plusone.js www.googletagmanager.com/gtag/js  www.google-analytics.com/analytics.js; style-src 'self' 'unsafe-inline';  img-src 'self' assets.braintreegateway.com checkout.paypal.com data:;  child-src assets.braintreegateway.com c.paypal.com; frame-src www.sandbox.paypal.com/ assets.braintreegateway.com c.paypal.com *.cardinalcommerce.com; " />
<!-- <link id="mcss" rel="stylesheet" type="text/css" href="< ?php echo URL_PUBLIC_CSS_OAUTH . '/e3.css?' . date('l_jS_\of_F_Y_h_i_s_A') ;  ?>" / >  -->
    
 <!-- 
<link rel="stylesheet" type="text/css" href="css/raw/sizes.css" />
<link rel="stylesheet" type="text/css" href="css/raw/flex.css" /> -->
 <link rel="stylesheet" type="text/css" href="css/main/min.css" /> 


    </head><body>

<?php
    ini_set( 'display_errors', 'On' );   
    error_reporting( E_ALL | E_STRICT );   
    include __DIR__.'/init_api.php' ; 
    include __DIR__.'/init_run.php' ; 

/* init_api.php  initialises project api ($jg) from given apis using conf.yml
uncomment init_api.php output lines, to merge more apis
the folder 'jokes_GS' - must be writable
file_put_contents( __DIR__.'/jokes_api_task.json', json_encode($jg,true) );
$succ = file_put_contents( __DIR__.'/jokes_'.$ck.'_map.json', json_encode(${'jg_'.$ck.'_map'}, true) ); */
?>
    

    
    <!-- nav is missing -->
    
<div class="bd" > 
    
        <header>
    <h1> Jokes </h1>
    </header>
<aside class='cntm' id='cntm'> 
<!-- ' side-menu = contentmenu = cntm -->

    <h2> Search for number of jokes by the keyword </h2>
    <form>
        <div><input name='n' value=1 /><label>Number of jokes (if value is wrong or empty, a single joke is returned. No more than 20 jokes. ).</label></div>
        <div><input name='keyw' /><label>Keyword to seach for a joke ( if empty, a single or number of jokes is returned ).</label></div>
    </form>
    
    <h2> Search results </h2>
    <div id='jokes-summary' class='summ' ></div>
    
</aside>

<!-- <div class='back'><a href='#cntm'>&#8648; Up to the content</a></div> -->

<section id='content' class='content' >
    
    <div id='jokes-container' class='cont' ></div>

</section> <!--content -->
</div> <!-- bd -- -->
<div class='disp_none' id='cnfg'><?php echo json_encode($cnfg['js'],true) ?></div>
<footer></footer>
    
     <!--   <script type='text/javascript' src="/jokes_GS/js/main/main.js"></script> - -->
     <script type='text/javascript' src="js/fin/main.js"></script>
    <!-- <script type='text/javascript' ></script> -->
    
    </body></html>

