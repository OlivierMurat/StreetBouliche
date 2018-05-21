var spriteChar1 = "../design/images/sprite.png";
var spriteChar2 = "../design/images/spriteRyu.png";

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

function keyPress(e) {

    // PERSO 1
    if (e.keyCode == 81) {
        clavier1.gauche = 1;
        perso1.gotoAndPlay("walk");
    }
    if (e.keyCode == 83) {
        clavier1.bas = 1;
        perso1.gotoAndPlay("down");
    }
    if (e.keyCode == 68) {
        clavier1.droite = 1;
        perso1.gotoAndPlay("walk");
    }
    if (e.keyCode == 85) {
        clavier1.U = 1;
        perso1.gotoAndPlay("punch");
    }
    if (e.keyCode == 73) {
        clavier1.I = 1;
        perso1.gotoAndPlay("kick");
    }
    if (e.keyCode == 79) {
        clavier1.O = 1;
        perso1.gotoAndPlay("block");
    }
    if (e.keyCode == 80) {
        if (isThereHadoken1 === 0 && clavier1.O == 0) {
            hadoken1.x = perso1.x + 70;
            hadoken1.y = 80;
            hadoken1.scaleX = 1.3;
            hadoken1.scaleY = 1.3;
            stage.addChild(hadoken1);
            isThereHadoken1 = 1;
            hadoken1.gotoAndPlay("standHadoken1");
        }
    }

    // PERSO 2
    if (e.keyCode == 37) {
        clavier2.gauche = 1;
        perso2.gotoAndPlay("walk");
    }
    if (e.keyCode == 40) {
        clavier2.bas = 1;
        perso2.gotoAndPlay("down");
    }
    if (e.keyCode == 39) {
        clavier2.droite = 1;
        perso2.gotoAndPlay("walk");
    }
    if (e.keyCode == 74) {
        clavier2.numPad1 = 1;
        perso2.gotoAndPlay("punch");
    }
    if (e.keyCode == 75) {
        clavier2.numPad2 = 1;
        perso2.gotoAndPlay("kick");
    }
    if (e.keyCode == 76) {
        clavier2.numPad3 = 1;
        perso2.gotoAndPlay("block");
    }
    if (e.keyCode == 77) {
        if (isThereHadoken2 === 0 && clavier2.numPad3 == 0) {
            hadoken2.x = perso2.x - 70;
            hadoken2.y = 80;
            hadoken2.scaleX = -1.3;
            hadoken2.scaleY = 1.3;
            stage.addChild(hadoken2);
            isThereHadoken2 = 1;
            hadoken2.gotoAndPlay("standHadoken2");
        }
    }
}

function keyRelease(e) {

    // PERSO 1
    if (e.keyCode == 81) {
        clavier1.gauche = 0;
        perso1.gotoAndPlay("stand");
    }
    if (e.keyCode == 68) {
        clavier1.droite = 0;
        perso1.gotoAndPlay("stand");
    }
    if (e.keyCode == 83) {
        clavier1.bas = 0;
        perso1.gotoAndPlay("stand");
    }
    if (e.keyCode == 85) {
        clavier1.U = 0;
        perso1.gotoAndPlay("stand");
    }
    if (e.keyCode == 73) {
        clavier1.I = 0;
        perso1.gotoAndPlay("stand");
    }
    if (e.keyCode == 79) {
        clavier1.O = 0;
        perso1.gotoAndPlay("stand");
    }

    // PERSO 2
    if (e.keyCode == 37) {
        clavier2.gauche = 0;
        perso2.gotoAndPlay("stand");
    }
    if (e.keyCode == 39) {
        clavier2.droite = 0;
        perso2.gotoAndPlay("stand");
    }
    if (e.keyCode == 38) {
        clavier2.haut = 0;
        perso2.gotoAndPlay("stand");
    }
    if (e.keyCode == 40) {
        clavier2.bas = 0;
        perso2.gotoAndPlay("stand");
    }
    if (e.keyCode == 74) {
        clavier2.numPad1 = 0;
        perso2.gotoAndPlay("stand");
    }
    if (e.keyCode == 75) {
        clavier2.numPad2 = 0;
        perso2.gotoAndPlay("stand");
    }
    if (e.keyCode == 76) {
        clavier2.numPad3 = 0;
        perso2.gotoAndPlay("stand");
    }

}

function init() {
    stage = new createjs.Stage('canvas');

    // Nous lançons la musique du jeu
    themeSong();

    // Creation de l'arène
    bg = new createjs.Bitmap("../design/images/Toulouse-YnovCampus.png");
    bg.regX = 0;
    bg.regY = 0;
    bg.scaleX = 0.19;
    bg.scaleY = 0.19;
    bg.x = 0;
    bg.y = 0;

    stage.addChild(bg);
    stage.update();

    window.stage = stage;

    // On crée le personnage 1
    imgPerso1.src = spriteChar1;
    imgPerso1.onload = createPlayer("a", spriteChar1);
    stage.update();

    // Idem pour le personnage 2
    imgPerso2.src = spriteChar2;
    imgPerso2.onload = createPlayer("b", spriteChar2);
    stage.update();

    // HADOKEN
    imgHadoken1.src = "../design/images/hadoken.png";
    imgHadoken1.onload = creationHadoken1;
    imgHadoken2.src = "../design/images/hadoken.png";
    imgHadoken2.onload = creationHadoken2;
    creationHadoken1();
    creationHadoken2();
    stage.update();

    // Fonction génératrice de la barre de vie
    shapes();

    // Fond de la barre de vie (en rouge)
    bmpViePerso1 = new createjs.Bitmap("../design/images/VIE.png");
    bmpViePerso1.regX = 0;
    bmpViePerso1.regY = 0;
    bmpViePerso1.x = 0;
    bmpViePerso1.y = 10;
    bmpViePerso1.scaleX = 0.5;
    bmpViePerso1.scaleY = 0.2;


    bmpViePerso2 = new createjs.Bitmap("../design/images/VIE.png");
    bmpViePerso2.regX = 0;
    bmpViePerso2.regY = 0;
    bmpViePerso2.x = stage.canvas.width;
    bmpViePerso2.y = 10;
    bmpViePerso2.scaleX = -0.5;
    bmpViePerso2.scaleY = 0.2;

    stage.addChild(bmpViePerso1);
    stage.addChild(bmpViePerso2);

    // Images du message du vainqueur
    bmpKenWins = new createjs.Bitmap("../design/images/KENwins.png");
    bmpKenWins.regX = 150;
    bmpKenWins.regX = 100;
    bmpKenWins.x = stage.canvas.width / 2 - 50;
    bmpKenWins.y = stage.canvas.height / 2 - 100;
    bmpKenWins.scaleX = 1.2;
    bmpKenWins.scaleY = 1.2;
    bmpKenWins.alpha = 0;

    bmpRyuWins = new createjs.Bitmap("../design/images/RYUwins.png");
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

function createPlayer(player, spriteChar) {
    // Préparer les données de la Spritesheet
    var data = {
        // image | spritesheet
        images: [spriteChar],
        // définition des frames
        frames: [
            // x, y, width, height
            [000, 000, 100, 100], // stand
            [100, 000, 100, 100], // stand
            [200, 000, 100, 100], // stand
            [300, 000, 100, 100], // stand
            [400, 000, 100, 100], // walk
            [500, 000, 100, 100], // walk
            [600, 000, 100, 100], // walk
            [700, 000, 100, 100], // walk
            [800, 000, 100, 100], // punch
            [900, 000, 100, 100], // punch
            [1000, 000, 100, 100], // punch
            [1100, 000, 100, 100], // kick
            [1200, 000, 100, 100], // kick
            [1300, 000, 100, 100], // kick
            [1400, 000, 100, 100], // block
            [1500, 000, 100, 100], // down
            [1600, 000, 100, 100], // hit
            [1700, 000, 100, 100], // hit
            [1800, 000, 100, 100], // hit
            [1900, 000, 100, 100], // hit
            [2000, 000, 100, 100], // ko
            [2100, 000, 100, 100], // ko
            [2200, 000, 100, 100] // ko
        ],
        // définition des animations
        animations: {
            // start, end, next
            stand: [0, 3, "stand", 0.1],
            walk: [4, 7, "walk", 0.1],
            punch: [8, 10, "stand", 0.1],
            kick: [11, 13, "stand", 0.1],
            block: [14, 14, "stand", 0.1],
            down: [15, 15, "stand", 0.1],
            hit: [16, 19, "stand", 0.1],
            ko: [20, 22, "ko", 0.1]
        }
    };
    // Instancier la SpriteSheet
    var spriteSheet = new createjs.SpriteSheet(data);

    if (player == "a") {
        // Instancier le Sprite
        perso1 = new createjs.Sprite(spriteSheet, 'stand');
        // Positionner l'image dans le canvas
        perso1.x = stage.canvas.width / 2 - 200;
        perso1.y = 100;
        perso1.scaleX = 1;
        perso1.scaleY = 1;

        // Ajouter le Sprite au Stage
        perso1.gotoAndPlay("stand");
        this.stage.addChild(perso1);
        stage.update();
    }
    if (player == "b") {
        // Instancier le Sprite
        perso2 = new createjs.Sprite(spriteSheet, 'stand');
        // Positionner l'image dans le canvas
        perso2.x = stage.canvas.width / 2 + 200;
        perso2.y = 100;
        perso2.scaleX = -1;
        perso2.scaleY = 1;

        // Ajouter le Sprite au Stage
        perso2.gotoAndPlay("stand");
        this.stage.addChild(perso2);
        stage.update();
    }

    // Retourner le Sprite
    //return sprite;
}

/*
function creationPerso1() {
    var ss = new createjs.SpriteSheet({
        images: [imgPerso1],
        frames: {
            width: 100,
            height: 100,
            regX: 50,
            regY: -15
        },
        animations: {
            standPerso1: [0, 3, "standPerso1", 0.1],
            walkPerso1: [4, 7, "standPerso1", 0.1],
            punch1Perso1: [10, 12, "standPerso1", 0.1],
            kick1Perso1: [13, 15, "standPerso1", 0.1],
            blockPerso1: [16, 16, "standPerso1", 0.1],
            downPerso1: [17, 17, "standPerso1", 0.1],
            hitPerso1: [20, 23, "standPerso1", 0.1],
            koPerso1: [24, 26, true, 0.1]
        }
    });

    perso1 = new createjs.Sprite(ss, "standPerso1");
    perso1.scaleX = 1;
    perso1.scaleY = 1;
    perso1.x = stage.canvas.width / 4;
    perso1.y = 100;

    perso1.gotoAndPlay("standPerso1");
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
            regY: -15
        },
        animations: {
            standPerso2: [0, 3, "standPerso2", 0.1],
            walkPerso2: [4, 7, "walkPerso2", 0.1],
            punch1Perso2: [10, 12, "standPerso2", 0.1],
            kick1Perso2: [13, 15, "standPerso2", 0.1],
            blockPerso2: [16, 16, "standPerso2", 0.1],
            downPerso2: [17, 17, "downPerso2", 0.1],
            hitPerso2: [20, 23, "standPerso2", 0.1],
            koPerso2: [24, 26, false, 0.1]
        }
    });

    perso2 = new createjs.Sprite(ss, "standPerso2");
    perso2.scaleX = -1;
    perso2.scaleY = 1;
    perso2.x = 3 * stage.canvas.width / 4;
    perso2.y = 100;

    perso2.gotoAndPlay("standPerso2");
    stage.addChild(perso2);
    stage.update();
}
*/

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
    if (perso1.x >= stage.canvas.width - 10) {
        perso1.x = stage.canvas.width - 10;
    }
    if (perso2.x <= 10) {
        perso2.x = 10;
    }
    if (perso2.x >= stage.canvas.width - 10) {
        perso2.x = stage.canvas.width - 10;
    }

    //Se baisser
    if (clavier1.bas == 1) {
        clavier1.droite = 0;
        clavier1.gauche = 0;
        perso1.gotoAndPlay("down");
    }
    if (clavier1.bas === 0) {
        perso1.y = stage.canvas.height - 110;
    }
    if (clavier2.bas == 1) {
        clavier2.gauche = 0;
        clavier2.droite = 0;
        perso2.gotoAndPlay("down");
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
        perso1.gotoAndPlay("ko");
        stage.addChild(bmpRyuWins);
        bmpRyuWins.alpha = bmpRyuWins.alpha + 0.05;
    }
    if (shape2.scaleX >= 0) {
        stage.removeChild(shape2);
        ko();
        perso2.gotoAndPlay("ko");
        stage.addChild(bmpKenWins);
        bmpKenWins.alpha = bmpKenWins.alpha + 0.05;
    }
    stage.update();
}

function gestionVie() {

    // Attaques du perso 1 (coup de poing et pied)
    if (clavier1.U == 1 && Math.abs(perso2.x - perso1.x) < 145 && clavier2.numPad3 === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape2.scaleX = shape2.scaleX + 0.05;
        perso2.x = perso2.x + 20;
        perso2.gotoAndPlay("hit");
        stage.update();
    }
    if (clavier1.I == 1 && Math.abs(perso2.x - perso1.x) < 160 && clavier2.numPad3 === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape2.scaleX = shape2.scaleX + 0.1;
        perso2.x = perso2.x + 40;
        perso2.gotoAndPlay("hit");
        stage.update();
    }

    // Attaques du perso 2 (coup de poing et pied)
    if (clavier2.numPad1 == 1 && Math.abs(perso2.x - perso1.x) < 145 && clavier1.O === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape1.scaleX = shape1.scaleX - 0.05;
        perso1.x = perso1.x - 20;
        perso1.gotoAndPlay("hit");
        stage.update();
    }
    if (clavier2.numPad2 == 1 && Math.abs(perso2.x - perso1.x) < 160 && clavier1.O === 0 && Math.abs(perso1.y - perso2.y) === 0) {
        shape1.scaleX = shape1.scaleX - 0.1;
        perso1.x = perso1.x - 40;
        perso1.gotoAndPlay("hit");
        stage.update();
    }

    // HADOKEN
    if (Math.abs(hadoken1.x - perso2.x) < 80 && hadoken1.y) {
        shape2.scaleX = shape2.scaleX + 0.1;
        perso2.gotoAndPlay("hit");
        hadoken1.x = 8000;
        stage.update();
    }
    if (Math.abs(hadoken2.x - perso1.x) < 80 && hadoken2.y) {
        shape1.scaleX = shape1.scaleX - 0.1;
        perso1.gotoAndPlay("hit");
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