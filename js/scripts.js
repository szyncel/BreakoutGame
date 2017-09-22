var canvas = document.getElementById('myCanvas'),
    context = canvas.getContext('2d');

setInterval(draw, 1000 / 60);

var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var speedX = 5;
var speedY = 3;
var ballRadius = 10;
var paddleWidth = 100;
var paddleHeight = 10;
var paddlePos = 100;
var leftPressed = false;
var rightPressed = false;
var score = 0;
var lives = 3;

var bricksColumns = 11;
var bricksRows = 5;


var bricks = [];
for (var i = 0; i < bricksColumns; i++) {
    bricks[i] = [];
    for (var j = 0; j < bricksRows; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}

function colissionDetection(x, y) {
    for (i = 0; i < bricksColumns; i++) {
        for (j = 0; j < bricksRows; j++) {
            var b = bricks[i][j];
            if (b.status === 1) {
                if (x > b.x && x < b.x + 80 && y > b.y && y < b.y + 35) {
                    b.status = 0;
                    score++;
                    if (y > b.y && y < b.y + 35) speedY = -speedY;
                    speedX = -speedX;
                    speedY = -speedY;
                }
            }
        }
    }
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    colissionDetection(ballX, ballY);

    if (ballY >= canvas.height - ballRadius) {
        if (ballX >= paddlePos && ballX <= paddlePos + paddleWidth) {
            speedX = -speedX;
            var deltaX = ballX - (paddlePos + paddleWidth / 2);
            speedY = deltaX * 0.15;
        } else {
            lives = lives - 1;
            if (lives === 0) {
                console.log('test');
                alert('Przegrałeś');
                document.location.reload();
            }
            resetBallPosition();
        }
    }
    if (ballY <= 0 + ballRadius) speedX = -speedX;
    if (ballX >= canvas.width - ballRadius || ballX <= 0 + ballRadius) speedY = -speedY;

    if (leftPressed && paddlePos >= 0) paddlePos -= 5;
    if (rightPressed && paddlePos <= canvas.width - paddleWidth) paddlePos += 5;


    ballY += speedX;
    ballX += speedY;
}

// sterowanie myszką
canvas.addEventListener('mousemove', function (event) {
    var mousePos = getMousePos(event);
    paddlePos = mousePos.x - (paddleHeight / 2);

});

document.addEventListener('keyup', function (e) {
    if (e.keyCode === 37) leftPressed = false;
    if (e.keyCode === 39) rightPressed = false;
}, false)

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37) leftPressed = true;
    if (e.keyCode === 39) rightPressed = true;
}, false)

function drawScore() {
    context.fillStyle = "#1E90FF";
    context.font = "20px Impact";
    context.fillText("Wynik:", 15, 30);
    context.fillStyle = "#FFFAFA";
    context.font = "24px Impact";
    context.fillText(score, 80, 32);

    context.fillStyle = "#1E90FF";
    context.font = "20px Impact";
    context.fillText("Życia:", canvas.width - 90, 30);
    context.fillStyle = "#FFFAFA";
    context.font = "24px Impact";
    context.fillText(lives, canvas.width - 30, 32);

    context.beginPath();
    context.fillStyle = '#1E90FF';
    context.fillRect(0, 45, canvas.width, 3);
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.fillStyle = '#1E90FF';
    context.fillRect(paddlePos, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.fillStyle = '#1E90FF';
    context.arc(ballX, ballY, 10, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}

function drawBricks() {
    for (i = 0; i < bricksColumns; i++) {
        for (j = 0; j < bricksRows; j++) {
            if (bricks[i][j].status === 1) {
                var brickX = i * (80 + 5) + 5;
                var brickY = j * (30 + 5) + 5 + 50;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                context.beginPath();
                context.fillStyle = '#1E90FF';
                context.fillRect(brickX, brickY, 80, 30);
                context.closePath();
            }
        }
    }
}

function resetBallPosition() {

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    speedX = 5;
    speedY = 3;
}


function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}






