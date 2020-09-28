import React, { Component } from "react";
import BarChart from "../../charts/BarChart";
import "./view5.css";

export default class View5 extends Component {
  render() {
    const { data, attr, onSelectCountry } = this.props;
    return (
      <div id="view5" className="pane">
        <div className="header">Map</div>
        <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
          <BarChart
            data={data}
            attr={attr}
            w={900}
            h={800}
            onSelectCountry={onSelectCountry}
          />
        </div>
      </div>
    );
  }
}
