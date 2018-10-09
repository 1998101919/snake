//点击开始游戏 --> 开始按钮消失
//随机出现一个小苹果 出现三节蛇开始运动
//可以通过上下左右键来操作蛇
//判断是否吃到了失误 吃到了失误 蛇的自身加1
//如果碰到自己或者边框 游戏结束
//蛇向右运动 每一位x+1 y不变 向左运动 x-1 y不变 向上运动 y-1 x不变 向下运动 y+1 心不变

var content = document.getElementsByClassName('content')[0];
var startP = document.getElementById('startP');
var startButton = document.getElementsByClassName('startBtn')[0];
var strong = document.getElementsByTagName('strong')[0];
var loser = document.getElementsByClassName('loser')[0];
var span = document.getElementsByTagName('span')[0];
var close = document.getElementsByClassName('close')[0];
var leftSlider = document.getElementsByClassName('left-slider')[0];
var speed = 100;
var moveTimer;
var count = 0;
var startGameBool = true;
var startPauseBool = true;
var startBool = true;
//初始化值
init()
function init() {
    //获取游戏区域
    this.mapWidth = parseInt(window.getComputedStyle(content, null).width)
    this.mapHeight = parseInt(window.getComputedStyle(content, null).height)
    this.contentDiv = content;
    //初始食物
    this.foodWidth = 20;
    this.foodHeight = 20;
    this.foodX = 0;
    this.foodY = 0;
    //初始化蛇
    this.snakeWidth = 20;
    this.snakeHeight = 20;
    this.snakeBody = [[4, 1, 'head'], [3, 1, 'body'], [2, 1, 'body']]
    //方向的默认值
    this.direction = 'right';
    this.left = false;
    this.up = true;
    this.right = false;
    this.down = true;
    this.count = 0;
    bindEvent()
}


function startBtn() {
    startButton.style.display = 'none';
    startP.style.display = 'block'

    food()
    snake()
}

//随机生成食物
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodWidth + 'px';
    food.style.height = this.foodHeight + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random() * (this.mapWidth / 20))
    this.foodY = Math.floor(Math.random() * (this.mapHeight / 20))
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.contentDiv.appendChild(food).setAttribute('class', 'food')
}
//生成蛇的部分
function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeWidth + 'px';
        snake.style.height = this.snakeHeight + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2])
        this.contentDiv.appendChild(snake).classList.add('snake')
        switch (this.direction) {
            case 'right':
                break;
            case 'left':
                snake.style.transform = 'rotate(180deg)';
                break;
            case 'up':
                snake.style.transform = 'rotate(270deg)';
                break;
            case 'down':
                snake.style.transform = 'rotate(90deg)';
                break;
            default:
                break;
        }
    }   

}
//蛇移动
function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch (this.direction) {
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default:
            break;
    }
    removeClass('snake')
    snake()
    //当碰到食物的时候
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
        count += 1
        strong.innerHTML = count
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        removeClass('food')
        food()
        switch (this.direction) {
            case 'right':
                this.snakeBody.push([screenX + 1,snakeEndY,'body'])
                break;
            case 'left':
                this.snakeBody.push([screenX - 1,snakeEndY,'body'])
                break;
            case 'up':
                this.snakeBody.push([screenX,snakeEndY - 1,'body'])
                break;
            case 'down':
                this.snakeBody.push([screenX,snakeEndY + 1,'body'])
                break;
            default:
                break;
        }
    }
    //当碰到墙壁的时候
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] > (this.mapWidth / 20) || this.snakeBody[0][1] < 0 || this.snakeBody[0][1] > (this.mapHeight / 20)){
        reloadGame()
    }
    //碰到自身 首先先取到蛇头的位置
    var snakeHeaderWidth = this.snakeBody[0][0];
    var snakeHeaderHeight = this.snakeBody[0][1];
    for(var i = 1; i < this.snakeBody.length; i++){
        if(snakeHeaderWidth == this.snakeBody[i][0] && snakeHeaderHeight == this.snakeBody[i][1]){
            reloadGame()
        }
    }
 
}
//移除class
function removeClass(className) {
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0])
    }
}
//重新开始游戏
function reloadGame() {
    removeClass('snake')
    removeClass('food')
    clearInterval(moveTimer)
    leftSlider.style.display = 'block'
    this.snakeBody = [[4, 1, 'head'], [3, 1, 'body'], [2, 1, 'body']]
    this.direction = 'right';
    this.left = false;
    this.up = true;
    this.right = false;
    this.down = true;
    strong.innerHTML = 0;
    loser.style.display = 'block';
    startP.setAttribute('src','./img/start.png')
    span.innerHTML = count;
    startGameBool = true;
    startPauseBool = true;
}

//switch对应的ascll码
function setCode(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direction = 'left';
                this.left = false;
                this.up = true;
                this.right = false;
                this.down = true;
            }
            break;
        case 38:
            if (this.up) {
                this.direction = 'up';
                this.left = true;
                this.up = false;
                this.right = true;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direction = 'right';
                this.left = false;
                this.up = true;
                this.right = false;
                this.down = true;
            }
            break;
        case 40:
            if (this.down) {
                this.direction = 'down';
                this.left = true;
                this.up = false;
                this.right = true;
                this.down = false;
            }
            break;
        default:
            break;
    }
}
//监控键盘按键
function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setCode(code)
    }
    close.onclick = function () {
        loser.style.display = 'none'
    }
    startButton.onclick = function () {
        startAndPause()
    }
    startP.onclick = function () {
        startAndPause()
    }
}

function startAndPause() {
    if(startPauseBool){
        if(startGameBool){
            startBtn()
            startGameBool = false
        }
        startP.setAttribute('src','./img/pause.png')
        loser.style.display = 'none';
        moveTimer = setInterval(function () {
            move()
        }, speed)
        startPauseBool = false;
    }else{
        startP.setAttribute('src','./img/start.png')
        clearInterval(moveTimer)
        startPauseBool = true;
    }
}


