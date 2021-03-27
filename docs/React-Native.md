# React Native笔记

#### 为什么需要React Native

主流的应用大体分为三类：Native App，Web App，Hybrid App

#### Native App（原生App）

1. 性能好
2. 开发成本高，无法跨平台
3. 升级困难



#### Web App

**有点**

1. 跨平台
2. 版本升级容易

**缺点**

1. 无法完全使用系统级别的api，全部依靠原生提供
2. 性能差



#### Hybrid App

Native App和Web App折中的方案，保留了Native App和Web App的优点，但是最受吐槽的还是性能差，页面渲染效率低，在webview中绘制界面，实现动画，资源消耗都比较大。



#### React-Native

1. 跨平台 
2. 暴露原生的api，并且官网维护
3. 基于react框架，编写容易



#### React-Native做了什么

1. React-Native 丢弃了 Webview。

2. 复用React，将 Dom 结构de改变通过 diff 算法处理后，由 js 传递给 native 进行底层视图布局。

3. css-layout引擎，前端可以继续写熟悉的 css 语法，由引擎转化成 oc 底层的布局。

4. 对 js 暴露底层常用的 UI 组建。js 层可以直接对这些组件进行布局。

对应前端的开发模式的变化：

5. JSX vs Html

6. css-layout vs css

7. ECMAScript 6 vs ECMAScript 5

8. React-Native vs DOM