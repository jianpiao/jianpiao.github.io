# node源码分析

来瞅瞅node的源码是怎么实现的

## Console

`console`是我们日常开发最常用的命令了，现在来看看它是怎么实现的

### 第一步

首先创建了一个`Console`构造函数

```javascript
const kBindProperties = Symbol('kBindProperties');
const kBindStreamsEager = Symbol('kBindStreamsEager');

function Console(options /* or: stdout, stderr, ignoreErrors = true */) {
  // 我们必须要使用new.target检查这个函数是不是new出来的
  // 因为我们需要定义一个自定义的实例来适应全局控制台。
  if (!new.target) {
    return ReflectConstruct(Console, arguments);
  }

  if (!options || typeof options.write === 'function') {
    options = {
      stdout: options,
      stderr: arguments[1],
      ignoreErrors: arguments[2],
    };
  }

  const {
    stdout,
    stderr = stdout,
    ignoreErrors = true,
    colorMode = 'auto',
    inspectOptions,
    groupIndentation,
  } = options;

  // 将原型函数绑定到这个Console实例
  ArrayPrototypeForEach(ObjectKeys(Console.prototype), (key) => {
    // 我们必须绑定从实例而不是原型中获取的方法，以便扩展Console的用户可以从子类的原型链中覆盖它们。
    this[key] = FunctionPrototypeBind(this[key], this);
    ObjectDefineProperty(this[key], 'name', {
      value: key,
    });
  }); 

  this[kBindStreamsEager](stdout, stderr); // 使用Symbol变量，确保唯一性
  this[kBindProperties](ignoreErrors, colorMode, groupIndentation); // 与上同理
}
```

### 第二步

上面`Console`构造函数的属性还很简陋，需要增强原型属性。

```javascript
ObjectDefineProperties(Console.prototype, {
  [kBindStreamsEager]: {
    ...consolePropAttributes,
    // Console构造函数的新的版本
    value: function (stdout, stderr) {
      ObjectDefineProperties(this, {
        _stdout: { ...consolePropAttributes, value: stdout },
        _stderr: { ...consolePropAttributes, value: stderr },
      });
    },
  },
  [kBindStreamsLazy]: {/* 从对象中惰性加载stdout和stderr，这样即使没有访问stdio流，我们也不会创建它们 */}
  [kBindProperties]: {
    ...consolePropAttributes,
    value: function (ignoreErrors, colorMode, groupIndentation = 2) {/* 绑定属性 */},
  },
  [kWriteToConsole]: {
    ...consolePropAttributes,
    value: function (streamSymbol, string) {
      const ignoreErrors = this._ignoreErrors;
      const groupIndent = this[kGroupIndent];

      const useStdout = streamSymbol === kUseStdout;
      const stream = useStdout ? this._stdout : this._stderr;
      // 检查流数据是否有误
      const errorHandler = useStdout
        ? this._stdoutErrorHandler
        : this._stderrErrorHandler;
			// 有问题就将字符串写入
      if (ignoreErrors === false) return stream.write(string);

      // 可能同步发生错误(例如POSIX系统上的文件或tty)
      // 或异步发生错误(例如POSIX系统上的管道)，所以要处理这两种情况。
      try {
        // 添加并稍后删除noop错误处理程序以捕获同步错误。
        if (stream.listenerCount('error') === 0) stream.once('error', noop);
				// 输出到控制台
        stream.write(string, errorHandler);
      } catch (e) {
        // 控制台是一个调试工具， 堆栈空间小的情况下，它也不适合接收错误。
        if (isStackOverflowError(e)) throw e;
      } finally {
        stream.removeListener('error', noop);
      }
    },
  },
  [kGetInspectOptions]: {/* 负责检查控制台显示的颜色 */},
  [kFormatForStdout]: {/* 重构以避免不安全的数组迭代 */},
  [kFormatForStderr]: {/* 与上同理 */},
});
```

### 第三步

开始定义`Console`原型内的方法。

#### log

```javascript
  log(...args) {
    // 日志打印，this[kWriteToConsole]会调用value方法，这两个参数分别是 键 和 值
    this[kWriteToConsole](kUseStdout, this[kFormatForStdout](args));
  },
```

#### warn

```javascript
  warn(...args) {
    // 同上
    this[kWriteToConsole](kUseStderr, this[kFormatForStderr](args));
  },
```

#### dir

```javascript
	// 指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示
  dir(object, options) {
    this[kWriteToConsole](
      kUseStdout, // 键
      inspect(object, {  // 检查对象，并返回检查出来的对象信息
        customInspect: false, // 关闭自定义检查
        ...this[kGetInspectOptions](this._stdout),
        ...options,
      })
    );
  },
```

#### time

```javascript
	// 启动一个计时器来跟踪某一个操作的占用时长
  time(label = 'default') {
    // 将符号以外的所有内容强制转换为字符串
    label = `${label}`;
    if (this._times.has(label)) { // 不能重复声明
      process.emitWarning(`Label '${label}' already exists for console.time()`);
      return;
    }
    trace(kTraceBegin, kTraceConsoleCategory, `time::${label}`, 0);
    this._times.set(label, process.hrtime()); // 添加到链表中，_times是由new SafeMap() 生成
  },
```

#### timeEnd

```javascript
	// 和上面关联，当执行这里就会输出结束时间，并且情况队列
  timeEnd(label = 'default') {
    // 将符号以外的所有内容强制转换为字符串
    label = `${label}`;
    const found = timeLogImpl(this, 'timeEnd', label);
    trace(kTraceEnd, kTraceConsoleCategory, `time::${label}`, 0);
    if (found) {
      this._times.delete(label); // 清除链表
    }
  },
```

#### timeLog

```javascript
	// 在控制台输出计时器的值，该计时器必须已经通过 console.time() 启动。
  timeLog(label = 'default', ...data) {
    label = `${label}`;
    timeLogImpl(this, 'timeLog', label, data);
    trace(kTraceInstant, kTraceConsoleCategory, `time::${label}`, 0);
  },
```

#### trace

```javascript
  // 堆栈跟踪
  trace: function trace(...args) {
    const err = {
      name: 'Trace',
      message: this[kFormatForStderr](args),
    };
    ErrorCaptureStackTrace(err, trace);
    this.error(err.stack);
  },
```

#### assert

```javascript
  // 如果断言为false，则将一个错误消息写入控制台。如果断言是 true，没有任何反应。
  assert(expression, ...args) {
    if (!expression) {
      args[0] = `Assertion failed${args.length === 0 ? '' : `: ${args[0]}`}`;
      // 参数将在warn()中再次格式化
      ReflectApply(this.warn, this, args);
    }
  },
```

#### clear

```javascript
  // 清除控制台
  clear() {
    // 控制台有输出的情况下才会工作
    if (this._stdout.isTTY && process.env.TERM !== 'dumb') {
      // 这里的require是为了避免在第一次加载控制台时太早需要readline。
      const {
        cursorTo,
        clearScreenDown,
      } = require('internal/readline/callbacks'); // 读取控制台的文本行
      cursorTo(this._stdout, 0, 0); // 光标返回到顶部
      clearScreenDown(this._stdout); // 清空控制台打印的内容
    }
  },
```

#### count

```javascript
  // 输出被调用的次数
  count(label = 'default') {
    // 确保标签是一个字符串，并且只包含可以强制转换为字符串的内容，不可以是符号
    label = `${label}`;
    const counts = this[kCounts];
    let count = counts.get(label);
    if (count === undefined) count = 1;
    else count++; // 每调用一次就累加一
    counts.set(label, count); // 更新
    trace(kTraceCount, kTraceConsoleCategory, `count::${label}`, 0, count);
    this.log(`${label}: ${count}`);
  },
```

#### countReset

```javascript
  // 重置计数器
  countReset(label = 'default') {
    const counts = this[kCounts];
    if (!counts.has(label)) {
      process.emitWarning(`Count for '${label}' does not exist`);
      return;
    }
    trace(kTraceCount, kTraceConsoleCategory, `count::${label}`, 0, 0);
    counts.delete(`${label}`); // 清空
  },
```

#### group

```javascript
  // 在 Web控制台上创建一个新的分组.
  // 随后输出到控制台上的内容都会被添加一个缩进,
  // 表示该内容属于当前分组,直到调用console.groupEnd()之后,当前分组结束.
  group(...data) {
    if (data.length > 0) {
      ReflectApply(this.log, this, data);
    }
    // 分组
    this[kGroupIndent] += StringPrototypeRepeat(
      ' ',
      this[kGroupIndentationWidth]
    );
  },
```

#### groupEnd

```javascript
  // 退出分组
  groupEnd() {
    this[kGroupIndent] = StringPrototypeSlice(
      this[kGroupIndent],
      0,
      this[kGroupIndent].length - this[kGroupIndentationWidth]
    );
  },
```

#### table

```javascript
  // 将数据以表格的形式显示
  // 本质上是将传来的值转换成为二维数组
  // 会针对纯字符串数组和对象数组做区分处理
  table(tabularData, properties) {
    if (properties !== undefined && !ArrayIsArray(properties))
      throw new ERR_INVALID_ARG_TYPE('properties', 'Array', properties);

    if (tabularData === null || typeof tabularData !== 'object')
      return this.log(tabularData);

    if (cliTable === undefined) cliTable = require('internal/cli_table');
    const final = (k, v) => this.log(cliTable(k, v));

    const _inspect = (v) => {
      const depth =
        v !== null &&
        typeof v === 'object' &&
        !isArray(v) &&
        ObjectKeys(v).length > 2
          ? -1
          : 0;
      const opt = {
        depth,
        maxArrayLength: 3,
        breakLength: Infinity,
        ...this[kGetInspectOptions](this._stdout),
      };
      return inspect(v, opt);
    };
    const getIndexArray = (length) =>
      ArrayFrom({ length }, (_, i) => _inspect(i));

    const mapIter = isMapIterator(tabularData);
    let isKeyValue = false;
    let i = 0;
    if (mapIter) {
      const res = previewEntries(tabularData, true);
      tabularData = res[0];
      isKeyValue = res[1];
    }

    if (isKeyValue || isMap(tabularData)) {
      const keys = [];
      const values = [];
      let length = 0;
      if (mapIter) {
        for (; i < tabularData.length / 2; ++i) {
          ArrayPrototypePush(keys, _inspect(tabularData[i * 2]));
          ArrayPrototypePush(values, _inspect(tabularData[i * 2 + 1]));
          length++;
        }
      } else {
        for (const { 0: k, 1: v } of tabularData) {
          ArrayPrototypePush(keys, _inspect(k));
          ArrayPrototypePush(values, _inspect(v));
          length++;
        }
      }
      return final(
        [iterKey, keyKey, valuesKey],
        [getIndexArray(length), keys, values]
      );
    }

    const setIter = isSetIterator(tabularData);
    if (setIter) tabularData = previewEntries(tabularData);

    const setlike = setIter || mapIter || isSet(tabularData);
    if (setlike) {
      const values = [];
      let length = 0;
      for (const v of tabularData) {
        ArrayPrototypePush(values, _inspect(v));
        length++;
      }
      return final([iterKey, valuesKey], [getIndexArray(length), values]);
    }

    const map = {};
    let hasPrimitives = false;
    const valuesKeyArray = [];
    const indexKeyArray = ObjectKeys(tabularData);

    for (; i < indexKeyArray.length; i++) {
      const item = tabularData[indexKeyArray[i]];
      const primitive =
        item === null ||
        (typeof item !== 'function' && typeof item !== 'object');
      if (properties === undefined && primitive) {
        hasPrimitives = true;
        valuesKeyArray[i] = _inspect(item);
      } else {
        const keys = properties || ObjectKeys(item);
        for (const key of keys) {
          if (map[key] === undefined) map[key] = [];
          if (
            (primitive && properties) ||
            !ObjectPrototypeHasOwnProperty(item, key)
          )
            map[key][i] = '';
          else map[key][i] = _inspect(item[key]);
        }
      }
    }

    const keys = ObjectKeys(map);
    const values = ObjectValues(map);
    if (hasPrimitives) {
      ArrayPrototypePush(keys, valuesKey);
      ArrayPrototypePush(values, valuesKeyArray);
    }
    ArrayPrototypeUnshift(keys, indexKey);
    ArrayPrototypeUnshift(values, indexKeyArray);

    return final(keys, values);
  },
```

以上的方法全部存储在`consoleMethods`对象中

```javascript
const consoleMethods = {
  log:{/* 省略 */},
  warn:{/* 省略 */},
  dir:{/* 省略 */},
  time:{/* 省略 */},
 	// 省略
};
```

### 第四步

除了上面的方法，还新增了五个，都是继承于前面的方法。

```javascript
// 输出“调试”级别的消息且仅仅控制台配置为显示调试输出时才显示该消息。
Console.prototype.debug = Console.prototype.log;

// 向控制台输出一个通知信息。
Console.prototype.info = Console.prototype.log;

// 示一个明确的XML/HTML元素的包括所有后代元素的交互树。 如果无法作为一个element被显示，那么会以JavaScript对象的形式作为替代。 它的输出是一个继承的扩展的节点列表，可以让你看到子节点的内容。
Console.prototype.dirxml = Console.prototype.log;

// 向控制台输出一条错误消息。
Console.prototype.error = Console.prototype.warn;

// 在控制台上创建一个新的分组.随后输出到控制台上的内容都会被添加一个缩进,表示该内容属于当前分组,直到调用console.groupEnd() 之后,当前分组结束.和 console.group()方法的不同点是,新建的分组默认是折叠的.用户必须点击一个按钮才能将折叠的内容打开.
Console.prototype.groupCollapsed = Console.prototype.group;
```

以上便是`Console`的原型啦。

### 第五步

创建一个纯净的对象，不需要任何原型。

```javascript
const globalConsole = ObjectCreate({});
```

把构造的原型全部赋值到`globalConsole`，由于`Console`不在全局控制台的原型链上，所以`Console`上的符号属性。原型必须从全局根原型本身查找。此外，我们需要将控制台方法直接绑定到固定的接收器的全局控制台，从而使全局控制台成为一个名称空间。

```javascript
for (const prop of ReflectOwnKeys(Console.prototype)) {
  if (prop === 'constructor') { continue; }
  const desc = ReflectGetOwnPropertyDescriptor(Console.prototype, prop);
  if (typeof desc.value === 'function') { // fix the receiver
    const name = desc.value.name;
    desc.value = FunctionPrototypeBind(desc.value, globalConsole);
    ReflectDefineProperty(desc.value, 'name', { value: name });
  }
  ReflectDefineProperty(globalConsole, prop, desc);
}
```

给构造函数传参，就是option参数。

```javascript
globalConsole[kBindStreamsLazy](process);
globalConsole[kBindProperties](true, 'auto');
```

还有一种情况，是我们平时不会去`new`一个实例，而是直接使用，所以针对这个特性——Console构造函数暴露在全局控制台实例上。

```javascript
globalConsole.Console = Console;
```



## 原生交互

如果你第一感觉是js代码调用C++代码无法理解，那么一定是受到“语法”的干扰。

确实，从静态的角度来看，js和C++是两种语言，语法不互通，直接在js代码调用C++函数那是不可能的。

那么，从动态的角度（运行时）来看呢？别忘了，任何编程语言最终运行起来都不过是进程空间里的二进制代码和数据。