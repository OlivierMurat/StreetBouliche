import 'latest-createjs'
import React       from "react";
import errorCanvas from "../assets/images/errorcanvas.png";
import "../assets/css/canvas.scss"
import Stage       from "../objects/Stage";

export default class StageCanvas extends React.Component {

    constructor(props) {
        super(props);

        this.stage = new Stage();
        window.stage = this.stage;
    }

    handleKeyboardPress(event) {
        console.log("keyboard : " + event.key);
        this.stage.handleKeyBoardInput(event.key);
    }

    componentDidMount() {
        this.stage.init();
        document.addEventListener("keypress", (event) => this.handleKeyboardPress(event));
    }

    componentWillUnmount() {
        document.removeEventListener("keypress", (event) => this.handleKeyboardPress(event));

        this.stage.destroy();
    }


    render() {
        return (
            <canvas id="canvas">
                <div id="error">
                    <img src={errorCanvas} width="200" height="100" alt="error"/>
                    <br/>Your browser does not support canvas.
                    <br/>
                    Please update it or switch to another browser.
                </div>
            </canvas>
        );
    }
}