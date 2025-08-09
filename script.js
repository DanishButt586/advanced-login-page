const loginBtn = document.getElementById('loginBtn');
const username = document.getElementById('username');
const password = document.getElementById('password');
const msg = document.getElementById('msg');
const btnArea = document.querySelector('.btn-area');
const showPwdBtn = document.getElementById('showPwd');
const rememberChk = document.getElementById('remember');
let moved = false; // roaming state

// ================= Visual Polish Enhancements (Theme + Parallax + Halo/Caustics) =================
(() => {
    const THEME_KEY = 'ui-theme-v1';
    const body = document.body;
    const switcher = document.querySelector('.theme-switcher');
    if(!switcher) return;
    // Inject caustic layer (single SVG & gradients) once
    if(!document.querySelector('.caustic-layer')){
        const div = document.createElement('div');
        div.className='caustic-layer';
        div.innerHTML = `<svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">\n            <defs>\n                <filter id="f" x="-20%" y="-20%" width="140%" height="140%">\n                    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves="3" seed="12" result="t"/>\n                    <feGaussianBlur in="t" stdDeviation="12" result="b"/>\n                    <feColorMatrix in="b" type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.85  0 0 0 0 1  0 0 0 12 -5" result="m"/>\n                </filter>\n                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">\n                    <stop offset="0%" stop-color="#4db8ff" stop-opacity="0.55"/>\n                    <stop offset="50%" stop-color="#ffffff" stop-opacity="0.15"/>\n                    <stop offset="100%" stop-color="#1f6b99" stop-opacity="0.45"/>\n                </linearGradient>\n            </defs>\n            <rect width="1200" height="800" fill="url(#g)" filter="url(#f)" opacity="0.55"/>\n        </svg>`;
        document.body.appendChild(div);
    }
    // Wrap container with tilt wrapper & add halo ring
    const form = document.querySelector('.login-container');
    if(form && !form.querySelector('.halo-ring')){
        const halo = document.createElement('div');
        halo.className='halo-ring';
        halo.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">\n            <defs>\n              <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">\n                <stop offset="0%" stop-color="var(--accent-glow)" stop-opacity="0.9"/>\n                <stop offset="45%" stop-color="var(--accent-glow)" stop-opacity="0.25"/>\n                <stop offset="100%" stop-color="var(--accent-glow)" stop-opacity="0"/>\n              </radialGradient>\n            </defs>\n            <circle cx="300" cy="300" r="290" fill="url(#haloGrad)"/>\n        </svg>`;
        form.prepend(halo);
    }
    // Theme switching logic
    function applyTheme(theme){
        if(!theme) theme='default';
        body.setAttribute('data-theme', theme);
        Array.from(switcher.querySelectorAll('.theme-btn')).forEach(btn => {
            const active = btn.getAttribute('data-theme') === theme;
            btn.setAttribute('aria-pressed', active ? 'true':'false');
        });
        try { localStorage.setItem(THEME_KEY, theme); } catch(e){}
    }
    const stored = (()=>{try {return localStorage.getItem(THEME_KEY);}catch(e){return null;}})();
    if(stored) applyTheme(stored); else applyTheme('default');
    switcher.addEventListener('click', e => {
        const btn = e.target.closest('.theme-btn');
        if(!btn) return;
        applyTheme(btn.getAttribute('data-theme'));
    });
    // Parallax tilt
    let tiltEnabled = true; let raf = null; let targetX=0, targetY=0, curX=0, curY=0;
    function onMove(e){
        if(!tiltEnabled || !form) return;
        const rect = form.getBoundingClientRect();
        targetX = ((e.clientX - rect.left)/rect.width - 0.5) * 14; // deg * scale
        targetY = ((e.clientY - rect.top)/rect.height - 0.5) * -14;
        if(!raf) raf = requestAnimationFrame(updateTilt);
    }
    function updateTilt(){
        raf = null;
        curX += (targetX - curX)*0.08; curY += (targetY - curY)*0.08;
        form.style.transform = `translateZ(0) rotateY(${curX.toFixed(2)}deg) rotateX(${curY.toFixed(2)}deg)`;
    }
    form.addEventListener('pointermove', onMove);
    form.addEventListener('pointerleave', ()=>{targetX=0; targetY=0; if(!raf) raf=requestAnimationFrame(updateTilt);});
})();

// ================= Interactive Lens + Performance Guard =================
(() => {
    const lens = document.getElementById('focusLens');
    if(!lens) return;
    let active = false; let raf=null; let lx=window.innerWidth/2; let ly=window.innerHeight/2; let tx=lx; let ty=ly;
    function moveLens(){
        raf=null; lx += (tx - lx)*0.18; ly += (ty - ly)*0.18; lens.style.top = ly + 'px'; lens.style.left = lx + 'px'; if(Math.abs(tx-lx)>0.5 || Math.abs(ty-ly)>0.5) raf=requestAnimationFrame(moveLens);
    }
    function pointer(e){ if(!active) return; tx = e.clientX; ty = e.clientY; if(!raf) raf=requestAnimationFrame(moveLens); }
    window.addEventListener('pointermove', pointer);
    // Toggle with L key
    window.addEventListener('keydown', e=>{ if(e.key.toLowerCase()==='l'){ active = !active; document.body.classList.toggle('lens-active', active); if(active){tx=e.clientX||tx; ty=e.clientY||ty; if(!raf) raf=requestAnimationFrame(moveLens);} }});
    // Auto disable on touch (could be distracting)
    window.addEventListener('touchstart', ()=>{ active=false; document.body.classList.remove('lens-active'); });
    // Simple performance heuristic: measure initial frames; if <30fps disable beams & heavy effects
    let frameCount=0; let start=performance.now();
    function perfCheck(ts){
        frameCount++;
        // shorter sampling window for faster decision
        if(ts - start < 800){ requestAnimationFrame(perfCheck); return; }
        const fps = frameCount / ((ts-start)/1000);
        if(fps < 40){
            document.documentElement.classList.add('low-perf');
            const beamLayer=document.querySelector('.beam-layer');
            if(beamLayer){ beamLayer.remove(); }
        }
    }
    requestAnimationFrame(perfCheck);
})();

// On load force default cleared state (also wipes any past persisted data from older versions)
try {
    sessionStorage.clear();
    localStorage.removeItem('rememberLogin');
    localStorage.removeItem('rememberUsername');
} catch(e) {}
username.value = '';
password.value = '';
rememberChk.checked = false;
msg.textContent = '';

function isEmpty() {
    return !username.value.trim() || !password.value.trim();
}

function getRandomPositionFullScreen() {
    const btnRect = loginBtn.getBoundingClientRect();
    const margin = 12;
    const maxLeft = window.innerWidth - btnRect.width - margin;
    const maxTop = window.innerHeight - btnRect.height - margin;
    const minLeft = margin;
    const minTop = margin;
    return {
        left: Math.random() * (maxLeft - minLeft) + minLeft,
        top: Math.random() * (maxTop - minTop) + minTop
    };
}

function clampToViewport(x, y) {
    const btnRect = loginBtn.getBoundingClientRect();
    const margin = 4; // minimal inner margin
    const maxLeft = window.innerWidth - btnRect.width - margin;
    const maxTop = window.innerHeight - btnRect.height - margin;
    if (x < margin) x = margin; else if (x > maxLeft) x = maxLeft;
    if (y < margin) y = margin; else if (y > maxTop) y = maxTop;
    return { left: x, top: y };
}

function placeButton(left, top) {
    const p = clampToViewport(left, top);
    loginBtn.style.left = p.left + 'px';
    loginBtn.style.top = p.top + 'px';
    loginBtn.style.transform = 'none';
    loginBtn.style.visibility = 'visible';
    loginBtn.style.opacity = '1';
}

function isFullyVisible() {
    const r = loginBtn.getBoundingClientRect();
    return r.left >= 0 && r.top >= 0 && r.right <= window.innerWidth && r.bottom <= window.innerHeight;
}

function ensureVisible() {
    if (isFullyVisible()) return;
    // Try a few random repositions
    for (let i = 0; i < 6; i++) {
        const { left, top } = getRandomPositionFullScreen();
        placeButton(left, top);
        if (isFullyVisible()) return;
    }
    // Fallback center
    const centerLeft = (window.innerWidth - loginBtn.offsetWidth) / 2;
    const centerTop = (window.innerHeight - loginBtn.offsetHeight) / 2;
    placeButton(centerLeft, centerTop);
}

function moveButtonRandom() {
    if (isEmpty()) {
        // Detach to body so it's never clipped by container
        ensureButtonDetached();
        loginBtn.classList.add('fullscreen-move');
        const { left, top } = getRandomPositionFullScreen();
        placeButton(left, top);
        ensureVisible();
        msg.textContent = 'Enter Username and Password First';
        msg.classList.add('visible');
        moved = true;
    } else {
        resetButton();
    }
}

function resetButton() {
    loginBtn.classList.remove('fullscreen-move');
    // Return to original container position
    const area = document.querySelector('.btn-area');
    if (area && loginBtn.parentElement !== area) {
        area.appendChild(loginBtn);
    }
    loginBtn.style.left = '50%';
    loginBtn.style.top = '0';
    loginBtn.style.transform = 'translateX(-50%)';
    loginBtn.style.opacity = '1';
    msg.textContent = '';
    msg.classList.remove('visible');
    moved = false;
}

// Detect mouse proximity to button, move instantly and frequently (on whole window)
let lastMove = 0;
window.addEventListener('mousemove', function(e) {
    if (!isEmpty()) return;
    const btnRect = loginBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    // If mouse is within 40px of button from any side, move it instantly
    if (
        mouseX > btnRect.left - 40 && mouseX < btnRect.right + 40 &&
        mouseY > btnRect.top - 40 && mouseY < btnRect.bottom + 40
    ) {
        // Prevent too many moves per second
        const now = Date.now();
        if (now - lastMove > 10) {
            moveButtonRandom();
            lastMove = now;
        }
    }
});

// Re-clamp on resize (in case window shrinks while button is roaming)
window.addEventListener('resize', () => {
    if (loginBtn.classList.contains('fullscreen-move')) {
        const rect = loginBtn.getBoundingClientRect();
        const p = clampToViewport(rect.left, rect.top);
        placeButton(p.left, p.top);
    }
});

username.addEventListener('input', () => { if (!isEmpty()) resetButton(); });
password.addEventListener('input', () => { if (!isEmpty()) resetButton(); });

rememberChk.addEventListener('change', () => { /* remember disabled intentionally */ });

document.querySelector('.login-container').addEventListener('submit', function(e) {
    if (isEmpty()) {
        e.preventDefault();
    msg.textContent = 'Pehle details daal bhoodi de ya.';
    msg.classList.add('visible');
    moveButtonRandom();
    } else {
        resetButton();
    msg.textContent = '';
    msg.classList.remove('visible');
    }
});
// Show/hide password
if (showPwdBtn) {
    showPwdBtn.addEventListener('click', () => {
        const showing = password.type === 'text';
        password.type = showing ? 'password' : 'text';
        showPwdBtn.textContent = showing ? 'Show' : 'Hide';
        showPwdBtn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });
}

// Utility to detach button when roaming
function ensureButtonDetached() {
    if (!loginBtn.classList.contains('fullscreen-move') || loginBtn.parentElement !== document.body) {
        document.body.appendChild(loginBtn);
    }
}

// ---------------- Background Dynamic Lines -----------------
(function initDynamicLines(){
    const canvas = document.getElementById('bgLines');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w=canvas.width=window.innerWidth; let h=canvas.height=window.innerHeight;
    // Cap DPR & slightly downscale internal resolution for perf
    const DPR = Math.min(window.devicePixelRatio || 1, 1.6);
    const INTERNAL_SCALE = 0.85; // reduce pixel work
    canvas.width=w*DPR*INTERNAL_SCALE; canvas.height=h*DPR*INTERNAL_SCALE; canvas.style.width=w+'px'; canvas.style.height=h+'px';
    ctx.scale(DPR*INTERNAL_SCALE,DPR*INTERNAL_SCALE);

    // Config
    // Increased density + micro layer
    // Start with moderate counts (will adapt down if needed)
    let LINE_COUNT = Math.min(120, Math.floor((w+h)/18));
    let MICRO_COUNT = Math.min(90, Math.floor((w+h)/22));
    const MAX_PATH_POINTS = 30;
    const palette = ['#4db8ff','#2f89c8','#6fd3ff','#1f6b99','#8be9ff'];

    const mouse = {x:-999,y:-999,active:false};
    window.addEventListener('mousemove', e=>{mouse.x=e.clientX; mouse.y=e.clientY; mouse.active=true;});
    window.addEventListener('mouseleave', ()=>{mouse.active=false; mouse.x=mouse.y=-999;});

    function rand(a,b){return Math.random()*(b-a)+a;}
    function randSign(){return Math.random()<.5?-1:1;}

    const lines=[]; // shared array (primary + micro)
    for(let i=0;i<LINE_COUNT;i++){
        const angle = rand(0,Math.PI*2);
        const speed = rand(.4,1.4);
        lines.push({
            x: rand(0,w),
            y: rand(0,h),
            vx: Math.cos(angle)*speed,
            vy: Math.sin(angle)*speed,
            baseSpeed: speed,
            thickness: rand(.6,1.9),
            color: palette[i%palette.length],
            zigTimer: 0,
            zigInterval: rand(220,480), // ms between sharp turns
            path: [],
            pathTimer:0,
            pathInterval: rand(28,55), // ms between recorded path points
            wobblePhase: rand(0,Math.PI*2),
            wobbleSpeed: rand(.8,1.8),
            life:0,
            hue: rand(180,240), // starting hue for subtle cycling
            hueSpeed: rand(2,8)/1000
        });
    }
    // Micro tracer lines (lighter, thinner, faster, shorter path)
    for(let i=0;i<MICRO_COUNT;i++){
        const angle = rand(0,Math.PI*2);
        const speed = rand(0.9,2.2);
        lines.push({
            x: rand(0,w),
            y: rand(0,h),
            vx: Math.cos(angle)*speed,
            vy: Math.sin(angle)*speed,
            baseSpeed: speed,
            thickness: rand(.35,.9),
            color: palette[(i+3)%palette.length],
            zigTimer: 0,
            zigInterval: rand(140,320),
            path: [],
            pathTimer:0,
            pathInterval: rand(18,38),
            wobblePhase: rand(0,Math.PI*2),
            wobbleSpeed: rand(1.2,2.4),
            life:0,
            micro:true,
            hue: rand(180,240),
            hueSpeed: rand(4,12)/1000
        });
    }

    function resize(){
        w=window.innerWidth; h=window.innerHeight; ctx.setTransform(1,0,0,1,0,0);
        canvas.width=w*DPR*INTERNAL_SCALE; canvas.height=h*DPR*INTERNAL_SCALE; canvas.style.width=w+'px'; canvas.style.height=h+'px';
        ctx.scale(DPR*INTERNAL_SCALE,DPR*INTERNAL_SCALE);
    }
    window.addEventListener('resize', resize);

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last=0; let paused=false; let intensityDim=0; // intensityDim -> 0 normal, 1 fully dim
    // Frame pacing target (cap ~32fps)
    const FRAME_INTERVAL = 1000/32; let acc=0;
    // Performance sampling
    const perf = {frames:0, accDt:0, window:60, degraded:false, lastAdjust:0};
    window.addEventListener('blur', ()=> paused=true);
    window.addEventListener('focus', ()=> {paused=false; last=performance.now();});
    // Dim animation when user focuses inside form
    const formEl = document.querySelector('.login-container');
    function setFocusDim(v){ intensityDim = v?0.55:0; }
    if(formEl){
        formEl.addEventListener('focusin', ()=>setFocusDim(true));
        formEl.addEventListener('focusout', ()=>setFocusDim(false));
    }
    let formRect = formEl ? formEl.getBoundingClientRect() : null;
    function updateFormRect(){ if(formEl) formRect = formEl.getBoundingClientRect(); }
    window.addEventListener('resize', updateFormRect);
    updateFormRect();
    function degrade(reason){
        if(perf.degraded) return;
        perf.degraded = true;
        document.body.dataset.perf = 'low';
        // Remove half of lines & all micro tracers
        for(let i=lines.length-1;i>=0;i--){ if(lines[i].micro || i%2===1) lines.splice(i,1); }
        // Loosen path intervals & lower opacity via intensity dim boost
        intensityDim = Math.max(intensityDim, 0.35);
        // Remove heavy layers if present
        const beam=document.querySelector('.beam-layer'); if(beam) beam.remove();
        const lens=document.getElementById('focusLens'); if(lens) lens.remove();
        if(!document.querySelector('.perf-badge')){
            const b=document.createElement('div'); b.className='perf-badge'; b.textContent='LOW PERF'; document.body.appendChild(b);
        }
        console.warn('[DynamicLines] Degraded performance mode:', reason);
    }
    function tick(ts){
        requestAnimationFrame(tick);
        if(paused) { last = ts; return; }
        if(!last) last=ts; let dt = ts-last; last=ts; // delta ms
        if(prefersReduced) dt *= 0.35; // slow down
        acc += dt; if(acc < FRAME_INTERVAL) return; // frame cap
        dt = acc; acc = 0;
        // Perf sample
        perf.frames++; perf.accDt += dt;
        if(perf.frames >= perf.window){
            const avg = perf.accDt / perf.frames; // ms per frame
            if(avg > 42) degrade('avg frame '+avg.toFixed(1)+'ms');
            else if(avg > 30 && !perf.degraded && ts - perf.lastAdjust > 2000){
                // Soft reduce: trim 25% of lines
                const target = Math.floor(lines.length*0.75);
                while(lines.length>target){ lines.splice(Math.floor(Math.random()*lines.length),1); }
                perf.lastAdjust = ts;
            }
            perf.frames = 0; perf.accDt = 0;
        }
        ctx.clearRect(0,0,w,h);
        ctx.globalCompositeOperation='lighter';

        for(const L of lines){
            L.life += dt;
            // Hue cycling -> convert to rgb via hsl
            L.hue = (L.hue + L.hueSpeed * dt * (L.micro?1.4:1)) % 360;
            const dynamicColor = 'hsl(' + L.hue.toFixed(1) + ' 70% ' + (L.micro? (55 + Math.sin(L.life*0.0008)*8) : (60 + Math.sin(L.life*0.0005)*6)) + '%)';
            // Zig-zag turning logic
            L.zigTimer += dt;
            if(L.zigTimer > L.zigInterval){
                L.zigTimer = 0;
                L.zigInterval = rand(180,520);
                const turnAngle = rand(Math.PI/6, Math.PI/3) * randSign();
                const cos = Math.cos(turnAngle), sin = Math.sin(turnAngle);
                const nvx = L.vx * cos - L.vy * sin;
                const nvy = L.vx * sin + L.vy * cos;
                L.vx = nvx; L.vy = nvy;
            }
            // Subtle continuous wobble
            L.wobblePhase += L.wobbleSpeed * dt * 0.0015;
            const wobbleMag = 0.35 + Math.min(1,(L.baseSpeed/1.4))*0.25;
            const wx = Math.cos(L.wobblePhase) * wobbleMag;
            const wy = Math.sin(L.wobblePhase*0.9) * wobbleMag;

            // Mouse influence (repel & accelerate)
            let speedScale = 1;
            if(mouse.active){
                const dx = L.x - mouse.x; const dy = L.y - mouse.y; const dist = Math.sqrt(dx*dx+dy*dy);
                if(dist < 260){
                    const repel = (1 - dist/260);
                    L.vx += (dx/dist)*repel*0.6;
                    L.vy += (dy/dist)*repel*0.6;
                    speedScale += repel*2.8;
                }
            }

            // Normalize velocity to base length after modifications
            const vlen = Math.sqrt(L.vx*L.vx + L.vy*L.vy) || 1;
            const target = L.baseSpeed * speedScale;
            L.vx = (L.vx / vlen) * target;
            L.vy = (L.vy / vlen) * target;

            // Update position
            L.x += (L.vx + wx) * (dt/16);
            L.y += (L.vy + wy) * (dt/16);

            // Wrap around edges with margin
            const margin = 40;
            let wrapped = false;
            if(L.x < -margin){ L.x = w + margin; wrapped = true; }
            else if(L.x > w + margin){ L.x = -margin; wrapped = true; }
            if(L.y < -margin){ L.y = h + margin; wrapped = true; }
            else if(L.y > h + margin){ L.y = -margin; wrapped = true; }
            if(wrapped) { // prevent long straight wrap connector
                L.path.length = 0; // clear path so no horizontal/vertical artifact line
            }

            // Nudge away from near axis-aligned directions to reduce obvious vertical/horizontal lines
            const axisThreshold = 0.18; // ratio threshold
            if(Math.abs(L.vx) < Math.abs(L.vy)*axisThreshold){
                L.vx += (L.vy>0?1:-1) * 0.12; // push sideways
            }
            if(Math.abs(L.vy) < Math.abs(L.vx)*axisThreshold){
                L.vy += (L.vx>0?1:-1) * 0.12; // push vertically
            }

            // Record path points (slower when degraded)
            L.pathTimer += dt * (perf.degraded ? 0.55 : 1);
            if(L.pathTimer > L.pathInterval){
                L.pathTimer = 0;
                L.path.push({x:L.x, y:L.y});
                const maxPts = L.micro ? Math.min(14, MAX_PATH_POINTS/2) : MAX_PATH_POINTS;
                if(L.path.length > maxPts) L.path.shift();
            }

            // Draw path polyline (fainter)
            if(L.path.length > 1){
                ctx.beginPath();
                ctx.moveTo(L.path[0].x, L.path[0].y);
                // Smooth with quadratic curves so fewer jagged segments
                for(let i=1;i<L.path.length-1;i++){
                    const midX = (L.path[i].x + L.path[i+1].x)/2;
                    const midY = (L.path[i].y + L.path[i+1].y)/2;
                    ctx.quadraticCurveTo(L.path[i].x, L.path[i].y, midX, midY);
                }
                const lastPt = L.path[L.path.length-1];
                ctx.lineTo(lastPt.x, lastPt.y);
                const first = L.path[0];
                const grad = ctx.createLinearGradient(first.x, first.y, lastPt.x, lastPt.y);
                grad.addColorStop(0, dynamicColor.replace('hsl','hsla').replace('%)', '% / 0.04)'));
                grad.addColorStop(.45, dynamicColor.replace('hsl','hsla').replace('%)', '% / 0.28)'));
                grad.addColorStop(.8, dynamicColor.replace('hsl','hsla').replace('%)', '% / 0.55)'));
                grad.addColorStop(1, dynamicColor.replace('hsl','hsla').replace('%)', '% / 0.82)'));
                ctx.strokeStyle = grad;
                ctx.lineWidth = Math.max(0.45, L.thickness * 0.55);
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.stroke();
            }

            // Draw head segment (highlight path being followed)
            const headLen = (L.micro ? 8 : 16) + L.thickness*7;
            const hx = L.x - L.vx; const hy = L.y - L.vy; // previous position approximation
            const gradHead = ctx.createLinearGradient(hx, hy, L.x, L.y);
            gradHead.addColorStop(0, dynamicColor.replace('hsl','hsla').replace('%)', '% / 0)'));
            gradHead.addColorStop(.55, dynamicColor.replace('hsl','hsla').replace('%)', '% / 0.7)'));
            gradHead.addColorStop(1, dynamicColor.replace('hsl','hsla').replace('%)', '% / 1)'));
            ctx.beginPath();
            ctx.strokeStyle = gradHead;
            ctx.lineWidth = L.thickness * (L.micro?1.0:1.4);
            ctx.moveTo(hx, hy);
            ctx.lineTo(L.x, L.y);
            ctx.stroke();

            // Glow node at head
            ctx.beginPath();
            // Convert hsl(h s l%) to hsla(h s l% / alpha)
            const alpha = L.micro ? 0.65 : 0.85;
            const hsla = dynamicColor.replace('hsl','hsla').replace(')', ' / ' + alpha + ')');
            ctx.fillStyle = hsla;
            ctx.arc(L.x, L.y, (L.thickness* (L.micro?1:1.15))+1, 0, Math.PI*2);
            ctx.fill();

            // If inside form area, reduce alpha gently (less distraction)
            if(formRect && L.x>formRect.left && L.x<formRect.right && L.y>formRect.top && L.y<formRect.bottom){
                ctx.save();
                ctx.globalCompositeOperation='destination-out';
                ctx.beginPath();
                ctx.arc(L.x, L.y, 6+(L.thickness*2),0,Math.PI*2);
                ctx.fill();
                ctx.restore();
            }
        }

        ctx.globalCompositeOperation='source-over';
        // Dim entire canvas when user is typing/focused
        if(intensityDim>0){
            ctx.fillStyle = 'rgba(15,32,39,'+(0.25*intensityDim)+')';
            ctx.fillRect(0,0,w,h);
        }
        // faint vignette still
        const fadeH = Math.min(160, h*0.18);
        const topGrad = ctx.createLinearGradient(0,0,0,fadeH);
        topGrad.addColorStop(0,'rgba(15,32,39,0.8)');
        topGrad.addColorStop(1,'rgba(15,32,39,0)');
        ctx.fillStyle = topGrad; ctx.fillRect(0,0,w,fadeH);
        const botGrad = ctx.createLinearGradient(0,h-fadeH,0,h);
        botGrad.addColorStop(0,'rgba(15,32,39,0)');
        botGrad.addColorStop(1,'rgba(15,32,39,0.85)');
        ctx.fillStyle = botGrad; ctx.fillRect(0,h-fadeH,w,fadeH);
    }
    requestAnimationFrame(tick);
})();
// -----------------------------------------------------------
