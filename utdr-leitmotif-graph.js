const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const data = {
    "once_upon_a_time_A": [
        "A-1",
        "A-2",
        "A-12",
        "A-13",
        "A-54",
        "A-55",
        "A-71",
        "A-73",
        "A-85",
        "A-87",
        "A-89",
        "A-92",
        "A-93",
        "A-95",
        "A-96",
        "A-101",
        "B-38",
        "B-40",
        "C-44",
        "C-46"
    ],

    "once_upon_a_time_B": [
        "A-1",
        "A-12",
        "A-13",
        "A-54",
        "A-55",
        "A-71",
        "A-85",
        "A-92",
        "A-96"
    ],

    "once_upon_a_time_C": [
        "A-1",
        "A-85",
        "A-87",
        "A-89",
        "A-91",
        "A-92",
        "A-93",
        "A-96",
        "B-2",
        "B-38",
        "B-44"
    ],

    "once_upon_a_time_embellishment": [
        "A-54",
        "A-55",
        "A-71",
        "A-87",
        "A-89",
        "A-96"
    ],

    "flowey": [
        "A-3",
        "A-79",
        "A-80",
        "A-87",
        "A-89",
        "A-96"
    ],

    "toriel": [
        "A-4",
        "A-85",
        "A-95"
    ],

    "ruins": [
        "A-5",
        "A-31",
        "A-33",
        "A-45",
        "A-46",
        "D-51",
        "D-52",
        "D-58",
        "D-69"
    ],

    "ruins_variation": [
        "A-81",
        "A-86",
        "A-94",
        "A-95",
        "A-97",
        "A-98"
    ],

    "uwa___so": [
        "A-6",
        "A-18",
        "A-52",
        "D-22"
    ],

    "enemy_approaching": [
        "A-7",
        "A-9",
        "A-14",
        "A-95"
    ],

    "dogsong": [
        "A-21",
        "A-43",
        "A-44"
    ],

    "ghost_fight_A": [
        "A-10",
        "A-19",
        "A-36",
        "D-71"
    ],

    "ghost_fight_B": [
        "A-10",
        "A-36",
        "A-37",
        "A-59",
        "A-102",
        "C-43"
    ],

    "determination": [
        "A-11",
        "A-77"
    ],

    "sans": [
        "A-15",
        "A-63",
        "A-72",
        "A-95",
        "C-42"
    ],

    "papyrus": [
        "A-16",
        "A-24",
        "A-72",
        "A-95"
    ],

    "snowdin_A": [
        "A-17",
        "A-22",
        "A-23",
        "A-25",
        "A-27",
        "A-95"
    ],

    "snowdin_B": [
        "A-22",
        "A-23",
        "A-25",
        "A-27",
        "A-56",
        "A-87",
        "A-92",
        "A-95",
        "B-3",
        "B-37",
        "D-41"
    ],

    "undyne": [
        "A-26",
        "A-30",
        "A-32",
        "D-51",
        "D-52"
    ],

    "undyne_variation": [
        "A-45",
        "A-46",
        "A-77",
        "A-95",
        "D-56",
        "D-58",
        "D-69"
    ],

    "another_medium": [
        "A-5",
        "A-31",
        "A-51",
        "A-65",
        "A-68",
        "A-95"
    ],

    "alphys_A": [
        "A-35",
        "A-48",
        "A-83"
    ],

    "alphys_B": [
        "A-48",
        "A-83"
    ],

    "alphys_C": [
        "A-48",
        "A-82",
        "A-83"
    ],

    "it_s_showtime_": [
        "A-49",
        "A-50",
        "A-57",
        "A-58",
        "A-68"
    ],

    "metal_crusher": [
        "A-50",
        "A-66",
        "A-68"
    ],

    "hotel": [
        "A-59",
        "A-54",
        "A-55",
        "A-64"
    ],

    "oh_": [
        "A-61",
        "A-62",
        "A-69"
    ],

    "asriel": [
        "A-34",
        "A-71",
        "A-73",
        "A-80",
        "A-90"
    ],

    "asgore": [
        "A-76",
        "A-77",
        "A-95"
    ],

    "your_best_nightmare": [
        "A-78",
        "A-79",
        "A-88"
    ],

    "home": [
        "A-12",
        "A-13",
        "B-38",
        "C-44"
    ],

    "heartache": [
        "A-14",
        "A-77"
    ],

    "spooktune": [
        "A-38",
        "A-39",
        "D-53"
    ],

    "jingle_bells": [
        "A-40",
        "C-19"
    ],

    "battle_against_a_true_hero": [
        "A-98",
        "A-99",
        "C-39"
    ],

    "dummy" : [
        "A-36",
        "C-39"
    ],

    "snowdin_town" : [
        "A-22",
        "D-41"
    ],

    "it_s_raining_somewhere_else" : [
        "A-63",
        "D-70"
    ],

    "don_t_forget_A" : [
        "B-2",
        "B-13",
        "B-19",
        "B-34",
        "B-39",
        "C-1",
        "C-36",
        "C-45",
        "D-40",
        "D-50",
        "D-57",
        "D-64",
        "D-74"
    ],

    "don_t_forget_B" : [
        "B-2",
        "B-3",
        "B-13",
        "B-19",
        "B-33",
        "B-34",
        "B-36",
        "B-37",
        "B-39",
        "C-1",
        "C-36",
        "C-44",
        "C-45",
        "D-20",
        "D-40",
        "D-41",
        "D-43",
        "D-49",
        "D-50",
        "D-57",
        "D-64",
        "D-68",
        "D-74"
    ],

    "hometown" : [
        "B-3",
        "B-37",
        "D-41"
    ],

    "the_door" : [
        "B-5",
        "B-7",
        "D-30"
    ],

    "the_legend_A" : [
        "B-8",
        "C-3",
        "D-39",
        "D-49",
        "D-60",
        "D-73"
    ],

    "the_legend_B" : [
        "B-8",
        "B-11",
        "C-3",
        "D-39",
        "D-43",
        "D-49",
        "D-60",
        "D-63"
    ],

    "the_legend_C" : [
        "B-8",
        "B-11",
        "B-30",
        "C-3"
    ],

    "lancer_A" : [
        "B-9",
        "B-16",
        "B-20",
        "B-21",
        "B-25",
        "B-30",
        "C-28",
        "D-9"
    ],

    "lancer_B" : [
        "B-9",
        "B-20",
        "B-21",
        "C-28",
        "C-29"
    ],

    "hip_shop" : [
        "B-28",
        "D-14",
        "D-26",
        "D-32"
    ],

    "the_world_revolving_A" : [
        "B-33",
        "C-39",
        "D-58",
        "D-77"
    ],

    "the_world_revolving_B" : [
        "B-32",
        "B-33",
        "C-41"
    ],

    "lost_girl_A" : [
        "C-2",
        "C-30",
        "C-31",
        "D-20",
        "D-46"
    ],

    "lost_girl_B" : [
        "C-2",
        "C-30",
        "C-31"
    ],

    "queen_A" : [
        "C-5",
        "C-7",
        "C-15",
        "C-20",
        "C-24",
        "C-26",
        "C-32",
        "C-33",
        "C-35",
        "D-44"
    ],

    "queen_B" : [
        "C-5",
        "C-24",
        "C-26"
    ],

    "queen_C" : [
        "C-7",
        "C-20",
        "C-32",
        "C-33"
    ],

    "queen_D" : [
        "C-20",
        "C-32"
    ],

    "sweet_cap_n_cakes_A" : [
        "C-6",
        "C-8",
        "C-11",
        "C-12",
        "C-17",
        "C-18"
    ],

    "sweet_cap_n_cakes_B" : [
        "C-11",
        "C-13",
        "C-18",
        "C-19"
    ],

    "berdly_A" : [
        "C-14",
        "C-15",
        "C-25",
        "C-32",
        "C-35",
        "D-44"
    ],

    "berdly_B" : [
        "C-14",
        "C-15",
        "C-25",
        "C-32"
    ],

    "hey_every_" : [
        "C-21",
        "C-40",
        "D-2",
        "D-28",
        "D-32",
        "D-76"
    ],

    "spamton_A" : [
        "C-22",
        "C-23",
        "C-38",
        "C-39",
        "D-76",
        "D-77"        
    ],

    "spamton_B" : [
        "C-23",
        "C-39",
        "D-76"
    ],

    "tenna" : [
        "D-2",
        "D-3",
        "D-4",
        "D-5",
        "D-6",
        "D-7",
        "D-8",
        "D-12",
        "D-13",
        "D-16",
        "D-23",
        "D-24",
        "D-25",
        "D-26",
        "D-27",
        "D-33",
        "D-76"
    ],

    "dark_sanctuary" : [
        "D-49",
        "D-50",
        "D-55",
        "D-66",
        "D-67",
        "D-68",
        "D-72"
    ],

    "gerson_boom" : [
        "D-51",
        "D-56",
        "D-58",
        "D-69"
    ],

    "titan" : [
        "D-65",
        "D-66",
        "D-67",
        "D-68"
    ],

    "the_dark_truth" : [
        "B-23",
        "B-24",
        "C-36",
        "D-64",
        "D-72"
    ],

    "susie" : [
        "B-4",
        "B-24"
    ],

    "field_of_hopes_and_dreams" : [
        "B-13",
        "B-19"
    ],

    "fanfare" : [
        "B-14",
        "D-28"
    ],

    "quiet_autumn" : [
        "B-18",
        "B-19"
    ],

    "rouxls_kaard" : [
        "B-26",
        "C-29"
    ],

    "darkness_falls" : [
        "B-31",
        "C-16"
    ],

    "card_castle" : [
        "B-22",
        "B-25",
        "B-30"
    ],

    "the_holy_A" : [
        "B-35",
        "D-33"
    ],

    "the_holy_B" : [
        "B-35",
        "D-1",
        "D-32"
    ],

    "cyber_world" : [
        "C-6",
        "C-17"
    ],

    "powers_combined" : [
        "C-34",
        "C-35",
        "D-44"
    ],

    "digital_roots" : [
        "C-37",
        "D-36"
    ],

    "flashback" : [
        "D-1",
        "D-34"
    ],

    "doom_board" : [
        "D-24",
        "D-25",
        "D-27"
    ],

    "king_of_rolypoly" : [
        "D-21",
        "D-26",
        "D-27"
    ],

    "the_second_sanctuary" : [
        "D-60",
        "D-63"
    ],

    "mike" : [
        "D-75",
        "D-76"
    ],

    "girl_next_door_bassline" : [
        "C-2",
        "D-42",
        "D-45"
    ]
}

orphans = [
  "A-8",
  "A-20",
  "A-28",
  "A-29",
  "A-41",
  "A-42",
  "A-47",
  "A-53",
  "A-60",
  "A-67",
  "A-70",
  "A-74",
  "A-75",
  "A-84",
  "A-100",
  "B-1",
  "B-6",
  "B-10",
  "B-12",
  "B-15",
  "B-17",
  "B-27",
  "B-29",
  "C-4",
  "C-9",
  "C-10",
  "C-27",
  "C-47",
  "D-10",
  "D-11",
  "D-15",
  "D-17",
  "D-18",
  "D-19",
  "D-29",
  "D-31",
  "D-35",
  "D-37",
  "D-38",
  "D-47",
  "D-48",
  "D-54",
  "D-59",
  "D-61",
  "D-62",
  "D-78"
]

ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
ctx.rect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#1f1f1f";
ctx.fill();
ctx.beginPath();

class ball {
    constructor(x,y,radius,id,color) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.id = id
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
        ctx.textAlign = "center"
        ctx.font = `${30/zoom}px pixeloperator`
        ctx.fillStyle = "#ffffff";
        let [sx,sy] = toScreenCoords(this.x,this.y)
        ctx.fillText(this.id,sx,sy+3/zoom*this.radius);
    }
}

function drawEdge(x1,y1,x2,y2) {
    ctx.strokeStyle = "#aaaacc";
    ctx.beginPath();
    ctx.moveTo(...toScreenCoords(x1,y1));
    ctx.lineTo(...toScreenCoords(x2,y2));
    ctx.stroke();
}

SPRING_CONSTANT = 0.0025
IDEAL = 100
PERMITTIVITY = 250
FRICTION = 0.1
GRAVITY = 0.0001

// var balls = {
//     "A-1": new ball(0,0,20,"A-1","#b592db"),
//     "A-2": new ball(0,50,20,"A-2","#b592db"),
//     "A-3": new ball(50,50,20,"A-3","#b592db"),
//     "A-4": new ball(0,-50,20,"A-4","#b592db"),
//     "A-5": new ball(-50,0,20,"A-5","#b592db"),
//     "A-6": new ball(-50,-50,20,"A-6","#b592db"),
// }
// var edges = {
//     "A-1": ["A-2"],
//     "A-2": ["A-1","A-3","A-4"],
//     "A-3": ["A-2"],
//     "A-4": ["A-2","A-5"],
//     "A-5": ["A-4"],
//     "A-6": [],
// }
var balls = {}
var edges = {}

Object.entries(data).forEach(([motif,tracks]) => {
    balls[motif] = new ball(Math.random()*500-250,Math.random()*500-250,20,motif,"#643db9")
    edges[motif] = []
    tracks.forEach(track => {
        balls[track] = new ball(Math.random()*500-250,Math.random()*50-250,15,track,"#b592db")
        edges[motif].push(track)
        if (edges[track]) {
            edges[track].push(motif)
        } else {
            edges[track] = [motif]
        }
    });
});
orphans.forEach(orphan => {
    balls[orphan] = new ball(Math.random()*500-250,Math.random()*50-250,15,orphan,"#9797b3")
    edges[orphan] = []
});
console.log(JSON.stringify(balls))

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
                        let spring = Math.max(-1000,Math.min(1000,-SPRING_CONSTANT*(dist-IDEAL)))
                        ball.ax += spring*dx/dist
                        ball.ay += spring*dy/dist
                    } else {
                        let repulsion = Math.min(1000,PERMITTIVITY/dist**1.5)
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
            xoffset = Math.min(10000,Math.max(-10000,origxoffset+(dragxoffset-event.pageX)*zoom))
            yoffset = Math.min(5000,Math.max(-5000,origyoffset+(dragyoffset-event.pageY)*zoom))
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
canvas.onmouseleave = event => {
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