import 'latest-createjs'
import stage    from "./Stage"

export default class SpecialAttack{
    spriteSheet = new Image();

    constructor(params){
        this.spriteSheet.onload = this.loadSprite;
    }

    loadSprite(){
        this.spriteSheetObject = new createjs.SpriteSheet({
            images: [this.spriteSheet],
            frames: {
                width: 32,
                height: 28,
                regX: 16,
                regY: 14
            },
            animations: {
                standHadoken: [0, 1, true, 0.3],
                burstHadoken: [2, 5, false, 0.15]
            }
        });

        this.sprite = new createjs.Sprite(this.spriteSheetObject, "standHadoken");
        stage.update();
    }
}