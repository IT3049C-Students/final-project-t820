class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
        this.lastMoveTime = 0;

        this.timeInterval = 150;
        this.lastPowerUpSpawnTime = 0;
        this.lastPowerUpCollectTime = 0;
        this.direction = "right";
        this.snakeSize = gameSettings.gridWidth;
        this.levelUpScore = 260;
        this.totalLevels = gameSettings.totalLevels;
        this.body = [];
    }

    create() {
        console.log("Current Level: " + gameSettings.level)
        this.snakeSize = gameSettings.gridWidth;
        this.timeInterval = gameSettings.playerSpeed;
        console.log("Curent Player Speed: " + this.timeInterval)
        globalThis.scale = 1;
        if(this.body.length >= 1) {
            this.body = []
        }
        globalThis.totalGridsX = 19;
        globalThis.totalGridsY = 14;

        if(gameSettings.gridWidth != 40) {
            totalGridsX = parseInt(config.width / gameSettings.gridWidth);
            totalGridsY = parseInt(config.height / gameSettings.gridWidth);
        }

        this.levelUpScore = ((totalGridsX * totalGridsY * 10) - (totalGridsX + totalGridsY)*10);
        console.log("Score to Level up: " + this.levelUpScore)

        this.apple = this.physics.add.sprite(config.width / 2, config.height / 2 - 20, "apple");
        this.apple.setVelocityX(0);
        this.apple.setVelocityY(0);


        this.powerUps = this.physics.add.sprite(config.width/ 2, config.height / 2 - 20, "powerUps");
        this.powerUps.setVelocityX(0);
        this.powerUps.setVelocityY(0);
        
        let appleCount = 0;
        globalThis.score = 0;
        globalThis.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        globalThis.gameOver = false;
        this.snake = this.physics.add.sprite(  gameSettings.gridWidth, gameSettings.gridWidth, 'snake' );


        if(gameSettings.gridWidth != 40) {
            scale = gameSettings.gridWidth / 40;
            this.snake.setScale(scale);
            this.apple.setScale(scale);
            this.powerUps.setScale(scale);
        }

        this.snake = this.physics.add.sprite( /*config.width / 2*/ 40, /*config.height / 2 - 60*/40, 'snake' );


        // Tried using a green rectangle as a snake thinking it might make it easier to add a growth function.
        
        /*this.snake = this.add.rectangle(config.width / 2 - 50, config.height / 2, 25, 25, 0x00ff00);
        this.physics.add.existing(this.snake);
        */

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.snake.setCollideWorldBounds();

        this.physics.add.collider(this.snake, this.apple, this.collectApple, null, this);

        this.physics.add.collider(this.snake,this.powerUps, this.collectPowerup,null,this);
        this.powerUps.visible = false;
    }

    update(time) {
        console.log(gameSettings.powerUpInterval)
        if(this.lastPowerUpSpawnTime == 0) {
            this.lastPowerUpSpawnTime = time;
        }
        if(time > this.lastPowerUpSpawnTime + gameSettings.powerUpInterval) {
            this.powerUps.visible = false;
            this.powerUps.body.enable = false;
        } if (time > this.lastPowerUpSpawnTime + gameSettings.powerUpInterval + 5000) {
            this.resetpowerUpPos(this.powerUps)
            this.lastPowerUpSpawnTime = time;
        }

        if(score >= 100) {
            this.levelUp();
        }

        if(time > this.lastMoveTime + 20)
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
        if ( this.snake.x < (gameSettings.gridWidth) || this.snake.x > (config.width -  gameSettings.gridWidth) ) {
            this.gameEnd();
        } else if ( this.snake.y < gameSettings.gridWidth || this.snake.y > config.height-gameSettings.gridWidth  ) {
            this.gameEnd();

    }

    update(time) {
        if ( this.cursorKeys.left.isDown ) {
            this.direction = "left"
        } else if ( this.cursorKeys.right.isDown ) {
            this.direction = "right"
        }
    }
    gameEnd() {
        console.log("Game end function triggered")
        gameSettings.score = score;
        this.direction = "right";
        this.scene.start( 'endGame' );

        this.physics.pause();
        this.snake.visible = false;
        this.apple.visible = false;
        this.powerUps.visible = false;
        this.powerUps.visible= false;


        // up and down
        if ( this.cursorKeys.up.isDown ) {
            this.direction = "up"
        } else if ( this.cursorKeys.down.isDown ) {
            this.direction = "down"
        }
        if(time > this.lastMoveTime + this.timeInterval) {
            this.lastMoveTime = time;
            this.snakeMoveManager(this.direction);
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
                        this.gameEnd();
                    }
                }


            }
    }

    collectApple(snake, apple) {

        if(this.body.length >= 1) {
            this.body.push(this.add.rectangle(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, 32 * scale, 32 * scale, 0x00ffff));
        } else {
            this.body.push(this.add.rectangle(this.snake.x, this.snake.y, 32* scale, 32* scale, 0x00ffff));
        }

        // snake ran into wall, reset position of snake
        // the coordinates code can be replaced by the gameOver function
        if ( this.snake.x < 40 || this.snake.x > 760 ) {
            this.snake.x = 40;
            this.snake.y = 40;
        } else if ( this.snake.y < 40 || this.snake.y > 560  ) {
            this.snake.x = 40;
            this.snake.y = 40;
        }

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
    }

    collectApple(snake, apple) {
        score += 10;
        scoreText.setText('Score: ' + score);
        this.resetApplePos(apple);
    }
    collectPowerup(snake,powerUps)
    {
        score += 20;
        scoreText.setText('Score: ' +score);
        this.timeInterval = 150;
        powerUps.visible = false;
        powerUps.body.enable = false;
         //this.resetpowerUpPos(powerUps);
     }


     resetpowerUpPos(powerUps) {

        powerUps.visible = true;
        powerUps.body.enable = true;
        let x = Phaser.Math.Between( 1, totalGridsX - 1) * gameSettings.gridWidth;
        let y = Phaser.Math.Between( 1, totalGridsY - 1) * gameSettings.gridWidth;
         powerUps.setVelocityX(0);
         powerUps.setVelocityY(0);
         powerUps.y = y;
         powerUps.x = x;
 
     }

    resetApplePos(apple) {
        // sets the new apple within the grid that the snake moves through
        let x = Phaser.Math.Between( 1, totalGridsX - 1) * gameSettings.gridWidth;
        let y = Phaser.Math.Between( 1, totalGridsY - 1) * gameSettings.gridWidth;

    resetApplePos(apple) {
        // sets the new apple within the grid that the snake moves through
        let x = Phaser.Math.Between( 1, 19 ) * 40;
        let y = Phaser.Math.Between( 1, 14 ) * 40;

        apple.setVelocityX(0);
        apple.setVelocityY(0);
        apple.y = y;
        apple.x = x;
    }


    levelUp() {
        console.log("levelup triggered")
        gameSettings.score = score;
        this.direction = "right";
        if(gameSettings.level <= this.totalLevels) {
            this.scene.start( 'levelUp' );
        }
        else {
            this.scene.start("gameComplete")
        }

        this.physics.pause();
        this.snake.visible = false;
        this.apple.visible = false;
        this.powerUps.visible = false;

        }

}