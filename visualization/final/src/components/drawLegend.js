import colorScale from "../colorScale";
import * as d3 from "d3";
import { scaleLinear } from "d3";
const draw = (props) => {
  let { selectedTopic } = props;
  d3.selectAll(".Legend-vis > *").remove();
  var data_legend = [];
  console.log(props);
  for (let t of selectedTopic) {
    console.log(t);
    let temp = {};
    temp["name"] = t;
    temp["color"] = colorScale(t, "T");
    data_legend.push(temp);
  }
  const yScale = d3
    .scaleBand()
    .domain(data_legend.map((d) => d.color))
    .range([0, 500])
    .padding(0.1);

  console.log(data_legend);
  var svg = d3
    .select(".Legend-vis")
    .attr("position", "relative")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);

  var legend = svg
    .selectAll(".legend")
    .data(data_legend)
    .enter()
    .append("g")
    .attr("class", "legend")
    .append("rect")
    .attr("width", "10px")
    .attr("height", "10px")
    .attr("x", "10px")
    .attr("y", (d) => yScale(d.color))
    .attr("fill", (d) => colorScale(d.name, "T"));
};
export default draw;
