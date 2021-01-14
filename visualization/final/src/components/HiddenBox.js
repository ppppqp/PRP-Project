import React, { Component } from "react";
import "./HiddenBox.css";
class HiddenBox extends Component {
  render() {
    let show = "none";
    if (this.props.chosen === this.props.id) show = "block";
    return (
      <div class="hidden" style={{ display: show }}>
        {/* <span class="badge bg-primary">Keyword</span> */}
        <ul class="list">
          <li class="item">动力学</li>
          <li class="item">有限元</li>
          <li class="item">复合材料</li>
          <li class="item">汽轮机</li>
        </ul>
      </div>
    );
  }
}

export default HiddenBox;
