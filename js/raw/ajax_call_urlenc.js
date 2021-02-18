
//simplest afax function
//assure each url is different otherwise you will be cathing responses from different error request in unpredictable order and passing chargs to them 
function ajax_call_urlenc(gO) {

    var myRequest, url, data, rT, r, cb, cbo, cbm, m, cbargs; 
    var eA={}; 
    console.log('in sendTheAJAX 230 gO='); console.log(gO) ; 
    // 1. create a new XMLHttpRequest object -- an object like any other!
    myRequest = new XMLHttpRequest();

    if( (gO.url!==null) && (gO.url!==undefined) ) { url = gO.url; }
    else { b=true; eA['ajx.aurl'] = {}; }

    if( (gO.data!==null) && (gO.data!==undefined) ) { data = gO.data; }
    else { b=true; eA['ajx.adata'] = {}; data= JSON.stringify({});  }//most probably it can be empty data!

    if( (gO.m!==null) && (gO.m!==undefined) ) { m = gO.m; } else  { m = "POST"; } //method 
    if( (gO.cb!==null) && (gO.cb!==undefined) ) { cb = gO.cb; } else  { cb = null; } //callback function
    if( (gO.cbo!==null) && (gO.cbo!==undefined) ) { cbo = gO.cbo; } else  { cbo = null; } //callback function
    if( (gO.cbm!==null) && (gO.cbm!==undefined) ) { cbm = gO.cbm; } else  { cbm = null; } //callback function
    if(cbo===null) { cbm=null; }
    if(cbm===null) { cbo=null; }
    
    if( (gO.cbargs!==null) && (gO.cbargs!==undefined) ) { cbargs = gO.cbargs; } else { cbargs = {}; } //cbargs are defined here, but they are not passed to the callback function. WHY???? In may calls, seems only the last call is passed. TBCHECKED. Thus i send cbargs through the data to the post and return them back to the responseText //callback function arguments
    
    //console.log('in sendTheAJAX 230 cbargs'); console.log(cbargs); 
    //console.log('in sendTheAJAX 230 cb'); console.log(cb); 
    console.log('in sendTheAJAX 230 data='); console.log(data); 
    
    //myRequest.open( 'POST', 'http://localhost:8080/ntr/public/U2vBundle/u2v190410/index.php', true );
    //url = 'http://localhost:8080/ntr/public/U2vBundle/u2v190410/index.php/u2v_20/EN/remodel';
    myRequest.open( m, url, true );
    
    myRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" ) ; 
//'a=3&b=y'

    /*  myRequest.onload = function () {
        //after this.readyState == 4
        console.log('  myRequest.onload  ') ;
    }*/
    
    //myRequest.onreadystatechange = function (cbargs, cb) {  error that cb is not a function
    myRequest.onreadystatechange = function () { 
        var rT, r; 
         //console.log( 'this.readyState = ' + this.readyState );
         //console.log('in sendTheAJAX 41 cbargs'); console.log(cbargs); 
         //console.log( 'cb = ' + cb );
         if ( (this.readyState == 4) && (this.status == 200) ) {
            rT = this.responseText; 
            console.log(' XYY responseText  = ' );
            console.log( rT );
            if( (rT!==undefined) && (rT!==null) ) { r = JSON.parse(rT); } else { r = {}; } 
            //cbargs['r']=r;
            //cbargs['rT']=rT ;
            //return r; 
            console.log('in sendTheAJAX 51 cbargs'); console.log(cbargs); 
            //console.log('in sendTheAJAX 230 cb'); console.log(cb);   
            //cb(cbargs); // assigns sames cbargs to all requests despitedifferent urls 
            console.log('cb='); console.log(cb) ; 
            console.log('cbo='); console.log(cbo); 
            console.log('XXX cbm='); console.log(cbm);  
            if(cbm===null) {
                cb({resp: r}) ;
            } else {
                console.log('cbo['+cbm+']=');  console.log(cbo[cbm]); 
                cbo[cbm]({resp:r});
            }
        } // if ( (this.readyState == 4) && (this.sta
    } // myRequest.onreadystatec
    
    //var datas = 'data='+data; //data is json strigified OR other string
    myRequest.send(data); 
    
    return myRequest; 

} // function sendTheAJAX(
