class Scene4 extends Phaser.Scene {

    constructor() {
        super( 'levelUp' );
    }

    preload() {
        
    }

    create() {

        this.add.text(400, 200, 'Level Up', { fontSize: '64px', fill: '#000' }).setOrigin(0.5);

        this.add.text(400, 300, 'Your Current Score: ' + gameSettings.score, { fontSize: '48px', fill: '#000' }).setOrigin(0.5);

        this.spacebar = this.input.keyboard.addKey( Phaser.Input.Keyboard.KeyCodes.SPACE );

        this.add.text( 400, 400, "Press Spacebar to Continue to Next Level", {
            font: 'bold 15pt Arial',
        } ).setOrigin(0.5);;
    }

    update() {
        if ( Phaser.Input.Keyboard.JustDown( this.spacebar ) ) {
            gameSettings.playerSpeed -= 10;
            gameSettings.gridWidth -= 5;
            gameSettings.level++;
            this.scene.start( 'playGame' );
        } 
    }

}