import React, { Component } from "react";
import "./view4.css";
import LineChart from "../../charts/LineChart";

export default class View4 extends Component {
  /*render() {
    const { data, years, country } = this.props,
      width = 1100,
      height = 250;
    return (
      <div id="view4" className="pane">
        <div className="header">User Acivities</div>
        <div style={{ overflowX: "scroll" }}>
          <LineChart data={data} years={years} country={country} />
        </div>
      </div>
    );
  } //data, h, w, attr1, attr2
  */
  render() {
    const { data } = this.props,
      width = 1100,
      height = 150;
    return (
      <div id="view4" className="pane">
        <div className="header">User Acivities</div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          <LineChart data={data} width={width} height={height} />
        </div>
      </div>
    );
  }
}
