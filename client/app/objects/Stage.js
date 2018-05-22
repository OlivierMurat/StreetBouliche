import themeSong             from "../assets/sound/theme1.ogg";
import fightSong             from "../assets/sound/effects/fight.mp3";
import roundSong             from "../assets/sound/effects/round.mp3";
import ToulouseYnovCampusPNG from "../assets/images/Toulouse-YnovCampus.png";
import SpriteKen             from "../assets/characters/ken/sprite.png";
import SpriteRyu             from "../assets/images/spriteRyu.png";
import SpriteHadoken         from "../assets/images/hadoken.png";
import CharacterFactory      from "./characters/factory";
import Ken                   from "./characters/ken";
import EventEmitter          from "./EventEmitter";
import Player                from "./player";
import {Howl}                from "howler";
import * as PIXI             from "pixi.js";

export default class Stage extends EventEmitter {

    static Instance;

    partyFinish = false;
    players = [];

    /**
     * @type {Player[]}
     */
    testPlayers;

    keyPressed = [];
    keyLocked = [
        "&",
        "é",
        "\"",
        "1",
        "2",
        "3"
    ];
    children = [];

    handleKeyDown(keyPressed) {
        //if not already registered in pressed
        if (!this.keyPressed.find(key => key.key === keyPressed)) {
            this.keyPressed.push({key: keyPressed});
        }
    }

    handleKeyUp(keyPressed) {
        this.keyPressed = this.keyPressed.filter(key => key.key !== keyPressed);
        this.handleKeyBoardRelease(keyPressed);
    }

    checkCollisionWithOtherChildren(rect) {
        return this.children.filter(child => child.o.checkCollisions && child.o.checkCollisions(rect)).map(
            child => child.o);
    }

    addChild(element, object) {
        this.stage.addChild(element);
        this.children.push({el: element, o: object});
    }

    removeChild(element) {
        this.stage.removeChild(element);
        this.children = this.children.filter(child => child.el !== element);
    }

    constructor() {
        super();
        Stage.Instance = this;

        this.registerUniqEvent("assets-loaded");

        this.checkKeyPressedInterval = setInterval(() => {
            this.checkKeyPressed();
        }, 50);

        this.loader = new PIXI.loaders.Loader();

        this.loader.onComplete.add(() => {
            this.emit("assets-loaded");
        });

        //add all assets to preload
        this.loader
            // .add("ToulouseYnovCampusPNG", ToulouseYnovCampusPNG)
            .add("SpriteHadoken", SpriteHadoken)
            .add("Sprite-ken", SpriteKen)
            .add("Sprite-ryu", SpriteRyu)
            .add("themeSong", themeSong)
            .add("fightSong", fightSong)
            .add("roundSong", roundSong);

        //start the load
        this.loader.load();

        //debug
        window.stage = this;
        window.checkCharacter = this.checkCharacter;
    }

    checkKeyPressed() {
        this.keyPressed.forEach(key => {
            //key is locked sometimes, like for punch
            if (!key.locked) {
                this.handleKeyBoardInput(key.key);
                if (this.keyLocked.find(lockedKey => lockedKey === key.key)) {
                    key.locked = true;
                    console.log("lock " + key.key);
                }
            }
        });
    }

    handleKeyBoardRelease(key) {
        this.players.forEach(player => player.handleKeyBoardRelease(key));
    }

    handleKeyBoardInput(key) {
        this.players.forEach(player => player.handleKeyBoardInput(key));
    }

    tick = () => {
        // this.stage.update();
    };

    thisPlayerLoose(player) {
        let winner = this.children.find(child => child.o.walk && !(child.o === player));
        console.log("we have a winner");
    }

    init(params = {}) {
        //wait assets loaded before start
        this.on("assets-loaded", () => {

            let canvas = params.canvas || document.getElementById("canvas");

            this.app = new PIXI.Application({
                width : canvas.clientWidth,
                height: canvas.clientHeight,
                view  : params.canvas || document.getElementById("canvas")
            });

            this.app.renderer.autoResize = true;

            //add themeSong
            this.themeSong = new Howl({
                src     : [themeSong],
                autoplay: true,
                loop    : true,
                volume  : 0.5
            });

            // this.stage = new createjs.Stage("canvas");
            // document.getElementById("canvas").stage = this.stage;
            this.startMusic();

            this.setBackground(ToulouseYnovCampusPNG);

            // let player = CharacterFactory.getCharacter("ken", {
            //     isLeftTurned: false
            // });

            this.stage = this.app.stage;
            // player.initCharacter();

            // this.players.push(player);

            // window.test = this.players[0];

            // this.players.push(new Ken({
            //     isLeftTurned: true,
            //     bindings    : {
            //         up     : "ArrowUp",
            //         down   : "ArrowDown",
            //         right  : "ArrowRight",
            //         left   : "ArrowLeft",
            //         attack1: "1",
            //         attack2: "2",
            //         attack3: "3",
            //         block  : "4"
            //     }
            // }));


            // Ticker
            // createjs.Ticker.useRAF = true;
            // createjs.Ticker.setFPS(60);
            // createjs.Ticker.addEventListener("tick", () => {this.tick();});
        });

    }

    destroy() {

    }

    checkCharacter = (charName, isLeftTurned = false) => {

        if(this.testPlayers){
            this.testPlayers.forEach(player => {
                player.destroy();
            });
        }
        let players = [];
        let character = CharacterFactory.getCharacterConfiguration(charName);

        let x = 0;

        //get one player by animations
        for (let name in character.configuration.animations) {
            let curPlayer = CharacterFactory.getCharacter(charName, {
                isLeftTurned
            });
            curPlayer.initCharacter();

            curPlayer.sprite.animationLocked = true;

            // noinspection JSUnfilteredForInLoop
            curPlayer.sprite.setAnimation(name);

            curPlayer.debug = true;
            curPlayer.x = x+(isLeftTurned?curPlayer.width:0);

            x += curPlayer.sprite.getBounds().width + 50;
            players.push(curPlayer);
        }
        this.testPlayers = players;
    };

    startMusic() {
        this.themeSong.play();

        // createjs.Sound.alternateExtensions = ["mp3"];
        // createjs.Sound.addEventListener("fileload", (event) => {
        // createjs.Sound.play("themeSong");
        // createjs.Sound.play("fight");
        // });
        // createjs.Sound.registerSound({
        //     id : "themeSong",
        //     src: themeSong
        // });
        // createjs.Sound.registerSound({
        //     id : "fight",
        //     src: fightSong
        // });
    }

    update(...args) {
        // return this.stage.update(...args);
    }

    setBackground(background) {

        let texture = PIXI.utils.TextureCache[background];

        if (!texture) {
            this.backgroundSprite = PIXI.Sprite.fromImage(background);
        }
        else {
            this.backgroundSprite = new PIXI.Sprite(texture);
        }

        let imageRatio = this.backgroundSprite.width / this.backgroundSprite.height;
        let containerRatio = this.app.renderer.width / this.app.renderer.height;

        if (containerRatio > imageRatio) {
            this.backgroundSprite.height = this.backgroundSprite.height / (this.backgroundSprite.width / this.app.renderer.width);
            this.backgroundSprite.width = this.app.renderer.width;
            this.backgroundSprite.position.x = 0;
            this.backgroundSprite.position.y = (this.app.renderer.height - this.backgroundSprite.height) / 2;
        }
        else {
            this.backgroundSprite.width = this.backgroundSprite.width / (this.backgroundSprite.height / this.app.renderer.height);
            this.backgroundSprite.height = this.app.renderer.height;
            this.backgroundSprite.position.y = 0;
            this.backgroundSprite.position.x = (this.app.renderer.width - this.backgroundSprite.width) / 2;
        }

        // Add the bunny to the scene we are building
        this.app.stage.addChild(this.backgroundSprite);

        // let bg = new createjs.Bitmap(background);
        // bg.regX = 0;
        // bg.regY = 0;
        // bg.scaleX = 0.19;
        // bg.scaleY = 0.19;
        // bg.x = 0;
        // bg.y = 0;
        //
        // bg.image.onload = () => {
        //     this.update();
        // };
        //
        // this.stage.addChild(bg);
    }
}