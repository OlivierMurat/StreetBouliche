import Hadoken from "./specialAttacks/Hadoken";
import Stage   from "./Stage";

export default class Player {
    // specialAttack = new Hadoken();

    spriteSheetDatas = null;
    charWidth = 0;
    charHeight = 0;
    /**
     *
     * @type {SpecialAttack}
     */
    specialAttack = null;


    attack1 = {
        damage:10,
        range:10,
    };

    attack2 = {
        damage:30,
        range:20,
    };

    life = 100;

    blockAttack = false;

    crouched = false;

    bindings = {
        up     : "z",
        down   : "s",
        right  : "d",
        left   : "q",
        attack1: "&",
        attack2: "é",
        attack3: "\"",
        block  : "'"
    };

    isLeftTurned = false;

    constructor(params = {}) {
        if (params.bindings)
            this.bindings = params.bindings;

        if (params.isLeftTurned)
            this.isLeftTurned = params.isLeftTurned;

        this.stage = Stage.Instance;
    }

    getBounds() {
        let bounds = this.character.getTransformedBounds();
        if (this.crouched) {
            bounds.height /= 2;
            bounds.y += bounds.height;
        }

        return bounds;
    }

    initCharacter() {
        console.log("initPlayer");

        if (this.spriteSheetDatas === null) {
            throw new Error("Please set spriteSheetDatas before calling init");
        }

        let stage = this.stage;
        // init the SpriteSheet
        let spriteSheet = new createjs.SpriteSheet(this.spriteSheetDatas);

        let vector = this.isLeftTurned ? -1 : 1;

        // Init the sprite
        let character = new createjs.Sprite(spriteSheet, "stand");

        // Set the position of the image in the canvas
        character.x = this.stage.stage.canvas.width / 2 + (this.charWidth * 3 * -vector);
        character.y = this.stage.stage.canvas.height - this.charHeight;
        character.scaleX = vector;
        character.scaleY = 1;

        //set the animation
        character.gotoAndPlay("stand");

        this.character = character;

        // add the sprite in the stage
        stage.addChild(character, this);
        stage.update();
    }

    /**
     * Action when key is released
     * @param key
     */
    handleKeyBoardRelease(key) {
        switch (key) {
            case this.bindings.left :
                this.stand();
                break;
            case this.bindings.right :
                this.stand();
                break;
            case this.bindings.up :
                this.stand();
                break;
            case this.bindings.down:
                this.crouched = false;
                this.stand();
                break;
            case this.bindings.attack1:
                //     // this.attack(1);
                break;
            case this.bindings.attack2:
                //     // this.attack(2);
                break;
            case this.bindings.attack3:
                //     // this.attack(3);
                break;
            case this.bindings.block:
                this.blockEnd();
                break;
        }
    }

    handleKeyBoardInput(key) {
        switch (key) {
            case this.bindings.left :
                this.moveLeft();
                break;
            case this.bindings.right :
                this.moveRight();
                break;
            case this.bindings.up :
                this.moveUp();
                break;
            case this.bindings.down:
                this.moveDown();
                break;
            case this.bindings.attack1:
                this.attack(1);
                break;
            case this.bindings.attack2:
                this.attack(2);
                break;
            case this.bindings.attack3:
                this.attack(3);
                break;
            case this.bindings.block:
                this.block();
                break;
        }
    }

    walk() {
        //setTimeout to end walk
        clearTimeout(this.endWalkTimeout);
        this.endWalkTimeout = setTimeout(() => {
            this.character.gotoAndPlay("stand");
        }, 200);

        //if last walk action is lower than the full action
        if (this.lastWalk && (new Date).getTime() - this.lastWalk.getTime() < 1000) {
            return;
        }

        this.character.gotoAndPlay("walk");
        this.lastWalk = new Date();
    }

    checkCollisions(rect) {
        let bounds = this.character.getTransformedBounds();
        return rect.x < bounds.x + bounds.width &&
                 rect.x + rect.width > bounds.x &&
                 rect.y < bounds.y + bounds.height &&
                 rect.y + rect.height > bounds.y;
    }

    takeDamage(damages){
        this.life -= damages;

        console.log("take damage, life : "+this.life);

        if(this.life<=0){
            this.die();
            this.stage.thisPlayerLoose(this);
        }
        else
            this.hit();
    }

    attack(id) {
        let attack = (damage, bounds)=>{
            let players = this.stage.checkCollisionWithOtherChildren(bounds).filter(collisionObject => {
                if (collisionObject.walk) {
                    //its a player
                    return !(this === collisionObject);
                }
                else {
                    //it's an attack
                    return false;
                }
            });

            if (players.length > 0) {
                //collision
                console.log("collision !!!");
                players.forEach(player => player.takeDamage(damage));
            }
        };

        let bounds = this.character.getTransformedBounds();
        switch (id) {
            case 1:
                this.character.gotoAndPlay("punch");
                attack(this.attack1.damage, {...bounds,width:bounds.width+this.attack1.range});
                break;
            case 2:
                this.character.gotoAndPlay("kick");
                attack(this.attack2.damage, {...bounds,width:bounds.width+this.attack2.range});
                break;
            case 3:
                console.log("superAttack !!");
                this.specialAttack.start(this, this.isLeftTurned);
                break;
        }
    }

    moveLeft() {
        //check movement
        let bounds = this.character.getTransformedBounds();
        if (bounds && bounds.x < 3)
            return;

        this.walk();
        this.character.x -= 3;
    }

    moveRight() {
        //check movement
        let bounds = this.character.getTransformedBounds();
        let stageWidth = this.character.stage.canvas.width;

        if (bounds && (bounds.x + bounds.width + 3) > stageWidth)
            return;

        this.walk();
        this.character.x += 3;
    }

    moveUp() {
        // this.character.y -= 3;
    }

    moveDown() {
        this.crouched = true;
        this.character.gotoAndPlay("down");
    }

    stand() {
        this.character.gotoAndPlay("stand");
    }

    block() {
        //check if player is not already blocking
        if (this.blockAttack)
            return;

        this.character.gotoAndPlay("block");
        this.blockAttack = true;
    }

    blockEnd() {
        this.character.gotoAndPlay("stand");
        this.blockAttack = false;
    }

    hit(){
        this.character.gotoAndPlay("hit");
    }
    die(){
        this.character.gotoAndPlay("ko");
    }
}