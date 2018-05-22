import player from "../player";

//use this import, else webpack while remove !
import kenConfiguration from "../../assets/characters/ken/character";
import ryuConfiguration from "../../assets/characters/ryu/character";
import SpriteKen             from "../../assets/characters/ken/sprite.png";
import SpriteRyu             from "../../assets/images/spriteRyu.png";

export default class CharacterFactory {

    /**
     *
     * @type {{name:string,configuration:*,spriteSheet:string}[]}
     */
    static playersAvailable = [
        {
            name : "ken",
            configuration : kenConfiguration,
            spriteSheet: SpriteKen
        },
        {
            name : "ryu",
            configuration:ryuConfiguration,
            spriteSheet: SpriteRyu
        }
    ];

    /**
     *
     * @param characterName
     * @return {{name:string,configuration:*,spriteSheet:string}}
     * @private
     */
    static _getCharacter(characterName){
        characterName = characterName.toLowerCase();

        let character = CharacterFactory.playersAvailable.find(player => player.name.toLocaleLowerCase() === characterName);

        if (!character)
            throw new Error(`unknown user with name ${characterName}`);

        return character;
    }

    /**
     *
     * @param {string} characterName
     */
    static getCharacterConfiguration(characterName){
        return CharacterFactory._getCharacter(characterName);
    }

    /**
     *
     * @param {string} characterName the name of the character
     * @param {{}} params params for this user
     * @return {Player}
     */
    static getCharacter(characterName, params={}) {
        let playerConfig, spriteSheet;

        let character = CharacterFactory._getCharacter(characterName);

        playerConfig = character.configuration;
        spriteSheet = character.spriteSheet;


        return new player({
            ...params,
            playerConfig,
            spriteSheet:spriteSheet
        });
    }
}