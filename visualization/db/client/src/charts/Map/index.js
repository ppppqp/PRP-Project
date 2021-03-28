import React, { Component } from "react";
import draw from "./vis";

export default class Map extends Component {
  componentDidMount() {
    draw(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    draw(this.props);
  }

  render() {
    //draw(this.props);
    return <div className="vis-map" overflow="scroll" />;
  }
}
