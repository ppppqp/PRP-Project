// JavaScript
//Case1: Hello World

//行间式
<button onclick = "alert('Hello world')"></button>//相应点击事件，输出helloworld


//内嵌式
<script> alert("helloworld") </script>//直接弹出helloworld，不会需要点击


//外部
<script src="hello.js"> </script>//这个标签中不能写任何代码，写了也是无效的



var//函数级作用域，可以突破{}（块级作用域）
let//块级作用域
const//块级作用域


基本语法
var d = 4;
d.toString()//存为字符串
d.toSting(2)//二进制
parseInt(d_str)//转换为数字
parseFloat()
Bolean()


var a = prompt("please input number a")//输入
alert("a is " + a)

== & ===
//==， 两边值类型不同的时候，要先进行类型转换，再比较。
//===，不做类型转换，类型不同的一定不等。


for, while//都和C++类似
//数组
var arr1 = new Array(1)//长度为1的数组
var arr1 = new Array(1,2)//[1,2]
var arr2 = [1 ,"hello", true]
arr2.length
indexOf()//返回索引，如果没有返回-1
forEach()
push()
pop()
reverse()
includes()
sort()

//函数

类似C++
//匿名函数
var fn = funciton(arg = default){

};


eg.
var fn = function(){
	console.log("hello")
}
fn()

var fn = () => console.log("hello")
fn()




//对象
var student = {
	name: "kevin",
	age: 18,
	sayHi: funciton(){
		alert("Hello")
	}
};

或者使用 new Object()
var student = new Object()
student.name = "kevin"
student["age"] = 18;
student.sayHi = () => alert("hello")

或者使用构造函数

function Student (name, age){
	this.name = name
	this.age = age
	this.sayHi = () =>alert("Hello")
}
var student = new Student("kevin", 18)


//类

class Student{
	constructor(name, age){
		this.name = name
		this.age = age
	}
	sayHi(){
		console.log("hello")
	}
}



}