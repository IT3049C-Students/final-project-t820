class Scene2 extends Phaser.Scene {

    constructor() {
        super( 'playGame' );
    }

    create() {

        var UP = 0;
        var DOWN = 1;
        var LEFT = 2;
        var RIGHT = 3;

        function Snake (scene, x, y)
        {
            this.headPosition = new Phaser.Geom.Point(x, y);

            this.body = scene.add.group();

            this.head = this.body.create(x * 16, y * 16, 'body');
            this.head.setOrigin(0);

            this.alive = true;

            this.speed = 100;

            this.moveTime = 0;

            this.heading = RIGHT;
            this.direction = RIGHT;
        }










        this.apple = this.physics.add.sprite(config.width / 2 - 50, config.height / 2, "apple");

        let appleCount = 0;
        // used to test if scene 2 is working
        globalThis.score = 0;
        globalThis.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //this.physics.add.staticSprite( config.width / 2 + 50, config.height / 2, 'apple' );
        this.snake = this.physics.add.sprite( config.width / 2 , config.height / 2, 'snake' );

        this.tail = new Phaser.Geom.Point(x,y);
        this.head = this.body.create(x * 16, y * 16, 'snake');
        this.head.setOrigin(0);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.snake.setCollideWorldBounds();

        this.physics.add.collider(this.snake, this.apple, this.collectApple, null, this)




    
    }

    update(time)
    {
        if (time >= this.moveTime)
        {
            return this.move(time);
        }
    }

    faceLeft()
    {
        if (this.direction === UP || this.direction === DOWN)
        {
            this.heading = LEFT;
        }
    }

    faceRight()
    {
        if (this.direction === UP || this.direction === DOWN)
        {
            this.heading = RIGHT;
        }
    }

    faceUp()
    {
        if (this.direction === LEFT || this.direction === RIGHT)
        {
            this.heading = UP;
        }
    }

    faceDown()
    {
        if (this.direction === LEFT || this.direction === RIGHT)
        {
            this.heading = DOWN;
        }
    }


    move(time)
    {

        switch (this.heading)
        {
            case LEFT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                break;

            case RIGHT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                break;

            case UP:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                break;

            case DOWN:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                break;
        }

        this.direction = this.heading;

    
        Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1);

       
        this.moveTime = time + this.speed;

        return true;
    }
    cursors = this.input.keyboard.createCursorKeys();
}

function update (time, delta)
{
    if (!snake.alive)
    {
        return;
    }
    if (cursors.left.isDown)
    {
        snake.faceLeft();
    }
    else if (cursors.right.isDown)
    {
        snake.faceRight();
    }
    else if (cursors.up.isDown)
    {
        snake.faceUp();
    }
    else if (cursors.down.isDown)
    {
        snake.faceDown();
    }

    snake.update(time);
}
/*
    update() {
        this.snakeMoveManager();
        if(this.snake) {

        }
    }
*/
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

     /*   if (this.head.x === apple.x && this.head.y === this.apple.y )
        {
            this.grow();
            apple2.collectApple
        } */
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
    grow()
    {
        var newPart = this.snake.create(this.snake.x, this.snake.y, 'snake');
        newPart.setOrigin(0);
    }

    



}