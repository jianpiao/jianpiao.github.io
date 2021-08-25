# 《javascript高级程序设计》学习笔记

## 第3章  基本概念

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



## 第4章 变量、作用域和内存问题

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
>  首先要知道，**所有引用类型的值都是Object的实例**,因此，检查出变量是object类型的就可以知道是否为引用类型了。

```javascript
alert(typeof "smallzip"); // string
alert(typeof 1);   // number
alert(typeof true); // boolean
alert(typeof undefined) // undefined
alert(typeof null); // object
alert(typeof new Object()); // object
alert(typeof []); // object
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

### 执行上下文与作用域

变量或函数的上下文决定 了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象(variable object)， 而这个上下文中定义的所有变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台 处理数据会用到它。

全局上下文是最外层的上下文。根据宿主是不同有所差异，node中是global，浏览器中是window对象。

浏览器中，所有通过 var 定 义的全局变量和函数都会成为 window 对象的属性和方法。使用 let 和 const 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。上下文在其所有代码都执行完毕后会被销毁，包括定义 在它上面的所有变量和函数(全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器)。

每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。 在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。ECMAScript 程序的执行流就是通过这个上下文栈进行控制的。

上下文中的代码在执行的时候，会创建变量对象的一个作用域链(scope chain)。这个作用域链决定 了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域 链的最前端。如果上下文是函数，则其活动对象(activation object)用作变量对象。活动对象最初只有 一个定义变量:arguments。(全局上下文中没有这个变量。)作用域链中的下一个变量对象来自包含上 下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文;全局上下文的变量对象始终 是作用域链的最后一个变量对象。

代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链 的最前端开始，然后逐级往后，直到找到标识符。(如果没有找到标识符，那么通常会报错。)

### 垃圾回收

JavaScript 是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。在 C 和 C++等 语言中，跟踪内存使用对开发者来说是个很大的负担，也是很多问题的来源。JavaScript 为开发者卸下 了这个负担，通过自动内存管理实现内存分配和闲置资源回收。

#### 思路概要

基本思路很简单：确定哪个变量不会再使用，然后释放它占用的内存。

#### 思路详解

这个过程是周期性的，即垃圾回收程序每隔一定时间(或者说在代码执 行过程中某个预定的收集时间)就会自动运行。垃圾回收过程是一个近似且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题，意味着靠算法是解决不了的。 我们以函数中局部变量的正常生命周期为例。函数中的局部变量会在函数执行时存在。此时，栈(或堆)内存会分配空间以保存相应的值。函数在内部使用了变量，然后退出。此时，就不再需要那个局部 变量了，它占用的内存可以释放，供后面使用。这种情况下显然不再需要局部变量了，但并不是所有时 候都会这么明显。垃圾回收程序必须跟踪记录哪个变量还会使用，以及哪个变量不会再使用，以便回收 内存。如何标记未使用的变量也许有不同的实现方式。不过，在浏览器的发展史上，用到过两种主要的 标记策略:**标记清理和引用计数。**

#### 标记清理

javaScript 最常用的垃圾回收策略是**标记清理(mark-and-sweep)**。当变量进入上下文，比如在函数 内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永 远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。

垃圾回收程序运行的时候，会标记内存中存储的所有变量(记住，标记方法有很多种)。然后，它 会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记 的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内 存清理，销毁带标记的所有值并收回它们的内存。

到了 2008 年，IE、Firefox、Opera、Chrome 和 Safari 都在自己的 JavaScript 实现中采用标记清理(或 其变体)，只是在运行垃圾回收的频率上有所差异。

#### 引入计数

另一种没那么常用的垃圾回收策略是引用计数(reference counting)。其思路是对每个值都记录它被 引用的次数。声明变量并给它赋一个引用值时，这个值的引用数为 1。如果同一个值又被赋给另一个变 量，那么引用数加 1。类似地，如果保存对该值引用的变量被其他值给覆盖了，那么引用数减 1。当一 个值的引用数为 0 时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序 下次运行的时候就会释放引用数为 0 的值的内存。

引用计数最早由 Netscape Navigator 3.0 采用，但很快就遇到了严重的问题:循环引用。所谓循环引 用，就是对象 A 有一个指针指向对象 B，而对象 B 也引用了对象 A。比如:

```javascript
function problem(){
  let objA = new Object();
  let objB = new Object();
  
  objA.someUse = objB;
  objB.otherUse = objA;
}
```

上面`objA`和`objB`通过各自的属性相互引用。在 标记清理策略下，这不是问题，因为在函数结束后，这两个对象都不在作用域中。而在引用计数策略下，两个函数运行结束后，还是会存在，因为它们的引用数永远不会变为0。如果函数被多次调用，会导致大量的内存永远不会被释放。

### 性能

垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失，因此垃圾回收的 时间调度很重要。尤其是在内存有限的移动设备上，垃圾回收有可能会明显拖慢渲染的速度和帧速率。 开发者不知道什么时候运行时会收集垃圾，因此最好的办法是在写代码时就要做到:无论什么时候开始 收集垃圾，都能让它尽快结束工作。

现代垃圾回收程序会基于对 JavaScript 运行时环境的探测来决定何时运行。

### 小结

* 执行上下文分全局上下文、函数上下文和块级上下文。
* 代码执行流每进入一个新上下文，都会创建一个作用域链，用于搜索变量和函数。
* 变量的执行上下文用于确定什么时候释放内存。
* 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除。
* 流的垃圾回收算法是标记清理，即先给当前不使用的值加上标记，再回来回收它们的内存。
* 引用计数是另一种垃圾回收策略，需要记录值被引用了多少次。
* 引用计数在代码中存在循环引用时会出现问题。
* 解除变量的引用不仅可以消除循环引用，而且对垃圾回收也有帮助。为促进内存回收，全局对象、全局对象的属性和循环引用都应该在不需要时解除引用。

## 第5章 引用类型

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

#### 两个归并方法

* reduce() 方法从数组第一项开始遍历到最后一项
* reduceRight() 从最后一项开始遍历至第一项

### Map

实现“键/值”式存储。也就是使用对象属性作为键，再使用属性来引用值。

使用方法：

```javascript
const m = new Map();
```

**使用嵌套数组初始化映射**

```javascript
const m1 = new Map([
  ["key1", "val1"],
  ["key2", "val2"],
  ["key3", "val3"]
]);
alert(m1.size); // 3
```

**使用自定义迭代器初始化映射 **

```javascript
const m2 = new Map({
  [Symbol.iterator]: function*() {
    yield ["key1", "val1"];
    yield ["key2", "val2"];
    yield ["key3", "val3"];
  } 
});
alert(m2.size); // 3
```

**映射期待的键/值对，无论是否提供**

```javascript
const m3 = new Map([[]]); 
alert(m3.has(undefined)); // true
alert(m3.get(undefined));  // undefined
```

初始化之后，可以使用 `set()`方法再添加键/值对。另外，可以使用 `get()`和 `has()`进行查询，可 以通过 `size` 属性获取映射中的键/值对的数量，还可以使用 `delete()`和 `clear()`删除值。

```javascript
 const m = new Map();

alert(m.has("firstName"));  // false

alert(m.get("firstName"));  // undefined
alert(m.size);              // 0

m.set("firstName", "Matt")
  .set("lastName", "Frisbie");

alert(m.has("firstName")); // tru
alert(m.get("firstName")); // Matt
alert(m.size);             // 2

m.delete("firstName"); // 只删除这一个键/值对

alert(m.has("firstName")); // false
alert(m.has("lastName"));  // true
alert(m.size);             // 1

m.clear(); // 清除这个映射实例中的所有键/值对

alert(m.has("firstName")); // false
alert(m.has("lastName"));  // false
alert(m.size); 
```

### 选择Object还是Map

#### 1. 内存占用

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。 不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。

#### 2. 插入性能

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快 一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操 作，那么显然 Map 的性能更佳。

#### 3. 查找速度

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对， 则 Object 有时候速度更快。在把 Object 当成数组使用的情况下(比如使用连续整数作为属性)，浏 览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言， 查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选 择 Object 更好一些。

#### 4. 删除性能

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此， 出现了一些伪删除对象属性的操作，包括把属性值设置为undefined或null。但很多时候，这都是一 种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。 如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。

### WeakMap

WeakMap 中的“weak”(弱)， 描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。

WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用， 不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。只要键存在，键/值 对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。

### Set

使用方式：

```javascript
const m = new Set();

const s1 = new Set(["val1", "val2", "val3"]);

alert(s1.size); // 3

// 使用自定义迭代器初始化集合
const s1 = new Set({
  [Symbol.interator]:function*(){
    yield "val1";
    yield "val2";
    yield "val3";
  }
});
alert(s2.size); // 3

s2.add("val4").add("val5");

alert(s2.has("val4")); // true

alert(s2.delete("val4"));
alert(s2.has("val4")); // false

s2.clear(); // 销毁集合实例中所有的值

```

Set 会维护值插入时的顺序，因此支持按顺序迭代。

### WeakSet

WeakSet 中的“weak”(弱)，描述的 是 JavaScript 垃圾回收程序对待“弱集合”中值的方式。

```javascript
onst val1 = {id: 1},
      val2 = {id: 2},
      val3 = {id: 3};
// 使用数组初始化弱集合
const ws1 = new WeakSet([val1, val2, val3]);
alert(ws1.has(val1)); // true
alert(ws1.has(val2)); // true
alert(ws1.has(val3)); // true
```

WeakSet 中“weak”表示弱集合的值是“弱弱地拿着”的。意思就是，这些值不属于正式的引用,不会阻止垃圾回收。

看下面例子：

```javascript
const ws = new WeakSet();
ws.add({});
```

add()方法初始化了一个新对象，并将它用作一个值。因为没有指向这个对象的其他引用，所以当这行代码执行完成后，这个对象值就会被当作垃圾回收。然后，这个值就从弱集合中消失了，使其成为 一个空集合。

看看带有销毁的一个例子：

```javascript
const ws = new WeakSet();

const container = {
  val: {}
};

ws.add(container.val);

function removeReference() {
  container.val = null;
}
```

这一次，container 对象维护着一个对弱集合值的引用，因此这个对象值不会成为垃圾回收的目 标。不过，如果调用了 removeReference()，就会摧毁值对象的最后一个引用，垃圾回收程序就可以 把这个值清理掉。

#### 不可迭代值

因为 WeakSet 中的值任何时候都可能被销毁，所以没必要提供迭代其值的能力。

#### 为什么使用对象作为值

WeakSet 之所以限制只能用对象作为值，是为了保证只有通过值对象的引用才能取得值。如果允许 原始值，那就没办法区分初始化时使用的字符串字面量和初始化之后使用的一个相等的字符串了。

### 迭代器

迭代的英文“iteration”源自拉丁文 itero，意思是“重复”或“再来”。在软件开发领域，“迭代” 的意思是按照顺序反复多次执行一段程序，通常会有明确的终止条件。ECMAScript 6 规范新增了两个高 级特性:迭代器和生成器。使用这两个特性，能够更清晰、高效、方便地实现迭代。

#### 迭代协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器 API 使用 next()方法 在可迭代对象中遍历数据。每次成功调用 next()，都会返回一个 IteratorResult 对象，其中包含迭 代器返回的下一个值。若不调用 next()，则无法知道迭代器的当前位置。

next()方法返回的迭代器对象 IteratorResult 包含两个属性:done 和 value。done 是一个布 尔值，表示是否还可以再次调用 next()取得下一个值;value 包含可迭代对象的下一个值(done 为 false)，或者 undefined(done 为 true)。

设计迭代器：

```javascript
class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  
  [Symbol.iterator]() {
    let count = 1;
    let limit = this.limit;
    return {
      next () {
        if(count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true, value: undefined };
        }
      }
    }
  }
}
```

使用迭代方法:

```javascript
let counter = new Counter(3);

for (let i of counter) {
  console.log(i);
}
// 1
// 2
// 3
```

### 生成器

生成器拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。

#### 生成器基础

生成器的形式是一个函数，函数名称前面加一个星号(*)表示它是一个生成器。只要是可以定义 函数的地方，就可以定义生成器。

```javascript
// 生成器函数声明
function* generatorFn() {}
// 生成器函数表达式
let generatorFn = function* () {}
// 作为对象字面量方法的生成器函数 
let foo = {
  * generatorFn() {}
}
// 作为类实例方法的生成器函数 
class Foo {
  * generatorFn() {}
}
// 作为类静态方法的生成器函数 
class Bar {
  static * generatorFn() {}
}

```

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行(suspended)的状态。与 迭代器相似，生成器对象也实现了 Iterator 接口，因此具有 next()方法。调用这个方法会让生成器 开始或恢复执行。

```javascript
function* generatorFn() {}

const g = generatorFn();

console.log(g);       // generatorFn {<suspended>}
console.log(g.next);  // f next() { [native code] }
```

#### 使用yield中断执行

yield 关键字可以让生成器停止和开始执行，也是生成器最有用的地方。生成器函数在遇到 yield 关键字之前会正常执行。遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生 成器函数只能通过在生成器对象上调用 next()方法来恢复执行。

```javascript
function* generatorFn() {
	yield 'foo';  // 这里中断，等待next()才会执行
  yield 'bar'; 	// 与上述同理
  return 'baz';
}

let generatorObject = generatorFn();

console.log(generatorObject.next()); // { done: false, value: 'foo' }
console.log(generatorObject.next()); // { done: false, value: 'bar' }  
console.log(generatorObject.next()); // { done: true, value: 'baz' }
```

#### 生成器对象作为可迭代对象

```javascript
function* generatorFn() {
  yield 1;
  yield 2;
  yield 3;
}
for (const x of generatorFn()) {
  console.log(x);
}
// 1
// 2
// 3
```

#### 生成器作为默认迭代器

因为生成器对象实现了 Iterable 接口，而且生成器函数和默认迭代器被调用之后都产生迭代器， 所以生成器格外适合作为默认迭代器。下面是一个简单的例子，这个类的默认迭代器可以用一行代码产 出类的内容:

```javascript
class Foo {
  constructor() {
    this.values = [1, 2, 3];
  }
  
  * [Symbol.iterator]() {
     yield* this.values;
	}
}

const f = new Foo();
for (const x of f) {
  console.log(x);
}
// 1 
// 2 
// 3
```

这里，for-of 循环调用了默认迭代器(它恰好又是一个生成器函数)并产生了一个生成器对象。 这个生成器对象是可迭代的，所以完全可以在迭代中使用。



## 第6章 面向对象的程序设计

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

### 原型链

ECMA_262把原型链定义为ECMAScript的主要方式。**其基本思想就是通过原型继承多个引用类型的属性和方法**。

重温一下构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个类型的实例呢？那就意味着这个原型本身有一个内部执行指向另一个原型，相应的另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一个条原型链，这个就是原型链的基本思想。

## 第7章 函数表达式

### 闭包与变量

#### 概念

闭包是指有权访问另一个函数作用域中的变量的函数。你可以把它看做是对象，它可以像对象一样操作对象内（全局）定义的属性值，变量，而这些变量能在函数中保存，直到函数的实例对象销毁为止。

* 简单的闭包案例

```javascript
   function test() {
      let x = 0;
      return function (y) {
        x = x + y
        return x
      }
    };
    let b = test();
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
    if (x > max) { // max会从局部作用域链中查找，最终查到的max为15
      console.log(x); // 15
    }
  };
}
let max = 100;
let f1 = fn();
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



## 第8章 BOM

### window对象

BOM的核心对象是window，它表示浏览器的一个实例。在浏览器中，window对象双重角色，它既是通过javascript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。这意味着在网页中定义的任何一个对象、变量和函数都以window作为其的Global对象，因此有权访问parsenInt()等方法。

### 像素比

CSS 像素是 Web 开发中使用的统一像素单位。这个单位的背后其实是一个角度:0.0213°。

手机屏幕的物理分辨率可能是 1920×1080，但因为其像素可能非常小，所以浏览器就需 要将其分辨率降为较低的逻辑分辨率，比如 640×320。这个物理像素与 CSS 像素之间的转换比率由 window.devicePixelRatio 属性提供。

对于分辨率从 1920×1080 转换为 640×320 的设备，window. devicePixelRatio 的值就是 3。这样一来，12 像素(CSS 像素)的文字实际上就会用 36 像素的物理 像素来显示。

`window.devicePixelRatio` 实际上与每英寸像素数(DPI，dots per inch)是对应的。DPI 表示单 位像素密度，而 window.devicePixelRatio 表示物理像素与逻辑像素之间的缩放系数。

### 窗口大小

* innerWidth：返回浏览器窗口中页面视口的宽度(不包含浏览器边框和工具栏)
* innerHeight：返回浏览器窗口中页面视口的高度(不包含浏览器边框和工具栏)
* outerWidth：返回浏览器窗口的宽度
* outerHeight：返回浏览器窗口的高度



使用resizeTo()和 resizeBy()可以实现调整窗口大小。

```javascript
// 缩放到100×100 
window.resizeTo(100, 100);
// 缩放到200×150 
window.resizeBy(100, 50);
// 缩放到300×300 
window.resizeTo(300, 300);
```

### 视口位置

可以使用 `scroll()`、`scrollTo()`和` scrollBy()`方法滚动页面。这 3 个方法都接收表示相对视口距 离的 x 和 y 坐标，这两个参数在前两个方法中表示要滚动到的坐标，在最后一个方法中表示滚动的距离。

```javascript
// 相对于当前视口向下滚动 100 像素 
window.scrollBy(0, 100);
// 相对于当前视口向右滚动 40 像素 
window.scrollBy(40, 0);
// 滚动到页面左上角 
window.scrollTo(0, 0);
// 滚动到距离屏幕左边及顶边各 100 像素的位置 
window.scrollTo(100, 100);
```

这几个方法也都接收一个 ScrollToOptions 字典，除了提供偏移值，还可以通过 behavior 属性 告诉浏览器是否平滑滚动。

```javascript
// 正常滚动 
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'auto'
});

// 平滑滚动
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'smooth'
});
```



### 全局作用域

在全局作用域中声明的变量、函数都会变成window对象的属性和方法。

```javascript
let age = 1;
function setAge(){
  alert(this.age);
}
alert(window.age);  // 1
setAge(); 					// 1
window.setAge(); 		// 1
```

全局作用域中定义的变量和函数都会自动归属于window对象名下。

#### window查询

尝试访问未声明的变量会抛出错误，但是通过查询window对象，可以知道某个可能未声明的变量是否存在。

```javascript
let aa = bb; // Uncaught ReferenceError: bb is not defined
```

```javascript
let aa = window.bb;
alert(aa); // 这里不会排抛出s sws何错误，也不会返回任何信息
```

### window.open

window.open有四个参数

1. 参数1：要打开的链接地址URL
2. 参数2：窗口目标
3. 参数3：一个特性字符串
4. 参数4：一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值

```javascript
window.open('https://jianpiao.github.io',topFrame)
// 等同于
<a href="https://jianpiao.github.io" target="topFrame"> </a>
```

> 用户点击了href属性为https://jianpiao.github.io，target属性为“topFrame”的链接，如果一个名叫topFrame的窗口或者框架，就会在该窗口或该框架加载这个URL，否则，聚会创建一个新的窗口并将其命名为topFrame。此外，第二个参数也可以是下列任何一个特殊的窗口名称： _self、 _parent、 _top、 _blank

当使用window.open弹出窗口之后想关闭弹出的窗口可以使用window.close()函数来关闭。

### setTimeout定时器

javascript是一个单线程序的解释器，因此一定时间只能执行一段代码，为了控制要执行的代码，就有一个javascript任务队列，这些任务会按照将它们添加到队列的顺序执行。setTimeout的第二个参数告诉javascript再经过多长时间把当前任务天添加到队列中，如果队列是空的，那就添加的代码会立即执行，如果是队列不为空，则会按照顺序等它前面的代码执行完毕再执行。

### localtion对象

location是最有用的BOM对象之一。它既是window对象的属性，也是document对象的属性。意思是说，window.location和document.location引用的是同一个对象。

| 属性名   | 例子                | 说明                                                         |
| -------- | ------------------- | ------------------------------------------------------------ |
| hash     | #contents           | 返回RUL中的bash，如果URL不包含散列，则返回空字符串           |
| host     | www.smallzip.com    | 返回服务器名称和端口号(如果有)                               |
| hostname | www.smallzip.com    | 返回不带端口号的服务器名称                                   |
| href     | http://smallzip.com | 返回当前加载页面的完整URL                                    |
| pathname | /willey/            | 返回URL中的目录或者文件名                                    |
| post     | 8080                | 返回URL中指定的端口号，如果URL不包含端口号，则属性返回字符串 |
| protocol | http                | 返回页面是要的协议一般是，http和https                        |
| search   | ?a=0                | 返回URL的查询字符串，这个字符串以问好开头                    |

### screen对象

| 属性        | 说明                                         | 支持IE/Firefox/Safari/Chrome/Opera |
| ----------- | -------------------------------------------- | ---------------------------------- |
| availHeight | 屏幕的像素高度减去系统部件高度之后的值(只读) | 支持全部                           |
| availWidth  | 屏幕的像素宽度减去系统部件宽度之后的值       | 支持全部                           |
| height      | 屏幕的像素高度                               | 支持全部                           |
| width       | 屏幕的像素宽度                               | 支持全部                           |

### history对象 

history保存用户上网的历史记录，从窗口被打开的那一刻起算起。

使用go()方法可以在用户的历史记录中任意跳转，可以向前也可以向后。

```javascript
history.go(-1); // 后退一页
history.go(1);  // 前进一页
history.go(2);  // 前进两页
history.go("smallzip.com"); // 跳转到最近的smallzip.com页面
```

另外还可以使用两个简写方法back()和forward()方法来代替go()。

```javascript
history.back();     // 后退一页
history.forward();  // 前进一页
```

除此之外，history对象还有还有一个length属性，保存着历史记录的数量，这个数量包括所有历史的记录。

```javascript
history.length; // 1,当你打开第一个页面的时候会显示1
```

## 第9章 代理与反射

代理是目标对象的抽象。因为它可以 用作目标对象的替身，但又完全独立于目标对象。目标对象既可以直接被操作，也可以通过代理来操作。 但直接操作会绕过代理施予的行为。

看下面例子：

```javascript
const target = {
  id: 'target'
};

const handler = {};

const proxy = new Proxy(target, handler);

// id 属性会访问同一个值 
console.log(target.id); // target 
console.log(proxy.id); // target

// 给目标属性赋值会反映在两个对象上 
// 因为两个对象访问的是同一个值 
target.id = 'foo'; 
console.log(target.id); // foo 
console.log(proxy.id); // foo

// 给代理属性赋值会反映在两个对象上  
// 因为这个赋值会转移到目标对象
proxy.id = 'bar';
console.log(target.id); // bar
console.log(proxy.id);  // bar

// hasOwnProperty()方法在两个地方
// 都会应用到目标对象 
console.log(target.hasOwnProperty('id')); // true
console.log(proxy.hasOwnProperty('id')); // true
```

### 定义捕获器

使用代理主要目的是可以定义捕获器(trap)。捕获器就是在处理程序对象中定义的“基本操作的 拦截器”。代理可以在操作传播到目标对 象之前先调用捕获器函数，从而拦截并修改相应的行为。

只有在代理对象上执行操作才会触发捕获器，看下面例子：

```javascript
const target = {
  foo: 'bar'
};
const handler = {
// 捕获器在处理程序对象中以方法名为键 get() {
    return 'handler override';
  }
};
const proxy = new Proxy(target, handler);

console.log(target.foo); // bar
console.log(proxy.foo);  // handler override
console.log(target['foo']); // bar
console.log(proxy['foo']); // handler override

console.log(Object.create(target)['foo']); // bar
console.log(Object.create(proxy)['foo']); // handler override
```

### 捕获器和反射API

反射api使用方法：

```javascript
const target = {
  foo: 'bar'
};

const handler = {
  get() {
    return Reflect.get(...arguments);
	} 
};

const proxy = new Proxy(target, handler);

console.log(proxy.foo);   // bar
console.log(target.foo);  // bar
```

还可以简介有点：

```javascript
const target = {
  foo: 'bar'
};

const handler = {
  get() {
    return Reflect.get;
	} 
};

const proxy = new Proxy(target, handler);

console.log(proxy.foo);   // bar
console.log(target.foo);  // bar
```

事实上，如果真想创建一个可以捕获所有方法，然后将每个方法转发给对应反射 API 的空代理，那 么甚至不需要定义处理程序对象:

```javascript
const target = {
  foo: 'bar'
};

const proxy = new Proxy(target, Reflect);

console.log(proxy.foo);   // bar
console.log(target.foo);  // bar
```

### 可撤销代理

Proxy 也暴露了 revocable()方法，这个方法支持撤销代理对象与目标对象的关联。撤销代理的 操作是不可逆的。而且，撤销函数(revoke())是幂等的，调用多少次的结果都一样。撤销代理之后 再调用代理会抛出 TypeError。

```javascript
const target = {
  foo: 'bar'
};
const handler = {
  get() {
    return 'intercepted';
  }
};

// 撤销代理
const { proxy, revoke } = Proxy.revocable(target, handler);

console.log(proxy.foo);   // intercepted，这里代理被撤销了
console.log(target.foo);  // bar

revoke();

console.log(proxy.foo);   // TypeError
```

### 数据绑定与可观察对象

实现数据的观察者模式

```javascript
const userList = [];
function emit(newValue) {
  console.log(newValue);
}
const proxy = new Proxy(userList, {
  set(target, property, value, receiver) {
    const result = Reflect.set(...arguments);
    if (result) {
      emit(Reflect.get(target, property, receiver)); // 发射
    }
    return result;
  }
});

proxy.push('John');
// John
proxy.push('Jacob');
// Jacob

```



## 第10 DOM

DOM(文档对象类型) 是针对HTML和XMl文档的一个API(应用程序编程接口)。

HTML例子

```javascript
<html>
  <head>
  	<title>简单例子</title>
	</head>
	<body>
  	<div>Hello World!</div>
	</body>
</html>
```

可以将这个简单的HTML文档表示为一个层次结构。

文档节点是每一个文档的根节点，在这里例子中，文档节点只有一个子节点，即`<html>`元素我们称之为**文档元素**。文档元素是文档的最外层元素。文档中的其他所有元素都包含在文档元素中，每个文档只能有一个文档元素。

```javascript
Document
|
|_ _ Element html
		|	
  	|_ _ Element head
    |		|
    | 	|_ _ Element title
    |    			|
    |      		|_ _ Element 简单例子
    |
    |_ _ Element body
    		|
      	|_ _ Element div
        		|
          	|_ _ Text Hello World!
```

### Node类型

DOM级定义了一个Node接口，该接口由DOm中的所有节点类型实现。

每个节点都有一个nodeType属性，用于声明节点类型。

```javascript
 alert(document.querySelector('#app').nodeType)  // 1
      alert(document.querySelector('#app').nodeValue) // null
      alert(document.querySelector('#app').nodeName)  // DIV

```

如果nodeType为1则代表是一个节点元素，则可以正常获取对应的nodeName节点元素名称。

#### 节点关系

每个节点都有一个childNodes属性，其中保存着一个NodeList对象。NodeList是一个数组，可以通过length获取子节点个数也可以通过下标定位节点。其中包含了item()方法。

```javascript
<div id="app">
    <div>高级程序设计</div>
 </div>
```



```javascript
let firstChild = document.querySelector('#app').childNodes[0];
let secondChild = document.querySelector('#app').childNodes.item(1);
let count = document.querySelector('#app').childNodes.length;  // 获取个数

console.log(document.querySelector('#app').children)  // HTMLCollection [div]
      console.log(document.querySelector('#app').childElementCount)  // 1
      console.log(document.querySelector('#app').firstChild)  // #text
      console.log(document.querySelector('#app').lastChild)  // #text
      console.log(document.querySelector('#app').firstElementChild)  //  <div>高级程序设计</div>
      console.log(document.querySelector('#app').lastElementChild)  //  <div>高级程序设计</div>
```

### 操作节点

```javascript
let returnNode = someNode.appendChild(newNode)  //用于向childNodes列表末尾添加一个节点。
alert(returnNode == newNode); // true
alert(someNode.lastChild == newNode); // true

returnNode = someNode.insertBefore(newNode,null); // 插入后成为最后一个节点

someNode = someNode.insertBefore(newNode,someNode.firstChild);  // 插入后成为第一个节点

someNode = someNode.insertBefore(newNode,someNode.firstChild);  // 插入到最后一个节点前面

returnNode = someNode.replaceChild(newNode,someNode.firstChild);  // 替换第一个子节点 

returnNode = someNode.replaceChild(newNode,someNode.lastChild); // 替换最后一个子节点
```

### Document类型

document对象是window对象的一个属性，因此可以将其作为全局对象来访问。

```javascript
 console.log(document.documentElement)  // 获取整个html
```

#### 文档信息

除了作为HTMLDocument的一个实例外，还有一个其他属性，这些属性提供了网页的一些信息。

```javascript
// 获取网页标题
let title = document.title;

// 设置网页标题
document.title = "新的标题";

// 取得完整的URL
let url = document.URL;

// 取得域名
let domain = document.domain;

// 设置域名
document.domain = "smallzip.com";
```

### Element类型

Element类型算是Web编程中最常用的类型了。Element类型用于表现XML或HTML元素，提供了对元素标签名、子节点以及特性的访问。

要访问元素的标签名，可以使用nodeName属性，也可以使用tagName属性，这两个属性返回的值是一样的，tagName属性主要是字面语义更加清晰。

```html
<div id="app">
  
</div>
```

```javascript
let div = document.getElementById('app');

alert(div.tagName);  // DIV

alert(div.tagName == div.nodeName); // true
```

这里的元素标签名是div，通过tagName属性获取的值是“DIV”而不是“div”，在HTML中，标签名始终是以大写表示的，而在XML(包括XHTML)中，标签名始终会与源码中保持一致。

```javascript
// 不能这样比较，很容易出错
if(element.tagName == "div"){
  // do something
}

// 最好这样，可以适用于任何文档，推荐这样的做法
if(element.tagName.toLowerCase() == "div"){
  // do something
}
```

#### HTML元素

每个HTML元素都具备以下标准特性

| Id    | 元素在文档中的唯一标识                                       |
| ----- | ------------------------------------------------------------ |
| title | 该元素的附加说明                                             |
| lang  | 元素内容的语言类型                                           |
| dir   | 语言的方向，值为“ltr”(left-to-right,从左至右)或"rtl"(right-to-left,从右至左) |
| class | 元素指定的css类名，可以重复定义                              |

例子：

```html
<div id+"app" class="test" title="例子" lang="en" dir="ltr">
  
</div>
```

元素中指定的所有信息，都可以通过下列javascript代码取得：

```javascript
let div = document.getElementById("app");
alert(div.id);       // app
alert(div.title);    // 例子
alert(div.className) // test
alert(div.lang);     // en
alert(div.dir);      // ltr
```

也可以通过javascript对他们赋值

```javascript
div.id = "myApp"
div.className = "simpleTest"
div.title = "提示内容"
div.lang = "fr"
div.dir  = "rtl"
```

**注意** 以上内容在IE8之前的版本都不用，只在IE8之后的版本生效。

#### 附加特性

每个元素都有一个或者多个特性。

才做特性有如下三个方法

1. getAttribute()
2. setAttribute()
3. removeAttribute()

```javascript
let div = document.getElementById("app");
alert(div.getAttribute("id");       // app
alert(div.getAttribute("title"));    // 例子
alert(div.getAttribute("class")); // test
alert(div.getAttribute("lang"));     // en
alert(div.getAttribute("dir"));      // ltr

```

```javascript
// 设置特性
div.setAttribute("id","myApp");
```

在过在IE9之前版本中如果使用property不当会造成内存泄露问题，而且关于Attribute和Property的区别也让人十分头痛，在HTML5中添加了data-的方式来自定义属性，所谓data-实际上上就是data-前缀加上自定义的属性名，使用这样的结构可以进行数据存放。使用data-*可以解决自定义属性混乱无管理的现状。

```html
<div id="app" data-name="myName">
  
</div>
```

```javascript
let div = document.getElementById('app');

alert(div.dataset.name); // myName

div.dataset.name = 'smallzip';

alert(div.dataset.name); // smallzip
```

#### 创建元素

```javascript
let div = document.createElement("div");
div.id = "app";
div.className = "test";
```

在新元素上设置了这些特性只是给它们赋值了相应的信息，由于新元素并未添加到文档树中，因此，设置这些特性不会影响浏览器的显示。要把新元素添加到文档树中，可以使用appendChild()和insertBefore或者replaceChild()方法。

```javascript
document.body.appendChild(div);
```

添加只有，DOM树会进行更新，并且浏览器会立即呈现该元素。

以上方式可以兼容到IE7，如果不要兼容IE9以下的推荐使用如下方法，更加直观

```javascript
document.querySelector("#app").innerHTML = `
        <div id="childId" class="childClass">子节点</div>
      `
```

#### 元素的子节点

* nodeType的值为1

元素的childNodes属性中包含了它的所有子节点，这些节点有可能是元素、文本节点、注释或处理指令。

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

如果是IE解析代码，`<ul>`元素会有3个子节点。分别是3个`<li>`元素。

如果是其他浏览器解析`<ul>` 元素会有7个元素，分别是3个`<li>`元素和4个文本节点(就是li元素里面的1，2，3)。

```javascript
for(let i=0;i<element.childNodes.length;i++){
  if(element.childNodes[i].nodeType == 1){
    // do something
  }
}
```

循环节点的是记得要通过nodeType来判断是否1，为1则为元素节点。

### Text类型

* nodeType的值为 3

* nodeName的值为 "#text"

* nodeValue的值为节点所包含的文本

* parentNode是一个Element

* appendData(text) 将text添加到节点末尾

* deleteData(offset,text) 在offset指定的位置插入text

* replaceData(offset，count，text)用text替换从offset指定的位置开始到offset+count为止处的文本

  ```html
  <!-- 没有内容，也就没有文本节点 -->
  <div></div>
  
  <!-- 有空格，因此有一个文本节点 -->
  <div> </div>
  
  <!-- 由内容，因此有一个文本节点 -->
  <div>smallzip</div>
  ```

  #### 创建文本节点

  ```javascript
  let textNode = document.createTextNode("<strong>hello world！</strong>")；
  
  div.innerHTML = textNode;
  ```

  

### 小结

* 最基本的节点类型是Node，由于抽象的表示文档中一个独立的部分。所有其他类型都继承于Node
* Document类型表示整个文档，是一组分层节点的根节点。在javascript中，document对象是Document的一个实例。使用document对象有很多种方式可以查询和取得节点。
* Element节点表示文档中的所有HTML或XML元素，可以用来操作这些元素的内容和特性。

理解DOM的关键，就是理解DOM对性能的影响，DOM操作往往是javascript中开销最大的部分，访问NodeList导致的问题为最多，NodeList对象都是“动态的”，这就是意味着每次访问NodeList对象，都会运行一次查询，鉴于此，最好的办法就是尽量减少DOM操作。

### MutationObserver接口

使 用 MutationObserver 可以观察整个文档、DOM 树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。

#### 使用方法

MutationObserver 的实例要通过调用 MutationObserver 构造函数并传入一个回调函数来创建: 

```javascript
// 实例
let observer = new MutationObserver(() => console.log('DOM was mutated!'));

// 监听属性变化
observer.observe(document.body, { attributes: true });

// 操作修改
document.body.className = 'foo';
console.log('Changed body class');

// Changed body class
// <body> attributes changed
```

> 注意，回调中的 console.log()是后执行的。这表明回调并非与实际的 DOM 变化同步执行。



### 选择符API

Selectors API由W3C发起制定的一个标准，致力于让浏览器原生支持CSS查询。

核心方法有两个：

1. querySelector()
2. querySelectorAll()。

#### querySelector()方法

querySelector()方法接受一个css选择符，返回与该模式匹配的第一个元素。没有没有找到匹配的则返回null.

```javascript
let body = document.querySelector("body")

let div = document.querySelector("#app")

let selected = document.querySelector(".selected")

// 获取类名为myImg的一个图像元素
let img = document.body.querySelector("img.myImg")
```

#### querySelectorAll()方法

querySelectorAll()方法接收的参数与querySelector()方法一样，它返回的是一个NodeList的实例。

```javascript
// 获取所有div元素
let div = document.querySelectorAll("div")

// 获取所有类名为selected的元素
let selected = document.querySelectorAll(".selected")

// 遍历选中的元素
for(let i=o;i<div.length;i++){
  // do something
}
```

#### classList属性

HTML5新增了一种操作类名的方式，可以让操作更加简单也更加安全。

classList有如下方法

* add(value) 将给定的字符串值添加到列表中，如果已经存在就不添加。
* contains(value) 表示列表中是否存在给定的值，存在返回true，反之false
* remove(value) 从列表中删除给定的字符串
* toggle(value) 如果列表中存在指定值就删除它，不存在就添加。

```javascript
// 删除disabled类
div.classList.remove("disabled");

// 添加current类
div.classList.add("current");

// 切换user类
div.classList.toggle("user");

// 确定元素中是否存在指定的类名
if(div.classList.contains("bd") && !div.classList.contains("disabled")){
  // do something
}

```

### 偏移量

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| offsetHeight | 元素在垂直方向上占用的空间大小，以像素计。包括元素的高度，水平滚动条的宽度、上边框高度和下边框高度 |
| offsetWidth  | 元素在水平方向占用的空间大小，以像素计。包括元素的宽度，垂直滚动条的宽度、左边宽度和右边框宽度。 |
| offsetLeft   | 元素的左外边框至包含元素的上内框之间的像素距离。             |
| offsetTop    | 元素上外边框至包含元素的上内边框之间的像素距离。             |

### 客户区大小

| 属性         | 说明                               |
| ------------ | ---------------------------------- |
| clientWidth  | 元素内容区宽度加上左右边距宽度。   |
| clientHeight | 元素内容区高度加上上下内边距高度。 |

#### 与偏移量相似，客户区大小也是只读的，也就是说，每次访问都要重新计算。

| 属性         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| scrollHeight | 在没有滚动条的情况下，元素内容的总高度                       |
| scrollWidth  | 在没有滚动条的情况下，元素内容的总宽度                       |
| scrollLeft   | 被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。 |
| scrollTop    | 被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。 |

```javascript
// 文档总高度
let docHeight = document.documentElement.scrollHeight
```

注意，对于运行在混杂模式下的IE，则需要用document.body来代替document.documentElement。

## 第11章 Promise和异步函数

异步行为是 JavaScript 的基础，但以前的实现不理想。在早期的 JavaScript 中，只支持定义回调函数 来表明异步操作完成。串联多个异步操作是一个常见的问题，通常需要深度嵌套的回调函数(俗称“回 调地狱”)来解决。

### Promise基础

promise有三种状态：

* 待定（pending）
* 兑现（fulfilled或resolve）
* 拒绝（rejected）



### 异步函数策略

实现sleep：

```javascript
async function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function foo() {
  const t0 = Date.now();
  await sleep(1500); // 暂停约 1500 毫秒 console.log(Date.now() - t0);
}

foo();
// 1502
```



## 第13章 事件

javascript与HTML之间的交互式通过事件来实现的。事件，就是文档或者浏览器窗口发生的一些特定的交互瞬间。

### 事件流

事件流描述的是从页面中接收事件的顺序。可以想象在一张纸上画一组同心圆，如果把手指放在原心上，那么你的手指指向的不是一个圆，而是纸上的所有圆。

下面图可以形象的描述事件捕获和事件冒泡：

![image-20210206205639802](https://pic1.zhimg.com/80/v2-0ea5b0f39571e58988607bd6b8088ff4_720w.png)

#### 事件冒泡

IE的事件流叫做事件冒泡，即时间开始时由具体的元素接收，然后逐级向上传播到较为不具体的节点。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    点击我
  </div>
</body>
</html>
```

如果单击了页面中的`<div>`元素，那么这个click事件会按照如下传播顺序：

1. div
2. body
3. html
4. document

也就是说，click事件首先在div元素上发生，而这个元素就是我们单击的元素。然后，click事件沿着DOM树向上传播，在每一级节点上都会发生，直至传播到document对象。

所有浏览器都支持事件冒泡，但是在具体的实现上会有一些差异。

#### 事件捕获

事件捕获的思想是从顶向下捕获。以单击div元素为例，顺序如下：

1. document
2. html
3. body
4. div

在整个事件捕获过程中，document对象首先接收到click事件，然后事件沿着DOM树依次向下，一直传播到事件的实际目标，即div元素。

#### DOM2级事件处理程序

DOM2级事件，定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListentener()。所有DOM节点中都包含这两个方法，并且他们都接受3个参数

1. 要处理的事件名称
2. 作为时间处理程序的函数
3. 一个布尔值，这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序。如果是false，表示在冒泡阶段调用时间处理程序。

```javascript
let btn = document.getElementById("app")
btn.addEventListener("click",function(){
  alert(this.id)
},false)
```

上面代码添加了一个onclick事件处理程序，并且该事件会在冒泡阶段被触发，因为最后一个参数为false。

使用DOM2级方法主要好处是可以添加多个事件处理程序。来看看下面例子:

```javascript
let btn = document.getElementById("app")
btn.addEventListener("click",function(){
  alert(this.id)
},false)

btn.addEventListener("click",function(){
  alert("smallzip")
},false)
```

这里为按钮添加了两个事件处理程序，这个两个事件处理程序会按照添加他们的顺序触发，因此首先会显示元素的ID，其次会显示smallzip消息。

通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除。移除时传入的参数和添加处理程序时使用的参数相同。这也意味着通过addEventListener()添加的匿名函数将无法移除，看下面例子 ：

```javascript
let btn = document.getElementById("app")
btn.addEventListener("click",function(){
  alert(this.id)
},false)

btn.removeEventListener("click",function(){  // 这里没有用
  alert(this.id)
},false)
```

上面例子的removeEventListener()看似使用了相同的参数，实际上，第二个参数与传入addEventListener()中的那个是完全不同的函数。

```javascript
let btn = document.getElementById("app")
let handler = function(){
  alert(this.id)
}
btn.addEventListener("click",handler,false)

btn.removeEventListener("click",handler,false)  // 有效
```

事件中的方法使用的外部定义的handler()方法，传入的也是相同的方法。

#### 跨浏览器的事件处理程序

为了以跨浏览器的方式处理事件，就需要对不同浏览器进行兼容。要保证处理事件的代码能够在大多数浏览器下一致的运行，只需要关注冒泡阶段。

第一个要创建的方式是addHandle()，它的职责是视情况分别使用DOM0级方法、DOM2级方法或IE方法来添加事件。这个方式属于一个名叫EventUtil的对象。可以使用这个对象来处理浏览器间的差异。addHandle()方法接受3个参数：

1. 要操作的元素
2. 事件名称
3. 事件处理程序函数

与addHandle()方法对应的是removeHandler()，它也接受相同的参数，这个方法的职责是移除之前添加的事件处理程序。无论该事件处理程序是采取什么方式添加到元素中的。如果其他方法无效，默认采用DOM0级方法。

EventUtil的使用方法如下:

```javascript
let EventUtil = {
  addHandle:function(element,type,handler){
    if(element.addEventListener){
      element.addEventListener(type,handler,false);
    } else if(element.attachEvent){
      element.attachEvent("on"+type,handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandle:function(element,type,handler){
    if(element.removeEventListener){
      element.removeEventListener(type,handler,false);
    } else if(element.detachEvent){
      element.detachEvent("on"+type,handler);
    } else {
      element["on" + type] = null;
    }
  }
}
```

这两个方法首先都会检测传入的元素中是否存在DOM2级方法。如果存在DOM2级方法，则使用该方法。如果存在是IE的方法，则使用第二种方法。最后一种就是使用DOM0级方法。

可以像下面这样使用EventUtil对象：

```javascript
let btn = document.getElementById("app")
let handler = function(){
  alert("点击啦！")
}
EventUtil.addHandler(btn,"click",handler)

EvnetUtil.removeHandler(btn,"click",handler)
```

addHandler()和removeHandler()没有考虑到所有的浏览器问题，例如在IE中的作用域问题。不过正常使用它们添加和移除时间处理程序还是足够的了。

#### 事件对象

在触发DOM上的某个事件时，会产生一个事件对象Event，这个对象包含了所有与事件有关的信息。

```javascript
let btn = document.getElementById("app")
let handler = function(event){
  switch(event.type){
    case "click":
      alert("点击了");
      break;
    case "mouseover":
      alert("鼠标移动到这个位置");
      break;
    case "mouseout":
      alert("鼠标离开了");
      break;
  }
}

btn.onclick = handler;
btn.onmouseover = handler;
btn.onmouseout = handler;
```

这个例子定义了一个handler函数，用于处理3种事件。当单击按钮时，会出现一个警告框，显示“点击了”。当按钮移动到按钮上面时，会弹出警告框，显示“鼠标移动到这个位置”，当鼠标离开时候，会弹出警告框，显示“鼠标离开了”。event.typ属性，让函数能够确定发生了什么事件，并执行相应的操作。

要阻止特点事件的默认行为，可以使用preventDefault()方法。例如a标签的链接默认行为就是在被单击的时候回导航到其他href指定的URL地址。如果想阻止链接的导航默认行为，就可以通过链接的onclick事件处理程序取消它，如下

```javascript
let link = document.getElementById("myLink")
link.onclick = function(event){
  event.preventDefault();
}
```

只有cancelable属性设置为true的事件，才可以使用preventDefault()来取消其默认行为。

另外，stopPropagation()方法用于立即停止事件在DOM层的传播，即取消进一步的事件捕获或者冒泡。看下面例子：

```javascript
let btn = document.getElementById("app")
btn.onclick = function(event){
  alert("点击了");
  event.stopPropagation(); // 停止事件再传播
}

document.body.onclick = function(event){
  alert("body元素"); // 这里不会被执行
}
```

上面的例子，body里面的标签执行了onclick事件，并且事件执行过程中调用了stopPropagation()，onclick就不会再网上传播，body标签页就不会被执行到。

#### 事件类型

1. **load事件**：javascript中最常用的一个事件。当页面完全加载后(包括所有图像，javascript文件，css文件等外部资源)，就会触发window上的load事件。有两种定义load的方法，一个种是通过EventUtil，一种是在body标签上添加onload属性。img标签同样也可以使用load事件，在图像加载完毕之后会触发load事件。
2. **unload事件**与load相反，这个事件在文档被完全卸载后触发。当用户从一个页面，切换到另外一个页面，就会发生unload事件。
3. **resize事件** 当浏览器窗口被调整到新的尺寸时候就会触发resize事件。
4. **scoll事件**滚动事件，可以通过body元素的scrollLeft和scrollTop来监控这一变化。

### 内存和性能

由于前端发展越来越庞大，业务上会有很多事件处理。这样做对于javascript来说时间处理程序的数量直接关系到页面的整体性能。地址这一问题原因很多反面。首先，每一个函数都是对象，队友占用内存，内存汇总对象越多，性能就越差。其次，必须事件先指定所有事件处理程序而导致的DOM访问次数，会延迟整个页面交互就绪时间。事实上，从如何利用好事件处理程序的角度出发，还是一些方法能够提升性能的。

#### 事件委托

对"事件处理程序过多"问题的解决方案就是事件委托。事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理一类型的所有事件。例如，click事件会一直冒泡到document层级。比如一个ul，li视图快，点击li的时候，通过去ul的id，然后通过元素位置去定位到对应的li，而不是给每一个li绑定一个onclick事件。

## 第20章 JSON

关于JSON，最重要是要理解它是一种数据格式，不是一种编程语言，虽然具有相同的语法形式，但是JSON并不从属于javascript。而且，并不是只有javascript才使用JSON，毕竟JSON只是一种数据格式。很多编程语言都有针对JSON的解析器和序列化器。

### 语法

JSON的语法可以表示以下三种类型的值：

1. **简单值**：使用与javascript相同的语法，可以在JSON中表示字符串、数值、布尔值和null，但是JSON不支持javascript中的特殊值undefined
2. **对象**：对象作为一种复杂的数据类型，表示的是一组有序的键值对。而每个键值对中的值可以是简单值，也可以是复杂数据类型的值。
3. **数组**：数组也是一种复杂的数据类型，表示一组有序的值的列表，可以通过数组索引来访问其中的值。数组的值也可以是任意类型-----简答值、对象或数组。

JSON不支持变量、函数或对象实例，它就是一种表示结构化数据的格式。虽然与javascript中表示数据的某些语法相同，但它并不局限于javascript的范畴。

### 对象

javascript和JSON的最大区别在于，JSON键值对必须要使用双引号，单引号会导致语法错误。

```json
// JSON
{
	"name":"smallzip",  // 字符串类型
	"age":22,           // 数值
	"married":false,    // 布尔值
	"child":null				// null类型
}
```

```javascript
// javascript对象字面量
let people = {
  name:"smallzip",
  age:22,
  married:false,
  child:null
}
```

### 数组

JSON中的第二种复杂数据类型就是数组，JSON数组采用的就是javascript中的数组字面量形式。如下：

```javascript
// javascript
let items = [22,"smallzip",true];
```

```json
// json
[22,"smallzip",true]
```

 JSON复杂数据类型

```json
[
  {
    "name":"smallzip",
    "authors":[
      "nike C.Saker"
    ],
    "edition":3,
    "year":2020
  },
  {
    "name":"smallzip",
    "authors":[
      "nike C.Saker"
    ],
    "edition":3,
    "year":2020
  },
]
```

### json序列化

JSON对象有两个方法：

1. stringify()
2. parse()

这两个方法分别用于把javascript对象序列化为JSON字符串和把JSON字符串解析为原来javascript的值。

### 序列化选项

实际上，JSON.stringify()除了要序列化的javascript对象外，还可以接收另外两个参数，这两个参数用于指定不同的方式序列化javascript对象。第一个参数是一个过滤器，可以是一个数组，也可以是一个函数。第二个参数是一个选项，表示是否在JSON字符串中保留缩进。单独或组合使用这两个参数可以更全面深入的控制JSON的序列化。

```javascript
let data = {
  "name":"smallzip",
  "authors":[
    "nike C.Saker"
  ],
  "edition":3,
  "year":2020
}

console.log(JSON.stringify(data,["name","year"]));  // {"name":"smallzip","year":2020}
```

JSON.stringify()第二个参数是一个数组，其中包含了两个字符串"name"和"year"。这两个属性与将要序列化的对象中的属性是对应的。因此返回的结果字符串中，就只包含这两个属性。

```javascript
    let data = {
      "name": "smallzip",
      "authors": [
        "nike C.Saker"
      ],
      "edition": 3,
      "year": 2020
    }

    let str = JSON.stringify(data, (key, value) => {
      switch (key) {
        case "name":
          return "xiaopiao"
        case "edition":
          return undefined
        case "year":
          return 2021
        default:
          return value
      }
    })
    
    console.log(str)  // {"name":"xiaopiao","authors":["nike C.Saker"],"year":2021}

```

如果第二个参数是函数，可以通过键值对来设置对应的值。如果要删除对应的值，则只需要返回undefined即可。

## 第21章 Ajax与Comet

使用xhr对象时，要调用的第一个方法是open()，它接受三个参数

1. 要发送的请求的类型，get、post、option，delete等等
2. 请求的URL
3. 是否发送异步请求

```javascript
const xhr = new XMLHttpRequest();
xhr.open("get","example.txt",false);
xhr.send(null);
```

这里的send()方法接收一个参数，即要作为请求主体发送的数据。如果不需要发送数据，则必须要传入null，因为这个参数对于浏览器来说是必需的。调用send()之后，请求就会被分派到服务器。

由于这次请求是同步的，javascript代码会等到服务器响应之后再做继续执行。

在收到响应后，响应的数据会自动填充XHR对象的属性，相关属性如下:

* responseText：作为响应主题被返回的文本
* responseXML：如果响应内容类型是”text/xml“或”application/xml“，这个属性中将保存包含着响应数据的XML DOM文档
* status：响应的HTTP状态
* statusText：HTTP状态说明

```javascript
const xhr = new XMLHttpRequest();
xhr.open("get","example.txt",false);
xhr.send(null);

if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
  alert(xhr.responseText);
} else {
  alert("响应未成功:" + xhr.status);
}
```

在接收到响应后，第一步是检查status属性，以确定响应已经成功返回。一般来说，可以将HTTP状态代码为200作为成功的标志。此时，responseText属性的内容就已经就绪，而且在内容类型正确的情况下，responseXML也应该能够访问了。此外，状态代码为304表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本。这个其实也意味着响应是有效的。

上面是使用的同步请求，多数情况下，我们还是要发送异步请求，才能让javascript继续执行而不必等待响应。此时，可以检查XHR对象的readyState属性，该属性表示请求/响应 过程的当前活动阶段。属性如下：

* 0：未初始化。尚未调用open()方法
* 1：启动。已经调用open()方法，但尚未调用send()方法
* 2：发送。已经调用send()方法，尚未接受响应
* 3：接受。已经接收到部分响应数据
* 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用

只要readyState属性的值改变，都会触发一次readystatechange事件。可以利用这个事件来检测每次状态变化后readyState的值。

```javascript
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      alert(xhr.responseText);
    } else {
      alert("Request was unsuccessful: " + xhr.status);
    }
  }
}

xhr.open("get", "example.txt", true);
xhr.send(null);
```



另外，在接收到响应之前还可以调用abort()方法来取消异步请求。

```javascript
xhr.abort();
```

调用这个方法后，XHR对象会停止触发事件，而且也不再允许访问任何与响应有关的对象属性，在终止请求之后，还应该对XHr对象进行接触引用操作。由于内存原因，不建议重用XHR对象。

### 跨源资源共享

通过XHR实现Ajax通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR对象只能访问与包含它的页面位于同一个域中的资源。这种安全策略跨域预防某些恶意行为。但是，实现合理的跨域请求对开发某些浏览器应用程序也是至关重要的。

CORS(Cross-Origin Resource Sharing，跨源资源共享)是W3C的一个工作草案，定义了在必须要访问跨源资源时，浏览器与服务器应该如何沟通。CORS背后的基本思想，就是使用自定义的HTTP头部让浏览器与服务器进行沟通，从而决定请求或相应是应该成功，还是应该失败。

比如一个简单的使用get或者post发送的请求，它没有自定义的头部，而主体内容是text/plain。在发送该请求时，需要给它附加一个额外的Origin头部，其中包含请求页面的源信息(协议、域名和端口)，以便服务器根据这个头部信息来决定是否给予响应。

```javascript
Origin:http://www.smallzip.com
```

如果服务器认为这个请求可以接收，就在Access-Control-Allow-Origin头部中回发相同的源信息(如果是公共资源，可以回发"*")。例如：

```javascript
Access-Control-Allow-Origin: http://www.smallzip.com
```

如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。正常情况下，浏览器会处理请求。注意，请求和响应都不包含cookit信息。

### Proflighted Requests

CORS通过一种叫做Preflighted Request的透明服务器验证机制支持开发人员使用自定义的头部、GET或者POST之外的方法，以及不同类型的主题内容。在使用下列高级选项来发送请求时，就会向服务器发送一个Preflight请求。这种请求使用option方法。

Preflight请求结束后，结果将按照响应中指定的时间缓存起来，而为此付出的代价只是第一次发送这种时会多一次HTTP请求。

### 带凭据的请求

默认情况下，跨源请求不提供凭据(cookit、HTTP认证及客户端SSL证明等)。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据。跨源指定某个请求应该发送凭据。如果服务器接带受凭据的请求，会用下面的HTTP头部来响应。

```javascript
Access-Control-Allow-Credentials：true
```

如果发送的是带凭据的请求，但服务器的响应中没有包含这个头部，那么浏览器就不会把响应交给javascript(于是，responseText中将是空字符串，status的值为0，而且会调用onerror()事件处理程序)。另外，服务器还可以在Preflight响应中发送这个HTTP头部，表示与必须源发送带凭据的请求。

### JSONP

JSONP是JSON with padding(填充式JSON或参数式JSON)的简写，是应用JSON的一种新方法，在后来的web服务中非常流行。JSONP看起来与JSON差不多，只不过是被包含在函数调用中的JSON，就像下面这样。

```javascript
callback({"name":"Nicholas"});
```

JSONP由两部分组成：回调函数和数据。回调函数是当响应到来应该在页面中调用的函数。回调函数的名字一般是在请求中指定的。而数据就是传入回调函数中的的JSON数据。下面就是典型的JSONP请求：

```javascript
http://freegeoip.net/json/?callback=hadnleReponse
```

这个URL是在请求一个JSONP地理定位服务。通过查询字符串字符串来指定JSONP服务器的回调参数是很常见的，就像上面的URL。这里所指的回调函数名字叫handleResponse()。

JSONP是通过动态scrupt元素来使用的，使用时可以为src属性指定一个跨域URL，script和img元素一样，有能力不受限制的从其他域名下加载资源。因为JSONP是有效的javascript代码，所以在请求完成后，就会立即执行，看下面例子：

```javascript
function handleResponse(response){
  alert(`ip address:${response.ip},city:${response.city},${response.region_name}`);
}

let script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script,document.body.firstChild);
```

上面通过查询地理定位服务来显示你的ip地址和定位信息。

JSONP非常简单易用，优点是支持浏览器与服务器之间的双向通信。不过也有缺点。首先jsonp是从其他域中加载代码执行。如果其他域不安全，很可能在响应中夹带一些恶意代码。

### Fetch API

Fetch API 能够执行 XMLHttpRequest 对象的所有任务。XMLHttpRequest 可以选择异步，而 Fetch API 则必须是异步。

#### 分派请求

fetch()只有一个必需的参数，那就是请求的url路径。

```javascript
let r = fetch('/bar');
console.log(r); // Promise <pending>
```

#### 读取响应

读取响应内容的最简单方式是取得纯文本格式的内容，这要用到 text()方法。这个方法返回一个 期约，会解决为取得资源的完整内容:

```javascript
fetch('bar.txt')
 .then((response) => response.text())
 .then((data) => console.log(data));

// bar.txt 的内容
```

#### 错误处理

```javascript
fetch('/bar')
  .then((response) => {
  console.log(response.status);     // 200
  console.log(response.statusText); // OK
});
```

**1. 发送JSON**

```javascript
let payload = JSON.stringify({
  foo: 'bar'
});

let jsonHeaders = new Headers({
  'Content-Type': 'application/json'
});

fetch('/send-me-json', {
  method: 'POST', // 发送请求体时必须使用一种 HTTP 方法 body: payload,
  headers: jsonHeaders
});
```

**2. 在请求体中发送参数**

```javascript
let payload = 'foo=bar&baz=qux';

let paramHeaders = new Headers({
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
});

fetch('/send-me-params', {
  method:'POST', //发送请求体时必须使用一种HTTP方法 body: payload,
  headers: paramHeaders
});
```

**3. 发送文件**

```javascript
let imageFormData = new FormData();
let imageInput = document.querySelector("input[type='file']");

imageFormData.append('image', imageInput.files[0]);

fetch('/img-upload', {
  method: 'POST',
  body: imageFormData
});

// 发送多个文件
let imageFormData = new FormData();
let imageInput = document.querySelector("input[type='file'][multiple]");

for (let i = 0; i < imageInput.files.length; ++i) {
  imageFormData.append('image', imageInput.files[i]);
}
fetch('/img-upload', {
  method: 'POST',
  body: imageFormData
});
```

**4加载Blob文件**

Fetch API 也能提供 Blob 类型的响应，而 Blob 又可以兼容多种浏览器 API。一种常见的做法是明确将 图片文件加载到内存，然后将其添加到 HTML 图片元素。为此，可以使用响应对象上暴露的 blob()方法。 这个方法返回一个期约，解决为一个 Blob 的实例。然后，可以将这个实例传给 URL.createObjectUrl() 以生成可以添加给图片元素 src 属性的值:

```javascript
const imageElement = document.querySelector('img');

fetch('my-image.png')
 .then((response) => response.blob())
 .then((blob) => {
  imageElement.src = URL.createObjectURL(blob);
});
```

**5发送跨域请求**

从不同的源请求资源，响应要包含 CORS 头部才能保证浏览器收到响应。没有这些头部，跨源请求 会失败并抛出错误。

```javascript
fetch('//cross-origin.com');
// TypeError: Failed to fetch
// No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**6. 中断请求**

Fetch API 支持通过 AbortController/AbortSignal 对中断请求。调用 AbortController. abort()会中断所有网络传输，特别适合希望停止传输大型负载的情况。中断进行中的 fetch()请求会 导致包含错误的拒绝。

```javascript
let abortController = new AbortController();

fetch('wikipedia.zip', { signal: abortController.signal }) .catch(() => console.log('aborted!');
                                                                  
// 10 毫秒后中断请求
setTimeout(() => abortController.abort(), 10);

// 已经中断
```

### Headers对象

Headers 对象是所有外发请求和入站响应头部的容器。每个外发的 Request 实例都包含一个空的 Headers 实例，可以通过 Request.prototype.headers 访问，每个入站 Response 实例也可以通过 Response.prototype.headers 访问包含着响应头部的 Headers 对象。这两个属性都是可修改属性。 另外，使用 new Headers()也可以创建一个新实例。

使用例子：

```javascript
let jsonHeaders = new Headers({  // 实例化一个headers
  'Content-Type': 'application/json'
});

fetch('/send-me-json', {
  method: 'POST', 
  payload,
  headers: jsonHeaders
});
```

Headers对象和Map对象极为相似。Headers 与 Map 类型都有 get()、set()、has()和 delete() 等实例方法。们也都有相同的 keys()、values()和 entries()迭代器接口。

### Request对象

顾名思义，Request 对象是获取资源请求的接口。这个接口暴露了请求的相关信息，也暴露了使用请求体的不同方式。

创建request对象

```javascript
let r = new Request('https://foo.com');
console.log(r);
// Request {...}
```

request第二个参数和fetch的init option一样，提供配置。

### Web Sockets

Web sockets的目标是在一个单独的持久连接上提供全双工、双向通信。在javascript中创建了websocket后会有一个HTTP请求发送到浏览器以发起连接。也就是说，使用标准的HTTP服务器无法实现websocket，只有支持这种协议的专门服务器才能正常工作。

由于websocket使用了自定义协议，所以url模式也略有不同。未加密的是`ws://`，加密连接是`wss://`在使用websocket时，必须要带着这个模式。

```javascript
let socket = new WebSocket("wx://www.example.com/serve.php");

let message = {
  time:Date.now(),
  text:"hello world!",
  clientId:"a123"
}
// 发送消息
socket.send(JSON.stringify(message));

// 当服务器发来消息时，会触发message事件，数据会保存在event.data中
socket.onmessage = function(event){
  let data = event.data
  // do something
}

// 在成功建立连接时触发
socket.onopen = function(){
  alert("连接成功")
}

// 发生错误时触发，连接不能持续，或连接断开
socket.onerror = function(){
  alert("断开了")
}

// 连接关闭时触发
socket.onclose = function(){
  alert("关闭了连接")
}
```

### 小结

* Ajax是无需刷新页面就能从服务器取得数据的方法。负责Ajax运作的核心对象是XMLHttpRequest(XHR)对象。

* Fetch API 是作为对 XHR 对象的一种端到端的替代方案而提出的。这个 API 提供了优秀的基于期约 的结构、更直观的接口，以及对 Stream API 的最好支持。

* Web Socket 是与服务器的全双工、双向通信渠道。与其他方案不同，Web Socket 不使用 HTTP，而 使用了自定义协议，目的是更快地发送小数据块。这需要专用的服务器，但速度优势明显。

## 第22章 高级技巧

javascript是一种极其灵活的语言，具有多种使用风格。一般来说，编写javascript要么使用过程方式，要么使用面向对象方式。然而，由于它天生的动态属性，这种语言还能使用更为复杂和有趣的模式。

### 高级函数

函数是javascript中最有趣的部分之一。它们本质上是十分简单和过程化的，但也可以非常复杂和动态的。一些额外的功能可以通过闭包来实现。此外，由于所有的函数都是对象，所以使用函数指针非常简单。这些令javascript函数不仅有趣而且强大。

### 作用域安全的构造函数

当使用new调用时，构造函数内用到的this对象会指向新创建的对象实例。如下例子：

```javascript
   function p(a, b, c) {
      this.a = a;
      this.b = b;
      this.c = c;
    }

    let pe = new p("smallzip", 22, "ssss")  // p {a: "smallzip", b: 22, c: "ssss"}
```

上面的例子中，p构造函数使用this对象给三个属性赋值，当和new操作符连用时，则会创建一个新的pe对象，同事会给它们分配这些属性。问题出在当没有使用new操作符来调用该构造函数的情况上。由于该this对象是在运行时绑定的，所以直接调用p，this会映射到全局对象window上，导致错误对象属性意外增加。例如：

```javascript
    function p(a, b, c) {
      this.a = a;
      this.b = b;
      this.c = c;
    }

    let pe = p("smallzip", 22, "ssss")
    console.log(pe)          // undefined
    console.log(window.a)    // smallzip
    console.log(window.b)    // 22 
    console.log(window.c)    // ssss
```

上面例子可以看到如果没有使用new操作符，在p内通过this指向的都属于window。如何正常的处理这样的问题，看下面例子：

```javascript

   function p(a, b, c) {
      if (this instanceof p) {
        console.log("属于this")
        this.a = a;
        this.b = b;
        this.c = c;
      } else {
        console.log("不属于this")
        return new p(a, b, c)
      }
    }

    let pe = p("smallzip", 22, "ssss")
    console.log(pe)          // p {a: "smallzip", b: 22, c: "ssss"}
    console.log(pe.a)    // smallzip
    console.log(window.a)    // undefined

    let pe2 = new p("xiaopiao", 22, "bbbbbb")
    console.log(pe2.a) // "xiaopiao"
```

这个段代码中的p构造函数添加一个检查并确保this对象是p实例的if语句。它表示要么使用new操作符，要么在现有的p实例环境中调用构造函数。任何一种情况下，对象初始化都能够正常进行。如果this并非p的实例，那么会再次使用new操作符调用构造函数并返回结果。最后的结果是，调用p构造函数时，不论是否使用new操作符，都会返回一个p的新实例，这个就避免了再全局对象那个上的意外设置属性。

### 函数柯理化

**函数柯里化概念：** 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

```javascript
function add() {
      // 第一次执行的时候，存储参数数组为原型，并且设置为当前作用域
      let params = Array.prototype.slice.call(arguments);
      let args = function () {
        // 闭包的特性中可以存储变量，通过对每次新传入的参数进行累加
        params.push(...arguments)
        return args
      }

      // 重写toString方法，将字符串重写成累加后的值
      args.toString = function () {
        return params.reduce((total, current) => {
          return total + current
        },0)
      }
      return args
    }

    console.log(add(1)(2)(3))                         // 6
    console.log(add(1, 2, 3)(4))                      // 10
    console.log(add(1)(2)(3)(4)(5))                   // 15
    console.log(add(1, 2, 3, 4, 5)(6))                // 21
    console.log(add(1, 2, 3, 4, 5)(6, 7, 8, 9)(10))   // 55

```

javascript中是柯理化函数和绑定函数提供了强大的动态函数创建功能。使用bind()还是curry()要根据是否需要object对象相应来决定。它们都能用于创建复杂的算法和功能，当然两者都不应该滥用，因为每个函数都会带来额外的开销。

### 不可扩展对象

默认情绪控下，所有对象都是可以扩展的。也就是说，任何时候都可以向对象中添加属性和方法。

```javascript
let people = {
  name:"smallzip"
}
people.age = 29
```

如何防止用户再添加属性呢，这个时候就可以使用Object.preventExtensions()方法可以改变这个行为，让不能再给对象天啊及属性和方法。

```javascript

let people = {
  name:"smallzip"
}
Object.preventExtensions(people)
people.age = 29;

alert(people.age); // undefined
```

在调用了Object.preventExtensions()方法后，就不能给people对象添加新的属性和方法了。

在非严格模式下，给对象添加属性会显示undefined，在严格模式下，会直接报错。

### 密封的对象

密封对象不可以扩展，这意味着不能删除属性和方法，因为不能使用Object.definedProperty()把数据属性修改为访问属性。

```javascript
let people = {
  name:"smallzip"
}
Object.seal(people)
delete people.name;

alert(people.name); // smallzip
```

在调用了Object.seal()方法后，就不能对people对象删除属性和方法了。

在非严格模式下，给对象添加属性会显示undefined，在严格模式下，会直接报错。

### 冻结对象

最严格的防篡改级别是冻结对象。冻结的对象及不可扩展，又是密封的。

```javascript
let people = {
  name:"smallzip"
}
Object.freeze(people)

people.age = 29
alert(people.age) // undefined

delete people.name;
alert(people.name); // smallzip

people.name = "xiaopiao"
alert(people.name)  // smallzip
```

在非严格模式下，会被忽略，在严格模式下，会直接报错。

### 高级定时器

使用setTimeout()和setInterval()创建定时器可以用于实现有趣且有用的功能。javascript是运行在单线程的环境中的，而定时器仅仅只是计划代码在未来的某个时间执行。执行时机是不能保证的。

定时器对队列的工作方式是，当特定时间过去后将代码插入到执行队列中。注意，给队列添加执行代码并不意味着它立刻执行，而只能表示它会尽快执行。当队列中没有其他东西，那么这个段代码就会执行。假设设定了一个定时器为300ms，定时器会在宏任务等待300ms，当300ms到了会被插入到队列中，如果队列此时有其他代码在执行，则定时器就会处于等待状态，直到前面的代码执行完毕才轮到自己。而如果前面就代码，就会立即执行。队列中所有的代码都需要等到javascript进程空闲之后才能执行。

### 函数节流

前端开发过程中，有一些事件或者函数，会被频繁地触发（短时间按内多次触发），最常见的例如，**onresize**，**scroll**，**mousemove** ,**mousehover** 等，这些事件的触发频率很高，不做限制的话，有可能一秒之内执行几十次、几百次，如果在这些函数内部执行了其他函数，尤其是执行了操作 DOM 的函数（浏览器操作 DOM 是很耗费性能的），那不仅会造成计算机资源的浪费，还会降低程序运行速度，甚至造成浏览器卡死、崩溃。这种问题显然是致命的。

除此之外，重复的 ajax 调用不仅可能会造成请求数据的混乱，还会造成网络拥塞，占用服务器带宽，增加服务器压力，显然这个问题也是需要解决的。

节流做的事情，就是在固定时间内只执行一次。

#### 方法1

```javascript
let onpressTime = 0;
function throttle(callback, delay = 500) {
  if ((Date.now() - onpressTime) > delay) {
    onpressTime = Date.now();
    return callback && callback();
  }
}

// 使用
throttle(function(){
  // 执行一些业务代码，每间隔一秒钟执行一次
},1000)
```

#### 方法2

```javascript
let throttle = {
  lastPressTime: 1,
  onPress:function(callback,delay = 500) {
      let curTime = Data.now();
      if ((curTime - this.lastPressTime) > delay) {
          this.lastPressTime = curTime;
          callback&&callback();
        }
    },
}

// 使用方法
throttle.onPress(function(){
  // 执行一些业务代码，每间隔一秒钟执行一次
},1000)
```



### 函数防抖

防抖处理是经常会用到的功能，比如处理滚动事件做一些复杂计算，这样就会频繁调用回调函数很容易会造成页面的卡顿，这种情况下，我们更希望把多次计算合并成一次，只操作一个精确点，我们普遍把这种方式称为debounce（防抖）和throttle（节流）。

当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定时间到来之前，又触发了事件，就重新开始延时。也就是说当一个用户一直触发这个函数，且每次触发函数的间隔小于设定时间，那么防抖的情况下只会执行一次。

```javascript
let timeout = null
const debounce = (cb, wait = 500) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(() => {
    timeout = null
    cb && cb()
  }, wait);
}

function requestData(){
  // 请求数据
}

// 使用防抖
 debounce(() => requstData(), 500)
```

## 第23章 离线应用于客户端存储

### cookie

```javascript
HTTP/1.1 200 OK
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
```

cookie 是与特定域绑定的。设置 cookie 后，它会与请求一起发送到创建它的域。这个限制能保证 cookie 中存储的信息只对被认可的接收者开放，不被其他域访问。

#### cookie的构成

* 名称：唯一标识 cookie 的名称。

  > cookie 名不区分大小写，因此 myCookie 和 MyCookie 是同一个名称。不过，实践中最好将 cookie 名当成区分大小写来对待，因为一些服务器软件可能这样
  > 对待它们。cookie 名必须经过 URL 编码。

* 值：存储在 cookie 里的字符串值

  > 这个值必须经过 URL 编码。

* 域：cookie有效的域。

  > 发送到这个域的所有请求都会包含对应的 cookie。这个值可能包含子域(如www.wrox.com)，也可以不包含(如.wrox.com 表示对wrox.com 的所有子域都有效)。如果不明确设置，则默认为设置 cookie 的域。

* 路径：请求URL中包含这个路径才会把cookie发送到服务器。

  > 例如，可以指定 cookie 只能由
  >
  > http://www.wrox.com/books/访问，
  >
  > 因此访问 http://www.wrox.com/下的页面就不会发送 cookie，即
  >
  > 使请求的是同一个域。

* 过期时间：表示何时删除 cookie 的时间戳(即什么时间之后就不发送到服务器了)。

  > 默认情况下，
  >
  > 浏览器会话结束后会删除所有 cookie。不过，也可以设置删除 cookie 的时间。这个值是 GMT 格 式(Wdy, DD-Mon-YYYY HH:MM:SS GMT)，用于指定删除 cookie 的具体时间。这样即使关闭 浏览器 cookie 也会保留在用户机器上。把过期时间设置为过去的时间会立即删除 cookie。

* 安全标志：设置之后，只在使用 SSL 安全连接的情况下才会把 cookie 发送到服务器。

  > 全标志 secure 是 cookie 中唯一的非名/值对，只需一个 secure 就可以了。比如:
  >
  > ```javascript
  > HTTP/1.1 200 OK 17 Content-type: text/html
  > Set-Cookie: name=value; domain=.wrox.com; path=/; secure
  > Other-header: other-header-value
  > ```
  >
  > 这里创建的cookie对所有的wrox.com的子域名以及该域中所有页面有效（通过path=/）指定。
  >
  > 不过这个cookie只能在SSL链接上发送，因为设置了secure标志。

### 数据库

随着浏览器的功能不断增强，越来越多的网站开始考虑，将大量数据储存在客户端，这样可以减少从服务器获取数据，直接从本地获取数据。

现有的浏览器数据储存方案，都不适合储存大量数据：Cookie 的大小不超过4KB，且每次请求都会发送回服务器；LocalStorage 在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。所以，需要一种新的解决方案，这就是 IndexedDB 诞生的背景。

IndexedDB最大的特色是使用对象存储数据。而不是使用表来存储数据。

IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。

本书的案例有些不好理解，可以参考薛一峰的博客日志

[IndexedDB案例介绍](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)

## 第23章 最佳实践

### 可维护性

可维护性代码一般有一下特征：

* **可理解性**----其他人可以接受代码并理解它的意图和一般途径，而无需原开发人员的完整解释。
* **直观性**---- 代码中的东西一看就能明白，不管其操作过程多么复杂。
* **可适应性** ------ 代码以一种数据上的变化不要求完全重写的方法撰写。
* **可扩展性**----- 在代码构架上已考虑到在未来允许对可行功能进行扩展。
* **可调试性**---- 当有地方出错时，代码可以给予你足够的信息来尽可能直接的确定问题所在。

### 继承

```javascript
class Employee extends Person {
  constructor(name,age){
    super(name,age)
  }
}
```

上面代码继承了Person类，在简单的语法背后已经实现了原型连缀，而且通过使用super()函数，也正式支持了借用构造函数。从逻辑上看，上面代码和下面代码等价：

```javascript
function Employee(name,age){
  Person.call(this,name,age);
}

Employee.prototype = new Person();
```

### 性能

JavaScript 一开始就是一门解释型语言，因此执行速度比编译 型语言要慢一些。Chrome 是第一个引入优化引擎将 JavaScript 编译为原生代码的浏览器。随后，其他主流浏览器也紧随其后，实现了 JavaScript 编译。

即使到了编译 JavaScript 时代，仍可能写出运行慢的代码。不过，如果遵循一些基本模式，就能保 证写出执行速度很快的代码。

#### 作用域意识

1. 避免全局查找

   例子：

   ```javascript
   function updateUI() {
     let imgs = document.getElementsByTagName("img");
     for (let i = 0, len = imgs.length; i < len; i++) {
       imgs[i].title = '${document.title} image ${i}';
     }
     let msg = document.getElementById("msg");
     msg.innerHTML = "Update complete.";
   }
   ```

   for 循环中就需要引用 document 几十甚至上百次，每次都要遍历一次作用域链。通过在 28 局部作用域中保存 **document** 对象的引用，能够明显提升这个函数的性能，因为只需要作用域链查找。

   优化：

   ```javascript
   function updateUI() {
     let doc = document; // 这里存储引用
     let imgs = doc.getElementsByTagName("img");
     for (let i = 0, len = imgs.length; i < len; i++) {
       imgs[i].title = '${doc.title} image ${i}';
     }
     let msg = doc.getElementById("msg");
     msg.innerHTML = "Update complete.";
   }
   ```

   2. 不使用with语句

      应避免使用 with 语句。与函数类似，with 语句会创建自己的作用域。

   3. 避免不必要的属性查找

      在计算机科学中，算法复杂度使用大 O 表示法来表示。最简单同时也最快的算法可以表示为常量值 或 O(1)。

      | 表示法  | 名称   | 说明                                                         |
      | ------- | ------ | ------------------------------------------------------------ |
      | O(1)    | 常量   | 无论多少值，执行时间都不变。表示简单值和保存在变量中的值     |
      | O(logn) | 对数   | 执行时间随着值的增加而增加，但算法完成不需要读取每个值。例子:二分查找 |
      | O(n)    | 线性   | 执行时间与值的数量直接相关。例子:迭代数组的所有元素          |
      | O(n^2)  | 二次方 | 执行时间随着值的增加而增加，而且每个值至少要读取 n 次。例子:插入排序 |

   4. 优化循环

      循环尽量有终止条件。

   5. 语句最少化

      JavaScript 代码中语句的数量影响操作执行的速度。一条可以执行多个操作的语句，比多条语句中 每个语句执行一个操作要快。那么优化的目标就是寻找可以合并的语句，以减少整个脚本的执行时间。

      ```javascript
      // 有四条语句:浪费
      let count = 5;
      let color = "blue"; 
      let values = [1,2,3]; 
      let now = new Date();
      
      // 优化
      // 一条语句更好 
      let count = 5,
          color = "blue",
          values = [1,2,3],
          now = new Date();
      ```

      > 在强类型语言中，不同数据类型的变量必须在不同的语句中声明。但在 JavaScript 中，所有变量都 可以使用一个 let 语句声明。

      ```javascript
      // 插入迭代性值
      
      let name = values[i];
      i++;
      
      // 优化
      let name = values[i++];
      ```

      ```javascript
      // 创建和初始化数组用了四条语句:浪费 
      let values = new Array(); 
      values[0] = 123;
      values[1] = 456;
      values[2] = 789;
      
      // 创建和初始化对象用了四条语句:浪费 
      let person = new Object(); 
      person.name = "Nicholas"; 
      person.age = 29;
      person.sayName = function() {
        console.log(this.name);
      };
      
      // 优化
      
      // 一条语句创建并初始化数组
      let values = [123, 456, 789];
      // 一条语句创建并初始化对象 
      let person = {
        name: "Nicholas",
        age: 29,
        sayName() {
          console.log(this.name);
        }
      };
      ```

   6. 优化DOM交互

      * 实时更新最小化

        访问 DOM 时，只要访问的部分是显示页面的一部分，就是在执行实时更新操作。之所以称其为实 时更新，是因为涉及立即(实时)更新页面的显示，让用户看到。每次这样的更新，无论是插入一个字 符还是删除页面上的一节内容，都会导致性能损失。这是因为浏览器需要为此重新计算数千项指标，之 后才能执行更新。实时更新的次数越多，执行代码所需的时间也越长。反之，实时更新的次数越少，代 码执行就越快。

      * 使用innterHTML

        在页面中创建新 DOM 节点的方式有两种:使用 DOM 方法如 createElement()和 appendChild()， 以及使用 innerHTML。对于少量 DOM 更新，这两种技术区别不大，但对于大量 DOM 更新，使用 innerHTML 要比使用标准 DOM 方法创建同样的结构快很多。

      * 使用事件委托

        大多数 Web 应用程序会大量使用事件处理程序实现用户交互。一个页面中事件处理程序的数量与 页面响应用户交互的速度有直接关系。为了减少对页面响应的影响，应该尽可能使用事件委托。

        事件委托利用了事件的冒泡。任何冒泡的事件都可以不在事件目标上，而在目标的任何祖先元素上 处理。基于这个认知，可以把事件处理程序添加到负责处理多个目标的高层元素上。只要可能，就应该 在文档级添加事件处理程序，因为在文档级可以处理整个页面的事件。

      * 注意HTMLCollection

        于 Web 应用程序存在很大的性能问题，HTMLCollection 对象的缺点本书前面已多次提到过了。 任何时候，只要访问 HTMLCollection，无论是它的属性还是方法，就会触发查询文档，而这个查询相 当耗时。减少访问 HTMLCollection 的次数可以极大地提升脚本的性能。

        ```javascript
        let images = document.getElementsByTagName("img"),
            image;
        
        for (let i = 0, len=images.length; i < len; i++) {
          image = images[i];
          // 处理 
        }
        ```

        这里的关键是把 length 保存到了 len 变量中，而不是每次都读一次 HTMLCollection 的 length 属性。

        代码增加了 image 变量，用于保存当前的图片。有了这个局部变量，就不需要在循环中再访问 images HTMLCollection 了。



### 部署

项目部署可以做很多优化

#### 构建流程

1. 文件结构

   构建流程首先定义在源代码控制中存储文件的逻辑结构。最好不要在一个文件中包含所有 JavaScript 代码。

   最好使用增量更新。

2. 任务运行期

   如果要把大量文件组合成一个应用程序，很可能需要任务运行器自动完成一些任务。任务运行器可 以完成代码检查、打包、转译、启动本地服务器、部署，以及其他可以脚本化的任务。

   最好使用CI构建工具：[github action](https://docs.github.com/actions/quickstart);

3. 摇树优化

   摇树优化(tree shaking)是非常常见且极为有效的减少冗余代码的策略。

4. 模块打包器

   以模块形式编写代码，并不意味着必须以模块形式交付代码。通常，由大量模块组成的 JavaScript 代码在构建时需要打包到一起，然后只交付一个或少数几个 JavaScript 文件。

   最好使用：webpack

#### 压缩

谈到 JavaScript 文件压缩，实际上主要是两件事:代码大小(code size)和传输负载(wire weight)。 20 代码大小指的是浏览器需要解析的字节数，而传输负载是服务器实际发送给浏览器的字节数。

1. 代码压缩

   > 1. 删除空格（包括换行）；
   > 2. 删除注释
   > 3. 缩短变量名、函数名和其他标识符。

2. JavaScript编译

   > 1. 删除未使用的代码
   > 2. 将某些代码转换为更简洁的语法
   > 3. 全局函数调用、常见和变量行内华

3. HTTP压缩

   应用层的压缩，比如使用connection：gzip

## 第26章 模块

模块需要有一个入口，因为 JavaScript 是顺序执行的，并且是单线程的，所以代码必须有执行的起点。入口模块也可能依 赖其他模块，其他模块同样可能有自己的依赖。于是模块化 JavaScript 应用程序的所有模块会构成依赖 图。

![image-20210207105402767](https://pic3.zhimg.com/80/v2-94b818950f653edc28d0c1cc57fa6526_720w.png)

图中的箭头表示依赖方向:模块 A 依赖模块 B 和模块 C，模块 B 依赖模块 D 和模块 E，模块 C 依 赖模块 E。因为模块必须在依赖加载完成后才能被加载，所以这个应用程序的入口模块 A 必须在应用程 序的其他部分加载后才能执行。

### Common.js模块定义

CommonJS 模块定义需要使用 require()指定依赖，而使用 exports 对象定义自己的公共 API。 下面的代码展示了简单的模块定义：

```javascript
var moduleB = require('./moduleB');

module.exports = {
  stuff: moduleB.doStuff();
}
```

无论一个模块在 require()中被引用多少次，模块永远是单例。在下面的例子中，moduleA 只会 被打印一次。这是因为无论请求多少次，moduleA 只会被加载一次。

```javascript
console.log('moduleA');
var a1 = require('./moduleA');
var a2 = require('./moduleA');

console.log(a1 === a2); // true
```

模块第一次加载后会被缓存，后续加载会取得缓存的模块。

### AMD（异步模块定义）

CommonJS 以服务器端为目标环境，能够一次性把所有模块都加载到内存，而异步模块定义(AMD， Asynchronous Module Definition)的模块定义系统则以浏览器为目标执行环境。

AMD模块定义：

```
define('moduleA', ['moduleB'], function(moduleB) {
	return {
		stuff: moduleB.doStuff();
	}
})
```

AMD 也支持 require 和 exports 对象，通过它们可以在 AMD 模块工厂函数内部定义 CommonJS 风格的模块。这样可以像请求模块一样请求它们，但 AMD 加载器会将它们识别为原生 AMD 结构，而不是模块定义:

```javascript
define('moduleA', ['require', 'exports'], function(require, exports) { 
  var moduleB = require('moduleB');
  exports.stuff = moduleB.doStuff();
});
```

动态依赖，也可以通过这种方法支持的：

```javascript
efine('moduleA', ['require'], function(require) {
  if (condition) {
    var moduleB = require('moduleB');
  }
});
```

### CMD（通用模块定义）

为了统一 CommonJS 和 AMD 生态系统，通用模块定义(UMD，Universal Module Definition)规范 应运而生。UMD 可用于创建这两个系统都可以使用的模块代码。

本质上，CMD 定义的模块会在启动时 检测要使用哪个模块系统，然后进行适当配置，并把所有逻辑包装在一个立即调用的函数表达式(IIFE) 中。虽然这种组合并不完美，但在很多场景下足以实现两个生态的共存。

```javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD。注册为匿名模块
    define(['moduleB'], factory);
  } else if (typeof module === 'object' && module.exports) { // Node。不支持严格CommonJS
    // 但可以在 Node 这样支持 module.exports 的
    // 类 CommonJS 环境下使用
    module.exports = factory(require(' moduleB '));
  } else {
    // 浏览器全局上下文(root 是 window) root.returnExports = factory(root. moduleB);
  }
}(this, function (moduleB) {
  // 以某种方式使用moduleB
  // 将返回值作为模块的导出
  // 这个例子返回了一个对象
  // 但是模块也可以返回函数作为导出值 return {};
}));
```

此模式有支持严格 CommonJS 和浏览器全局上下文的变体。不应该期望手写这个包装函数，它应该 由构建工具自动生成。开发者只需专注于模块的内由容，而不必关心这些样板代码。

## 第27章 工作者线程

JavaScript 环境实际上是运行在托管操作系统中的虚拟环境。在浏览器中每打开一个页面，就会分 配一个它自己的环境。这样，每个页面都有自己的内存、事件循环、DOM，等等。每个页面就相当于 一个沙盒，不会干扰其他页面。对于浏览器来说，同时管理多个环境是非常简单的，因为所有这些环境 都是并行执行的。

使用工作者线程，浏览器可以在原始页面环境之外再分配一个完全独立的二级子环境。这个子环境 不能与依赖单线程交互的 API(如 DOM)互操作，但可以与父环境并行执行代码。

### 工作者线程的类型

* **专用工作者线程（web woker）**

  专用工作者线程，通常简称为工作者线程、Web Worker 或 Worker，是一种实用的工具，可以让脚 本单独创建一个 JavaScript 线程，以执行委托的任务。专用工作者线程，顾名思义，只能被创建它的页 面使用。

* **共享工作者线程（share woker）**

  共享工作者线程与专用工作者线程非常相似。主要区别是共享工作者线程可以被多个不同的上下文 使用，包括不同的页面。任何与创建共享工作者线程的脚本同源的脚本，都可以向共享工作者线程发送 消息或从中接收消息。

* **服务工作线程（services woker）**

  服务工作者线程与专用工作者线程和共享工作者线程截然不同。它的主要用途是拦截、重定向和修 改页面发出的请求，充当网络请求的仲裁者的角色。

## JavaScript工具

### npm

npm，即 Node 包管理器(Node Package Manager)，是 Node.js 运行时默认的包管理器。在 npm 仓库 24 中发布的第三方包可以指定为项目依赖，并通过命令行本地安装。npm 仓库包含服务端和客户端

JavaScript 库。
 npm 是为在服务器上使用而设计的，服务器对依赖大小并不敏感。在安装包时，npm 使用嵌套依赖

树解析所有项目依赖，每个项目依赖都会安装自己的依赖。这意味着如果项目依赖三个包 A、B 和 C， 而这三个包又都依赖不同版本的 D，则 npm 会安装包 D 的三个版本。

### yarn

Yarn 是 Facebook 开发的定制包管理器，从很多方面看是 npm 的升级版。Yarn 可以通过自己的注册 表访问相同的 npm 包，并且安装方式与 npm 也相同。Yarn 和 npm 的主要区别是提供了加速安装、包缓存、锁文件等功能，且提供了改进了包安全功能。