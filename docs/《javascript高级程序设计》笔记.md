

# 《javascript高级程序设计》学习笔记

## 第三章  基本概念

#### null类型

##### null默认是一个空指针，使用typeof检查返回的值是object

```javascript
var a = null;
alert(typeof a) // object
```

##### undefined派生自null值，因此结果如下

```javascript
alert(null == undefined)
```

#### boolean类型

##### boolean类型是区分大小写的,大写不是boolea值，只是标识符

```javascript
let found = true;
let lost = false;
let go = True  // True is not defined
let to = False // 报错
```

##### boolean函数的使用

```javascript
let go = 'hello world'
alert(Boolean(go)) // true
```

| 数据类型  | 转换为true     | 转换为false          |
| --------- | -------------- | -------------------- |
| Boolean   | true           | false                |
| String    | 任何非空字符串 | 空字符串             |
| Number    | 任何非零数字   | 0和null（与NaN相关） |
| Object    | 任何对象       | null                 |
| Undefined | n/a            | Undefined            |

> 流控制语句会经常使用到boolean转换，比如   *if*   判断，见如下代码块。
>
> 确切的知道在流控制语句中使用什么变量至关重要，错误的使用一个对象而不是boolean值有可能彻底改变应用程序的流程

```javascript
let msg = "hello world"
if (msg){
	alert("显示true")
}
```

#### number类型

##### 不同进制之间的计算是不一样的

```javascript
let num1 = 55; // 整数55
let num2 = 070; // 八进制56
let num3 = 079; // 无效的八进制 解析为79
let num4 = 08;  // 无效的八进制 解析为8
let num5 = 0x1111; // 16进制
let num6 = 0xA; // 16进制
let num7 = 0x1f; // 16进制不区分大小写
```

> 八进制字面量在严格模式下是无效的,会导致支持的javascript引擎抛出错误
>
> 十六进制字面量的前两位必须为0x

#####  千万不要用float浮点值计算

```javascript
// 这样的计算是不可取的
if (a+b==0.5) {
	alert("计算正确为0.3")；
}
```

##### NaN为数值（Not a Number）是一个特殊的数值

```javascript
alert(NaN == NaN)； // false
```

> 正对这个特点，ECMAscript定义了isNaN函数，来检查是否为NaN值

```javascript
alert(isNaN(NaN)); // true
alert(isNaN(10)); // false
alert(isNaN("10")); // false
alert(isNaN("blue")); // true 不能转换成数值
alert(isNaN(true));  // false
```

#####  Number数值转换函数

1. 如果是boolean值，true和false转换成1和0

2. 如果是null返回0
3. 如果是undefined返回NaN
4. 如果是字符串遵循上面的代码块案例

##### parseInt函数转换

> parseInt函数转换字符串更多是看其是否符合数值模式，他会忽略前面的空格，直到找到第一个非空格字符。如果是第一个字符不是数字字符或者负号，则返回NaN，而Number函数会返回0，这个要区分。如果第一个是数字字符，parseInt会继续解析后面的字符，直到遇到非数字字符。例如"1234aaa"会被转换为1234，而aaa会被完全忽略掉。类似的“22.5”解析为22

```javascript
let num1 = parseInt("123aaa"); // 123
let num2 = parseInt(""); // NaN
let num3 = parseInt("0xA"); // 10
let num4 = parseInt(22.5); // 22
```

#### String字符串类型

##### string字符串类型里面可以包含转移字符，比如\n,\t这些

##### toString转换为字符串,以及支持数字类型的进制转换

```javascript
let num=8;
alert(num.toString()); // "10" 
alert(num.toString(2)); // "1010"
alert(num.toString(8)); // "12"
alert(num.toString(10)); // "16"
alert(num.toString(16)); // "a"
```

##### 在不知道转换的值是不是null或者undefined的时候可以使用String()

```javascript
let value;
alert(String(10)); // "10"
alert(String(true)); // "true"
alert(String(null)); // "null"
alert(String(undefine)); // "undefine"
alert(String(value)); // "undefined"
```

#### 一元操作符

> 只操作一个值的操作叫做一元操作符.

##### 递增递减的概念要搞清楚

> 分为前置型和后置型, 顾名思义，前置型为：++a，后置型为--a,它们之间的差异，看下面的例子

##### 前置型，先自增（自减）再运算

```javascript
let age1 = 29;
++age1;  // 30

let age2 = 29;
age2 = age2 + 1; // 30,两种方式等价
```

##### 后置型，先运算，再自增（自减）

```javascript
// 在这样的情况下是没有问题的。与前置型的值保持一致。
let age = 29;
age++; // 30
```



##### 差异

```javascript
// 前置型
let num1 = 2;
let num2 = 20;
let num3 = --num1 + num2;  // 21
let num4 = num1 + num2;  // 21
```



```javascript
// 后置型
let num1 = 2;
let num2 = 20;
let num3 = num1-- + num2; // 22
let num4 = num1 + num2;  // 21
```



#### 位操作符

```javascript
// 求-18的的值
// 1. 求得18的原码
0000 0000 0000 0000 0000 0000 0001 0010
// 然后求得反码，即0和1互换
1111 1111 1111 1111 1111 1111 1110 1101
// 最后，二进制反码加1求得补码
1111 1111 1111 1111 1111 1111 1110 1110
```

> 但是，要清楚，浏览器输出的时候只输出原码前加负号

```javascript
let num = -18
console.log(num.toString(2)); // "-10010"
```

##### break和continue

> break和continue语句用于循环中精准的控制代码的执行. 其中break语句会立即退出循环。而continue退出当前循环，从循环顶部继续执行。

```javascript
let num=0;
for(const i=1;i<10;i++){
	if(i%5==0){
		break;
	}
}
alert(num); // 4
```

```javascript
let num=0;
for(const i=1;i<10;i++){
	if(i%5==0){
		continue;
	}
}
alert(num); // 8
```

### 函数

#### 理解参数

> 函数体内可以使用arguments对象来获取传来的参数，arguments和array数组类似,
>
> arguments可以在函数内部未定义形参的情况下获取传来的实参
>
> 严格模式下不要把**函数**和**参数**命名为eval或arguments，会导致错误

##### 函数传参

```javascript
function setHi(){
      alert('say '+arguments[0]+','+arguments[1])
    }
    setHi(1,2); // "say 1, 2"
```

```javascript
function setHi(){
      alert(arguments.length)
    }
    setHi(1,2); // 2
```

#####  js函数没有重载

> ECMAScript函数不能像传统意义上的那种重载，如java。

```javascript
    function addNum(num) {
      return num + 100;
    }

    function addNum(num) {
      return num + 200;
    }

    alert(addNum(100)); // 300
```

> addNum函数被定义了两次，第一个函数计算100+100得200。第二个函数覆盖了第一个函数重新计算100+200得300.

* 下面的例子与上面的一致，更方便理解为什么没有重载

```javascript
let addNum = function(num){
  return num + 200;
}
addNum = function(num){
  return num + 200;
}
alert(addNum(100)); // 300
```



## 第四章 变量、作用域和内存问题

### 变量类型

##### 基本类型

> 基本类型指的是简单是数据段

##### 引用类型

> 引用类型指的是那些可能由多个值构成的对象。它的值是保存在内存中的对象。javascript不允许直接访问内存中的位置，也就是说不能直接操作对象的内存空间。在操作对象时，实际上是在操作对象的引用而不是实际的对象，因此，引用类型的值是按引用访问的。

##### 动态属性

> 基本类型赋值

```javascript
let name = "smallzip"；
name.age = 23;
alert(name.age); // undefined
```

> 引用类型赋值

```javascript
let person = new Object();
person.name = "smallzip";
alert(person.name); // "smallzip"
```

> 以上我们可以看出，只能给引用类型动态的添加属性。

##### 复制变量值

> 基本类型变量赋值，num1和num2的值相互独立，不受影响。当改变num1的值之后不会影响num2

```javascript
let num1 = 5;
let num2 = num1;
num1 = 10;
alert(num1+","+num2);  // 10,5
```

> 引用类型变量赋值。变量obj1保存了一个对象实例，然后这个值被赋值到了obj2，obj1和obj2指向了同一个对象。为obj1添加name属性，obj2访问这个name属性，因为他们两个引用的是同一个对象，同样指向堆内存中的Object,因此obj1.name赋值会影响obj2.name。

```javascript
let obj1 = new Object();
let obj2 = obj1;
obj1.name = "smallzip";
alert(obj2.name);  // "smallzip"
```

##### 类型检测

>  类型检测我们通常使用的是typeof操作。
>
> 首先要知道，**所有引用类型的值都是Object的实例**,因此，检查出变量是object类型的就可以知道是否为引用类型了。

```javascript
alert(typeof "smallzip"); // string
alert(typeof 1);   // number
alert(typeof true); // boolean
alert(typeof undefined) // undefined
alert(typeof null); // object
alert(typeof new Object()); // object
```

> 其次我们还可以使用**instanceof**操作来检查是否为引用类型

```javascript
let obj1 = new Object();
alert(obj1 instanceof Array); // false
alert(obj1 instanceof Object); // true
```

#### 作用域链

> 当代码在一个环境中执行时，会创建变量对象的一个作用域链（scope chain）。作用域链的用途是保证对执行环境有权访问所有变量和函数，和函数的有序访问。

##### 案例1

* changeColor函数的作用域链包含了两个对象。1.它自己的变量对象，其中定义着arguments对象。2.全局环境变量color。
* 可以在函数内部访问外部变量color，就是因为可以在作用域链中找到它。
* 作用域链中包含了当前环境下的变量，和父级环境以上的变量，包括全局。

```javascript
let color = "blue";
function changeColor(){
  if(color == "blue"){
    color = "red";
  } else {
    color = "blue";
  }
}
changeColor();
alert(color);  // "red"
```

##### 案例2

> 下面代码涉及到了三个执行环境。

```javascript
let color = "blue";
function changeColor(){
  let anotherColor = "red";
  function swapColor(){
    let tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
  	// 这里可以访问color,anotherColor和tempColor  
  }
  swapColor();
  // 这里可以访问color和anotherColor,但是不能访问tempColor
}
changeColor();
// 这里可以访问color
```

* 画个图更好的理解作用域链。

> 内部环境可以通过作用域链访问外部环境，但是外部环境不能访问内部环境的任何变量和函数。这些环境之间的联系是线性、有次序的。每个执行环境都可以向上搜索作用域链，以查询变量和函数。
>
> 如下就是一整条作用域链。

```javascript
window
	|
  |___color
	|
  |___changeColor()
				|
  			|___anotherColor
				|
  			|___swapColor()()
								|
  							|___tempColor
```

##### 管理内存

> 优化内存占用的最佳方式，就是为执行中的代码只保存必要的数据，一旦数据不用了，就设置其值为null来释放它的引用，这个做法叫做**解除引(dereferencing)**。
>
> 解除一个值的引用并不意味着其自动回收该值所占用的内存。只是让它脱离执行环境，以便垃圾收集器下次运行的时候将其回收。

## 第五章 引用类型

#### 数组栈方法

> 栈是一种LIFO（Last-First-Out）--- **后进先出**的数据结构。
>
> 就是最新添加的项，最早被移除。
>
> 而栈顶的插入（或者叫推入）和移除（或者叫弹出），只发生在栈的顶部。
>
> ECMAScript为数组专门提供了push和pop方法实现栈的行为。

* push接受的参数逐个添加到数组末尾，返回修改后的长度。
* pop方法从数组末尾移除最后一项，减少数组的长度，返回移除的项。

```javascript
let arr = Array();
let arr1 = arr.push('red', 'blue');
alert(arr1); // 2
let arr2 = arr.pop();
alert(arr2); // "blue"
```

#### 数组的队列方法

> 队列数据结构规则是FIFO（First-In-First-Out）--- **先进先出**
>
> 队列在列表末端插入，列表前端移除。
>
> 由shift方法实现

* push接受的参数逐个添加到数组末尾，返回修改后的长度。
* shift移除第一项

```javascript
let arr = Array();
let arr1 = arr.push('red', 'blue');
alert(arr1); // 2
let arr2 = arr.shift();
alert(arr2); // "red"
```

* unshift与shift相反，unshift是在前端推入项

```javascript
let arr = Array("white")
let arr1 = arr.push('red', 'blue');  // white,red,blue
```

```javascript
let arr = Array("white")
let arr1 = arr.unshift('red', 'blue');  // red,blue,white
```

#### 五个迭代方法

* every()  每一项都是true则返回true
* filter() 返回为true的项
* forEach() 没有返回值，可以改变原数组
* map()  返回调用的结果组成新的数组
* some() 只要一个true则返回true

## 第六章 面向对象的程序设计

#### 函数属性和方法

> 每个函数都包含两个非集成而来的方法：apply()和call()。两个的用武之地是解决了函数的作用域问题。

```javascript
window.color = "red";
let a = {color:"blue"};
function setColor(){
  alert(this.color);
}
setColor(); // red
setColor.call(this); // red
setColor.apply(window); // red
setColor.call(a); // blue
setColor.apply(a); // blue
setColor.bind(a); // blue
```

* call和apply唯一的区别就是第二个参数，call是单个单个列出来，apply是数组

```javascript
{}.call(this,"a","b","c")；
{}.apply(this,["a","b","c"])；
{}.appy(this,arguments);
```

#### 原型模式

```javascript
function Person(){}
Person.prototype.name = "smallzip";
Person.prototype.age = 29;
Person.prototype.job = "前端攻城狮";
Person.prototype.setName = function(){
  alert(this.name);
}
let person1 = new Person();
person1.setName(); // "smallzip"
let person2 = new Person();
person2.setName(); // "smallzip"
alert(person1.setName == person2.setName); // true
```

##### 理解原型对象

无论什么时候，只要创建了一个新函数，就会为函数创建一个prototype属性，这个属性指向函数的原型对象。而所有的原型对象都会自动获得一个constructor构造函数属性。

person1和person2是属于Person的两个实例。两个实例共享了Person的属性和方法。

##### 实例可以访问原型的值，但是却不能重写原型的值

```javascript
function Person(){}
Person.prototype.name = "smallzip";
Person.prototype.age = 29;
Person.prototype.job = "前端攻城狮";
Person.prototype.setName = function(){
  alert(this.name);
}

let person1 = new Person();
let person2 = new Person();

person1.name = "zhou";

alert(person1.name); // zhou --- 来自实例
alert(person2.name); // smallzip --- 来自原型

delete person1.name;

alert(person1.name);  // smallzip---来自原型
```

##### 可以通过hasOwnProperty()方法检查属性是否存在实例中，还是存在原型中

```javascript
function Person(){}
Person.prototype.name = "smallzip";
Person.prototype.age = 29;
Person.prototype.job = "前端攻城狮";
Person.prototype.setName = function(){
  alert(this.name);
}

let person1 = new Person();
let person2 = new Person();

alert(person1.hasOwnProperty("name")); // false --- 存在原型中

person1.name = "zhou"；

alert(person1.hasOwnProperty("name")); // true --- 存在实例中
```

##### 获取对象所有可枚举的实例属性

```javascript
function Person(){}
Person.prototype.name = "smallzip";
Person.prototype.age = 29;
Person.prototype.job = "前端攻城狮";
Person.prototype.setName = function(){
  alert(this.name);
}

alert(Object.key(Person.prototype)); // name,age,job,setName
```

##### 获取对象所有实例实行，包括不可枚举

```javascript
function Person(){}
Person.prototype.name = "smallzip";
Person.prototype.age = 29;
Person.prototype.job = "前端攻城狮";
Person.prototype.setName = function(){
  alert(this.name);
}

alert(Object.getOwnPropertyName(Person.prototype)); // constructor,name,age,job,setName
```

## 第七章 函数表达式

### 闭包与变量

#### 概念

闭包是指有权访问另一个函数作用域中的变量的函数。你可以把它看做是对象，它可以像对象一样操作对象内（全局）定义的属性值，变量，而这些变量能在函数中保存，直到函数的实例对象销毁为止。

* 简单的闭包案例

```javascript
   function ttt() {
      let x = 0;
      return function (y) {
        x = x + y
        return x
      }
    };
    let b = ttt();
    alert(b(1));  // 1
    alert(b(1));  // 2
```

> 第一次执行test函数匿名函数（闭包）内的x进行了累加得1，第二再执行闭包的时候x并未因为let  x = 0；而为0，而是为上次累加的结果1，因此第二次执行之后就变成了x = 1+1=2。闭包内的变量是保存了再内存里面，并未销毁。

* 变量

```javascript
    let max = 10;
    let fn = function (x) {
      if (x > max) {
        console.log(x);  //15
      }
    };
		// 闭包
    (function (f) {
      let max = 100;
      f(15);
    })(fn);
```

> fn是引用类型所以执行活动环境上下文是处于全局，在闭包内执行的时候max的值为全局变量10，而不是闭包内部环境的100

```javascript
function fn() {
      let max = 10;
      return function (x) { //局部作用域
        if (x > max) {
          console.log(x); // 15
        }
      };
    }
    let max = 100;
    let f1 = fn(15);
    f1(15);
```

> 上面例子把闭包放置在了fn函数内容，所以闭包是属于局部作用域环境下执行。因此max的值会从局部作用域开始不断向上查找作用域链的max变量，在fn函数内就找到了max变量，停止了查找，取得的max的值为10；

* 作用域

```javascript
		let scpope = "全局作用域";
    function fn() {
      let scope = "本地作用域";
      return function () {
        return scope
      };
    }

    console.log(fn()); // 本地作用域
```

```javascript
 let scpope = "全局作用域";
    function fn() {
      let scope = "本地作用域";
      return function () {
        return scope
      };
    }

    console.log(fn()()); // 本地作用域
```

通过上面几个例子我们可以看出，闭包函数被执行时的作用域链指向的是**被定义**时的作用域链，而不是执行环境下的作用域链。

这里的结论只是在函数内的闭包，如果是在对象内的闭包则需要看this的指向。下面就讲讲关于this对象。

### 关于this对象

在闭包中使用this对象可能会导致一些问题。this对象是在运行时基于函数的执行环境绑定的：在全局函数中，this等于window，在对象内调用时候this等于那个对象。不过**匿名函数**执行环境有全局性，因此其this对象通常指向window。

关键在于看this当前的环境执行的上下文，每次调用函数，都会产生一个新的执行上下文环境。

#### 构造函数this的上下文

> People函数在window下运行所有this指向的是全局window

```javascript
    function People() {
      this.name = "smallzip";
      this.year = 1997;
      console.log(this); //window
    }
    People();
```

> People作为构造函数new实例化给了f1，所以this指向了f1。

```javascript
function People() {
      this.name = "smallzip";
      this.year = 1997;
      console.log(this); // People { name: "smallzip", year: 1997 }
    }
    var f1 = new People();
```

#### 对象下的this

```javascript
let name = "window"
    let object = {
      name: 'smallzip',
      getName: function () {
        return function () {
          return this.name;
        };
      }
    };
    console.log(object.getName()()); // window
```

```javascript
let name = "window"
    let object = {
      name: 'smallzip',
      getName: function () {
        let self = this;
        return function () {
          return self.name;
        };
      }
    };
    console.log(object.getName()()); // smallzip
```

> 第一个执行环境为winow，闭包内默认指向了window。第二个在执行匿名函数前把this对象赋值给了self变量。在定义了闭包之后，闭包也可以访问这个变量指向的对象，因此返回的是对象内的name。

