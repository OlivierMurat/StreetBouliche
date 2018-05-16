var spritePerso1 = "../design/images/spriteKen.png";
var spritePerso2 = "../design/images/spriteRyu.png";
var spriteAttack = "../design/images/hadoken.png";

var stage,
    bg,
    data,
    spritesheet,
    imgPerso1,
    joueur1,
    imgPerso2,
    perso2;

function init() {

    stage = new createjs.Stage('canvas');

    // Lancement du theme
    themeSong();

    // Creation de l'arène
    bg = new createjs.Bitmap("../design/images/ecole.png");
    bg.regX = 2000;
    bg.regY = 1100;
    bg.scaleX = 1;
    bg.scaleY = 1;
    bg.x = stage.canvas.width / 2;
    bg.y = stage.canvas.height / 2;
    stage.addChild(bg);
    stage.update();

    // Joueur1
    imgPerso1 = new Image().src = spritePerso1;
    imgPerso1.onload = createPlayer(1, spritePerso1);
    perso1 = new createjs.Sprite(spriteSheet, "stand");
    perso1.scaleX = 1.9;
    perso1.scaleY = 1.9;
    perso1.x = stage.canvas.width / 2 - 200;
    perso1.y = stage.canvas.height - 110;
    stage.addChild(perso1);
    stage.update();


    // Joueur2
    imgPerso2 = new Image().src = spritePerso2;
    imgPerso2.onload = createPlayer(2, spritePerso2);
    perso2 = new createjs.Sprite(spriteSheet, "stand");
    perso2.scaleX = -1.9;
    perso2.scaleY = 1.9;
    perso2.x = stage.canvas.width / 2 + 200;
    perso2.y = stage.canvas.height - 110;
    stage.addChild(perso1);
    stage.update();

    //
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

function themeSong() {
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.on("fileload", this.loadHandler, this);
    createjs.Sound.registerSound("../design/sons/theme.mp3", "themeSound");

    function loadHandler(event) {
        var instance = createjs.Sound.play("themeSound");
        instance.on("complete", this.handleComplete, this);
        instance.volume = 1;
    }
}

function createPlayer(spriteImg) {
    data = {
        images: [spriteImg],
        frames: {
            width: 100,
            height: 100,
            regX: 50,
            regY: 50
        },
        animations: {
            stand: [0, 3],
            walk: [4, 7],
            punch: [8, 10],
            kick: [11, 13],
            block: 14,
            down: 15,
            hit: [16, 19],
            ko: [20, 22]
        }
    };
    spriteSheet = new createjs.SpriteSheet(data);
}

function createHadoken(spriteImg) {
    var data = {
        images: [spriteImg],
        frames: {
            width: 32,
            height: 28,
            regX: 16,
            regY: 14
        },
        animations: {
            standHadoken1: [0, 1],
            burstHadoken1: [2, 5]
        }
    };
    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, "standHadoken1");
}

function shapes() {

    // Barre de vie jaune des deux personnages

    shape1 = new createjs.Shape();
    shape1.graphics.beginFill("#FFCC00").drawRect(0, 0, 238, 16);
    shape1.scaleX = 0.47;
    shape1.scaleY = 0.3;
    shape1.x = 10;
    shape1.y = 11;
    shape1.regX = 0;
    shape1.regY = 0;

    shape2 = new createjs.Shape();
    shape2.graphics.beginFill("#FFCC00").drawRect(0, 0, 238, 16);
    shape2.scaleX = -0.47;
    shape2.scaleY = 0.3;
    shape2.x = stage.canvas.width - 10;
    shape2.y = 11;
    shape2.regX = 0;
    shape2.regY = 0;


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
    if (perso1.x <= 10) {
        perso1.x = 10;
    }
    if (perso1.x >= 290) {
        perso1.x = 290;
    }
    if (perso2.x <= 10) {
        perso2.x = 10;
    }
    if (perso2.x >= 290) {
        perso2.x = 290;
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
        src: "../design/sons/theme.mp3"
    });

    function handleFileLoad(event) {
        createjs.Sound.play(event.src);
    }
}

window.onload = init;