import createjs from 'createjs';
import Stage    from "./Stage"

export default class SpecialAttack{
    spriteSheet = new Image();
    spriteSheetObject;
    sprite;
    timerMove = 10;
    moveInterval;

    direction = 1;
    created = false;

    constructor(params){
        this.stage = Stage.Instance;
        createjs.Ticker.addEventListener("tick", ()=>{this.tick()});
    }

    start(playerBounds, isLeftTurned){
        if(this.created)
            return;

        this.direction = isLeftTurned?-1:1;

        this.sprite.x = playerBounds.x;

        //start after the player
        if(!isLeftTurned)
            this.sprite.x += playerBounds.width;

        this.sprite.y = playerBounds.y+playerBounds.height/2;
        this.sprite.scaleX = 1.3*this.direction;
        this.sprite.scaleY = 1.3;
        this.stage.stage.addChild(this.sprite);
        this.sprite.gotoAndPlay("stand");

        this.moveInterval = setInterval(()=>{
            this.move();
        }, this.timerMove);

        this.created = true;
        this.stage.update();
    }

    /**
     * special attack with move to enemy
     */
    move(){
        //check movement
        let bounds = this.sprite.getTransformedBounds();
        if(bounds && bounds.x < 3)
            return this.destroy();

        let stageWidth = this.sprite.stage.canvas.width;

        if(bounds && (bounds.x+bounds.width+3) > stageWidth)
            return this.destroy();

        this.sprite.x+= 3*this.direction;
        this.stage.update();
    }

    tick(){
    }

    destroy(){
        console.log("destroy");
        clearInterval(this.moveInterval);
        this.created = false;
        this.stage.stage.removeChild(this.sprite);
        this.stage.update();
    }
}