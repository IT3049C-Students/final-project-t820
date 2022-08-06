let gameSettings = {
    playerSpeed: 150,
    gridWidth: 40,
    score: 0,
    level: 1,
    totalLevels: 5
}

let config = {
    width: 800,
    height: 600,
    backgroundColor: 0x15A1EB,
    autoCenter: true,
    scene: [ Scene1, Scene2, Scene3, Scene4, Scene5 ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
}

let game = new Phaser.Game( config );