# Vue技术积累

vue框架技术积累与总结

## 订阅 store 的 action，自己手动实现简易版subscribeAction

今天业务开发的时候用到了subscribeAction，感觉它的实现非常有趣，就自己手动实现一遍。

订阅 store 的 action。`handler` 会在每个 action 分发的时候调用并接收 action 描述和当前的 store 的 state 这两个参数：

```javascript
store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})
```

从 3.1.0 起，`subscribeAction` 也可以指定订阅处理函数的被调用时机应该在一个 action 分发*之前*还是*之后* (默认行为是*之前*)：

```javascript
store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}`)
  },
  after: (action, state) => {
    console.log(`after action ${action.type}`)
  }
})
```

以上就是官网api的介绍。

手动实现代码：

```javascript
class Vuex {
  state = {};
  action = {};
  _subscribers = [];

  constructor({ state, action }) {
    this.state = state;
    this.action = action;
    this._subscribers = [];
  }

  // 执行分发
  dispatch(action) {
    // action前置监听器    
    this._subscribers.forEach(sub => sub.before(action, this.state));

    const { type, payload } = action;

    console.log(this.state, payload) // {num: 0} 2

    // 执行action
    this.action[type](this.state, payload).then(() => {
       // action后置监听器
    	this._subscribers.forEach(sub => sub.after(action, this.state));
    });
  }

  // 调用监听器，并将监听器函数加入到数组中，以实现action前后监听回调
  subscribeAction(subscriber) {
    this._subscribers.push(subscriber);
  }
}

const store = new Vuex({
  state: {
    num: 0
  },
  action: {
    async test(state, payload) {
      state.num += payload;
    }
  }
});

// 添加订阅
store.subscribeAction({
  before: (action, state) => {
    console.log(`before action ${action.type}, before count is ${state.count}`);
  },
  after: (action, state) => {
    console.log(`after action ${action.type},  after count is ${state.count}`);
  }
});

// 分发
store.dispatch({
  type: "test",
  payload: 2
});
```

执行以上代码之后会在控制台上面看到如下内容：

```markdown
before action test, before count is undefined
after action test,  after count is undefined
```

## Vite

vite是一种新型的前端构建工具，它可以显著改善前端的开发体验。

作者原话：

> Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打包。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题。

主要值得关注的有两点：

* 拦截浏览器发出的 ES imports 请求并做相应处理，做到按需加载。
* 开发模式不需要打包，将代码与Rollup捆绑，只需要编译浏览器发出的HTTP请求。

[vite原理参考](https://juejin.cn/post/6844904146915573773#heading-8)

## vue的nextTick原理

nextTick接收一个回调函数作为参数，它的作用是将回调延迟到下一次DOM更新周期之后执行。

> **官网的解释：**
>
> 可能你还没有注意到，Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

我们来细致的讲解一下其中的原理。

### 为什么vue.js使用异步更新队列

vue2.0使用虚拟DOM进行渲染，变化侦测的通知只发送到组件，组件内用到的所有状态都会通知同一个watcher，然后虚拟DOM会对整个组件进行比对（diff），并更改DOM，也就是说，如果同一轮事件循环中，有两个数据发送了变化，那么组件的watcher会收到两份通知，从而进行两次渲染，事实上，并不需要渲染两次，虚拟DOM会对整个组件进行渲染，所以，只需要等所有状态都修改完毕后，一次性将整个组件的DOM渲染到最新即可。

要解决这个问题，vue.js的实现方式是将收到通知watcher实例添加到队列中缓存起来，并且在添加到队列之前检查其中是否已经存在相同watcher，只有不存在时，才将watcher实例添加到队列中。然后下一次事件循环（event loop）中，vue.js会让队列中的watcher触发渲染流程并清空队列。这样就可以保证即便在同一事件循环中有两个状态发生了变化，watcher最后也只执行一次渲染流程。

### 什么是事件循环

JavaScript是一门单线程并且非阻塞的脚本语言，这意味着JavaScript代码在执行的任何时候只有一个主线程来处理所有任务。而非阻塞是指当前代码需要处理异步任务时，主线程会挂起(pending)这个任务，当异步任务处理完毕后，主线程再根据一定规则取执行相应回调。

事实上，当任务处理完毕后，JavaScript会将这个事件加入一个队列中，我们称这个队列为**事件队列**。被放入事件队列中的事件不会立刻执行回调，而是等待当前执行栈中的所有任务执行完毕后，主线程会去查找事件队列中是否有任务。

异步任务有两个类型，一种是微任务(microtask)和宏任务(macortask)。不同类型的任务会被分配到不同的任务队列中。

当执行栈中的所有任务都执行完毕后，会去检查微任务队列中是否有事件存在，如果存在，则会依次执行微任务队列中事件对应的回调，直到为空。然后去执行宏任务队列中取出一个事件，把对应的回调加入当前执行栈，当执行栈中的所有任务都执行完毕后，检查微任务队列中是否有事件存在。无限重复此过程，就形成了一个无限循环，这个循环叫做**事件循环**。

属于微任务的事件有如下：

* Promise.then
* MutationObserver
* Object.observe
* Process.nextTick

属于宏任务事件有如下：

* setTimeout
* setInterval
* setImmediate
* MessageChannel
* requestAnimationFrame
* I/O
* UI交互事件

### 什么是执行栈

当我们执行一个方法时，JavaScript会生成一个与这个方法对应的执行环境（context），又叫做执行上下文。这个执行环境中有这个方法是私有作用域、上层作用域的指向、方法的参数、私有作用域中定义的变量以及this对象。这个执行环境会被添加到一个栈中，这个栈就是执行栈。

如果这个方法的代码中执行到了一行函数调用语句，那么JavaScript会生成这个函数的执行环境并将其添加到执行栈中，然后进入这个执行环境继续执行其中的代码。执行完毕并返回结果后，JavaScript会退出执行环境并把这个执行环境从栈中销毁，回到上一个方法的执行环境。这个过程反复进行，知道执行环境中的代码全部执行完毕，这个执行环境的栈就是执行栈。

### nextTick的异步更新策略

nextTick其实是将回调添加到微任务中，只有在特殊的情况才会降级成宏任务，默认会添加到微任务中。

因此，如果使用nextTick来获取更新后的DOM，则需要注意顺序的问题。因为不论是更新DOM的回调还是使用nextTick注册的回调，都是向微任务队列中添加任务，所有哪个任务先添加到队列中，就先执行哪个任务。

