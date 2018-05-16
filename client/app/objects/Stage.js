import themeSong             from "../assets/sound/theme.mp3";
import ToulouseYnovCampusPNG from "../assets/images/Toulouse-YnovCampus.png";
import SpriteKen             from "../assets/images/spriteKen.png";
import SpriteRyu             from "../assets/images/spriteRyu.png";
import Player                from "./player";

export default class Stage {

    static Instance;

    partyFinish = false;
    players = [];

    constructor() {
        Stage.Instance = this;
        //start theme song
        // createjs.Sound.addEventListener("fileload", this.startThemeSong());
        // this.loadMusics();
    }

    handleKeyBoardInput(key) {
        this.players.forEach(player => player.handleKeyBoardInput(key));
    }

    init() {

        this.stage = new createjs.Stage("canvas");
        this.startMusic();

        this.setBackground(ToulouseYnovCampusPNG);

        this.players.push(new Player({
            isLeftTurned: false,
            spriteImage : SpriteKen
        }));
        // this.player2 = new Player({
        //     isLeftTurned : true,
        //     spriteImage: SpriteRyu
        // });
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
            id : "themeSound",
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

        this.stage.addChild(bg);
        this.update();
    }
}