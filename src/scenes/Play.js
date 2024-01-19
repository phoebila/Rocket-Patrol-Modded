class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
    }

    init(timer) {
        console.log(`init: ${timer}`);
        shotClock = timer/1000
    }

    create() {

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x62289c).setOrigin(0, 0)
        // pink borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xe69cc0).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xe69cc0).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xe69cc0).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xe69cc0).setOrigin(0, 0)

        // add rocket (p1) --> now nyan cat
        this.p1nyanCat = new nyanCat(this, game.config.width/2, game.config.height - borderUISize - 6*borderPadding, 'nyan-cat').setOrigin(0.5, 0)

        // add spaceships (x3) --> nyanRainbow
        this.ship01 = new nyanRainbow(this, game.config.width + borderUISize*6, borderUISize*4, 'nyan-rainbow', 0, 30).setOrigin(0, 0)
        this.ship02 = new nyanRainbow(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'nyan-rainbow', 0, 20).setOrigin(0,0)
        this.ship03 = new nyanRainbow(this, game.config.width, borderUISize*6 + borderPadding*4, 'nyan-rainbow', 0, 10).setOrigin(0,0)

        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0

        // display score
        let scoreConfig = {
            fontFamily: 'pixel_custom',
            fontSize: '16px',
            backgroundColor: '#b3325f',
            color: '#000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)

        // GAME OVER flag
        this.gameOver = false

        // display clock
        let timeConfig = {
            fontFamily: 'pixel_custom',
            fontSize: '16px',
            backgroundColor: '#5087b5',
            color: '#000',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }


        // 60-second play clock
        scoreConfig.fixedWidth = 0

        // adding clock display
        // how to update clock text in seconds?
        this.add.text(borderUISize + 43*borderPadding, borderUISize + borderPadding*2, shotClock, timeConfig)

        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5)

            this.gameOver = true
        }, null, this)
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }

        this.starfield.tilePositionX -= 4

        if(!this.gameOver) {               
            this.p1nyanCat.update()         // update nyanCat sprite
            this.ship01.update()           // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()

            this.updateClock()              //update shot clock
        }

        // check collisions
        if(this.checkCollision(this.p1nyanCat, this.ship03)) {
            this.p1nyanCat.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1nyanCat, this.ship02)) {
            this.p1nyanCat.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1nyanCat, this.ship01)) {
            this.p1nyanCat.reset()
            this.shipExplode(this.ship01)
        }
      }

    checkCollision(nyanCat, ship) {
    // simple AABB checking
    if (nyanCat.x < ship.x + ship.width && 
        nyanCat.x + nyanCat.width > ship.x && 
        nyanCat.y < ship.y + ship.height &&
        nyanCat.height + nyanCat.y > ship. y) {
        return true
    } else {
        return false
    }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')             // play explode animation
        boom.on('animationcomplete', () => {   // callback after anim completes
          ship.reset()                         // reset ship position
          ship.alpha = 1                       // make ship visible again
          boom.destroy()                       // remove explosion sprite
        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        
        this.sound.play('sfx-explosion', {volume: .2})
    }

    updateClock(){
        if (!this.gameOver && shotClock != 0){
            shotClock -= 1
            console.log(`shot clock: ${shotClock}`);
            return `${shotClock}`
        }

    }
}

let shotClock = 0