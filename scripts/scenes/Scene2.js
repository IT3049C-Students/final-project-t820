class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
    }

    create() {

        this.apple = this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "apple");

        let appleCount = 0;
        // used to test if scene 2 is working
        globalThis.score = 0;
        globalThis.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //this.physics.add.staticSprite( config.width / 2 + 50, config.height / 2, 'apple' );
        this.snake = this.physics.add.sprite( config.width / 2 , config.height / 2, 'snake' );

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.snake.setCollideWorldBounds();

        this.physics.add.collider(this.snake, this.apple, this.collectApple, null, this)
    
    }

    update() {
        this.snakeMoveManager();
        if(this.snake) {

        }
    }

    snakeMoveManager() {
        // left and right
        if ( this.cursorKeys.left.isDown ) {
            this.snake.setVelocityY( 0 );
            this.snake.setVelocityX( -gameSettings.playerSpeed );
        } else if ( this.cursorKeys.right.isDown ) {
            this.snake.setVelocityY( 0 );
            this.snake.setVelocityX( gameSettings.playerSpeed );
        }

        // up and down
        if ( this.cursorKeys.up.isDown ) {
            this.snake.setVelocityX( 0 );
            this.snake.setVelocityY( -gameSettings.playerSpeed );
        } else if ( this.cursorKeys.down.isDown ) {
            this.snake.setVelocityX( 0 );
            this.snake.setVelocityY( gameSettings.playerSpeed );
        }

    }

    collectApple(snake, apple2) {
        score += 10;
        scoreText.setText('Score: ' + score);
        this.resetApplePos(apple2);
    }

    resetApplePos(apple3) {
        
        let y = Math.floor(Math.random() * config.height + 40) - 40; 
        let x = Math.floor(Math.random() * config.width + 40) - 40; 
        console.log(x + "    " + y);
        apple3.y = y;
        apple3.x = x;
    }



}