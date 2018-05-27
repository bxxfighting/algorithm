// 打开网站: http://alpha.editor.p5js.org/
// 复制代码，并执行
var snake;
var snakeNodeSize = 8;
var speed = 5;

function setup() {
  createCanvas(400, 400);
  stroke(255);
    snake = new Snake();
    snake.init(snakeNodeSize, speed, 3);
    frameRate(snake.speed);
    food = new Food();
    food.init(snakeNodeSize);
}

function draw() {
  background(255);
    fill(0);
    text(snake.score, 350, 10);
    frameRate(snake.speed);
    snake.display();
    food.gen();
    snake.move();
    if (food.x == snake.head.x && food.y == snake.head.y) {
        snake.eat(food);
    }
}

function SnakeNode() {
    this.x = 0;
    this.y = 0;
    this.direction = 1;
    this.size = 0;
    this.display = function() {
        rect(this.x, this.y, this.size, this.size);
    }
    this.move = function() {
        if (this.direction == 1) {
            this.x = this.x + this.size;
        } else if (this.direction == 2) {
            this.x = this.x - this.size;
        } else if (this.direction == 3) {
            this.y -= this.size;
        } else if (this.direction == 4) {
            this.y += this.size;
        }
    }
}

function Snake() {
    this.speed = 10;
    this.head = new SnakeNode();
    this.tail = this.head
    this.body = [];
    this.nodeSize = 4;
    this.score = 0;
    
    this.init = function(nodeSize, speed, length) {
        this.nodeSize = nodeSize;
        this.speed = speed;
        this.length = length;
        this.head = new SnakeNode();
        this.head.size = this.nodeSize;
        this.body.push(this.head);
    }
    
    this.display = function() {
        for (var i = 0; i < this.body.length; i ++) {
            this.body[i].display();
        }
    }
    
    
    this.setSpeed = function(speed) {
        this.speed = speed;
    }
    
    this.move = function() {
        this.tran();
        preX = this.head.x;
        preY = this.head.y;
        this.head.move();
        this.is_dead();

        if (this.body.length > 1) {
            for (var i = 1; i < this.body.length; i ++) {
                tmpX = this.body[i].x;
                tmpY = this.body[i].y;
                this.body[i].x = preX;
                this.body[i].y = preY;
                preX = tmpX;
                preY = tmpY;
            }
        }
    }
    
    this.tran = function() {
        if (keyIsPressed) {
            if (keyCode == 39 && (this.head.direction == 3 || this.head.direction == 4)) {
                this.head.direction = 1;
            } else if (keyCode == 37 && (this.head.direction == 3 || this.head.direction == 4)) {
                this.head.direction = 2;
            } else if (keyCode == 38 && (this.head.direction == 1 || this.head.direction == 2)) {
                this.head.direction = 3;
            } else if (keyCode == 40 && (this.head.direction == 1 || this.head.direction == 2)) {
                this.head.direction = 4;
            }
        }
    }
    
    this.eat = function (food) {
        food.exist = 0;
        this.score += 1;
        this.speed += 1;
        this.grow();
    }
    
    this.grow = function() {
        node = new SnakeNode();
        this.tail = this.body[this.body.length-1]
        node.size = this.nodeSize;
        if (this.tail.direction == 1) {
            node.x = this.tail.x - this.tail.size;
            node.y = this.tail.y;
        } else if (this.tail.direction == 2) {
            node.x = this.tail.x + this.tail.size;
            node.y = this.tail.y;
        } else if (this.tail.direction == 3) {
            node.x = this.tail.x;
            node.y = this.tail.y + this.tail.size;
        } else if (this.tail.direction == 4) {
            node.x = this.tail.x;
            node.y = this.tail.y - this.tail.size;
        }
        this.body.push(node);
    }
    
    this.is_dead = function () {
        if (this.head.x > width ||
                this.head.x < 0 ||
                this.head.y > height ||
                this.head.y < 0) {
            textAlign(CENTER);
            text("你完犊子了", width * 0.5, height * 0.5);
            noLoop();
        }
    }
}

function Food() {
    this.x = 0;
    this.y = 0;
    this.exist = 0;
    this.size = 0;

    this.init = function (size) {
        this.size = size;
    }
    this.gen = function() {
        if (this.exist == 0) {
            this.x = int(random() * (width - this.size));
            this.x = this.x + (this.size - this.x % this.size);
            this.x = min(this.x, width - this.size);
            this.y = int(random() * (height - this.size));
            this.y = this.y + (this.size - this.y % this.size);
            this.y = min(this.y, height - this.size);
            this.exist = 1;
        }
        rect(this.x, this.y, this.size, this.size);
    }
}
