import { geoNaturalEarth1 } from "d3";

const mapData = () => {
  selectAll("circle").remove();
  select("g.map-legend").remove();
  select("text.legend-title").remove();
  const radiusValue = (d) => (+d.datum > 0 ? +d.datum : -+d.datum);
  const sizeScale = scaleSqrt()
    .domain([0, max(data, (d) => +d.datum, radiusValue)])
    .range([0, 15]);
  const g = select("#maingroup");
  projection = geoNaturalEarth1();
  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    //.attr("class", "country-circle")
    // setting x and y coordiantes by translating country coordinate data to pixels
    //.attr("transform", function (d) {
    //return "translate(" + projection([0, 0]) + ")";
    .attr("transform", function (d) {
      return "translate(" + projection([d.long - 10, d.lat - 30]) + ")";
    })
    //})
    .attr("r", (d) => sizeScale(radiusValue(d)))
    .attr("fill", "red")
    .attr("opacity", 0.8)
    .append("title")
    .text(
      (d) => d.country + ": " + d.datum //+ ": " + format(",")(d[`${caseType}`])
    );
  /*
  svg.call(
    zoom().on("zoom", () => {
      g.attr("transform", event.transform);
    })
  );
*/
  /*
  .on("contextmenu", function (d) {
    //d3.event.preventDefault();
    if (lastid !== d.properties.name) {
      tip.show(d);
      lastid = d.properties.name;
    } else {
      tip.hide(d);
    }
  });
  */
};
export default mapData;
