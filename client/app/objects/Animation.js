export default class Animation {
    /**
     * @var {string}
     */
    next;

    currentSpriteID = 0;
    totalNumberOfSprites;

    getNextSprite(){
        if(this.currentSpriteID === this.totalNumberOfSprites)
            return false;

        return this.sprites[this.currentSpriteID++];
    }

    reset(){
        this.currentSpriteID = 0;
    }

    /**
     * @var {PIXI.Rectangle[]}
     */
    _sprites;

    set sprites(sprites) {
        //convert to object
        this.totalNumberOfSprites = 0;
        this._sprites = sprites.map(sprite => {
            this.totalNumberOfSprites++;

            if (sprite instanceof PIXI.Rectangle)
                return sprite;
            else if (sprite.x) {
                //sprite is an object
                return new PIXI.Rectangle(sprite.x, sprite.y, sprite.width, sprite.height);
            }
            else {
                return new PIXI.Rectangle(sprite[0], sprite[1], sprite[2], sprite[3]);
            }
        });
    }

    get sprites() {
        return this._sprites;
    }

    /**
     * @var {string}
     */
    name;

    /**
     *
     * @param {{}} params
     * @param {string} name
     */
    constructor(params, name) {
        this.name = name;
        this.sprites = params.sprites;
        this.next = params.next || this.name;
    }

}