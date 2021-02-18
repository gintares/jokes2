window.onload = function() {
'use strict';
            
try { 
    //var currentURL= window.location.href        
    //var urlA = currentURL.split('/');  //http// gives empty additional value
    //urlA.pop(); //remove part correspondong to action
    //base_url = urlA.join('/');
    var BASE_PUBLIC_JS = 'js';
    var BASE_PUBLIC_CSS = 'css';
    //var BASE_PUBLIC_JS = '< ? php echo PROJSUFF . '/public/js'; ? >'; // '/ntr/public/js';
    //var BASE_PUBLIC_BKJS = BASE_PUBLIC_JS + '/jsBkFk'; 
    window.bloaded = false;
    var currentURL = document.URL ;

    //load javascripts deferred, and variables|templates hidden 
    var defLoaderNotW = function(gO) {

        // https://www.html5rocks.com/en/tutorials/speed/script-loading/
        // https://varvy.com/pagespeed/defer-loading-javascript.html
        var loadFNum, loadCnt, URL_PUBLIC_JS, BASE_OAUTH_JS, sDadd, sD;
        loadFNum={}; 

        if( (gO['URL_PUBLIC_JS']!==null) && (gO['URL_PUBLIC_JS']!==undefined) ) {
            URL_PUBLIC_JS = gO['URL_PUBLIC_JS'];
        } else { URL_PUBLIC_JS = 'js'; }

        //BASE_OAUTH_JS
        if( (gO['BASE_PUBLIC_JS']!==null) && (gO['BASE_PUBLIC_JS']!==undefined) ) {
            BASE_PUBLIC_JS = gO['BASE_PUBLIC_JS'];
        } else { BASE_PUBLIC_JS = 'js'; }

        if( (gO['sD']!==null) && (gO['sD']!==undefined) ) {
            sD = gO['sD'];
            console.log('givend sD='); console.log(sD); 
        } else { 
            sD = []; //default
        }

        //given
        if( (gO['sDadd']!==null) && (gO['sDadd']!==undefined) ) {
            sDadd = gO['sDadd'];
        } else { sDadd = []; } 
        if ( typeof(sDadd)==='array' && (sDadd.length >=1) ) { sD.concat(sDadd); }  

        function onLoadHandler() {
            var el = this;
            loadFNum.i --;

            console.log( 'loaded&appended loadFNum.i  ='+loadFNum.i +'   el.src='+ el.src )
            //Firefox - onload 
            unbindEvent(el, 'error', onErrorHandler);
            unbindEvent(el, 'load', onLoadHandler);
            if( loadFNum.i===0 ) { window.bloaded = true; }
            // console.log('loaded loadFNum.i  ='+loadFNum.i )
            // there's no event change for Safari,    
        } // function onLoadHandler () 

        //Firefox
        function onErrorHandler() { 
            var el = this;
            el.async = false;
            unbindEvent(el, 'error', onErrorHandler);
            unbindEvent(el, 'load', onLoadHandler);
        } // function onErrorHandler ()  

        //Firefox
        function bindEvent(ele, type, fn) {
            //console.log( ' bindEvent'  ); 
            if (ele.attachEvent) {
                ele.attachEvent && ele.attachEvent('on' + type, fn);
            } else {
                ele.addEventListener(type, fn, { capture: false, passive: true });
            }
        } // function bindEvent(ele, type, fn) 

        //Firefox
        function unbindEvent(ele, type, fn) {
            if (ele.detachEvent) {
                ele.detachEvent && ele.detachEvent('on' + type, fn);
            } else {
                ele.removeEventListener(type, fn, { capture: false, passive: true });
            }
        } // function unbindEvent(ele, type, fn) 

        function createEl(i) {
            return function(i) {
                var el = document.createElement("script");
                el.async = false;
                el.setAttribute('type', 'text/javascript'); 
                el = document.body.appendChild(el);

                el.src = sD[i];
                console.log('404___el='); console.log(el); 


                //Firefox - onload
                bindEvent( el, 'error', onErrorHandler );
                bindEvent( el, 'load', onLoadHandler );

                //IE 
                el.onreadystatechange = function() {
                    if ( el.readyState == 'loaded' ) {
                        // Our script has download, but hasn't executed.
                        // It won't execute until we do
                        script.async = false;
                        document.body.appendChild(el);
                        loadFNum.i --;
                        console.log( 'loaded loadFNum.i  ='+loadFNum.i +'onreadystatechange sD['+i+']='+ sD[i] );  
                    } // if ( el.readyState == 'loaded' )
                }; // el.onreadystatechange = function()
                console.log('assigning sD['+i+']='+ sD[i] );
            } // return function(i)
        } // function createEl(i)#

        console.log('sD='); console.log(sD);
        loadCnt = sD.length; 
        console.log( ' loadCnt=' ); console.log(loadCnt);  

        loadFNum.i = sD.length;    //number to count loads
        for (var i = 0; i < sD.length; i++) {   
            console.log( ' for (var i=' ); console.log(i);  
            var cE = createEl(i); cE(i);
        } // for (var i = 0; i < images.length; i++)  
    } //  var defLoader = function (gO

 //load javascripts deferred, and variables|templates hidden 
    var defLoader = function(gO) {

                // https://www.html5rocks.com/en/tutorials/speed/script-loading/
                // https://varvy.com/pagespeed/defer-loading-javascript.html
                var loadFNum, loadCnt, URL_PUBLIC_JS, BASE_OAUTH_JS, sDadd, sD;
                loadFNum={}; 

                /* if( (gO['URL_PUBLIC_JS']!==null) && (gO['URL_PUBLIC_JS']!==undefined) ) {
                    URL_PUBLIC_JS = gO['URL_PUBLIC_JS'];
                } else { URL_PUBLIC_JS = '/ntr/public'; }

                if( (gO['BASE_OAUTH_JS']!==null) && (gO['BASE_OAUTH_JS']!==undefined) ) {
                    BASE_OAUTH_JS = gO['BASE_OAUTH_JS'];
                } else { BASE_OAUTH_JS = '/ntr/public/OAuthBundle/oauth190322'; }

                if( (gO['sD']!==null) && (gO['sD']!==undefined) ) {
                    sD = gO['sD'];
                    console.log('givend sD='); console.log(sD); 
                } else { 
                    sD = []; //default
                } */

                    //given
                    if( (gO['sDadd']!==null) && (gO['sDadd']!==undefined) ) {
                        sDadd = gO['sDadd'];
                    } else { sDadd = []; } 
                    if ( typeof(sDadd)==='array' && (sDadd.length >=1) ) { sD.concat(sDadd); }  

                    function onLoadHandler() {
                        var el = this;
                        loadFNum.i --;

                        console.log( 'loaded&appended loadFNum.i  ='+loadFNum.i +'   el.src='+ el.src )
                        //Firefox - onload 
                        unbindEvent(el, 'error', onErrorHandler);
                        unbindEvent(el, 'load', onLoadHandler);
                        if( loadFNum.i===0 ) { window.bloaded = true; }
                        // console.log('loaded loadFNum.i  ='+loadFNum.i )
                        // there's no event change for Safari,    
                    } // function onLoadHandler() 

                    //Firefox
                    function onErrorHandler() { 
                        var el = this;
                        el.async = false;
                        unbindEvent(el, 'error', onErrorHandler);
                        unbindEvent(el, 'load', onLoadHandler);
                    } // function onErrorHandler()  

                    //Firefox
                    function bindEvent(ele, type, fn) {
                        //console.log( ' bindEvent'  ); 
                        if (ele.attachEvent) {
                            ele.attachEvent && ele.attachEvent('on' + type, fn);
                        } else {
                            ele.addEventListener(type, fn, { capture: false, passive: true });
                        }
                    } // function bindEvent(ele, type, fn) 

                    //Firefox
                    function unbindEvent(ele, type, fn) {
                        if (ele.detachEvent) {
                            ele.detachEvent && ele.detachEvent('on' + type, fn);
                        } else {
                            ele.removeEventListener(type, fn, { capture: false, passive: true });
                        }
                    } // function unbindEvent(ele, type, fn) 

                    function createEl(i) {
                        return function(i) {
                            var el = document.createElement("script");
                            el.async = false;
                            el.setAttribute('type', 'text/javascript'); 
                            el = document.body.appendChild(el);

                            el.src = sD[i];
                            console.log('404___el='); console.log(el); 


                            //Firefox - onload
                            bindEvent( el, 'error', onErrorHandler );
                            bindEvent( el, 'load', onLoadHandler );

                            //IE 
                            el.onreadystatechange = function() {
                                if ( el.readyState == 'loaded' ) {
                                    // Our script has download, but hasn't executed.
                                    // It won't execute until we do
                                    script.async = false;
                                    document.body.appendChild(el);
                                    loadFNum.i --;
                                    console.log( 'loaded loadFNum.i  ='+loadFNum.i +'onreadystatechange sD['+i+']='+ sD[i] );  
                                } // if ( el.readyState == 'loaded' )
                            }; // el.onreadystatechange = function()
                            console.log('assigning sD['+i+']='+ sD[i] );
                        } // return function(i)
                    } // function createEl(i)#

                    loadCnt = sD.length; 

                    loadFNum.i = sD.length;    //number to count loads
                    for (var i = 0; i < sD.length; i++) {   
                        console.log( ' for (var i=' ); console.log(i);  
                        var cE = createEl(i); cE(i);
                    } // for (var i = 0; i < images.length; i++)  
                
            }; // ) (loadFNum);

    
    
    // load libraries/imgaes/css than HTML is loaded
    ( function() {   
      
    var DX = [
          //  BASE_PUBLIC_JS + '/raw/ajax_call_urlenc.js',
           // BASE_PUBLIC_JS + '/raw/fs.js',
           // BASE_PUBLIC_CSS + '/raw/flex.css', //TBD
           // BASE_PUBLIC_CSS + '/raw/sizes.css',

           // BASE_PUBLIC_CSS + '/main/min.css',
            BASE_PUBLIC_JS + 'fin/min.js',
        ]; 

         console.log( 'before calling defLouder DH=' ); 
         console.log( DX ); 
         defLoader({sD:DX}); //pass here input check functions present in json...
    } ) (); 
            
    //start javascript than all libraties are loaded        
    var DInt = setInterval( function() {
        console.log('setInterval allFormProts  window.bloaded=' + window.bloaded ); 

        if(window.bloaded) {
            clearInterval(DInt);
            //( function() {
                var fs, cnfg ; 
                var cnfg_el= document.getElementById('cnfg'); 
                if( (cnfg_el!==undefined) && (cnfg_el!==null) ) {
                    cnfg = JSON.parse(cnfg_el.innerHTML);  
                }
                if( (cnfg!==undefined) && (cnfg!==null) ) {
                    fs = new fsProt(cnfg); 
                }
                else { fs = new fsProt({}); }
                //console.log('window[ajax_call=]'); console.log(window['ajax_call']);
                //console.log('ajax_call'); console.log(ajax_call);
            //} ) ();
        } // window.onload = function
    }, 1000 );
    
} catch (err) {
    var el = document.createElement('div');
    el.innerHTML = ' There is an error, could you pelase contact administrator';
    el.className='err';
    document.appendChild(el);
} 
} //  window.onload = function()
