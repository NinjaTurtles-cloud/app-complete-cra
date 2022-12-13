import React from "react";
import ReactDOM from "react-dom";
import Home from "./pages/Home";
import Survey from "./pages/Survey";

ReactDOM.render(
  <React.StrictMode>
    <Home />
    <Survey />
  </React.StrictMode>,
  document.getElementById("root")
);
