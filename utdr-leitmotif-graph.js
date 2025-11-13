const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#1f1f1f";
ctx.fill();
ctx.beginPath();

class ball {
    constructor(x,y,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(...toScreenCoords(this.x,this.y), this.radius/zoom, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function drawEdge(x1,y1,x2,y2) {
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(...toScreenCoords(x1,y1));
    ctx.lineTo(...toScreenCoords(x2,y2));
    ctx.stroke();
}

SPRING_CONSTANT = 0.001
IDEAL = 100
PERMITTIVITY = 50
FRICTION = 0.1
GRAVITY = 0.001

var balls = {
    "A-1": new ball(0,0,20,"#b592db"),
    "A-2": new ball(0,50,20,"#b592db"),
    "A-3": new ball(50,50,20,"#b592db"),
    "A-4": new ball(0,-50,20,"#b592db"),
    "A-5": new ball(-50,0,20,"#b592db"),
    "A-6": new ball(-50,-50,20,"#b592db"),
}
var edges = {
    "A-1": ["A-2"],
    "A-2": ["A-1","A-3","A-4"],
    "A-3": ["A-2"],
    "A-4": ["A-2","A-5"],
    "A-5": ["A-4"],
    "A-6": [],
}

var xoffset = 0
var yoffset = 0
var zoom = 1
function* toScreenCoords(x,y) {
    yield (x-xoffset)/zoom+canvas.width/2
    yield (y-yoffset)/zoom+canvas.height/2 
}
function* fromScreenCoords(x,y) {
    yield (x-canvas.width/2)*zoom + xoffset
    yield (y-canvas.height/2)*zoom + yoffset
}

function clear() {
    ctx.fillStyle = "#1f1f1f88";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    Object.entries(balls).forEach(([id,ball]) => {
        Object.entries(balls).forEach(([idb,ballb]) => {
            if (edges[id].includes(idb)) {
                if (ball.x < ballb.x) {
                    drawEdge(ball.x,ball.y,ballb.x,ballb.y);
                }
            }
        })
    })

    Object.entries(balls).forEach(([id,ball]) => {
        ball.draw()
        if (id != draggedNode) {
            ball.x += ball.vx
            ball.y += ball.vy
            ball.vx += ball.ax
            ball.vy += ball.ay
            ball.ax = -GRAVITY*ball.x-FRICTION*ball.vx
            ball.ay = -GRAVITY*ball.y-FRICTION*ball.vy
            Object.entries(balls).forEach(([idb,ballb]) => {
                if (id != idb) {
                    dx = ball.x-ballb.x
                    dy = ball.y-ballb.y
                    dist = (dx**2 + dy**2)**0.5
                    if (edges[id].includes(idb)) {
                        let spring = -SPRING_CONSTANT*(dist-IDEAL)
                        ball.ax += spring*dx/dist
                        ball.ay += spring*dy/dist
                    } else {
                        let repulsion = PERMITTIVITY/dist**1.5
                        ball.ax += repulsion*dx/dist
                        ball.ay += repulsion*dy/dist
                    }
                }
            });
        }
    });

    raf = window.requestAnimationFrame(draw);
}

var isDragging = false
var dragxoffset = 0
var dragyoffset = 0
var origxoffset = 0
var origyoffset = 0
var draggedNode = null
canvas.onmousedown = event => {
    isDragging = true
    document.body.style.cursor = "move"
    dragxoffset = event.pageX
    dragyoffset = event.pageY
    
    draggedNode = null
    Object.entries(balls).forEach(([id,ball]) => {
        let [screenx,screeny] = toScreenCoords(ball.x,ball.y)
        let dist = ((event.pageX-screenx)**2+(event.pageY-screeny)**2)**0.5
        if (dist < ball.radius/zoom*1.5) {
            draggedNode = id
        }
    });
    
    if (draggedNode === null) {
        origxoffset = xoffset
        origyoffset = yoffset
    } else {
        [origxoffset, origyoffset] = toScreenCoords(balls[draggedNode].x,balls[draggedNode].y)
    }
}
canvas.onmousemove = event => {
    if (isDragging) {
        if (draggedNode === null) {
            xoffset = origxoffset+(dragxoffset-event.pageX)*zoom
            yoffset = origyoffset+(dragyoffset-event.pageY)*zoom
        } else {
            [balls[draggedNode].x, balls[draggedNode].y] = fromScreenCoords(origxoffset-dragxoffset+event.pageX,origyoffset-dragyoffset+event.pageY)
        }
    }
}
canvas.onmouseup = event => {
    isDragging = false
    draggedNode = null
    document.body.style.cursor = "auto"
}
document.onwheel = event => {
    let oldzoom = zoom
    let [x,y] = fromScreenCoords(event.pageX,event.pageY)
    zoom = Math.min(10,Math.max(0.1,zoom*2**(event.deltaY/1000)))
    let [newx,newy] = fromScreenCoords(event.pageX,event.pageY)
    xoffset += -newx+x
    yoffset += -newy+y
    //console.log(x,newx,y,newy,oldzoom,zoom)
    //xoffset = ((event.pageX - canvas.width/2)/oldzoom + xoffset)*(1-1/r) + xoffset*(1/r)
    //yoffset = ((event.pageY - canvas.height/2)/oldzoom + yoffset)*(1-1/r) + yoffset*(1/r)
}