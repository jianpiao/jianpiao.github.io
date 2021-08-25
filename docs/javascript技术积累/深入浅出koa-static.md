# 深入浅出koa-static

## 背景

为了解JS与CSS是否会阻塞DOM渲染的过程中，新建了一个node项目，通过延迟加载css操作检查是否有阻塞情况，期间需要在服务器端加载css我静态文件，express自带有`express.static`方法，而koa没有静态文件加载的api，所以网上找到了`koa.static`可以实现静态文件加载，而折腾了一早上，css文件路径解析一直报错，究其原因很久，依旧没有找到具体的原因，所以开始解析其源码，了解所以然。

以上问题将会出另外一篇文章，在此先不做讨论。



## koa-static概述

读取静态文件

#### 安装

```basic
npm install koa-static
```



### 使用方法

```javascript
const Koa = require('koa');
const app = new Koa();
const serve = require("koa-static")

// 使用规则：app.use(serve(root),opts);
// 第二个参数可以省略
app.use(serve("."));
```

* root：文件路径
* opts：选项对象



#### opts选项

- `maxage`浏览器缓存最大年龄（毫秒）。默认为0
- `hidden`允许传输隐藏文件。默认为false
- `index`默认文件名，默认为“index.html”
- `defer` 如果为true则会延迟加载，先加载next()中间件，当自身执行完毕之后才会加载自身。
- `gzip`当客户端支持gzip时，如果请求的扩展名为.gz的文件存在时，尝试自动服务文件的gzip版本。默认为true。
- `br`当客户端支持brotli并且请求的扩展名为.br的文件存在时，请尝试自动提供文件的brtli版本（注意，brotli仅通过https接受）。默认为true。
- [setHeaders](https://github.com/koajs/send#setheaders)函数在响应时设置自定义标头。
- `extensions` 当URL中没有扩展名时，尝试匹配传入数组中的扩展名来搜索文件。默认为false



## 源码解析

以下是koa-static核心源码

```javascript

'use strict'

const debug = require('debug')('koa-static') // 错误处理
const { resolve } = require('path') // 负责路径读取
const assert = require('assert')  // 负责控制台输出颜色配置
const send = require('koa-send')  // 核心插件

/**
 * 省略一些没用的东西......
 */

function serve(root, opts) {
  opts = Object.assign({}, opts)

  assert(root, 'root directory is required to serve files')

  // 处理option参数内容
  debug('static "%s" %j', root, opts)
  opts.root = resolve(root)
  if (opts.index !== false) opts.index = opts.index || 'index.html'

  if (!opts.defer) {  // 延迟处理，即在next执行后处理
    return async function serve(ctx, next) {
      let done = false

      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        try {
          done = await send(ctx, ctx.path, opts)  // 执行操作
        } catch (err) {
          if (err.status !== 404) {
            throw err
          }
        }
      }

      if (!done) {
        await next() // 先执行下一个中间件
      }
    }
  }

  return async function serve(ctx, next) {
    await next()

    // 只对HEAD和GET类型执行操作，
    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return
    // 相应已经被处理
    if (ctx.body != null || ctx.status !== 404) return // eslint-disable-line
    
		/****************************** 下面这里是核心  *******************************/
    try {
      await send(ctx, ctx.path, opts)  // send方法来自于koa-send依赖，我们去看看koa-send源码如何处理的
    } catch (err) {
      if (err.status !== 404) {
        throw err
      }
    }
    /***************************************************************************/
  }
}

```

> 这里额外拓展一下关于http中的HEAD和GET的知识：
>
> HEAD和GET方法相同，只不过服务器相应时不会返回消息实体。
>
> 一个HEAD请求的响应中，HTTP头中包含的元信息应该和一个GET请求的响应消息相同。
>
> 一个HEAD请求的响应可被缓存，也就是说，响应中的信息可能用来更新之前缓存的实体。
>
> 如果当前实体跟缓存实体的阈值不同（可通过Content-Length、Content-MD5、ETag或Last-Modified的变化来表明），那么这个缓存就被视为过期了。



### koa-send源码解析

我们来看看koa-send源码是如何处理koa-static传过去的内容。

```javascript
/**
 * Module dependencies.
 */

const fs = require('fs')
const util = require('util')
const debug = require('debug')('koa-send')
const resolvePath = require('resolve-path')
const createError = require('http-errors')
const assert = require('assert')

const stat = util.promisify(fs.stat)
const access = util.promisify(fs.access)

async function exists(path) {
  try {
    await access(path)
    return true
  } catch (e) {
    return false
  }
}

const {
  normalize,
  basename,
  extname,
  resolve,
  parse,
  sep
} = require('path')

/**
 * 省略一些没用的......
 */

async function send(ctx, path, opts = {}) {
  assert(ctx, 'koa context required')
  assert(path, 'pathname required')

  // 省略options配置项......

  // normalize path
  path = decode(path)

  // stat
  let stats
  try {
    stats = await stat(path) // 获取文件

    // Format the path to serve static file servers
    // and not require a trailing slash for directories,
    // so that you can do both `/directory` and `/directory/`
    // 检索目标文件
    if (stats.isDirectory()) {
      if (format && index) {
        path += `/${index}`
        stats = await stat(path)
      } else {
        return
      }
    }
  } catch (err) {
   // 忽略异常处理......
  }

  if (setHeaders) setHeaders(ctx.res, path, stats)

  // stream，流文件，顺便检查缓存，没缓存则设置缓存，有缓存则检查更新
  // 这里不细说缓存原理了，可以参见：
  // 1. https://segmentfault.com/a/1190000017962411?utm_source=tag-newest
  // 2. https://www.cnblogs.com/chengxs/p/10396066.html
  ctx.set('Content-Length', stats.size)
  if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString())
  if (!ctx.response.get('Cache-Control')) {
    const directives = [`max-age=${(maxage / 1000 | 0)}`]
    if (immutable) {
      directives.push('immutable')
    }
    ctx.set('Cache-Control', directives.join(','))
  }
  
  /********************************  这里是核心  *****************************************/
  if (!ctx.type) ctx.type = type(path, encodingExt)
  ctx.body = fs.createReadStream(path)
	/*************************************************************************************/
  return path
}

/**
 * File type.
 * 检查文件后缀
 * 这里用到了extname，函数出自path依赖中
 */

function type(file, ext) {
  return ext !== '' ? extname(basename(file, ext)) : extname(file)
}

```

通过以上源码大体可以总结出send做的工作。

* send的核心是检查文件的拓展名（后缀），去设置文件的类型（Content-Type）。
* 文件是以流（steam）的形式输出。
* Content-Type又分为"text/html"和"text/plain"两种，对应Buffer/Stream，如果不是以上任何类型，那可能就是JSON类型。





此外，源码用到了几个关键的函数，下面我一一介绍一下：

* extname
* normalize
* Util.promisify
* Basename



### extname

extname可以获取文件的拓展名（后缀），见如下示例：

```javascript
path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

path.extname('index');
// Returns: ''

path.extname('.index');
// Returns: ''

path.extname('.index.md');
// Returns: '.md'
```



### normalize

normalize方法传入文件路径，解析".."或者"."分割字符。

当找到多个顺序路径段分隔符，它们会被当前执行环境所替换，保留尾部的分器。

如果路径只有一个单纯的"."号，则会指定为执行当前工作目录。

```javascript
// 例如在POSI上：
path.normalize('/foo/bar//baz/asdf/quux/..');
// Returns: '/foo/bar/baz/asdf'


// 在window上：
path.normalize('C:\\temp\\\\foo\\bar\\..\\');
// Returns: 'C:\\temp\\foo\\'


// 由于Windows识别多个路径分隔符，这两个分隔符将被Windows首选分隔符（\）的实例替换：
path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar');
// Returns: 'C:\\temp\\foo\\bar'
```



### Util.promisify

接收一个常见的回调函数，最终转化成为一个primise的函数。

使用方法：

```javascript
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);
stat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});
```

或者也可以使用es7的`async await`

```javascript
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);

async function callStat() {
  const stats = await stat('.');
  console.log(`This directory is owned by ${stats.uid}`);
}
```

如果还想深入了解可参见官网：https://nodejs.org/dist/latest-v16.x/docs/api/util.html#util_util_promisify_original



### basename

basename方法返回路径最后的一部分。

```javascript
path.basename('/foo/bar/baz/asdf/quux.html');
// 返回: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'


path.win32.basename('C:\\foo.html', '.html');
// 返回: 'foo'

path.win32.basename('C:\\foo.HTML', '.html');
// 返回: 'foo.HTML'
```





## 自己实现

知道了koa-static和koa-send的工作，能不能我自己实现一个呢？

其实完全没有问题的，最核心的工作就是

* 判断类型
* 创建读写流
* 输出给ctx.body

基于以上，我们手动实现代码如下：

```javascript
// 检查访问是否是静态文件
app.use(async (ctx, next) => {
  const fileType = path.extname(ctx.path).slice(1)
  if (fileType === "css") {
    ctx.type = "css"
    ctx.body = fs.createReadStream("./public/index.css")
  } else if (fileType === "js") {
    // do something
  } else if (fileType === "png") {
    // do something
  } else if (fileType === "jpg") {
    // do something
  }
})
```





## 小结

* 在`koa-static`接收两个参数，第一参数是文件路径，如果访问的是根目录则直接传入一个英文的点"."即可，如果传入是文件名称，则会向下查找。

* 静态文件输出的类型取决于读取到的文件本身是什么类型，最终我们可以在Content-Type中查看具体返回的是什么类型。