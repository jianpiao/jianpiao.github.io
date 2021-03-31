# Js技术积累知识点

## 函数柯理化

> // 实现一个add方法，使计算结果能够满足如下预期：
> add(1)(2)(3) = 6;
> add(1, 2, 3)(4) = 10;
> add(1)(2)(3)(4)(5) = 15;

第一次看到这个题目，我是懵逼的！这个难倒是函数的多重调用的吗？

### 一、了解函数柯理化

**函数柯里化概念：** 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

我们观察`add(1)(2)(3) = 6`，第一眼就可以看到，肯定是1+2+3 = 6,通过传参的数字进行累加得到最后的结果。

```javascript
function add(a,b){
  return a+b
}

add(1,2); // 3
```

通过上面代码可以看到，传参a和b两个参数，然后返回两个参数的累加，就得到了3。

```javascript
function add(a){
  return function(b){
    return a+b
  }
}

add(1,2);  // 结果是什么呢？
add(1)(2); // 结果是什么呢？
add(1)(2)(3); // 结果是什么呢？
```

知道上面的代码中`add(1,2);`和`add(1)(2);`分别会返回什么吗？

```javascript
// add(1,2)返回的是一个匿名函数
ƒ (b) {
   return a + b
}

// add(1)(2) 返回的是3
add(1)(2)  // 3

// add(1)(2)(3)直接报错 add(...)(...) is not a function,因为只写了两重函数
add(1)(2)(3)
```

要实现add(1)(2)(3)应该修改add函数，如下

```javascript
function add(a) {
   return function (b) {
     return function (c) {
       return a + b + c
     }
   }
 }
```

比原先又多了一重闭包函数，那如果我们要从1累加到100，不得写100重匿名函数咯~ 这不整死人嘛，这样做结果是可以做出来的，我们作为技术牛人，肯定要解决这样的问题~！

### 二、柯理化的解决方案

通过上面的案例，我们可以看到基本上是实现了柯理化的概念，接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。add(1)(2)(3)这里每一重函数都是只接收一个参数，最后能够把所有的参数累加返回出去。

```javascript
function add(a) {
     let args = function (b) {
        return a + b
   }
     return args
}

console.log(add(1))  // 输出的是什么？
```

输出结果如下

```javascript
ƒ (b) {
   return a + b
}
```

是不是很熟悉，因为上面有它就是第一步的add函数中的变种，本来直接return匿名函数的，但是现在呢，我们定义一个args变量保存了这个匿名函数，最后输出匿名函数。args其实一个函数类型，我们可以输出看看

```javascript
function add(a) {
     let args = function (b) {
        return a + b
   }
     console.log(typeof args)  // function
     return args
}
```

既然是函数类型，就需要对它改造，不让返回function类型，而让它返回我们想要的数字累计结果！

改造如下

```javascript
 function add(a) {
    let args = function (b) {
      return a + b
    }
    args.toString = function () {
        return a
     }
    return args
 }

add(1)(2); // 3
```

通过toString()方法，本来返回是一个function，经过处理之后，只接收return a的结果，这样的话，输出的结果就是累加后的结果，1+2=3。

那现在执行`add(1)(2)(3)`会不会成功呢？

答案是不会的，因为args函数内值累加了两次，第三次的3没有被计算。所以我们就要继续改造，让他可以支持多个参数累加。每次传入的参数是不是都需要存储起来，然后累加的时候就是用上次存储的总和加上传来的参数，求得最终的总和。那如何存储之前的参数的值呢，这个时候就需要用的闭包的特性，闭包内的变量是可以存储的，每次执行闭包，闭包内的变量并没有被销毁。

可以举一个简单的例子：

```javascript
function sum(){
  let x = 0
  return function(y){
    x = x + y
    return x
  }
}
let sum_ = sum()
sum_(1)   // 1
sum_(1)   // 2
```

定义了sum函数，函数内有一个闭包，sum_对sum()进行了实例，sum_方法内传入参数1，理论上返回的0+1=1。第二次进行传参，返回的不再是0+1=1，而是1+1=2，因为闭包内的x对上次计算的结果进行了存储，并没有因为外层的`let x = 0`而销毁掉x的值。

所以回到上个问题，如何在add()方法中对参数进行存储，就是需要用到闭包

```javascript
function add(){
  let params = [...arguments]; // 第一次初始化接受第一个参数
  let args = function(){
    console.log("params",params)
    console.log("arguments",arguments)
    return args
  }
  
  args.toString = function(){
    return params
  }
  
  return args
}

console.log(add(1)(2)(3)(4))

// 控制台会输入如下结果
parmas [1]
arguments Arguments [2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
parmas [1]
arguments Arguments [3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
parmas [1]
arguments Arguments [4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
ƒ Function
```

params输出的是第一次传入的参数，而arguments输出是每次参数人新参数，那么是不是可以把arguments每次传入的新参数添加到params数组中呢？

```javascript
function add(){
  let params = [...arguments];  // 第一次初始化接受第一个参数
  let args = function(){
    console.log("params",params)
    console.log("arguments",arguments)
    params.push(...arguments)  // arguments传入到params数组中
    return args
  }
  
  args.toString = function(){
    return params
  }
  
  return args
}

console.log(add(1)(2)(3)(4))

// 控制台输出如下
params [1]
arguments Arguments [2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
params (2) [1, 2]
arguments Arguments [3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
params (3) [1, 2, 3]
arguments Arguments [4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
ƒ Function
```

params把每次传来的传输都累加到了数组中，但是最终返回的结果并不正确，返回的结果是`ƒ Function`,这并不是我们想要的。所以还需要改造，就是把`args.toString`里面的params数组进行累加，可以通过reduce()方法对所有数字求和。

最终改造如下

```javascript
function add() {
      // 第一次执行的时候,存储第一个参数
      let params = [...arguments];
      let args = function () {
        // 闭包的特性中可以存储变量，变量在内存中不会被销毁，通过对每次新传入的参数进行累加
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

大功告成，以上就是最终改造好的代码！

## async/await的缺陷

`Async/await`让你的代码看起来是同步的，在某种程度上，也使得它的行为更加地同步。 `await`关键字会阻塞其后的代码，直到promise完成，就像执行同步操作一样。它确实可以允许其他任务在此期间继续运行，但您自己的代码被阻塞。

这意味着您的代码可能会因为大量`await`的promises相继发生而变慢。每个`await`都会等待前一个完成，而你实际想要的是所有的这些promises同时开始处理（就像我们没有使用`async/await`时那样）。

```javascript
function timeoutPromise(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve("done");
    }, interval);
  });
};
```

上面定义了一个timeoutPromise()方法，它返回的是一个promise对象，对象里面有一个计时器，计时器时间由传来的参数决定。

```javascript
 let startTime = Date.now();
  timeTest().then(() => {
    let finishTime = Date.now();
    let timeTaken = finishTime - startTime;
    alert("Time taken in milliseconds: " + timeTaken);
  })
```

定义了startTIme变量，记录第一次执行的时间戳，在timeTest执行到then方法内，定义finishTime变量记录当前的时间戳，通过相减，查看`timeTest（）`promise需要多长时间才能完成。

### 方式1

```javascript
async function timeTest() {
   await timeoutPromise(3000);
   await timeoutPromise(3000);
   await timeoutPromise(3000);
 }
```

在这里，我们直接等待所有三个timeoutPromise（）调用，使每个调用3秒钟。后续的每一个都被迫等到最后一个完成 - 如果你运行第一个例子，你会看到警报框报告的总运行时间大约为9秒。

### 方式2

```javascript
    async function timeTest() {
      const timeoutPromise1 = timeoutPromise(3000);
      const timeoutPromise2 = timeoutPromise(3000);
      const timeoutPromise3 = timeoutPromise(3000);

      await timeoutPromise1;
      await timeoutPromise2;
      await timeoutPromise3;
    }
```

在这里，我们将三个Promise对象存储在变量中，这样可以同时启动它们关联的进程。

接下来，我们等待他们的结果 - 因为promise都在基本上同时开始处理，promise将同时完成;当您运行第二个示例时，您将看到警报框报告总运行时间超过3秒！

### 小结

通过上年两个方法，要牢记，如果不需要让await对应的函数顺序执行的情况下，最好通过定义变量的形式存储promise对象，这样能够加快执行的速度和效率，减少对于后面代码执行的堵塞时间。

## 如何实现 (obj == 1 && obj == 2 && obj == 3)  结果为 true

思考这个问题，第一步肯定不是以基本类型Number类型去考虑的，有什么方式可以让它每次执行的时候都改变，而且还不是一个函数。那就只有Object对象类型了。而正常的Object对象类型，需要指定键值对才可以实现对象属性变更。可以看看下面例子：

```javascript
    let obj = {
      num: 1,
      value: function () {
        return this.num++
      }
    }

   obj.value() == 1 && obj.value() == 2 && obj.value() == 3  // true

```

上面效果已经有了，但是还不符合题目的要求，题目的要求是没有键值对的。所以需要在考虑一下如何去掉它。

再仔细分析`(obj == 1 && obj == 2 && obj == 3)`可以看到`obj == 1`那肯定隐性执行了类型转换，从这个角度去考虑，我可以看个例子：

```javascript
    let obj = {
      num: 1,
      value: function () {
        return this.num++
      }
    }

    console.log(typeof obj)  // object
    obj += 1;                // obj对象和数字1进行运算
    console.log(typeof obj)  // string
```

本来obj是object类型的，当执行了`obj += 1`之后变成了string类型，这中间就进行了显示类型转换，而且转换成为了string类型。它不会因为累加是number类型而变成number类型。那中间转换成为了string类型有没有进过toString方法呢？看看下拉例子：

```javascript
    let obj = {
      num: 1,
      toString: function () {
        console.log("执行了toString方法")  // 这里会被执行
        return this.num++
      }
    }

    console.log(typeof obj)  // object
    obj += 1;                // 执行了toString方法
    console.log(typeof obj)  // string
```

上面的例子是obj进行了显示的类型转换，那把`obj += 1`改成`obj == 1`呢，会是什么效果，我可以看看下面例子：

```javascript
    let obj = {
      num: 1,
      toString: function () {
        console.log("执行了toString方法")  // 这里会被执行
        return this.num++
      }
    }

    console.log(typeof obj)  // object
    obj == 1;                // 执行了toString方法
    console.log(typeof obj)  // object
```

`obj == 1`执行的隐式转换，当运算执行完毕之后，obj类型还是object，到这一步其实就已经成功了！我们来看看最开始提的问题的执行效果：

```javascript
    let obj = {
      num: 1,
      toString: function () {
        console.log("执行了toString方法")  // 这里会被执行
        return this.num++
      }
    }

    console.log(obj == 1 && obj == 2 && obj == 3)  // true

// 控制台打印的内容如下
执行了toString方法
执行了toString方法
执行了toString方法
true
		
```

其实obj这个对象下的num放在window全局环境中也是可以的，可以使用箭头函数来改造代码，前提是我们要了解箭头函数，箭头函数是没有this环境的，它的this会指向外层作用域。

```javascript
window.num = 1;
let obj = {
  toString: () => {
    console.log("num结果为：" + this.num)  // 这里会被执行
    return this.num++
  }
}
console.log(obj == 1 && obj == 2 && obj == 3)  // true

// 控制台打印的内容如下
num结果为：1
num结果为：2
num结果为：3
true
```

上面除了使用toString()方法外，还可以使用valueOf()方式，也可以实现同样的效果。valueOf() 方法可返回 Boolean 对象的原始值。

```javascript
    let obj = {
      num: 1,
      valueOf: function () {
        console.log("执行了valueOf方法")  // 这里会被执行
        return this.num++
      }
    }

    console.log(obj == 1 && obj == 2 && obj == 3)  // true

// 控制台打印的内容如下
执行了valueOf方法
执行了valueOf方法
执行了valueOf方法
true
```



大功告成！

### 小结

这里面核心涉及到的就是类型的显示转换和隐式转换，obj转换的时候会执行toString()方法和valueOf()方法，所以当有特殊需要的时候，可以重写toString()或者valueOf()方法来达到想要的效果。

## 求最大值

js内建的Math.max()方法可以接受任意数量的参数并且返回最大的那个值。

```javascript
let value1 = 10
let value2 = 20

Math.max(value1,value2)  // 20
```

如果只是处理两个值，那么Math.max()非常简单易用。传入两个值之后直接会返回最大的那一个。但是如果想要从一个数组中挑选出最大的那个值应该怎么做呢？`Math.max()`方法不允许传入数组，所以在ECMAScript5早期版本中，可能需要手动实现从数组中遍历取值，或者像这样使用apply()方法。

```javascript
let values = [10,20,30,40,5,2,41]

Math.max.apply(Math,values) // 41
```

这个解决方案确实可行，但如此使用 apply() 会让人有一点疑惑，它实际上使用了额外的语法 混淆了代码的真实意图。

使用ES6的扩展运算符就可以简化上面的案例，向Math.max()方法传入一个数组，再在数组前添加不定参数中使用的...符号，就无须再调用apply()方法了。JS 引擎将会将该数组分割为独立参 数并把它们传递进去。就像这样：

```javascript
let values1 = [10,20,30,40,5,2,41]

// 等价于 Math.max(10,20,30,40,5,2,41)
Math.max(...values1)  // 41

let value2 = [-1, -3, -2]
    
// 等价于 Math.max(-1, -3, -2)
Math.max(...value2)  // -1
```

现在调用 `Math.max()` 看起来更传统一些，并避免了为一个简单数学操作使用复杂的 this 绑定(即在上个例子中提供给 `Math.max.apply()` 的第一个参数)。

使用apply()方法需要手动指定this的绑定,如之前案例中的Math.max.apply()方法的第一个参数，如果需要展开运算符可以使这种简单的数学运算看起来更加简洁。

## 箭头函数

ES6 中最有趣的新增特性就是箭头函数，它与传统的Javascrpit函数有些不同，主要集中在以下方面：

* 没有this、super、arguments和new.target绑定。箭头函数中的this、super、arguments及new.target这些值由外部最近一层非箭头函数决定。
* 不能通过new关键字调用，箭头函数没有[[Construct]]方法，所以不能被用作构造函数，如果通过new关键字调用箭头函数，程序会抛出错误。
* 没有原型，由于不能通过new关键字调用箭头函数，因而没有构建原型的需求，所以箭头函数不存在prototype这个属性。
* 不可以改变this的绑定。函数内部的this值不可被改变。在函数的生命周期内是始终一致。
* 不支持arguments对象。箭头函数没有arguments绑定，所以你必须通过命名参数和不定参数这两种形式访问函数的参数。
* 不支持重复的命名参数。无论在严格模式还是非严格模式下，箭头函数都不支持重复的命名参数。而在传统函数的规定中，只有严格模式下菜不能有重复的命名参数。

产生这些差异是有理由的。首先并且最重要的是，在 JS 编程中 this 绑定是发生错误的常 见根源之一，在嵌套的函数中有时会因为调用方式的不同，而导致丢失对外层 this 值的追 踪，就可能会导致预期外的程序行为。其次，箭头函数使用单一的 this 值来执行代码，使 得 JS 引擎可以更容易对代码的操作进行优化;而常规函数可能会作为构造函数使用(导致this 易变而不利优化)。

其余差异也聚集在减少箭头函数内部的错误与不确定性，这样 JS 引擎也能更好地优化箭头函数的运行。

```javascript
let sum = value => value

// 等价于
let sum = function(value){
  return value
}
```

```javascript
let sum = (num1, num2) => num1 + num2;
// 有效等价于:
let sum = function(num1, num2) {
    return num1 + num2;
};
```

```javascript
let getName = () => "Nicholas";
// 有效等价于:
let getName = function() {
    return "Nicholas";
};
```

```javascript
let sum = (num1, num2) => {
    return num1 + num2;
};
// 有效等价于:
let sum = function(num1, num2) {
    return num1 + num2;
};
```

基本可以将花括号内部的代码当做传统函数那样对待，除了 arguments 对象不可用之外。 若想创建一个空函数，就必须使用空的花括号，就像这样:

```javascript
let doNothing = () => {};

// 有效等价于:
let doNothing = function(){}
```

花括号被用于表示函数的主体，但若箭头函数想要从 函数体内向外返回一个对象字面量，就必须将该字面量包裹在圆括号内，例如:

```javascript
let getTempItem = id => ({ id: id, name: "Temp" }); 

// 有效等价于:

let getTempItem = function(id) {
    return {
        id: id,
        name: "Temp"
    };
};
```

## js原型prototype的数据共享(继承)

在Javascript语言中，`new`命令后面跟的不是类，而是构造函数`constructor`。

看下面例子：

```javascript
function Person(name){
  this.name = name
}

let jack = new Person("Jack")

console.log(jack.name) // Jack 
```

在上面，我们创建了一个叫做Person构造函数，它表示`Person`对象的原型。然后通过new关键字，生成了一个jack对象的实例。

用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。

```javascript
function Person(name){
  this.name = name
}

let jack = new Person("Jack")
let mark = new Person("Mark")

jack.name = "Smallzip"

console.log(jack.name)  // Smallzip
console.log(mark.name)  // Mark
```

上面，我们生成了两个实例对象，对其中的jack实例对象的name属性进行了修改，后面把两个实例对象打印出来发现，这两个对象的`name`属性是独立的，修改其中一个，不会影响到另一个。

**prototype属性的引入**

所有的构造函数里面都有一个`prototype`对象。它可以实现对象里面的属性和方法的共享。而那些不需要共享的属性和方法，就放在构造函数里面。

实例对象一旦创建，将自动引用`prototype`对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是私有的，另一种是引用的。

```javascript
function Person(){}

Person.prototype.name = "Smallzip"

let jack = new Person()
let mark = new Person()

console.log(jack.name)  // Smallzip
console.log(mark.name)  // Smallzip
```

上面，设置了`Person`的原型`prototype`里面的`name`属性为`Smallzip`，两个实例共享了`name`属性。原型`prototype`数据共享也可以理解为继承，它是属于继承的一种方式。以上是ES5的实现共享的方式。

尽管一部分javascript开发者强烈坚持javascript中不需要类，但是由于类似的库层出不穷，最终在ES6中引入了类的特性。

下面是ES6中类特性的案例：

```javascript
class PersonClass{
  // 等价于前面案例中的Person构造函数
  constructor(name){
    this.name = name
  }
  
  // 等价于前面案例中的Person的原型方法
  // 等价于Person.prototype.sayName = function(){ }
  sayName(){
    console.log(this.name)
  }
}

let person = new PersonClass("smallzip")

console.log(person.name)  // smallzip

console.log(person instanceof PersonClass)  // true
console.log(person instanceof Object)  // true

console.log(typeof PersonClass)  // function
console.log(typeof PersonClass.prototype.sayName)  // function
```

通过类声明语法定义`PersonClass`的行为与之前创建`Person`构造函数的过程类似，只是直接在类中通过特殊的`constructor`方法名来定义构造函数。需要了解，类的声明仅仅是基于已有的自定义类型声明的语法糖，也就是说它就是ES5中原型包装出来的语法糖。`typeof PersonClass`返回结果是`function`，所以`PersonClass`声明实际上创建了一个具有构造函数方式行为的函数。案例中的`sayName`方法实际上是`PersonClass.prototype`上的一个方法，与之类似的是，`sayName`也是`Person.prototype`上的一个方法，通过语法糖包装之后，类就可以代替自定义类型的功能，日常开发我们不必担心使用哪中方法，只需要关注如何定义正确的类就可以了。

除了上面的数据共享，我们再深入的了解一下`prototype`的含义。

**protoype和proto**

* `prototype`是"类"的原型
*  `__proto__`是对象的原型
* 在ES5以前，javascript没有"类"和“类继承”的特性的，只有`constructor`构造函数，但是在ES6中最终被引入。

通过上面案例我们可以知道创建了Person之后，就有`prototype`原型，而实例对象jack有`prototype`原型吗？

结果是没有！它有的是对象原型`__proto__`。

```javascript
function Person(){}

console.log(Person.prototype) // 输出如下
/**
* {constructor: ƒ}
* constructor: ƒ Person()
* __proto__: Object
**/

let jack = new Person()

console.log(jack.prototype)  // undefined 
console.log(jack)  // 输入如下
/**
* Person {}
* 	__proto__: Object
* 		constructor: ƒ Person()
* 		__proto__: Object
**/
```

实例对象的`__proto__`指向被实例的原始构造函数，即`Person`。

```javascript
function Person(){}

let jack = new Person()

console.log(Person.prototype === jack.__proto__)  // true
```

实例对象jack的`__proto__`指向的是Person的原型`prototype`，所以他们是相等的。因此看下面实例

```javascript
function Person(){}

let jack = new Person()
let mark = new Person()

jack.__proto__.name = "Smallzip"

console.log(jack.name)  // Smallzip
console.log(mark.name)  // Smallzip
```

以为实例对象的`__proto__`指向的是原始构造函数的原型，在前面的案例中我们已经知道了通过原型可以实现数据共享，而实例对象的`__proto__`又是指向的`prototype`，因此通过其中任意一个进行数据共享都是没问题的。但是我们不建议使用`__proto__`，可以参考MDN的声明。

> **已废弃**: 该特性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。
>
> **警告:** 通过现代浏览器的操作属性的便利性，可以改变一个对象的 `[[Prototype]]` 属性, 这种行为在每一个JavaScript引擎和浏览器中都是一个非常慢且影响性能的操作，使用这种方式来改变和继承属性是对性能影响非常严重的，并且性能消耗的时间也不是简单的花费在 `obj.__proto__ = ...` 语句上, 它还会影响到所有继承来自该 `[[Prototype]]` 的对象，如果你关心性能，你就不应该在一个对象中修改它的 [[Prototype]]。相反, 创建一个新的且可以继承 `[[Prototype]]` 的对象，推荐使用 [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)。
>
> **警告:** 当`Object.prototype.__proto__` 已被大多数浏览器厂商所支持的今天，其存在和确切行为仅在ECMAScript 2015规范中被标准化为传统功能，以确保Web浏览器的兼容性。为了更好的支持，建议只使用 [`Object.getPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)。

每一个对象都有`__proto__`，每当我们在控制台上面打印出对象类型的数据的时候，对象里面都会显示一个`__proto__`的`Object`属性，里面包含了很多的属性类型，唯独就是没有`prototype`原型。这意思是说`Object`类型都没有原型吗？不是的，`Object`类型的的父级是有原型的，看下面

```javascript
let obj = {}

cosnole.log(obj.prototype) // undefined
console.log(obj.__proto__ === Object.prototype)  // true
console.log(Object.prorotype) // 输出原型信息，内容太多这里不显示了，可自行在浏览器查看
```

还有一个需要了解的是构造函数的原型类型和对象的原型类型是不一样的，而对象的`__proto__`是指向的函数的`prototype`。

```javascript
console.log(typeof Object.prototype)  // object
console.log(typeof Function.prototype)  // function
console.log(Object.__proto__ === Function.prototype)  // true
```

### 总结

* `__proto__`（隐式原型）

  隐式原型指向**创建**这个对象的函数(`constructor`)的`prototype`

  隐式原型的作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问`obj`这个对象中的`name`属性时，如果在`obj`中找不到，那么就会沿着`__proto__`依次查找。

  就是我们常说的原型链上查找，而在查询的时候如何知道查询到了终点，这个时候就提现出了`__proto__`的重要之处，我们知道`Object`和`Function`是对象和函数的父级，也就是最高层，前面的案例也证明了他们没有`__proto__`原型，这意味着它们的`__proto__`为null，而正是通过`.__proto__ = null`来判断出是到了终点。具体可以参考文章[彻底理解JavaScript原型链（一）—__proto__的默认指向](https://www.jianshu.com/p/686b61c4a43d)。

* `prototype`（显式原型）

  每一个函数在创建之后都会拥有一个名为`prototype`的属性，这个属性指向函数的原型对象。

  显式原型的作用：用来实现基于原型的继承与属性的共享。

## javascript的类

大多数面向对象的编程语言都支持类和类继承的特性，而javascript却不支持这些特性，只能通过其他方法定义并关联多个相似的对象，这个状态一直从ES1持续到ES5，甚至有许多库都通过创建一些实用程序来给javascript添加类似的特性，尽管一部分javascript开发者强烈坚持javascript不需要类，但是由于类似的库层出不穷，最终还是在ES6中引入了类的特性。

### ES5中类似类的结构

JS 在 ES5 及更早版本中都不存在类。与类最接近的是:创建一个构造器，然后将方法指派到 该构造器的原型上。这种方式通常被称为创建一个自定义类型。例如:

```javascript
function PersonType(name) { 
  this.name = name;
}

PersonType.prototype.sayName = function() { 			 
  console.log(this.name);
};

let person = new PersonType("Nicholas");

person.sayName(); // 输出 "Nicholas"

console.log(person instanceof PersonType); // true 
console.log(person instanceof Object); // true
```

此代码中的` PersonType` 是一个构造器函数，并创建了单个属性 `name `。 `sayName() `方法被 指派到原型上，因此在 `PersonType `对象的所有实例上都共享了此方法。接下来，使用 `new `运算符创建了` PersonType` 的一个新实例` person `，此对象会被认为是一个通过原型继承了

`PersonType` 与` Object 的`实例。
 这种基本模式在许多对类进行模拟的 JS 库中都存在，而这也是 ES6 类的出发点。

### 类的声明

类在ES6中最简单的形式就是类的声明，它看起来很像其他语言中的类。

### 基本的类声明

类声明以 class 关键字开始，其后是类的名称;剩余部分的语法看起来就像对象字面量中的 方法简写，并且在方法之间不需要使用逗号。作为范例，此处有个简单的类声明:

```javascript
class PersonClass{
  // 等价于前面案例中的Person构造函数
  constructor(name){
    this.name = name
  }
  
  // 等价于前面案例中的Person的原型方法
  // 等价于Person.prototype.sayName = function(){ }
  sayName(){
    console.log(this.name)
  }
}

let person = new PersonClass("smallzip")

console.log(person.name)  // smallzip

console.log(person instanceof PersonClass)  // true
console.log(person instanceof Object)  // true

console.log(typeof PersonClass)  // function
console.log(typeof PersonClass.prototype.sayName)  // function
```

这个` PersonClass` 类声明的行为非常类似上个例子中的` PersonType `。类声明允许你在其中 使用特殊的 `constructor `方法名称直接定义一个构造器，而不需要先定义一个函数再把它当 作构造器使用。由于类的方法使用了简写语法，于是就不再需要使用` function `关键字。`constructor `之外的方法名称则没有特别的含义，因此可以随你高兴自由添加方法。

> 自有属性( **Own properties** ):该属性出现在实例上而不是原型上，只能在类的构造 器或方法内部进行创建。在本例中， name 就是一个自有属性。这里建议应在构造器函数 内创建所有可能出现的自有属性，这样在类中声明变量就会被限制在单一位置(有助于 代码检查)。

有趣的是，相对于已有的自定义类型声明方式来说，类声明仅仅是以它为基础的一个语法 糖。 PersonClass 声明实际上创建了一个拥有 constructor 方法及其行为的函数，这也是

typeof PersonClass 会得到 "function" 结果的原因。此例中的 sayName() 方法最终也成为 PersonClass.prototype 上的一个方法，类似于上个例子中 sayName() 与 PersonType.prototype 之间的关系。这些相似处允许你把自定义类型与类混合使用，而不必太担忧到底该用哪个。

### 为何要使用类的语法

尽管类与自定义类型之间有相似性，但仍然要记住一些重要的区别:

1. 类声明不会被提升，这与函数定义不同。类声明的行为与 let 相似，因此在程序的执行 到达声明处之前，类会存在于临时性死区内。

2. 类声明中的所有代码会自动运行在严格模式下，并且也无法退出严格模式。
3. 类的所有方法都是不可枚举的，这是对于自定义类型的显著变化，后者必须用 `Object.defineProperty() `才能将方法改变为不可枚举。
4. 类的所有方法内部都没有` [[Construct]] `，因此使用` new `来调用它们会抛出错误。
5. 调用类构造器时不使用 `new` ，会抛出错误。
6. 试图在类的方法内部重写类名，会抛出错误。

```javascript
// 等价于 PersonClass
let PersonType2 = (function(){
  "use strict"
  
  const PersonType2 = function(name){
    // 确保通过关键字 new 调用该函数 
    if(typeof new.target === "undefined"){
      throw new Error("必须通过关键字new调用该构造函数")
    }
    
    this.name = name
  }
  
  Object.defineProperty(PersonType2.prototype,"sayName",{
    value:function(){
      // 确保不会通过new关键字调用该方法
      if(typeof new.target !== "undefined"){
        throw new Error("不可使用关键字new调用该方法")
      }
      
      console.log(this.name)
    },
    enumerable:false, // 不可枚举
    writable:true, // 可写入
    configurable:true  // 可配置
  });
  
  return PersonType2
}())
```

首先要注意这里有两个 `PersonType2` 声明:一个在外部作用域的 let 声明，一个在 IIFE 内 部的 `const `声明。这就是为何类的方法不能对类名进行重写、而类外部的代码则被允许。构 造器函数检查了 `new.target `，以保证被调用时使用了 `new` ，否则就抛出错误。接下来，`sayName() `方法被定义为不可枚举，并且此方法也检查了` new.target `，它则要保证在被调 用时没有使用` new `。最后一步是将构造器函数返回出去。

从这个案例我们可以看到，尽管可以在不使用new语法的前提下实现类的所有功能，但是如此一来，代码变得极为复杂。

## js对象中什么是可枚举(enumerable)

在平时学习过程中会经常看到别人说枚举类型，那js中的枚举是什么呢，有什么用？

### 描述

可枚举性（enumerable）用来控制所描述的属性，是否将被包括在for...in循环之中。具体来说，如果一个属性的enumerable为false，下面三个操作不会取到该属性。

1. `for in`
2. `Object.keys`
3. `JSON.stringify`

### 枚举(enumerate)的特性

```javascript
let obj = {
  a:1,
  b:2
}

obj.c = 3

console.log(obj) // {a:1,b:2,c:3}

Object.defineProperty(obj,'d',{
  value:4,
  enumerable:false // 设置为不可枚举
})

console.log(obj.d)  // 4

for(let key in obj){
  console.log(key,obj[key])
  // a 1
  // b 2
  // c 3
}

Object.keys(obj) // (3) ["a", "b", "c"]

JSON.stringify(Obj) // {"a":1,"b":2,"c":3}

Object.getOwnPropertyNames(obj) //(4) ["a", "b", "c", "d"]
```

通过上面代码块可以很清晰的知道，当给d设置了不可枚举之后，`forin`、`Object.keys`、`JSON.stringify`三个都是无法获取到d属性的。如果要获取对象自身所有的属性，包括不可枚举的属性，则可以使用`getOwnPropertyNames`方法。

如果我们要查看对象内部的某个属性是否可枚举可以使用`Object.getOwnPropertyDescriptor`来查看，代码如下：	

```javascript
let a = Object.getOwnPropertyDescriptor(obj, 'a')
console.log(a)
// configurable: true
// enumerable: true
// value: 1
// writable: true

let b = Object.getOwnPropertyDescriptor(obj, 'd')
console.log(b)
// configurable: false
// enumerable: false
// value: 4
// writable: false
```

## 属性描述符Object.defineProperty

在ES5之前，JavaScript语言本身并没有提供可以直接检测属性特性的方法，比如判断属性是否只读。

但是从ES5开始，所有的属性都具备了属性描述符。

看下面代码：

```javascript
let myObj = {
  a: 2
}

console.log(Object.getOwnPropertyDescriptor(myObj, 'a'))
// configurable: true
// enumerable: true
// value: 2
// writable: true
```

如上所示，这个普通的对象属性对应的属性描述符(也可以被称为“数据描述符”，因为它只保存一个数据值)可不仅仅是2，它还包含三个特性:writable（可写的）、enumerable（可枚举）、configurable（可配置）。

在创建普通属性时，属性描述符会使用默认值，我们可以使用`Object.defineProperty`来添加一个新属性或者修改一个已有属性（前提它是configurable）并对特性进行设置。

举例：

```javascript
let myObj = {}

Object.defineProperty(myObj,'a',{
  value:2,
  writable:true,
  configurable:true,
  enumerable:true
})

console.log(myObj.a) // 2
```

上面使用`Object.defineProperty`给`myObj`添加一个普通属性并显示指定了一些特性。

我们来介绍一个三个特别的属性。

1. **writable**

   writable决定是否可以修改属性值。

   ```javascript
   let myObj = {}
   
   Object.defineProperty(myObj,'a',{
     value:2,
     writable:false, // 不可写
     configurable:true,
     enumerable:true
   })
   
   myObj.a = 3
   
   console.log(myObj.a) // 2
   ```

   如上所示，我们对于`myObj`对象下的a属性值进行修改，结果是失败的。如果再严格模式下，这个方法会报错。

   ```javascript
   "use strict"
   
   let myObj = {}
   
   Object.defineProperty(myObj,'a',{
     value:2,
     writable:false, // 不可写
     configurable:true,
     enumerable:true
   })
   
   myObj.a = 3
   
   console.log(myObj.a) // TypeError
   ```

   TypeError错误表示我们无法修改一个不可写的属性。

2. **configurable**

   只要属性是可配置的，就可以使用`Object.defineProperty`方法来修改属性描述符。

   ```javascript
   let myObj = {
     a:2
   }
   
   myObj.a = 3
   console.log(myObj.a)  // 3
   
   Object.defineProperty(myObj,'a',{
     value:4,
     writable:true,
     configurable:false,  // 不可配置
     enumerable:true
   })
   
   console.log(myObj.a)  // 4
   
   myObj.a= 5
   console.log(myObj.a)  // 5
   
   Object.defineProperty(myObj,'a',{
     value:6,
     writable:true,
     configurable:true,  // 改为可配置，这个时候会报错：TypeError: Cannot redefine property: a
     enumerable:true
   })
   
   // 下面的代码不会执行
   console.log(myObj.a)
   ```

   最后修改`defineProperty`会产生一个TypeError错误。不管是不是处于严格模式，尝试修改一个不可配置的属性描述符都会报错。可以看到，把configurable修改成false是单向操作，不可撤回。

   还需要注意一点，即便属性`configurable`为`false`我们还是可以把`wriable`的状态由`true`改为`false`，但是无法由`false`改为`true`。即同样为单向操作，不可撤销。

   除了无法修改之外，`configurable：false`还会禁止删除这个属性：

   ```javascript
   let myObj = {
     a:2
   }
   
   delete myObj.a
   console.log(myObj.a) // undefined
   
   Object.defineProperty(myObj,'a',{
     value:2,
     writable:true,
     configurable:false,  // 不可配置
     enumerable:true
   })
   
   console.log(myObj.a) // 2
   delete myObj.a
   console.log(myObj.a)  // 2
   ```

   如上可见，最后一个delete删除操作失败了，因为属性是不可配置的。

3. **enumerable**

      这个可以参见上一章的**js对象中什么是可枚举(enumerable)**内容，有详细介绍。

   

## 函数提升和变量提升的顺序

首先我们要知道ES6新增了let,const，这两个变量声明是没有变量提升的，只有var声明的变量才有变量提升，其次声明式函数会被提升，表达式函数是不会被提升的。

```javascript
// 声明式
function fun(){};

// 匿名表达式
const fun = function(){};
// 具名表达式
const fun = function fun(){};
```

在作用域中，`var`定义的变量和声明式函数，都会提升到当前作用域最顶部，即最开始的位置，不同的是，函数的提升优先级是高于变量的优先级的，即 函数>变量，我们看下面的代码！

```javascript
function foo() {
  console.log(a);
  var a = 1;
  console.log(a);
  function a() { };
  console.log(a)
}

foo()
```

看上面的代码，在foo的函数作用域内，js引擎解析后的顺序如下：

```javascript
function foo() {
  function a() { };
  var a;
  console.log(a); // a(){} 在foo函数当前作用域链找到第一个是a(){}
  a = 1;
  console.log(a);  // 1
  console.log(a)  // 1
}
```

对比原函数输出的结果如下：

```javascript
function foo() {
  console.log(a);  // a(){}
  var a = 1;
  console.log(a); // 1
  function a() { };
  console.log(a)  // 1
}

foo()
```

我们来解释一下为什么第一个是`a(){}`而不是`undefined`或1。因为在解析器解析完之后`a()`函数提升到了最顶部，`a()`的下面就是被提升上来的a变量声明，因此第一个打印输出就是a是在当前作用域链上查找到的第一个`a()`函数，所以打印的是`a()`，第二个a复制了1所以打印的是1；

## 订阅发布

实现一个简单的事件机制，能够实现对事件的触发和监听

```javascript

class EventEmitter {
  constructor() {
    this.obj = {}
  }

  // 订阅
  on(eventName,val) {
    for (let n in this.obj) {
      if (n == eventName) {
        this.obj[n].cbs.map(cb => {
          cb(val)
        })
      }
    }
  }

  // 发布
  emit(eventName, cb) {
    let obj = this.obj
    if (eventName in obj) {
      obj[eventName].cbs.push(cb)
    } else {
      obj[eventName] = {
        cbs: []
      }
      obj[eventName].cbs.push(cb)
    }
  }
}

let eventEmitter = new EventEmitter()
// 发布
eventEmitter.emit('test', () => {
  console.log("定义了时间")
})
// 订阅
eventEmitter.on('test')
```

## HTTP常用状态

```basic
• 200：ok 请求被正常处理 
• 204：no content 请求被受理但没有资源可以返回 
• 206：partial content 客户端只请求资源的一部分，服务器对请求的部分资源执行GET方法，相应报文中通过Content-Range指定范围的资源。 
• 301：moved permanently 永久性重定向 
• 302：found 临时重定向 
• 303：see other 其他（如，负载均衡）- 
• 304：not modified 资源未更改（缓存）
• 307：temporary redirect 临时重定向，与302类似，只是强制要求使用POST方法 
• 400：bad request 请求报文语法有误，服务器无法识别 
• 401：unauthorized 请求需要认证 
• 403：forbidden 请求的对应资源禁止被访问 
• 404：not found 服务器无法找到对应资源 
• 500：internal server error 服务器内部错误 
• 501：not implemented 无法执行
• 502：bad gateway 服务器挂了
• 503：service unavailable 服务器不可用(忙)
```

#### http 304

这里涉及到了强制缓存和协商缓存，协商缓存生效则会返回304表示缓存并未被更新，可以使用浏览器内的缓存。具体可以参考[浏览器缓存机制](https://www.cnblogs.com/chengxs/p/10396066.html)，[浏览器缓存机制实践说明](https://segmentfault.com/a/1190000017962411?utm_source=tag-newest)

## 简单请求和复杂请求

日常使用vue、react框架请求数据的时候用到 插件都是axios，那axios的请求类型默认是复杂类型，那如何区分复杂类型和简单类型。

简单请求需要满足一下两个条件:

#### 请求方法是以下三种方法之一：

- HEAD
- GET
- POST

#### HTTP的头信息不超出以下几种字段:

* Accept

* Accept-Language

* Content-Language

* Last-Event-ID

* Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

### 不满足简单请求的就属于复杂请求

axios之所以是属于复杂请求，是因为默认的`Content-Type`为`application/json`，这个类型不归属于简单请求范围内，因此属于复杂请求。

#### options预检查

**HTTP 的 `OPTIONS 方法`** 用于获取目的资源所支持的通信选项。

复杂请求在正式请求前都会有预检请求，在浏览器中都能看到有`options`请求，用于向服务器请求权限信息的。

可以使用 OPTIONS 方法对服务器发起请求，以检测服务器支持哪些 HTTP 方法。

响应报文包含一个 [`Allow`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Allow) 首部字段，该字段的值表明了服务器支持的所有 HTTP 方法：

```http
HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Date: Thu, 13 Oct 2016 11:45:00 GMT
Expires: Thu, 20 Oct 2016 11:45:00 GMT
Server: EOS (lax004/2813)
x-ec-custom-error: 1
Content-Length: 0
```

#### CORS 中的预检请求

在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 中，可以使用 OPTIONS 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。预检请求报文中的 [`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method) 首部字段告知服务器实际请求所使用的 HTTP 方法；[`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers) 首部字段告知服务器实际请求所携带的自定义首部字段。服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

```http
OPTIONS /resources/post-here/ HTTP/1.1 
Host: bar.other 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
Accept-Language: en-us,en;q=0.5 
Accept-Encoding: gzip,deflate 
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7 
Connection: keep-alive 
Origin: http://foo.example 
Access-Control-Request-Method: POST 
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

服务器所返回的 [`Access-Control-Allow-Methods`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods) 首部字段将所有允许的请求方法告知客户端。该首部字段与 [`Allow`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Allow) 类似，但只能用于涉及到 CORS 的场景中。

```http
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT 
Server: Apache/2.0.61 (Unix) 
Access-Control-Allow-Origin: http://foo.example 
Access-Control-Allow-Methods: POST, GET, OPTIONS 
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type 
Access-Control-Max-Age: 86400 
Vary: Accept-Encoding, Origin 
Content-Encoding: gzip 
Content-Length: 0 
Keep-Alive: timeout=2, max=100 
Connection: Keep-Alive 
Content-Type: text/plain
```

## 为什么vue中的data要用return

因为使用return在全局中是可见的，会造成全局污染。

**而在spa中使用组件的形式输出data是需要return的，这些数据只在当前组件中有效。不影响其他组件。**

在简单的vue实例中，代码如下：

```javascript
new Vue({
  el:'#app',
  data:{
    msg:'我是全局数据，全局可见'
  }
})
```

在组件中如下：

```javascript
export default{
  data(){
    return {
      msg:'只有组件可用'
    }
  }
}
```

## 微任务

在JavaScript中微任务有`promise`，`process.nextTick()`，`MutationObserver`

`process.nextTick()`会在微任务最开头执行，当`promise`的`resolve`执行了回调之后会被排在`nextTick`后面执行。

```javascript
new Promise((resolve) => {
  console.log(0)
  resolve(1)
}).then(res => {
  console.log(res)
})

process.nextTick(() => {
  console.log(2)
})

// 最后结果会输出：0 2 1
```

`mutationObserver`会检查dom节点的更新，在DOM4阶段新增的api，取代了旧的api。

```javascript
// 选择目标节点
let target = document.querySelector('#some-id');
// 创建观察者对象
let observer = new MutationObserver(mutations => {
  mutations.forEach(mmutationuta => {
    console.log(mutation.type);
  });
});
// 配置观察选项:
let config = { attributes: true, childList: true, characterData: true }
// 传入目标节点和观察选项
observer.observe(target, config);
// 随后,你还可以停止观察
observer.disconnect();
```

## 从输入url到页面展现发生了什么？其中在页面渲染以及网络请求响应的性能优化方面，我们分别可以做哪些优化工作？

主要分为4个步骤：

1. 当发送一个URL请求时，不管这个URL请求是Web页面的URL还是Web页面上资源的URL，浏览器都会开启一个线程来处理这个请求，同时在远程DNS服务器上启动一个DNS查询，真能使得浏览器获得请求对应的IP地址。

   > dns解析:
   >
   > - 先在本地host查找
   > - 到浏览器dns缓存查找
   > - 到根域名服务器查找
   > - 找主域名服务器查找
   > - 返回ip地址

2. 浏览器缓存

   * 强制缓存maxAge未过时直接读取本地磁盘，无需建立连接(from memory cache内存缓存)或(from disk cache硬盘缓存)。
   * 协商缓存通过if-modify-since或Etag(优先级更高)，协商缓存就是强制缓存失败后，浏览器携带缓存表示向放服务器发起请求，由服务器根据缓存表示决定是否使用缓存。

3. 浏览器与远程Web服务器通过TCP三次握手协商来建立一个TCP/IP链接，握手包括syn-->syn-ack-->ack，这三个报文在浏览器和服务器之间传递，该握手首先由客户端尝试建立起通信，而后服务器应答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文。

4. 一旦TCP/IP链接建立，浏览器会通过该链接向远程服务器发送HTTP和GET请求。远程服务器找到资源并使用HTTP响应返回改资源，值为200的HTTP响应状态表示一个正确的响应。

5. 浏览器渲染
   * 浏览器主进程通知GUI渲染进程开始工作
   * 解析HTML生成DOM Rree ，解析CSS生成CSS Rule Tree，javascript可以根据DOM API操作DOM，这个会堵塞DOM Tree的生成过程
   * 生成完毕后得到Layout Tree
   * 进入布局阶段，计算Layout Tree在设备视口内的确切位置和大小，就是回流阶段(重排:reflow)
   * 接着将Layout Tree中每个节点转换成屏幕上的实际像素，也就是绘制阶段(重绘:repoint)
   * 最后合成阶段浏览器会将各层信息发送给GPU，GPU将各层合并，显示在屏幕上
   
   ![image-20210302175220649](/Users/smallzip/Library/Application Support/typora-user-images/image-20210302175220649.png)
   
   上图为渲染的过程！

### 可优化的工作

1. DNS优化
2. 减少http、ajax的请求
3. 采用cdn(分发网络)
4. 服务器开启gzip压缩，在http响应报文内容设置这个属性
5. 使用精灵图片，将小图标全部合并成为一个精灵图片
6. 页面做懒加载
7. 按需导入响应的组件
8. 减少重排和重绘，最重要是重排，性能影响最高

## 浏览器进程通信与Web Workers

在前端浏览器中，JavaScript主线程与UI渲染用一个线程。执行JavaScript的时候UI渲染 是停滞的，渲染􏷛UI时，JavaScript是停滞的，两者相互阻塞。长时间执行javascript将会造成UI停顿不响应。为了解决这个问题，HTML5提出了WebWorker API。WebWorker允许创建工作线程并在后台运行，使得一些阻塞较为严重的计算不影响主线程上的UI渲染。它的API如下所示：

```javascript
var worker = new Worker('worker.js'); 
worker.onmessage = function (event) {
	document.getElementById('result').textContent = event.data; 
};
```

其􏵞中，worker.js如下所示􏵡􏲛􏶀：

```javascript
varn=1;
search: while (true) {
	n+=1;
	for (var i = 2; i <= Math.sqrt(n); i += 1)
		if (n % i == 0) continue search;
       // found a prime
	postMessage(n); 
}
```

主线程与工作线程之间通过onmessage()和postMessage()进行通信，子进程对象则由send()方法实现主进程向子进程发送数据，message事件实现收听子进程发来的数据，与API一定程度上相似。通过消息传递内容，而不是共享或直接操作相关资源，这个是较为轻量和无依赖的做法。

参见《深入浅出Node.js》PDF中258页。

参考MDN[Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API)

参考阮一峰[Web Workers使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

## polyfill初试

polyfill是一个js库，babel解析es6以及es6+以上版本的新语法成为es5以上版本可以执行的代码，但是，并没有解决一些旧的js代码在不同浏览器的差异，这个差异处理就被分配给了ployfill来做，这样就能实现旧的浏览器支持一些新的功能和特性。

下面这个是es6语法

```javascript
const fun = (a,b) =>{
  return Object.assign(a,b)
}
```

通过babel解析之后如下：

```javascript
"use strict"

var foo = function fun(a,b){
	return Object.assign(a,b)
}
```

`Object.assign`是属于es6的语法，在一些旧的浏览器是不能运行的，那处理这些问题，使得更低版本的浏览器脚本能够运行就用到了polyfill。

## 手动实现instanceof

`instanceof`用来检查是否匹配对应的原型。

可以通过下面例子理解一下它的使用方式：

```javascript
function Person(){}   // 创建一个构造函数
function Student(){}  // 创建一个构造函数
const person = new Person()  // 实例化构造函数

console.log(person instanceof Person)  // true
console.log(person instanceof Student)  // false
```

可以看到，`person`实例只有匹配到它本身的构造函数中时才会显示正确，那这个`instanceof`是如何实现的呢？

```javascript
    function Person() { }   // 创建一个构造函数
    function Student() { }  // 创建一个构造函数
    const person = new Person()  // 实例化构造函数

    console.log(instance(person, Person)) // true
    console.log(instance(person, Student)) // false
	
		// 创建一个方法，接受两个参数，第一个是要匹配的函数，第二个是构造函数
    function instance(a, b) {
      a = a.__proto__  // 实例对象只有[[Prototype]]即__proto__，指向原型
      b = b.prototype  // 构造函数的原型
      while (true) {
        if (a === null) { // 最顶层未找到则不属于同一个构造函数
          return false
        }
        if (a === b) {
          return true
        }
        a = a.__proto__  // 一直往下找原型
      }
    }
```

## js深拷贝的实现

深拷贝要考虑是什么类型，如果是对象类型，或者数组类型则需要继续往下拷贝，这个就是区别于浅拷贝和深拷贝的差异。

要检查内容类型不能使用`typeOf`，因为它不能区分`array`和`object`对象，而拷贝最核心要拷贝的就是数组和对象内容。所以只能使用原型检查工具`instanceof`，它是可以区分数组和对象的。

可以看一下下面的例子：

```javascript
function Oo() {}
console.log(Oo instanceof Object) // true
console.log(Oo instanceof Function) // true

console.log(typeof []) // object
console.log(typeof {}) // object
```

所以最终深拷贝要考虑的就是如果是对象或者数组那就继续往深处拷贝，这就考虑用到递归，最终实现如下：

```javascript
// 深拷贝
function clone(obj) {
  let buf;
  if (obj instanceof Array) {
    buf = []
    let i = obj.length;
    while (i > 0) {
      buf[i] = clone(obj[i])
      i--
    }
    return buf
  } else if (obj instanceof Object) {
    buf = {}
    for (const item in obj) {
      buf[item] = clone(obj[item])
    }
    return buf
  } else {
    return obj
  }
}

```

## 操作系统进程通信与线程通信

### 进程和线程的区别

1. 进程是资源分配的最小单位，线程是程序执行的最小单位，CPU调度的最小单位。
2. 进程有自己独立的地址空间，线程共享进程的地址空间。
3. 进程之间的资源的独立的，线程共享本进程的资源。

#### 进程间通信

1. 管道(包括管道和命名管道)内存中类似于文件的模型，多进程可读写
2. 消息队列内核中的队列
3. 共享内存
4. 信号量
5. 套接字，不同主机的进程通信方式

#### 线程通信

1. 共享内存
2. 管道

## js中new做了什么

普通的new的方式如下：

```javascript
let Pa = function (name, age) {
  this.name = name
  this.age = age
}
Pa.prototype.say = function () {
  console.log(this.name)
}

let newPa = new Pa()

console.log(newPa instanceof Pa)
console.log(newPa.hasOwnProperty('name'))  // true
console.log(newPa.hasOwnProperty('age'))  // true
console.log(newPa.hasOwnProperty('say'))  // false
newPa.say() // smallzip
```

自己实现new的方法如下：

```javascript
// 手动实现
let creteObject = function (Fun, ...params) {
  // 以fun的原型创建新的对象
  let newObj = Object.create(Fun.prototype)
  // 将this和传来的参数传给fun构造函数
  Fun.apply(newObj, params)
  // 返回新的对象
  return newObj
}

let obj = creteObject(Pa, 'smallzip', 23)

console.log(obj instanceof Pa)
console.log(obj.hasOwnProperty('name')) // true
console.log(obj.hasOwnProperty('age')) // true
console.log(obj.hasOwnProperty('say')) // false
obj.say() // smallzip
```

可以看到效果是完全一样的！

## 手动实现bind,call,apply

```javascript
Function.prototype.myBind = function(){
  const params = Array.prototype.slice.call(arguments)  // 将参数拆解为数组
  const fun = params.shift()  													// 获取构造函数，即数组第一项
  const self = this  																		// 放回创建的新的方法
  return function(){
    return self.apply(fun,args)
  }
}

Function.prototype.myCall = function (thisObj, ...args) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const fn = Symbol('fn');
  thisObj = thisObj || window;
  thisObj[fn] = this;
  const result = thisObj[fn](...args)
  delete thisObj;
  return result;
}


Function.prototype.myApply = function (thisObj, args) {
  if (typeof this !== 'function') {
    throw new Error('error')
  }
  const fn = Symbol('fn')
  thisObj = thisObj || global;
  thisObj[fn] = this;  							 // 给传来的对象内添加一个fn的key，值为this的函数
  const result = thisObj[fn](args);  // 执行一遍函数内部
  delete thisObj[fn];
  return result;
}
```

## 图片懒加载

```javascript
function loadImg (src) {
    var promise = new Promise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject('图片加载失败')
        }
        img.scr = src
    })
    retrun promise
}
var result = loadImg('www.baidu.com')


```

## js实现mixins混入

1. 第一个实现对象的混入：

```javascript
/**
 * 定义一个混入的函数
 */
function mixins() {
  let target = {};
  for (let i = 0; i < arguments.length; i++) {
    for (let prop in arguments[i]) { // 遍历对象中的每一个可枚举的属性
      if (prop in arguments[i]) {
        target[prop] = arguments[i][prop];
      }
    }
  }
  return target;
}

let obj1 = {
  name: 'smallzip',
  age: 23
}

let obj2 = {
  school: 'world school',
  graduation: false,
  interest: () => {
    console.log("敲代码")
  }
}

// 会覆盖前面的属性
let obj3 = {
  graduation: true
}

let target = mixins(obj1, obj2, obj3);
console.dir(target);
// {
//   name: 'smallzip',
//   age: 23,
//   school: 'world school',
//   graduation: true,
//   interest: [Function: interest]
// }
target.interest() // 敲代码
```

2. 第二个实现方法，类的混入

```javascript

/**
* @param {*} target 目标
* @param {*} source 混入的对象数组
**/
 function applyMixins(target, source) {
      source.forEach(item => {
      // 实例化获取构造函数的属性
      let instance = new item;
      Object.getOwnPropertyNames(instance).forEach(name => {
        target.prototype[name] = instance[name] // 对属性进行混入
      })
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
        target.prototype[name] = item.prototype[name]  // 对方法函数进行混入
      })
      });
     }


  class A {
    constructor() {
      this.a = 'aaa'
    }
    getA() {
      console.log(this.a)
    }
  }

  class B {
    constructor() {
      this.b = 'bbb'
    }
    getB() {
      console.log(this.b)
    }
    other() {
      console.log('我是B的方法')
    }
  }

  class C {
    constructor() {
      this.c = 3
    }
    other() {
      console.log('我是C的方法')
    }
  }

  applyMixins(C, [A, B]); // 执行混入操作

  let c = new C() // 实例化目标函数
  console.log(c) // 
  c.getA() // aaa
  c.getB() // bbb
  c.other() // 我是B的方法
```

## axios实现下载blob数据流的excel表单

```javascript
 axios({
      // 指定请求方式
      method: "get",
      url: url, // 接口地址
      // 请求类型为blob
      responseType: "blob",
      withCredentials: true, // 允许附带cookit
      headers: {
        Authorization: this.$store.getters.token, // 附带的token
      },
      data:params, // 参数
    })
      .then((res) => {
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" }); // res就是接口返回的文件流了
        let objectUrl = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.setAttribute("href", objectUrl);
        a.setAttribute("download", `表单.xls`);
        a.click();
      })
      .catch((err) => {
        console.log("下载失败")
      });
```

## 手动实现Promise

promise是有对应的第一阶段，第二阶段等规范的，现在简单的实现一下promise。

```javascript
 /**
  * 手动实现promise，支持同步，异步
  * 同步模式下，执行顺序是  executor ==> [resolve | reject] ==> then
  * 异步模式下，执行顺序是  executor ==> then ===> [resolve | reject]
  */
 class Promise {
   constructor(executor) {
     this.state = 'pedding'; // 默认为pedding状态
     this.value = undefined; // 存放成功的值
     this.reason = undefined; // 存放失败的值

     // 发布，订阅
     this.onResolveCallBacks = []
     this.onRejectedCallBacks = []

     let resolve = (value) => {
       this.value = value;
       this.state = 'fulfilled'
       this.onResolveCallBacks.forEach(fn => fn()) // 依次执行对应的回调
     }

     let reject = (reason) => {
       this.reason = reason;
       this.state = 'rejected'
       this.onRejectedCallBacks.forEach(fn => fn()) // 依次执行对应的回调
     }

     try {
       executor(resolve, reject)
     } catch (error) {
       reject(error)
     }
   }

   then(onResolve, onRejected) {
     // 为pedding状态下，将onResolve, onRejected函数存放起来，等待状态确定后，再依次执行函数回调
     if (this.state == 'pedding') {
       this.onResolveCallBacks.push(() => {
         onResolve(this.value)
       })

       this.onRejectedCallBacks.push(() => {
         onRejected(this.reason)
       })
     }

     if (this.state == 'fulfilled') {
       onResolve(this.value)
     }

     if (this.state == 'rejected') {
       onRejected(this.reason)
     }
   }
 }
```

实现之后可以测一下看看是否实现了同步和异步：

```javascript
 /**
  * promise的使用
  */
 new Promise((resolve, reject) => {
   resolve("成功了")
 }).then(res => {
   console.log(res)
 }, (err) => {
   console.log(err)
 })
```

## 性能优化

常见的性能优化总结如下：

![img](https://user-gold-cdn.xitu.io/2020/6/12/172a8d04b10f17fe?imageslim)

## script元素

将 JavaScript 插入 HTML 的主要方法是使用`<script>`元素。

script有八个属性，这里特别说明其中的两个属性：

- async:可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其 他脚本加载。只对外部脚本文件有效。
- defer:可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。 在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。

### async异步执行脚本

HTML5 为`<script>`元素定义了 async 属性。从改变脚本处理方式上看，async 属性与 defer 类似。当然，它们两者也都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与 defer 不同的 是，标记为 async 的脚本并不保证能按照它们出现的次序执行

```html
<!DOCTYPE html>
<html>
  <head>
  <title>Example HTML Page</title>
  <script async src="example1.js"></script> <script async src="example2.js">	   </script> </head>
  <body>
  <!-- 这里是页面内容 -->
  </body>
</html>
```

在这个例子中，第二个脚本可能先于第一个脚本执行。因此，重点在于它们之间没有依赖关系。给 脚本添加 async 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到 该异步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。 

异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded(参见第 17 章)之 前或之后。Firefox 3.6、Safari 5 和 Chrome 7 支持异步脚本。使用 async 也会告诉页面你不会使用 document.write，不过好的 Web 开发实践根本就不推荐使用这个方法。

### defer延迟执行脚本

defer这个属性表示脚本在执行的时候不会改 变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在`<script>`元素上 设置 defer 属性，相当于告诉浏览器立即下载，但延迟执行。

```html
<!DOCTYPE html>
    <html>
<head>
<title>Example HTML Page</title>
<script defer src="example1.js"></script> <script defer src="example2.js"></script> </head>
<body>
<!-- 这里是页面内容 -->
</body>
</html>
```

虽然这个例子中的`<script>`元素包含在页面的`<head>`中，但它们会在浏览器解析到结束的 `</html>`标签后才会执行。HTML5 规范要求脚本应该按照它们出现的顺序执行，因此第一个推迟的脚 本会在第二个推迟的脚本之前执行，而且两者都会在 DOMContentLoaded 事件之前执行。不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 DOMContentLoaded 事件之前执行，因此最好只包含一个这样的脚本。

如前所述，defer 属性只对外部脚本文件才有效。这是 HTML5 中明确规定的，因此支持 HTML5 的浏览器会忽略行内脚本的 defer 属性。IE4~7 展示出的都是旧的行为，IE8 及更高版本则支持 HTML5 定义的行为。

对 defer 属性的支持是从 IE4、Firefox 3.5、Safari 5 和 Chrome 7 开始的。其他所有浏览器则会忽略这 个属性，按照通常的做法来处理脚本。考虑到这一点，还是把要推迟执行的脚本放在页面底部比较好。

##  深入事件处理、事件循环和异步机制

### 浏览器的生命周期

浏览器输入url到渲染到过程需要经历很多到步骤，下图介绍了输入`https://www.ghzs.com/`时，生命周期从开始到结束到过程：

![生命周期流程](https://pic1.zhimg.com/80/v2-a331224c9fbdff4733456224fca790b8_720w.jpeg)

浏览器输入URL之后浏览器会解析URL -> 解析DNS，返回IP地址 -> 发起TCP请求，进行三次握手 -> 资源相应 -> 页面构建，包括DOM Tree节点生成，事件处理 -> 构建完毕，生命周期结束

### 页面构建阶段
这里我主要介绍一下页面构建阶段。

页面构建阶段的目标是建立Web应用的UI，其主要包括两个步骤:

1. 解析HTML代码并构建文档对象模型（DOM）；

2. 执行Javascript代码；

浏览器处理HTML节点的过程中会交替的执行上面的两个步骤，即构建DOM和脚本执行。

![构建阶段](https://pic1.zhimg.com/80/v2-9a7e731d7c0598b502252bf53b5442a1_720w.jpeg)

#### 执行Javascript代码

所有包含在脚本中的js代码由浏览器的js引擎执行，例如，Firefox的Spidermonkey引擎， Chrome 和 Opera 的 V8引擎 和Edge的(IE的)Chakra引擎。由于代码的主要目的是提供动态页面， 故而浏览器通过全局对象提供了一个API 使JavaScript引擎可以与之交互 并改变页面内容。

js代码会有两种类型，区分两种类型的方式就是js代码所在的位置：

* 包括在函数内的叫做函数执行上文代码；
* 包括在脚本上下午(window)的叫做全局代码；

全局代码在执行到脚本的时候会从上往下一行一行的执行，函数的代码会在被全局代码调用的时候执行。

当浏览器在页面构建阶段遇到了脚本节点，它会停止HTML到DOM 的构建，转而开始执行JavaScript代码，也就是执行包含在脚本元素的全局JavaScript代码。

最后，当浏览器处理完所有HTML元素后，页面构建阶段就结束 了。随后浏览器就会进入应用生命周期的第二部分:事件处理。

### 事件处理

我们一般所说的web应用可以统称为GUI应用，也就是说这种应用会对不同类型 的事件作响应，如鼠标移动、单击和键盘按压等。因此，在页面构建阶 段执行的JavaScript代码，除了会影响全局应用状态和修改DOM外，还会注册事件监听器(或处理器)。这类监听器会在事件发生时，由浏览器调用执行。有了这些事件处理器，我们的应用也就有了交互能力。在详细探讨注册事件处理器之前，让我们先从头到尾看一遍事件处理器的总体 思想。

### 事件处理器概述

JavaScript的执行是单线程的，也就是说同一时刻只能执行一个代码片段，即所谓的单线程执行模型。

想象一下在天河公园排队相亲，很多人都看上了一个相亲对象，所以一窝蜂的单身汪排队。每个单身汪加入队伍等待叫号并“处理”。只有一个相亲对象和一堆单身汪进行交流，每当轮到某个单身汪时（某个事件），相亲对象只和一个单身汪进行交谈（处理）。

单身汪要做的就是安静的排队，等待被叫号，当一个事件抵达后，浏览器需要执行相应的事件处理函数。这里不保证每个单身汪总会极富耐心地 等待很长时间，直到下一个事件触发。所以浏览器需要一种方式跟踪发生但未处理的事件。为了实现这个目标，浏览器使用了事件队列。



![事件队列](https://pic1.zhimg.com/80/v2-78a586ce80053448d4892ecfb35e30f2_720w.jpeg)



所有已生成的事件(无论是用户生成的，例如鼠标移动或键盘按压，还是服务器生成的，例如Ajax，Fetch事件)都会放在同一个事件队列中，以它们被浏览器检测到的顺序排列。事件处理的过程可以描述为一个简单的流程图（如上图）。

* 浏览器检查事件队列头部的对首事件
* 如果浏览器没有队列对首，则继续检查
* 如果浏览器在队列对首中检查到了事件，则取出该事件并执行相应的事件处理器。在这个过程中，余下的事件在事件队列中耐心的等待，直到轮到它们被处理

重点注意浏览器在这个过程中的机制，其放置事件的队列是在页面构建阶段和事件处理阶段以外的。这个过程对于决定事件啥时候发生并将其推入事件队列很重要，这个过程不会参与事件处理线程。

> 提示：
>
> 由于一次只能处理一个事件，所以我们必须格外注意处理所有事件的总时间。执行需要花费大量时间执行的事件处理函数会导致应用卡屏、无响应、卡机等等!
>
> 如果js执行需要花费大量的时间可以考虑web work，参考[阮一峰的Web Worker 使用教程，http://www.ruanyifeng.com/blog/2018/07/web-worker.html](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

#### 异步事件

对于事件的处理，以及处理函数的调用是异步的。如下类型的事件会在其他类型事件中发生。

* 浏览器事件，例如当页面加载完成后或无法加载时
* 网络事件，例如来自服务器的相应（Ajax事件、Fetch和服务器事件）
* 用户事件，例如鼠标单击‘鼠标移动和键盘事件
* 计时器事件，当timeout事件到了或者又触发了一次事件间隔

我们平时遇到的web场景中，大部分内容都是对上面事件的处理。

在事件能被处理之前，代码必须要告诉浏览器我们要处理特定事件了。接下来就看看如何注册事件处理器。

### 注册事件处理器

啥是事件处理器？又怎么注册呢？

前面已经讲过了，事件处理器是当某个特定事件发生后我们希望执行的函数。为了达到这个目标，我们必须告知浏览器我们要处理哪个事件。这个过程叫作注册事件处理器。在咱们常见的Web应用中，有两种方式注册事件。

* 函数调用，把函数赋值给某个属性或者IIFE（立即执行函数）
* 事件监听，比如addEventListener



举个例子说明一下函数调用。将一个函数赋值给window的onload属性：

```javascript
window.onload = function(){
  // do something
}
```

通过上面的方式，事件处理器就会注册到onload事件上。



举例例子说明一下事件监听。上面的方式很容易在日常开发的时候被不知情的小伙伴重写、覆盖。可以使用`addEventListener`来实现：

```javascript
document.body.addEventListener("mousemove", function() {
  // do something
})
```

通过上面的方式，为`mousemove`事件注册处理器。

#### 处理事件

我总结的事件处理背后的主要思想是：当事件发生时，浏览器调用相应的事件处理器。

由于浏览器是单线程执行模型，所以同一时刻只能处理一个事件。任何后面的事件都只能在当前事件完全结束后才能被处理。



![事件处理](https://pic4.zhimg.com/80/v2-658c0e3373425ebbd10fe66dba64d932_720w.jpeg)



我们以上面图片的例子来讲解一下事件处理。浏览器为了响应用户的动作，把鼠标移动和单击事件以它们发生的次序放入事件队列：第一个是鼠标移动事件，第二个单击事件。

在事件处理阶段中，事件循环会检查队列，发现队列的前面有一个鼠标移动事件，然后执行了相应的事件处理（序号2）。当鼠标移动事件处理器处理完毕后，轮到了等待在队列中的单击事件。当鼠标移动事件处理球函数的最后一行代码执行完毕后，JavaScript引擎退出事件处理函数，鼠标移动事件就处理完成了（序号3）。事件循环再次检查队列，发现鼠标单击事件并对该事件进行处理。一旦单击事件执行完毕，任务队列中（宏任务）没有信的事件，事件循环会继续循环，等待新的事件到来。这个循环会一直执行，直到用户关闭了应用（结束了当前脚本的全局执行上下文）。

这里我们讲到了事件循环，下面就深入事件循环，探寻更广的视野！

### 跨平台开发能力

这里为什么我要先讲解一下跨平台能力，是因为JavaScript以及不至于浏览器这个执行环境了，还有Node.js。

两种执行环境提供的API会有一些差异，其中就包括后面要讲解的事件循环、异步、定时器。通过下图简单的了解一下两个执行环境的差异。

![执行环境的差异](https://pic4.zhimg.com/80/v2-6a1a2f6e26a6330b9c0683cfbeec1b4e_720w.jpeg)

下面会先讲解浏览器的事件循环、事件处理。



### 深入事件循环

事件循环包含至少两个队列，除了事件队列，还有浏览器执行的其他操作任务的队列，这些操作任务分类两类，宏任务和为微任务。

属于宏任务事件有如下：

- setTimeout
- setInterval
- setImmediate
- MessageChannel
- requestAnimationFrame
- I/O
- UI交互事件



属于微任务事件有如下：

- Promise.then
- MutationObserver
- Object.observe
- Process.nextTick



在浏览器环境中，宏任务多例子，包括创建文档对象（DOM）、解析HTML、执行主线层JavaScript代码，页面加载、表单标签输入、网络事件、定时器等等。从浏览器等角度来看，宏任务像是一个离散的、独立的工作单元。执行完毕任务后，浏览器可以继续其他事件调度，如重新渲染页面的UI或者进行垃圾回收。

而微任务是更小的任务。微任务更新应用程序的状态（Promise），但必须要在浏览器任务（宏任务）继续执行其他任务之前执行。浏览器任务包括重新渲染页面的UI。微任务的例子包括promise回调函数、DOM节点发生变化等等。微任务要尽快的执行，通过异步的方式执行。微任务可以在重新渲染UI之前执行指定的行为，比如请求接口等等，避免不必要的UI重绘，UI重绘频率低的情况会产生视觉上的掉帧，每一帧低于16.6ms肉眼就能直观感受得到卡了。

事件循环会有两个任务队列，一个是宏任务，一个是微任务。两个队列在同一时刻只执行一个任务事件。看下图：

![任务队列](https://pic4.zhimg.com/80/v2-8b2fd4e821bc391e518353e05f827909_720w.jpeg)

事件循环给予两个基本原则：

1. 一次处理一个任务
2. 一个任务开始后直到任务完成，不会被其他任务打断



事件循环首先会检查宏任务队列，如果宏任务等待，则开始执行宏任务，直到该任务执行完毕。如果宏任务队列为空，事件循环会开始检查微任务队列。微任务队列有任务则事件循环将依次执行，直到所有的微任务都执行完毕。

这里我们要注意一下哈，一轮事件循环中，只执行一个宏任务，其余的在队列中等待，而微任务则全部执行。

当微任务队列处理完毕并清空时，事件循环会检查是否需要更新UI渲染，如果是，则会重新渲染UI试图。到这里为止，一轮事件循环已经结束了。事件循环又会开始检查宏任务队列，这个时候也是重新开启了一轮新的事件循环。



#### 细节

通过上面对事件循环应该有了全面的了解，有一些小细节要再深入一下。

* 两类任务队列都是独立于事件循环的，这意味着任务队列的添加行为也发生在事件循环之外。如果不这样设计，则会导致在执行 JavaScript代码时，发生的任何事件都将被忽略。正因为我们不希望看到这种情况，因此检测和添加任务的行为，是独立于事件循环完成的。你可以理解为当JavaScript执行环境上下午的时候把事件丢进了宏任务队列或者微任务队列，它跟事件循环是没啥交互的。

* 因为JavaScript基于单线程执行模型，所以这两类任务都是逐个执行的。当一个任务开始执行后，在完成前，中间不会被任何其他任务中断。除非浏览器决定中止执行该任务，例如，某个任务执行时间过长或内存占用过大。
* 所有微任务会在下一次渲染之前执行完成，因为它们的目标是在渲染前更新应用程序状态。
* 浏览器通常会尝试每秒渲染60次页面，以达到每秒60帧(60 fps) 的速度。60fps通常是检验体验是否平滑流畅的标准，比方在动画里，这意味着浏览器会尝试在16ms内渲染一帧。就上面的图片所示的“更新渲染”是如何发生在事件循环内的？因为在页面渲染 时，任何任务都无法再进行修改。 这些设计和原则都意味着，如果想要实现平滑流畅的应用，我们是没有太多时间浪费在处理单个事件循环任务的。理想情况下，单个任务和该任务附属的所有微任务，都应在16ms内完成。



#### 宏任务和微任务的例子

先写个代码，让它包含宏任务和微任务

```html
<button id="firstButton"></button>
<button id="secondButton"></button>
<script>
  const firstButton = document.getElementById("firstButton");
  const secondButton = document.getElementById("secondButton");   
  firstButton.addEventListener("click", function firstHandler(){    
    Promise.resolve().then(() => {
    	/* promise代码执行 4 ms*/   
    }); // 立即对象promise，并且执行then方法中的回调函数    
    /* 点击事件监听器代码执行 8 ms*/
 	});
 	secondButton.addEventListener("click", function secondHandler(){    
   /* 点击事件监听器代码执行 5ms*/
 	});
  
	/* 代码执行 15ms*/
</script>
```

上面的例子中，假设发生一下行为：

* 第5ms单击firstButton。
*  第12ms单击secondButton。
*  firstButton的单击事件处理函数firstHandler需要执行8ms。
*  secondButton的单击事件处理函数secondHandler需要执行5ms。

在firstHandler代码中我们创建立即兑现的promise，并需要运行4ms的传入回调函数。因为promise表示当前未知的一个未来值，因此promise处理函数总是异步执行。

我们创建立即兑现的promise。说实话，JavaScript引擎 本应立即调用回调函数，因为我们已知promise成功兑现。但是，为了 连续性，JavaScript引擎不会这么做，仍然会在firstHandler代码执行(需 要运行8ms)完成之后再异步调用回调函数。通过创建微任务，将回调 放入微任务队列。让我们看看本例执行的时间轴，看下面图所示：

![微任务和宏任务](https://pic2.zhimg.com/80/v2-e4842fb8bef72ca8d995a9b7c52f62af_720w.jpeg)

> 注意：为了方便观看，省略了UI渲染阶段。

如果微任务队列中含有微任务，不论队列中等待的其他任务，微任务都将获得优先执 行权。在本例中，promise微任务优先于secondButton单击任务开始执行。在微任务处理完成之后，当且仅当微任务队列中没有正在等待中的微任务，才可以重新渲染页面。在我们的示例中，当promise处理器运 行结束，在第二个按钮单击处理器执行之前，浏览器可以重新渲染页面。

注意到无法停止微任务运行，无法在微任务队列之前添加其他微任务，所有微任务的优先权高于secondButton单击任务。只有当微任务队列为空时，事件循环才会开始重新渲染页面，继续执行secondButton单 击任务，需要注意!

现在已经了解了事件循环的工作机制了，接下来开始讲解一下下一种特殊类型的事件：计时器。

### 计时器：setTimeout和setInterval

由上面的事件循环我们知道计时器是属于宏任务队列的。

浏览器提供两种创建计时器的方法，分别是`setTimeout`和`setInterval`。浏览器还提供两个清除计时器的方法，分别是：`clearTimeout`和`clearInterval`。这些方法都是挂载在window对象（全局上下午）的方法。与事件循环类型不同的是，计时器是由宿主环境提供的，比如浏览器环境和Node.js环境。

之所以要讲计时器，是想要让我们理解，计时器的延迟时间是无法确保的，理解这一点非常重要。

#### 在事件循环中执行计时器

咱们举个例子，在事件循环中执行个计时器，看下面代码：

```html
<button id="myButton"></button>
<script>
  setTimeout(function timeoutHandler(){
   /* 计时器代码执行 6ms*/   
  }, 10);  // 注册10ms后延迟执行函数
  
  setInterval(function intervalHandler(){
   /* 计时器代码执行 8ms*/   
  }, 10); // 注册每10ms执行的周期函数
  
  const myButton = document.getElementById("myButton");
  
  myButton.addEventListener("click", function clickHandler(){    
    /* 点击事件执行 10ms*/
  });  // 为按钮单击事件注册事件处理器
  
  /* 代码执行 18ms*/ 
</script>
```

上面的例子只有一个按钮，但是注册了两个计时器，首先注册延迟执行计时器，延迟10ms。

延迟执行回调函数需要执行6ms。接着，我们也注册了一个间隔执 行计时器，每隔10ms执行一次。

间隔执行回调函数需要执行8ms。我们继续注册一个单击事件处理器，需要执行10ms。

本例中的同步代码块需要运行18ms（脑补一些复杂的代码）。

![计时器](https://pic1.zhimg.com/80/v2-ee669bd0d1448ac9dfd2717253703c0c_720w.jpeg)

上图显示程序前18ms的执行状态。起初，当前运行中的任务是执行主线程JavaScript 代码。执行主线程代码需要耗时18ms。在执行主线程代码时，发生3个事件:鼠标单击事件、 延迟计时器到期事件和间隔计时器触发事件。

执行过程：

1. 在0ms时，延迟计时器延迟10ms执行，间隔计时器也是间隔 10ms。计时器的引用保存在浏览器中。
2. 在6ms时，单击鼠标。
3. 在10ms时，延迟计时器到期，间隔计时器的第一个时间间隔触发。
4. 18ms页面渲染结束。

在第18ms初始化代码结束执行时，3个代码片段正在等待执行:单击事件处理器、延迟计时处理器和间隔计时处理器。这意味着单击事件处理器开始执行。

咱们来看看下面的图：

![计时器](https://pic1.zhimg.com/80/v2-5238ec4e3158997454c8f66a6956316a_720w.jpeg)

setTimeout函数只到期一次，setInterval函数则不同，setInterval会持 续执行直到被清除。因此，在第20ms时，setInterval又一次触发。但是，此时间隔计时器的实例已经在队列中等待执行，该触发被中止。浏览器不会同时创建两个相同的间隔计时器。

还记得代码中的`setTimeout`吗，设定的是10ms后执行，但是看上面的图片，在第28ms才执行。

这就是为什么我们需要特别小心，计时器提供一种异步延迟执行代 码片段的能力，至少要延迟指定的毫秒数。因为JavaScript单线程的本 质，我们只能控制计时器何时被加入队列中，而无法控制何时执行。现 在，我们解开谜题了，让我们继续应用程序的剩余部分。

延迟计时处理器需要执行6ms，将会在第34ms时结束执行。在这段 时间内，第30ms时另一个间隔计时器到期。这一次仍然不会添加新的间 隔计时器到队列中，因为队列中已经有一个与之相匹配的间隔计时器。 在第34ms时，延迟计时处理器运行结束，浏览器又一次获得重新渲染页 面的机会，然后进入下一个事件循环迭代。

最后，间隔计时处理器在第34ms时开始执行，此时距离添加到队列 相差24ms。又一次强调传入setTimeout(fn, delay)和setInterval(fn, delay) 的参数，仅仅指定计时器添加到队列中的时间，而不是准确的执行时 间。

间隔计时处理器需要执行8ms，当它执行时，另一个间隔计时器在 40ms时到期。此时，由于间隔处理器正在执行(不是在队列中等待)， 一个新的间隔计时任务添加到任务队列中，应用程序继续执行，如下面图所示。设置间隔时间10ms并不意味着每10ms处理器就会执行完 成。由于任务在队列中等待，每一个任务的执行时间有可能不同，一个 接一个地依次执行，如本例的第42ms和第50ms时。

![计时器5](https://pic4.zhimg.com/80/v2-99ef8b05dacee1dff14f4cf61e02ae69_720w.jpeg)

上图在间隔处理器开始按每10ms执行之前，由单击处理和延迟执行引起的周折，需要花费一些时间。

最终，50ms之后，时间间隔稳定在每10ms执行一次。

通过上面的案例，我们需要记住一个重要的概念是事件循环一次只能处理一个任务，我们永远不能确定定时器处理程序是否会执行我们期望的确切时间。间隔处理程序尤其如此。 在这个例子中我们看到，尽管我们预定间隔在10、20、30、40、50、60 和70ms时触发，回调函数却在34、42、50、60和70ms时执行。在本例 中，少执行了两次回调函数，有几次回调函数没有在预期的时间点执 行。可以看出，时间间隔需要特殊考虑，并不适用于延迟执行。让我们看得更仔细些。

#### 延迟执行与间隔执行的区别

setTimeout 内的代码在前一个回调函数执行完成之后，至少延迟10ms执行(取决于事件队列的状态，等待时间只会大于10ms);而setInterval会尝试每 10ms执行回调函数，不关心前一个回调函数是否执行。

