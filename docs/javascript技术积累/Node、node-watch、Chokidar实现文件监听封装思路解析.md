# Node、node-watch、Chokidar实现文件监听封装思路解析

## 前言

文件监听是很多业务场景中常用的功能，简单的探索一下文件监听工具的差异。

## 场景

在学习rollup过程中初始化了一个node项目，希望做到每次文件变更的时候都能够监听得到具体是哪个文件的变更，根据这个需求，我首选了node自带的`watch API`。

## 项目结构

```javascript
|____bundle.js // 构建出来的包
|____index.js  // 开发文件入口
|____README.md 
|____main.js // 构建入口文件
|____package-lock.json
|____package.json
|____utils.js  // 工具函数
```



这里只用到三个文件，分别是：

`utiles.js`是几个函数

```javascript
export const foo = function () {
  console.log("foo");
};

export const bar = function () {
  console.log("bar");
};

export const name = "光环助手";

export const sayHi = function () {
  console.log(`Hi ${name}`);
};

```



`main.js`是入口文件，负责收集所有执行的内容

```javascript
import { foo, bar, sayHi } from "./utils.js";

const unused = "我用不着";

foo();
sayHi();

```



 `index.js`是rollup构建函数中心

```javascript
const rollup = require("rollup");
const fs = require("fs");

rollup
  .rollup({
    input: "main.js",
  })
  .then(async (bundle) => {
    await bundle.write({
      file: "bundle.js",
    });
  });
```



## `fs.watchFile`

监听单个文件，每当访问文件时会触发回调，保存文件后有可能不会及时触发回调，因为使用的轮询机制。[官网地址](https://nodejs.org/docs/latest-v9.x/api/fs.html#fs_fs_watchfile_filename_options_listener)

```javascript
const rollup = require("rollup");
const fs = require("fs");

rollup
  .rollup({
    input: "main.js",
  })
  .then(async (bundle) => {
    await bundle.write({
      file: "bundle.js",
    });

    const filePath = "./bundle.js";
    console.log("开始监听啦~~");
    fs.watchFile(filePath, (curr, prev) => {
      console.log(`the current mtime is: ${curr.mtime}`);
  		console.log(`the previous mtime was: ${prev.mtime}`);
    });
  });
```

执行以上文件内容后会生成`bundle.js`，并且会启动文件监听，控制台打印如下：

```javascript
开始监听
```

现在还没有变更，所以没有变化，接下来改变点东西再次保存，打印如下：

```javascript
开始监听
the current mtime is: Wed Aug 18 2021 15:37:12 GMT+0800 (中国标准时间)
the previous mtime was: Wed Aug 18 2021 15:31:22 GMT+0800 (中国标准时间)
```

接下来，不做任何变化，直接保存文件，打印如下：

```javascript
开始监听
the current mtime is: Wed Aug 18 2021 15:37:12 GMT+0800 (中国标准时间)
the previous mtime was: Wed Aug 18 2021 15:31:22 GMT+0800 (中国标准时间)
the current mtime is: Wed Aug 18 2021 15:38:20 GMT+0800 (中国标准时间)
the previous mtime was: Wed Aug 18 2021 15:37:12 GMT+0800 (中国标准时间)
```

发现不做任何变更，也会被触发。其次它只支持单个文件。官网也是说不建议使用`watchFile`,它并不高效，建议使用`watch`。	



## `fs.watch`

可以监听整个目录下的文件，[官网地址](http://nodejs.cn/api/fs.html#fs_fspromises_watch_filename_options)。回调函数有两个参数

* eventType：事件类型
* filename：变更的文件名称

```javascript
const rollup = require("rollup");
const fs = require("fs");

rollup
  .rollup({
    input: "main.js",
  })
  .then(async (bundle) => {
    await bundle.write({
      file: "bundle.js",
    });
		
  	console.log("开始监听~~")
    const filePath = "./";
    fs.watch(filePath, (event, filename) => {
      console.log("更新了~~~", event, filename);
    });
  });

```

执行以上文件内容后会生成`bundle.js`，并且会启动文件监听，控制台打印如下：

```javascript
开始监听~~
更新了~~~ change bundle.js
```

接下来改变点东西再次保存，打印如下：

```javascript
始监听~~
更新了~~~ change bundle.js
更新了~~~ change bundle.js
更新了~~~ change bundle.js
```

文件更新了两次，接下来，不做任何变化，直接保存文件，打印如下：

```javascript
始监听~~
更新了~~~ change bundle.js
更新了~~~ change bundle.js
更新了~~~ change bundle.js
更新了~~~ change bundle.js
更新了~~~ change bundle.js
```

同样文件更新了两次。

其次有个比较明显的差异是，相应比较快，相比于`watchFile`的轮询效率更高。

这里有一个问题是每次更新都触发了两次回调，这个不符合预期，可以通过文件对比的方式进行差异化检查，这里我用到了md5插件。

代码更新如下：

```javascript
const rollup = require("rollup");
const fs = require("fs");
const md5 = require("md5");

let old = null;
let timer = null;

rollup
  .rollup({
    input: "main.js",
  })
  .then(async (bundle) => {
    await bundle.write({
      file: "bundle.js",
    });

    const filePath = "./";
    console.log("开始监听");
    fs.watch(filePath, (event, filename) => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
      }, 100);

      const temp = md5(fs.readFileSync(filePath + filename));
      if (temp == old) return;
      old = temp;

      console.log("更新了", filename);
    });
  });

```

不改变内容的情况下保存文件，不会打印"更新"，改变内容的情况下保存文件，会打印"更新"，符合预期。



## `node-watch`

[node-watch](https://github.com/yuanchuan/node-watch)是对上面的`fs.watch`的封装和增强。它解决了以下问题：

* 编辑器会生成临时的文件，导致回调函数会被触发两次
* 在观察单个文件保存时，回调函数只会触发一次
* 解决Linux和旧版本node不支持递归的问题

使用方法如下：

```javascript
const rollup = require("rollup");
const watch = require("node-watch");

rollup
  .rollup({
    input: "main.js",
  })
  .then(async (bundle) => {
    await bundle.write({
      file: "bundle.js",
    });

    let watcher = watch("./", { recursive: true });
    watcher.on("change", function (evt, name) {
      // callback
      console.log("更新了~~~", name);
    });
  });

```

每次保存文件都会触发更新，不论文件内容是否有变更。

### 思路

执行

```javascript
const watch = require("node-watch");

let watcher = watch("./", { recursive: true });
```

这个监听就启动了，根据源码入口找到了`lib/watch.js`文件，从中找到`watch`函数，核心代码如下：

```javascript
function watch(fpath, options, fn) {
  var watcher = new Watcher(); // 实例一个事件触发器

	// 省略一些代码，主要是负责检查传入的fpath类型是否正确，文件是否存在

  // 是数组，则递归观察文件树
  if (is.array(fpath)) {
    if (fpath.length === 1) {
      return watch(fpath[0], options, fn);
    }
    var filterDups = createDupsFilter();
    return composeWatcher(unique(fpath).map(function(f) { // unique过滤不需要监听的文件
      var w = watch(f, options); // 递归
      if (is.func(fn)) {
        w.on('change', filterDups(fn));
      }
      return w;
    }));
  }
	// 监听文件
  if (is.file(fpath)) {
    watcher.watchFile(fpath, options, fn);
    emitReady(watcher);
  }
	// 监听目录
  else if (is.directory(fpath)) {
    var counter = semaphore(function () {
      emitReady(watcher);
    });
    watcher.watchDirectory(fpath, options, fn, counter);
  }

  return watcher.expose();
}
```

一开始实例一个`Watcher`事件触发器，后面则是根据这个实例，注册所有的事件，我们看看`Watcher`构造函数做了什么工作。

```javascript
const events = require("events")
const util = require("util")
// 构造函数
function Watcher() {
  events.EventEmitter.call(this);
  this.watchers = {};
  this._isReady = false;
  this._isClosed = false;
}

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.expose = function(){/* do something */}
Watcher.prototype.add = function(){/* do something */}
// 监听文件
Watcher.prototype.watchFile = function(){
 	// 核心代码
  var watcher = fs.watch(parent, opts);
  this.add(watcher, {
    type: 'file',
    fpath: parent,
    options: Object.assign({}, opts, {
      encoding: options.encoding
    }),
    compareName: function(n) {
      return is.samePath(n, file);
    }
  });

  if (is.func(fn)) {
    if (fn.length === 1) deprecationWarning(); // 解决回调两次的问题
    this.on('change', fn);
  }
}
// 监听文件夹
Watcher.prototype.watchDirectory = function(file, options, fn){
  // 兼容linux和旧版本
  hasNativeRecursive(function(has) {
    options.recursive = !!options.recursive;
   	// 核心代码
    var watcher = fs.watch(dir, opts);

    self.add(watcher, {
      type: 'dir',
      fpath: dir,
      options: options
    });

    if (is.func(fn)) {
      if (fn.length === 1) deprecationWarning(); // 解决回调两次的问题
      self.on('change', fn);
    }

    if (options.recursive && !has) {
      getSubDirectories(dir, function(d) {
        if (shouldNotSkip(d, options.filter)) { // 过滤需要忽略的文件
          self.watchDirectory(d, options, null, counter); // 递归
        }
      }, counter());
    }
  });
}

```

简单概括就是继承了`EventEmitter`的属性，实现了文件、文件夹的监听事件。

### 小结

* 执行`watch`会创建一个[events](http://nodejs.cn/api/events.html)事件触发器，其中主要是继承了[`EventEmitter`](http://nodejs.cn/api/events.html#events_class_eventemitter)类。
* 在继承的基础上重写了`watchFile`和`watchDirectory`函数，实现了文件和文件夹的监听事件。
* `watch`支持数组，遇到数组使用递归进行处理。
* 通过判断`fn`调用的次数来解决元素`fs.watch`回调被多次调用的问题，只有调用次数为**1**时才执行回调。
* [`hasNativeRecursive`](https://github.com/yuanchuan/node-watch/blob/c69294f010cf2531907e30a81cb06d1d5c5a0546/lib/has-native-recursive.js#L56)函数负责解决linux和旧版本Node递归的问题，解决思路是根据不同环境动态创建临时文件或者文件夹实现当前环境所支持的监听事件。文件监听依旧使用的是`fs.watch`。当监听结束之后会自动把临时文件清除。

根据对源码的解读，能够大体了解封装的思路，以及如何解决原生遗留的问题。



## [Chokidar](https://github.com/paulmillr/chokidar)

Chokidar 是一个极简高效的跨平台文件查看器。我第一次了解到Chokidar是在看vite源码的时候，vite的文件更新监听使用的正是Chokidar。除此之外，使用到Chokidar的还有 [Microsoft's Visual Studio Code](https://github.com/microsoft/vscode), [gulp](https://github.com/gulpjs/gulp/),[karma](https://karma-runner.github.io/), [PM2](https://github.com/Unitech/PM2), [browserify](http://browserify.org/), [webpack](https://webpack.github.io/), [BrowserSync](https://www.browsersync.io/), and [many others](https://www.npmjs.com/browse/depended/chokidar)，在开发环境下都有它的身影。

Chokidar本质上是做了系统区分，在OS X系统中依赖原生fsevents API实现文件监控，在Window、Linux等系统中依赖node的`fs.watch`和`fs.watchFile`实现文件监控，相比于前面的node-watch，Chokidar封装的更加强壮、稳定，性能更好，有更好的CPU使用率。

### 使用方法

```javascript
const rollup = require("rollup");
const chokidar = require("chokidar");

rollup
  .rollup({
    input: "main.js",
  })
  .then(async (bundle) => {
    await bundle.write({
      file: "bundle.js",
    });

    chokidar
      .watch(".", {
        ignored: ["**/node_modules/**", "**/.git/**"],
      })
      .on("all", (event, path) => {
        console.log(event, path);
      });
  });

```

`.`代表的是监听当前目录下所有的问题，包括`node_modules`依赖文件，所以需要使用`ignored`对不需要监听的文件进行过滤。

运行后，每次保存文件都会触发更新，不论文件内容是否有变更。

### 探索思路

根据chokidar项目package.json找到入口文件为`index.js`，顺着使用中首先需要实例`watch`的思路，找到如下源码：

```javascript
const watch = (paths, options) => {
  const watcher = new FSWatcher(options);
  watcher.add(paths);
  return watcher;
};
```

封装的`watch`函数非常简单，估计核心代码都在`FSWatcher`类下面，顺藤摸瓜找`FSWatcher`类。

1. 首先会先检查是否可以使用fsevents

   ```javascript
   const canUseFsEvents = FsEventsHandler.canUse();
   if (!canUseFsEvents) opts.useFsEvents = false;
   ```

2. 根据不同的运行环境使用不同的方案，提高性能

   ```javascript
   // Initialize with proper watcher.
   if (opts.useFsEvents) {
     this._fsEventsHandler = new FsEventsHandler(this); // MacOS环境使用fsevents
   } else {
     this._nodeFsHandler = new NodeFsHandler(this);  // 其他环境使用fs原生的API
   }
   ```

3. 动态添加监听的文件

   ```javascript
   add(paths_, _origAdd, _internal) {
     const {cwd, disableGlobbing} = this.options;
     let paths = unifyPaths(paths_);  // 处理单文件、数组、目录，返回一个路径数组
     // 根据不同环境，使用不同方法进行处理
     if (this.options.useFsEvents && this._fsEventsHandler) { // fsevents
       if (!this._readyCount) this._readyCount = paths.length;
       if (this.options.persistent) this._readyCount *= 2;
       // 遍历数组，给每一个文件都添加观察者模式
       paths.forEach((path) => this._fsEventsHandler._addToFsEvents(path));
     } else {  // Node
       if (!this._readyCount) this._readyCount = 0;
       this._readyCount += paths.length;
       Promise.all(
         paths.map(async path => {
           // 遍历数组，给每一个文件都添加观察者模式
           const res = await this._nodeFsHandler._addToNodeFs(path, !_internal, 0, 0, _origAdd);
           // 文件观察模式启动
           if (res) this._emitReady();
           return res;
         })
       ).then(results => {
         if (this.closed) return;
         results.filter(item => item).forEach(item => {
           // 递归
           this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
         });
       });
     }
   
     return this;
   }
   ```

4. 如果是在MacOS系统中，`fsevents-handler.js`负责调用原生的`watch`

   ```javascript
   const createFSEventsInstance = (path, callback) => {
     const stop = fsevents.watch(path, callback);
     return {stop};
   };
   
   function setFSEventsListener(path, realPath, listener, rawEmitter) {
   	// 省略代码
     cont = {
       watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
         if (!cont.listeners.size) return;
         const info = fsevents.getInfo(fullPath, flags);
         cont.listeners.forEach(list => {
           list(fullPath, flags, info);
         });
   
         cont.rawEmitter(info.event, fullPath, info);
       })
     };
   }
   ```

5. 如果在其他环境下，使用Node原生的API

   ```javascript
   function createFsWatchInstance(path, options, listener, errHandler, emitRaw) {
     const handleEvent = (rawEvent, evPath) => {
       listener(path);
       emitRaw(rawEvent, evPath, {watchedPath: path}); // 监听回调
     };
     try {
       return fs.watch(path, options, handleEvent); // 使用fs依赖下的watch
     } catch (error) {
       errHandler(error);
     }
   }
   
   // 给文件列表监听事件
   const setFsWatchFileListener = (path, fullPath, options, handlers) => {
     cont = {
       watcher: fs.watchFile(fullPath, options, (curr, prev) => {
         foreach(cont.rawEmitters, (rawEmitter) => {
           rawEmitter(EV_CHANGE, fullPath, {curr, prev});
         });
         const currmtime = curr.mtimeMs;
         if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
           foreach(cont.listeners, (listener) => listener(path, curr));
         }
       })
     };
     FsWatchFileInstances.set(fullPath, cont);
   };
   ```

以上就是chokidar执行的流程了。下面详细讲解一下fsevents。

### [fsevents](https://github.com/fsevents/fsevents)

fsevents是Chokidar的一个依赖，用于替代Node的`fs`模块来访问MacOS系统文件，它仅仅支持MacOS。

先来看看`chokidar/lib/fsevents-handler.js`使用的例子：

```javascript
const createFSEventsInstance = (path, callback) => {
  const stop = fsevents.watch(path, callback);
  return {stop};
};

function setFSEventsListener(path, realPath, listener, rawEmitter) {
	// 省略代码
  cont = {
    watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
      if (!cont.listeners.size) return; // 如果不是MacOS则无法执行
      const info = fsevents.getInfo(fullPath, flags);
      cont.listeners.forEach(list => { // 遍历目录，给每一个文件添加观察者模式
        list(fullPath, flags, info);
      });

      cont.rawEmitter(info.event, fullPath, info);
    })
  };
}
```

fsevents**最核心**的是写了专门针对MacOS的二进制操作源码，是用C语言写的，在fsevents源码下的`fsevents.node`文件。

```javascript
const Native = require("./fsevents.node");
```

利用封装好的操作指令，实现了`watch`操作，代码如下：

```javascript
const Native = require("./fsevents.node");
const events = Native.constants;

function watch(path, since, handler) {
  let instance = Native.start(Native.global, path, since, handler);
  if (!instance) throw new Error(`could not watch: ${path}`);
  return () => {
    const result = instance ? Promise.resolve(instance).then(Native.stop) : Promise.resolve(undefined);
    instance = undefined;
    return result;
  };
}

// 输出监听信息（只针对单个文件）
function getInfo(path, flags) {
  return {
    path,
    flags,
    event: getEventType(flags),
    type: getFileType(flags),
    changes: getFileChanges(flags),
  };
}
```

以上就是fsevents所做的主要工作了。

### 小结

* 执行`watch`，根据封装好的`FSWatcher`类，实例一个`watch`对象。
* `FSWatcher`类构造函数会初始化基本信息，其中最重要是判断当前执行的系统环境，是MacOS则使用fsevents，是其他系统则使用Node。
* 确定了执行的系统环境，给用户需要监听的文件(单个文件、目录、或者globs匹配路径)添加监听事件。
* 如果是MacOS系统环境，使用的是fsevents封装好的`fsevents.node`Native API，实现`file watch`,文件的监听关系是属于一对一，假如目录下有多个文件，会遍历目录，给每一个文件单独执行观察者模式。`fsevents.node`是使用C语言写的二进制系统操作指令。
* 如果是Linux或者Window系统环境，使用Node下fs模块的`watch`和`watchFile`。如果是目录，会递归目录，给每个文件添加观察者模式。
* chokidar会根据不同环境使用不同文件监听方案，对症下药，相比于`node-watch`，性能会更好，主要体现在CPU上。其次不需要创建临时文件，空间复杂度更优。
* chokidar在Linux或者window系统下解决调用两次的问题，解决方案是使用`_throttle`节流方法，50毫秒内的`change`只执行一次。



## 总结

热更新是我们开发期间最常用的功能，能够大大提高开发的效率，只要编译器保存一下就可以更新项目。比如我们咱们公司很多前端项目都是使用webpack打包工具，其中的热更新是使用HRM插件，比如vue3推荐使用的vite，文件更新正是使用的Chokidar，[vite使用Chokidar的地址](https://github.com/vitejs/vite/blob/fb406ce4c0fe6da3333c9d1c00477b2880d46352/packages/vite/src/node/build.ts#L486)。

通过对于源码的分析，可以更好的了解Node的`fs.watch`还存在的问题，以及如何去解决这些问题，当自己遇到了相似的问题该选择使用原生的`fs.watch`还是选择轻量化的node-watch，又或者是成熟稳定的Chokidar。

## 参考文献

[vite源码](https://github.com/vitejs/vite/tree/main/packages/vite)

[node-watch源码](https://github.com/yuanchuan/node-watch)

[fsevents源码](https://github.com/fsevents/fsevents)

[vscode插件仓库地址](https://github.com/weekitmo/flutter-assets-gen)