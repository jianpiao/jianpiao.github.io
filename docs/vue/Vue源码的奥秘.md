# Vue3三个阶段



## 三个阶段

vue3从节点生成到挂载到浏览器渲染出来，有三个阶段。

1. **渲染阶段**

   Render Phaser

   在渲染阶段，调用render函数，它返回一个虚拟DOM节点

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1634783556051-3fdb2224-ce80-49d5-91cb-1d8e62959e08.png)



1. **挂载阶段**

   Mount Phaser

   挂载阶段使用虚拟DOM节点，并调用DOM API来创建页面

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1634783601155-92df5794-d174-45c4-b1ea-e5d90bc1caec.png)



1. **补丁阶段**

   Patch Phaser

   最后，在补丁阶段，渲染器将旧的虚拟节点和新的虚拟节点进行比较，并只更新页面变化的部分DOM真实节点

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1634783729408-3b74692e-3cc4-4571-89dc-b8904198ed43.png)



以上是vue核心的三个模块。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1634783800576-a6df9516-01e3-40b5-bf3d-e0941b241000.png)

## 块检查

把一个节点当做一个块元素（block），实现扁平化管理。

```javascript
<div>
	<div></div>
	<div></div>
	<div v-if="ok">
  	<span> {{msg}} </span>
  </div>
</div>
```

vue2模式下，当节点中有`if`判断，它会改变节点结构，当切换的时候，整个`div`会从树（tree）中消失。

相反，vue3中，把if判断的`div`当做一个快元素，专属于它自己的区域。这个快被跟踪了，作为其父快元素的动态子级。所以，整个div树中有嵌套的块和每个块，将在扁平数组中追踪它自己的动态子对象。

一般在一个模板中可能有数百个DOM节点，但是通常只会有几个这样的`v-if`或者`v-for`，所以我们基本上还是需要遍历块树，然而，大多数情况下是扁平数组迭代，而不是去`diff`和比较检查潜在的节点移动，所以效率更高，我们也基本减少了递归的数量。

因为你不必检查每个`vnode`的变化，而去找`block`块，因为还有其他的信息关于值内部可能发生的变化。

总结以上就是以最小组件为块单位进行扁平化遍历检查。

## render

渲染函数会返回虚拟DOM节点。

每次更新的时候它会有两个快照，两个快照都是类似下面`vdom`这样的虚拟DOM，当`span`下的`hello`变成了`msg`，渲染器并不知道虚拟DOM变化了，它需要我们给定一个触发时机，执行暴力比对，比较旧节点和新节点，找出有什么改变了。

```javascript
// 渲染函数
function render() {
  return h('div', [
    h('div', [
      h('span', 'hello')
    ])
  ])
}

// 虚拟DOM
const vdom = {
  tag: 'div',
  children: [
    {
      tag: 'div',
      children: [
        {
          tag: 'span',
          children: 'hello'
        }
      ]
    }
  ]
}
```

## vdom

`vdom`的节点挂载是通过调用DOM原生API实现的。

`vdom`是来自`h`模板函数传来的数据，h函数有三个参数，分别是节点名称、属性、子元素内容。`mount`函数负责将`vdom`挂载到具体的DOM Tree，`mount`函数会处理来自`vdom`的数据，以及要挂载的id节点。在处理`vdom`过程中使用递归遍历，逐个逐个节点进行挂载。

下面实现一个简单的DOM挂载流程。

```html
<div id="app"></div>
<style>
  .red {
    color: red;
  }
</style>
<script>
  function h(tag, props, children) {
    return {
      tag,
      props,
      children
    }
  }

  function mount(vnode, container) {
    const el = document.createElement(vnode.tag)
    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key]
        el.setAttribute(key, value)
      }
    }

    // children
    if (vnode.children) {
      if (typeof vnode.children === 'string') { // vnode的子节点是字符串，则直接进行赋值操作
        el.textContent = vnode.children
      } else { // 否则继续递归检查，并挂载子节点
        vnode.children.forEach(child => {
          mount(child, el)
        });
      }
    }

    // 插入到父极节点树中
    container.appendChild(el)
  }

  // 模板
  const vdom = h('div', {
    class: 'red'
  }, [
    h('span', null, 'hello')
  ])

  // 挂载
  mount(vdom, document.getElementById('app'))
</script>
```

渲染结果如下：

![image-20211025100200295](https://raw.githubusercontent.com/jianpiao/photos/master/image-20211025100200295.png)

当前的vdom的`children`下有一个`span`节点，`span`节点下的`children`有可能是字符串，有可能是字符串对象，也有可能是`vnode`，所以针对这个边界情况需要做更多的处理。以上demo为简单理解，所以没有做边界处理。

其他case如下：

```javascript
// case 1
const vdom = h('div', {
  class: 'red'
}, [
  h('span', null, ['hello'])
])


// case 2
const vdom = h('div', {
  class: 'red'
}, [
  h('span', null, h('a', null, '点击链接'))
])


// case 3
const vdom = h('div', {
  class: 'red'
}, [
  h('span', null, [
  	h('a', null, '点击链接')
  ])
])
```

### 小结

通过上面的案例，可以了解

* `h`函数返回`vdom`对象
* `mount`负责将`vdom`创建成真实的DOM节点，并将其插入父级DOM Tree中

最初的挂载就是创建一些以前没有的东西（节点），随后的更新，我们希望尽可能的重用之前已经有的东西，实现性能上的择优。所以我们只修改其中的内容，而不是重新创建它们。

## patch

前面已经实现挂载的部分，接下来就需要实现`vdom`更新的部分，它要对旧的节点和新的节点进行比较，是否需要进行更新，这个过程我们就把它放到`patch`函数中。

这里我复制一个新的`vdom`，名叫`vdom2`，修改class名称为`green`。

将设我们有一个新的模板`vdom2`需要更新，它是第二个快照，也就是后面需要更新的虚拟DOM。

```javascript
  const vdom2 = h('div', {
    class: 'green'
  }, [
    h('span', null, '改变了！')
  ])
```

`patch`函数要对比两个DOM，我们将设参数为`n1`和`n2`。

`n1`代表旧的虚拟DOM，`n2`代表新的虚拟DOM，`n1`就是之前的快照，基本上表示当前屏幕上的内容，`n2`是新的快照，它表示了我们希望屏幕上的内容更新。

所以接下来就是`patch`函数的工作，找出它需要执行的最小数量的DOM操作，将屏幕更新到所期望的状态。

```javascript
  function patch(n1, n2) {
    if (n1.tag === n2.tag) {
      const el = n2.el = n1.el

      // props
      const oldProps = n1.props || {}
      const newProps = n2.props || {}
      // 假设新的props属性有7个，旧的props属性有5个，则需要给它添加新的属性
      for (const key in newProps) { // 检查每一个新的props属性值
        const oldValue = oldProps[key]
        const newValue = newProps[key]
        if (newValue !== oldValue) { // 新旧值有差异，则更新旧的属性值
          el.setAttribute(key, newValue)
        }
      }
      // 假设新的props属性有5个，旧的props属性有7个则需要将它删除
      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key)
        }
      }

      // children
      const oldChildren = n1.children
      const newChildren = n2.children
      if (typeof newChildren === 'string') {
        if (typeof oldChildren === 'string') {
          // 比较新的children和旧的children的字符串
          // 两者字符串不相同，则直接内容替换，这里的字符串应该是文字
          if (newChildren !== oldChildren) {
            el.textContent = newChildren
          }
        } else {
          el.textContent = newChildren
        }
      } else {
        // 旧的子节点是字符串，新的子节点不是字符串，则要将旧的children直接清空
        // 并且，根据newChildren创建新的DOM节点
        if (oldChildren === 'string') {
          el.innerHTML = ''
          newChildren.forEach(child => {
            mount(child, el)
          })
        }
      }
    } else {
      // 有新的内容，需要执行replace替换

      // 这里我们将设没有key，我们要做的是，对于同一索引中的两个项目，我们比较一下，
      // 如果不是同一类型的，我们就把它替换掉
      const commonLength = Math.min(oldChildren.length, newChildren.length)
      for (let i = 0; i < commonLength; i++) {
        patch(oldChildren[i], newChildren[i])
      }
      // 现在我们需要对可能发生的情况做出处理
      // 如果新的Children更长或者更短
      // 如果是更长，我们必须要添加一堆新的节点
      // 如果是更短，我们需要把多余的节点销毁
      if (newChildren.length > oldChildren.length) {
        newChildren.slice(oldChildren.length).forEatch(child => {
          mount(child, el)
        })
      } else if (newChildren.length < oldChildren.length) {
        oldChildren.slice(newChildren.length).forEach(child => {
          el.removeChild(child.el)
        })
      }
    }
  }
```

在vue内部，有两种模式比较数组子元素

* 第一种模式是我们称之为键模式：当你是`v-for`并提供一个`key`，在子数组中，这个`key`用作节点位置的提示（当第一次挂载完毕后，会以这个`key`作为基准检查是否有变化，而不会在意`key`这一项在数组的排序位置）。

* 第二种模式是无键值模式：不根据键值进行比较，而是直接一对一比较。

在新的子节点不为字符串的情况下，根据长度短的一方，进行递归遍历检查比较，至少在最后保证，公共长度将始终更新，达到所需要的状态。但我们仍然需要考虑到，如果`newChildren`数组可能更长，这样意味着将添加新项目，或者可以更短，也就是说，将删除这个项目。

所以我们需要做的第一件事，就是将新的节点和旧的节点公共部分，同一索引中的每一个进行比较，这里比较低效的是，如果我们所有节点都有不同类型的列表、不同的标签类型。我们用不可预知的方式把它们混在一起，我们有可能被扔掉，在很多情况下不需要重新创建节点， 其实这里是没有进行优化的，为了方便理解，它保证了最后的一致性。

在vue内部，使用了一些智能的启发式方法，去确保使用哪一种算法，也是基于模板编译

## watchEffect

`watchEffect`负责监听DOM变化以及数据变化的副作用。

`watch`和`watchEffect`的区别是watch是属于懒惰的，只有当数据变化的时候才会执行回调，`watchEffect`是非懒惰的，因为它要预先收集所有的依赖关系，所以不得不执行。

vue的响应式需要实现利用发布订阅的模式，收集所有的依赖到`subscribes`散列中。

以下是基于Vue2思想实现的响应式。

```javascript
<script>
  let activeEffect

  class Dep {
    subscribes = new Set()

    depend() {
      if (activeEffect) {
        this.subscribes.add(activeEffect)
      }
    }

    notify() {
      this.subscribes.forEach(effect => {
        effect()
      })
    }
  }

  function watchEffect(effect) {
    activeEffect = effect
    effect()
    activeEffect = null
  }

  function reactive(raw) {
    Object.keys(raw).forEach(key => {
      const dep = new Dep()
      let value = raw[key]

      Object.defineProperty(raw, key, {
        get() {
          dep.depend()
          return value
        },
        set(newValue) {
          value = newValue
          dep.notify()
        }
      })
    })
    return raw
  }

  const state = reactive({
    count: 0
  })

  watchEffect(() => {
    console.log(state.count)
  })

  state.count++
</script>
```

## reactive

这里介绍Vue3的响应式，使用的ES6新特性`Proxy`代理和`Reflect`反射实现数据的相应式处理。

```javascript
 <script>
  let activeEffect

  class Dep {
    subscribes = new Set()

    depend() {
      if (activeEffect) {
        this.subscribes.add(activeEffect)
      }
    }

    notify() {
      this.subscribes.forEach(effect => {
        effect()
      })
    }
  }

  function watchEffect(effect) {
    activeEffect = effect
    effect()
    activeEffect = null
  }

  const targetMap = new WeakMap()

  // 获取依赖
  function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      // 这里使用WeakMap是为了方便垃圾回收，target是一个对象，有利于垃圾回收
      // Map的键值支持任何数据，一些基本类数据不利于观察引用，也就不利于垃圾清理
      targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Dep()
      depsMap.set(key, dep)
    }
    return dep
  }

  const reactiveHandlers = {
    get(target, key, receiver) {
      const dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value, receiver)
      dep.notify()
      return result
    }
  }

  // 实现响应式
  function reactive(raw) {
    return new Proxy(raw, reactiveHandlers)
  }

  const state = reactive({
    count: 0
  })

  watchEffect(() => {
    console.log(state.count)
  })

  state.count++
</script>
```

## Mini-Vue

了解了vue的实现原理，来写一个mini版本的vue，完整代码如下：

```javascript
<div id="app"></div>

<script>
  function h(tag, props, children) {
    return {
      tag,
      props,
      children
    }
  }

  function mount(vnode, container) {
    const el = vnode.el = document.createElement(vnode.tag)
    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key]
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
        } else {
          el.setAttribute(key, value)
        }
      }
    }

    // children
    if (vnode.children) {
      if (typeof vnode.children === 'string') { // vnode的子节点是字符串，则直接进行赋值操作
        el.textContent = vnode.children
      } else { // 否则继续递归检查，并挂载子节点
        vnode.children.forEach(child => {
          mount(child, el)
        });
      }
    }

    // 插入到父极节点树中
    container.appendChild(el)
  }

  function patch(n1, n2) {
    if (n1.tag === n2.tag) {
      const el = n2.el = n1.el

      // props
      const oldProps = n1.props || {}
      const newProps = n2.props || {}
      // 假设新的props属性有7个，旧的props属性有5个，则需要给它添加新的属性
      for (const key in newProps) { // 检查每一个新的props属性值
        const oldValue = oldProps[key]
        const newValue = newProps[key]
        if (newValue !== oldValue) { // 新旧值有差异，则更新旧的属性值
          el.setAttribute(key, newValue)
        }
      }
      // 假设新的props属性有5个，旧的props属性有7个则需要将它删除
      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key)
        }
      }

      // children
      const oldChildren = n1.children
      const newChildren = n2.children
      if (typeof newChildren === 'string') {
        if (typeof oldChildren === 'string') {
          // 比较新的children和旧的children的字符串
          // 两者字符串不相同，则直接内容替换，这里的字符串应该是文字
          if (newChildren !== oldChildren) {
            el.textContent = newChildren
          }
        } else {
          el.textContent = newChildren
        }
      } else {
        // 旧的子节点是字符串，新的子节点不是字符串，则要将旧的children直接清空
        // 并且，根据newChildren创建新的DOM节点
        if (oldChildren === 'string') {
          el.innerHTML = ''
          newChildren.forEach(child => {
            mount(child, el)
          })
        }
      }
    } else {
      // 有新的内容，需要执行replace替换
      // 在vue内部，有两种模式比较数组子元素
      // 第一种模式是我们称之为键模式：当你是否v-for并提供一个key，这个key用作节点位置的提示，在子数组中

      // 这里我们将设没有key，我们要做的是，对于同一索引中的两个项目，我们比较一下，
      // 如果不是同一类型的，我们就把它替换掉
      const commonLength = Math.min(oldChildren.length, newChildren.length)
      // 根据长度短的一方，进行递归遍历检查比较，所以至少在最后保证，公共长度将始终更新，达到所需要的状态
      // 但我们仍然需要考虑到，如果newChildren数组可能更长，这样意味着将添加新项目
      // 或者可以更短，也就是说，将删除这个项目

      // 所以我们需要做的第一件事，就是将新的节点和旧的节点公共部分，同一索引中的每一个进行比较
      // 这里比较低效的是，如果我们所有节点都有不同类型的列表、不同的标签类型
      // 我们用不可预知的方式把它们混在一起，我们有可能被扔掉，在很多情况下不需要重新创建节点
      // 其实这里是没有进行优化的，为了方便理解，它保证了最后的一致性

      // 在vue内部，使用了一些智能的启发式方法，去确保使用哪一种算法，也是基于模板编译
      for (let i = 0; i < commonLength; i++) {
        patch(oldChildren[i], newChildren[i])
      }
      // 现在我们需要对可能发生的情况做出处理
      // 如果新的Children更长或者更短
      // 如果是更长，我们必须要添加一堆新的节点
      // 如果是更短，我们需要把多余的节点销毁
      if (newChildren.length > oldChildren.length) {
        newChildren.slice(oldChildren.length).forEatch(child => {
          mount(child, el)
        })
      } else if (newChildren.length < oldChildren.length) {
        oldChildren.slice(newChildren.length).forEach(child => {
          el.removeChild(child.el)
        })
      }
    }
  }

  // reactivity
  let activeEffect

  class Dep {
    subscribes = new Set()

    depend() {
      if (activeEffect) {
        this.subscribes.add(activeEffect)
      }
    }

    notify() {
      this.subscribes.forEach(effect => {
        effect()
      })
    }
  }

  function watchEffect(effect) {
    activeEffect = effect
    effect()
    activeEffect = null
  }

  const targetMap = new WeakMap()

  function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
      dep = new Dep()
      depsMap.set(key, dep)
    }
    return dep
  }

  const reactiveHandlers = {
    get(target, key, receiver) {
      const dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, value, receiver)
      dep.notify()
      return result
    }
  }

  function reactive(raw) {
    return new Proxy(raw, reactiveHandlers)
  }

  const App = {
    data: reactive({
      count: 0
    }),
    render() {
      return h('div', {
        onClick: () => {
          this.data.count++
        }
      }, String(this.data.count))
    }
  }

  function mountApp(component, container) {
    let isMounted = false
    let prevVdom
    watchEffect(() => {
      if (!isMounted) {
        prevVdom = component.render()
        mount(prevVdom, container)
        isMounted = true
      } else {
        const newVdom = component.render()
        patch(prevVdom, newVdom)
        prevVdom = newVdom
      }
    })
  }

  mountApp(App, document.getElementById('app'))
</script>
```

## 总结

以上就实现了三个阶段，从`Render`到`Virtual DOM`，由h函数实现模板，并将模板生成为`Vnode`，第二阶段是将`Virtual DOM`挂载到页面中，由`mount`函数实现。第三阶段是节点改变，旧的虚拟节点要和新的虚拟节点进行比较变更，有多节点则调用`mount`函数挂载上去，减少了虚拟节点则将真是的DOM节点销毁。

节点的挂载是递归检索所有虚拟DOM，有一些虚拟DOM存在子节点嵌套，要逐个递归、创建。

响应式利用Proxy自带的属性检测对象数据的变更，它实现了原生数组的检查，包括直接`arr[2] = 1`的检测。解决了Vue2中无法检查数组长度和变更的问题，vue2的数组操作是直接改写原生方法，像`push`、`pop`这些。





















