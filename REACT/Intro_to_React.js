//Intro to React

//诞生背景
/*
传统DOM API细节太多，操作复杂
解决：整体刷新页面->只需更新数据即可
	单向数据流，结构简单

核心特性：
1. 声明式开发（而不是命令式）
2. 组件化
3. 单向数据流
4. 函数式编程
5. 兼容其他框架

*/
//Hello World
import React from 'react'
import ReactDOM from 'react-dom';

ReactDOM.render(
 	<h1>Hello World </h>,
 	document.getElementById('root')
)
*/
// JSX: Javascript XML

let date = new Date();
let element = (
	<p> Now is {date.toLocaleTimeString()}</p>
)


//根据不同条件渲染

let login = true;
const element = {
	login ? <p>Welcome</p>:<p>please login</p>
}


//列表渲染

const numbers = [1,2,3,4,5];
const listItems = numbers.map((number) =>
<li key = {number.toString()}>
	{number}
</li>


//组件







class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Taylor" />,
  document.getElementById('hello-example')
);

/*React 组件使用一个名为 render() 的方法，接收输入的数据并返回需要展示的内容。
被传入的数据可在组件中通过 this.props 在 render() 访问。
效果： 输出Hello Taylor
*/


//有状态组件
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);


 /*除了使用外部数据（通过 this.props 访问）以外，组件还可以维护其内部的状态数据（通过 this.state 访问）。
 当组件的状态数据改变时，组件会再次调用 render() 方法重新渲染对应的标记。
 效果：读秒
 */


 