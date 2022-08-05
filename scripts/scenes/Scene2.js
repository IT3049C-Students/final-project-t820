class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
        this.lastMoveTime = 0;
        this.timeInterval = 300;
        this.direction = "right"
    }

    create() {

        this.apple = this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "apple");
        this.apple.setVelocityX(0);
        this.apple.setVelocityY(0);
        
        let appleCount = 0;
        globalThis.score = 0;
        globalThis.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        this.snake = this.physics.add.sprite( config.width / 2 , config.height / 2, 'snake' );

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
        
        let y = Math.floor(Math.random() * config.height + 40) - 40; 
        let x = Math.floor(Math.random() * config.width + 40) - 40; 
        console.log(x + "    " + y);
        apple.setVelocityX(0);
        apple.setVelocityY(0);
        apple.y = y;
        apple.x = x;
    }



}