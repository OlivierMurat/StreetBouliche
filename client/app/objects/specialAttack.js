import createjs from "createjs";
import player   from "./player";
import Stage    from "./Stage";

export default class SpecialAttack {
    spriteSheet = new Image();
    spriteSheetObject;
    sprite;
    timerMove = 10;
    moveInterval;

    damage = 20;

    direction = 1;
    created = false;
    destroyInProgress = false;

    constructor(params) {
        this.stage = Stage.Instance;
        createjs.Ticker.addEventListener("tick", () => {this.tick();});
    }

    start(player, isLeftTurned) {
        this.destroyInProgress = false;

        this.sender = player;
        let playerBounds = player.getBounds();

        if (this.created)
            return;

        this.direction = isLeftTurned ? -1 : 1;

        this.sprite.x = playerBounds.x;

        //start after the player
        if (!isLeftTurned)
            this.sprite.x += playerBounds.width;

        this.sprite.y = playerBounds.y + playerBounds.height / 2;
        this.sprite.scaleX = 1.3 * this.direction;
        this.sprite.scaleY = 1.3;
        this.stage.addChild(this.sprite, this);
        this.sprite.gotoAndPlay("stand");

        this.moveInterval = setInterval(() => {
            this.move();
        }, this.timerMove);

        this.created = true;
        this.stage.update();
    }

    /**
     * special attack with move to enemy
     */
    move() {
        //if destroy is in progress, skip
        if(!this.destroyInProgress){
            let bounds = this.sprite.getTransformedBounds();
            let players = this.stage.checkCollisionWithOtherChildren(bounds).filter(collisionObject => {

                if (collisionObject.walk) {
                    //its a player
                    return !(this.sender === collisionObject);
                }
                else {
                    //it's an attack
                    // collisionObject.destroyAttack();
                    // this.destroyAttack();
                    return false;
                }
            });


            if (players.length > 0) {
                //collision
                console.log("collision !!!");
                players.forEach(player => player.takeDamage(this.damage));

                this.destroyAttack();
            }
            //check movement
            if (bounds && bounds.x < 3)
                return this.destroyAttack();

            let stageWidth = this.sprite.stage.canvas.width;

            if (bounds && (bounds.x + bounds.width + 3) > stageWidth)
                return this.destroyAttack();
        }

        this.sprite.x += 3 * this.direction;
        this.stage.update();
    }

    tick() {
    }

    destroy() {
        console.log("destroy");
        clearInterval(this.moveInterval);
        this.created = false;
        this.stage.removeChild(this.sprite);
        this.stage.update();
    }

    destroyAttack() {
        this.destroyInProgress = true;
        this.sprite.gotoAndPlay("burst");
        setTimeout(() => {
            clearInterval(this.moveInterval);
            setTimeout(() => {
                this.destroy();
            }, 300);
        }, 150);
    }
}