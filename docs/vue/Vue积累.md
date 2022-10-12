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

