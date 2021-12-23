import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: "hello react",
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
