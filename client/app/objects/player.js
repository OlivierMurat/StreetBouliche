import Hadoken   from "./specialAttacks/Hadoken";
import Stage from "./Stage";

export default class Player {
    // specialAttack = new Hadoken();

    spriteSheetDatas = null;
    charWidth = 0;
    charHeight = 0;

    life = 100;

    bindings = {
        up     : "z",
        down   : "s",
        right  : "d",
        left   : "q",
        attack1: "&",
        attack2: "é",
        attack3: "\""
    };

    isLeftTurned = false;

    constructor(params = {}) {
        if (params.bindings)
            this.bindings = params.bindings;

        if (params.isLeftTurned)
            this.isLeftTurned = params.isLeftTurned;

        this.stage = Stage.Instance;
    }

    initCharacter() {
        console.log("initPlayer");

        if(this.spriteSheetDatas === null){
            throw new Error("Please set spriteSheetDatas before calling init")
        }

        let stage = this.stage.stage;
        // init the SpriteSheet
        let spriteSheet = new createjs.SpriteSheet(this.spriteSheetDatas);

        let vector = this.isLeftTurned ? -1 : 1;

        // Init the sprite
        let character = new createjs.Sprite(spriteSheet, 'stand');

        // Set the position of the image in the canvas
        character.x = this.stage.stage.canvas.width / 2 + (this.charWidth*3 * -vector);
        character.y = this.stage.stage.canvas.height - this.charHeight;
        character.scaleX = vector;
        character.scaleY = 1;

        //set the animation
        character.gotoAndPlay("stand");

        this.character = character;

        // add the sprite in the stage
        stage.addChild(character);
        stage.update();
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
        }
    }

    walk(){

        //setTimeout to end walk
        clearTimeout(this.endWalkTimeout);
        this.endWalkTimeout = setTimeout(()=>{
            this.character.gotoAndPlay("stand");
        },200);

        //if last walk action is lower than the full action
        if(this.lastWalk && (new Date).getTime()-this.lastWalk.getTime() < 1000){
            return;
        }

        this.character.gotoAndPlay("walk");
        this.lastWalk = new Date();
    }

    attack(id){
        switch (id){
            case 1:
                this.character.gotoAndPlay("punch");
            break;
            case 2:
                this.character.gotoAndPlay("kick");
            break;
            case 3:
                console.log("superAttack !!");
            break;
        }
    }

    moveLeft() {
        this.walk();
        this.character.x -= 3;
    }

    moveRight() {
        this.walk();
        this.character.x += 3;
    }

    moveUp(){
        // this.character.y -= 3;
    }
    moveDown(){
        this.character.gotoAndPlay("down");
    }
}