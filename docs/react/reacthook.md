# react hook和vue3.0对比

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