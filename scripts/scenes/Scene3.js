class Scene3 extends Phaser.Scene {

    constructor() {
        super( 'endGame' );
    }

    preload() {
        
    }

    create() {

        this.add.text(400, 200, 'Game Over', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);

        this.add.text(400, 300, 'Your Final Score: ' + gameSettings.score, { fontSize: '48px', fill: '#000' }).setOrigin(0.5);

        this.spacebar = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.SPACE );

        this.add.text( 400, 400, "Press Spacebar to Play Again", {
            font: 'bold 15pt Arial',
        } ).setOrigin(0.5);;
    }

    update() {
        gameSettings = {
            playerSpeed: 150,
            gridWidth: 40,
            score: 0,
            level: 1
        }
        if ( Phaser.Input.Keyboard.JustDown( this.spacebar ) ) {
            this.scene.start( 'playGame' );
        }
    }

}