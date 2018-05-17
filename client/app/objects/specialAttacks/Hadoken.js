import HadokenPng    from "../../assets/images/hadoken.png";
import SpecialAttack from "../specialAttack";
import stage         from "../Stage";

export default class Hadoken extends SpecialAttack {
    spriteImage = new Image();
    spriteSheet = HadokenPng;

    timerMove = 20;

    loadSprite() {
        this.spriteSheetObject = new createjs.SpriteSheet({
            images    : [this.spriteSheet],
            frames    : {
                width : 32,
                height: 28,
                regX  : 16,
                regY  : 14
            },
            animations: {
                stand: [0, 1, true, 0.3],
                burst: [2, 5, false, 0.15]
            }
        });

        this.sprite = new createjs.Sprite(this.spriteSheetObject, "stand");
        this.stage.update();
    }

    constructor() {
        super();

        this.spriteImage.src = this.spriteSheet;
        this.spriteImage.onload = () => {
            this.loadSprite();
        };
    }
}