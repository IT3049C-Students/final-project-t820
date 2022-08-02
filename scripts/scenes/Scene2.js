class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
    }
    
    create() {
        // used to test if scene 2 is working
        this.add.text( 20, 20, 'Playing Snake' );

        this.apple = this.physics.add.sprite( config.width / 2 + 50, config.height / 2, 'apple' );
        this.snake = this.physics.add.sprite( config.width / 2 , config.height / 2, 'snake' );

        this.cursorKeys = this.input.keyboard.createCursorKeys();
    
    }

    update() {
        this.snakeMoveManager();
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

}