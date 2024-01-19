class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

        // rocket -> now nyan cat
        this.load.image('nyan-cat', "./assets/balloon.gif")

        // spaceships -> now nyan rainbow
        this.load.image('nyan-rainbow', './assets/spaceship.png')

        this.load.image('starfield', './assets/starfield.png')

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        // load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        
        //adding nyan audio
        this.load.audio('sfx-nyan', './assets/nyan-music.mp3')
      
      }

    create() {

        // animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        // this.add.text(20, 20, "Rocket Patrol Menu")
        // this.scene.start("playScene")
        let menuConfig = {
            fontFamily: 'pixel_custom',
            fontSize: '16px',
            backgroundColor: '#0F4D8F',
            color: '#000000',
            align: 'right',
            padding: {
            top: 8,
            bottom: 8,
            },
            fixedWidth: 0
        }      

        // display menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'NYAN PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to release', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#0F4D8F'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
      }

      update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
              spaceshipSpeed: Phaser.Math.Between(3, 5),
              gameTimer: 60000    
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene', game.settings.gameTimer)    
          }
          if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
              spaceshipSpeed: Phaser.Math.Between(7, 10),
              gameTimer: 45000    
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene', game.settings.gameTimer)    
          }
      }
}