import Player    from "../player";
import SpriteKen from "../../assets/images/spriteKen.png";
import Hadoken   from "../specialAttacks/Hadoken";

export default class Ken extends Player {
    name = "Ken";

    spriteImage = SpriteKen;

    charWidth = 43;
    charHeight = 87;

    specialAttack = new Hadoken();

    attack1 = {
        damage:10,
        range:10,
    };

    attack2 = {
        damage:30,
        range:20,
    };

    spriteSheetDatas = {
        // image | spritesheet
        images    : [this.spriteImage],
        // définition des frames
        frames    : [
            // x, y, width, height
            [0, 0, 43, 87], // stand
            [100, 0, 43, 87], // stand
            [200, 0, 43, 87], // stand
            [300, 0, 43, 87], // stand
            [400, 0, 43, 87], // walk
            [500, 0, 43, 87], // walk
            [600, 0, 43, 87], // walk
            [700, 0, 43, 87], // walk
            [800, 0, 43, 87], // punch
            [900, 0, 57, 87], // punch
            [1000, 0, 43, 87], // punch
            [1100, 0, 43, 87], // kick
            [1200, 0, 67, 87], // kick
            [1300, 0, 43, 87], // kick
            [1400, 0, 43, 87], // block
            [1500, 0, 43, 87], // down
            [1600, 0, 43, 87], // hit
            [1700, 0, 43, 87], // hit
            [1800, 0, 43, 87], // hit
            [1900, 0, 43, 87], // hit
            [1999, 0, 45, 87], // ko
            [2086, 0, 72, 87], // ko
            [2184, 0, 75, 87] // ko
        ],
        // définition des animations
        animations: {
            // start, end, next
            stand: [0, 3, "stand", 0.1],
            walk : [4, 7, "walk", 0.1],
            punch: [8, 10, "stand", 0.1],
            kick : [11, 13, "stand", 0.1],
            block: [14, 14, "block", 0.1],
            down : [15, 15, "down", 0.1],
            hit  : [16, 19, "stand", 0.1],
            ko   : [20, 21, "ko_end", 0.1],
            ko_end   : [22, 22, "ko_end", 0.1]
        }
    };

    constructor(params) {
        super(params);
        this.initCharacter();
    }

}