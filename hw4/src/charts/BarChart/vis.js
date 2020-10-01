import * as d3 from "d3";
import rd3 from "react-d3-library";
import {
  select,
  geoNaturalEarth1,
  scaleLinear,
  max,
  min,
  format,
  selectAll,
  zoom,
  tsv,
  json,
} from "d3";

import { color } from "../../d3/Color";
import tip from "d3-tip";
import { feature } from "topojson";
import "./style.css";
import "./earth.css";
import "./d3tip.css";
const draw = (props) => {
  d3.select("#mainsvg").remove(); //删除整个SVG
  d3.select("#mainsvg").selectAll("*").remove(); //清空SVG中的内容
  const { data, h, w, attr, year, onSelectCountry } = props;
  let svg = d3
    .select(".vis-barchart")
    .append("svg")
    //.attr("viewBox", [0, 0, w, h])
    .attr("height", h)
    .attr("width", w)
    .attr("class", "svgs")
    .attr("id", "mainsvg");

  const width = +svg.attr("width");
  const height = +svg.attr("height");
  //const margin = { top: 20, right: 20, bottom: 20, left: 20 };
  //const innerWidth = width - margin.left - margin.right;
  //const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width;
  const innerHeight = height;

  const g = svg.append("g").attr("id", "maingroup");
  //.attr("transform", `translate(${margin.top}, ${margin.right})`);
  const projection = d3.geoNaturalEarth1();
  const pathGenerator = d3.geoPath().projection(projection);
  let lastid = undefined;
  Promise.all([
    tsv("https://unpkg.com/world-atlas@1.1.4/world/50m.tsv"),
    json("https://unpkg.com/world-atlas@1.1.4/world/50m.json"),
  ]).then(([tsvData, topoJSONdata]) => {
    // parses tsvData to extract country names for base map titles
    const countryName = {};
    const countryCode = {};
    tsvData.forEach((d) => {
      countryName[d.iso_n3] = d.name;
      countryCode[d.iso_n3] = d.iso_a3;
    });
    // draws a path for each country with countryName as title (shown on hover)
    var worldmeta = feature(topoJSONdata, topoJSONdata.objects.countries);
    projection.fitSize([innerWidth, innerHeight], worldmeta);
    const radiusValue = (d) => (+d.datum > 0 ? +d.datum : -+d.datum);
    const absoluteValue = (d) => (d > 0 ? d : -d);
    const sign = (d) => (+d.datum > 0 ? 1 : -1);
    var count = 0; //count the country that has the data
    const findColor = (d) => {
      const temp = data.filter((c) => c.code === d);
      //console.log(temp);
      if (temp[0] != null) {
        count++;
        return temp[0].datum;
      } else return 0;
    };
    const sizeScale = scaleLinear()
      .domain([
        0,
        //min(data, (d) => +d.datum, radiusValue),
        max(data, (d) => +d.datum, radiusValue),
      ])
      .range([0, 255]);
    const sizeScale2 = scaleLinear()
      .domain([0, max(data, (d) => +d.datum, radiusValue)])
      .range([0, 15]);

    const paths = g
      .selectAll(".map")
      .data(worldmeta.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .attr("class", "map")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .text((d) => countryCode[d.id])
      .attr("fill", (d) =>
        color(sizeScale(absoluteValue(findColor(countryCode[d.id]))))
      )
      .on("click", function (d) {
        onSelectCountry(d3.select(this).text());
      })
      .on("mouseover", function (d) {
        d3.select(this)
          .attr("opacity", 0.5)
          .attr("stroke", "white")
          .attr("stroke-width", 6);
      })
      .on("mouseout", function (d) {
        //不能用箭头函数
        d3.select(this)
          .attr("opacity", 1)
          .attr("stroke", "black")
          .attr("stroke-width", 1);
      });
    /*
    svg.call(
      zoom().on("zoom", () => {
        g.attr("transform", event.transform);
      })
    );
    */
    /* g.selectAll(".map")
      .data(data)
      .attr("fill", (d) => color(sizeScale(radiusValue(d))));
*/
    /*
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("transform", function (d) {
        return "translate(" + projection([d.long, d.lat]) + ")";
      })
      //})
      .attr("r", (d) => sizeScale2(radiusValue(d)))
      .attr("fill", (d) => color(sign(d)))
      .attr("opacity", 0.8)
      .append("title")
      .text(
        (d) => d.country + ": " + d.datum //+ ": " + format(",")(d[`${caseType}`])
      );

  */
  });
};

export default draw;
