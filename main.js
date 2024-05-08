const main = document.getElementById("main");
const ctx = main.getContext("2d");

var gap = 90;
var xPos = 10;
var yPos = 150;
var grav = 1.5;
var score = 0;

var bird = document.getElementById("bird");
var mainImg = document.getElementById("bg");
var fg = document.getElementById("fg");
var pipeUp = document.getElementById("pipeUp");
var pipeDown = document.getElementById("pipeDown");

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 32;
}

var pipe = [];

pipe[0] = {
    x: main.width,
    y: 0
};

function draw() {
    ctx.drawImage(mainImg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        pipe[i].x--;
        if (pipe[i].x == 110) {
            pipe.push({
                x: main.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }
        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= main.height - fg.height) {
            location.reload();
        }
        if(pipe[i].x == 5) {
            score += 1;
        }
    }

    ctx.drawImage(fg, 0, main.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;
    ctx.fillStyle = "white";
    ctx.font = "24px Verdana";
    ctx.fillText(score, 10, main.height - 20);
    requestAnimationFrame(draw);
}

mainImg.onload = draw;