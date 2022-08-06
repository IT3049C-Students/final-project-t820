class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
        this.lastMoveTime = 0;
        this.timeInterval = 200;
        this.direction = "right";
        this.snakeSize = gameSettings.gridWidth;
        this.body = [];
    }

    create() {

        this.apple = this.physics.add.sprite(config.width / 2, config.height / 2 - 20, "apple");
        this.apple.setVelocityX(0);
        this.apple.setVelocityY(0);
        
        let appleCount = 0;
        globalThis.score = 0;
        globalThis.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        globalThis.gameOver = false;
        globalThis.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#000' })
        globalThis.gameOverText.setOrigin(0.5);
        globalThis.gameOverText.visible = false;
        globalThis.gameOverScore = this.add.text(400, 400, 'Your Final Score: ', { fontSize: '48px', fill: '#000' })
        globalThis.gameOverScore.setOrigin(0.5);
        globalThis.gameOverScore.visible = false;
        this.snake = this.physics.add.sprite( /*config.width / 2*/ 40, /*config.height / 2 - 60*/40, 'snake' );

        // Tried using a green rectangle as a snake thinking it might make it easier to add a growth function.
        
        /*this.snake = this.add.rectangle(config.width / 2 - 50, config.height / 2, 25, 25, 0x00ff00);
        this.physics.add.existing(this.snake);
        */

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.snake.setCollideWorldBounds();

        this.physics.add.collider(this.snake, this.apple, this.collectApple, null, this);

    }

    update(time) {

        if(time > this.lastMoveTime + 50)
        {
                if ( this.cursorKeys.left.isDown ) {
                    if(this.direction != "right") {
                        this.direction = "left"
                    }
            } else if ( this.cursorKeys.right.isDown ) {
                if(this.direction != "left") {
                    this.direction = "right"
                }
            }
            // up and down
            if ( this.cursorKeys.up.isDown ) {
                if(this.direction != "down") {
                    this.direction = "up"
                }
            } else if ( this.cursorKeys.down.isDown ) {
                if(this.direction != "up") {
                    this.direction = "down"
                }
            }
        }
            if(time > this.lastMoveTime + this.timeInterval) {
                this.lastMoveTime = time;
                this.snakeMoveManager(this.direction);
            }
        // snake ran into wall, reset position of snake
        // the coordinates code can be replaced by the gameOver function
        //END GAME HERE
        if ( this.snake.x < 40 || this.snake.x > 760 ) {
            this.gameEnd();
        } else if ( this.snake.y < 40 || this.snake.y > 560  ) {
            this.gameEnd();
        }
    }
    gameEnd() {
        this.physics.pause();
        this.snake.visible = false;
        this.apple.visible = false;
        globalThis.gameOver = true;
        globalThis.scoreText.visible = false;
        globalThis.gameOverText.visible = true;
        globalThis.gameOverScore.visible = true;
        globalThis.gameOverScore.setText('Your Final Score: ' + score);
        }
    snakeMoveManager(direction) {
        if(this.direction == "left") {
            this.snake.x -= gameSettings.gridWidth;
            } else if (direction =="right") {
            this.snake.x += gameSettings.gridWidth;
            } else if (direction == "down") {
            this.snake.y += gameSettings.gridWidth;
            } else {
            this.snake.y -= gameSettings.gridWidth;
            }
            for(let index = this.body.length - 1; index >= 0; index--) {
                if(this.body.length <= 1 || index == 0) {
                    switch(direction) {
                        case "left":
                            this.body[0].x = this.snake.x + this.snakeSize;
                            this.body[0].y = this.snake.y;
                            break;
                        case "right":
                            this.body[0].x = this.snake.x - this.snakeSize;
                            this.body[0].y = this.snake.y;
                            break;
                        case "down":
                            this.body[0].x = this.snake.x;
                            this.body[0].y = this.snake.y - this.snakeSize;
                            break;
                        default: 
                            this.body[0].x = this.snake.x;
                            this.body[0].y = this.snake.y + this.snakeSize;
                    }
                } else {
                    switch(direction) {
                        case "left":
                            this.body[index].x = this.body[index - 1].x;
                            this.body[index].y = this.body[index - 1].y;
                            break;
                        case "right":
                            this.body[index].x = this.body[index - 1].x;
                            this.body[index].y = this.body[index - 1].y;
                            break;
                        case "down":
                            this.body[index].x = this.body[index - 1].x;
                            this.body[index].y = this.body[index - 1].y ;
                            break;
                        default: 
                            this.body[index].x = this.body[index - 1].x;
                            this.body[index].y = this.body[index - 1].y;
                    }
                    if(this.snake.x == this.body[index].x && this.snake.y == this.body[index].y) {
                        //END GAME HERE
                        console.log("game over");
                        this.gameEnd();
                    }
                }

            }
    }

    collectApple(snake, apple) {

        if(this.body.length >= 1) {
            this.body.push(this.add.rectangle(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, 32, 32, 0x00ffff));
        } else {
            this.body.push(this.add.rectangle(this.snake.x, this.snake.y, 32, 32, 0x00ffff));
        }

        score += 10;
        scoreText.setText('Score: ' + score);
        this.resetApplePos(apple);
    }

    resetApplePos(apple) {
        // sets the new apple within the grid that the snake moves through
        let x = Phaser.Math.Between( 1, 19 ) * 40;
        let y = Phaser.Math.Between( 1, 14 ) * 40;
        apple.setVelocityX(0);
        apple.setVelocityY(0);
        apple.y = y;
        apple.x = x;
    }

}