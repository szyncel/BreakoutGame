var canvas = document.getElementById('myCanvas'),
    context = canvas.getContext('2d');

setInterval(draw, 10);

var ballX = 400;
var ballY = 100;
var speedX = -2;
var speedY = 2;
var ballRadius = 10;
var paddleWidth = 100;
var paddleHeight = 10;
var paddlePos = 100;
var leftPressed = false;
var rightPressed = false;


var bricks = []
for (var i = 0; i < 5; i++) {
    bricks[i] = [];
    for (var j = 0; j < 3; j++) {
        bricks[i][j] = { x: 0, y: 0, status: 1 };
    }
}

function colissionDetection(x, y) {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 3; j++) {
            var b = bricks[i][j];
            if (b.status === 1) {
                if (x > b.x && x < b.x + 80 && y > b.y && y < b.y + 20) {
                    console.log('cos???omfg?');
                    b.status = 0;
                    // speedX = -speedX;
                    speedY = -speedY;

                }
            }




        }
    }
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();

    colissionDetection(ballX, ballY);


    if (ballY >= canvas.height - ballRadius) {
        if (ballX >= paddlePos && ballX <= paddlePos + paddleWidth) {
            speedX = -speedX;
        } else {

            speedX = -speedX;
            // alert('test');
            // document.location.reload();
            console.log("Przegrana");
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
    console.log(bricks);
    if (e.keyCode === 37) leftPressed = false;
    if (e.keyCode === 39) rightPressed = false;
}, false)

document.addEventListener('keydown', function (e) {
    if (e.keyCode === 37) leftPressed = true;
    if (e.keyCode === 39) rightPressed = true;
}, false)


function drawPaddle() {
    context.beginPath();
    context.fillStyle = 'green';
    context.fillRect(paddlePos, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    context.closePath();
}

function drawBall() {
    context.beginPath();
    context.fillStyle = 'green';
    context.arc(ballX, ballY, 10, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}

function drawBricks() {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 3; j++) {
            if (bricks[i][j].status === 1) {
                var brickX = i * 95 + 10;
                var brickY = j * 30 + 10;
                bricks[i][j].x = brickX;
                bricks[i][j].y = brickY;
                context.beginPath();
                context.fillStyle = 'green';
                context.fillRect(brickX, brickY, 80, 20);
                context.closePath();
            }


        }
    }
}

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}






