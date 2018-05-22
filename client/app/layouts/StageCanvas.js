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

    handleKeyDown(event){
        console.log(`keyboard : ${event.key} down`);
        this.stage.handleKeyDown(event.key);
    }

    handleKeyUp(event){
        console.log(`keyboard : ${event.key} up`);
        this.stage.handleKeyUp(event.key);
    }

    componentDidMount() {
        this.stage.init();
        document.addEventListener("keydown", (event) => this.handleKeyDown(event));
        document.addEventListener("keyup", (event) => this.handleKeyUp(event));
        window.addEventListener('resize', this.resizeHandler);
    }

    resizeHandler = ()=>{
        this.stage.resize();
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", (event) => this.handleKeyDown(event));
        document.removeEventListener("keyup", (event) => this.handleKeyUp(event));
        window.removeEventListener('resize', this.resizeHandler, true);

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