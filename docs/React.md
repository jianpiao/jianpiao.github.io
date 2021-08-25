# React技术积累

学无止境，未来的路，就开技术的堆积和挑战！面试的坎不止一次，要学习总结和积累。

## react hook和vue3.0对比

参考链接1：[Vue3 究竟好在哪里？（和 React Hook 的详细对比）](https://zhuanlan.zhihu.com/p/133819602)

参考链接2:[精读《Vue3.0 Function API》 ](https://juejin.im/post/6844903877574295560)

```javascript
export default function Counter() {
  const [count, setCount] = useState(0);

  const add = () => setCount((prev) => prev + 1);

  // 下文讲解用
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={add}> +1 </button>
    </div>
  );
}

```

它是一个函数，而父组件引入它是通过 `<Counter />` 这种方式引入的，实际上它会被编译成 `React.createElement(Counter)` 这样的函数执行，也就是说每次渲染，这个函数都会被完整的执行一次。

而 `useState` 返回的 `count` 和 `setCount` 则会被保存在组件对应的 `Fiber` 节点上，每个 React 函数每次执行 Hook 的顺序必须是相同的，举例来说。 这个例子里的 `useState` 在初次执行的时候，由于执行了两次 `useState`，会在 `Fiber` 上保存一个 `{ value, setValue } -> { value2, setValue2 }` 这样的链表结构。

而下一次渲染又会执行 `count 的 useState`、 `count2 的 useState`，那么 React 如何从 `Fiber` 节点上找出上次渲染保留下来的值呢？当然是只能按顺序找啦。

第一次执行的 useState 就拿到第一个 `{ value, setValue }`，第二个执行的就拿到第二个 `{ value2, setValue2 }`，

这也就是为什么 React 严格限制 Hook 的执行顺序和禁止条件调用。

假如第一次渲染执行两次 useState，而第二次渲染时第一个 useState 被 if 条件判断给取消掉了，那么第二个 `count2 的 useState` 就会拿到链表中第一条的值，完全混乱了。

如果在 React 中，要监听 `count` 的变化做某些事的话，会用到 `useEffect` 的话，那么下次 `render`

之后会把前后两次 `render` 中拿到的 `useEffect` 的第二个参数 `deps` 依赖值进行一个逐项的浅对比（对前后每一项依次调用 Object.is），比如

```javascript
export default function Counter() {
  const [count, setCount] = useState(0);

  const add = () => setCount((prev) => prev + 1);

  useEffect(() => {
    console.log("count updated!", count);
  }, [count]);

  return (
    <div>
      <span>{count}</span>
      <button onClick={add}> +1 </button>
    </div>
  );
}

```

那么，当 React 在渲染后发现 `count` 发生了变化，会执行 `useEffect` 中的回调函数。（细心的你可以观察出来，每次渲染都会重新产生一个函数引用，也就是 useEffect 的第一个参数）。

是的，React 还是不可避免的引入了 `依赖` 这个概念，但是这个 `依赖` 是需要我们去手动书写的，实时上 React 社区所讨论的「心智负担」也基本上是由于这个 `依赖` 所引起的……

由于每次渲染都会不断的执行并产生闭包，那么从性能上和 GC 压力上都会稍逊于 Vue3。它的关键字是「每次渲染都重新执行」。

## react组件生命周期

react组件进入到离开需要经历一些列的生命周期方法，下面就是`class`模式下的生命周期函数，在17版本之后有些会被弃用：

#### 1. constructor()

构造函数执行，初始化数据，`super`继承数据。

#### 2. componentWillMount()

在渲染前调用,在客户端也在服务端，它只发生一次。

#### 3.render

页面初始化渲染一次，后面挂载的时候也会被执行。

#### 4. componentDidMount()

在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过`this.getDOMNode()`来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用`setTimeout`, `setInterval`或者发送AJAX请求等操作(防止异部操作阻塞UI)。

在这前`render`函数已经执行一遍了。

#### 5. componentWillReceiveProps()

在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

#### 6. shouldComponentUpdate()

返回一个布尔值。在组件接收到新的`props`或者`state`时被调用。在初始化时或者使用`forceUpdate`时不被调用。 可以在你确认不需要更新组件时使用。

#### 7. componentWillUpdate()

在组件接收到新的`props`或者`state`但还没有`render`时被调用。在初始化时不会被调用。

#### 8. componentDidUpdate()

在组件完成更新后立即调用。在初始化时不会被调用。

#### 9. componentWillUnMount()

组件从 DOM 中移除的时候立刻被调用。

### 未来版本中有三个生命周期会弃用

#### 1. componentWillMound

> 注意
>
> 此生命周期之前名为 `componentWillMount`。该名称将继续使用至 React 17。可以使用 [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) 自动更新你的组件。

> `UNSAFE_componentWillMount()` 在挂载之前被调用。它在 `render()` 之前调用，因此在此方法中同步调用 `setState()` 不会触发额外渲染。通常，我们建议使用 `constructor()` 来初始化 state。
>
> 避免在此方法中引入任何副作用或订阅。如遇此种情况，请改用 `componentDidMount()`。
>
> 此方法是服务端渲染唯一会调用的生命周期函数。

#### 2. componentWillReceiveProps()

>此生命周期之前名为 `componentWillReceiveProps`。该名称将继续使用至 React 17。可以使用 [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) 自动更新你的组件。

> 注意:
>
> 使用此生命周期方法通常会出现 bug 和不一致性：
>
> - 如果你需要**执行副作用**（例如，数据提取或动画）以响应 props 中的更改，请改用 [`componentDidUpdate`](https://react.docschina.org/docs/react-component.html#componentdidupdate) 生命周期。
> - 如果你使用 `componentWillReceiveProps` **仅在 prop 更改时重新计算某些数据**，请[使用 memoization helper 代替](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)。
> - 如果你使用 `componentWillReceiveProps` 是为了**在 prop 更改时“重置”某些 state**，请考虑使组件[完全受控](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component)或[使用 `key` 使组件完全不受控](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) 代替。
>
> 对于其他使用场景，[请遵循此博客文章中有关派生状态的建议](https://react.docschina.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)。

#### 3.componentWillUpdate()

> **注意**
>
> 此生命周期之前名为 `componentWillUpdate`。该名称将继续使用至 React 17。可以使用 [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) 自动更新你的组件。

> 当组件收到新的 props 或 state 时，会在渲染之前调用 `UNSAFE_componentWillUpdate()`。使用此作为在更新发生之前执行准备更新的机会。初始渲染不会调用此方法。
>
> 注意，你不能此方法中调用 `this.setState()`；在 `UNSAFE_componentWillUpdate()` 返回之前，你也不应该执行任何其他操作（例如，dispatch Redux 的 action）触发对 React 组件的更新
>
> 通常，此方法可以替换为 `componentDidUpdate()`。如果你在此方法中读取 DOM 信息（例如，为了保存滚动位置），则可以将此逻辑移至 `getSnapshotBeforeUpdate()` 中。

[查看react的生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

[react官网生命周期介绍](https://react.docschina.org/docs/react-component.html)

### react17.0组件的生命周期

每个组件都包含“生命周期方法”，你可以重写这些方法，以便于在运行过程中特定的阶段执行这些方法。**你可以使用此[生命周期图谱](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)作为速查表**。在下述列表中，常用的生命周期方法会被加粗。其余生命周期函数的使用则相对罕见。

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

#### 挂载

- [**`constructor()`**](https://react.docschina.org/docs/react-component.html#constructor)
- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [**`render()`**](https://react.docschina.org/docs/react-component.html#render)
- [**`componentDidMount()`**](https://react.docschina.org/docs/react-component.html#componentdidmount)

#### 更新 

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- [`static getDerivedStateFromProps()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate)
- [**`render()`**](https://react.docschina.org/docs/react-component.html#render)
- [`getSnapshotBeforeUpdate()`](https://react.docschina.org/docs/react-component.html#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](https://react.docschina.org/docs/react-component.html#componentdidupdate)

#### 卸载 

当组件从 DOM 中移除时会调用如下方法：

- [**`componentWillUnmount()`**](https://react.docschina.org/docs/react-component.html#componentwillunmount)

#### 错误处理 

当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

- [`static getDerivedStateFromError()`](https://react.docschina.org/docs/react-component.html#static-getderivedstatefromerror)
- [`componentDidCatch()`](https://react.docschina.org/docs/react-component.html#componentdidcatch)

### 

## setState更新是同步还是异步

看待这个更新同步或者异步需要看执行环境。

1. `setState`只在合成事件和钩子函数中是“异步”的，在原生事件和`setTimeout` 中都是同步的。

2. `setState` 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 `setState(partialState, callback)` 中的`callback`拿到更新后的结果。

3. `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次`setState`，`setState`的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时`setState`多个不同的值，在更新时会对其进行合并批量更新。

## 解析redux的源码

Redux 本身很简单。

[参考地址](https://zhuanlan.zhihu.com/p/148303595)

![工作流程](https://vdn1.vzuu.com/SD/b1092c76-2342-11eb-963b-fad3d70fca82.mp4?disable_local_cache=1&bu=pico&expiration=1613228065&auth_key=1613228065-0-0-59b711b85121ad1decc4fc845fe0f15b&f=mp4&v=hw)

![image-20210213203230850](https://pic4.zhimg.com/80/v2-9df986606591c2bcced493abaa4bd48c_720w.png)

上面是redux的工作流程。

下面来分析一下redux的API源码。

### Redux.createSotre

#### 职责

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 返回的函数注销监听器。

redux应用只有一个单一的store。如果要拆分数据逻辑，应该使用reducer拆分多个store，最终使用combineReducers将多个reducer合并成为一个store，并且传入给createStore。

#### 源码解析

createStore函数结构会暴露出`dispatch`、`subscribe`、`getState`、`replaceReducer`等方法。

```javascript
// 省略了若干代码
export default function createStore(reducer, preloadedState, enhancer) {
    // 省略参数校验和替换
    // 当前的 reducer 函数
    let currentReducer = reducer
    // 当前state
    let currentState = preloadedState
    // 当前的监听数组函数
    let currentListeners = []
    // 下一个监听数组函数
    let nextListeners = currentListeners
    // 是否正在dispatch中
    let isDispatching = false
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice()
        }
    }
    function getState() {
        return currentState
    }
    function subscribe(listener) {}
    function dispatch(action) {}
    function replaceReducer(nextReducer) {}
    function observable() {}
    // ActionTypes.INIT @@redux/INITu.v.d.u.6.r
    dispatch({ type: ActionTypes.INIT })
    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
        [$$observable]: observable
    }
}
```

### store.dispatch

`dispatch`派发action。

使用方法为：`store.dispatch(action)`

其中action就是一个描述“发生了什么”的普通对象.

它是 store 数据的**唯一**来源。一般来说你会通过 [`store.dispatch()`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 将 action 传到 store。

```javascript
{ 
  type: 'LIKE_ARTICLE', 
  articleId: 42 
}
```

dispatch源码如下：

```javascript
function dispatch(action) {
    // 判断action是否是对象，不是则报错
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }
    // 判断action.type 是否存在，没有则报错
    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }
    // 不是则报错
    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
        // 调用完后置为 false
      isDispatching = false
    }
    //  把 收集的函数拿出来依次调用
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    // 最终返回 action
    return action
  }

var store = Redux.createStore(counter)
```

### store.getState

```javascript
function getState() {
    // 判断正在dispatch中，则报错
    if (isDispatching) {
        throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
            'The reducer has already received the state as an argument. ' +
            'Pass it down from the top reducer instead of reading it from the store.'
        )
    }
    // 返回当前的state
    return currentState
}
```

### Redux.compose(...functions)

```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// applyMiddleware.js
dispatch = compose(...chain)(store.dispatch)
// compose
funcs.reduce((a, b) => (...args) => a(b(...args)))
```

### Redux.applyMiddleware(...middlewares)

把接收的中间件函数`logger1`, `logger2`, `logger3`放入到 了`middlewares`数组中。`Redux.applyMiddleware`最后返回两层函数。 把中间件函数都混入了参数`getState`和`dispatch`。

```javascript
// redux/src/applyMiddleware.js
/**
 * ...
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        'Dispatching while constructing your middleware is not allowed. ' +
          'Other middleware would not be applied to this dispatch.'
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

// redux/src/createStore.js
export default function createStore(reducer, preloadedState, enhancer) {
  // 省略参数校验
  // 如果第二个参数`preloadedState`是函数，并且第三个参数`enhancer`是undefined，把它们互换一下。
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    // enhancer 也就是`Redux.applyMiddleware`返回的函数
    // createStore 的 args 则是 `reducer, preloadedState`
    /**
     * createStore => (...args) => {
            const store = createStore(...args)
            return {
              ...store,
               dispatch,
            }
        }
     ** /
    // 最终返回增强的store对象。
    return enhancer(createStore)(reducer, preloadedState)
  }
  // 省略后续代码
}
```

最后这句其实是返回一个增强了`dispatch`的`store`对象。

而增强的`dispatch`函数，则是用`Redux.compose(...functions)`进行串联起来执行的。

#### 示例说明

使用 Thunk Middleware 来做异步 Action

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

let reducer = combineReducers(reducers)
// applyMiddleware 为 createStore 注入了 middleware:
let store = createStore(reducer, applyMiddleware(thunk))
```

### compose

关于compose实现的原理如下：

```javascript
const multiply = (x) => {
  const result = x * 10;
  console.log(result);
  return result;
};
const add = (y) => {
  return y + 10;
};
const minus = (z) => {
  return z - 2
};

const compose = (...funcs) => {
  return funcs.reduce((a, b) => {
    return function (x) {
      return a(b(x));
    }
  })
}

// reduce输出匿名函数的情况下是会从reduce参数后面往前面的顺序执行
// 即初始值为minus，第一个执行的是multipy，其次到add
const calc = compose(minus, add, multiply);
console.log(calc(10));
```

可以看到，其实内部实现的方式很简单。

### vuex和redux简单对比

1. vuex源码主要是使用了构造函数，redux使用的是函数式编程，闭包等概念。
2. vuex和vue是强耦合的，脱离了vue就无法使用了。redux跟react是完全两个产物，如果在react中使用redux则需要配合react-redux。