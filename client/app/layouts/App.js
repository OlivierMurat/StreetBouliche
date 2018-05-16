import React       from "react";
import {hot}       from "react-hot-loader";
import StageCanvas from "./StageCanvas";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="App">
                <StageCanvas/>
            </div>
        );
    }
}

export default hot(module)(App);