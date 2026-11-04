/* YU DESIGN — hero WebGL slider
   Raw WebGL (no library): noise-displacement transitions between slides,
   a live leaf-shadow layer that sways like wind, mouse parallax, film grain. */
(function () {
  "use strict";
  var canvas = document.querySelector(".hero__gl");
  if (!canvas) return;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var slides = [];
  try { slides = JSON.parse(canvas.getAttribute("data-slides") || "[]"); } catch (e) {}
  var gl = null;
  try { gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: "high-performance" }); } catch (e) {}
  var emit = function (name, detail) { document.dispatchEvent(new CustomEvent(name, { detail: detail })); };
  if (!gl || !slides.length) { emit("hero:fallback"); return; }

  var VS = "attribute vec2 p;varying vec2 vUv;void main(){vUv=p*.5+.5;gl_Position=vec4(p,0.,1.);}";
  var FS = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D uA,uB;",
    "uniform vec2 uRes,uSizeA,uSizeB,uFocA,uFocB,uMouse;",
    "uniform float uProg,uTime,uScroll,uIntro;",
    "float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
    "float vn(vec2 x){vec2 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}",
    "float fbm(vec2 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vn(p);p=p*2.03+7.1;a*=.5;}return s;}",
    "mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}",
    "vec2 cover(vec2 uv,vec2 size,vec2 foc,float zoom){",
    "  float rs=uRes.x/uRes.y,ri=size.x/size.y;",
    "  vec2 s=rs>ri?vec2(1.,ri/rs):vec2(rs/ri,1.);",
    "  s/=zoom;",
    "  vec2 c=clamp(foc+uMouse*vec2(-.012,.010),s*.5,1.-s*.5);",
    "  return (uv-.5)*s+c;}",
    "float seg(vec2 p,vec2 a,vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.,1.);return length(pa-ba*h);}",
    "float leaf(vec2 p,vec2 c,float ang,float len,float wid){vec2 q=rot(ang)*(p-c);q.x-=len*.5;float k=1.-.35*smoothstep(-len*.5,len*.5,q.x);return (length(q/vec2(len*.5,wid*k))-1.)*min(len*.5,wid);}",
    "float branch(vec2 p,vec2 a,vec2 dir,float L,float bend,float lsz,float seed,float t){",
    "  float d=1e5;vec2 prev=a;",
    "  for(int i=1;i<=8;i++){float u=float(i)/8.;vec2 pt=a+dir*L*u+vec2(-dir.y,dir.x)*(bend+.03*sin(t*.9+seed))*u*u*L;d=min(d,seg(p,prev,pt)-.004*(1.-.6*u));prev=pt;}",
    "  for(int i=0;i<12;i++){float u=.1+.9*float(i)/12.;vec2 pt=a+dir*L*u+vec2(-dir.y,dir.x)*(bend+.03*sin(t*.9+seed))*u*u*L;",
    "    float side=mod(float(i),2.)<.5?1.:-1.;float hh=h21(vec2(seed,float(i)));",
    "    float ang=atan(dir.y,dir.x)+side*(.6+.35*hh)+.12*sin(t*1.7+float(i)*.9+seed);",
    "    float l=lsz*(.75+.5*hh)*(1.-.3*u);d=min(d,leaf(p,pt,ang,l,l*.28));}",
    "  return d;}",
    "void main(){",
    "  vec2 uv=vUv;",
    "  float aspect=uRes.x/uRes.y;",
    "  float zoom=1.04+uScroll*.12+(1.-uIntro)*.12;",
    "  float n=fbm(uv*vec2(3.,2.)+vec2(uTime*.05,0.));",
    "  float t=uv.x*.65+n*.55;",
    "  float edge=uProg*1.3-.15;",
    "  float m=smoothstep(t-.09,t+.09,edge);",
    "  float band=m*(1.-m)*4.;",
    "  vec2 off=vec2((n-.5)*.18,(n-.5)*.05)*band;",
    "  vec2 ua=cover(uv+off*(1.-m)+vec2(uProg*.04,0.),uSizeA,uFocA,zoom+uProg*.08);",
    "  vec2 ub=cover(uv-off*m-vec2((1.-uProg)*.04,0.),uSizeB,uFocB,zoom+(1.-uProg)*.1);",
    "  vec3 ca=texture2D(uA,ua).rgb;",
    "  vec3 cb=vec3(texture2D(uB,ub+vec2(.006*band,0.)).r,texture2D(uB,ub).g,texture2D(uB,ub-vec2(.006*band,0.)).b);",
    "  vec3 col=mix(ca,cb,m);",
    "  // leaf shadows",
    "  vec2 p=vec2(uv.x*aspect,uv.y)+uMouse*vec2(.02,-.015);",
    "  p+=vec2(.008*sin(uTime*.45),.006*cos(uTime*.38));",
    "  float tt=uTime;",
    "  float d=1e5;",
    "  d=min(d,branch(p,vec2(aspect+.08,1.12),normalize(vec2(-1.,-.45)),.95,-.14,.11,1.,tt));",
    "  d=min(d,branch(p,vec2(aspect-.05,1.18),normalize(vec2(-.55,-1.)),.7,.2,.1,7.,tt+1.3));",
    "  d=min(d,branch(p,vec2(aspect*.72,1.16),normalize(vec2(-.9,-.6)),.6,-.18,.09,13.,tt+2.1));",
    "  float blur=.012+.02*(1.-uv.y);",
    "  float sh=1.-smoothstep(-blur,blur,d);",
    "  sh*=smoothstep(.15,.6,uv.y+uv.x*.35);",
    "  col*=1.-.2*sh;",
    "  // light pool",
    "  col*=1.+.08*smoothstep(.9,.2,length((uv-vec2(.7,.6))*vec2(aspect,1.)));",
    "  // grade: soft grey editorial",
    "  float l=dot(col,vec3(.299,.587,.114));",
    "  col=mix(col,vec3(l),.32);",
    "  col=col*vec3(.86,.845,.82)+vec3(.02,.018,.012);",
    "  col=pow(col,vec3(1.06));",
    "  vec2 q=uv-.5;col*=1.-.32*dot(q*vec2(1.,1.2),q*vec2(1.,1.2));",
    "  col+= (h21(uv*uRes+fract(uTime)*91.)-.5)*.045;",
    "  col*=mix(.0,1.,uIntro);",
    "  gl_FragColor=vec4(col,1.);",
    "}"
  ].join("\n");

  function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(s)); } return s; }
  var prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { console.warn("[hero-gl]", e); emit("hero:fallback"); return; }
  gl.useProgram(prog);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var U = {};
  ["uA", "uB", "uRes", "uSizeA", "uSizeB", "uFocA", "uFocB", "uMouse", "uProg", "uTime", "uScroll", "uIntro"].forEach(function (n) { U[n] = gl.getUniformLocation(prog, n); });
  gl.uniform1i(U.uA, 0); gl.uniform1i(U.uB, 1);

  var tex = [];
  function makeTex(img) {
    var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return t;
  }
  function load(src) { return new Promise(function (res, rej) { var i = new Image(); i.decoding = "async"; i.onload = function () { res(i); }; i.onerror = rej; i.src = src; }); }

  var W = 0, H = 0, dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 1.75);
    W = Math.max(1, Math.round(canvas.clientWidth * dpr)); H = Math.max(1, Math.round(canvas.clientHeight * dpr));
    canvas.width = W; canvas.height = H; gl.viewport(0, 0, W, H);
  }
  window.addEventListener("resize", resize); resize();

  var cur = 0, nxt = 1, prog01 = 0, transStart = -1, lastSwitch = 0, intro = 0, introStart = -1;
  var HOLD = 6500, DUR = 1900;
  var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener("pointermove", function (e) { mouse.tx = e.clientX / window.innerWidth - .5; mouse.ty = e.clientY / window.innerHeight - .5; }, { passive: true });
  var visible = true, heroEl = canvas.closest(".hero");
  if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(heroEl);
  var easeIO = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  function bindPair() {
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[cur].t);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tex[nxt].t);
    gl.uniform2f(U.uSizeA, tex[cur].w, tex[cur].h); gl.uniform2f(U.uSizeB, tex[nxt].w, tex[nxt].h);
    gl.uniform2f(U.uFocA, slides[cur].fx || .5, 1 - (slides[cur].fy || .5)); gl.uniform2f(U.uFocB, slides[nxt].fx || .5, 1 - (slides[nxt].fy || .5));
  }
  function goTo(i, now) {
    if (transStart >= 0 || i === cur) return;
    nxt = i; bindPair(); transStart = now; emit("hero:slide", { index: i, phase: "start" });
  }
  heroEl.addEventListener("hero:goto", function (e) { goTo(e.detail, performance.now()); });

  var started = false;
  document.addEventListener("intro:done", function () { started = true; });
  setTimeout(function () { started = true; }, 4000);

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    if (started && introStart < 0) introStart = now;
    intro = introStart < 0 ? 0 : Math.min(1, (now - introStart) / 1600);
    if (reduce) intro = 1;
    mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
    var heroH = heroEl.offsetHeight || 1;
    var sc = Math.min(1, Math.max(0, window.scrollY / heroH));
    if (!reduce && started && transStart < 0 && tex.length > 1 && now - lastSwitch > HOLD) goTo((cur + 1) % tex.length, now);
    if (transStart >= 0) {
      prog01 = Math.min(1, (now - transStart) / DUR);
      if (prog01 >= 1) { cur = nxt; nxt = (cur + 1) % tex.length; prog01 = 0; transStart = -1; lastSwitch = now; bindPair(); emit("hero:slide", { index: cur, phase: "end" }); }
    }
    var hold = transStart >= 0 ? 1 : Math.min(1, (now - lastSwitch) / HOLD);
    emit("hero:tick", { p: reduce ? 0 : hold });
    gl.uniform2f(U.uRes, W, H);
    gl.uniform2f(U.uMouse, mouse.x, mouse.y);
    gl.uniform1f(U.uProg, easeIO(prog01));
    gl.uniform1f(U.uTime, reduce ? 0 : now / 1000);
    gl.uniform1f(U.uScroll, sc);
    gl.uniform1f(U.uIntro, easeIO(intro));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  // load first slide fast, others after
  load(slides[0].src).then(function (img) {
    tex[0] = { t: makeTex(img), w: img.naturalWidth, h: img.naturalHeight };
    tex[1] = tex[0]; nxt = 0; bindPair();
    document.documentElement.classList.add("gl-ready");
    emit("hero:ready");
    lastSwitch = performance.now();
    requestAnimationFrame(frame);
    var rest = slides.slice(1).map(function (s, k) {
      return load(s.src).then(function (im) { tex[k + 1] = { t: makeTex(im), w: im.naturalWidth, h: im.naturalHeight }; });
    });
    Promise.all(rest).then(function () { nxt = 1 % tex.length; bindPair(); }).catch(function () {});
  }).catch(function () { emit("hero:fallback"); });
})();
