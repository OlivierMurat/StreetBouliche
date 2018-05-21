import * as PIXI from "pixi.js";
import Animation from "./Animation";

export default class AnimatedSprite extends PIXI.Sprite{

    started = true;

    currentFrame = 0;

    totalNumberOfFrames=0;

    /**
     * use this to lock the animation (don't go to next animation)
     * @type {boolean}
     */
    animationLocked = false;

    _spriteSheet;
    set spriteSheet(spriteSheet) {
        this._spriteSheet = spriteSheet;
        // this.spriteSheetLoaded = false;

        // PIXI.loader
        //     .add(spriteSheet)
        //     .load(() => {
        //     });
        // this.initSpriteSheet();
        // if(!PIXI.utils.TextureCache[this._spriteSheet]){
        // }
        // else
        //     this.initSpriteSheet();

    };

    get spriteSheet() {
        return this._spriteSheet;
    }

    constructor(params) {
        super();
        if (!params.spriteSheet)
            throw new Error("need a spriteSheet");

        this.spriteSheet = params.spriteSheet;

        this.animations = params.animations;

        this.FPS = params.FPS || 60;

        this.init();
    }

    /**
     *
     * @type {{Animation}}
     * @private
     */
    _animations = {};
    /**
     * generate the animations from configuration
     * @param {object} animations
     */
    set animations(animations) {
        let firstAnimation = null;
        for (let name in animations) {
            if(firstAnimation === null)
                firstAnimation = name;

            this._animations[name] = new Animation(animations[name], name);
            // let curAnimation = animations[name];
            // let frames = [];
            //
            // let sprites = curAnimation.sprites.map(sprite => {
            //     if (sprite.x) {
            //         //sprite is an object
            //         return sprite;
            //     }
            //     else {
            //         return {
            //             x     : sprite[0],
            //             y     : sprite[1],
            //             width : sprite[2],
            //             height: sprite[3]
            //         };
            //     }
            // });


            // let texture = PIXI.utils.TextureCache[this.spriteSheet];
            //
            // if (!texture)
            //     throw new Error(
            //         `texture for image "${this.spriteSheet}" is not preloaded, did you forget to add it in stage.js ?`
            //     );

            // let totalFrames = 0;
            // sprites.forEach(sprite => {
            //     totalFrames++;
            //     frames.push(new PIXI.Rectangle(sprite.x, sprite.y, sprite.width, sprite.height));
            // });

            // let sprite = new PIXI.extras.AnimatedSprite(frames);

            // this.animations[name] = {
            //     totalFrames,
            //     name,
            //     texture,
            //     frames,
            //     next: curAnimation.next || name
            // };
        }

        this.setAnimation(firstAnimation);
    }

    get animations() {
        return this._animations;
    }

    /**
     * @var {Animation}
     */
    _animation;

    /**
     * stock the current animation
     * @param animation
     */
    set animation(animation) {
        if (typeof animation === "string")
            this.setAnimation(animation);
        else{
            this._animation = animation;
            this.currentFrame = 0;
            this.totalNumberOfFrames = this._animation.totalNumberOfSprites;
        }
    }

    get animation(){
        return this._animation;
    }

    /**
     * set the current animation from a string
     * @param {string} animation
     */
    setAnimation(animation) {
        if(!this.animations[animation])
            throw new Error(`Unknown animation with name ${animation}`);

        this.animation = this.animations[animation];
        this.animation.reset();
    }

    play() {
        this.started = true;
    }

    pause() {
        this.started = false;
    }

    time=0;

    tick(delta) {
        if (this.started) {
            this.time+= delta;
            if(this.time > 10){
                this.time = 0;
                // this.texture.frame = this.getNextFrame();
                let cachedTexture = PIXI.utils.TextureCache[this.spriteSheet];
                this.texture = new PIXI.Texture(cachedTexture, cachedTexture.frame.clone());
                this.texture.frame = this.getNextFrame();
            }
        }
    }

    getNextFrame() {
        let nextSprite = this.animation.getNextSprite();
        if (!nextSprite) {
            if(this.animationLocked){
                this.animation.currentSpriteID = 0;
                nextSprite = this.animation.getNextSprite();
            }
            else{
                this.setAnimation(this.animation.next);
                nextSprite = this.animation.getNextSprite();
            }
        }

        return nextSprite;
    }

    initSpriteSheet() {
        this.spriteSheetLoaded = true;
    }

    init() {
        this.texture = PIXI.Texture.fromImage(this.spriteSheet);
        // this.texture = PIXI.utils.TextureCache[this.spriteSheet];
        this.texture.frame = this.getNextFrame();
    }
}