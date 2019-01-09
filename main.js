let ball = [];
let po = [];
let star = [];
let yhball = [];
function setstar() {
    for (let r = 0; r < 500; r++) {
        let r = Math.floor(Math.random() * 10) * 55 + 200;
        let g = Math.floor(Math.random() * 10) * 55 + 200;
        let b = Math.floor(Math.random() * 10) * 55 + 200;
        let s = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 5 * r / 6000,
            color: `rgb(${r},${g},${b})`
        }
        star.push(s)
    }
}
function setball(e) {
    let v = Math.floor(Math.random() * 10) + 10;
    for (let r = 0; r < 1500; r++) {
        let vx = Math.round(Math.random() * 10) % 2 == 0 ? Math.random() * -12 : Math.random() * 12;
        let vy = Math.sqrt(Math.pow(v, 2) - Math.pow(vx, 2)) - Math.random() * 10;
        let r = Math.random() * 256;
        let g = Math.random() * 256;
        let b = Math.random() * 256;
        let s = {
            x: e.clientX,
            y: e.clientY,
            r: Math.random() * 30 * r / 1500,
            v: 20,
            vx: vx,
            vy: Math.round(Math.random() * 10) % 2 == 0 ? vy : -vy,
            g: Math.random() * 0.2,
            color: `rgb(${r},${g},${b})`
        }
        ball.push(s)
    }
}
function setyhball(e, color) {
    let v = Math.floor(Math.random() * 10) + 10;
    for (let r = 0; r < 100; r++) {
        let vx = Math.round(Math.random() * 10) % 2 == 0 ? Math.random() * -5 : Math.random() * 5;
        let vy = Math.sqrt(Math.pow(v, 2) - Math.pow(vx, 2)) - Math.random() * 10;
        let r = Math.floor(Math.random() * 10) * 55 + 200;
        let g = Math.floor(Math.random() * 10) * 55 + 200;
        let b = Math.floor(Math.random() * 10) * 55 + 200;
        let s = {
            x: e.clientX,
            y: e.clientY,
            r: Math.random() * 1 * r / 500,
            v: 20,
            vx: vx,
            vy: vy,
            g: Math.random() * 0.1,
            color,
            //color: `rgb(${r},${g},${b})`
        }
        yhball.push(s)
    }
}
function setyh(e) {
    let s = Math.floor(Math.random() * 10);
    let r = Math.random() * 256;
    let g = Math.random() * 256;
    let b = Math.random() * 256;
    let d = {
        x: Math.random() * window.innerWidth,
        y: window.innerHeight - 30,
        r: Math.random() * 5,
        vx: 0,
        vy: -8,
        g: 0.05,
        color: `rgb(${r},${g},${b})`
    }
    po.push(d)

}
let eve = null;
let cabout = {};

window.onload = () => {
    let canvas = document.getElementById('canvasId');
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    let ctx = canvas.getContext('2d');
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    cabout.width = window.innerWidth;
    cabout.heigth = window.innerHeight;
    canvas.addEventListener("mousemove", (e) => {
        eve = e;
        // setball(e)
    });
    show(ctx); //渲染UI
    setstar();//生成星空数据
    setInterval(() => {
        setyh(eve);
    }, 3000);
}

function show(ctx) {
    render(ctx, eve);
    update(eve, cabout);
    window.requestAnimationFrame(() => {
        show(ctx, eve, cabout);
    })
}
function render(ctx) {
    // var lineGradient = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight);
    // lineGradient.addColorStop(0, 'rgba(20,18,16,0.2)');
    // lineGradient.addColorStop(0.5, 'rgba(30,32,34,0.2)');
    // lineGradient.addColorStop(1, 'rgba(14,0,2,0.2)');

    ctx.fillStyle = "rgb(0,0,0,0.2)";
    ctx.fillRect(0, 0, ctx.width, ctx.height);

    renderYh(ctx);
    renderStar(ctx);
    //渲染爆炸粒子动画
    for (let i = 0; i < ball.length; i++) {
        if (ball.length > 500) {
            ball.splice(i, 1);
        }
        ctx.beginPath();
        ctx.fillStyle = ball[i].color;
        ctx.arc(ball[i].x, ball[i].y, ball[i].r, 0, 2 * Math.PI);
        ctx.fill();
    }

}
//渲染城市背景图
function renderbg(ctx) {
    ctx.drawImage("./image/city.png")
}
function renderYh(ctx) {
    //渲染烟花上升
    for (let c = 0; c < po.length; c++) {
        ctx.beginPath();
        ctx.fillStyle = po[c].color;
        ctx.arc(po[c].x, po[c].y, po[c].r, 0, 2 * Math.PI);
        ctx.fill();
        setyhball({ clientX: po[c].x, clientY: po[c].y }, po[c].color); //渲染烟花周围的花火
    }
    renderYhball(ctx);

}
function renderYhball(ctx) {

    for (let c = 0; c < yhball.length; c++) {

        ctx.beginPath();
        ctx.fillStyle = yhball[c].color;
        ctx.arc(yhball[c].x, yhball[c].y, yhball[c].r, 0, 2 * Math.PI);
        ctx.fill();
        if (yhball.length > 50) {
            yhball.splice(c, 1);
        }
    }
}
function renderStar(ctx) {
    //渲染星星
    for (let g = 0; g < star.length; g++) {
        ctx.beginPath();
        ctx.fillStyle = star[g].color;
        ctx.arc(star[g].x, star[g].y, star[g].r, 0, 2 * Math.PI);
        ctx.fill();
    }
}
//渲染爆炸粒子
function update(eve, cabout) {

    for (let s = 0; s < ball.length; s++) {
        ball[s].x += ball[s].vx;
        ball[s].y += ball[s].vy;
        ball[s].vy += ball[s].g;
        //下边缘检测
        if (ball[s].y >= cabout.heigth - ball[s].r) {
            ball[s].y = cabout.heigth - ball[s].r;
            ball[s].vy = -Math.abs(ball[s].vy) + 20;
            if (Math.abs(ball[s].vy) <= 1) {
                ball[s].vy = 0;
            }
        }
        // //上边缘检测
        // if (ball[s].y <= ball[s].r) {
        //     ball[s].y = ball[s].r;
        //     ball[s].vy = -Math.abs(ball[s].vy) + 20;
        //     if (Math.abs(ball[s].vy) <= 1) {
        //         ball[s].vy = 0;
        //     }
        // }
        // //左边缘检测
        // if (ball[s].x <= ball[s].r) {
        //     if (ball.length > 1000) {
        //         ball.splice(s, 1);
        //     }
        //     ball[s].x = ball[s].r;
        //     ball[s].vx = - ball[s].vx;
        // }
        // //右边缘检测
        // if (ball[s].x >= cabout.width - ball[s].r) {
        //     if (ball.length > 1000) {
        //         ball.splice(s, 1);
        //     }
        //     ball[s].x = cabout.width - ball[s].r;
        //     ball[s].vx = - ball[s].vx;
        // }
        // if (eve) {
        //     let x = eve.clientX, y = eve.clientY;
        //     if (Math.pow((x - ball[s].x), 2) + Math.pow((y - ball[s].y), 2) <= Math.pow((ball[s].r + 10), 2)) {
        //         ball[s].x = ball[s].x;
        //         ball[s].y = ball[s].y;
        //         ball[s].vx = -ball[s].vx - 10;
        //         ball[s].vy = -ball[s].vy - 10;
        //     }
        // }
    }
    updatepo();
    updatehuball();
    updatestar(eve);
}
//渲染烟花
function updatepo() {
    for (let s = 0; s < po.length; s++) {
        if (po[s].x < window.innerWidth / 2) {
            //po[s].x += po[s].vx + Math.random() * 5;
            po[s].x += po[s].vx + 1;
        }
        else {
            //po[s].x += po[s].vx - Math.random() * 5;
            po[s].x += po[s].vx - 1
        }
        po[s].y += po[s].vy;
        po[s].vy += po[s].g;
        if (Math.abs(po[s].vy) <= 1) {
            let x = po[s].x, y = po[s].y;
            po.splice(s, 1);
            setball({ clientX: x, clientY: y });
        }
    }
}
//渲染烟花的火花
function updatehuball() {
    for (let s = 0; s < yhball.length; s++) {
        yhball[s].x += yhball[s].vx;
        yhball[s].y += yhball[s].vy;
        yhball[s].vy += yhball[s].g;
    }
}
//渲染星星
function updatestar(eve) {
    let center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    for (let s = 0; s < star.length; s++) {
        if (eve) {
            star[s].x += -(eve.clientX - center.x) / (window.innerWidth - 300);
            star[s].y += -(eve.clientY - center.y) / (window.innerHeight - 300);
        }
        else {
            star[s].x += Math.floor(Math.random() * 10) % 2 == 0 ? Math.random() * 0.5 : -Math.random() * 0.5;
            star[s].y += Math.floor(Math.random() * 10) % 2 == 0 ? Math.random() * 0.5 : -Math.random() * 0.5;
        }
    }
}