// Size of the "grid"
var numRows  = 6;
var numCols = 5;

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

    // If the enemy reaches the end of canvas, 
    // put it back at the beginning at a random row and speed
    if (this.x > ctx.canvas.clientWidth) {
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    // Set the initial enemy's position
    this.x = -100;
    this.row = getRandomInt(1,3);
    this.y = this.row * 83 -20;

    // Initial enemy's speed
    this.speed = getRandomInt(100,400);
};

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
    switch (key) {
        case 'up':
            if (!this.win && this.row > 0) {
                this.row--;
            }
            if (this.row === 0) {
                this.win = true;
            }
            break;
        case 'down':
            if (this.row < numRows -1) {
                this.row++;
            }
            break;
        case 'left':
            if (this.col > 0) {
                this.col--;
            }
            break;
        case 'right':
            if (this.col < numCols -1) {
                this.col++;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy];
var player = new Player;

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
