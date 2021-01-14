import React, { Component } from 'react';
import "./info.css"
class Info extends Component {
  state = {  }
  render() { 
    const {selectedYear, selectedMentor, selectedTopic} = this.props;
    return ( 
      <div class = "Info">
        <div class = "yearDisplay">Year: {selectedYear}</div>
        {
          selectedTopic.map((t)=>{
            return <div class = "topicDisplay">{t}</div>
          })
        }
      </div>
    );
  }
}
 
export default Info;