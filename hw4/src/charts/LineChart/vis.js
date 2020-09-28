import * as d3 from "d3";
import _ from "lodash";

const draw = ({ data, width, height }) => {
  d3.select(".vis-linechart > *").remove();
  let margin = { top: 20, right: 20, bottom: 30, left: 40 };
  //const width = props.width - margin.left - margin.right;
  //const height = props.height - margin.top - margin.bottom;
  let svg = d3
    .select(".vis-linechart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function (d) {
    d.year = +d.year;
    d.datum = +d.datum;
  });

  // Add X axis --> it is a date format
  let x = d3
    .scaleTime()
    .domain(
      d3.extent(data, function (d) {
        return +d.year;
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return +d.datum;
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add the line
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.year);
        })
        .y(function (d) {
          return y(d.datum);
        })
    );
};

export default draw;
