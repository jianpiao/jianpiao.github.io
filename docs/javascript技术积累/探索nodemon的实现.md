# 探索nodemon的实现

## 前言

nodemon是我常用的node源码监控工具。



## 背景

之前探索了node-watch，chokidar，看过它们源码后，大概了解了实现的思路。

现在遇到了另外一个问题，每次更改文件，均需重启一下，服务才能生效。这使我们的开发效率降低了很多。上面两个插件并没有解决这个问题。nodemon的出现，可以随时监听文件的变更，自动重启服务，我们开发时只需关注代码即可，不再需要手动重启服务。

那我们探索一下nodemon是如何做到自动重启服务器的。



## 项目结构

```javascript
|____index.js  // 开发文件入口
|____README.md 
|____yarn-lock.json
|____package.json
```



## 安装nodemon

```basic
yarn add nodemon -D
```



## 启动项目

首先需要在`packge.json`中配置好使用nodemon来启动项目，而不是node

```javascript
{
  "scripts": {
    "start": "nodemon index.js",  // 这里改为用nodemon启动
  }
}
```

配置好之后，在终端执行命令

```basic
yarn start
```



## 体验

可以变更一下`index.js`文件下的内容，随便写点东西，然后保存，会看到终端显示项目`restart`了。



## 探寻源码

根据`nodemon index.js`这个命令我们可以知道，肯定是执行了nodemon下面的bin指令，根据这个方向，找到`nodemon/pacage.json`下的`bin`对象

```javascript
"bin": {
  "nodemon": "./bin/nodemon.js"
},
```

按照上面的地址找到`./bin/nodemon.js`

```javascript
#!/usr/bin/env node

const nodemon = require('../lib/');

nodemon(options); // 启动项目

```

nodemon是由lib/index.js封装好的一个方法。



### 第一步

第一步会重置所有的配置信息，重置监听的文件队列，杀掉子进程。

```javascript
function nodemon(settings) {
  // 重置
  nodemon.reset();
  // ...........
}
```

reset函数如下：

```javascript
bus.on('reset', function (done) {
  debug('reset');
  nodemon.removeAllListeners(); // 清空所有监听
  monitor.run.kill(true, function () {
    utils.reset(); // 重置工具函数
    config.reset(); // 重置配置信息
    config.run = false; // 关闭运行状态，下次重启通过这个状态是否要启动
    if (done) {
      done();
    }
  });
});
```

utils工具函数有如下配置信息：

```javascript
const utils = {
  semver: semver,
  satisfies: test => semver.satisfies(process.versions.node, test),
  version: {/* 版本控制 */},
  clone: require('./clone'), // 克隆
  merge: require('./merge'),  // 合并
  bus: require('./bus'), // 订阅
  isWindows: process.platform === 'win32',
  isMac: process.platform === 'darwin',
  isLinux: process.platform === 'linux',
  isRequired: (function () {/* 判断是否可以正常执行 */})(),
  home: process.env.HOME || process.env.HOMEPATH,
  quiet: function () {/* 重置log函数 */},
  reset: function () {/* 重置log函数 */},
  regexpToText: function (t) {/* 匹配特殊字符 */ },
  stringify: function (exec, args) {/* 转成字符串 */},
};
```

config作为全局对象，配置信息如下，主要作用是在多个文件中交互，记录监听和过滤的文件、目录信息。

```javascript
const config = {
  run: false,
  system: {
    cwd: process.cwd(),
  },
  required: false,
  dirs: [],
  timeout: 1000,
  options: {},
}

function reset() {
  config.dirs = []; // 监听的目录
  config.options = { ignore: [], watch: [], monitor: [] };  // 监听选项，包括过滤文件，监听文件，已经处于观察者的文件
  config.lastStarted = 0;
  config.loaded = [];
}
```

接着会将nodemon命令转换成node命令，项目的运行是node实现的，一开始执行的`nodemon index.js`会转换成`node index.js`

```javascript
// allow the cli string as the argument to nodemon, and allow for
// `node nodemon -V app.js` or just `-V app.js` 
if (typeof settings === 'string') {
    settings = settings.trim();
    if (settings.indexOf('node') !== 0) {
      if (settings.indexOf('nodemon') !== 0) {
        settings = 'nodemon ' + settings;
      }
      settings = 'node ' + settings; // 执行的命令，如 node index.js
    }
    settings = cli.parse(settings);
  }
```



### 第二步

读取根目录下所有可以监听的文件，填充config配置项的信息，监听用户按键操作，比如ctrl+d、ctrl+l等等

#### 监听键盘事件

```javascript
config.load(settings, function (config) {
   if (config.options.stdin && config.options.restartable) {
     		// 如果点击ctrl+l，清除控制台打印的信息
        if (str === config.options.restartable) {
          bus.emit('restart');
        } else if (data.charCodeAt(0) === 12) { // ctrl+l
          console.clear();
        }
    } else if (config.options.stdin) {
      if (chr === 3) {
          if (ctrlC) {
            process.exit(0);
          }

          ctrlC = true;
          return;
        } else if (buffer === '.exit' || chr === 4) { // ctrl+d
          process.exit();
        } else if (chr === 13 || chr === 10) { // enter / carriage return
          buffer = '';
        } else if (chr === 12) { // ctrl+l
          console.clear();
          buffer = '';
        }
    }
}
```

#### 启动

```javascript
config.load(settings, function (config) {
   config.run = true;
  
   monitor.run(config.options); // 把配置信息传入monitor，启动监听
}
```

config填充之后全部的信息如下，可以了解一下：

```javascript
{
  run: false,
  system: { cwd: '/Users/zhoujianpiao/Desktop/node/rollup' },
  required: false,
  dirs: [],
  timeout: 1000,
  options: { ignore: [], watch: [], monitor: [] },
  load: [Function (anonymous)],
  reset: [Function: reset],
  lastStarted: 0,
  loaded: []
}
```

### 第三步

这一步是负责监听文件的工作。

只要运行run，就会立刻启动restart。

```javascript
  restart = run.bind(this, options);
  run.restart = restart;
```

接下来会把启动的信号通过发布订阅的形式进行通知

```javascript
bus.emit('start');
```

实际的文件监听工作是由watch.js来做的。所有的监听文件都会存到`watchers`队列中，如发现没有可以监听的文件，则不会执行watch。

```javascript
function watch() {
  // 判断是否有监听的文件
  if (watchers.length) {
    debug('early exit on watch, still watching (%s)', watchers.length);
    return;
  }
}
```

文件监听使用的chokidar工具，它是一个高性能、稳定的文件监听工具，会根据不同的运行环境使用不同的监听系统。nodemon**最核心**的监听源码就是这里了。

```javascript
 const promise = new Promise(function (resolve) {
    // 配置信息
    var watchOptions = {
      ignorePermissionErrors: true,
      ignored: ignored, // 忽略的文件
      persistent: true, // 进程就绪之后保持进程继续运行
      usePolling: config.options.legacyWatch || false,
      interval: config.options.pollingInterval,
    };

   	// 创建一个监听器
    var watcher = chokidar.watch(
      dirs,
      Object.assign({}, watchOptions, config.options.watchOptions || {})
    );

    watcher.ready = false;

    var total = 0;

    watcher.on('change', filterAndRestart); // 文件变更会通知回调函数
    watcher.on('add', function (file) {
      if (watcher.ready) {
        return filterAndRestart(file);
      }

      watchedFiles.push(file);
      bus.emit('watching', file);
    });
    watcher.on('ready', function () {
      watchedFiles = Array.from(new Set(watchedFiles)); // ensure no dupes
      total = watchedFiles.length;
      watcher.ready = true; // 准备完毕
      resolve(total);
      debugRoot('watch is complete');
    });

    watchers.push(watcher);
  });

```

`filterAndRestart`负责过滤文件，查询匹配文件，得到那些是真正能够监听的文件。

```javascript
function filterAndRestart(files) {
    // 匹配到可以监听的文件
    if (matched.result.length) {
      if (config.options.delay > 0) {
        utils.log.detail('delaying restart for ' + config.options.delay + 'ms');
        if (debouncedBus === undefined) {
          debouncedBus = debounce(restartBus, config.options.delay);
        }
        debouncedBus(matched); // 如果设置了延迟执行，则调用防抖函数
      } else {
        return restartBus(matched); // 否则，直接重启
      }
    }
  }
}
```

`restartBus`负责重启服务器

```javascript
// 重启服务器
function restartBus(matched) {
  utils.log.status('restarting due to changes...'); // 一般在控制台都可以看到这句打印提示
  matched.result.map(file => {
    utils.log.detail(path.relative(process.cwd(), file));
  });

  bus.emit('restart', matched.result); // 发布重启通知
}
```



### 第四步

更新文件，会执行`run.kill()`函数，向子进程发送一个`SIGINT`标记，把子进程杀掉，然后子进程使用`exit`事件处理程序重新启动。

```javascript
bus.on('restart', function () {
  // run.kill will send a SIGINT to the child process, which will cause it
  // to terminate, which in turn uses the 'exit' event handler to restart
  run.kill();
});
```



### 小结

上面四部的就是nodemon整个流程中的核心部分了。觉得最有意思的是使用了发布订阅模式。

## 总结

* nodemon运行，首先会先重置所有的配置信息，比如之前监听过的子进程队列要清空，订阅的事件也要清空，重置所有工具方法，把`nodemon index.js`终端命令转换成`node index.js`
* 做好基本工作后，扫描整个根目录下所有可以执行的文件，处理用户参数信息，比如`ignoring`要过滤哪些文件，全部填充到`config.options`中。
* 接来下开始启动服务器，创建子进程，使用chokidar工具，启动文件监听事件。
* 当文件有变更，`watcher`实例会执行`filterAndRestart`回调函数。假如重启服务是需要延迟重启，则会使用防抖函数，根据用户传参的时间进行重启，否则立即执行`bus.emit('restart', matched.result)`发布重启通知。
* 收到重启消息，会执行`run.kill()`函数，向子进程发送一个`SIGINT`标记，把子进程杀掉，然后子进程使用`exit`事件处理程序重新启动。