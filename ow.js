/* ============================================================
   ODEOWAVE. Pitch mock. Shared behaviour.
   Header and footer are injected so all six pages stay identical.
   ============================================================ */
(function(){
"use strict";
var RM=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function $(id){return document.getElementById(id);}
function clamp(v,a,b){return Math.min(b,Math.max(a,v));}
function lerp(a,b,t){return a+(b-a)*t;}

var PAGE=document.body.getAttribute("data-page")||"";
var PHONE="+91 93551 30555", TEL="+919355130555", TEL2="+911135236078", MAIL="puneet@odeowave.in";
var MAPS_URL="https://www.google.com/maps/place/ODEOWAVE/@28.5281382,77.2762818,17z";
var FORM_MAIL="sunainamahesh1@gmail.com";

var NAVITEMS=[
  ["index.html","Home","home"],
  ["capabilities.html","Products &amp; Services","capabilities"],
  ["spaces.html","Spaces","spaces"],
  ["work.html","Work","work"],
  ["about.html","About","about"],
  ["contact.html","Contact","contact"]
];

/* ---------------- header ---------------- */
(function header(){
  var slot=$("site-nav"); if(!slot) return;
  var onhero=document.querySelector(".hero, .pagehero") ? " onhero" : " solid";
  var links=NAVITEMS.slice(1).map(function(n){
    return '<a href="'+n[0]+'"'+(PAGE===n[2]?' aria-current="page"':'')+'>'+n[1]+'</a>';
  }).join("");
  slot.outerHTML=
  '<nav class="nav'+onhero+'" id="nav" aria-label="Main">'+
    '<a class="brand" href="index.html">ODEOWAVE</a>'+
    '<div class="navlinks">'+links+'</div>'+
    '<div class="navright">'+
      '<a class="btn sm ghost phone" href="tel:'+TEL+'">'+PHONE+'</a>'+
      '<a class="btn sm light cta" href="contact.html">Request a design</a>'+
      '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">'+
        '<i></i><i></i><i></i></button>'+
    '</div>'+
  '</nav>'+
  '<div class="drawer" id="drawer" hidden>'+
    '<nav aria-label="Mobile">'+
      NAVITEMS.map(function(n){return '<a href="'+n[0]+'">'+n[1]+'</a>';}).join("")+
    '</nav>'+
    '<div class="foot">'+
      '<div><h4 style="color:rgba(241,240,236,.5);font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;margin:0 0 8px">Reach us</h4>'+
        '<a href="tel:'+TEL+'">'+PHONE+'</a><a href="mailto:'+MAIL+'">'+MAIL+'</a></div>'+
      '<div><h4 style="color:rgba(241,240,236,.5);font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;margin:0 0 8px">Studio</h4>'+
        '<span style="color:rgba(241,240,236,.8);font-size:13.5px;line-height:1.45;display:block">B-112, DDA Sheds, Pocket A,<br>Okhla Phase I, Okhla Industrial Estate,<br>New Delhi, Delhi 110020, India</span></div>'+
    '</div>'+
  '</div>';

  var nav=$("nav"), hero=document.querySelector(".hero, .pagehero"), drawer=$("drawer"), burger=$("burger");

  function state(){
    var y=window.scrollY, menu=document.body.classList.contains("menu");
    var navH=nav.offsetHeight||64;
    var overHero = !!hero && !menu && y < (hero.offsetHeight - navH);
    nav.classList.toggle("onhero", overHero);
    nav.classList.toggle("solid", menu || y>20);
  }
  window.addEventListener("scroll",state,{passive:true});
  window.addEventListener("resize",state);
  state();

  function setMenu(open){
    burger.setAttribute("aria-expanded",String(open));
    burger.setAttribute("aria-label",open?"Close menu":"Open menu");
    if(open){
      drawer.hidden=false;
      nav.classList.add("solid"); nav.classList.remove("onhero");
      requestAnimationFrame(function(){
        document.body.classList.add("menu");
        document.body.classList.add("lock");
      });
    } else {
      document.body.classList.remove("menu");
      document.body.classList.remove("lock");
      setTimeout(function(){ if(!document.body.classList.contains("menu")) drawer.hidden=true; },420);
      state();
    }
  }
  burger.addEventListener("click",function(){ setMenu(!document.body.classList.contains("menu")); });
  drawer.addEventListener("click",function(e){ if(e.target.closest("a")) setMenu(false); });
  window.addEventListener("keydown",function(e){ if(e.key==="Escape") setMenu(false); });
  window.addEventListener("resize",function(){
    if(window.innerWidth>980 && document.body.classList.contains("menu")) setMenu(false);
  });
})();

/* ---------------- footer ---------------- */
(function footer(){
  var slot=$("site-footer"); if(!slot) return;
  slot.outerHTML=
  '<footer>'+
    '<div class="fgrid">'+
      '<div>'+
        '<div class="brand" style="font-size:16px">ODEOWAVE</div>'+
        '<p class="small" style="color:rgba(241,240,236,.6);margin-top:13px;max-width:34ch">'+
        'Audio, video, pro lighting and automation, designed and integrated for architectural spaces. '+
        'Fifteen years, one accountable team.</p>'+
        '<div class="btnrow" style="margin-top:18px"><a class="btn light" href="contact.html">Request a design <span class="ar">&rarr;</span></a></div>'+
      '</div>'+
      '<div><h4>Products and services</h4>'+
        '<a href="capabilities.html#audio">Audio</a>'+
        '<a href="capabilities.html#video">Video</a>'+
        '<a href="capabilities.html#lighting">Pro lighting</a>'+
        '<a href="capabilities.html#automation">Automation</a>'+
        '<a href="capabilities.html#acoustics">Acoustic design</a>'+
        '<a href="capabilities.html#service">Installation and support</a></div>'+
      '<div><h4>Spaces</h4>'+
        '<a href="spaces.html#clubs">Clubs and discos</a>'+
        '<a href="spaces.html#lounges">Lounges and cafes</a>'+
        '<a href="spaces.html#gyms">Gyms and health clubs</a>'+
        '<a href="spaces.html#theatres">Home theatres</a>'+
        '<a href="spaces.html#corporate">Offices and boardrooms</a>'+
        '<a href="spaces.html#more">Retail, campus and worship</a></div>'+
      '<div><h4>Company</h4>'+
        '<a href="work.html">Work</a>'+
        '<a href="about.html">About</a>'+
        '<a href="about.html#process">Process</a>'+
        '<a href="contact.html">Contact</a></div>'+
      '<div><h4>Reach us</h4>'+
        '<a href="tel:'+TEL+'">'+PHONE+'</a>'+
        '<a href="tel:'+TEL2+'">+91 11 35236078</a>'+
        '<a href="mailto:'+MAIL+'">'+MAIL+'</a>'+
        '<a href="'+MAPS_URL+'" target="_blank" rel="noopener">Okhla Phase I, New Delhi</a></div>'+
    '</div>'+
    '<div class="fmark">ODEOWAVE</div>'+
    '<div class="fbot">'+
      '<span>&copy; 2026 Odeowave. All rights reserved.</span>'+
      '<span>Concept mock. Photography is stock, pending a project shoot.</span>'+
    '</div>'+
  '</footer>';
})();

/* ---------------- reveals ---------------- */
var io=new IntersectionObserver(function(es){
  es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
},{threshold:.08,rootMargin:"0px 0px -5% 0px"});
document.querySelectorAll(".rv").forEach(function(el){io.observe(el);});

/* ---------------- client ticker ---------------- */
var CLIENTS=[["Aditya Birla Group","Corporate"],["ITC Savoy","Hospitality"],["Indian Air Force","Defence"],
 ["BIBA","Retail"],["Skootr Global","Workspace"],["King Koil","Retail"],["Kris Gethin","Fitness"],
 ["Fitness Force Club","Fitness"],["Momentum Gym","Fitness"],["Fit 2 Max","Fitness"],["Revamp Gym","Fitness"],
 ["TCM Sports","Sports"],["ISDM","Education"],["GL Bajaj","Education"],["Great Lakes","Education"],
 ["Clarens Gurugram","Hospitality"],["Legacy Shimla","Hospitality"],["Kufri Shimla","Hospitality"],
 ["UP-16 Noida","Lounge"],["Barish Noida","Lounge"],["NRG Builders","Residential"],["IPLIX","Corporate"]];

var run=$("run");
if(run){
  run.innerHTML=(CLIENTS.map(function(c){return "<span>"+c[0]+"</span>";}).join("")).repeat(3);
  var tx=0;
  (function tick(){
    requestAnimationFrame(tick);
    if(RM) return;
    tx-=0.4;
    var one=run.scrollWidth/3;
    if(one && Math.abs(tx)>one) tx+=one;
    run.style.transform="translateX("+tx+"px)";
  })();
}
var cg=$("clientGrid");
if(cg){
  cg.innerHTML=CLIENTS.map(function(c){
    return '<div class="cl"><span class="n">'+c[0]+'</span><span class="s">'+c[1]+'</span></div>';}).join("");
}

/* ---------------- enquiry forms ---------------- */
document.querySelectorAll("form[data-enq]").forEach(function(f){
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var d=new FormData(f);
    var btn=f.querySelector("button[type='submit']");
    var n=f.querySelector("[data-note]");

    var name=(d.get("name")||"").trim();
    var contact=(d.get("contact")||"").trim();
    var space=d.get("space")||"";
    var site=(d.get("site")||"").trim();
    var brief=(d.get("brief")||"").trim();

    if(!contact && !name){
      if(n){
        n.style.color="#f87171";
        n.textContent="Please enter your name or contact details.";
      }
      return;
    }

    if(btn){
      btn.disabled=true;
      btn.setAttribute("data-orig",btn.innerHTML);
      btn.innerHTML='Sending &hellip;';
    }
    if(n){
      n.style.color="rgba(241,240,236,.7)";
      n.textContent="Submitting your enquiry...";
    }

    var payload={
      name: name || "(Not provided)",
      contact: contact || "(Not provided)",
      space: space,
      site: site || "(Not specified)",
      brief: brief || "(None)"
    };

    // Post to Vercel Serverless Function (/api/contact)
    fetch("/api/contact",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
    .then(async function(res){
      if(res.status === 404){
        // On local static dev (like Live Server where /api is not running), fallback to FormSubmit
        return fetch("https://formsubmit.co/ajax/" + FORM_MAIL,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(Object.assign({}, payload, {
            _subject: "Project enquiry from " + (name || "odeowave.in"),
            _template: "table",
            _captcha: "false"
          }))
        }).then(function(r){ return r.json(); });
      }
      var data = await res.json().catch(function(){ return {}; });
      if(!res.ok){
        throw new Error(data.error || "Failed to send");
      }
      return data;
    })
    .then(function(data){
      if(btn){
        btn.disabled=false;
        btn.innerHTML=btn.getAttribute("data-orig")||'Send enquiry <span class="ar">&rarr;</span>';
      }
      f.reset();
      if(n){
        n.style.color="#4ade80";
        n.textContent="Enquiry received! We'll review your project and get back to you shortly.";
      }
    })
    .catch(function(err){
      if(btn){
        btn.disabled=false;
        btn.innerHTML=btn.getAttribute("data-orig")||'Send enquiry <span class="ar">&rarr;</span>';
      }
      if(n){
        n.style.color="#f87171";
        n.textContent= (err && err.message) ? err.message : ("Could not send automatically. Please reach us at " + MAIL + " or call " + PHONE + ".");
      }
    });
  });
});

/* ---------------- work filters ---------------- */
var fs=$("filters");
if(fs){
  fs.addEventListener("click",function(e){
    var b=e.target.closest("button"); if(!b) return;
    var f=b.getAttribute("data-f");
    fs.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-pressed",String(x===b));});
    var shown=0;
    document.querySelectorAll("#wgrid .w").forEach(function(w){
      var hit = (f==="all" || w.getAttribute("data-c")===f);
      w.classList.toggle("hide",!hit);
      if(hit) shown++;
    });
    var c=$("filterCount");
    if(c) c.textContent=shown+(shown===1?" project":" projects");
  });
  var c0=$("filterCount");
  if(c0) c0.textContent=document.querySelectorAll("#wgrid .w").length+" projects";
}

/* ---------------- sound demo ---------------- */
var dCv=$("dCv");
if(dCv){
  var A={ready:false,on:false,raw:false,level:0};

  function ir(ctx,sec,decay){
    var rate=ctx.sampleRate,len=Math.max(1,Math.floor(rate*sec));
    var b=ctx.createBuffer(2,len,rate);
    for(var c=0;c<2;c++){var d=b.getChannelData(c);
      for(var i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay);}
    return b;
  }
  function nb(ctx,sec,sm){
    var b=ctx.createBuffer(1,ctx.sampleRate*sec,ctx.sampleRate),d=b.getChannelData(0),last=0;
    for(var i=0;i<d.length;i++){var w=Math.random()*2-1;last=last*sm+w*(1-sm);d[i]=last*1.5;}
    return b;
  }
  function ramp(p,v,t){ if(!p)return;
    try{p.cancelScheduledValues(A.ctx.currentTime);p.setTargetAtTime(v,A.ctx.currentTime,t||.25);}
    catch(e){p.value=v;} }

  function build(){
    if(A.ready) return;
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC) return;
    var ctx=new AC(); A.ctx=ctx;
    A.master=ctx.createGain(); A.master.gain.value=0;
    A.an=ctx.createAnalyser(); A.an.fftSize=1024; A.an.smoothingTimeConstant=.75;
    A.master.connect(A.an); A.an.connect(ctx.destination);
    A.buf=new Uint8Array(A.an.fftSize);

    A.verb=ctx.createConvolver(); A.verb.buffer=ir(ctx,.55,3.4);
    A.wet=ctx.createGain(); A.wet.gain.value=.3;
    A.verb.connect(A.wet); A.wet.connect(A.master);

    A.boom=ctx.createBiquadFilter(); A.boom.type="peaking"; A.boom.frequency.value=160; A.boom.Q.value=1.1;
    A.harsh=ctx.createBiquadFilter(); A.harsh.type="peaking"; A.harsh.frequency.value=2800; A.harsh.Q.value=1.2;
    A.boom.connect(A.harsh); A.harsh.connect(A.master); A.harsh.connect(A.verb);

    A.dly=ctx.createDelay(1); A.dly.delayTime.value=.19;
    A.fb=ctx.createGain(); A.fb.gain.value=0;
    A.dhp=ctx.createBiquadFilter(); A.dhp.type="highpass"; A.dhp.frequency.value=380;
    A.dout=ctx.createGain(); A.dout.gain.value=0;
    A.harsh.connect(A.dly); A.dly.connect(A.dhp); A.dhp.connect(A.fb); A.fb.connect(A.dly);
    A.dhp.connect(A.dout); A.dout.connect(A.master);

    A.tone=ctx.createBiquadFilter(); A.tone.type="lowpass"; A.tone.Q.value=.6; A.tone.frequency.value=1500;
    A.tone.connect(A.boom);
    A.oscs=[];
    [110,164.81,220,329.63].forEach(function(f,i){
      var o=ctx.createOscillator(); o.type=i%2?"sine":"triangle"; o.frequency.value=f;
      var g=ctx.createGain(); g.gain.value=0;
      o.connect(g); g.connect(A.tone); o.start(); A.oscs.push(g);
    });
    A.lfo=ctx.createOscillator(); A.lfo.frequency.value=.06;
    A.lg=ctx.createGain(); A.lg.gain.value=280;
    A.lfo.connect(A.lg); A.lg.connect(A.tone.frequency); A.lfo.start();

    A.nsrc=ctx.createBufferSource(); A.nsrc.buffer=nb(ctx,3,.72); A.nsrc.loop=true;
    A.nf=ctx.createBiquadFilter(); A.nf.type="bandpass"; A.nf.frequency.value=600; A.nf.Q.value=.8;
    A.ng=ctx.createGain(); A.ng.gain.value=0;
    A.nsrc.connect(A.nf); A.nf.connect(A.ng); A.ng.connect(A.master); A.ng.connect(A.verb);
    A.nsrc.start();

    A.ready=true; apply();
  }
  function apply(){
    if(!A.ready) return;
    var r=A.raw;
    ramp(A.boom.gain, r?9:0,.3);
    ramp(A.harsh.gain, r?6:0,.3);
    ramp(A.fb.gain, r?.42:0,.3);
    ramp(A.dout.gain, (r&&A.on)?.3:0,.3);
    ramp(A.tone.frequency, r?3000:1500,.35);
    A.verb.buffer=ir(A.ctx, r?2.1:.55, r?2:3.4);
    ramp(A.wet.gain, r?.62:.3,.35);
    ramp(A.ng.gain, A.on?(r?.09:.028):0,.3);
    A.oscs.forEach(function(g,i){ ramp(g.gain, A.on?(.075/(1+i*.35)):0,.5); });
  }
  function power(on){
    build(); if(!A.ready) return;
    A.on=on;
    if(on && A.ctx.state==="suspended") A.ctx.resume();
    ramp(A.master.gain,on?.8:0,on?.6:.3);
    apply();
    document.body.classList.toggle("on",on);
    $("sndTxt").textContent=on?"Sound on":"Turn sound on";
    $("snd").setAttribute("aria-pressed",String(on));
  }
  $("snd").addEventListener("click",function(){power(!A.on);});

  function setMode(raw){
    A.raw=raw;
    $("dRaw").setAttribute("aria-pressed",String(raw));
    $("dFix").setAttribute("aria-pressed",String(!raw));
    $("dTxt").textContent = raw
      ? "Unplanned. Reverb tail running to 2.1 s, a 160 Hz boom, slap echo off the hard wall, noise floor up."
      : "Design-led. Reverb tail controlled at 0.5 s, no slap echo, noise floor down.";
    apply();
  }
  $("dRaw").addEventListener("click",function(){setMode(true);});
  $("dFix").addEventListener("click",function(){setMode(false);});

  var bars=Array.prototype.slice.call($("meter").children);
  function fit(cv){
    var dpr=Math.min(window.devicePixelRatio||1,2), r=cv.getBoundingClientRect();
    if(!r.width||!r.height) return null;
    var w=Math.round(r.width*dpr),h=Math.round(r.height*dpr);
    if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}
    var c=cv.getContext("2d"); c.setTransform(dpr,0,0,dpr,0,0);
    return {c:c,w:r.width,h:r.height};
  }
  var visible=false;
  new IntersectionObserver(function(es){es.forEach(function(e){visible=e.isIntersecting;});},{threshold:.05}).observe(dCv);

  (function frame(t){
    requestAnimationFrame(frame);
    if(A.ready&&A.on){
      A.an.getByteTimeDomainData(A.buf);
      var s=0;
      for(var i=0;i<A.buf.length;i+=4){var v=(A.buf[i]-128)/128;s+=v*v;}
      A.level=lerp(A.level,Math.sqrt(s/(A.buf.length/4)),.2);
    } else A.level=lerp(A.level,0,.1);
    bars.forEach(function(b,i){
      b.style.height=(2+(A.on?clamp(A.level*4.5*(1-i*.1)+Math.random()*.1,.08,1):.08)*10)+"px";
    });
    if(!visible) return;
    var f=fit(dCv); if(!f) return;
    var c=f.c,w=f.w,h=f.h,mid=h/2;
    c.clearRect(0,0,w,h);
    c.strokeStyle="rgba(241,240,236,.14)"; c.lineWidth=1;
    c.beginPath(); c.moveTo(0,mid); c.lineTo(w,mid); c.stroke();
    var data=null;
    if(A.ready&&A.on){ A.an.getByteTimeDomainData(A.buf); data=A.buf; }
    var col=A.raw?"#D2551F":"#8FA0FF";
    c.beginPath();
    for(var x=0;x<=w;x+=2){
      var v;
      if(data) v=(data[Math.floor(x/w*(data.length-1))]-128)/128;
      else v=Math.sin(x*.02+t*.001)*.3*Math.sin(x*.004+t*.0005);
      c.lineTo(x, mid + v*h*.34*Math.sin(Math.PI*(x/w))*(A.on?1:.25));
    }
    c.strokeStyle=col; c.lineWidth=1.6; c.stroke();
    var tail=A.raw?.88:.28;
    c.fillStyle="rgba(241,240,236,.16)"; c.fillRect(0,h-6,w,2);
    c.fillStyle=col; c.fillRect(0,h-6,w*tail,2);
    c.fillStyle="rgba(241,240,236,.5)"; c.font='10px "IBM Plex Mono",monospace';
    c.fillText(A.raw?"RT60 2.1 s":"RT60 0.5 s",0,h-12);
  })(0);
}
})();
