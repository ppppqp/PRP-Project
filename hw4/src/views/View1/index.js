import React, { Component } from "react";
import { Avatar } from "antd";
import "./view1.css";

export default class View1 extends Component {
  render() {
    let { selectedCountry, selectedAttr, countryFlag } = this.props;
    console.log(countryFlag);
    return (
      <div id="view1" className="pane">
        <div className="header">User Profile</div>
        <div>
          <div className={"avatar-view"}>
            <Avatar shape="square" size={120} src={countryFlag} />
          </div>
          <div className={"info-view"}>
            <div>Name: {selectedCountry}</div>
            <div>Attr: {selectedAttr}</div>
          </div>
        </div>
      </div>
    );
  }
}