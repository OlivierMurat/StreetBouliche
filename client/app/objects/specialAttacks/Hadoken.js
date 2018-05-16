import HadokenPng    from "../../assets/images/hadoken.png"
import SpecialAttack from "../specialAttack";

export default class Hadoken extends SpecialAttack{
    sprite = new Image();

    constructor(){
        super();

        this.sprite.src = HadokenPng;

    }
}