# vue手动实现简易版subscribeAction

前置摘要

* `subscribeAction`如何实现？
* 为什么`action`是异步，`mutation`是同步？



在研究store源码的过程中发现`subscribeAction`能够实现订阅store的`action`。

于是在官网了解了`subscribeAction`的用处。`handler` 会在每个 action 分发的时候调用并接收 `action` 描述和当前的 store 的 `state` 这两个参数，于是在订阅函数处理被调用的时候在**`action`分发前和分发**后执行：

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

在3.4.0版本之后新增了**`error`**异常捕获这个我们暂时不考虑，我主要针对前置订阅和后置订阅。

###  源码定位

* 首先找到源码中`subscribeAction`所在的位置：

![位置](https://pic3.zhimg.com/80/v2-1daea99b0be90c55405893cf33c3a35c_720w.png)



* 我们找到使用到`subscribeAction`的位置，进行源码解读，最后找到如下位置：

  ![位置](https://pic3.zhimg.com/80/v2-4816d33bdf67067581b95c60eca911e9_720w.png)



整体上来讲源码非常容易理解，很多命名都是语义化，`subscribeAction`作为Store的一个原型对象，实现上也很简单。源码中对于action是handle是给予异步处理的，还对错误进行了try catch捕获。

那么我们下面就简单的实现一遍，我们忽略action的异步和异常捕获，只简单的实现action的订阅。

```javascript
class Vuex {
  state = {};
  action = {};
  _subscribers = [];

  constructor({ state, action }) {
    this.state = state;
    this.action = action;
    this._actionSubscribers = [];
  }

  // 执行分发
  dispatch(action) {
    // action前置监听器    
    this._actionSubscribersclass Vuex {
  state = {};
  action = {};
  _actionSubscribers = [];

  constructor({ state, action }) {
    this.state = state;
    this.action = action;
    this._actionSubscribers = [];
  }

  // 执行分发
  dispatch(action) {
    // action前置监听器    
    this._actionSubscribers.forEach(sub => sub.before(action, this.state));

    const { type, payload } = action;

    console.log(this.state, payload) // {num: 0} 2

    // 执行action
    this.action[type](this.state, payload).then(() => {
      // action后置监听器
      this._actionSubscribers.forEach(sub => sub.after(action, this.state));
    });
  }

  // 调用监听器，并将监听器函数加入到数组中，以实现action前后监听回调
  subscribeAction(subscriber) {
    this._actionSubscribers.push(subscriber);
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
    console.log(`before action ${action.type}, before count is ${state.num}`);
  },
  after: (action, state) => {
    console.log(`after action ${action.type},  after count is ${state.num}`);
  }
});

// 分发
store.dispatch({
  type: "test",
  payload: 2
});.forEach(sub => sub.before(action, this.state));

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
    console.log(`before action ${action.type}, before num is ${state.num}`);
  },
  after: (action, state) => {
    console.log(`after action ${action.type},  after num is ${state.num}`);
  }
});

// 分发
store.dispatch({
  type: "test",
  payload: 2
});
```

在node环境下执行上面代码，打印如下：

```javascript
before action test, before count is 0
{ num: 0 } 2
after action test,  after count is 2
```



### 小结

* `subscribeAction`的实现原理主要是在`action`前进行捕获，将所有回调存到`_actionSubscribers`数组中并且执行前置回调，当`action`执行完毕（不论是同步还是promise异步）在执行完毕后会调用后置函数回调。

* vuex的源码主要对Store的原型进行了封装处理，非常好理解。通过上面的截图我们可以看到为什么`action`支持异步，是因为把所有的`action`转成了promise。

* 为什么mutation是同步的，我们可以看源码，具体如下：

  ![mutation](https://pic1.zhimg.com/80/v2-6360bacbb7a24c710203f8114ffc9819_720w.png)

