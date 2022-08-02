class Scene1 extends Phaser.Scene {

    constructor() {
        super( 'bootGame' );
    }

    preload() {
        this.load.spritesheet( 'snake', 'images/snake_body.png',  {
            frameWidth: 32,
            frameHeight: 32
        } );
        this.load.spritesheet( 'apple', 'images/apple.png',  {
            frameWidth: 40,
            frameHeight: 40
        } );
    }

    create() {
        this.add.text( 325, 180, "Snake", {
            font: 'bold 40pt Arial',
        } );
        this.add.text( 295, 340, "Press Spacebar to Start", {
            font: 'bold 15pt Arial',
        } );
        this.spacebar = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.SPACE );
    }

    update() {
        if ( Phaser.Input.Keyboard.JustDown( this.spacebar ) ) {
            this.scene.start( 'playGame' );
        }
    }

}