import Hadoken   from "./specialAttacks/Hadoken";
import SpriteKen from "../assets/images/spriteKen.png";
import Stage from "./Stage";

export default class Player {
    image = new Image();

    specialAttack = new Hadoken();

    life = 100;

    bindings = {
        up     : "z",
        down   : "s",
        right  : "d",
        left   : "q",
        attack1: "u",
        attack2: "i",
        attack3: "o"
    };

    isLeftTurned = false;

    spriteImage = SpriteKen;

    constructor(params) {
        if (params.bindings)
            this.bindings = params.bindings;

        if (params.isLeftTurned)
            this.isLeftTurned = params.isLeftTurned;

        if (params.spriteImage)
            this.spriteImage = params.spriteImage;

        this.stage = Stage.Instance;

        this.image.src = this.spriteImage;
        this.image.onload = () => { this.initPlayer(); };
        this.stage.update();
    }

    initPlayer() {
        // Préparer les données de la Spritesheet
        let data = {
            // image | spritesheet
            images    : [this.spriteImage],
            // définition des frames
            frames    : [
                // x, y, width, height
                [0, 0, 100, 100], // stand
                [100, 0, 100, 100], // stand
                [200, 0, 100, 100], // stand
                [300, 0, 100, 100], // stand
                [400, 0, 100, 100], // walk
                [500, 0, 100, 100], // walk
                [600, 0, 100, 100], // walk
                [700, 0, 100, 100], // walk
                [800, 0, 100, 100], // punch
                [900, 0, 100, 100], // punch
                [1000, 0, 100, 100], // punch
                [1100, 0, 100, 100], // kick
                [1200, 0, 100, 100], // kick
                [1300, 0, 100, 100], // kick
                [1400, 0, 100, 100], // block
                [1500, 0, 100, 100], // down
                [1600, 0, 100, 100], // hit
                [1700, 0, 100, 100], // hit
                [1800, 0, 100, 100], // hit
                [1900, 0, 100, 100], // hit
                [2000, 0, 100, 100], // ko
                [2100, 0, 100, 100], // ko
                [2200, 0, 100, 100] // ko
            ],
            // définition des animations
            animations: {
                // start, end, next
                stand: [0, 3, "stand", 0.1],
                walk : [4, 7, "walk", 0.1],
                punch: [8, 10, "stand", 0.1],
                kick : [11, 13, "stand", 0.1],
                block: [14, 14, "stand", 0.1],
                down : [15, 15, "stand", 0.1],
                hit  : [16, 19, "stand", 0.1],
                ko   : [20, 22, "ko", 0.1]
            }
        };
        // Instancier la SpriteSheet
        let spriteSheet = new createjs.SpriteSheet(data);

        let vector = this.isLeftTurned ? -1 : 1;

        // Instancier le Sprite
        let character = new createjs.Sprite(spriteSheet, "stand");
        // Positionner l'image dans le canvas
        console.log(this.stage);
        character.x = this.stage.stage.canvas.width / 2 + (200 * vector);
        character.y = 100;
        character.scaleX = vector;
        character.scaleY = 1;

        // Ajouter le Sprite au Stage
        character.gotoAndPlay("stand");

        this.character = character;

        this.stage.stage.addChild(character);
        this.stage.stage.update();
    }

    handleKeyBoardInput(key) {
        switch (key) {
            case this.bindings.left :
                this.moveLeft();
            break;
            case this.bindings.right :
                this.moveRight();
            break;
        }
    }

    moveLeft() {
        console.log("move left", this.character);
        this.character.x -= 3;
    }

    moveRight() {
        console.log("move right", this.character);
        this.character.x += 3;
    }
}