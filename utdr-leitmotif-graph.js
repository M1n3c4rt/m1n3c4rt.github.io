const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
console.log("wawa");
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#1f1f1f";
ctx.fill();

class ball {
    constructor(x,y,id,radius,color) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color
        this.id = id;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x-xoffset+canvas.width/2, this.y-yoffset+canvas.height/2, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function drawEdge(x1,y1,x2,y2) {
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(x1-xoffset+canvas.width/2,y1-yoffset+canvas.height/2);
    ctx.lineTo(x2-xoffset+canvas.width/2,y2-yoffset+canvas.height/2);
    ctx.stroke();
}

SPRING_CONSTANT = 0.001
IDEAL = 100
PERMITTIVITY = 50
FRICTION = 0.1
GRAVITY = 0.001

balls = [
    new ball(0,0,"A-1",20,"#b592db"),
    new ball(0,50,"A-2",20,"#b592db"),
    new ball(50,50,"A-3",20,"#b592db"),
    new ball(0,-50,"A-4",20,"#b592db"),
    new ball(-50,0,"A-5",20,"#b592db"),
    new ball(-50,-50,"A-6",20,"#b592db"),
]
console.log(JSON.stringify(balls))
edges = {
    "A-1": ["A-2"],
    "A-2": ["A-1","A-3","A-4"],
    "A-3": ["A-2"],
    "A-4": ["A-2","A-5"],
    "A-5": ["A-4"],
    "A-6": [],
}
xoffset = 0
yoffset = 0

function clear() {
    ctx.fillStyle = "#1f1f1f88";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

i = 10
function draw() {
    clear();
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    if (i > 0) {console.log(i,JSON.stringify(balls))};
    i--;

    balls.forEach(ball => {
        balls.forEach(ballb => {
            if (edges[ball.id].includes(ballb.id)) {
                if (ball.x < ballb.x) {
                    drawEdge(ball.x,ball.y,ballb.x,ballb.y);
                }
            }
        })
    })

    balls.forEach(ball => {
        ball.draw()
        ball.x += ball.vx
        ball.y += ball.vy
        ball.vx += ball.ax
        ball.vy += ball.ay
        ball.ax = -GRAVITY*ball.x-FRICTION*ball.vx
        ball.ay = -GRAVITY*ball.y-FRICTION*ball.vy
        balls.forEach(ballb => {
            if (ball.id != ballb.id) {
                dx = ball.x-ballb.x
                dy = ball.y-ballb.y
                dist = (dx**2 + dy**2)**0.5
                if (edges[ball.id].includes(ballb.id)) {
                    spring = -SPRING_CONSTANT*(dist-IDEAL)
                    ball.ax += spring*dx/dist
                    ball.ay += spring*dy/dist
                } else {
                    repulsion = PERMITTIVITY/dist**1.5
                    ball.ax += repulsion*dx/dist
                    ball.ay += repulsion*dy/dist
                }
            }
        });
    });

    raf = window.requestAnimationFrame(draw);
}