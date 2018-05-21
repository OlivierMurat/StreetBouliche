import player from "../player";
import kenConfiguration from "../../assets/characters/ken/character";
import ryuConfiguration from "../../assets/characters/ryu/character";
import SpriteKen             from "../../assets/characters/ken/sprite.png";
import SpriteRyu             from "../../assets/images/spriteRyu.png";

export default class characterFactory {

    //always in lowerCase
    static playersAvailable = [
        "ken",
        "ryu"
    ];

    /**
     *
     * @param {string} characterName the name of the character
     * @param {{}} params params for this user
     * @return {Player}
     */
    static getCharacter(characterName, params={}) {
        let playerConfig, spriteSheet;

        characterName = characterName.toLowerCase();

        if (!characterFactory.playersAvailable.find(playerName => playerName === characterName))
            throw new Error(`unknown user with name ${characterName}`);

        switch (characterName){
            case "ken":
                playerConfig = kenConfiguration;
                spriteSheet = SpriteKen;
            break;
            case "ryu":
                playerConfig = ryuConfiguration;
                spriteSheet = SpriteRyu;
            break;
        }


        return new player({
            ...params,
            playerConfig,
            spriteSheet:spriteSheet
        });
    }
}