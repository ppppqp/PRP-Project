//import {select, csv} from 'd3';
import "./index.css"
const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");
console.log(width)
const render = data=>{
  console.log("here");
  const xScale = d3.scaleLinear().domain([0, d3.max(data, d=>d.population)]).range([0, width]);
  const yScale = d3.scaleBand().domain(data.map(d=>d.country)).range([0,height])
  svg.selectAll('rect').data(data).enter().append("rect")
  .attr("width", d=>xScale(d.population))
  .attr("height", yScale.bandwidth())
  .attr("y", d=>yScale(d.country));
  
};
d3.csv("../data/data.csv").then(
  data=>{
    console.log('a')
     data.forEach(d =>{
       d.population = +d.population * 1000;
     });
    render(data);
  }
);
