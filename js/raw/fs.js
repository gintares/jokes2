


var fsProt = function(gO) { 
    
    //console.log('fsProt='); console.log(fsProt); 
    
    var bpass = true; 
    var qs = gO.qs; 
    var evt_els_qs = gO.evt_els_qs;
    var evt_els_qs_KA = Object.keys(evt_els_qs); 
    var int_tms = gO.int_tms; 
    var titles = gO.titles; 
    var sumId = gO.sumId;
    var contId = gO.contId;
    var limn = gO.limn; 

    this.form = document.querySelector(qs); 
    //console.log('<br> this.fs='); console.log(this.form);
    this.form.addEventListener('keydown', this, false); 
    this.els={}
    if( evt_els_qs_KA.length > 0 ) {
        for ( let k of evt_els_qs_KA ) {
            var qse = evt_els_qs[k]; 
            var ans = this.form.querySelector(qse); 
            if ( (ans!==undefined) && (ans!==null) ) {
                this.els[k] = ans;
            } // if(ans!==undefined) && (ans!==null)
        } // for ( let k of evt_els_qs_KA )
    } // if(evt_els_qs_KA > 0 )
    //this.els.n = this.form.querySelector('input[name="n"]'); 
    //this.els.keyw = this.form.querySelector('input[name="keyw"]'); 
    //console.log('this.els='); console.log(this.els);

    this.bIntInp=false; // input
    //this.bIntOut=false; // output
    this.IntInpTms = Date.now(); // time than user keydown the last time 

    //this.resp={};
    var currentURL = window.location.href; 
    var urlA = currentURL.split('/');  //http// gives empty additional value
    urlA.pop(); //remove part correspondong to action
    this.base_url = urlA.join('/');
    //console.log('base_url=');  console.log(this.base_url);
    this.ajax_url = this.base_url +'/ajax_call.php'; 
    
    this.cnfg = {}; 
    this.int_tms = int_tms; //200; 
    //this.cnfg.int_tms = 200; // interval in miliseconds to update and check fiels values for user input
    //this.cnfg_resp = {}; 
    //this.cnfg_resp.cnt=0; 
    
    this.titles = titles; // { id:'joke id', keyw:'joke search string', n:'number of jokes', punch:'punchline', joke:'joke', type: 'joke type' }
    
    this.sumId =sumId; //'jokes-summary'; 
    this.contId =contId; //'jokes-container'; 
    
} // var fsProt = new function

    
fsProt.prototype.handleEvent = function(evt) {
    console.log('evt='); console.log(evt);
    //this.IntInpTms = Date.now(); 
    if(!this.bIntInp) { this.bIntInp=true; this.init_inp(); }
} // fsProt.prototype.handleEvent = function(evt
    
    
fsProt.prototype.init_inp = function(evt) {
    var that = this;
    var IntInpTms = Date.now();
    //this.bIntInp = true; 
    //var tp = this.cnfg.tp; //1000;
   // console.log(' init  this.IntInpTms='); console.log(this.IntInpTms) ;
    //start- remove intervalk on keyd || pause 
    var cnt=0; 
    
    //console.log('window[ajax_call=]'); console.log(window['ajax_call_urlenc']);
    //console.log('ajax_call'); console.log(ajax_call_urlenc);
    
    if(this.bIntInp) {
        this.IntI = setInterval( function(that, IntInpTms, cnt) { 
            var n = Date.now();
            cnt++; 
            if( (cnt>10) || (( n-IntInpTms ) > that.int_tms*1.1) ) { 
                that.bIntInp=false; 
                clearInterval(that.IntI); 
                var n = that.els.n.value;
                var keyw = that.els.keyw.value;
               //can be empty - the default joke is fetched if(!is_empty(keyw) ) {
                    var data = JSON.stringify({n:n, keyw:keyw});
                    var cnfg = JSON.stringify({ inp: { data: {n:n, keyw:keyw} } }); 
                    console.log( 'n='+n+'  diff='+(n-IntInpTms)+'  data=' );console.log(data);
                    //that.cnfg_resp.cnt++;
                    //if( !that.bIntOut ) { this.bIntOut=true; that.init_out(); }
                    //var L = Object.keys(that.resp).length; 
                    //var i = ((L!==undefined) && (L!==null) && (L>0)) ? L-1 : 0; 
                    //console.log(' L='+L+' i='+i); console.log(' that.resp='); //console.log(that.resp); 
                    //that.resp.cnfg.cnt=0;
                    //that.resp[i]={};
                    //that.resp[i].cnfg={};
                    //that.resp[i].cnfg.cnt=0;
                    //var ans_sj = ajax_call({ data:data, url:that.ajax_url, co:that.cnfg.resp });
                    //if( !this.bIntOut ) { this.bIntOut =true; }
                    var out= encodeURI('data='+data+'&cnfg='+cnfg); 
                    ajax_call_urlenc({ data:out, url:that.ajax_url, cbo: that, cbm: 'init_out',  }); // 
                    //var ans_sj = ajax_call({ data:data, url:that.ajax_url, cb:that.init_out });
                    //console.log('ans_sj = '); console.log(ans_sj);
                    //var ans = JSON.parse( ans_sj );
                    //var ansKA = Object.keys(ans);
                    //for ( let k of ansKA) {
                   //     that.resp[i][k]=ans[k]; 
                    //}
                    //that.resp[i].cnfg.cnt=1;
            } // if( (n-that.IntFtms) > tp*1.1 )
        }, that.int_tms, that, IntInpTms ); // window.IntF[IntFL] = setInterval( function(fs)
    } // if(this.bIntInp) 
    
} // fsProt.prototype.init_update = function(evt)

fsProt.prototype.init_out = function(ans) {
    var ansKA = Object.keys(ans);
    console.log('ans = '); console.log(ans);
    //if( (ans.cnfg.inp.data!==null) && )
    var inp_dt={}; //input data
    var tKA = Object.keys(this.titles); 
    for ( let k of tKA ){
        inp_dt[k]={}; 
        inp_dt[k]['value'] = ans.resp.cnfg.inp.data[k]; 
        inp_dt[k]['title']=this.titles[k]; 
    }
    var jokes = ans.resp.data; 
    var jKA = Object.keys(jokes);
    var jKAL = jKA.length;

    console.log('jKAL='+jKAL); 
    
    var u ='';
    var s='';
    if( jKAL > 0 ) {
        u += ' Found '+jKAL+' jokes.';
        /* u += ' Found '+jKAL+' jokes for: <br>';
        for ( let k of tKA) {
            if( (inp_dt[k].value!==undefined) && (inp_dt[k].value!==null) ) {
                u += inp_dt[k].title + ' : '+inp_dt[k].value + '<br>'; 
            } // if( (inp_dt[k].value!==undefined) && (inp_dt[k].val
        } // for ( let k of tK */
        var cnt=0;
        for ( let n of jKA ) {
            cnt++; 
            //'id', 'type', 'joke', 'punch', 'keyw', 'n'
            s += '<div class="item">';
            s += '<div class="line number">'+cnt+'</div>';
            s += '<div class"line type">'+this.titles['type']+' : '+jokes[n].type+'</div>';
            s += '<div class"line id">'+this.titles['id']+' : '+jokes[n].id+'</div>';
            s += '<div class="line joke">'+this.titles['joke']+' : '+jokes[n].joke+'</div>';
            s += '<div class="line punch" >'+this.titles['punch']+' : '+jokes[n].punch+'</div>';
            s += '<div><br></div>';
            s += '</div>';  
        } // for ( let i=0; i<jKAL; i++
    } // if(jKAL.length > 0 
    else {
        u += 'There are no jokes for: <br>';
        for ( let k of tKA) {
            if( (inp_dt[k].value!==undefined) && (inp_dt[k].value!==null) ) {
                u += inp_dt[k].title+' : '+inp_dt[k].value+'<br>'; 
            } // if( (inp_dt[k].value!==undefined) && (inp_dt[k].val
        } // for ( let k of tK
    }
    
    var cont = document.getElementById(this.sumId);
    cont.innerHTML = u;
    var cont = document.getElementById(this.contId);
    cont.innerHTML = s;
    
} // fsProt.prototype.init_out = function(ans)
                            
fsProt.prototype.init_out_old = function(ans) {
    var ansKA = Object.keys(ans);
    var L = Object.keys(that.resp).length; 
    var i = ((L!==undefined) && (L!==null) && (L>0)) ? L-1 : 0; 
    console.log(' L='+L+' i='+i); console.log(' that.resp='); 
    for ( let k of ansKA) {
        that.resp[i][k]=ans[k]; 
    }
    console.log('started init_out')
    // if(this.cnfg_resp.cnt) 
    var that = this;
    //var resp_cnt = this.cnfg_resp.cnt; 
    //var IntFtms = Date.now();
    //this.bIntOut = true;
    var cnt=0; 
    
    if( this.bIntOut ) {
        this.IntO = setInterval( function(that, cnt) { 
            //if( that.cnfg_resp.cnt>0 ) {
            //if(that.resp.cnfg.cnt>0)
            cnt++; 
            var L = Object.keys(that.resp).length; 
            var i = ((L!==undefined) && (L!==null) && (L>0)) ? L-1 : 0; 
            console.log(' L='+L+' i='+i); console.log(' that.resp='); console.log(that.resp) 
            if( i>0 ) {
                while( (that.resp[i].cnfg.cnt>=0) && (i>0) ) {
                    i--;
                } // while( (that.resp[i].cnfg.cnt>=0) && (i>0) 
            } // if( i>0 
            if(cnt>20) { that.bIntOut = false; clearInterval(that.IntO); } //prevents errors
            if(that.resp[i].cnfg.cnt>0) { 
                this.bIntOut = false; 
                clearInterval(that.IntF); 
                var jokesO = JSON.parse( JSON.stringify(that.resp[i]) ); 
      
                //that.cnfg_resp.cnt--;
                var jKA = Object.keys(jokesO);
                var jKAL = jKA.length;
                var s =''; 
                console.log('jKAL='+jKAL); 
                if( jKAL.length > 0 ) {
                    for ( let n of jKA ) {
                        s += '<div class="item">';
                        s += '<div class="number">'+(n+1)+'</div>';
                        s += '<div class"id">'+jokes[n].id+'</div>';
                        s += '<div class="joke">'+jokes[n].joke+'</div>';
                        s += '<div class="punch" >'+jokes[n].punchline+'</div>';
                        s += '</div>';  
                    } // for ( let i=0; i<jKAL; i++
                } // if(jKAL.length > 0 
                var cont = document.getElementById['jokes-container'];
                cont.innerHTML = s;
           } // if(that.cnfg_resp.cnt>0
        }, that.int_tms, that, cnt );  // this.IntO = setInterval( function(that
    } // if( this.bIntOut   
    
} // fsProt.prototype.init_out = function(evt
    
    
