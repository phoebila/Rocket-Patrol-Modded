// nyanCat prefab
class nyanCat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame)
  
      // add object to existing scene
      scene.add.existing(this)
      this.isFiring = false
      this.moveSpeed = Phaser.Math.Between(5, 15);
      this.sfxShot = scene.sound.add('sfx-shot', {volume: .2})

    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed
            }

        }
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true
            this.sfxShot.play()

            // randomizing move speed
            this.moveSpeed = Phaser.Math.Between(5, 10);
        }
        // if fired, move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed
        }
        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.y = game.config.height - borderUISize - 6*borderPadding
            
        }

        // console.log(`b4: ${this.moveSpeed}`);
        // this.moveSpeed = Phaser.Math.Between(5, 10);
        // console.log(`after: ${this.moveSpeed}`);

    }

     // reset nyanCat to "ground"
     reset() {
        this.isFiring = false
        this.y = game.config.height - borderUISize - 6*borderPadding

        // randomizing move speed
        this.moveSpeed = Phaser.Math.Between(5, 10);
    }
  }