import React, { Component } from "react";
import data from "./data";
import { Layout } from "antd";
import { tsv, json } from "d3";
import View1 from "./views/View1";
import View2 from "./views/View2";
import View3 from "./views/View3";
import View4 from "./views/View4";
import View5 from "./views/View5";
import View6 from "./views/View6";
import { getHotel } from "./data/hotel";
import corona from "./data/corona";
import "./dashboard.css";
import countries from "./data/countries-110m";
import countryData from "./data/countryData";

const { Sider, Content, Footer } = Layout;

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: data[0],
      greaterThenAge: 0,
      includedGender: ["Male", "Female", "Unknown"],
      hotel: getHotel(),
      countryData: countryData,
      selectedCountry: "China",
      selecedCode: "CHN",
      includedMon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      corona: corona,
      countries: countries,
      selectedAttr: "GDP growth (annual %)",
      attrs: [
        "GDP growth (annual %)",
        "GDP (current US$)",
        "Internet users (per 100 people)",
        "Rural population",
        "Population growth (annual %)",
        "GDP per capita growth (annual %)",
        "GDP per capita (current US$)",
        "Armed forces personnel (% of total labor force)",
        "Surface area (sq. km)",
        "Population density (people per sq. km of land area)",
        "Arable land (% of land area)",
      ],
      selectedYear: "2010 [YR2010]",
      years: [
        "2010 [YR2010]",
        "2011 [YR2011]",
        "2012 [YR2012]",
        "2013 [YR2013]",
        "2014 [YR2014]",
      ],
      countryName: [],
    };
  }
  handleSelectCountry = (c) => {
    this.setState({ selectedCountry: c });
    //this.setState({ selectedCode: code });
  };
  handleSelectX = (attr) => {
    this.setState({ selectedAttr: attr });
  };
  handleSelectY = (attr) => {
    this.setState({ selectedYear: attr });
  };
  changeSelectUser = (value) => {
    this.setState({
      selectedUser: value,
    });
  };

  changeGreaterThenAge = (value) => {
    this.setState({
      greaterThenAge: value,
    });
  };

  changeIncludedMon = (value) => {
    this.setState({
      includedMon: value,
    });
  };

  getCountryname() {
    var countryName = [];
    Promise.all([
      tsv("https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"),
      json("https://unpkg.com/world-atlas@1.1.4/world/50m.json"),
    ]).then(([tsvData, topoJSONdata]) => {
      tsvData.forEach((d) => {
        countryName.push(d.name);
      });
    });
    return countryName;
  }
  render() {
    const {
      selectedUser,
      greaterThenAge,
      includedGender,
      includedMon,
      hotel,
      attrs,
      selectedAttr,
      selectedCountry,
      selectedCode,
      years,
      selectedYear,
      countryName,
    } = this.state;
    const filteredData = data
      .filter((user) => includedGender.indexOf(user.gender) !== -1)
      .filter((user) => user.age > greaterThenAge);
    const filteredHotel = hotel.filter(
      (h) => includedMon.indexOf(h.month.toString()) !== -1
    );
    const selectedAttrData = countryData.filter(
      (d) => d["Series Name"] === selectedAttr
    );
    const singleCountryData = countryData.filter(
      (d) =>
        d["Series Name"] === selectedAttr &&
        d["Country Name"] === selectedCountry
    );
    let countryAttrDataList = [];
    let countryFlag;
    const temp = corona.filter((c) => c.country === selectedCountry);
    if (temp[0] != null) countryFlag = temp[0].countryInfo.flag;

    const arr = [];
    selectedAttrData.forEach(function (d) {
      if (d[selectedYear]) arr.push(+d[selectedYear]);
    });
    const maxNum = Math.max(...arr);
    console.log(arr);

    /*
    const maxNum = Math.max.apply(
      Math,
      array.map(function (o) {
        return +o[selectedYear];
      })
    );
      */
    //d[selectedYear] > (maxNum / 100) * greaterThenAge
    selectedAttrData.forEach(function (d) {
      const temp = corona.filter(
        (c) => c.countryInfo.iso3 === d["Country Code"]
      );
      if (temp[0] != null) {
        countryAttrDataList.push({
          country: d["Country Name"],
          datum: d[selectedYear],
          lat: temp[0].countryInfo.lat,
          long: temp[0].countryInfo.long,
        });
      }
    });
    //console.log(selectedAttrData);
    let singleCountryArray = [
      { year: 2010, datum: singleCountryData[0]["2010 [YR2010]"] },
      { year: 2011, datum: singleCountryData[0]["2011 [YR2011]"] },
      { year: 2012, datum: singleCountryData[0]["2012 [YR2012]"] },
      { year: 2013, datum: singleCountryData[0]["2013 [YR2013]"] },
      { year: 2014, datum: singleCountryData[0]["2014 [YR2014]"] },
    ];
    //console.log(singleCountryArray);
    //const filteredHotel = ["1", "2"];
    return (
      <div>
        <Layout style={{ height: 1200 }}>
          <Sider width={300} style={{ backgroundColor: "#eee" }}>
            <Content style={{ height: 200 }}>
              <View1
                selectedCountry={selectedCountry}
                selectedAttr={selectedAttr}
                countryFlag={countryFlag}
              />
            </Content>
            <Content style={{ height: 300 }}></Content>
            <Content style={{ height: 400 }}>
              <View3
                changeGreaterThenAge={this.changeGreaterThenAge}
                changeIncludedMon={this.changeIncludedMon}
              />
            </Content>
          </Sider>
          <Layout style={{ height: 1000 }}>
            <Content style={{ height: 300 }}>
              <View4 data={singleCountryArray} />
            </Content>
            <Layout style={{ height: 900 }}>
              <Content>
                <View5
                  data={countryAttrDataList}
                  attrs={attrs}
                  year={selectedYear}
                  onSelectCountry={this.handleSelectCountry}
                />
              </Content>
              <Sider width={500} style={{ backgroundColor: "#eee" }}>
                <View6
                  data={countryData}
                  years={years}
                  attrs={attrs}
                  selectedAttr={selectedCountry}
                  selectedYear={selectedYear}
                  onSelectX={this.handleSelectX}
                  onSelectY={this.handleSelectY}
                />
              </Sider>
            </Layout>
          </Layout>
        </Layout>
        <Layout>
          <Footer style={{ height: 20 }}>
            <div style={{ marginTop: -10 }}>
              Source Code{" "}
              <a href="https://github.com/sdq/react-d3-dashboard">
                https://github.com/sdq/react-d3-dashboard
              </a>
              ; Author <a href="https://sdq.ai">sdq</a>;
            </div>
          </Footer>
        </Layout>
      </div>
    );
  }
}
