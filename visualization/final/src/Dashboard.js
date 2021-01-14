import React, { Component } from "react";
import { select, csv, map } from "d3";
import { Layout } from "antd";
// import data from "./data/data";
// import View1 from "./views/View1/index";
// import View2 from "./views/View2/index";
// import View3 from "./views/View3/index";
// import View4 from "./views/View4/index";
// import View5 from "./views/View5/index";
// import View6 from "./views/View6/index";
import "./dashboard.css";
import weight from "./graphWeight";
import { forEach, range } from "lodash";
import ThemeRiver from "./charts/ThemeRiver/index";
import Search from "./components/search";
import allTopic from "./data/allTopic";
import Legend from "./components/legend";
import Info from "./components/info";
import Recommend from "./components/recommend";
import Scatter from "./charts/Graph/index";
import Cloud from "./components/cloud";
const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {
  componentDidMount() {
    this.getData();
  }
  state = {
    data: [],
    Keys: [],
    dataE: [],
    dataV: [],
    dataRecom: [],
    selectedMentor: "董笑菊",
    selectedTopic: allTopic,
    selectedYear: "2019",
    dataTheme: [
      { year: 2019 },
      { year: 2018 },
      { year: 2017 },
      { year: 2016 },
      { year: 2015 },
    ],
    dataLegend: {},
  };
  changeYearHandle = (target) => {
    console.log(target);
    this.setState({ selectedYear: target.toString() });
    this.updateLegend();
    this.updateGraph();
  };
  changeTopicHandle = (target) => {
    //console.log(target);
    if (target === "全选") this.setState({ selectedTopic: allTopic });
    else this.setState({ selectedTopic: [target] });
    this.updateTheme();
    this.updateGraph();
  };
  changeMentorHandle = (target) => {
    console.log(target);
    this.setState({ selectedMentor: target });
    this.updateTheme();
    this.updateGraph();
  };
  getData() {
    csv("./data_brief.csv").then((data) => {
      data.forEach((d) => {
        d.school = d.school.slice(5);
        if (d.school === "上海交大-密西根大学联合学院")
          d.school = "上海交大密西根学院";
        if (d.school === "上海交通大学上海高级金融学院")
          d.school = "上海高级金融学院";
        /*let arr = [];
        if (d.keyword[d.keyword.length - 1] === ";")
          d.keyword.slice(0, d.keyword.length - 1);
        if (d.keyword.indexOf(";") !== -1) arr = d.keyword.split(";");
        //get rid of the last ";"
        else if (d.keyword.indexOf("") !== -1) arr = d.keyword.split(",");
        for (let i = 0; i < arr.length; i++) {
        */
        //  arr[i] = arr[i].replace(/\s*/g, "");
        //}
        //d.keyword = arr;
      });
      this.setState({ data: data });
      this.updateGraph();
      this.updateTheme();
    });
    let Keys = [];
    csv("./Keys2.csv").then((data) => {
      Keys = data;
      console.log(Keys);
      this.setState({ Keys: Keys });
    });
  }
  eliminateNan(index, range, newDataTheme, value) {
    for (let i = 0; i < range; i++) {
      if (i !== index && !newDataTheme[i].hasOwnProperty(value))
        newDataTheme[i][value] = 0;
    }
  }
  updateTheme() {
    let { data, selectedTopic, selectedMentor } = this.state;
    const isMentor = this.props.match.path === "/Mentor";
    let key = isMentor ? "mentor" : "school";
    console.log(selectedMentor);
    let filtered = data.filter((d) => {
      return isMentor
        ? selectedMentor === d["mentor"]
        : selectedTopic.indexOf(d["school"]) != -1;
    });
    let newDataTheme = [
      { year: 2019 },
      { year: 2018 },
      { year: 2017 },
      { year: 2016 },
      { year: 2015 },
    ];
    filtered.forEach((d) => {
      var temp;
      if (!newDataTheme[this.getYearIndex(d.year)].hasOwnProperty(d[key]))
        newDataTheme[this.getYearIndex(d.year)][d[key]] = 1;
      else newDataTheme[this.getYearIndex(d.year)][d[key]]++;
      this.eliminateNan(this.getYearIndex(d.year), 5, newDataTheme, d[key]);
    });
    console.log(newDataTheme);
    this.setState({ dataTheme: newDataTheme });
    this.updateLegend();
  }
  updateLegend() {
    const { dataTheme, selectedYear } = this.state;
    if (selectedYear === "2019") this.setState({ dataLegend: dataTheme[0] });
    if (selectedYear === "2018") this.setState({ dataLegend: dataTheme[1] });
    if (selectedYear === "2017") this.setState({ dataLegend: dataTheme[2] });
    if (selectedYear === "2016") this.setState({ dataLegend: dataTheme[3] });
    if (selectedYear === "2015") this.setState({ dataLegend: dataTheme[4] });
    console.log(this.state.dataLegend);
  }
  updateGraph() {
    const isMentor = this.props.match.path === "/Mentor";
    const { data, selectedYear, selectedTopic, Keys } = this.state;
    let edgeSet = [],
      verticeSet = [];
    let recomSet = {};
    if (isMentor) {
    } else {
      const target = selectedTopic[0];
      const index = 1; //TODO
      let count = 1;
      verticeSet.push({
        name: target,
        value: 10,
      });

      let keysSorted = Object.keys(weight[index]).sort(function (a, b) {
        return weight[index][b] - weight[index][a];
      });

      for (let i = 0; i < 9; i++) {
        console.log(keysSorted[i]);
        console.log(weight[index][keysSorted[i]]);
        recomSet[keysSorted[i]] = weight[index][keysSorted[i]];
      }
      this.setState({ dataRecom: recomSet });
      for (let key in weight[index]) {
        if (weight[index][key] > 0) {
          verticeSet.push({
            name: key,
            value: 3,
          });
          edgeSet.push({
            source: 0,
            target: count,
            value: Math.sqrt(2 / weight[index][key]),
          });
          count++;
        }
      }
      this.setState({ dataV: verticeSet });
      this.setState({ dataE: edgeSet });
      // data.forEach((d) => {
      //   if (d.year === selectedYear && d.school !== target) {
      //     for (let tk of targetKeyword) {
      //       if (d.keyword.indexOf(tk) > -1) {
      //         if (edgeSet.hasOwnProperty(d.school)) edgeSet[d.school]++;
      //         else edgeSet[d.school] = 1;
      //       }
      //     }
      //   }
      // });
    }
  }
  getYearIndex(selectedYear) {
    if (selectedYear === "2019") return 0;
    if (selectedYear === "2018") return 1;
    if (selectedYear === "2017") return 2;
    if (selectedYear === "2016") return 3;
    if (selectedYear === "2015") return 4;
  }
  render() {
    let {
      data,
      selectedYear,
      selectedTopic,
      selectedMentor,
      dataV,
      dataE,
      dataTheme,
      dataLegend,
      dataRecom,
    } = this.state;
    console.log(dataV);
    const isMentor = this.props.match.path === "/Mentor";
    var name;
    var dataScatterV = [];
    var dataScatterE = [];

    if (!isMentor) {
      console.log(dataTheme);
      name = selectedTopic;
      dataTheme.forEach((d) => {
        if (d.year == String(selectedYear)) {
          for (let key in d) {
            let temp = {};
            temp["name"] = key;
            temp["value"] = d[key];
            dataScatterV.push(temp);
          }
        }
      });
    } else {
    }
    return (
      <div>
        <header>
          <h1>交通大学论文系统</h1>
          <div class="showTime"></div>
        </header>
        <section>
          <div class="mainbox">
            <div class="column">
              <div class="panel profile">
                <div class="boxhead">查询 Search</div>
                <Search
                  onChangeTopic={this.changeTopicHandle}
                  onChangeMentor={this.changeMentorHandle}
                  isMentor={isMentor}
                />
                <Legend
                  selectedTopic={selectedTopic}
                  data={dataLegend}
                  selectedYear={selectedYear}
                />
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="column">
              <div class="panel themeriver">
                <div class="boxhead">主题河流 Theme River</div>
                <ThemeRiver
                  data={dataTheme}
                  width={850}
                  height={230}
                  selectedYear={selectedYear}
                  onChangeYear={this.changeYearHandle}
                  onChangeTopic={this.changeTopicHandle}
                />
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="column">
              <div class="panel info">
                <div class="boxhead">热点</div>
                {/* <Info
                  selectedYear={selectedYear}
                  selectedMentor={selectedMentor}
                  selectedTopic={selectedTopic}
                /> */}
                <Cloud />
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
          <div class="mainbox">
            <div class="column">
              <div class="panel recommend">
                <div class="boxhead">Recommendation</div>
                <Recommend data={dataRecom} />
                <div class="panel-footer"></div>
              </div>
            </div>
            <div class="column">
              <div class="panel graph">
                <div class="boxhead">Graph View</div>
                <Scatter
                  dataV={dataV}
                  dataE={dataE}
                  selectedTopic={selectedTopic}
                />
                <div class="panel-footer"></div>
              </div>
            </div>
          </div>
        </section>
        <script src="dist/main.js"></script>
      </div>
    );
  }
}
