
import allTopic from './data/allTopic';
function colorScale(name, mode){
  if(mode === 'T'){
    //topic mode
    var i = 0; 
    var index = allTopic.indexOf(name);
    index = index + 30;
    return "rgb("+ (255-index*1) + "," +(255-index*2)+"," + (255-index*2) + ")";
  }
}
export default colorScale;