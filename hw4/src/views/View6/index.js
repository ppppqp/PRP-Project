import React, { Component } from "react";
import { List } from "antd";
import "./view6.css";
import "bootstrap/dist/css/bootstrap.css";
export default class View6 extends Component {
  selectUser = (user) => {
    this.props.changeSelectUser(user);
  };
  /*

<div className="header">User List</div>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(user) => (
            <List.Item onClick={() => this.selectUser(user)}>
              <div>{user.name + ":" + user.age}</div>
            </List.Item>
          )}
        />
      </div>


*/
  render() {
    const { attrs, selectedAttr, years, selectedYear } = this.props;
    return (
      <div id="view6" className="pane">
        <div className="row">
          <div className="col-6">
            <div className="badge badge-primary text-wrap">
              Select Attribute
            </div>
            <ul className="list-group">
              {attrs.map((attr) => (
                <li
                  className={
                    selectedAttr === attr
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  onClick={() => this.props.onSelectX(attr)}
                  key={attr}
                >
                  {attr}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-">
            <div className="badge badge-primary text-wrap">Select Year</div>
            <ul className="list-group">
              {years.map((year) => (
                <li
                  className={
                    selectedYear === year
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  onClick={() => this.props.onSelectY(year)}
                  key={year}
                >
                  {year}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
