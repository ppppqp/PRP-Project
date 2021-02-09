import React, { Component } from 'react';
import colorScale from '../colorScale';
import * as d3 from "d3"
import draw from './drawLegend'
import { selectAll } from 'd3';
import "./legend.css"
class Legend extends Component {

  state = {
  }
  componentDidMount() {
    //draw(this.props);
    //this.findMax()
  }

  componentDidUpdate(){
    
  }
  findMax(){
    const {data, selectedYear} = this.props;
    let maxNum = 0;
    for(let key in data){
      if( key !=="year" &&  maxNum < data[key]) maxNum = data[key];
    }
    return maxNum;
  }
  scaleLength(t){
    const {data} = this.props;
    const maxNum = this.findMax();
    const scale = d3.scaleLinear().domain([0, maxNum]).range([0,150])
    return scale(data[t] === undefined ? 0 : data[t]);
  }
  render() {

    let{selectedTopic, selectedMentor, isMentor} = this.props;
    const data = (isMentor) ? selectedMentor : selectedTopic
    return(
      <div className="Legend-vis">
        {
          data.map((t)=>{
            let color ={};
            color["bgcolor"] = colorScale(t);
            return (
              <div class ="row">
                <div class = "colorbox">
                  <div class = "color" style = {{background: colorScale(t, "T"), width: this.scaleLength(t)+"px"}}></div>
                </div>
                <div class = "name">{t}</div>
             </div>
          );
          })
        }
      </div>
    )
  }
}
 
export default Legend;