// console.log("hello world")
// Phoebe Royer 
// Nyan Patrol
// ~15 hrs

// MODS ADDED -------------------------------------------
// - Reskinned: (3)
//     - Rocket -> Nyan 
//     - Spaceships -> poptarts
//     - Explosion -> moving rainbow
// - added random moving speeds for poptarts + nyan, depending on difficulty (2)
// - added custom text font (3)
// - added shot clock (3)
// - Create a new title screen (e.g., new artwork, typography, layout) (3)
// - added music (1)
// - Create 4 new explosion sound effects and randomize which one plays on impact (3)
// -------------------------------------------

let config = {
    type: Phaser.AUTO,
    render: {
      pixelArt: true
    },
    width: 640,
    height: 480,
    scene: [Menu, Play]
  }

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT