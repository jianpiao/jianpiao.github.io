# 《javascript设计模式与开发实践》

### 学习模式的作用

小说家很少从头开始设计剧情，足球教练也很少从头开始发明战术，他们总是沿袭一些已经 存在的模式。当足球教练看到对方边后卫速度慢，中后卫身高矮时，自然会想到“下底传中”这 种模式。

同样，在软件设计中，模式是一些经过了大量实际项目验证的优秀解决方案。熟悉这些模式 的程序员，对某些模式的理解也许形成了条件反射。当合适的场景出现时，他们可以很快地找到 某种模式作为解决方案。

比如，当他们看到系统中存在一些大量的相似对象，这些对象给系统的内存带来了较大的负 担。如果他们熟悉享元模式，那么第一时间就可以想到用享元模式来优化这个系统。再比如，系 统中某个接口的结构已经不能符合目前的需求，但他们又不想去改动这个被灰尘遮住的老接口， 一个熟悉模式的程序员将很快地找到适配器模式来解决这个问题。

如果我们还没有学习全部的模式，当遇到一个问题时，我们冥冥之中觉得这个问题出现的几 率很高，说不定别人也遇到过同样的问题，并且已经把它整理成了模式，提供了一种通用的解决 方案。这时候去翻翻《设计模式》这本书也许就会有意外的收获。

## 面向对象的javascript

JavaScript 没有提供传统面向对象语言中的类式继承，而是通过原型委托的方式来实现对象 与对象之间的继承。JavaScript 也没有在语言层面提供对抽象类和接口的支持。

### 动态类型语言和鸭子类型

编程语言按照数据类型大体可以分为两类，一类是静态类型语言，另一类是动态类型语言。

静态类型语言在编译时便已确定变量的类型，而动态类型语言的变量类型要到程序运行的时 候，待变量被赋予某个值之后，才会具有某种类型。

动态类型语言的缺点是无法保证变量的类型，从而在程序的运行期有可能发生跟类型相关的 错误。这好像在商店买了一包牛肉辣条，但是要真正吃到嘴里才知道是不是牛肉味。

在 JavaScript 中，当我们对一个变量赋值时，显然不需要考虑它的类型，因此，JavaScript是一门典型的动态类型语言。

动态类型语言对变量类型的宽容给实际编码带来了很大的灵活性。由于无需进行类型检测， 我们可以尝试调用任何对象的任意方法，而无需去考虑它原本是否被设计为拥有该方法。

这一切都建立在鸭子类型(duck typing)的概念上，鸭子类型的通俗说法是:“如果它走起 路来像鸭子，叫起来也是鸭子，那么它就是鸭子。”

我们可以通过一个小故事来更深刻地了解鸭子类型：

>从前在 JavaScript 王国里，有一个国王，他觉得世界上最美妙的声音就是鸭子的叫 声，于是国王召集大臣，要组建一个 1000 只鸭子组成的合唱团。大臣们找遍了全国， 终于找到 999 只鸭子，但是始终还差一只，最后大臣发现有一只非常特别的鸡，它的叫 声跟鸭子一模一样，于是这只鸡就成为了合唱团的最后一员。

这个故事告诉我们，国王要听的只是鸭子的叫声，这个声音的主人到底是鸡还是鸭并不重要。 10 鸭子类型指导我们只关注对象的行为，而不关注对象本身，也就是关注 HAS-A, 而不是 IS-A。

```javascript
let duck = {
  duckSinging:function(){
    console.log("嘎嘎嘎");
  }
}

let chicken = {
  duckSinging:function(){
    console.log("嘎嘎嘎");
  }
}

let choir = [] // 合唱团

let joinChoir = function(animal){
	if(animal && typeof animal.duckSinging === 'function'){
    choir.push(animal);
    console.log("恭喜加入合唱团");
    console.log("合唱团数量为:" + choir.length);
  }
}

joinChoir(duck)  // 恭喜加入合唱团
joinChoir(chicken) // 恭喜加入合唱团
```

我们看到，对于加入合唱团的动物，大臣们根本无需检查它们的类型，而是只需要保证它们 拥有 duckSinging 方法。如果下次期望加入合唱团的是一只小狗，而这只小狗刚好也会鸭子叫， 我相信这只小狗也能顺利加入。

### 多态

“多态”一词源于希腊文 polymorphism，拆开来看是 poly(复数)+ morph(形态)+ ism，从字面上我们可以理解为复数形态。

多态的实际含义是:同一操作作用于不同的对象上面，可以产生不同的解释和不同的执行结 果。换句话说，给不同的对象发送同一个消息的时候，这些对象会根据这个消息分别给出不同的 反馈。

为了更好的理解，举个例子：

> 主人家里养了两只动物，分别是一只鸭和一只鸡，当主人向它们发出“叫”的命令 时，鸭会“嘎嘎嘎”地叫，而鸡会“咯咯咯”地叫。这两只动物都会以自己的方式来发 出叫声。它们同样“都是动物，并且可以发出叫声”，但根据主人的指令，它们会各自 发出不同的叫声。

这其中就蕴含了多态的思想。

#### 一段“多态”的代码案例

```javascript
let makeSound = function(animal){
  if(animal instanceof Duck){
    console.log("嘎嘎嘎")
  } else if(animal instanceof Chicken){
    console.log("咕咕咕")
  }
}

let Duck = function{}
let Chicken = function{}

makeSound(new Duck()) // 嘎嘎嘎
makeSound(new Chicken) // 咕咕咕
```

这段代码确实体现了“多态性”，当我们分别向鸭和鸡发出“叫唤”的消息时，它们根据此 消息作出了各自不同的反应。但这样的“多态性”是无法令人满意的，如果后来又增加了一只动 物，比如狗，显然狗的叫声是“汪汪汪”，此时我们必须得改动 makeSound 函数，才能让狗也发出 叫声。修改代码总是危险的，修改的地方越多，程序出错的可能性就越大，而且当动物的种类越 来越多时，makeSound 有可能变成一个巨大的函数。

多态背后的思想是将“做什么”和“谁去做以及怎样去做”分离开来，也就是将“不变的事 物”与 “可能改变的事物”分离开来。在这个故事中，动物都会叫，这是不变的，但是不同类 型的动物具体怎么叫是可变的。把不变的部分隔离出来，把可变的部分封装起来，这给予了我们 扩展程序的能力，程序看起来是可生长的，也是符合开放—封闭原则的，相对于修改代码来说， 仅仅增加代码就能完成同样的功能，这显然优雅和安全得多。

#### 改进“多态”

```javascript
let makeSound = function(animal){
  animal.sound()
}

let Duck = function{}
// 给Duck原型添加sound方法
Duck.prototype.sound = function(){
  console.log("嘎嘎嘎")
}

let Chicken = function(){}
Chicken.prototype.sound = function(){
  console.log("咕咕咕")
}

makeSound(new Duck()) // 嘎嘎嘎
makeSound(new Chicken()) // 咕咕咕
```

现在我们向鸭和鸡都发出“叫唤”的消息，它们接到消息后分别作出了不同的反应。如果有 一天动物世界里又增加了一只狗，这时候只要简单地追加一些代码就可以了，而不用改动以前的 makeSound 函数，如下所示:

```javascript
let Dog = function(){}
Dog.prototype.sound = function(){ console.log( '汪汪汪' );
};
makeSound( new Dog() ); // 汪汪汪
```

#### 多态在面向对象程序设计中的作用

Martin Fowler 在《重构:改善既有代码的设计》里写到:

>多态的最根本好处在于，你不必再向对象询问“你是什么类型”而后根据得到的答 案调用对象的某个行为——你只管调用该行为就是了，其他的一切多态机制都会为你安
> 排妥当。

多态最根本的作用就是通过把过程化的条件分支语句转化为对象的多态性，从而 消除这些条件分支语句。

Martin Fowler 的话可以用下面这个例子很好地诠释:

> 在电影的拍摄现场，当导演喊出“action”时，主角开始背台词，照明师负责打灯 光，后面的群众演员假装中枪倒地，道具师往镜头里撒上雪花。在得到同一个消息时， 每个对象都知道自己应该做什么。如果不利用对象的多态性，而是用面向过程的方式来 编写这一段代码，那么相当于在电影开始拍摄之后，导演每次都要走到每个人的面前， 确认它们的职业分工(类型)，然后告诉他们要做什么。如果映射到程序中，那么程序 中将充斥着条件分支语句。

利用对象的多态性，导演在发布消息时，就不必考虑各个对象接到消息后应该做什么。对象 应该做什么并不是临时决定的，而是已经事先约定和排练完毕的。每个对象应该做什么，已经成 为了该对象的一个方法，被安装在对象的内部，每个对象负责它们自己的行为。所以这些对象可 以根据同一个消息，有条不紊地分别进行各自的工作。

将行为分布在各个对象中，并让这些对象各自负责自己的行为，这正是面向对象设计的优点。

### javascript中的原型继承

事实上，JavaScript 中的根对象是 Object.prototype 对象。Object.prototype 对象是一个空的 对象。我们在 JavaScript 遇到的每个对象，实际上都是从 Object.prototype 对象克隆而来的， Object.prototype 对象就是它们的原型。比如下面的 obj1 对象和 obj2 对象:

```javascript
let obj1 = new Object(); 
let obj2 = {};
```

可以利用 ECMAScript 5 提供的 Object.getPrototypeOf 来查看这两个对象的原型:

```javascript
console.log( Object.getPrototypeOf( obj1 ) === Object.prototype ); // 输出:true
console.log( Object.getPrototypeOf( obj2 ) === Object.prototype ); // 输出:true
```

在 JavaScript 语言里，我们并不需要关心克隆的细节，因为这是引擎内部负责实现的。我 们所需要做的只是显式地调用 var obj1 = new Object()或者 var obj2 = {}。此时，引擎内部会从 Object.prototype 上面克隆一个对象出来，我们最终得到的就是这个对象。

```javascript
function Person( name ){ 
  this.name = name;
};

Person.prototype.getName = function(){
  return this.name
}

let a = new Person('smallzip')

console.log(a.name)  // smallzip
console.log(a.getName) //  smallzip
console.log(Object.getPrototypeOf(a) === Person.prototype); // true
```

在这里 Person 并不是类，而是函数构造器，JavaScript 的函数既可以作为普通函数被调用，也可以作为构造器被调用。当使用 new 运算符来调用函数时，此时的函数就是一个构造器。 用new 运算符来创建对象的过程，实际上也只是先克隆 Object.prototype 对象，再进行一些其他额外操作的过程。

## this、call和apply

### this

JavaScript 的 this 总是指向一个对象，而具体指向哪个对象是在运行时基于函数的执行环境动态绑定的，而非函数被声明时的环境。

```javascript
let obj = {
  name:'smallzip',
  getName:function(){
    console.log(this.name)
  }
}

obj.getName()  // smallzip
```

```javascript
window.name = "globalName"
let obj = {
  name:'smallzip',
  getName:function(){
    return this.name
  }
}

let getName = obj.getName  // 此时obj里面的getName已经处于window环境下
console.log(getName())  // globalName
```

### call和apply

当使用 call 或者 apply 的时候，如果我们传入的第一个参数为 null，函数体内的 this 会指 向默认的宿主对象，在浏览器中则是 window:

```javascript
let func = function(a,b,c){
  alert(this === window); // true
}

func.apply(null,[1,2,3])
```

但如果是严格模式下，函数体内的this还是为null

```javascript
let func = function(a,b,c){
  "use strict"
  alert(this === null) // true
}

func.apply(null,[1,2,3])
```

有时候我们使用 call 或者 apply 的目的不在于指定 this 指向，而是另有用途，比如借用其

他对象的方法。那么我们可以传入 null 来代替某个具体的对象: 

```javascript
Math.max.apply( null, [ 1, 2, 5, 3, 4 ] ) // 输出:5
```

#### 改变 this 指向

```javascript
var obj1 = {
  name: 'sven'
};
var obj2 = {
  name: 'anne'
};

window.name = 'window';

var getName = function () {
  alert(this.name);
};

getName();   // 输出: window
getName.call(obj1);   // 输出: sven 
getName.call(obj2)   // 输出: anne
```

当执行 getName.call( obj1 )这句代码时，getName 函数体内的 this 就指向 obj1 对象，所以 此处的

```javascript
var getName = function(){ 
  alert ( this.name );
};

// 实际上相当于
var getName = function(){ 
  alert ( obj1.name );
}

```

### 用闭包实现命令模式

在 JavaScript 版本的各种设计模式实现中，闭包的运用非常广泛。在完成闭包实现的命令模式之前，我们先用面向对象的方式来编写一段命令模式的代码。虽 然还没有进入设计模式的学习，但这个作为演示作用的命令模式结构非常简单，不会对我们的理 解造成困难，代码如下:

```html
<html> 
  <body>
    <button id="execute">点击我执行命令			</button>
		<button id="undo">点击我执行命令					</button> 		
    <script>
    let Tv = {
    	open: function(){
      	console.log( '打开电视机' ); 
      },
      close: function(){
      	console.log( '关上电视机' );
      } 
    };
   
    let OpenTvCommand = function(receiver){
      this.receiver = receiver
    }
    
    OpenTvCommand.prototype.execute = function(){
   	 	this.receiver.open(); // 执行命令，打开电视机 
    };
      
    OpenTvCommand.prototype.undo = function(){ 
      this.receiver.close(); // 撤销命令，关闭电视机
    };
      
    let setCommand = function( command ){
    		document.getElementById( 'execute' ).onclick = function(){
    			command.execute(); // 输出:打开电视机 
        }
    		document.getElementById( 'undo' ).onclick = function(){ 
          command.undo(); // 输出:关闭电视机
    		} 
    };
      
    setCommand( new OpenTvCommand( Tv ) );
		</script> 
  </body>
</html>
```

命令模式的意图是把请求封装为对象，从而分离请求的发起者和请求的接收者(执行者)之 间的耦合关系。在命令被执行之前，可以预先往命令对象中植入命令的接收者。

而在闭包版本的命令模式中，命令接收者会被封闭在闭包形成的环境中，代码如下:

```javascript
let Tv = {
	open: function(){
		console.log( '打开电视机' ); 
  },
  close: function(){
		console.log( '关上电视机' );
	} 
};

let createCommand = function(receiver){
  let execute = function(){
    return receiver.open(); // 执行命令，打开电视机
  }
  let undo = function(){
    return receiver.close(); // 执行命令，关闭电视机
  }
  return {
    execute:execute,
    undo:undo
  }
}


let setCommand = function(command){
  document.getElementById("execute").onclick = function(){
    command.execute(); // 输出，打开电视机
  }
  document.getElementById("undo").onclick = function{
    command.undo(); // 输出，关闭电视机
  }
}

setCommand(createCommand(Tv));
```

### 闭包与内存管理

闭包是一个非常强大的特性，但人们对其也有诸多误解。一种耸人听闻的说法是闭包会造成内存泄露，所以要尽量减少闭包的使用。

局部变量本来应该在函数退出的时候被解除引用，但如果局部变量被封闭在闭包形成的环境 中，那么这个局部变量就能一直生存下去。从这个意义上看，闭包的确会使一些数据无法被及时 销毁。使用闭包的一部分原因是我们选择主动把一些变量封闭在闭包中，因为可能在以后还需要 使用这些变量，把这些变量放在闭包中和放在全局作用域，对内存方面的影响是一致的，这里并 不能说成是内存泄露。如果在将来需要回收这些变量，我们可以手动把这些变量设为 null。

跟闭包和内存泄露有关系的地方是，使用闭包的同时比较容易形成循环引用，如果闭包的作 用域链中保存着一些 DOM 节点，这时候就有可能造成内存泄露。但这本身并非闭包的问题，也
 并非 JavaScript 的问题。在 IE 浏览器中，由于 BOM 和 DOM 中的对象是使用 C++以 COM 对象 的方式实现的，而 COM 对象的垃圾收集机制采用的是引用计数策略。在基于引用计数策略的垃圾回收机制中，如果两个对象之间形成了循环引用，那么这两个对象都无法被回收，但循环引用造成的内存泄露在本质上也不是闭包造成的。

同样，如果要解决循环引用带来的内存泄露问题，我们只需要把循环引用中的变量设为 null 即可。将变量设置为 null 意味着切断变量与它此前引用的值之间的连接。当垃圾收集器下次运 行时，就会删除这些值并回收它们占用的内存。

### 高阶函数

高阶函数是指至少满足下列条件之一的函数。

* 函数可以作为参数被传递
* 函数可以作为返回值输出

JavaScript 语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数 传递，还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景.

#### 函数作为参数传递

把函数当作参数传递，这代表我们可以抽离出一部分容易变化的业务逻辑，把这部分业务逻 辑放在函数参数中，这样一来可以分离业务代码中变化与不变的部分。其中一个重要应用场景就 是常见的回调函数。

在 ajax 异步请求的应用中，回调函数的使用非常频繁。当我们想在 ajax 请求返回之后做一 些事情，但又并不知道请求返回的确切时间时，最常见的方案就是把 callback 函数当作参数传入 发起 ajax 请求的方法中，待请求完成之后执行 callback 函数:

```javascript
let getUserInfo = function( userId, callback ){
	$.ajax( 'http://xxx.com/getUserInfo?' + userId, function( data ){
    if ( typeof callback === 'function' ){ 
      callback( data );
    } 
  });
 }

getUserInfo( 13157, function( data ){ 
    alert ( data.userName );
});
```

#### 函数作为返回值输出

相比把函数当作参数传递，函数当作返回值输出的应用场景也许更多，也更能体现函数式编程的巧妙。让函数继续返回一个可执行的函数，意味着运算过程是可延续的。

## 一、单例模式

**单例模式的定义是:保证一个类仅有一个实例，并提供一个访问它的全局访问点。**

单例模式是一种常用的模式，有一些对象我们往往只需要一个，比如线程池、全局缓存、浏 览器中的 window 对象等。在 JavaScript 开发中，单例模式的用途同样非常广泛。试想一下，当我 们单击登录按钮的时候，页面中会出现一个登录浮窗，而这个登录浮窗是唯一的，无论单击多少 次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>单例模式</title>
</head>

<body>
  <div id="div1">我是设计模式</div>
  <script>
    let getSingle = function (fn) {
      let result;
      return function () {
        return result || (result = fn.apply(this, arguments));
      }
    };

    let bindEvent = getSingle(function () {
      document.getElementById('div1').onclick = function () {
        alert('click');
      }
      return true;
    });
    let render = function () {
      console.log('开始渲染列表'); bindEvent();
    };
    render();  // 开始渲染列表
    render();  // 开始渲染列表
    render();  // 开始渲染列表
  </script>
</body>

</html>
```

可以看到，render 函数和 bindEvent 函数都分别执行了 3 次，但 div 实际上只被绑定了一个 事件。以上就是一个简单实用的单例模式。

```javascript
var getSingle = function( fn ){ 
  var result;
  return function(){
    return result || ( result = fn .apply(this, arguments ) );
	} 
};
```

上面把不变的部分隔离出来，把如何管理单例的逻辑抽离出来，创建对象的方法fn被当成参数动态传入getSingle函数。

接下来将用于创建登录浮窗的方法用参数 fn 的形式传入 getSingle，之后再让getSingle返回一个新的函数，并且用一个变量result来保存fn的计算结果。result结果因为身在闭包中，它永远不会被销毁。在将来的请求中，如果result已经被赋值，那么它将返回这个值。

### 小结

单例模式是我们学习的第一个模式，我们先学习了传统的单例模式实现，也了解到因为语言 的差异性，有更适合的方法在 JavaScript 中创建单例。这一章还提到了代理模式和单一职责原则， 后面的章节会对它们进行更详细的讲解。

在 getSinge 函数中，实际上也提到了闭包和高阶函数的概念。单例模式是一种简单但非常实 用的模式，特别是惰性单例技术，在合适的时候才创建对象，并且只创建唯一的一个。更奇妙的 是，创建对象和管理单例的职责被分布在两个不同的方法中，这两个方法组合起来才具有单例模 式的威力。

## 二、策略模式

俗话说，条条大路通罗马。

在程序设计中，我们也常常遇到类似的情况，要实现某一个功能有多种方案可以选择。比如 一个压缩文件的程序，既可以选择 zip 算法，也可以选择 gzip 算法。

**策略模式的定义是:定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。**

### 使用策略模式计算奖金

策略模式有着广泛的应用。本节我们就以年终奖的计算为例进行介绍。

很多公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，绩效为 S 的人年 终奖有 4 倍工资，绩效为 A 的人年终奖有 3 倍工资，而绩效为 B 的人年终奖是 2 倍工资。假设财 务部要求我们提供一段代码，来方便他们计算员工的年终奖。

#### 最初的代码实现

我们可以编写一个名为 calculateBonus 的函数来计算每个人的奖金数额。很显然， calculateBonus 函数要正确工作，就需要接收两个参数:员工的工资数额和他的绩效考核等级。 代码如下:

```javascript
var calculateBonus = function( performanceLevel, salary ){
	if ( performanceLevel === 'S' ){ 
  	return salary * 4;
	}
	if ( performanceLevel === 'A' ){ 
  	return salary * 3;
	}
	if ( performanceLevel === 'B' ){ 
  	return salary * 2;
	} 
};

calculateBonus( 'B', 20000 ); // 输出:40000 
calculateBonus( 'S', 6000 );  // 输出:24000
```

可以发现，这段代码十分简单，但是存在着显而易见的缺点。

* calculateBonus 函数比较庞大，包含了很多 if-else 语句，这些语句需要覆盖所有的逻辑 分支。

*   calculateBonus 函数缺乏弹性，如果增加了一种新的绩效等级 C，或者想把绩效 S 的奖金 系数改为 5，那我们必须深入 calculateBonus 函数的内部实现，这是违反开放封闭原则的。

* 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢?我们的选择

  只有复制和粘贴。

#### 使用策略模式重构代码

策略模式指的是定义一系 列的算法，把它们一个个封装起来。将不变的部分和变化的部分隔开是每个设计模式的主题，策 略模式也不例外，策略模式的目的就是将算法的使用与算法的实现分离开来。

在这个例子里，算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数额。而算 法的实现是各异和变化的，每种绩效对应着不同的计算规则。

一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体 的算法，并负责具体的计算过程。 第二个部分是环境类 Context，Context 接受客户的请求，随后 把请求委托给某一个策略类。要做到这点，说明 Context 中要维持对某个策略对象的引用。

```javascript
let strategies = {
	"S": function( salary ){
		return salary * 4; 
	},
	"A": function( salary ){ 
  	return salary * 3;
	},
	"B": function( salary ){
		return salary * 2; 
	}
};

var calculateBonus = function( level, salary ){ 
  return strategies[ level ]( salary );
};   // calculateBonus 函数充当Context 来接受用户的请求

console.log( calculateBonus( 'S', 20000 ) );  // 输出:80000
console.log( calculateBonus( 'A', 10000 ) );  // 输出:30000

```

## 三、代理模式

**代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。**

代理模式是一种非常有意义的模式，在生活中可以找到很多代理模式的场景。比如，明星都 有经纪人作为代理。如果想请明星来办一场商业演出，只能联系他的经纪人。经纪人会把商业演 出的细节和报酬都谈好之后，再把合同交给明星签。

代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身 对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之 后，再把请求转交给本体对象。

### 小明追女神的故事

小明(xiaoming)作为程序员母胎solo了二十多年，向来对异性胆小害羞。偶然的机会在学校运动会上遇见了他一见钟情的女神(A)，于是他急匆匆的买了一朵花准备告白。可是又不敢直接送，刚好小明打听到有个女同学(B)和女生玩的很熟,于是他决定让女朋友(B)替他完成送花的事情。

下面我们先通过一个不用代理的情况来了解小明告白的过程。

```javascript
let flower = "美丽的花"

let xiaoming = {
  sendFlower: function (target) {
    target.receiveFlower(flower);
  }
};

let A = {
  receiveFlower: function (flower) {
    console.log('收到了送来的 ' + flower);
  }
};
xiaoming.sendFlower(A);
```

接下来，我们引入代理B，让代理B代替小明送花给女神A。

```javascript
let flower = "美丽的花"

let xiaoming = {
  sendFlower: function (target) {
    target.receiveFlower(flower);
  }
};

let B = {
  receiveFlower: function (flower) {
    A.receiveFlower(flower);
  }
}

let A = {
  receiveFlower: function (flower) {
    console.log('收到了送来的 ' + flower);
  }
};

xiaoming.sendFlower(B);  // 收到了送来的 美丽的花
```

很显然，执行结果跟第一段代码一致，至此我们就完成了一个最简单的代理模式的编写。

可能看着会有疑问，小明自己去送花和代理 B 帮小明送花，二者看起来并没有本质的区别，引 入一个代理对象看起来只是把事情搞复杂了而已。

现在我们改变故事的背景设定，假设当 A 在心情好的时候收到花，小明表白成功的几率有 60%，而当 A 在心情差的时候收到花，小明表白的成功率无限趋近于 0。

小明跟 A 刚刚认识两天，还无法辨别 A 什么时候心情好。如果不合时宜地把花送给 A，花 被直接扔掉的可能性很大，这束花可是小明少买几个皮肤换来的。

但是 A 的朋友 B 却很了解 A，所以小明只管把花交给 B，B 会监听 A 的心情变化，然后选 择 A 心情好的时候把花转交给 A，代码如下:

```javascript
let flower = "美丽的花"

let xiaoming = {
  sendFlower: function (target) {
    target.receiveFlower(flower);
  }
};

let B = {
  receiveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.receiveFlower(flower);
    });
  }
}

let A = {
  receiveFlower: function (flower) {
    console.log('收到了送来的 ' + flower);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () { // 假设 10 秒之后 A 的心情变好
      fn();
    }, 10000);
  }
};

xiaoming.sendFlower(B);  // 收到了送来的 美丽的花
```

执行上面代码之后，B并不会立即收到花，而是等过了十秒钟后，B心情变好了，才最终收到了小明送来的花。

虽然这只是个虚拟的例子，但我们可以从中找到两种代理模式的身影。代理 B 可以帮助 A 过滤掉一些请求。这个时候我们就可以很轻易的回想到node开发的时候使用的中间件(middleware)，它做的事情就是代理。

### 虚拟代理实现图片预加载

在 Web 开发中，图片预加载是一种常用的技术，如果直接给某个 img 标签节点设置 src 属性， 由于图片过大或者网络不佳，图片的位置往往有段时间会是一片空白。常见的做法是先用一张 loading 图片占位，然后用异步的方式加载图片，等图片加载好了再把它填充到 img 节点里，这种 场景就很适合使用虚拟代理。

下面我们来实现这个虚拟代理，首先创建一个普通的本体对象，这个对象负责往页面中创建 一个 img 标签，并且提供一个对外的 setSrc 接口，外界调用这个接口，便可以给该 img 标签设置src 属性:

```javascript
let myImage = (function () {
  let imgNode = document.createElement('img'); document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();   // 立即执行函数

myImage.setSrc('http://attach.bbs.miui.com/forum/201312/31/111859myvyiivetyftfz2n.jpg');
```

我们把网速调至 5KB/s，然后通过 MyImage.setSrc 给该 img 节点设置 src，可以看到，在图片

被加载好之前，页面中有一段长长的空白时间。
 现在开始引入代理对象 proxyImage，通过这个代理对象，在图片被真正加载好之前，页面中

将出现一张占位的菊花图 loading.gif, 来提示用户图片正在加载。代码如下:

```javascript
let myImage = (function () {
  let imgNode = document.createElement('img'); document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();

let proxyImage = (function () {  // 代理
  let img = new Image;
  img.onload = function () {  // 等待图片加载完毕
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('1161593852554_.pic.jpg');  // 默认先加载本地图片
      img.src = src;  // 图片加载完毕之后复制给src呈现出来
    }
  }
})();

proxyImage.setSrc('http://attach.bbs.miui.com/forum/201312/31/111859myvyiivetyftfz2n.jpg');
```

现在我们通过 proxyImage 间接地访问 MyImage。proxyImage 控制了客户对 MyImage 的访问，并 且在此过程中加入一些额外的操作，比如在真正的图片加载好之前，先把 img 节点的 src 设置为 一张本地的 loading 图片。

### 缓存代理

缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果。

先创建一个用于求乘积的函数:

```javascript
let mult = function () {
  console.log('开始计算乘积');
  let a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a *= arguments[i]
  }
  return a
}

console.log(mult(2, 3))  // 6
console.log(mult(2, 3, 4))  // 24
```

现在加入缓存代理函数:

```javascript
let mult = function () {
  console.log('开始计算乘积');
  let a = 1;
  for (let i = 0, l = arguments.length; i < l; i++) {
    a *= arguments[i]
  }
  return a
}

let proxyMult = (function () {
  let cache = {};
  return function () {
    // 获取所有参数，参数之间用逗号间隔,结果为字符串: ’1,2,3,4‘
    let args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {  // 检查对象是否存在相同参数,如果有则返回缓存
      return cache[args];
    }
    return cache[args] = mult.apply(this, arguments);
  }
})();

console.log(proxyMult(1, 2, 3, 4)) // 输出:24
console.log(proxyMult(1, 2, 3, 4)) // 输出:24
```

当我们第二次调用 proxyMult( 1, 2, 3, 4 )的时候，本体 mult 函数并没有被计算，proxyMult直接返回了之前缓存好的计算结果。

通过增加缓存代理的方式，mult 函数可以继续专注于自身的职责——计算乘积，而缓存的功能 是由代理对象实现的。

### 用高阶函数动态创建代理

通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。现在这些计算方法被当作参数传入一个专门用于创建缓存代理的工厂中， 这样一来，我们就可以为乘法、加法、减法等创建缓存代理，代码如下:

```javascript
    /**************** 计算乘积 *****************/
    let mult = function () {
      console.log('开始计算乘积');
      let a = 1;
      for (let i = 0, l = arguments.length; i < l; i++) {
        a *= arguments[i]
      }
      return a
    }

    /**************** 计算累加 *****************/
    let plus = function () {
      console.log('开始计算累加');
      let a = 1;
      for (let i = 0, l = arguments.length; i < l; i++) {
        a += arguments[i]
      }
      return a
    }

    /**************** 创建缓存代理的工厂 *****************/
    let createProxyFactory = function (fn) {
      let cache = {};
      return function () {
        let args = Array.prototype.join.call(arguments, ',');
        if (args in cache) {  // 检查对象是否存在相同参数,如果有则返回缓存
          return cache[args];
        }
        return cache[args] = fn.apply(this, arguments); // 这里改成了fn
      }
    }

    
    let proxyMult = createProxyFactory(mult)
    let proxyPlus = createProxyFactory(plus)

    console.log(proxyMult(1, 2, 3, 4));  // 输出:24
    console.log(proxyMult(1, 2, 3, 4));  // 输出:24
    console.log(proxyPlus(1, 2, 3, 4));  // 输出:10
    console.log(proxyPlus(1, 2, 3, 4));  // 输出:10
```

### 小结

代理模式包括许多小分类，在 JavaScript 开发中最常用的是虚拟代理和缓存代理。虽然代理 模式非常有用，但我们在编写业务代码的时候，往往不需要去预先猜测是否需要使用代理模式。 当真正发现不方便直接访问某个对象的时候，再编写代理也不迟。

## 四、 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象 5 的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

### 循环语句的问题

for循环语句

```javascript
let colors = ["red","blue","orange"]

for(let i=0; i<colors.length; i++){
  console.log(colors[i])
}
```

上面是一段标准的for循环代码，通过变量i来跟踪colors数组的索引，循环每次执行时，如果i不大于数组的长度，则执行下一次循环。

虽然循环语句的语法简单，但是如果多个循环嵌套则需要追踪多个变量，代码的复杂度会大大增加，一不小心就错误使用了其他for循环的跟踪变量，从而导致程序出错。迭代器的出现皆在消除这种复杂性并减少循环中的错误。

### 什么是迭代器

迭代器是一种特对象，它具有一些专门为迭代过程设计的专有接口，所有的迭代器对象都有一个`next()`方法，每次调用都返回一个结果对象。结果对象有两个属性:一个是`value`表示下一个将要返回的值，另一个是`done`它是一个布尔类型的值，当没有更多可返回数据时返回true。迭代器还会保存一个内部指针，用来指向当前集合中值的位置，每调用一次`next()`方法，都会返回下一个可用的值。

如果在最后一个值返回后再调用`next()`方法，那么返回的对象中属性done的值为true，属性value则包含迭代器最终返回的值，这个返回值不是数据集的一部分，它与函数的返回值类似，是函数调用过程中最后一次给调用者传递信息的方法，如果没有相关数据则返回`undefined`。

了解了这些以后，我们用ES5的语法创建一个迭代器。

```javascript
function creteInterator(item){
  let i=0;
  return {
    next:function(){
      let done = (i>=items.length);
      let value = !done ? items[i++] : undefined;
      return {
        done:done,
        value:value
      }
    }
  }
}

let interator = createInterator([1,2,3])

console.log(interator.next())  //{vlaue:1,done:false}
console.log(interator.next())  //{vlaue:2,done:false}
console.log(interator.next())  //{vlaue:3,done:false}

// 之后所有的调用都会返回相同内容
console.log(interator.next())  //{vlaue:undefined,done:true}
```

### 迭代器模式的应用举例

当我在重构某个项目中文件上传模块的代码时，发现了下面这段代码，它的目的是根据不同的浏览器获取相应的上传组件对象:

```javascript
let getUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload");
  } catch (e) {
    // IE 上传控件
    if (supportFlash()) { // supportFlash 函数未提供
      let str = '<object type="application/x-shockwave-flash"></object>'; return $(str).appendTo($('body'));
    } else {
      let str = '<input name="file" type="file"/>'; // 表单上传
      return $(str).appendTo($('body'));
    }
  }
}
```

在不同的浏览器环境下，选择的上传方式是不一样的。因为使用浏览器的上传控件进行上传 速度快，可以暂停和续传，所以我们首先会优先使用控件上传。如果浏览器没有安装上传控件， 则使用 Flash 上传， 如果连 Flash 也没安装，那就只好使用浏览器原生的表单上传了。

看看上面的代码，为了得到一个 upload 对象，这个 getUploadObj 函数里面充斥了 try，catch 以及 if 条件分支。缺点是显而易见的。第一是很难阅读，第二是严重违反开闭原则。 在开发和 调试过程中，我们需要来回切换不同的上传方式，每次改动都相当痛苦。后来我们还增加支持了 一些另外的上传方式，比如，HTML5 上传，这时候唯一的办法是继续往 getUploadObj 函数里增 加条件分支。

现在来梳理一下问题，目前一共有 3 种可能的上传方式，我们不知道目前正在使用的浏览器 支持哪几种。就好比我们有一个钥匙串，其中共有 3 把钥匙，我们想打开一扇门但是不知道该使 用哪把钥匙，于是从第一把钥匙开始，迭代钥匙串进行尝试，直到找到了正确的钥匙为止。

同样，我们把每种获取 upload 对象的方法都封装在各自的函数里，然后使用一个迭代器， 迭代获取这些 upload 对象，直到获取到一个可用的为止:

```javascript
let getActiveUploadObj = function () {
  try {
    return new ActiveXObject("TXFTNActiveX.FTNUpload");  // IE控件上传
  } catch (e) {
    return false;
  }
};

let getFlashUploadObj = function () {
  if (supportFlash()) { // supportFlash 函数未提供
  }
  let str = '<object type="application/x-shockwave-flash"></object>';
  return $(str).appendTo($('body'));
  return false;
};

let getFormUpladObj = function () {
  let str = '<input name="file" type="file" class="ui-file"/>';  // 表单上传
  return $(str).appendTo($('body'));
}
```

在 getActiveUploadObj、getFlashUploadObj、getFormUpladObj 这 3 个函数中都有同一个约定: 如果该函数里面的 upload 对象是可用的，则让函数返回该对象，反之返回 false，提示迭代器继 续往后面进行迭代。

所以我们的迭代器只需进行下面这几步工作。

* 提供一个可以被迭代的方法，使得 getActiveUploadObj，getFlashUploadObj 以及 getFlashUploadObj 依照优先级被循环迭代。
* 如果正在被迭代的函数返回一个对象，则表示找到了正确的 upload 对象，反之如果该函 数返回 false，则让迭代器继续工作。

迭代器代码如下:

```javascript
let iteratorUploadObj = function () {
  for (let i = 0, fn; fn = arguments[i++];) {
    let uploadObj = fn();
    if (uploadObj !== false) {
      return uploadObj;
    }
  };
}

let uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUpladObj);
```

重构代码之后，我们可以看到，获取不同上传对象的方法被隔离在各自的函数里互不干扰， try、catch 和 if 分支不再纠缠在一起，使得我们可以很方便地的维护和扩展代码。比如，后来 我们又给上传项目增加了 Webkit 控件上传和 HTML5 上传，我们要做的仅仅是下面一些工作。

### 小结

迭代器模式是一种相对简单的模式，简单到很多人都不认可它是一种设计模式。目前绝大部分语言都内置了迭代器。

## 五、 发布-订阅模式

发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状 态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型 来替代传统的发布—订阅模式。

### 现实中的发布-订阅模式

不论是在程序世界里还是现实生活中，发布—订阅模式的应用都非常之广泛。我们先看一个

现实中的例子。

小明最近看上了一套房子，到了售楼处之后才被告知，该楼盘的房子早已售罄。好在售楼 MM 告诉小明，不久后还有一些尾盘推出，开发商正在办理相关手续，手续办好后便可以购买。 但到底是什么时候，目前还没有人能够知道。

于是小明记下了售楼处的电话，以后每天都会打电话过去询问是不是已经到了购买时间。除 了小明，还有小红、小强、小龙也会每天向售楼处咨询这个问题。一个星期过后，售楼 MM 决 定辞职，因为厌倦了每天回答 1000 个相同内容的电话。

当然现实中没有这么笨的销售公司，实际上故事是这样的:小明离开之前，把电话号码留在 了售楼处。售楼 MM 答应他，新楼盘一推出就马上发信息通知小明。小红、小强和小龙也是一 样，他们的电话号码都被记在售楼处的花名册上，新楼盘推出的时候，售楼 MM 会翻开花名册， 遍历上面的电话号码，依次发送一条短信来通知他们。

### 发布-订阅模式的作用

在刚刚的例子中，发送短信通知就是一个典型的发布—订阅模式，小明、小红等购买者都是 订阅者，他们订阅了房子开售的消息。售楼处作为发布者，会在合适的时候遍历花名册上的电话 号码，依次给购房者发布消息。

可以发现，在这个例子中使用发布—订阅模式有着显而易见的优点。

* 购房者不用再天天给售楼处打电话咨询开售时间，在合适的时间点，售楼处作为发布者 会通知这些消息订阅者。
* 购房者和售楼处之间不再强耦合在一起，当有新的购房者出现时，他只需把手机号码留 在售楼处，售楼处不关心购房者的任何情况，不管购房者是男是女还是一只猴子。 而售 楼处的任何变动也不会影响购买者，比如售楼 MM 离职，售楼处从一楼搬到二楼，这些 改变都跟购房者无关，只要售楼处记得发短信这件事情。

第一点说明发布—订阅模式可以广泛应用于异步编程中，这是一种替代传递回调函数的方案。比如，我们可以订阅 ajax 请求的 error、succ 等事件。 或者如果想在动画的每一帧完成之后做一 些事情，那我们可以订阅一个事件，然后在动画的每一帧完成之后发布这个事件。在异步编程中 使用发布—订阅模式，我们就无需过多关注对象在异步运行期间的内部状态，而只需要订阅感兴 趣的事件发生点。

```javascript
let saleOffices = {}  // 定义售楼处
saleOffices.clientList = [] // 缓存列表，存放订阅者的回调函数

// 添加订阅者
saleOffices.listen = function(fn){
  this.clientList.push(fn) // 订阅的消息添加进缓存列表
}

// 发布消息
saleOffices.trigger = function(){
  for(let i=0,fn; fn = this.clientList[ i++ ]){
    fn.apply(this,arguments); // arguments是发布消息时带上的参数
  }
}
```

下面我们进行一些简单的测试

```javascript
// 小明订阅消息
saleOffices.listen(function(price,squareMeter){
  console.log('价格=' + price)
  console.log('squareMetter=' + squareMetter)
})

// 小红订阅消息
saleOffices.listen(function(price,squareMeter){
  console.log('价格=' + price)
  console.log('squareMetter=' + squareMetter)
})

saleOffices.trigger(2000000,88)  // 输出：220万，88平方米
saleOffices.trigger(3000000,110)  // 输出：300万，110平方米
```

至此，我们已经实现了一个最简单的发布—订阅模式。

其实在现实中，买房子未必要亲自去售楼处，我们只要把订阅的请求交给中介公司，而各大 房产公司也只需要通过中介公司来发布房子信息。这样一来，我们不用关心消息是来自哪个房产 公司，我们在意的是能否顺利收到消息。当然，为了保证订阅者和发布者能顺利通信，订阅者和 发布者都必须知道这个中介公司。

同样在程序中，发布—订阅模式可以用一个全局的 Event 对象来实现，订阅者不需要了解消 息来自哪个发布者，发布者也不知道消息会推送给哪些订阅者，Event 作为一个类似“中介者” 的角色，把订阅者和发布者联系起来。见如下代码:

```javascript
class Event {
  constructor() {
    this.clientList = {}
  }

  listen = function (key, fn) {  // 订阅者
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  }

  trigger = function () {  // 发布者
    let key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false
    }

    // 匹配对应的订阅者需要返回的参数信息
    for (const fn of fns) {
      fn.apply(this, arguments);
    }
  }

  remove = function (key, fn) {  // 移除发布信息
    let fns = this.clientList[key];
    if (!fns) {
      return false
    }

    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let l = fns.length - 1; l >= 0; l--) {
        let _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
    return {
      listen,
      trigger,
      remove
    }
  }
}

let event = new Event()

event.listen('squareMeter88', function (price) {
  console.log('价格= ' + price); // 第一次输出：价格= 2000000   第二次输出：价格= 30000000
})

event.trigger('squareMeter88', 2000000) // 售楼处发布价格
event.trigger('squareMeter88', 3000000) // 售楼处更新消息
```

上面的案例相对于抽象，其实我们日常当中很多库都用到了订阅发布模式(观察者模式)，比如我学习Angular的时候就用到了`Rx.js`。当使用` HttpClient`请求数据的时候，将请求过程放在观察者`Observer`中，当有需要调用请求结果信息的时候则使用订阅者`subscriber`来执行。这是一个典型的订阅发布模式。另外，我们平时使用Vue框架进行组件开发经常需要将组件拆分，把一些重复性的的视图快封装成字组件，而子组件需要和组件进行通信，这时候就需要用到Vue自带的`emit`和`on`指令进行订阅和发布，我们可以看下们的例子，简单的介绍了`emit`和`on`之间的订阅与发布行为。

```javascript
// 简单的订阅发布
class Event {
  constructor() {
    // 存储事件
    this.callbacks = {}
  }

  // 监听-发布者
  $on(name, fn) {
    if (!this.callbacks[name]) {
      this.callbacks[name] = []
    }
    this.callbacks[name].push(fn)
  }

  // 触发-订阅者
  $emit(name, ...args) {
    let fns = this.callbacks[name]
    if (fns) {
      for (const fn of fns) {
        fn.call(this, ...args)
      }

    }
  }

  // 关闭
  $off(name) {
    this.callbacks[name] = null
  }
}

let event = new Event()
event.$on('props1', function () {
  console.log('事件1', ...arguments) // 事件1 参数1 参数2 参数3
})
event.$on('props2', function (args) {
  console.log('事件2', args) // 事件2 我是事件2
})

event.$emit('props1', "参数1","参数2","参数3")
event.$emit('props2', "我是事件2")
```

### 小结

本章我们学习了发布—订阅模式，也就是常说的观察者模式。发布—订阅模式在实际开发中非

常有用。

发布—订阅模式的优点非常明显，一为时间上的解耦，二为对象之间的解耦。它的应用非常 广泛，既可以用在异步编程中，也可以帮助我们完成更松耦合的代码编写。发布—订阅模式还可 以用来帮助实现一些别的设计模式，比如中介者模式。从架构上来看，无论是 MVC 还是 MVVM， 都少不了发布—订阅模式的参与，而且 JavaScript 本身也是一门基于事件驱动的语言。

当然，发布—订阅模式也不是完全没有缺点。创建订阅者本身要消耗一定的时间和内存，而 且当你订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中。另外， 发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联 系也将被深埋在背后，会导致程序难以跟踪维护和理解。特别是有多个发布者和订阅者嵌套到一 起的时候，要跟踪一个 bug 不是件轻松的事情。

## 六、命令模式

假设有一个快餐店，而我是该餐厅的点餐服务员，那么我一天的工作应该是这样的:当某位 5 客人点餐或者打来订餐电话后，我会把他的需求都写在清单上，然后交给厨房，客人不用关心是

哪些厨师帮他炒菜。我们餐厅还可以满足客人需要的定时服务，比如客人可能当前正在回家的路 上，要求 1 个小时后才开始炒他的菜，只要订单还在，厨师就不会忘记。客人也可以很方便地打 电话来撤销订单。另外如果有太多的客人点餐，厨房可以按照订单的顺序排队炒菜。

这些记录着订餐信息的清单，便是命令模式中的命令对象。

### 命令模式的用途

命令模式是最简单和优雅的模式之一，命令模式中的命令(command)指的是一个执行某些特定事情的指令。

命令模式最常用的场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收 者是谁，也不知道被请求的操作是什么。此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。

那我们平时开发来说，创建一个vue项目需要使用到vue cli脚手架，当我们在终端输入`vue create hello-world`即可快速的创建一个项目，而在创建项目过程中经历了些什么，计算机底层是什么计算的，这些我们完全不需要了解。我们只需要明确的告诉计算我要创建一个vue项目，项目名称叫做`hello-world`就可以了。

假设在一个布满了智能家电的房子里，智能设备可以通过手机控制开启和关闭，用代码实现如下:

```javascript
let house = {
 	openTv:function(){
    console.log("打开电视")
  },
  closeTv:function(){
    console.log("关闭电视")
  },
  openDoor:function(){
    console.log("打开门")
  },
  closeDoor:function(){
    console.log("关闭门")
  }
}

let person1 = function(){
  house.openDoor() // 使用命令打开门
}

let person2 = function(){
  house.openTv() // 使用命里打开电视
}
```

### 宏命令

宏命令是一组命令的集合，通过执行宏命令的方式，可以一次执行一批命令。想象一下，家 里有一个万能遥控器，每天回家的时候，只要按一个特别的按钮，它就会帮我们关上房间门，顺 便打开电脑并登录 QQ。

下面我们看看如何逐步创建一个宏命令。

```javascript
let closeDoor = {
  execute:function(){
    console.log("关门")
  }
}

let openTv = {
  execute:function(){
    console.log("打开电视")
  }
}

let loginQQ = {
  execute:function(){
    console.log("登录QQ")
  }
}
```

接下来定义宏命令 MacroCommand，它的结构也很简单。macroCommand.add 方法表示把子命令添加进宏命令对象，当调用宏命令对象的 execute 方法时，会迭代这一组子命令对象，并且依次执 行它们的 execute 方法:

```javascript
let MacroCommand = function(){
  return {
    commandsList:[],
    add:function(command){
      this.commandsList.push(command);
    },
    execute:function(){
      for(const command of this.commandsList){
        command.execute()
      }
    }
  }
}

let macroCommand = MacroCommand()

macroCommand.add(closeDoor)
macroCommand.add(openTv)
macroCommand.add(loginQQ)

macroCommand.execute()
```

宏命令是命令模式与组合模式的联用产物，关于组合模式的知识，下一章就专门讲组合模式。

### 小结

命令模式可以在一定层面上简化了使用的便利性，只需要一行代码就可以执行很多程序。命令模式在生活应用中非常常见，只是我们没有一个统称来描述这些东西，通过本章的学习，我们就应该知道，这些快捷的方式叫做命令模式。

## 七、组合模式

我们在上一章命令模式中讲解过宏命令的结构和作用。宏命令对象包含了一组具体的子命令 对象，不管是宏命令对象，还是子命令对象，都有一个 execute 方法负责执行命令。它们组成了一个树形结 构，这里是一棵结构非常简单的树。

```javascript
let closeDoor = {
  execute:function(){
    console.log("关门")
  }
}

let openTv = {
  execute:function(){
    console.log("打开电视")
  }
}

let loginQQ = {
  execute:function(){
    console.log("登录QQ")
  }
}

let MacroCommand = function(){
  return {
    commandsList:[],
    add:function(command){
      this.commandsList.push(command);
    },
    execute:function(){
      for(const command of this.commandsList){
        command.execute()
      }
    }
  }
}

let macroCommand = MacroCommand()

macroCommand.add(closeDoor)
macroCommand.add(openTv)
macroCommand.add(loginQQ)

macroCommand.execute()
```

其中，`marcoCommand` 被称为组合对象，`closeDoorCommand`、`openPcCommand`、`openQQCommand` 都是 叶对象。在 `macroCommand` 的 `execute` 方法里，并不执行真正的操作，而是遍历它所包含的叶对象， 把真正的 `execute` 请求委托给这些叶对象。

`macroCommand` 表现得像一个命令，但它实际上只是一组真正命令的“代理”。并非真正的代理， 虽然结构上相似，但 `macroCommand` 只负责传递请求给叶对象，它的目的不在于控制对叶对象的访问。

### 组合模式的用途

组合模式将对象组合成树形结构，以表示“部分整体”的层次结构。 除了用来表示树形结 构之外，组合模式的另一个好处是通过对象的多态性表现，使得用户对单个对象和组合对象的使 用具有一致性，下面分别说明。

* 表示树形结构。通过回顾上面的例子，我们很容易找到组合模式的一个优点:提供了一 种遍历树形结构的方案，通过调用组合对象的 execute 方法，程序会递归调用组合对象下 面的叶对象的 execute 方法，所以我们的万能遥控器只需要一次操作，便能依次完成关门、 打开电脑、登录 QQ 这几件事情。组合模式可以非常方便地描述对象部分整体层次结构。
* 利用对象多态性统一对待组合对象和单个对象。利用对象的多态性表现，可以使客户端 忽略组合对象和单个对象的不同。在组合模式中，客户将统一地使用组合结构中的所有 对象，而不需要关心它究竟是组合对象还是单个对象。

这在实际开发中会给客户带来相当大的便利性，当我们往万能遥控器里面添加一个命令的时 候，并不关心这个命令是宏命令还是普通子命令。这点对于我们不重要，我们只需要确定它是一 个命令，并且这个命令拥有可执行的 execute 方法，那么这个命令就可以被添加进万能遥控器。

当宏命令和普通子命令接收到执行 execute 方法的请求时，宏命令和普通子命令都会做它们 各自认为正确的事情。这些差异是隐藏在客户背后的，在客户看来，这种透明性可以让我们非常 自由地扩展这个万能遥控器。

### 更强大的宏命令:万能遥控器

首先在节点中放置一个按钮 button 来表示这个超级万能遥控器，超级万能遥控器上安装了一 个宏命令，当执行这个宏命令时，会依次遍历执行它所包含的子命令，代码如下:

```html
<html> 
  <body>
		<button id="button">按我</button>
   </body>
	<script>
  	let MacroCommand = function(){
      return {
        commandsList:[],
        add:function(command){
          this.commandsList.push(command);
        },
        execute:function(){
          for(const command of this.commandsList){
            command.execute()
          }
        }
      }
    }
    
    let openAcCommand = { 
      execute: function(){
				console.log( '打开空调' ); 
      }
		};

    /******
    *家里的电视和音响是连接在一起的，
    *所以可以用一个宏命令
    *来组合打开电视和打开音响的命令
    *******/
    let openTvCommand = { 
       execute: function(){
  			console.log( '打开电视' ); 
       }
  	};
    
    let openSoundCommand = {
      execute:function(){
        console.log("打开音响")
      }
    }
    
    let macroCommand1 = MacroCommand();
		macroCommand1.add(openTvCommand);
		macroCommand1.add(openSoundCommand);
    
    /*********关门、打开电脑和打登录 QQ 的命令****************/
    let closeDoorCommand = {
      execute: function () {
        console.log('关门');
      }
    };

    let openPcCommand = {
      execute: function () {
        console.log('开电脑');
      }
    }

    let openQQCommand = {
      execute: function () {
        console.log('登录 QQ');
      }
    };

    let macroCommand2 = MacroCommand();
    macroCommand2.add(closeDoorCommand);
    macroCommand2.add(openPcCommand);
    macroCommand2.add(openQQCommand);
    
    /*********现在把所有的命令组合成一个“超级命令”**********/
    let macroCommand = MacroCommand(); 
    macroCommand.add( openAcCommand ); 
    macroCommand.add( macroCommand1 ); 
    macroCommand.add( macroCommand2 );
    
    /*********最后给遥控器绑定“超级命令”**********/
     let setCommand = (function (command) {
      document.getElementById('button').onclick = function () {
        command.execute();
      }
    })(macroCommand);

  </script>
</html>
```

当按下遥控器的按钮时，所有命令都将被依次执行

```javascript
// 输出如下
// 打开空调
// 打开电视
// 打开音响
// 关门
// 开电脑
// 登陆QQ
```

从这个例子中可以看到，基本对象可以被组合成更复杂的组合对象，组合对象又可以被组合， 这样不断递归下去，这棵树的结构可以支持任意多的复杂度。在树最终被构造完成之后，让整颗 树最终运转起来的步骤非常简单，只需要调用最上层对象的 execute 方法。每当对最上层的对象 进行一次请求时，实际上是在对整个树进行深度优先的搜索，而创建组合对象的程序员并不关心 这些内在的细节，往这棵树里面添加一些新的节点对象是非常容易的事情。

### 组合模式的例子——扫描文件夹

文件夹和文件之间的关系，非常适合用组合模式来描述。文件夹里既可以包含文件，又可以 包含其他文件夹，最终可能组合成一棵树，组合模式在文件夹的应用中有以下两层好处。

* 例如，我在同事的移动硬盘里找到了一些电子书，想把它们复制到 F 盘中的学习资料文 件夹。在复制这些电子书的时候，我并不需要考虑这批文件的类型，不管它们是单独的 电子书还是被放在了文件夹中。组合模式让 Ctrl+V、Ctrl+C 成为了一个统一的操作。
* 当我用杀毒软件扫描该文件夹时，往往不会关心里面有多少文件和子文件夹，组合模式 使得我们只需要操作最外层的文件夹进行扫描。

现在我们来编写代码，首先分别定义好文件夹 Folder 和文件 File 这两个类。见如下代码:

```javascript
/**********Folder**********/
let Folder = function(nane){
  this.name = name;
  this.files = []
}

Folder.prototype.add = function(file){
  this.files.push(file)
}

Folder.prototype.scan = function(){
  console.log('开始扫描文件夹: '+ this.name)
  for(const file of this.files){
    file.scan()
  }
}

/************File******************/
let File = function(name){
  this.name = name;
}

File.prototype.add = function(){
  throw new Error("文件下面不能再添加文件")
}

File.prototype.scan = function(){
  console.log('开始扫描文件: '+ this.name)
}
```

接下来创建一些文件夹和文件对象， 并且让它们组合成一棵树，这棵树就是我们 F 盘里的 现有文件目录结构:

```javascript
let folder = new Folder('学习资料');
let folder1 = new Folder('JavaScript');
let folder2 = new Folder('jQuery');

let file1 = new File('JavaScript 设计模式与开发实践');
let file2 = new File('精通 jQuery')
let file3 = new File('重构与模式')

folder1.add(file1); folder2.add(file2);
folder.add(folder1); folder.add(folder2); folder.add(file3);
```

现在的需求是把移动硬盘里的文件和文件夹都复制到这棵树中，假设我们已经得到了这些文 件对象:

```javascript
let folder3 = new Folder( 'Nodejs' );
let file4 = new File( '深入浅出 Node.js' ); 

folder3.add( file4 );

let file5 = new File( 'JavaScript 语言精髓与编程实践' );
```

接下来就是把这些文件都添加到原有的树中:

```javascript
folder.add(folder3)
folder.add(file5)
```

通过这个例子，我们再次看到客户是如何同等对待组合对象和叶对象。在添加一批文件的操 作过程中，客户不用分辨它们到底是文件还是文件夹。新增加的文件和文件夹能够很容易地添加 到原来的树结构中，和树里已有的对象一起工作。

我们改变了树的结构，增加了新的数据，却不用修改任何一句原有的代码，这是符合开放- 封闭原则的。

运用了组合模式之后，扫描整个文件夹的操作也是轻而易举的，我们只需要操作树的最顶端 对象`folder.scan()`，最后输入内容如下：

```markdown
开始扫描文件夹:
开始扫描文件夹:
开始扫描文件: JavaScript 设计模式与开发实践
开始扫描文件夹:
开始扫描文件: 精通 jQuery
开始扫描文件: 重构与模式
开始扫描文件夹:
开始扫描文件: 深入浅出 Node.js
开始扫描文件: JavaScript 语言精髓与编程实践
```

### 一些值得注意的地方

在使用组合模式的时候，还有以下几个值得我们注意的地方。

1. **组合模式不是父子关系**

   组合模式的树型结构容易让人误以为组合对象和叶对象是父子关系，这是不正确的。

   组合模式是一种 HAS-A(聚合)的关系，而不是 IS-A。组合对象包含一组叶对象，但 Leaf 并不是 Composite 的子类。组合对象把请求委托给它所包含的所有叶对象，它们能够合作的关键 7 是拥有相同的接口。

   为了方便描述，本章有时候把上下级对象称为父子节点，但大家要知道，它们并非真正意义 上的父子关系。

2. **对叶对象操作的一致性**

   组合模式除了要求组合对象和叶对象拥有相同的接口之外，还有一个必要条件，就是对一组叶对象的操作必须具有一致性。

   比如公司要给全体员工发放元旦的过节费 1000 块，这个场景可以运用组合模式，但如果公 司给今天过生日的员工发送一封生日祝福的邮件，组合模式在这里就没有用武之地了，除非先把 今天过生日的员工挑选出来。只有用一致的方式对待列表中的每个叶对象的时候，才适合使用组 合模式。

3. **双向映射关系**

   发放过节费的通知步骤是从公司到各个部门，再到各个小组，最后到每个员工的邮箱里。这 本身是一个组合模式的好例子，但要考虑的一种情况是，也许某些员工属于多个组织架构。比如 某位架构师既隶属于开发组，又隶属于架构组，对象之间的关系并不是严格意义上的层次结构， 在这种情况下，是不适合使用组合模式的，该架构师很可能会收到两份过节费。

   这种复合情况下我们必须给父节点和子节点建立双向映射关系，一个简单的方法是给小组和员 工对象都增加集合来保存对方的引用。但是这种相互间的引用相当复杂，而且对象之间产生了过多 的耦合性，修改或者删除一个对象都变得困难，此时我们可以引入中介者模式来管理这些对象。

4. **用职责链模式提高组合模式性能**

   在组合模式中，如果树的结构比较复杂，节点数量很多，在遍历树的过程中，性能方面也许 表现得不够理想。有时候我们确实可以借助一些技巧，在实际操作中避免遍历整棵树，有一种现 成的方案是借助职责链模式。职责链模式一般需要我们手动去设置链条，但在组合模式中，父对 象和子对象之间实际上形成了天然的职责链。让请求顺着链条从父对象往子对象传递，或者是反 过来从子对象往父对象传递，直到遇到可以处理该请求的对象为止，这也是职责链模式的经典运 用场景之一。

### 何时使用组合模式

组合模式如果运用得当，可以大大简化客户的代码。一般来说，组合模式适用于以下这两种情况。

* 表示对象的部分整体层次结构。组合模式可以方便地构造一棵树来表示对象的部分整 体结构。特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在树的构造最 终完成之后，只需要通过请求树的最顶层对象，便能对整棵树做统一的操作。在组合模 式中增加和删除树的节点非常方便，并且符合开放封闭原则。
* 客户希望统一对待树中的所有对象。组合模式使客户可以忽略组合对象和叶对象的区别， 客户在面对这棵树的时候，不用关心当前正在处理的对象是组合对象还是叶对象，也就 不用写一堆 if、else 语句来分别处理它们。组合对象和叶对象会各自做自己正确的事情， 这是组合模式最重要的能力。

### 小结

本章我们了解了组合模式在 JavaScript 开发中的应用。组合模式可以让我们使用树形方式创 建对象的结构。我们可以把相同的操作应用在组合对象和单个对象上。在大多数情况下，我们都 可以忽略掉组合对象和单个对象之间的差别，从而用一致的方式来处理它们。

然而，组合模式并不是完美的，它可能会产生一个这样的系统:系统中的每个对象看起来都 与其他对象差不多。它们的区别只有在运行的时候会才会显现出来，这会使代码难以理解。此外， 如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起。

## 八、 模板方法模式

基于继承的设计模式——模板方法(Template Method)。

### 模板方法模式的定义和组成

模板方法模式是一种只需使用继承就可以实现的非常简单的模式。

模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。通常 在抽象父类中封装了子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺 序。子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。

假如我们有一些平行的子类，各个子类之间有一些相同的行为，也有一些不同的行为。如果 相同和不同的行为都混合在各个子类的实现中，说明这些相同的行为会在各个子类中重复出现。 但实际上，相同的行为可以被搬移到另外一个单一的地方，模板方法模式就是为解决这个问题而 生的。在模板方法模式中，子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来 实现。这也很好地体现了泛化的思想。

### 第一个例子——CoffeeorTea

咖啡与茶是一个经典的例子，经常用来讲解模板方法模式，这个例子的原型来自《Head First设计模式》。这一节我们就用 JavaScript 来实现这个例子。

#### 先泡一杯咖啡首先，我们先来泡一杯咖啡，如果没有什么太个性化的需求，泡咖啡的步骤通常如下:

(1) 把水煮沸

(2) 用沸水冲泡咖啡

(3) 把咖啡倒进杯子 

(4) 加糖和牛奶

通过下面这段代码，我们就能得到一杯香浓的咖啡:

```javascript
let Coffee = function () { };
Coffee.prototype.boilWater = function () {
  console.log('把水煮沸');
};

Coffee.prototype.brewCoffeeGriends = function () {
  console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function () {
  console.log('把咖啡倒进杯子');
};

Coffee.prototype.addSugarAndMilk = function () {
  console.log('加糖和牛奶');
};

Coffee.prototype.init = function () {
  this.boilWater(); 
  this.brewCoffeeGriends(); 
  this.pourInCup(); 
  this.addSugarAndMilk();
};

let coffee = new Coffee();
coffee.init();
```

#### 泡一壶茶

接下来，开始准备我们的茶，泡茶的步骤跟泡咖啡的步骤相差并不大:

(1) 把水煮沸

(2) 用沸水浸泡茶叶 

(3) 把茶水倒进杯子

(4) 加柠檬

同样用一段代码来实现泡茶的步骤:

```javascript
let coffee = new Coffee();
coffee.init();

let Tea = function () { };
Tea.prototype.boilWater = function () {
  console.log('把水煮沸');
};
Tea.prototype.steepTeaBag = function () {
  console.log('用沸水浸泡茶叶');
};
Tea.prototype.pourInCup = function () {
  console.log('把茶水倒进杯子');
};
Tea.prototype.addLemon = function () {
  console.log('加柠檬');
};

Tea.prototype.init = function () {
  this.boilWater();
  this.steepTeaBag();
  this.pourInCup();
  this.addLemon();
};
let tea = new Tea(); tea.init();
```

### 分离出共同点

现在我们分别泡好了一杯咖啡和一壶茶，经过思考和比较，我们发现咖啡和茶的冲泡过程是大同小异的。

| 泡咖啡         | 泡茶           |
| -------------- | -------------- |
| 把水煮沸       | 把水煮沸       |
| 用沸水冲泡咖啡 | 用沸水浸泡茶叶 |
| 把咖啡倒进杯子 | 把茶水倒进杯子 |
| 加糖和牛奶     | 加柠檬         |

我们找到泡咖啡和泡茶主要有以下不同点。

* 原料不同。一个是咖啡，一个是茶，但我们可以把它们都抽象为“饮料”。
* 泡的方式不同。咖啡是冲泡，而茶叶是浸泡，我们可以把它们都抽象为“泡”。
* 加入的调料不同。一个是糖和牛奶，一个是柠檬，但我们可以把它们都抽象为“调料”。

经过抽象之后，不管是泡咖啡还是泡茶，我们都能整理为下面四步:

(1) 把水煮沸

(2) 用沸水冲泡饮料

(3) 把饮料倒进杯子

(4) 加调料

所以，不管是冲泡还是浸泡，我们都能给它一个新的方法名称，比如说 brew()。同理，不管 是加糖和牛奶，还是加柠檬，我们都可以称之为 addCondiments()。

让我们忘记最开始创建的 Coffee 类和 Tea 类。 现在可以创建一个抽象父类来表示泡一杯饮 料的整个过程。不论是 Coffee，还是 Tea，都被我们用 Beverage 来表示，代码如下:

```javascript
let Beverage = function () { };
Beverage.prototype.boilWater = function () {
  console.log('把水煮沸');
};

Beverage.prototype.brew = function () { };

Beverage.prototype.pourInCup = function () { };

Beverage.prototype.addCondiments = function () { };
Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
};
```

#### 创建Coffee子类和Tea子类

现在创建一个 Beverage 类的对象对我们来说没有意义，因为世界上能喝的东西没有一种真正 叫“饮料”的，饮料在这里还只是一个抽象的存在。接下来我们要创建咖啡类和茶类，并让它们 继承饮料类:

```javascript
let Coffee = function(){};

Coffee.prototype = new Beverage();
```

接下来要重写抽象父类中的一些方法，只有“把水煮沸”这个行为可以直接使用父类 Beverage 中的 boilWater 方法，其他方法都需要在 Coffee 子类中重写，代码如下:

```javascript
Coffee.prototype.brew = function () {
  console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function () {
  console.log('把咖啡倒进杯子');
};

Coffee.prototype.addCondiments = function () {
  console.log('加糖和牛奶');
};

let Coffee = new Coffee(); Coffee.init();
```

至此我们的 Coffee 类已经完成了，当调用 coffee 对象的 init 方法时，由于 coffee 对象和 Coffee 构造器的原型 prototype 上都没有对应的 init 方法，所以该请求会顺着原型链，被委托给 Coffee 的“父类”Beverage 原型上的 init 方法。

而 Beverage.prototype.init 方法中已经规定好了泡饮料的顺序，所以我们能成功地泡出一杯 咖啡，代码如下:

```javascript
Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup(); this.addCondiments();
};
```

接下来照葫芦画瓢，来创建我们的 Tea 类:

```javascript
let Tea = function(){};

Tea.prototype = new Beverage();

Tea.prototype.brew = function(){
  console.log("用沸水浸泡茶叶")
}

Tea.prototype.pourInCup = function(){
  console.log("把茶倒进杯子")
}

Tea.prototype.addCondiments = function(){
  console.log("加柠檬")
}

let tea = new Tea()
tea.init()
```

本章一直讨论的是模板方法模式，那么在上面的例子中，到底谁才是所谓的模板方法呢?答 案是 Beverage.prototype.init。

Beverage.prototype.init 被称为模板方法的原因是，该方法中封装了子类的算法框架，它作 为一个算法的模板，指导子类以何种顺序去执行哪些方法。在 Beverage.prototype.init 方法中， 算法内的每一个步骤都清楚地展示在我们眼前。

### 模板方法模式的使用场景

从大的方面来讲，模板方法模式常被架构师用于搭建项目的框架，架构师定好了框架的骨架， 程序员继承框架的结构之后，负责往里面填空，比如 Java 程序员大多使用过 HttpServlet 技术来 开发项目。

一个基于 HttpServlet 的程序包含 7 个生命周期，这 7 个生命周期分别对应一个 do 方法。

```java
doGet() 
doHead() 
doPost()
doPut() 
doDelete() 
doOption() 
doTrace()
```

HttpServlet 类还提供了一个 service 方法，它就是这里的模板方法，service 规定了这些 do 方法的执行顺序，而这些 do 方法的具体实现则需要 HttpServlet 的子类来提供。

在 Web 开发中也能找到很多模板方法模式的适用场景，比如我们在构建一系列的 UI 组件， 这些组件的构建过程一般如下所示:

(1) 初始化一个 div 容器;

 (2) 通过 ajax 请求拉取相应的数据;

 (3) 把数据渲染到 div 容器里面，完成组件的构造; 

(4) 通知用户组件渲染完毕。

我们看到，任何组件的构建都遵循上面的 4 步，其中第(1)步和第(4)步是相同的。第(2)步不 同的地方只是请求 ajax 的远程地址，第(3)步不同的地方是渲染数据的方式。

于是我们可以把这 4 个步骤都抽象到父类的模板方法里面，父类中还可以顺便提供第(1)步和 第(4)步的具体实现。当子类继承这个父类之后，会重写模板方法里面的第(2)步和第(3)步。

### 钩子方法

通过模板方法模式，我们在父类中封装了子类的算法框架。这些算法框架在正常状态下是适 用于大多数子类的，但如果有一些特别“个性”的子类呢?比如我们在饮料类 Beverage 中封装了 饮料的冲泡顺序:

(1) 把水煮沸

(2) 用沸水冲泡饮料 

(3) 把饮料倒进杯子 

(4) 加调料

这 4 个冲泡饮料的步骤适用于咖啡和茶，在我们的饮料店里，根据这 4 个步骤制作出来的咖 啡和茶，一直顺利地提供给绝大部分客人享用。但有一些客人喝咖啡是不加调料(糖和牛奶)的。 既然 Beverage 作为父类，已经规定好了冲泡饮料的 4 个步骤，那么有什么办法可以让子类不受这 个约束呢?

钩子方法(hook)可以用来解决这个问题，放置钩子是隔离变化的一种常见手段。我们在父 类中容易变化的地方放置钩子，钩子可以有一个默认的实现，究竟要不要“挂钩”，这由子类自 行决定。钩子方法的返回结果决定了模板方法后面部分的执行步骤，也就是程序接下来的走向，这样一来，程序就拥有了变化的可能。

在这个例子里，我们把挂钩的名字定为 customerWantsCondiments，接下来将挂钩放入 Beverage 类，看看我们如何得到一杯不需要糖和牛奶的咖啡，代码如下:

```javascript
let Beverage = function () { };
Beverage.prototype.boilWater = function () {
  console.log('把水煮沸');
};

Beverage.prototype.brew = function () {
  throw new Error('子类必须重写 brew 方法');
};

Beverage.prototype.pourInCup = function () {
  throw new Error('子类必须重写 pourInCup 方法');
};

Beverage.prototype.addCondiments = function () {
  throw new Error('子类必须重写 addCondiments 方法');
};

Beverage.prototype.customerWantsCondiments = function () {
  return true; // 默认需要调料
}

Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();
  if (this.customerWantsCondiments()) {  // 如果挂钩返回 true，则需要调料
    this.addCondiments();
  }
};

let CoffeeWithHook = function () { };

CoffeeWithHook.prototype = new Beverage();
CoffeeWithHook.prototype.brew = function () {
  console.log('用沸水冲泡咖啡');
}

CoffeeWithHook.prototype.pourInCup = function () {
  console.log('把咖啡倒进杯子');
};

CoffeeWithHook.prototype.addCondiments = function () {
  console.log('加糖和牛奶');
};

CoffeeWithHook.prototype.customerWantsCondiments = function () {
  return window.confirm('请问需要调料吗?');
};
let coffeeWithHook = new CoffeeWithHook(); coffeeWithHook.init();
```

### 好莱坞原则

学习完模板方法模式之后，我们要引入一个新的设计原则——著名的“好莱坞原则”。

好莱坞无疑是演员的天堂，但好莱坞也有很多找不到工作的新人演员，许多新人演员在好莱 坞把简历递给演艺公司之后就只有回家等待电话。有时候该演员等得不耐烦了，给演艺公司打电 话询问情况，演艺公司往往这样回答:“不要来找我，我会给你打电话。”

在设计中，这样的规则就称为好莱坞原则。在这一原则的指导下，我们允许底层组件将自己 挂钩到高层组件中，而高层组件会决定什么时候、以何种方式去使用这些底层组件，高层组件对 待底层组件的方式，跟演艺公司对待新人演员一样，都是“别调用我们，我们会调用你”。

模板方法模式是好莱坞原则的一个典型使用场景，它与好莱坞原则的联系非常明显，当我们 用模板方法模式编写一个程序时，就意味着子类放弃了对自己的控制权，而是改为父类通知子类， 哪些方法应该在什么时候被调用。作为子类，只负责提供一些设计上的细节。

除此之外，好莱坞原则还常常应用于其他模式和场景，例如发布订阅模式和回调函数。

* **发布—订阅模式**

  在发布—订阅模式中，发布者会把消息推送给订阅者，这取代了原先不断去 fetch 消息的形式。 例如假设我们乘坐出租车去一个不了解的地方，除了每过 5 秒钟就问司机“是否到达目的地”之 外，还可以在车上美美地睡上一觉，然后跟司机说好，等目的地到了就叫醒你。这也相当于好莱 坞原则中提到的“别调用我们，我们会调用你”。

*  **回调函数**

  在 ajax 异步请求中，由于不知道请求返回的具体时间，而通过轮询去判断是否返回数据，这 显然是不理智的行为。所以我们通常会把接下来的操作放在回调函数中，传入发起 ajax 异步请求 的函数。当数据返回之后，这个回调函数才被执行，这也是好莱坞原则的一种体现。把需要执行 的操作封装在回调函数里，然后把主动权交给另外一个函数。至于回调函数什么时候被执行，则 是另外一个函数控制的。

在好莱坞原则的指导之下，下面这段代码可以达到和继承一样的效果。

```javascript
let Beverage = function (param) {
  let boilWater = function () {
    console.log('把水煮沸');
  };

  let brew = param.brew || function () {
    throw new Error('必须传递 brew 方法');
  };
  let pourInCup = param.pourInCup || function () {
    throw new Error('必须传递 pourInCup 方法');
  };
  let addCondiments = param.addCondiments || function () {
    throw new Error('必须传递 addCondiments 方法');
  };

  let F = function () { };
  F.prototype.init = function () {
    boilWater();

    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};

let Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡');
  },
  pourInCup: function () {
    console.log('把咖啡倒进杯子');
  },
  addCondiments: function () {
    console.log('加糖和牛奶');
  }
});

let Tea = Beverage({
  brew: function () {
    console.log('用沸水浸泡茶叶');
  },
  pourInCup: function () {
    console.log('把茶倒进杯子');
  },

  addCondiments: function () {
    console.log('加柠檬');
  }
});

coffee = new Coffee();
let tea = coffee.init();
let tea = new Tea(); tea.init();
```

输出结果:

```markdown
把水煮沸
用沸水冲泡咖啡
把咖啡倒进杯子
加糖和牛奶
把水煮沸
用沸水浸泡茶叶
把茶倒进杯子
加柠檬
```

在这段代码中，我们把 brew、pourInCup、addCondiments 这些方法依次传入 Beverage 函数， Beverage 函数被调用之后返回构造器 F。F 类中包含了“模板方法”F.prototype.init。跟继承得 到的效果一样，该“模板方法”里依然封装了饮料子类的算法框架。

### 小结

模板方法模式是一种典型的通过封装变化提高系统扩展性的设计模式。在传统的面向对象语 言中，一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以我们把 这部分逻辑抽象到父类的模板方法里面。而子类的方法具体怎么实现则是可变的，于是我们把这 部分变化的逻辑封装到子类中。通过增加新的子类，我们便能给系统增加新的功能，并不需要改 动抽象父类以及其他子类，这也是符合开放封闭原则的。

但在 JavaScript 中，我们很多时候都不需要依样画瓢地去实现一个模版方法模式，高阶函数 是更好的选择。

## 九、享元模式

享元(flyweight)模式是一种用于性能优化的模式，“fly”在这里是苍蝇的意思，意为蝇量 5 级。享元模式的核心是运用共享技术来有效支持大量细粒度的对象。

如果系统中因为创建了大量类似的对象而导致内存占用过高，享元模式就非常有用了。在 JavaScript 中，浏览器特别是移动端的浏览器分配的内存并不算多，如何节省内存就成了一件非 常有意义的事情。

### 初识享元模式

假设有个内衣工厂，目前的产品有 50 种男式内衣和 50 种女士内衣，为了推销产品，工厂决 定生产一些塑料模特来穿上他们的内衣拍成广告照片。 正常情况下需要 50 个男模特和 50 个女 模特，然后让他们每人分别穿上一件内衣来拍照。不使用享元模式的情况下，在程序里也许会这 样写:

```javascript
class Model {
  constructor(sex,underwear){
    this.sex = sex
    this.underwear = underwear
  }
  
	takePhoto(){
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
  }
}

for(let i=1; i<=50; i++){
  let maleModel = new Model('male', 'underwear' + i)
  maleModel.takePhoto()
}

for(let i=1; i<=50; i++){
  let femaleModel = new Model('male', 'underwear' + i)
  femaleModel.takePhoto()
}
```

要得到一张照片，每次都需要传入 sex 和 underwear 参数，如上所述，现在一共有 50 种男内 衣和 50 种女内衣，所以一共会产生 100 个对象。如果将来生产了 10000 种内衣，那这个程序可 能会因为存在如此多的对象已经提前崩溃。

下面我们来考虑一下如何优化这个场景。虽然有 100 种内衣，但很显然并不需要 50 个男 模特和 50 个女模特。其实男模特和女模特各自有一个就足够了，他们可以分别穿上不同的内 衣来拍照。

现在来改写一下代码，既然只需要区别男女模特，那我们先把 underwear 参数从构造函数中 移除，构造函数只接收 sex 参数:

```javascript
class Model {
  constructor(sex) {
    this.sex = sex
  }

  takePhoto() {
    console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
  }
}

let maleModel = new Model('male')
let femaleModel = new Model('male')

for (let i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i;
  maleModel.takePhoto()
}

for (let i = 1; i <= 50; i++) {
  femaleModel.underwear = 'underwear' + i;
  femaleModel.takePhoto()
}
```

改进之后的代码，只需要两个对象便可完成同意的功能。

### 内部状态与外部状态

上面例子便是享元模式的雏形，享元模式要求将对象的属性划分为内部状态与外部 状态(状态在这里通常指属性)。享元模式的目标是尽量减少共享对象的数量，关于如何划分内 部状态和外部状态，下面的几条经验提供了一些指引。

* 内部状态存储于对象内部。
* 内部状态可以被一些对象共享
* 内部状态独立于具体的场景，通常不会改变。
* 外部状态取决于具体的场景，并根据场景而变化，外部状态不能共享。

这样一来，我们便可以把所有内部状态相同的对象都指定为同一个共享的对象。而外部状态 可以从对象身上剥离出来，并储存在外部。

剥离了外部状态的对象成为共享对象，外部状态在必要时被传入共享对象来组装成一个完整 的对象。虽然组装外部状态成为一个完整对象的过程需要花费一定的时间，但却可以大大减少系 统中的对象数量，相比之下，这点时间或许是微不足道的。因此，享元模式是一种用时间换空间 的优化模式。

在上面的例子中，性别是内部状态，内衣是外部状态，通过区分这两种状态，大大减少了系 统中的对象数量。通常来讲，内部状态有多少种组合，系统中便最多存在多少个对象，因为性别 通常只有男女两种，所以该内衣厂商最多只需要 2 个对象。

使用享元模式的关键是如何区别内部状态和外部状态。可以被对象共享的属性通常被划分为内部状态，如同不管什么样式的衣服，都可以按照性别不同，穿在同一个男模特或者女模特身上， 模特的性别就可以作为内部状态储存在共享对象的内部。而外部状态取决于具体的场景，并根据 场景而变化，就像例子中每件衣服都是不同的，它们不能被一些对象共享，因此只能被划分为外部状态。

### 享元模式的适用性

享元模式带来的好处很大程度上取决于如何使用以及何时使用，一般来说，以下情况发生时 便可以使用享元模式。

* 一个程序中使用了大量的相似对象
* 由于使用了大量对象，造成很大的内存开销
* 对象的大多数状态都可以变成为外部状态
* 剥离出对象的外部状态后，可以用相对较少的共享对象取代大量对象

### 对象池

我们在前面已经提到了 Java 中 String 的对象池，下面就来学习这种共享的技术。对象池维 护一个装载空闲对象的池子，如果需要对象的时候，不是直接 new，而是转从对象池里获取。如 果对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成它的职责之后， 再进入 池子等待被下次获取。

对象池的原理很好理解，比如我们组人手一本《JavaScript 权威指南》，从节约的角度来讲， 这并不是很划算，因为大部分时间这些书都被闲置在各自的书架上，所以我们一开始就只买一本， 或者一起建立一个小型图书馆(对象池)，需要看书的时候就从图书馆里借，看完了之后再把书 还回图书馆。如果同时有三个人要看这本书，而现在图书馆里只有两本，那我们再马上去书店买 一本放入图书馆。

对象池技术的应用非常广泛，HTTP 连接池和数据库连接池都是其代表应用。在 Web 前端开 发中，对象池使用最多的场景大概就是跟 DOM 有关的操作。很多空间和时间都消耗在了 DOM 节点上，如何避免频繁地创建和删除 DOM 节点就成了一个有意义的话题。

对象池是另外一种性能优化方案，它跟享元模式有一些相似之处，但没有分离内部状态和外 部状态这个过程。本章用享元模式完成了一个文件上传的程序，其实也可以用对象池+事件委托 来代替实现。

### 小结

享元模式是为解决性能问题而生的模式，这跟大部分模式的诞生原因都不一样。在一个存在大量相似对象的系统中，享元模式可以很好地解决大量对象带来的性能问题。

## 十、职责链模式

职责链模式的定义是:使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间 5 的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

### 现实中的职责链模式

职责链模式的例子在现实中并不难找到，以下就是两个常见的跟职责链模式有关的场景。

1. 如果早高峰能顺利挤上公交车的话，那么估计这一天都会过得很开心。因为公交车上人 实在太多了，经常上车后却找不到售票员在哪，所以只好把两块钱硬币往前面递。除非 你运气够好，站在你前面的第一个人就是售票员，否则，你的硬币通常要在 N 个人手上 传递，才能最终到达售票员的手里。
2. 中学时代的期末考试，如果你平时不太老实，考试时就会被安排在第一个位置。遇到不 会答的题目，就把题目编号写在小纸条上往后传递，坐在后面的同学如果也不会答，他 就会把这张小纸条继续递给他后面的人。

从这两个例子中，我们很容易找到职责链模式的最大优点:请求发送者只需要知道链中的第 一个节点，从而弱化了发送者和一组接收者之间的强联系。如果不使用职责链模式，那么在公交 车上，我就得先搞清楚谁是售票员，才能把硬币递给他。同样，在期末考试中，也许我就要先了 解同学中有哪些可以解答这道题。

### 职责链模式案例

假设我们负责一个售卖手机的电商网站，经过分别交纳 500 元定金和 200 元定金的两轮预定后(订单已在此时生成)，现在已经到了正式购买的阶段。

公司针对支付过定金的用户有一定的优惠政策。在正式购买后，已经支付过 500 元定金的用 户会收到 100 元的商城优惠券，200 元定金的用户可以收到 50 元的优惠券，而之前没有支付定金 的用户只能进入普通购买模式，也就是没有优惠券，且在库存有限的情况下不一定保证能买到。

```javascript
// 500元订单
let order500 = function(orderType,pay,stock){
  if(orderType === 1 && pay === true){
    console.log("500元定价预购，得到100优惠券")
  } else {
		order200(orderType,pay,stock) // 将请求传递给200元订单
  }
}

// 200元订单
let order200 = function(orderType,pay,stock){
  if(orderType === 2 && pay === true){
    console.log("200元定金预购，得到50优惠券")
  } else {
		 orderNormal(orderType,pay,stock) // 将请求传递给普通订单
  }
}

// 普通购买订单
let orderNormal = function(orderType,pay,stock){
  if(stock > 0){
    console.log("普通购买，无优惠券")
  } else {
    console.log("手机库存不足")
  }
}

// 测试结果
order500(1,true,500)  // 500元定金悦购，得到100优惠券
order500(1,false,500)  // 普通购买，无优惠券
order500(2,true,500)  // 200元定金预购，得到500优惠券
order500(3,false,500)  // 普通购买，无优惠券
order500(3,false,0)  // 手机库存不足
```

可以看到，请求在链条传递中的顺序非常僵硬，传递请求的代码被耦合在了业务函 数之中，这依然是违反开放封闭原则的，如果有天我们要增加 300 元预订或者去掉 200 元预订，意 味着就必须改动这些业务函数内部。就像一根环环相扣打了死结的链条，如果要增加、拆除或者 移动一个节点，就必须得先砸烂这根链条。

### 灵活可拆分的职责链节点

本节我们采用一种更灵活的方式，来改进上面的职责链模式，目标是让链中的各个节点可以灵活拆分和重组。

首先需要改写一下分别表示 3 种购买模式的节点函数，我们约定，如果某个节点不能处理请求，则返回一个特定的字符串 `nextSuccessor`来表示该请求需要继续往后面传递:

```javascript
// 500元订单
let order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500元定价预购，得到100优惠券")
  } else {
    return 'nextSuccessor' // 我不知道下一个节点是谁，反正把请求放后面传递
  }
}

// 200元订单
let order200 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("200元定价预购，得到50优惠券")
  } else {
    return 'nextSuccessor' // 我不知道下一个节点是谁，反正把请求放后面传递
  }
}

// 普通购买订单
let orderNormal = function(orderType,pay,stock){
  if(stock > 0){
    console.log("普通购买，无优惠券")
  } else {
    console.log("手机库存不足")
  }
}
```

接下来需要把函数包装进职责链节点，我们定义一个构造函数 Chain，在 new Chain 的时候传 递的参数即为需要被包装的函数， 同时它还拥有一个实例属性 this.successor，表示在链中的下 一个节点。

此外 Chain 的 prototype 中还有两个函数，它们的作用如下所示:

```javascript
// Chain.prototype.setNextSuccessor 指定在链中的下一个节点

// Chain.prototype.passRequest 传递请求给某个节点

class Chain {
  constructor(fn) {
    this.fn = fn
    this.successor = null
  }

  setNextSuccessor(successor) {
    return this.successor = successor;
  }

  passRequest() {
    let ret = this.fn.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    }
    return ret;
  }
}

```

现在我们把 3 个订单函数分别包装成职责链的节点:

```javascript
let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNormal = new Chain(orderNormal);
```

然后指定节点在职责链中的顺序：

```javascript
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder500.setNextSuccessor(chainOrderNormal);
```

最后把请求传递给第一个节点:

```javascript
chainOrder500.passRequest(1, true, 500);  // 500 元定金预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500);  // 200 元定金预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500);  // 普通购买，无优惠券
chainOrder500.passRequest(1, false, 0);  // 手机库存不足
```

通过改进，我们可以自由灵活地增加、移除和修改链中的节点顺序，假如某天网站运营人员 又想出了支持 300 元定金购买，那我们就在该链中增加一个节点即可:

```javascript
// 300元订单
let order300 = function (orderType, pay, stock) {
  if (orderType === 3 && pay === true) {
    console.log("300元定价预购，得到30优惠券")
  } else {
    return 'nextSuccessor'
  }
}
let chainOrder300 = new Chain(order300);
chainOrder500.setNextSuccessor(chainOrder300);
```

这里的好处是我们根本不需要在意原来的订单函数代码，我们要做的只是增加一个节点，然后重新设置链中相关节点的顺序。

### 用AOP实现职责链

在之前的职责链实现中，我们利用了一个 Chain 类来把普通函数包装成职责链的节点。其实利用 JavaScript 的函数式特性，有一种更加方便的方法来创建职责链。

下面我们改写一下`Function.prototype.after` 函数，使得第一个函数返回`nextSuccessor`'时，将请求继续传递给下一个函数，无论是返回字符串`nextSuccessor`或者 false 都只是一个约 定，当然在这里我们也可以让函数返回 `false` 表示传递请求，选择`nextSuccessor`字符串是因为 它看起来更能表达我们的目的，代码如下:

```javascript
Function.prototype.after = function (fn) {
  let self = this;
  return function () {
    return fn.apply(this, arguments);
    let ret = self.apply(this, arguments); if (ret === 'nextSuccessor') {
    }
    return ret;
  }
};
let order = order500yuan.after(order200yuan).after(orderNormal);

order(1, true, 500);  // 输出:500 元定金预购，得到 100 优惠券
order(2, true, 500);  // 输出:200 元定金预购，得到 50 优惠券
order(1, false, 500); // 输出:普通购买，无优惠券
```

用 AOP 来实现职责链既简单又巧妙，但这种把函数叠在一起的方式，同时也叠加了函数的 作用域，如果链条太长的话，也会对性能有较大的影响。

### 小结

在 JavaScript 开发中，职责链模式是最容易被忽视的模式之一。实际上只要运用得当，职责 链模式可以很好地帮助我们管理代码，降低发起请求的对象和处理请求的对象之间的耦合性。职 责链中的节点数量和顺序是可以自由变化的，我们可以在运行时决定链中包含哪些节点。

无论是作用域链、原型链，还是 DOM 节点中的事件冒泡，我们都能从中找到职责链模式的 影子。职责链模式还可以和组合模式结合在一起，用来连接部件和父部件，或是提高组合对象的 效率。

## 十一、中介者模式

在我们生活的世界中，每个人每个物体之间都会产生一些错综复杂的联系。在应用程序里也  是一样，程序由大大小小的单一对象组成，所有这些对象都按照某种关系和规则来通信。

平时我们大概能记住 10 个朋友的电话、30 家餐馆的位置。在程序里，也许一个对象会和其 他 10 个对象打交道，所以它会保持 10 个对象的引用。当程序的规模增大，对象会越来越多，它 们之间的关系也越来越复杂，难免会形成网状的交叉引用。当我们改变或删除其中一个对象的时 候，很可能需要通知所有引用到它的对象。

![14-1](https://pic2.zhimg.com/80/v2-30ae9f80934b47811350057717e44ccb_1440w.png)

面向对象设计鼓励将行为分布到各个对象中，把对象划分成更小的粒度，有助于增强对象的

可复用性，但由于这些细粒度对象之间的联系激增，又有可能会反过来降低它们的可复用性。

中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的 相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知 中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系。

![14-2](https://pic1.zhimg.com/80/v2-9cce67ee6aa6ebbbd3b15d94e3c9732a_1440w.png)

在第一张图 中，如果对象 A 发生了改变，则需要同时通知跟 A 发生引用关系的 B、D、E、F 这 4 个对象;而在第二张图中，使用中介者模式改进之后，A 发生改变时则只需要通知这个中介者 对象即可。

### 中介者模式的例子——泡泡堂游戏

```javascript
class Player{
  constructor(name,teamColor){
    this.name = name; // 角色名称
  	this.teamColor = teamColor; // 队伍颜色
  	this.state = 'alive'  // 玩家生存状态
  }
	
  win(){
    console.log(this.name + ' won')
  }
  
  lose(){
    console.log(this.name + ' lose')
  }
  
  die(){
    this.state = 'dead'
    playerDirector.reciveMessage('playerDead', this) // 给中介者发送消息，玩家死亡
  }
  
  remove(){
    playerDirector.reciveMessage('removePlayer', this)  // 给终结者发送消息,移除一个玩家
  }
  
  changeTeam(){
    playerDirector.reciveMessage('changeTeam',this,color) // 给中介者发送消息，玩家换队
  }
}

let playerFactory = function(name,teamColor){
  let newPlayer = new Player(name,teamColor) // 创造一个新的玩家对象
  playDirector.reciveMessage('addPlayer',newPlayer) // 给中介者发送消息
  
  return newPlayer
}

```

最后，我们需要实现这个中介者 playerDirector 对象，一般有以下两种方式。

* 利用发布—订阅模式。将 playerDirector 实现为订阅者，各 player 作为发布者，一旦 player 的状态发生改变，便推送消息给 playerDirector，playerDirector 处理消息后将反馈发送 给其他 player。
* 在 playerDirector 中开放一些接收消息的接口，各 player 可以直接调用该接口来给 playerDirector 发送消息，player 只需传递一个参数给 playerDirector，这个参数的目的 是使 playerDirector 可以识别发送者。同样，playerDirector 接收到消息之后会将处理结 果反馈给其他 player。

这两种方式的实现没什么本质上的区别。在这里我们使用第二种方式，playerDirector 开放 一个对外暴露的接口 reciveMessage，负责接收 player 对象发送的消息，而 player 对象发送消息 的时候，总是把自身 this 作为参数发送给 playerDirector，以便 playerDirector 识别消息来自于 哪个玩家对象，代码如下:

```javascript
let playerDirector = (function () {
  let players = {}; // 保存所有玩家
  let operations = {}; // 中介者可以执行的操作
  
	/****************新增一个玩家***************************/ 
  operations.addPlayer = function (player) {
    let teamColor = player.teamColor; // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍 
    players[teamColor].push(player); // 添加玩家进队伍
  };
  
	/****************移除一个玩家***************************/ 
  operations.removePlayer = function (player) {
    let teamColor = player.teamColor, // 玩家的队伍颜色
      teamPlayers = players[teamColor] || []; // 该队伍所有成员
    for (let i = teamPlayers.length - 1; i >= 0; i--) { // 遍历删除
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };

  /****************玩家换队***************************/
  operations.changeTeam = function (player, newTeamColor) {  // 玩家换队
    operations.removePlayer(player); // 从原队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player);// 增加到新队伍中

    operations.playerDead = function (player) {
      let teamColor = player.teamColor,
        teamPlayers = players[teamColor];
      let all_dead = true;
      // 玩家死亡 // 玩家所在队伍
      for (let i = 0, player; player = teamPlayers[i++];) {
        if (player.state !== 'dead') {
          all_dead = false;
          break;
        }
      }
      if (all_dead === true) {  // 全部死亡
        for (const player of teamPlayer) {
          player.lose()
        }

        for (let color in players) {
          if (color !== teamColor) {
            let teamPlayers = players[color]; // 其他队伍的玩家
            for (let player of teamPlayers) {
              player.win() // 其他队伍所有玩家win
            }
          }
        }
      }
    }
  };
  // 其他队伍的玩家 // 其他队伍所有玩家 win
  let reciveMessage = function () {
    let message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)

    return {
      reciveMessage
    }
  }
})();
  
```

可以看到，除了中介者本身，没有一个玩家知道其他任何玩家的存在，玩家与玩家之间的耦 合关系已经完全解除，某个玩家的任何操作都不需要通知其他玩家，而只需要给中介者发送一个 消息，中介者处理完消息之后会把处理结果反馈给其他的玩家对象。我们还可以继续给中介者扩 展更多功能，以适应游戏需求的不断变化。

```javascript
let player1 = playerFactory('皮蛋', 'red'),
  player2 = playerFactory('小乖', 'red'),
  player3 = playerFactory('宝宝', 'red'),
  player4 = playerFactory('小强', 'red');
// 蓝队:
let player5 = playerFactory('黑妞', 'blue'),
  player6 = playerFactory('葱头', 'blue'),
  player7 = playerFactory('胖墩', 'blue'),
  player8 = playerFactory('海盗', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();
```

输出如下:

```markdown
皮蛋 lost
小乖 lost
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
```

假设皮蛋和小乖掉线

```javascript
player1.remove(); 
player2.remove(); 
player3.die(); 
player4.die();
```

输入如下：

```markdown
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
```

假设皮蛋从红队叛变到蓝队

```javascript
player1.changeTeam( 'blue' ); player2.die();
player3.die();
player4.die();
```

输出如下：

```markdonw
小乖 lost
宝宝 lost
小强 lost
黑妞 won
葱头 won
胖墩 won
海盗 won
皮蛋 won
```

### 小结

中介者模式是迎合迪米特法则的一种实现。迪米特法则也叫最少知识原则，是指一个对象应 该尽可能少地了解另外的对象(类似不和陌生人说话)。如果对象之间的耦合性太高，一个对象 发生改变之后，难免会影响到其他的对象，跟“城门失火，殃及池鱼”的道理是一样的。而在中 介者模式里，对象之间几乎不知道彼此的存在，它们只能通过中介者对象来互相影响对方。

因此，中介者模式使各个对象之间得以解耦，以中介者和对象之间的一对多关系取代了对象 之间的网状多对多关系。各个对象只需关注自身功能的实现，对象之间的交互关系交给了中介者 对象来实现和维护。

不过，中介者模式也存在一些缺点。其中，最大的缺点是系统中会新增一个中介者对象，因 为对象之间交互的复杂性，转移成了中介者对象的复杂性，使得中介者对象经常是巨大的。中介 者对象自身往往就是一个难以维护的对象。

我们都知道，毒贩子虽然使吸毒者和制毒者之间的耦合度降低，但毒贩子也要抽走一部分利 润。同样，在程序中，中介者对象要占去一部分内存。而且毒贩本身还要防止被警察抓住，因为 它了解整个犯罪链条中的所有关系，这表明中介者对象自身往往是一个难以维护的对象。

中介者模式可以非常方便地对模块或者对象进行解耦，但对象之间并非一定需要解耦。在实 际项目中，模块或对象之间有一些依赖关系是很正常的。毕竟我们写程序是为了快速完成项目交 付生产，而不是堆砌模式和过度设计。关键就在于如何去衡量对象之间的耦合程度。一般来说， 如果对象之间的复杂耦合确实导致调用和维护出现了困难，而且这些耦合度随项目的变化呈指数 增长曲线，那我们就可以考虑用中介者模式来重构代码。

## 十二、装饰器模式

我们玩魔兽争霸的任务关时，对 15 级乱加技能点的野生英雄普遍没有好感，而是喜欢留着 5 技能点，在游戏的进行过程中按需加技能。同样，在程序开发中，许多时候都并不希望某个类天生就非常庞大，一次性包含许多职责。那么我们就可以使用装饰者模式。装饰者模式可以动态地 给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。

在传统的面向对象语言中，给对象添加功能常常使用继承的方式，但是继承的方式并不灵活， 还会带来许多问题:一方面会导致超类和子类之间存在强耦合性，当超类改变时，子类也会随之 改变;另一方面，继承这种功能复用方式通常被称为“白箱复用”，“白箱”是相对可见性而言的， 在继承方式中，超类的内部细节是对子类可见的，继承常常被认为破坏了封装性。

使用继承还会带来另外一个问题，在完成一些功能复用的同时，有可能创建出大量的子类， 8 使子类的数量呈爆炸性增长。比如现在有 4 种型号的自行车，我们为每种自行车都定义了一个单独的类。现在要给每种自行车装上前灯、尾灯和铃铛这三种配件。如果使用继承方式来给每种自行车创建子类，则需要4x3=12个子类。但是如果把前灯、尾灯、铃铛这些对象动态组合到自行车上面，则只需要额外增加3个类。

这种给对象动态的增加职责的方式成为装饰器(decorator)模式。装饰器模式能够在不改变对象自身的基础上，在程序运行期间给对象动态的添加职责。跟继承相比，装饰者是一种更轻便灵活的做法，这是一种”即用即付“的方式，比如天冷了就多穿一件外套，需要飞行时就在头上插一只竹蜻蜓，遇到一对食尸鬼时就点开AOE(范围攻击)技能。

### 模拟传统面向对象语言的装饰者模式

首先要提出来的是，作为一门解释执行的语言，给 JavaScript 中的对象动态添加或者改变职 责是一件再简单不过的事情，虽然这种做法改动了对象自身，跟传统定义中的装饰者模式并不一 样，但这无疑更符合 JavaScript 的语言特色。代码如下:

```javascript
let obj = {
  name:'smlalzip',
  address:'桂林市'
}
obj.address = obj.address + '阳朔县'
```

传统面向对象语言中的装饰者模式在 JavaScript 中适用的场景并不多，如上面代码所示，通 常我们并不太介意改动对象自身。尽管如此，本节我们还是稍微模拟一下传统面向对象语言中的 装饰者模式实现。

假设我们在编写一个飞机大战的游戏，随着经验值的增加，我们操作的飞机对象可以升级成 更厉害的飞机，一开始这些飞机只能发射普通的子弹，升到第二级时可以发射导弹，升到第三级 时可以发射原子弹。

下面来看代码实现，首先是原始的飞机类:

```javascript
class Plane{
  constructor(){
    
  }
  
  fire(){
    console.log("发射普通子弹")
  }
}
```

接下来增加两个装饰类，分别是导弹和原子弹:

```javascript
class MissileDecorator{
  constructor(plane){
    this.plane = plane
  }
  
  fire(){
    this.plane.fire()
    console.log("发射导弹")
  } 
}

class AtomDecorator{
  constructor(plane){
    this.plane = plane
  }
  
  fire(){
    this.plane.fire()
    console.log("发射原子弹")
  }
}
```

导弹类和原子弹类的构造函数都接受参数 plane 对象，并且保存好这个参数，在它们的 fire方法中，除了执行自身的操作之外，还调用 plane 对象的 fire 方法。

这种给对象动态增加职责的方式，并没有真正地改动对象自身，而是将对象放入另一个对象 之中，这些对象以一条链的方式进行引用，形成一个聚合对象。这些对象都拥有相同的接口(fire 方法)，当请求达到链中的某个对象时，这个对象会执行自身的操作，随后把请求转发给链中的 下一个对象。

因为装饰者对象和它所装饰的对象拥有一致的接口，所以它们对使用该对象的客户来说是透 明的，被装饰的对象也并不需要了解它曾经被装饰过，这种透明性使得我们可以递归地嵌套任意 多个装饰者对象。

```javascript
let plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)

plane.fire()
// 输出：
// 发射普通子弹
// 发射导弹
// 发射原子弹
```

JavaScript 语言动态改变对象相当容易，我们可以直接改写对象或者对象的某个方法，并不 需要使用“类”来实现装饰者模式，代码如下:

```javascript
let plane = {
  fire: function () {
    console.log('发射普通子弹');
  }
}

let missileDecorator = function () {
  console.log('发射导弹');
}

let atomDecorator = function () {
  console.log('发射原子弹');
}

let fire1 = plane.fire;
plane.fire = function () { // 重写方法
  fire1();
  missileDecorator();
}

let fire2 = plane.fire;
plane.fire = function () { // 重写方法
  fire2();
  atomDecorator();
}

plane.fire();

// 分别输出: 
// 发射普通子弹
// 发射导弹
// 发射原子弹
```

### 装饰函数

在 JavaScript 中，几乎一切都是对象，其中函数又被称为一等对象。在平时的开发工作中， 也许大部分时间都在和函数打交道。在 JavaScript 中可以很方便地给某个对象扩展属性和方法， 但却很难在不改动某个函数源代码的情况下，给该函数添加一些额外的功能。在代码的运行期间， 我们很难切入某个函数的执行环境。

要想为函数添加一些功能，最简单粗暴的方式就是直接改写该函数，但这是最差的办法，直 接违反了开放封闭原则:

```javascript
let f = function(){
  alert(1)
}

// 改成

let f = function(){
  alert(1)
  alert(2)
}
```

很多时候我们不想去碰原函数，也许原函数是由其他同事编写的，里面的实现非常杂乱。甚 至在一个古老的项目中，这个函数的源代码被隐藏在一个我们不愿碰触的阴暗角落里。现在需要 一个办法，在不改变函数源代码的情况下，能给函数增加功能，这正是开放封闭原则给我们指 出的光明道路。

```javascript
let f = function(){
  alert(1)
}

let _f = f
f = function(){  // 重写方法
  _f() // 调用引用
  alert(2)
}

f()
```

这是实际开发中很常见的一种做法，比如我们想给 window 绑定 onload 事件，但是又不确定 这个事件是不是已经被其他人绑定过，为了避免覆盖掉之前的 window.onload 函数中的行为，我 们一般都会先保存好原先的 window.onload，把它放入新的 window.onload 里执行:

```javascript
window.onload = function(){
  alert(1)
}

let _onload = window.onload || function(){}

window.onload = function(){
  _onload()
  alert(2)
}
```

这样的代码当然是符合开放封闭原则的，我们在增加新功能的时候，确实没有修改原来的 window.onload 代码，但是这种方式存在以下两个问题。

### 用AOP装饰函数

首先给出 Function.prototype.before 方法和 Function.prototype.after 方法:

```javascript
Function.prototype.before = function (beforefn) {
  let __self = this; // 保存原函数的引用
  return function () { // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments); // 执行新函数，且保证 this 不被劫持，新函数接受的参数 // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments); // 执行原函数并返回原函数的执行结果， 2 // 并且保证 this 不被劫持
  }
}

Function.prototype.after = function (afterfn) {
  let __self = this;
  return function () {
    let ret = __self.apply(this, arguments); afterfn.apply(this, arguments);
    return ret;
  }
};
```

`Function.prototype.before `接受一个函数当作参数，这个函数即为新添加的函数，它装载了 新添加的功能代码。

接下来把当前的` this `保存起来，这个 this 指向原函数，然后返回一个“代理”函数，这个 “代理”函数只是结构上像代理而已，并不承担代理的职责(比如控制对象的访问等)。它的工作 是把请求分别转发给新添加的函数和原函数，且负责保证它们的执行顺序，让新添加的函数在原函数之前执行(前置装饰)，这样就实现了动态装饰的效果。

我们注意到，通过 `Function.prototype.apply `来动态传入正确的` this`，保证了函数在被装饰之后，this 不会被劫持。

`Function.prototype.after`的原理跟 `Function.prototype.before` 一模一样，唯一不同的地方在于让新添加的函数在原函数执行之后再执行。

### 小结

了解了本章的装饰器例子，它是 JavaScript 中独特的装饰者模式。这种模式在实际开发中非常 有用，除了上面提到的例子，它在框架开发中也十分有用。作为框架作者，我们希望框架里的函 数提供的是一些稳定而方便移植的功能，那些个性化的功能可以在框架之外动态装饰上去，这可 以避免为了让框架拥有更多的功能，而去使用一些 if、else 语句预测用户的实际需要。

## 十三章、状态模式

状态模式是一种非同寻常的优秀模式，它也许是解决某些需求场景的最好方法。虽然状态模 式并不是一种简单到一目了然的模式(它往往还会带来代码量的增加)，但你一旦明白了状态模 式的精髓，以后一定会感谢它带给你的无与伦比的好处。

状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。

我们来想象这样一个场景:有一个电灯，电灯上面只有一个开关。当电灯开着的时候，此时 按下开关，电灯会切换到关闭状态;再按一次开关，电灯又将被打开。同一个开关按钮，在不同 的状态下，表现出来的行为是不一样的。

现在用代码来描述这个场景，首先定义一个 Light 类，可以预见，电灯对象 light 将从 Light 类创建而出， light 对象将拥有两个属性，我们用 state 来记录电灯当前的状态，用 button 表示 具体的开关按钮。下面来编写这个电灯程序的例子。

### 第一个例子:电灯程序

首先给出不用状态模式的电灯程序实现:

```javascript
let Light = function () {
  this.state = 'off'; // 给电灯设置初始状态off
  this.button = null; // 电灯开关按钮
};
```

接下来定义 `Light.prototype.init `方法，该方法负责在页面中创建一个真实的` button` 节点， 假设这个 `button `就是电灯的开关按钮，当` button `的` onclick`事件被触发时，就是电灯开关被按下 的时候，代码如下:

```javascript
Light.prototype.init = function () {
  let button = document.createElement('button')
  let self = this;

  button.innerHTML = '开关';
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.buttonWasPressed();
  }
};

```

当开关被按下时，程序会调用 `self.buttonWasPressed` 方法， 开关按下之后的所有行为，都将被封装在这个方法里，代码如下:

```javascript
Light.prototype.buttonWasPressed = function () {
  if (this.state === 'off') {
    console.log('开灯');
    this.state = 'on';
  } else if (this.state === 'on') {
    console.log('关灯');
    this.state = 'off';
  }
};

let light = new Light();
light.init();
```

这个世界上的电灯并非只有一种。许多酒店里有另外一种电灯，这种电灯也 只有一个开关，但它的表现是:第一次按下打开弱光，第二次按下打开强光，第三次才是关闭电 灯。现在必须改造上面的代码来完成这种新型电灯的制造:

```javascript
Light.prototype.buttonWasPressed = function () {
  if (this.state === 'off') {
    console.log('弱光');
    this.state = 'weakLight';
  } else if (this.state === 'weakLight') {
    console.log('强光');
    this.state = 'strongLight';
  } else if (this.state === 'strongLight') {
    console.log('关灯');
    this.state = 'off';
  }
};
```

现在这个反例先告一段落，我们来考虑一下上述程序的缺点。

* 很明显 buttonWasPressed 方法是违反开放封闭原则的，每次新增或者修改 light 的状态， 都需要改动 buttonWasPressed 方法中的代码，这使得 buttonWasPressed 成为了一个非常不 稳定的方法。
* 所有跟状态有关的行为，都被封装在 buttonWasPressed 方法里，如果以后这个电灯又增加 了强强光、超强光和终极强光，那我们将无法预计这个方法将膨胀到什么地步。当然为 了简化示例，此处在状态发生改变的时候，只是简单地打印一条 log 和改变 button 的 innerHTML。在实际开发中，要处理的事情可能比这多得多，也就是说，buttonWasPressed 方法要比现在庞大得多。
* 状态的切换非常不明显，仅仅表现为对 state 变量赋值，比如 this.state = 'weakLight'。 在实际开发中，这样的操作很容易被程序员不小心漏掉。我们也没有办法一目了然地明 白电灯一共有多少种状态，除非耐心地读完 buttonWasPressed 方法里的所有代码。当状 态的种类多起来的时候，某一次切换的过程就好像被埋藏在一个巨大方法的某个阴暗角 落里。
* 状态之间的切换关系，不过是往 buttonWasPressed 方法里堆砌 if、else 语句，增加或者修 改一个状态可能需要改变若干个操作，这使 buttonWasPressed 更加难以阅读和维护。

### 状态模式改进电灯程序

现在我们学习使用状态模式改进电灯的程序。有意思的是，通常我们谈到封装，一般都会优 先封装对象的行为，而不是对象的状态。但在状态模式中刚好相反，状态模式的关键是把事物的 每种状态都封装成单独的类，跟此种状态有关的行为都被封装在这个类的内部，所以 button 被按 下的的时候，只需要在上下文中，把这个请求委托给当前的状态对象即可，该状态对象会负责渲 染它自身的行为。

下面进入状态模式的代码编写阶段，首先将定义 3 个状态类，分别是 offLightState、

WeakLightState、strongLightState。这 3 个类都有一个原型方法 buttonWasPressed，代表在各自状态下，按钮被按下时将发生的行为，代码如下:

```javascript
// OffLightState:
class OffLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('弱光'); // offLightState 对应的行为 this.light.setState( this.light.weakLightState );
  }
}

// WeakLightState:
class WeakLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('强光'); // weakLightState 对应的行为 this.light.setState( this.light.strongLightState );
  }
}


// StrongLightState:
class StrongLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('关灯'); // strongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
  }
}
```

接下来改写 Light 类，现在不再使用一个字符串来记录当前的状态，而是使用更加立体化的 状态对象。我们在 Light 类的构造函数里为每个状态类都创建一个状态对象，这样一来我们可以 很明显地看到电灯一共有多少种状态，代码如下:

```javascript
let Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};
```



在` button` 按钮被按下的事件里，`Context` 也不再直接进行任何实质性的操作，而是通过 `self.currState.buttonWasPressed()`将请求委托给当前持有的状态对象去执行，代码如下:

```javascript
Light.prototype.init = function () {
  let button = document.createElement('button'),
    self = this;
  this.button = document.body.appendChild(button); this.button.innerHTML = '开关';
  this.currState = this.offLightState; // 设置当前状态
  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  }
};

```

最后还要提供一个 Light.prototype.setState 方法，状态对象可以通过这个方法来切换 light 对象的状态。前面已经说过，状态的切换规律事先被完好定义在各个状态类中。在 Context 中再 4 也找不到任何一个跟状态切换相关的条件分支语句:

```javascript
Light.prototype.setState = function (newState) {
  this.currState = newState; 5
};

let light = new Light()
light.init()
```

以下是上面案例的class类的完整案例写法：

```javascript
// OffLightState:
class OffLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('弱光'); // offLightState 对应的行为 
    this.light.setState(this.light.weakLightState);
  }
}

// WeakLightState:
class WeakLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('强光'); // weakLightState 对应的行为 
    this.light.setState(this.light.strongLightState);
  }
}


// StrongLightState:
class StrongLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('关灯'); // strongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
  }

  init() {
    let button = document.createElement('button'),
      self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState; // 设置当前状态
    this.button.onclick = function () {
      self.currState.buttonWasPressed();
    }
  }

  setState(newState) {
    this.currState = newState;
  }

}

let light = new Light();
light.init();
```

不出意外的话，执行结果跟之前的代码一致，但是使用状态模式的好处很明显，它可以使每 一种状态和它对应的行为之间的关系局部化，这些行为被分散和封装在各自对应的状态类之中， 便于阅读和管理代码。

另外，状态之间的切换都被分布在状态类内部，这使得我们无需编写过多的 if、else 条件 分支语言来控制状态之间的转换。

当我们需要为 light 对象增加一种新的状态时，只需要增加一个新的状态类，再稍稍改变一 些现有的代码即可。假设现在 light 对象多了一种超强光的状态，那就先增加 SuperStrongLightState 类:

```javascript
// SuperStrongLightState
class SuperStrongLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log('关灯'); // SuperStrongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
  }
```

完整代码如下：

```javascript

// OffLightState:
class OffLightState {
  constructor(light) {
    console.log(light)
    this.light = light;
  }

  buttonWasPressed() {
    console.log('弱光'); // offLightState 对应的行为 
    this.light.setState(this.light.weakLightState);
  }
}

// WeakLightState:
class WeakLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('强光'); // weakLightState 对应的行为 
    this.light.setState(this.light.strongLightState);
  }
}


// StrongLightState:
class StrongLightState {
  constructor(light) {
    this.light = light;
  }

  buttonWasPressed() {
    console.log('超强光'); // strongLightState 对应的行为
    this.light.setState(this.light.superStrongLightState); // 切换状态到 superStrongLightState
  }
}

// SuperStrongLightState
class SuperStrongLightState {
  constructor(light) {
    this.light = light
  }

  buttonWasPressed() {
    console.log('关灯'); // SuperStrongLightState 对应的行为
    this.light.setState(this.light.offLightState); // 切换状态到 offLightState
  }
}

class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.superStrongLightState = new SuperStrongLightState(this); // 新增SuperStrongLightState
    this.button = null;
  }

  init() {
    let button = document.createElement('button'),
      self = this;
    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';
    this.currState = this.offLightState; // 设置当前状态
    this.button.onclick = function () {
      self.currState.buttonWasPressed();
    }
  }

  setState(newState) {
    this.currState = newState;
  }

}

let light = new Light();
light.init();
```

### 小结

状态模式是被大家低估的模式之一。实际上，通过状态模式重构代码之后，很多杂乱无章的代码会变得清晰。虽然状态模 式一开始并不是非常容易理解，但我们有必须去好好掌握这种设计模式。

## 十四、适配器模式

适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本 由于接口不兼容而不能工作的两个软件实体可以一起工作。

适配器的别名是包装器(wrapper)，这是一个相对简单的模式。在程序开发中有许多这样的 场景:当我们试图调用模块或者对象的某个接口时，却发现这个接口的格式并不符合目前的需求。 这时候有两种解决办法，第一种是修改原来的接口实现，但如果原来的模块很复杂，或者我们拿 到的模块是一段别人编写的经过压缩的代码，修改原接口就显得不太现实了。第二种办法是创建 一个适配器，将原接口转换为客户希望的另一个接口，客户只需要和适配器打交道。

### 适配器模式的应用

如果现有的接口已经能够正常工作，那我们就永远不会用上适配器模式。适配器模式是一种 “亡羊补牢”的模式，没有人会在程序的设计之初就使用它。因为没有人可以完全预料到未来的 事情，也许现在好好工作的接口，未来的某天却不再适用于新系统，那么我们可以用适配器模式 把旧接口包装成一个新的接口，使它继续保持生命力。比如在 JSON 格式流行之前，很多 cgi 返回的都是 XML 格式的数据，如果今天仍然想继续使用这些接口，显然我们可以创造一个XML-JSON 的适配器。

下面这个实例可以帮助我们深刻了解适配器模式。

当我们向 googleMap 和 baiduMap 都发出“显示”请求时，googleMap 和 baiduMap 分别以各自的方式在页面中展现了地图:

```javascript
let googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图');
  }
};

let baiduMap = {
  show: function () {
    console.log('开始渲染百度地图');
  }
};

let renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap); // 输出:开始渲染谷歌地图
renderMap(baiduMap); // 输出:开始渲染百度地图
```

这段程序得以顺利运行的关键是 googleMap 和 baiduMap 提供了一致的 show 方法，但第三方的 接口方法并不在我们自己的控制范围之内，假如 baiduMap 提供的显示地图的方法不叫 show 而叫 display 呢?

baiduMap 这个对象来源于第三方，正常情况下我们都不应该去改动它。此时我们可以通过增 加 baiduMapAdapter 来解决问题:

```javascript
let googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图');
  }
};
let baiduMap = {
  display: function () {
    console.log('开始渲染百度地图');
  }
};
let baiduMapAdapter = {
  show: function () {
    return baiduMap.display();

  }
};
renderMap(googleMap);  // 输出:开始渲染谷歌地图
renderMap(baiduMapAdapter);  // 输出:开始渲染百度地图
```

再来看看另外一个例子。假设我们正在编写一个渲染广东省地图的页面。目前从第三方资源 里获得了广东省的所有城市以及它们所对应的 ID，并且成功地渲染到页面中:

```javascript
let getGuangdongCity = function () {
  let guangdongCity = [
    {
      name: 'shenzhen',
      id: 1
    }, {
      name: 'guangzhou',
      id: 2
    }
  ];
  return guangdongCity
}

let render = function (fn) {
  console.log('开始渲染广东省地图')
  document.write(JSON.stringify(fn()))
}

render(getGuangdongCity)
```

利用这些数据，我们编写完成了整个页面，并且在线上稳定地运行了一段时间。但后来发现 这些数据不太可靠，里面还缺少很多城市。于是我们又在网上找到了另外一些数据资源，这次的 数据更加全面，但遗憾的是，数据结构和正运行在项目中的并不一致。新的数据结构如下: 

```javascript
// 地域名称：id
let guangdongCity = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13
};
```

除了大动干戈地改写渲染页面的前端代码之外，另外一种更轻便的解决方式就是新增一个数 据格式转换的适配器:

```javascript
let addressAdapter = function(oldAddressfn){
  let address = {},
      oldAddress = oldAddressfn;
  
  for(const c of oldAddress){
    address[c.name] = c.id
  }
  
  return function(){
    return address
  }
}

render(addressAdapter(getGuangdongCity())) // {"shenzhen":11,"guangzhou":12}
```

### 小结

适配器模式是一对相对简单的模式。在本书提到的设计模式中，有一些模式跟适配器模式的 结构非常相似，比如装饰者模式、代理模式和外观模式。这几种模式都属于“包 装模式”，都是由一个对象来包装另一个对象。区别它们的关键仍然是模式的意图。

* 适配器模式主要用来解决两个已有接口之间不匹配的问题，它不考虑这些接口是怎样实 现的，也不考虑它们将来可能会如何演化。适配器模式不需要改变已有的接口，就能够 使它们协同作用。
* 装饰者模式和代理模式也不会改变原有对象的接口，但装饰者模式的作用是为了给对象 增加功能。装饰者模式常常形成一条长的装饰链，而适配器模式通常只包装一次。代理 模式是为了控制对对象的访问，通常也只包装一次。
* 外观模式的作用倒是和适配器比较相似，有人把外观模式看成一组对象的适配器，但外 观模式最显著的特点是定义了一个新的接口。

## 第二部分 设计原则和编程技巧

目前，我们已经学习了几乎所有常用的 JavaScript 设计模式。在这一部分，我们将学习一些 面向对象的设计原则，可以说每种设计模式都是为了让代码迎合其中一个或多个原则而出现的， 它们本身已经融入了设计模式之中，给面向对象编程指明了方向。

## 单一职责原则

就一个类而言，应该仅有一个引起它变化的原因。在 JavaScript 中，需要用到类的场景并不 太多，单一职责原则更多地是被运用在对象或者方法级别上，因此本节我们的讨论大多基于对象 和方法。

单一职责原则(SRP)的职责被定义为“引起变化的原因”。如果我们有两个动机去改写一 个方法，那么这个方法就具有两个职责。每个职责都是变化的一个轴线，如果一个方法承担了过 多的职责，那么在需求的变迁过程中，需要改写这个方法的可能性就越大。

此时，这个方法通常是一个不稳定的方法，修改代码总是一件危险的事情，特别是当两个职 责耦合在一起的时候，一个职责发生变化可能会影响到其他职责的实现，造成意想不到的破坏， 这种耦合性得到的是低内聚和脆弱的设计。

因此，SRP 原则体现为:一个对象(方法)只做一件事情。

## 最少知识原则

最少知识原则(LKP)说的是一个软件实体应当尽可能少地与其他实体发生相互作用。这 里的软件实体是一个广义的概念，不仅包括对象，还包括系统、类、模块、函数、变量等。本 节我们主要针对对象来说明这个原则，下面引用《面向对象设计原理与模式》一书中的例子来 解释最少知识原则:

> 某军队中的将军需要挖掘一些散兵坑。下面是完成任务的一种方式:将军可以通知 上校让他叫来少校，然后让少校找来上尉，并让上尉通知一个军士，最后军士唤来一个 士兵，然后命令士兵挖掘一些散兵坑。

这种方式十分荒谬，不是吗?不过，我们还是先来看一下这个过程的等价代码:

```javascript
gerneral.getColonel( c ).getMajor( m ).getCaptain( c ) .getSergeant( s ).getPrivate( p ).digFoxhole();
```

让代码通过这么长的消息链才能完成一个任务，这就像让将军通过那么多繁琐的步骤才能命 令别人挖掘散兵坑一样荒谬!而且，这条链中任何一个对象的改动都会影响整条链的结果。

最有可能的是，将军自己根本就不会考虑挖散兵坑这样的细节信息。但是如果将军真的考虑 了这个问题的话，他一定会通知某个军官:“我不关心这个工作如何完成，但是你得命令人去挖 散兵坑。”

### 减少对象之间的联系

单一职责原则指导我们把对象划分成较小的粒度，这可以提高对象的可复用性。但越来越 多的对象之间可能会产生错综复杂的联系，如果修改了其中一个对象，很可能会影响到跟它相 互引用的其他对象。对象和对象耦合在一起，有可能会降低它们的可复用性。在程序中，对象 的“朋友”太多并不是一件好事，“城门失火，殃及池鱼”和“一人犯法，株连九族”的故事 时有发生。

最少知识原则要求我们在设计程序时，应当尽量减少对象之间的交互。如果两个对象之间不 必彼此直接通信，那么这两个对象就不要发生直接的相互联系。常见的做法是引入一个第三者对 象，来承担这些对象之间的通信作用。如果一些对象需要向另一些对象发起请求，可以通过第三 者对象来转发这些请求。

###  设计模式中的最少知识原则

最少知识原则在设计模式中体现得最多的地方是中介者模式和外观模式。

1. **中介者模式**

   在世界杯期间购买足球彩票，如果没有博彩公司作为中介，上千万的人一起计算赔率和输赢 绝对是不可能的事情。博彩公司作为中介，每个人都只和博彩公司发生关联，博彩公司会根据所 有人的投注情况计算好赔率，彩民们赢了钱就从博彩公司拿，输了钱就赔给博彩公司。

   中介者模式很好地体现了最少知识原则。通过增加一个中介者对象，让所有的相关对象都通 过中介者对象来通信，而不是互相引用。所以，当一个对象发生改变时，只需要通知中介者对象 即可。

2. **外观模式**

   我们在第二部分没有提到外观模式，是因为外观模式在 JavaScript 中的使用场景并不多。外 观模式主要是为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个 接口使子系统更加容易使用。

## 开放-封闭原则

有一种说法是，设计模式就是给做的好的设计取个名字。几乎所有的设计模式都是遵守开放 封闭原则的，我们见到的好设计，通常都经得起开放封闭原则的考验。不管是具体的各种设计 模式，还是更抽象的面向对象设计原则，比如单一职责原则、最少知识原则、依赖倒置原则等， 都是为了让程序遵守开放封闭原则而出现的。可以这样说，开放封闭原则是编写一个好程序的 目标，其他设计原则都是达到这个目标的过程。

1. **发布-订阅模式**

   发布订阅模式用来降低多个对象之间的依赖关系，它可以取代对象之间硬编码的通知机制， 一个对象不用再显式地调用另外一个对象的某个接口。当有新的订阅者出现时，发布者的代码不 需要进行任何修改;同样当发布者需要改变时，也不会影响到之前的订阅者。

2. **模板方法模式**

   我们曾提到，模板方法模式是一种典型的通过封装变化来提高系统扩展性的设计模式。在一个运用了模板方法模式的程序中，子类的方法种类和执行顺序都是不变的，所以 我们把这部分逻辑抽出来放到父类的模板方法里面;而子类的方法具体怎么实现则是可变的，于 是把这部分变化的逻辑封装到子类中。通过增加新的子类，便能给系统增加新的功能，并不需要 改动抽象父类以及其他的子类，这也是符合开放封闭原则的。

3. **策略模式**

   策略模式和模板方法模式是一对竞争者。在大多数情况下，它们可以相互替换使用。模板方法模式基于继承的思想，而策略模式则偏重于组合和委托。

   策略模式将各种算法都封装成单独的策略类，这些策略类可以被交换使用。策略和使用策略 的客户代码可以分别独立进行修改而互不影响。我们增加一个新的策略类也非常方便，完全不用 4 修改之前的代码。

4. **代理模式**

   拿预加载图片举 例，我们现在已有一个给图片设置 src 的函数 myImage，当我们想为它增加图片预加载功能时， 一种做法是改动 myImage 函数内部的代码，更好的做法是提供一个代理函数 proxyMyImage，代理 函数负责图片预加载，在图片预加载完成之后，再将请求转交给原来的 myImage 函数，myImage 在 这个过程中不需要任何改动。

   预加载图片的功能和给图片设置 src 的功能被隔离在两个函数里，它们可以单独改变而互不 影响。myImage 不知晓代理的存在，它可以继续专注于自己的职责——给图片设置 src。

5. **职责链模式**

   把一个巨大的订单函数分别拆成了 500 元订单、 200 元订单以及普通订单的 3 个函数。这 3 个函数通过职责链连接在一起，客户的请求会在这条 链条里面依次传递,当我们增加一个新类型的订单函数时，不需要改动原有的订单函数代码，只需要在链条中增加一个新的节点。