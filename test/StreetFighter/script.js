/*jslint eqeq: true, sloppy: true*/
/*global createjs, keyPress, keyRelease,creationPerso1,creationPerso2,tick,gestionVie,ko,shapes,themeSong,handleFileLoad,creationHadoken1,creationHadoken2,handleComplete*/

var stage,
    imgPerso1 = new Image(),
    perso1,
    imgPerso2 = new Image(),
    perso2,
    imgHadoken1 = new Image(),
    imgHadoken2 = new Image(),
    hadoken1,
    hadoken2,
    clavier1 = {
        gauche: 0,
        droite: 0,
        bas: 0,
        U: 0,
        I: 0,
        O: 0
    },
    clavier2 = {
        gauche: 0,
        droite: 0,
        bas: 0,
        numPad1: 0,
        numPad2: 0,
        numPad3: 0
    },
    bg,
    bmpViePerso1,
    bmpViePerso2,
    shape1,
    shape2,
    isThereHadoken1 = 0,
    isThereHadoken2 = 0,
    bmpKenWins,
    bmpRyuWins;

window.onkeydown = keyPress;
window.onkeyup = keyRelease;

//function keyPress(e) {    // PERSO 1    if (e.keyCode == 81) {        clavier1.gauche = 1;        perso1.gotoAndPlay("walkPerso1");    }    if (e.keyCode == 83) {        clavier1.bas = 1;        perso1.gotoAndPlay("downPerso1");    }    if (e.keyCode == 68) {        clavier1.droite = 1;        perso1.gotoAndPlay("walkPerso1");    }    if (e.keyCode == 85) {        clavier1.U = 1;        perso1.gotoAndPlay("punch1Perso1");    }    if (e.keyCode == 73) {        clavier1.I = 1;        perso1.gotoAndPlay("kick1Perso1");    }    if (e.keyCode == 79) {        clavier1.O = 1;        perso1.gotoAndPlay("blockPerso1");    }    if (e.keyCode == 80) {        if (isThereHadoken1 === 0 && clavier1.O == 0) {            hadoken1.x = perso1.x + 25;            hadoken1.y = perso1.y - 45;            hadoken1.scaleX = 1.3;            hadoken1.scaleY = 1.3;            stage.addChild(hadoken1);            isThereHadoken1 = 1;            hadoken1.gotoAndPlay("standHadoken1");        }    }    // PERSO 2    if (e.keyCode == 37) {        clavier2.gauche = 1;        perso2.gotoAndPlay("walkPerso2");    }    if (e.keyCode == 40) {        clavier2.bas = 1;        perso2.gotoAndPlay("downPerso2");    }    if (e.keyCode == 39) {        clavier2.droite = 1;        perso2.gotoAndPlay("walkPerso2");    }    if (e.keyCode == 97) {        clavier2.numPad1 = 1;        perso2.gotoAndPlay("punch1Perso2");    }    if (e.keyCode == 98) {        clavier2.numPad2 = 1;        perso2.gotoAndPlay("kick1Perso2");    }    if (e.keyCode == 99) {        clavier2.numPad3 = 1;        perso2.gotoAndPlay("blockPerso2");    }    if (e.keyCode == 100) {        if (isThereHadoken2 === 0 && clavier2.numPad3 == 0) {            hadoken2.x = perso2.x - 25;            hadoken2.y = perso2.y - 45;            hadoken2.scaleX = -1.3;            hadoken2.scaleY = 1.3;            stage.addChild(hadoken2);            isThereHadoken2 = 1;            hadoken2.gotoAndPlay("standHadoken2");        }    }}function keyRelease(e) {    // PERSO 1    if (e.keyCode == 81) {        clavier1.gauche = 0;        perso1.gotoAndPlay("standPerso1");    }    if (e.keyCode == 68) {        clavier1.droite = 0;        perso1.gotoAndPlay("standPerso1");    }    if (e.keyCode == 83) {        clavier1.bas = 0;        perso1.gotoAndPlay("standPerso1");    }    if (e.keyCode == 85) {        clavier1.U = 0;        perso1.gotoAndPlay("standPerso1");    }    if (e.keyCode == 73) {        clavier1.I = 0;        perso1.gotoAndPlay("standPerso1");    }    if (e.keyCode == 79) {        clavier1.O = 0;        perso1.gotoAndPlay("standPerso1");    }    // PERSO 2    if (e.keyCode == 37) {        clavier2.gauche = 0;        perso2.gotoAndPlay("standPerso2");    }    if (e.keyCode == 39) {        clavier2.droite = 0;        perso2.gotoAndPlay("standPerso2");    }    if (e.keyCode == 38) {        clavier2.haut = 0;        perso2.gotoAndPlay("standPerso2");    }    if (e.keyCode == 40) {        clavier2.bas = 0;        perso2.gotoAndPlay("standPerso2");    }    if (e.keyCode == 97) {        clavier2.numPad1 = 0;        perso2.gotoAndPlay("standPerso2");    }    if (e.keyCode == 98) {        clavier2.numPad2 = 0;        perso2.gotoAndPlay("standPerso2");    }    if (e.keyCode == 99) {        clavier2.numPad3 = 0;        perso2.gotoAndPlay("standPerso2");    }}

function init() {
    stage = new createjs.Stage('canvas');

    // Nous lançons la musique du jeu
    themeSong();

    // Creation de l'arène
    bg = new createjs.Bitmap("img/arena.png");
    bg.regX = 328.5;
    bg.regY = 112;
    bg.scaleX = 1.8;
    bg.scaleY = 1.8;
    bg.x = stage.canvas.width / 2;
    bg.y = stage.canvas.height / 2;
    stage.addChild(bg);
    stage.update();

    // On crée le personnage 1
    imgPerso1.src = "img/ken.png";
    imgPerso1.onload = creationPerso1;
    stage.update();

    // Idem pour le personnage 2
    imgPerso2.src = "img/ryu.png";
    imgPerso2.onload = creationPerso2;
    stage.update();

    // HADOKEN
    imgHadoken1.src = "img/hadoken.png";
    imgHadoken1.onload = creationHadoken1;
    imgHadoken2.src = "img/hadoken.png";
    imgHadoken2.onload = creationHadoken2;
    creationHadoken1();
    creationHadoken2();
    stage.update();

    // Fonction génératrice de la barre de vie
    shapes();

    // Fond de la barre de vie (en rouge)
    bmpViePerso1 = new createjs.Bitmap("img/VIE.png");
    bmpViePerso1.regX = 256;
    bmpViePerso1.regY = 16;
    bmpViePerso1.x = stage.canvas.width / 2 - 50;
    bmpViePerso1.y = 50;
    bmpViePerso1.scaleX = 1.01;
    bmpViePerso1.scaleY = 0.85;


    bmpViePerso2 = new createjs.Bitmap("img/VIE.png");
    bmpViePerso2.regX = 256;
    bmpViePerso2.regY = 16;
    bmpViePerso2.scaleX = -1.01;
    bmpViePerso2.scaleY = 0.85;
    bmpViePerso2.x = bmpViePerso1.x + 100;
    bmpViePerso2.y = 50;

    stage.addChild(bmpViePerso1);
    stage.addChild(bmpViePerso2);

    // Images du message du vainqueur
    bmpKenWins = new createjs.Bitmap("img/KENwins.png");
    bmpKenWins.regX = 150;
    bmpKenWins.regX = 100;
    bmpKenWins.x = stage.canvas.width / 2 - 50;
    bmpKenWins.y = stage.canvas.height / 2 - 100;
    bmpKenWins.scaleX = 1.2;
    bmpKenWins.scaleY = 1.2;
    bmpKenWins.alpha = 0;

    bmpRyuWins = new createjs.Bitmap("img/RYUwins.png");
    bmpRyuWins.regX = 150;
    bmpRyuWins.regX = 100;
    bmpRyuWins.x = stage.canvas.width / 2 - 50;
    bmpRyuWins.y = stage.canvas.height / 2 - 100;
    bmpRyuWins.scaleX = 1.2;
    bmpRyuWins.scaleY = 1.2;
    bmpRyuWins.alpha = 0;

    stage.update();

    // Ticker
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", tick);
}

function creationPerso1() {
    var ss = new createjs.SpriteSheet({
        images: [imgPerso1],
        frames: {
            width: 100,
            height: 100,
            regX: 50,
            regY: 50
        },
        animations: {
            standPerso1: [0, 3, true, 0.1],
            walkPerso1: [4, 8, true, 0.1],
            punch1Perso1: [10, 12, false, 0.15],
            kick1Perso1: [13, 15, false, 0.1],
            blockPerso1: [16, 16, false, 0.05],
            hitPerso1: [20, 23, false, 0.2],
            koPerso1: [25, 27, false, 0.05],
            downPerso1: [27, 27, false, 0.05]
        }
    });

    perso1 = new createjs.Sprite(ss, "standPerso1");
    perso1.scaleX = 1.9;
    perso1.scaleY = 1.9;
    perso1.x = stage.canvas.width / 2 - 200;
    perso1.y = stage.canvas.height - 110;

    stage.addChild(perso1);
    stage.update();
}

function creationPerso2() {
    var ss = new createjs.SpriteSheet({
        images: [imgPerso2],
        frames: {
            width: 100,
            height: 100,
            regX: 50,
            regY: 50
        },
        animations: {
            standPerso2: [0, 3, true, 0.1],
            walkPerso2: [4, 8, true, 0.1],
            punch1Perso2: [10, 12, false, 0.15],
            kick1Perso2: [13, 15, false, 0.1],
            blockPerso2: [16, 16, false, 0.05],
            hitPerso2: [20, 23, false, 0.1],
            koPerso2: [25, 27, false, 0.05],
            downPerso2: [27, 27, false, 0.05]
        }
    });

    perso2 = new createjs.Sprite(ss, "standPerso2");
    perso2.x = stage.canvas.width / 2 + 200;
    perso2.y = stage.canvas.height / 2 + 90;
    perso2.scaleX = -1.9;
    perso2.scaleY = 1.9;

    perso2.gotoAndPlay("standPerso2");
    stage.addChild(perso2);
    stage.update();
}

function creationHadoken1() {
    var ss = new createjs.SpriteSheet({
        images: [imgHadoken1],
        frames: {
            width: 32,
            height: 28,
            regX: 16,
            regY: 14
        },
        animations: {
            standHadoken1: [0, 1, true, 0.3],
            burstHadoken1: [2, 5, false, 0.15]
        }
    });

    hadoken1 = new createjs.Sprite(ss, "standHadoken1");
    stage.update();
}

function creationHadoken2() {
    imgHadoken2.src = "img/hadoken.png";

    var ss = new createjs.SpriteSheet({
        images: [imgHadoken2],
        frames: {
            width: 32,
            height: 28,
            regX: 16,
            regY: 14
        },
        animations: {
            standHadoken2: [0, 1, true, 0.3],
            burstHadoken2: [2, 5, false, 0.15]
        }
    });

    hadoken2 = new createjs.Sprite(ss, "standHadoken2");
    stage.update();
}

function shapes() {

    // Barre de vie jaune des deux personnages

    shape1 = new createjs.Shape();
    shape1.graphics.beginFill("#FFCC00").drawRect(0, 0, 238, 16);
    shape1.x = stage.canvas.width / 2 - 52;
    shape1.scaleY = 1.2;
    shape1.scaleX = 1;
    shape1.y = 59;
    shape1.regX = 238;
    shape1.regY = 16;

    shape2 = new createjs.Shape();
    shape2.graphics.beginFill("#FFCC00").drawRect(0, 0, 238, 16);
    shape2.x = stage.canvas.width / 2 + 52;
    shape2.scaleX = -1;
    shape2.scaleY = 1.2;
    shape2.y = 59;
    shape2.regX = 238;
    shape2.regY = 16;


    stage.addChild(shape1);
    stage.addChild(shape2);

    stage.update();
}

function deplacement() {

    // Déplacement des personnages
    if (clavier1.gauche == 1) {
        perso1.x = perso1.x - 3;
    }
    if (clavier1.droite == 1) {
        perso1.x = perso1.x + 3;
    }
    if (clavier2.gauche == 1) {
        perso2.x = perso2.x - 3;
    }
    if (clavier2.droite == 1) {
        perso2.x = perso2.x + 3;
    }

    // Gestion de collision au bord de la map
    if (perso1.x <= 30) {
        perso1.x = 30;
    }
    if (perso2.x >= 766) {
        perso2.x = 766;
    }

    //Se baisser
    if (clavier1.bas == 1) {
        perso1.y = stage.canvas.height - 40;
        clavier1.droite = 0;
        clavier1.gauche = 0;
        perso1.gotoAndPlay("downPerso1");
    }
    if (clavier1.bas === 0) {
        perso1.y = stage.canvas.height - 110;
    }
    if (clavier2.bas == 1) {
        perso2.y = stage.canvas.height - 40;
        clavier2.gauche = 0;
        clavier2.droite = 0;
        perso2.gotoAndPlay("downPerso2");
    }
    if (clavier2.bas === 0) {
        perso2.y = stage.canvas.height - 110;
    }


    // Déplacement des Hadoken

    //Hadoken 1
    if (hadoken1.x - perso2.x < 30) {
        hadoken1.x = hadoken1.x + 8;
    }
    if (hadoken1.x - perso2.x > 30) {
        hadoken1.x = hadoken1.x + 8;
    }
    if (hadoken1.x > 800) {
        stage.removeChild(hadoken1);
        isThereHadoken1 = 0;
        stage.update();
    }
    //Hadoken 2
    if (hadoken2.x - perso1 > 30) {
        hadoken2.x = hadoken2.x - 8;
    }
    if (hadoken2.x - perso2.x < 30) {
        hadoken2.x = hadoken2.x - 8;
    }
    if (hadoken2.x < 0) {
        stage.removeChild(hadoken2);
        isThereHadoken2 = 0;
        stage.update();
    }
}

function tick() {

    // Les fonctions incluses dans le Ticker
    deplacement();
    gestionVie();

    // Quand un personnage n'a plus de vie, on arrête le jeu
    if (shape1.scaleX <= 0) {
        stage.removeChild(shape1);
        ko();
        perso1.gotoAndPlay("koPerso1");
        stage.addChild(bmpRyuWins);
        bmpRyuWins.alpha = bmpRyuWins.alpha + 0.05;
    }
    if (shape2.scaleX >= 0) {
        stage.removeChild(shape2);
        ko();
        perso2.gotoAndPlay("koPerso2");
        stage.addChild(bmpKenWins);
        bmpKenWins.alpha = bmpKenWins.alpha + 0.05;
    }
    stage.update();
}

function gestionVie() {

    // Attaques du perso 1 (coup de poing et pied)
    if (clavier1.U == 1 && Math.abs(perso2.x - perso1.x) < 80 && clavier2.numPad3 === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape2.scaleX = shape2.scaleX + 0.05;
        perso2.x = perso2.x + 20;
        perso2.gotoAndPlay("hitPerso2");
        stage.update();
    }
    if (clavier1.I == 1 && Math.abs(perso2.x - perso1.x) < 95 && clavier2.numPad3 === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape2.scaleX = shape2.scaleX + 0.1;
        perso2.x = perso2.x + 40;
        perso2.gotoAndPlay("hitPerso2");
        stage.update();
    }

    // Attaques du perso 2 (coup de poing et pied)
    if (clavier2.numPad1 == 1 && Math.abs(perso2.x - perso1.x) < 80 && clavier1.O === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape1.scaleX = shape1.scaleX - 0.05;
        perso1.x = perso1.x - 20;
        perso1.gotoAndPlay("hitPerso1");
        stage.update();
    }
    if (clavier2.numPad2 == 1 && Math.abs(perso2.x - perso1.x) < 95 && clavier1.O === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape1.scaleX = shape1.scaleX - 0.1;
        perso1.x = perso1.x - 40;
        perso1.gotoAndPlay("hitPerso1");
        stage.update();
    }

    // HADOKEN
    if (Math.abs(hadoken1.x - perso2.x) < 30 && Math.abs(hadoken1.y - perso2.y) == 45) {
        shape2.scaleX = shape2.scaleX + 0.1;
        perso2.gotoAndPlay("hitPerso2");
        hadoken1.x = 8000;
        stage.update();
    }
    if (Math.abs(hadoken2.x - perso1.x) < 30 && Math.abs(hadoken2.y - perso1.y) == 45) {
        shape1.scaleX = shape1.scaleX - 0.1;
        perso1.gotoAndPlay("hitPerso1");
        hadoken2.x = -8000;
        stage.update();
    }
}

function ko() {
    // Si la partie s'arrête, on empêche aux joueurs de bouger
    clavier1.gauche = 0;
    clavier1.droite = 0;
    clavier2.gauche = 0;
    clavier2.droite = 0;
    window.onkeydown = null;
    window.onkeyup = null;
}

function themeSong() {
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    createjs.Sound.registerSound({
        id: "themeSound",
        src: "theme.mp3"
    });

    function handleFileLoad(event) {
        createjs.Sound.play(event.src);
    }
}

window.onload = init;