import React      from "react";
import ReactDom   from "react-dom";
import "./assets/css/app.scss";
import App        from "./layouts/App";

/* Main Render */
ReactDom.render(
        <App/>,
    document.getElementById("root")
);