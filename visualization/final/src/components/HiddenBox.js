import React, { Component } from "react";
import "./HiddenBox.css";
import { forEach } from "lodash";
class HiddenBox extends Component {
  click(k, topic) {
    //alert(topic);
    const { fulldata } = this.props;
    let arr = "当前学院：" + topic + "\n当前关键词：" + k + "\n\n";

    fulldata.forEach((d) => {
      if (d["school"] === topic && d["keyword"].indexOf(k) > -1) {
        arr += d["title"] + "\n";
      }
    });
    alert(arr);
  }
  render() {
    let show = "none";
    const { keys, topic } = this.props;
    //console.log(keys[topic]);
    if (this.props.chosen === this.props.id) show = "block";
    return (
      <div class="hidden" style={{ display: show }}>
        {/* <span class="badge bg-primary">Keyword</span> */}
        <ul class="list">
          {keys[topic].map((k) => {
            return (
              <li class="item" onClick={() => this.click(k, topic)}>
                {k}
              </li>
            );
          })}
          {/* <li class="item">动力学</li>
          <li class="item">有限元</li>
          <li class="item">复合材料</li>
          <li class="item">汽轮机</li> */}
        </ul>
      </div>
    );
  }
}

export default HiddenBox;
