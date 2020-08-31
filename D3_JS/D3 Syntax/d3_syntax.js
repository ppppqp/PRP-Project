d3.select("#rect1"); //select by id
d3.selectAll(".class1"); //select all item in one class
d3.selectAll("rect"); //select by tag

d3.select("#maingroup rect"); //select the father by id and select the son of them with tag
d3.selectAll(".tick text");
d3.selectAll("#secondgroup rect");

//设置属性
element.attr("attr_name", "attr_value");
d3.select("#rect1").attr("y", "100");
rect.attr("transform", `$(width + 100)`); //活用模版字符串
//获取属性
element.attr("attr_name");

//append增加元素
d3.select("maingroup").append("rect").attr(width, 100).atrr("height", 100);
d3.select("...").remove();

//scale-linear 线性映射
const xScale = d3.scaleLinear().domain([min_d, max_d]).range([min, max]); //   从min_d,max_d映射到min, max
const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(data, (datum) => datum.value)])
  .range([0, innerWidth]); //回调提取数据的范围

//scale-Band 条带映射（categorical data）
const yScale = d3.scaleBand().domain(list).range([min,max]).padding(p);
const yScale = d3.scaleBand().domain(data.map(datum =>datum.name)).range([0,innerHeight]).padding(0,1)

//  datajoin
//(Enter)
g.selectAll(".dataRect")
.data(data) //没有图元时，不需要考虑key
.enter()
.append("rect") //不需要forEach然后设置每个矩形后，再用data
.attr("class", "dataRect")
.attr("width", (d) => xScale(d.value))
.attr("height", yScale.bandwidth())
.attr("y", (d) => yScale(d.name))
.attr("fill", "green")
.attr("opacity", 0.8);
//update(条目不变)
//用g.selectAll(...).data(data).attr(...)即可

//Exit删除没有数据的图元
//const p = maingroup.selectAll(".class").data(data).exit().remove()
// the following four lines of code is the simplest pattern of adding axis;


//d3数据读取
d3.csv("path/to/data.csv").then(data =>{...});//path为相对服务器的路径，调取数据后调用回调函数,对数据的处理，如data = data.filter..
// 每一行都是一个object，且都是字符串
//转换成数字：
data.forEach(d=>{
  d["a"] = +(d["a"]);
})

allDates = data.map(d => d["日期"])
allDates = Array.from(new Set(data.map(d => d["日期"])));//根据set构造array，去重
allDates = allDates.sort((a,b) => {return new Date(a)- new Date(b)}


//path
d3.line(...).x(...).y(...)//折线
d3.geoPath().projection()//地图
d3.area()//主题河流
d3.arc().innerRadius().outerRadius()//饼图
d3.lineRadial().angle().radius()
//github.com/d3/d3-shape/tree/v1.3.7


//json数据读取
<script src = "/static/js/topojson.js"> </script>
d3.json("...").then(data => {let worldmeta = topojson.feature( data , data.objects.countries);})
//使用topojson库

//事件
d3.select("#somneprimitive").on("click", myCallBack)
click, mouseover, keydown, contextmenu


//tip
<script src="/static/js/library/d3-tip.js"></script>
const tip = d3.tip().attr("class","d3-tip").html((d)=>what do you want from d to show);
svg.call(tip);
tip.show()
tip.hide()

//css
<link re1 = "stylesheet" href = ".../css/hello-css.css">

