import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
// style
import StyleWrapper from "./baz.style.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello React!",
    };
  }

  render() {
    const { message } = this.state;
    return (
      <StyleWrapper>
        <h2 className="title">{message}</h2>
      </StyleWrapper>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app-react"));
