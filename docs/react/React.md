

# 解析redux的源码

Redux 本身很简单。

[参考地址](https://zhuanlan.zhihu.com/p/148303595)

![工作流程](https://vdn1.vzuu.com/SD/b1092c76-2342-11eb-963b-fad3d70fca82.mp4?disable_local_cache=1&bu=pico&expiration=1613228065&auth_key=1613228065-0-0-59b711b85121ad1decc4fc845fe0f15b&f=mp4&v=hw)

![image-20210213203230850](/Users/smallzip/Library/Application Support/typora-user-images/image-20210213203230850.png)

上面是redux的工作流程。

下面来分析一下redux的API源码。

## Redux.createSotre

### 职责

**Store** 就是把它们联系到一起的对象。Store 有以下职责：

- 维持应用的 state；
- 提供 [`getState()`](https://www.redux.org.cn/docs/api/Store.html#getState) 方法获取 state；
- 提供 [`dispatch(action)`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 方法更新 state；
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 注册监听器;
- 通过 [`subscribe(listener)`](https://www.redux.org.cn/docs/api/Store.html#subscribe) 返回的函数注销监听器。

redux应用只有一个单一的store。如果要拆分数据逻辑，应该使用reducer拆分多个store，最终使用combineReducers将多个reducer合并成为一个store，并且传入给createStore。

### 源码解析

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

## store.dispatch

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

## store.getState

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

## Redux.compose(...functions)

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

## Redux.applyMiddleware(...middlewares)

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

### 示例说明

使用 Thunk Middleware 来做异步 Action

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from './reducers'

let reducer = combineReducers(reducers)
// applyMiddleware 为 createStore 注入了 middleware:
let store = createStore(reducer, applyMiddleware(thunk))
```

## compose

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

## vuex和redux简单对比

1. vuex源码主要是使用了构造函数，redux使用的是函数式编程，闭包等概念。
2. vuex和vue是强耦合的，脱离了vue就无法使用了。redux跟react是完全两个产物，如果在react中使用redux则需要配合react-redux。