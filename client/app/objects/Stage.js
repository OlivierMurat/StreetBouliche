import themeSong             from "../assets/sound/theme.mp3";
import ToulouseYnovCampusPNG from "../assets/images/Toulouse-YnovCampus.png";
import SpriteKen             from "../assets/images/spriteKen.png";
import SpriteRyu             from "../assets/images/spriteRyu.png";
import Ken                   from "./characters/ken";
import Player                from "./player";

export default class Stage {

    static Instance;

    partyFinish = false;
    players = [];

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
        return this.children.filter(child => child.o.checkCollisions && child.o.checkCollisions(rect)).map(child=>child.o);
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
        Stage.Instance = this;

        this.checkKeyPressedInterval = setInterval(() => {
            this.checkKeyPressed();
        }, 50);

        //start theme song
        // createjs.Sound.addEventListener("fileload", this.startThemeSong());
        // this.loadMusics();
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
        this.stage.update();
    };

    thisPlayerLoose(player){
        let winner = this.children.find(child => child.o.walk && !(child.o === player));
        console.log("we have a winner");
    }

    init() {
        this.stage = new createjs.Stage("canvas");
        document.getElementById("canvas").stage = this.stage;
        this.startMusic();

        this.setBackground(ToulouseYnovCampusPNG);

        this.players.push(new Ken({
            isLeftTurned: false
        }));

        // window.test = this.players[0];

        this.players.push(new Ken({
            isLeftTurned: true,
            bindings    : {
                up     : "ArrowUp",
                down   : "ArrowDown",
                right  : "ArrowRight",
                left   : "ArrowLeft",
                attack1: "1",
                attack2: "2",
                attack3: "3",
                block  : "4"
            }
        }));


        // Ticker
        createjs.Ticker.useRAF = true;
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", () => {this.tick();});
    }

    destroy() {

    }

    loadMusics() {

    }

    startThemeSong(event) {
        createjs.Sound.play("themeSong");
        createjs.off("fileload", (e) => {this.startThemeSong(e);});
    }

    startMusic() {
        createjs.Sound.alternateExtensions = ["mp3"];

        createjs.Sound.addEventListener("fileload", (event) => {
            createjs.Sound.play("themeSong");
        });

        createjs.Sound.registerSound({
            id : "themeSong",
            src: themeSong
        });
    }

    update(...args) {
        return this.stage.update(...args);
    }

    setBackground(background) {
        let bg = new createjs.Bitmap(background);
        bg.regX = 0;
        bg.regY = 0;
        bg.scaleX = 0.19;
        bg.scaleY = 0.19;
        bg.x = 0;
        bg.y = 0;

        bg.image.onload = () => {
            this.update();
        };

        this.stage.addChild(bg);
    }
}