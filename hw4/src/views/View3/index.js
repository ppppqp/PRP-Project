import React, { Component } from "react";
import { Slider, Checkbox, Divider } from "antd";
import "./view3.css";

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Eruope",
  "Antarctic",
];
const defaultCheckedList = [
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Eruope",
  "Antarctic",
];

export default class View3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
    };
  }

  onChangeCheckbox = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
    this.props.changeIncludedMon(checkedList);
  };

  onCheckAllChange = (e) => {
    const checkedList = e.target.checked ? plainOptions : [];
    this.setState({
      checkedList: checkedList,
      indeterminate: false,
      checkAll: e.target.checked,
    });
    this.props.changeIncludedMon(checkedList);
  };

  onChangeSilder = (value) => {
    this.props.changeGreaterThenAge(value);
  };

  render() {
    return (
      <div id="view3" className="pane">
        <div className="header">Filter</div>
        <h3>Continent</h3>
        <div style={{ width: 275, margin: 5 }}>
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <div style={{ width: 275, margin: 5 }}>
          <CheckboxGroup
            options={plainOptions}
            value={this.state.checkedList}
            onChange={this.onChangeCheckbox}
          />
        </div>
        <Divider />
        <h3>Attribute</h3>
        <Slider defaultValue={0} onChange={this.onChangeSilder} />
      </div>
    );
  }
}