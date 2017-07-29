// Size of the "grid"
var numRows  = 6;
var numCols = 5;

// Create a two dimensional boolean array to save the obstacles positions
var hasObstacle = [];
for (var i = 0; i < numRows; i++) {
    hasObstacle[i] = [];
    for (var j = 0; j < numCols; j++) {
        hasObstacle[i][j] = false;
    }
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.reset();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    this.col = Math.floor((this.x +50) / 101);

    // If the enemy reaches the end of canvas, 
    // put it back at the beginning at a random row and speed
    if (this.x > ctx.canvas.clientWidth) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    var y = hasObstacle[this.row][this.col] ? this.y -15 : this.y;
    ctx.drawImage(Resources.get(this.sprite), this.x, y);
};

Enemy.prototype.reset = function() {
    // Set the initial enemy's position
    this.x = -100;
    this.row = getRandomInt(1,3);
    this.y = this.row * 83 -20;

    // Initial enemy's speed
    this.speed = getRandomInt(100,400);
};

var Obstacle = function () {
    this.sprite = 'images/Rock.png';
    this.reset();
}

Obstacle.prototype.reset = function() {
    this.row = getRandomInt(1, 3);
    this.col = getRandomInt(0, numCols -1);
    hasObstacle[this.row][this.col]  = true;
}

Obstacle.prototype.update = function() {
    this.x = this.col * 101;
    this.y = this.row * 83 -20;
}

Obstacle.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.win = false;
    this.reset();
};

// Update the player's position
Player.prototype.update = function() {
    this.x = this.col * 101;
    this.y = this.row * 83 -12;
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    // Set the initial player's position
    this.row = 5;
    this.col = 2;
};

// Handle the keyborard input
Player.prototype.handleInput = function(key) {
    var row = this.row;
    var col = this.col;

    switch (key) {
        case 'up':
            row--;
            break;
        case 'down':
            row++;
            break;
        case 'left':
            col--;
            break;
        case 'right':
            col++;
            break;
    }

    // check conditions that discards the move
    if (
        this.win || 
        row < 0 || row > numRows -1 ||
        col < 0 || col > numCols -1 ||
        hasObstacle[row][col]
    ) {
        return;
    }

    if (row === 0) {
        this.win = true;
    }

    this.row = row;
    this.col = col;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy];

var player = new Player;

var obstacles = [];
for (var i = 0; i < 4; i++) {
    obstacles.push(new Obstacle);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Get a random integer between min and max (both inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
