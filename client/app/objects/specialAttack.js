import createjs from 'createjs';
import player   from "./player";
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

    start(player, isLeftTurned){
        this.sender = player;
        let playerBounds = player.getBounds();

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
        this.stage.addChild(this.sprite, this);
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
        let bounds = this.sprite.getTransformedBounds();
        let a = this.stage.checkColisionWithOtherChildren(bounds).filter(collision=>{
            let object = collision.o;

            if(object.walk){
                //its a player
                return !(this.sender === object);
            }
            else{
                //it's an attack
                return false;
            }
        });


        if(a.length>0){
            //collision
            console.log("collision !!!");
            this.destroyAttack()
        }
        //check movement
        if(bounds && bounds.x < 3)
            return this.destroyAttack();

        let stageWidth = this.sprite.stage.canvas.width;

        if(bounds && (bounds.x+bounds.width+3) > stageWidth)
            return this.destroyAttack();

        this.sprite.x+= 3*this.direction;
        this.stage.update();
    }

    tick(){
    }

    destroy(){
        console.log("destroy");
        clearInterval(this.moveInterval);
        this.created = false;
        this.stage.removeChild(this.sprite);
        this.stage.update();
    }

    destroyAttack() {
        this.sprite.gotoAndPlay("burst");
        setTimeout(()=>{
            clearInterval(this.moveInterval);
            setTimeout(()=>{
                this.destroy();
            },300)
        },150);
    }
}