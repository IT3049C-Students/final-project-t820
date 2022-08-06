class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
        this.lastMoveTime = 0;
        this.timeInterval = 200;
        this.direction = "right"
    }

    create() {

        this.apple = this.physics.add.sprite(config.width / 2, config.height / 2 - 20, "apple");
        this.apple.setVelocityX(0);
        this.apple.setVelocityY(0);
        
        let appleCount = 0;
        globalThis.score = 0;
        globalThis.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

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
        if ( this.cursorKeys.left.isDown ) {
            this.direction = "left"
        } else if ( this.cursorKeys.right.isDown ) {
            this.direction = "right"
        }

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