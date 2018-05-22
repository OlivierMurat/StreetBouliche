import AnimatedSprite                   from "./AnimatedSprite";
import Hadoken                          from "./specialAttacks/Hadoken";
import Stage                            from "./Stage";
import * as PIXI                        from "pixi.js";
import {calculateAspectRatioFit, ratio} from "./utils";

export default class Player {
    // specialAttack = new Hadoken();

    /**
     *
     * @type {PIXI.Graphics[]}
     */
    debugHitBoxes = [];

    _referenceWidth = 300;
    set referenceWidth(width){
        if(!width)
            width = this._referenceWidth;

        // check for percent ( contain %, or is between 0 and 1 )
        let percent = width.toString().match(/([0-9]{1,3})%/);
        if(percent || (width > 0 && width < 1)){
            //its a percentage
            if(percent){
                percent = parseFloat(percent[1]);
            }
        }
        else{
            percent = width/this._ratioSaveSize.width;
        }

        this._referenceWidth = percent;
    }

    get referenceWidth(){
        return this._referenceWidth;
    }

    _referenceHeight = 150;
    set referenceHeight(height){
        if(!height)
            height = this._referenceHeight;
        // check for percent ( contain %, or is between 0 and 1 )
        let percent = height.toString().match(/([0-9]{1,3})%/);
        if(percent || (height > 0 && height < 1)){
            //its a percentage
            if(percent){
                percent = parseFloat(percent[1]);
            }
        }
        else{
            percent = height/this._ratioSaveSize.width;
        }

        this._referenceHeight = percent;
    }

    get referenceHeight(){
        return this._referenceHeight;
    }

    _ratioSaveSize = {
        width:0,
        height:0
    };
    _ratioHeight;
    _ratioWidth;
    _calculateRatio(){
        let _ratioSaveSize = {
            width:this.stage.app.stage.width,
            height:this.stage.app.stage.height
        };

        //skip calculation
        if(this._ratioSaveSize === _ratioSaveSize)
            return;

        this._ratioSaveSize = _ratioSaveSize;

        let bounds = this.getBounds();

        let fit = calculateAspectRatioFit(bounds.width, bounds.height, this.referenceWidth, this.referenceHeight);
        this._ratioWidth = this.scaleX = fit.width;
        this._ratioHeight = this.scaleY = fit.height;
    }

    /**
     * vector for leftTurned or not
     * @type {number}
     */
    vector = 1;

    /**
     * show hitBoxes
     * @type {boolean}
     */
    _debug = false;

    set debug(debug) {
        this._debug = debug;
        if (this._debug)
            this.drawHitBoxes();
        else
            this.removeHitBoxes();
    }

    get debug() {
        return this._debug;
    }

    /**
     * @type {number}
     * @private
     */
    _scaleX = 1;
    set scaleX(scaleX){
        this._scaleX = scaleX;
        this.sprite.scale.x = this._scaleX;
    }

    get scaleX(){
        return this._scaleX
    }
    /**
     * @type {number}
     * @private
     */
    _scaleY = 1;
    set scaleY(scaleY){
        this._scaleY = scaleY;
        this.sprite.scale.y = this._scaleY;
    }

    get scaleY(){
        return this._scaleY
    }

    static ID = 0;

    // absciss
    _x;
    get x() {
        return this._x;
    }

    set x(absciss) {
        if (this.debug) {
            let movement = absciss - this.x;
            this.debugHitBoxes.forEach(hitBox => {
                hitBox.x += movement;
            });
        }

        this.sprite.x = absciss;
        this._x = absciss;
    }

    // ordinate
    _y;
    get y() {
        return this._y;
    }

    set y(ordinate) {
        if (this.debug) {
            let movement = ordinate - this.y;
            this.debugHitBoxes.forEach(hitBox => {
                hitBox.y += movement;
            });
        }
        this.sprite.y = ordinate;
        this._y = ordinate;
    }

    /**
     * @var {AnimatedSprite}
     */
    sprite;

    /**
     *
     * @type {SpecialAttack}
     */
    specialAttack = null;


    punch = {
        damage: 10,
        range : 10
    };

    kick = {
        damage: 30,
        range : 20
    };

    life = 100;

    blockAttack = false;

    crouched = false;

    bindings = {
        up     : "z",
        down   : "s",
        right  : "d",
        left   : "q",
        punch  : "&",
        kick   : "é",
        attack3: "\"",
        block  : "'"
    };

    _isLeftTurned = false;

    get isLeftTurned(){
        return this._isLeftTurned;
    }

    set isLeftTurned(isLeftTurned){
        this._isLeftTurned = isLeftTurned;
        this.vector = isLeftTurned? -1 : 1;
    }

    constructor(params = {}) {
        this.id = Player.ID++;

        if (params.bindings)
            this.bindings = params.bindings;

        if (params.isLeftTurned)
            this.isLeftTurned = params.isLeftTurned;

        this.spriteSheet = params.spriteSheet;

        this.config = params.playerConfig;
        this.sprite = new AnimatedSprite({
            spriteSheet: this.spriteSheet,
            animations : this.config.animations
        });
        // this.setAnimations(this.config.animations);
        this.name = this.config.name;
        this.punch = this.config.punch;
        this.kick = this.config.kick;
        // this.kick = this.config.kick;

        this.referenceWidth = this.config.referenceWidth;
        this.referenceHeight = this.config.referenceHeight;
        this.width = this.config.width*this._ratioWidth;
        this.height = this.config.height*this._ratioWidth;

        this.stage = Stage.Instance;
        this.stage.app.stage.addChild(this.sprite);

        // Animate the rotation
        this.stage.app.ticker.add(this.tick);
    }

    destroy() {
        this.stage.app.stage.removeChild(this.sprite);
        this.stage.app.ticker.remove(this.tick);
        this.sprite.destroy(true);
        if(this.debug)
            this.removeHitBoxes();
    }

    getBounds() {
        let bounds = this.sprite.getBounds();
        if (this.crouched) {
            bounds.height /= 2;
            bounds.y += bounds.height;
        }

        return bounds;
    }

    getAttackBounds(name) {
        let bounds;
        switch (name) {
            case "kick":
                bounds = this.kick;
                break;
            case "punch":
                bounds = this.punch;
                break;
            default:
                console.error(`unknown attack ${name}`);
                return;
        }

        let playerBounds = this.getBounds();
        // bounds.x - playerBounds.width - bounds.width
        let x;
        if(this.isLeftTurned)
            x = bounds.x - playerBounds.width - bounds.width;
        else
            x = bounds.x + playerBounds.x + playerBounds.width;

        return {...bounds, x, y: bounds.y + playerBounds.y};
    }

    drawHitBoxes() {
        let borderWidth = 1;

        //it's an attack animation ?
        let bounds;
        switch (this.sprite.animation.name) {
            case "kick":
            case "punch" :
                bounds = this.getAttackBounds(this.sprite.animation.name);
                break;
        }
        if (bounds) {
            let rectangle = new PIXI.Graphics();

            rectangle.lineStyle(borderWidth, 0xFF0000, 1);
            rectangle.beginFill(0xFF0000);

            rectangle.drawRect(bounds.x, bounds.y, bounds.width - borderWidth, bounds.height - borderWidth);
            rectangle.endFill();
            rectangle.x = this.x;
            rectangle.y = this.y;
            this.stage.app.stage.addChildAt(rectangle, 1);
            this.debugHitBoxes.push(rectangle);
        }


        //life hitBoxes
        let rectangle = new PIXI.Graphics();
        rectangle.lineStyle(borderWidth, 0x00FF00, 1);
        rectangle.beginFill(0x00FF00);

        bounds = this.getBounds();

        rectangle.drawRect(bounds.x, bounds.y, bounds.width - borderWidth, bounds.height - borderWidth);
        rectangle.endFill();
        rectangle.x = this.x;
        rectangle.y = this.y;
        this.stage.app.stage.addChildAt(rectangle, 1);
        this.debugHitBoxes.push(rectangle);


    }

    removeHitBoxes() {
        this.debugHitBoxes.forEach(hitBox => {
            hitBox.parent.removeChild(hitBox);
            hitBox.destroy();
        });
    }

    initCharacter() {
        console.log("initPlayer");

        // if (this.spriteSheetDatas === null) {
        //     throw new Error("Please set spriteSheetDatas before calling init");
        // }

        // let stage = this.stage;
        // init the SpriteSheet
        // let spriteSheet = new createjs.SpriteSheet(this.spriteSheetDatas);

        // let vector = this.isLeftTurned ? -1 : 1;

        // Init the sprite
        // let character = new createjs.Sprite(spriteSheet, "stand");

        //Add the rocket to the stage
        // app.stage.addChild(rocket);

        //Render the stage
        // this.stage.renderer.render(stage);

        // Set the position of the image in the canvas
        this.x = this.stage.stage.width / 2 + (this.width * 3 * -this.vector);
        this.y = this.stage.stage.height - this.height;
        this.x = 0;
        this.y = 0;
        this.scaleX = this.vector;
        this.scaleY = 1;

        //set the animation
        // character.gotoAndPlay("stand");
        //
        // this.character = character;

        // add the sprite in the stage
        // stage.addChild(character, this);
        // stage.update();
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
            case this.bindings.punch:
                //     // this.attack(1);
                break;
            case this.bindings.kick:
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
                this.moveCrouched();
                break;
            case this.bindings.punch:
                this.attack("punch");
                break;
            case this.bindings.kick:
                this.attack("kick");
                break;
            case this.bindings.attack3:
                this.attack(3);
                break;
            case this.bindings.block:
                this.block();
                break;
        }
    }

    /**
     * player can perform a action
     *
     * @param action
     * @returns {boolean}
     */
    canDoAction(action) {
        console.log("canDoAction " + action);
        if (this.crouched && (action !== "takeDamage" && action !== "die"))
            return false;

        //si il est mort
        if (this.life <= 0)
            return false;

        return true;
    }

    walk() {
        if (!this.canDoAction("walk"))
            return;

        //setTimeout to end walk
        clearTimeout(this.endWalkTimeout);
        this.endWalkTimeout = setTimeout(() => {
            this.sprite.setAnimation("stand");
        }, 200);

        //if last walk action is lower than the full action
        if (this.lastWalk && (new Date).getTime() - this.lastWalk.getTime() < 1000) {
            return;
        }

        this.sprite.setAnimation("walk");
        this.lastWalk = new Date();
    }

    checkCollisions(rect) {
        let bounds = this.getBounds();
        return rect.x < bounds.x + bounds.width &&
               rect.x + rect.width > bounds.x &&
               rect.y < bounds.y + bounds.height &&
               rect.y + rect.height > bounds.y;
    }

    takeDamage(damages) {
        debugger;
        if (!this.canDoAction("takeDamage"))
            return;

        this.life -= damages;

        console.log("take damage, life : " + this.life);

        if (this.life <= 0) {
            this.die();
            this.stage.thisPlayerLoose(this);
        }
        else
            this.hit();
    }

    attack(name) {
        if (!this.canDoAction("attack"))
            return;

        let attack = (damage, bounds) => {
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

        let bounds = this.getBounds();
        switch (name) {
            case "punch":
                this.sprite.setAnimation("punch");
                attack(this.punch.damage, {...bounds, width: bounds.width + this.punch.range});
                break;
            case 2:
                this.sprite.setAnimation("kick");
                attack(this.kick.damage, {...bounds, width: bounds.width + this.kick.range});
                break;
            case 3:
                console.log("superAttack !!");
                this.specialAttack.start(this, this.isLeftTurned);
                break;
        }
    }

    moveLeft() {
        if (!this.canDoAction("move"))
            return;

        //check movement
        let bounds = this.getBounds();
        if (bounds && bounds.x < 3)
            return;

        this.walk();
        this.x -= 3;
    }

    moveRight() {
        if (!this.canDoAction("move"))
            return;

        //check movement
        let bounds = this.getBounds();
        let stageWidth = this.stage.app.stage.width;

        if (bounds && (bounds.x + bounds.width + 3) > stageWidth)
            return;

        this.walk();
        this.x += 3;
    }

    moveUp() {
        if (!this.canDoAction("move"))
            return;
        // this.character.y -= 3;
    }

    moveCrouched() {
        if (!this.canDoAction("crouched"))
            return;
        this.crouched = true;
        this.sprite.setAnimation("down");
    }

    stand() {
        if (!this.canDoAction("stand"))
            return;

        this.sprite.setAnimation("stand");
    }

    block() {
        if (!this.canDoAction("block"))
            return;
        //check if player is not already blocking
        if (this.blockAttack)
            return;

        this.sprite.setAnimation("block");
        this.blockAttack = true;
    }

    blockEnd() {
        this.sprite.setAnimation("stand");
        this.blockAttack = false;
    }

    hit() {
        if (!this.canDoAction("hit"))
            return;
        this.sprite.setAnimation("hit");
    }

    die() {
        if (!this.canDoAction("die"))
            return;
        this.sprite.setAnimation("ko");
    }

    tick = (delta) => {

        this.sprite.tick(delta);
        // console.log("tick");

        //update sprite
        // this.stage.removeChild(this.sprite, this);
        //
        // let texture = this.animation.texture;
        //
        // let id = 0;
        // if(this.animation.currentFrame)
        //
        // this.sprite = new PIXI.Sprite(this.animation);
        //
        // this.sprite.x = this.x;
        // this.sprite.y = this.y;
        // this.sprite.scale.x = this.scaleX;
        // this.sprite.scale.y = this.scaleY;
        //
        // this.stage.addChild(this.sprite, this);
    };

    /**
     * change the current animation name
     * @param {string} name
     */
    // setAnimation(name) {
    //     console.log(`setAnimation ${name}`);
    //     if(!this.animations[name])
    //         throw new Error(`No animation with name ${name}, or not initialized ?`);
    //
    //     this.animation = {...this.animations[name], currentFrame:0};
    // }
    //
    // /**
    //  * generate the animations from configuration
    //  * @param {object} animations
    //  */
    // setAnimations(animations) {
    //     for (let name in animations) {
    //         let curAnimation = animations[name];
    //         let frames = [];
    //
    //         let sprites = curAnimation.sprites.map(sprite => {
    //             if (sprite.x) {
    //                 //sprite is an object
    //                 return sprite;
    //             }
    //             else {
    //                 return {
    //                     x     : sprite[0],
    //                     y     : sprite[1],
    //                     width : sprite[2],
    //                     height: sprite[3]
    //                 };
    //             }
    //         });
    //
    //
    //         let texture = PIXI.utils.TextureCache[this.spriteSheet];
    //
    //         if (!texture)
    //             throw new Error(
    //                 `texture for image "${this.spriteSheet}" is not preloaded, did you forget to add it in stage.js ?`
    //             );
    //
    //         sprites.forEach(sprite => {
    //             frames.push(new PIXI.Rectangle(sprite.x, sprite.y, sprite.width, sprite.height));
    //         });
    //
    //         // let sprite = new PIXI.extras.AnimatedSprite(frames);
    //
    //         this.animations[name] = {
    //             name,
    //             texture,
    //             frames,
    //             next: curAnimation.next || name
    //         };
    //     }
    // }
}