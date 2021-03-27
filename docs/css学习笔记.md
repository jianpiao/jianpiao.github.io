# css学习笔记

> css日常技术积累

## css选择器

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css学习</title>
</head>
<style>
  .h1 {
    color: aliceblue;
  }

  #page-title {
    color: red;
  }

  .title {
    color: aqua;
  }
</style>

<body>
  <header class="page-header">
    <h1 class="title" id="page-title">深入解析css</h1>
    <nav>
      <ul id="main-nav" class="nav">
        <li>
          <a href="/" class="featured">导航1</a>
        </li>
        <li>
          <a href="/">导航2</a>
        </li>
      </ul>
    </nav>
  </header>
</body>

</html>
```

上面是一个简单的html案例，对于同一个元素应用多个规则时，规则中可能包含冲突的声明，在style样式表中包含了三个规则集，每一个规则给它指定了不同的字体颜色。标题不可能同时拥有三种颜色，所以最终的效果是显示的红色(red)。

浏览器如何知道并解决声明冲突，这其中层叠指的就是这一系列规则。它决定了如何解决冲突，是css语言的基础。层叠会依据三种条件解决冲突。

1. **样式表的来源:** 样式是从哪里来的，包括你的样式和浏览器默认样式等。
2. **选择器优先级:** 哪些选择器比另一些选择器更重要。
3. **源码顺序:** 样式在样式表里的声明顺序。

叠层的规则是按照这种顺序来考虑的，看下图

```markdown
声明冲突
	|
	|
不同的来源或者重要新 ---是---> 使用更高优先级的来源里的声明
	|
	否
	|
是不是内联样式(作用域) ---是---> 使用内联声明
	|
	否
	|
选择器是否有不同的优先级 ---是---> 使用更高优先级的声明
	|
	否
	|
使用源码顺序里较晚出现的声明
          
```

这些规则让浏览器可以以预测的方式解决css样式规则中的冲突。

### 样式表的来源

你添加到网页里的样式表并不是浏览器唯一使用的样式表，还有其他类型或来源的样式表。你的样式表属于作者样式表，除此之外还有用户代理样式表，即浏览器默认的样式。用户代理样式表优先级低，你的样式会覆盖它们。

用户代理样式表在不同浏览器上稍有差异，但是大体上是在做相同的事情：为标题`<h1>`到`<h6>`和段落`<p>`添加上下边距，为列表`<ol>,<ul>`添加左侧内边距，为链接添加颜色，为元素添加各种默认字号。

浏览器应用了用户代理样式表后才会应用你的样式表，即作者样式表，你指定的声明会覆盖用户代理样式表里面的样式，如果在html里链接了多个样式表，那么它们的来源都相同，即属于作者样式表。

用户代理样式表因为设置了用户需要的样式，所以不会做出一些超出预期的事情，当不喜欢默认样式的时候，可以在自己的样式表里面设置别的样式来覆盖用户代理样式即可。

### 覆盖用户代理样式

作为一个标准的前端打工仔，必定熟悉覆盖代理样式。这种做法实际上就是利用了层叠的样式来源规则。你写的样式会覆盖用户代理样式，因为来源不同。

样式来源规则有一个例外，标记为重要`!important`的声明。该声明就会被标记为重要的声明。

```css
color:red !important;
```

标记了`!important`的声明会被当做更高优先级的来源，因此总体的优先级按照由高到低排列，如下所示：

1. 作者的`!important`
2. 作者
3. 用户代理

### 理解优先级

如果无法用来源解决冲突声明，浏览器会尝试检查它们的优先级。理解优先级很重要，因为作者样式几乎都是属于优先级的范围，日常工作接触的大部分开发样式是来自于同源，如果不理解优先级，写出来的css样式会被坑的很惨。

浏览器将优先级分为两部分：HTML的行内样式和选择器的样式。

#### 行内样式

如果HTML的style属性写样式，这个声明只会作用于当前元素。实际上行内元素属于“带作用域”的声明，它会覆盖任何来自样式表或`<style>`标签的样式。行内样式没有选择器，因为它们直接作用于所在的元素。

```html
<li>
	<a href="/" class="featured" style="color:yellow;">导航1</a>
</li>
```

上面就是一个行内样式，设置了颜色color为黄色yellow。

如果你希望在样式表中覆盖行内样式的声明，需要在样式表中对应标签下的声明后添加`!importanta`，这样能够将它提升到一个更高优先级来源。但如果行内样式也被标记为`!imortant`那就无法覆盖它了。最好不要在行内使用`!important`，而是只在样式表中使用`!important`。

#### 选择器优先级

优先级的第二部分是由选择器优先级决定。比如，有两个类名的选择器比只有一个类名的选择器优先级更高。具体可以看下面的案例。

通过比较选择器类型来决定哪个选择器优先值最高。

```css
/* 四个标签 */
html body header h1{
  color:blue;
}

/* 3个标签和1个类 */
body header .page-header h1{
  color:orange;
}

/* 2个类 */
.page-header .title{
  color:green;
}

/* 1个id */
#page-title{
  color:red;
}
```

上面的样式表中最终显示的color颜色值为红色(red)。

### 优先级标记

一个常用的表示优先级的方式是用数组形式来标记，通常用都好隔开每个数。比如“1，2，3”表示用1个id、2个类、2个标签组成。优先级最高的id列为第一位，紧接着是类，最后是标签。

我们可以通过下面的表格来查看各种选择器和对应的优先级。

| 选择器                       | id   | 类   | 标签 | 标记  |
| :--------------------------- | ---- | ---- | ---- | ----- |
| `html body header ul`        | 0    | 0    | 4    | 0,0,4 |
| `Body header.page-header h1` | 0    | 1    | 3    | 0,1,3 |
| `.page-header .title`        | 0    | 2    | 0    | 0,2,0 |
| `#page-title`                | 1    | 0    | 0    | 1,0,0 |

现在，通过比较数值就能快速明确决定哪个优先级更高。所以上面的顺序是"1,0,0">"0,2,0">"0,1,3">"0,0,4"。而优先级低的样式表会被优先级高的样式表给覆盖。

我们日常开发不建议某个元素的样式表写过长的标签名和类名连体。一般只要能够区分优先级即可。

### 源码顺序

叠层的第三步，也是最后一步，是源码顺序。如果两个声明的来源和优先级相同，其中一个声明在样式表中出现较晚，或者位于页面较晚引入的样式表中，则该声明胜出。

```css
.nav a{
  color:white;
}

a.featured{
  color:gray;
}
```

在上面方法中，选择器优先级相同，都是(0,1,1)，最终浏览器呈现的颜色color是灰色gray。

## 相对单位

人们最熟悉同时也是最简单的像素单位-`px`,它是绝对单位，即`5px`放在哪里都是一样大。而其他单位，比如`em、rem`它们属于相对单位。相对单位的值会根据外部因素发生变化。比如`2em`的具体值会根据它作用到的元素(有时候是根据属性)而变化。因此相对单位用法比较比较难掌握。

### em

em是最常见的相对长度单位，适合基于特定的字号进行排版。在css中1em等于当前元素的字号。

```html
<div class="padded"></div>
```

```css
.padded{
  font-size:16px;
  padding:1rem; // 这里的lem就等于16px
}
```

设置了padding为1rem，最终浏览器会渲染其为16px，浏览器会根据相对单位的值计算出绝对值，称作：**计算值（computed value）**

下面我们给两个盒子，用不同字号：

```html
<span class="box box-small"></span>
<span class="box box-large"></span>
```

```css
.box{
  padding:1em;
  border-redius:1rem;
  background:red;
}

.box-small{
  font-size:12px;  // 设置第一个span的字号为12px，相对应匹配1em=12px
}

.box-large{
  font-size:18px;  // 设置第一个span的字号为18px，相对应匹配1em=18px
}
```

这里的em的好处，可以定义一个元素的大小，然后只需要改变字号就能调整缩放元素。

### 使用em定义字号

谈到font-size:1.2em属性时，em表现得不太一样。当前元素的字号决定了em。但是如果声明font-size:1.2em，会发生什么呢？一个字号当然不能等于自己的1.2倍，实际上这个font-size是根据继承的字号来计算的。

### 使用rem设置字号

当浏览器解析HTML文档时，会在内存里将页面的所有元素表示为DOM(文档对象模型)。它是一个树结构，其中每个元素都由一个节点表示。`<html>`元素是顶级节点(根节点)。它下面是子节点，`<head>`和`<body>`。再下面是逐级嵌套的后代节点。

在文档中，根节点是所有其他元素的祖先节点。根节点有一个伪类选择器(:root)，可以用来选中它自己。这就等价于类型选择器html，但是html的优先级相对于一个类名，而不是一个标签。

rem是root em的缩写。rem不是相对于当前元素，而是相对于根元素的单位。

```css
/** :root伪类等价于类型选择器html **/
:root {
	font-size:1rem;
}

/** 使用浏览器的默认字号(16px) **/
ul {
  font-size:.8rem;
}
```

## css三角形

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css学习</title>
</head>
<style>
  /* 三角形 */
  .drop {
    padding: .5em 2em .5em 1.5em;
    border: 1px solid #ccc;
    background-color: #eee;
  }

  .drop>.d {
    width: 5em;
    height: 5em;
    background-color: transparent;
  }

  .drop>.d::after {
    content: "";
    position: absolute;
    left: 1em;
    top: 1em;
    border: 2.5em solid;
    border-color: black transparent transparent;
  }

  .drop:hover .d::after {
    top: 0.7em;
    border-color: transparent transparent black;
  }
</style>

<body>
  <div class="drop">
    <div class="d"></div>
  </div>
</body>

</html>
```

## css水平垂直居中

css垂直居中是面试经常会问到的问题，在我们日常开发中垂直居中的应用场景还是挺多的，比如文字垂直居中，或者视图快垂直居中等等。flex几乎是不二之选，但是其实其他的方案也是非常多的，那就记录一下其他的垂直居中方案，看看是否会有更好的效果！

### 在已知父级容器宽高的情况下使用绝对定位position

**1. absolute + margin:auto自动撑开**

父级容器是已知的，对子容器进行垂直居中布局，利用子容器margin进行宽高自动撑开，本身子容器设为absolute固定，而且要让上下左右撑开，得到实际可用的空间，这个时候再利用margin:auto实现水平垂直居中布局。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    position: absolute;
    /* ----改变这里---- */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    /* -------- */
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**2. absolute + margin反向偏移**

父级容器宽高是已知的，让子容器absolute固定，利用top和left设为50%进行偏移，再利用margin负数进行反向偏移，实现子容器水平垂直居中。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    position: absolute;
    /* ----改变这里---- */
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px;
    /* -------- */
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**3. absolute +translate**

和上面同理，只是偏移的使用的属性不一样

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    position: absolute;
    /* ----改变这里---- */
    top: 50%;
    left: 50%;
    transform: translate(-100px, -100px);
    /* -------- */
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**4. absolute + calc**

也是和上面同理，就是偏移的计算方式用css的calc动态计算

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    position: absolute;
     /* ----改变这里---- */
    top: calc(50% - 100px);
    left: calc(50% - 100px);
     /* ---- */
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

### 基于块状元素的flex响应式布局 

**5. flex**

flex布局几乎成为了现在市场大部分开发应用中的主流布局方案，因为实现布局的效果简单又实用，得到了几乎所有浏览器的支持，平时可以安全的使用flex。

给父级设置为flex响应式布局，默认是为水平轴的方向row（flex-direction: row），也可以设置为colunm垂直方向。这个时候在利用 justify-content: center和align-item: center设置水平轴和垂直轴方向居中即可实现效果。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**6. flex + margin**

父级设置为flex将父容器的空间都利用了，子容器使用margin外边距撑开也可以实现水平垂直居中。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    margin: auto;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**7. flex + align-self**

父容器设置align-item:center居中，如果是水平(row)方向就是垂直居中，如果是(colunm)方向就是水平居中，除了用父级容器来设置子容器，还可以利用子容器自身可以设置自己的对齐方向，即在子容器中用align-self设置自己居中。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    background-color: aquamarine;
  }

  .box {
    width: 200px;
    height: 200px;
    align-self: center;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

### 基于块状元素的gird网格布局

**8. gird + justify-content + align-items**

利用网格布局，让主轴和交叉轴进行居中

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: grid;
    justify-content: center;
    align-items: center;

  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**9. gird + justify-content + align-content**

Grid的`align-content`跟Flex的`align-content`有一些差异，Grid的`align-content` 属性是整个内容区域的垂直位置（上中下），`justify-content`属性是整个内容区域在容器里面的水平位置（左中右）。Flex的`align-content`定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

所以可以使用` justify-content `匹配水平居中，`align-content`匹配垂直居中即可实现效果。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: grid;
    justify-content: center;
    align-content: center;

  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**10.gird + justify-content + align-self **

除了flex布局的`align-self`可以实现子容器的对齐方式，在gird中也可以利用`align-self`对子容器进行对齐，基本上是对grid Y轴的对齐方式，只要对单一元素设置为`align-self：cneter`可以达到效果。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: grid;
    justify-content: center;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
    /* 这里 */
    align-self: center;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**11. gird + place-items**

gird中有`align-items`和`justify-items`的组合对齐方式属性`place-items`，这个属性比较少有人用，但是也是一种对齐方式

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: grid;
    place-items: center;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**12. gird + place-content**

gird中有`align-content`和`justify-content`的组合对齐方式属性`place-content`，以X轴和Y轴对齐来实现全部容器居中，也是一种组合对齐方式

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: grid;
    place-content: center;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**13. gird + margin**

设置了`display:gird`之后整个父容器会被撑开，用外边距自动计算可以实现水平垂直居中，和前面的flex一样的

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: grid;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
    /* 这里 */
    margin: auto;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

**14. table-cell + vertical-align + margin**

设置display属性为`table-cell`成为表格单元，这里能利用单元格对齐的`vertical-align`属性来将信息垂直居中，子容器则利用margin外边距在水平轴自动撑开实现水平对齐

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    background-color: aquamarine;
    /* 这里 */
    display: table-cell;
    vertical-align: middle;
  }

  .box {
    width: 200px;
    height: 200px;
    background-color: brown;
    /* 这里 */
    margin: 0 auto;
  }
</style>

<body>
  <div class="container">
    <div class="box">垂直居中</div>
  </div>
</body>

</html>
```

### 行内元素居中对齐

**15. line-height**

行内元素设置行高和高度相等，则可以实现对齐

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>css垂直居中</title>
</head>
<style>
  body {
    margin: 0;
    box-sizing: border-box;
  }

  .container {
    width: 100vw;
    height: 100vh;
    /* 这里 */
    background-color: aquamarine;
    text-align: center;
    line-height: 100vh;
  }

  .text {
    background-color: darkmagenta;
  }
</style>

<body>
  <div class="container">
    <span class="text">垂直居中</span>
  </div>
</body>

</html>
```

