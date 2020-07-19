//var -> function
//let -> block
//const -> block
function sayHello(){
	for(let i = 0; i < 5; i++){
		console.log(i);
	}
}
sayHello();

const person = {
	name: "Peter",
	walk: function(){
		console.log(this);//this returns a reference to the current object
	},
	talk() {}//不使用冒号和function keyword

};

person.talk();
const targetMember = "name";
person["name"] = "John";
person[targetMember.value] = "John";

const walk = person.walk;//walk是一个函数,也是一个object
walk();//这里的this就变成window

//BIND
const walkWithBind = person.walk.bind(person);//bind this to person
walkWithBind();

//ARROW FUNCTION
const square = function(number){
	return number * number;
}

const square = (number) =>{
	return number * number;
}

//if the body only contain return & only one parameter
const square = number => number * number;// number goes to number * number

const jobs = [
	{id:1, isActive: true},
	{id:2, isActive: true},
	{id:3, isActive: false},
]

const activeJobs = jobs.filter(job => job.isActive);
// Arrow Funciton don't rebind this


const person = {
	talk(){
		setTimeout(function(){
			console.log("this", this);// 由于console是回调函数，this是windows
		}, 1000);
	}
	talkArrow(){
		setTimeout(()=>{
			console.log("this",this);//箭头函数不会重设this, this是person
		},1000)
	}
};


//MAP
const colors = ["red", "green", "blue"];
const item = colors.map(color=>("<li>" + color + "</li"))//遍历colors，每个返回一个list
const items = colors.map(color => `<li>${color}</li>`)//模板格式语法

//OBJECT DESTRUCTURING
const address = {
	street: "",
	city: "",
	country: ""
};
const street = address.street;
const city = address.city;
const country = address.country;
//过于冗长了
const{street, city, country} = address;//将address的property提取出来
const{street:st} = address;//将street命名为st

//SPREAD OPERATOR
const first = [1,2,3];
const second = [4,5,6];

const combined = first.concat(second);
const combined = [...first, "a", ...second, "b"];//类似concat，但可以在中间加东西
const clone = [...first]//clone the first array


const first = {name: "Mosh"};



