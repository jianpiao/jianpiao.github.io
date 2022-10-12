# vite源码分析

在终端输入`yarn serve`之后，项目就被快速的启动了，vite在这个过程中作了什么，起到了什么作用，为什么比webpack要快呢



## 启动服务

输入`yarn dev`之后会执行`vite`，在node_modules中找到vite项目的package.json文件，在bin命令中会执行

```bash
"vite": "bin/vite.js"
```



通过这个路径找到`bin/vite.js`文件，在这个文件找到了启动的函数

```javascript
function start() {
  require('../dist/node/cli')
}

start()
```

根据上面路径找到`cli/index.js`文件。

脚手架启动有四种类型，分别是：

* dev：默认，开发
* serve：预览
* build：打包
* optimize：优化



##  创建服务：createServer

配置的信息如下：

![所有配置信息](/Users/zhoujianpiao/Downloads/所有配置信息.png)



## vite.config.js配置信息

### resolveConfig

`resolveConfig`负责整合所有的配置信息。核心代码如下

```javascript
async function resolveConfig(inlineConfig, command, defaultMode = 'development') {
		// 省略
    let { configFile } = config;
    // 处理配置文件 vite.config.js
    if (configFile !== false) {
        const loadResult = await loadConfigFromFile(configEnv, configFile, config.root, config.logLevel);
        console.log("loadResult",loadResult)
        if (loadResult) {
            // 合并vite.config.js的配置项
            config = mergeConfig(loadResult.config, config);
            configFile = loadResult.path;
            configFileDependencies = loadResult.dependencies;
        }
    }
}
```

最终输入：

```javascript
const resolved = {
        ...config,
        configFile: configFile ? normalizePath$4(configFile) : undefined,
        configFileDependencies,
        inlineConfig,
        root: resolvedRoot,
        base: BASE_URL,
        resolve: resolveOptions,
        publicDir: resolvedPublicDir,
        cacheDir,
        command,
        mode,
        isProduction,
        plugins: userPlugins,
        server: resolveServerOptions(resolvedRoot, config.server),
        build: resolvedBuildOptions,
        env: {
            ...userEnv,
            BASE_URL,
            MODE: mode,
            DEV: !isProduction,
            PROD: isProduction
        },
        assetsInclude(file) {
            return DEFAULT_ASSETS_RE.test(file) || assetsFilter(file);
        },
        logger,
        createResolver,
        optimizeDeps: {
            ...config.optimizeDeps,
            esbuildOptions: {
                keepNames: (_b = config.optimizeDeps) === null || _b === void 0 ? void 0 : _b.keepNames,
                ...(_c = config.optimizeDeps) === null || _c === void 0 ? void 0 : _c.esbuildOptions
            }
        }
    };

return resolved
```





### loadConfigFromFile

`loadConfigFromFile`做的事情并不复杂，就是将里面的每个配置项进行执行操作。

```javascript
async function loadConfigFromFile(configEnv, configFile, configRoot = process.cwd(), logLevel) {
    const start = Date.now();
    let resolvedPath;
    let isTS = false;
    let isMjs = false;
    let dependencies = [];
    // check package.json for type: "module" and set `isMjs` to true
    try {
        const pkg = lookupFile(configRoot, ['package.json']);
        if (pkg && JSON.parse(pkg).type === 'module') {
            isMjs = true;
        }
    }
    catch (e) { }
    if (configFile) {
        // explicit config path is always resolved from cwd
        resolvedPath = path__default.resolve(configFile);
        isTS = configFile.endsWith('.ts');
    }
    else {
        // 查看根目录是否有隐藏的配置
        // 省略没有用的代码
    }
  	// 没有vite.config.js则直接返回null
    if (!resolvedPath) {
        debug('no config file found.');
        return null;
    }
    try {
        let userConfig;
        if (isMjs) {
            const fileUrl = require('url').pathToFileURL(resolvedPath);
            if (isTS) {
              	// 如果是ts需要先转义成为js，写入到磁盘中，再交给原生Node ESM，最后把ts文件删除
                const bundled = await bundleConfigFile(resolvedPath, true);
                dependencies = bundled.dependencies;
                fs__default.writeFileSync(resolvedPath + '.js', bundled.code);
                userConfig = (await eval(`import(fileUrl + '.js?t=${Date.now()}')`))
                    .default;
                fs__default.unlinkSync(resolvedPath + '.js');
            }
            else {
              	// 使用eval防止直接被TS/Rollup编译
                userConfig = (await eval(`import(fileUrl + '?t=${Date.now()}')`))
                    .default;
            }
        }
        if (!userConfig && !isTS && !isMjs) {
            // 1. try to directly require the module (assuming commonjs)
            try {
                // clear cache in case of server restart
                delete require.cache[require.resolve(resolvedPath)];
                userConfig = require(resolvedPath);
            }
            catch (e) {
                // 省略
            }
        }
        if (!userConfig) {
					 // 2. 文件使用的ts或者是es导入，es按照rollup语法导入
            const bundled = await bundleConfigFile(resolvedPath);
            dependencies = bundled.dependencies;
            userConfig = await loadConfigFromBundledFile(resolvedPath, bundled.code);
        }
        const config = await (typeof userConfig === 'function'
            ? userConfig(configEnv)
            : userConfig);
        return {
            path: normalizePath$4(resolvedPath),
            config,
            dependencies
        };
    }
    catch (e) {
        createLogger(logLevel).error(source.red(`failed to load config from ${resolvedPath}`));
        throw e;
    }
}
```



### bundleConfigFile

`bundleConfigFile`做的工作是使用esbuild构建依赖文件，最终输出的是一个对象

```json
{
  code: text, // 构建的包字符串
  dependencies: {
    inputs: { 'vite.config.js': [Object] }, // 这里就是vite.config.js配置的对象信息
    outputs: { 'out.js': [Object] }
  }
}
```

源码如下：

```javascript
async function bundleConfigFile(fileName, mjs = false) {
    const result = await esbuild.build({
        absWorkingDir: process.cwd(),
        entryPoints: [fileName],
        outfile: 'out.js',
        write: false,
        platform: 'node',
        bundle: true,
        format: mjs ? 'esm' : 'cjs',
        sourcemap: 'inline',
        metafile: true,
        plugins: [
            {
                name: 'externalize-deps',
                setup(build) {
                    build.onResolve({ filter: /.*/ }, (args) => {
                        const id = args.path;
                        if (id[0] !== '.' && !path__default.isAbsolute(id)) {
                            return {
                                external: true
                            };
                        }
                    });
                }
            },
            {
                name: 'replace-import-meta',
                setup(build) {
                    build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
                        const contents = await fs__default.promises.readFile(args.path, 'utf8');
                        return {
                            loader: args.path.endsWith('.ts') ? 'ts' : 'js',
                            contents: contents
                                .replace(/\bimport\.meta\.url\b/g, JSON.stringify(`file://${args.path}`))
                                .replace(/\b__dirname\b/g, JSON.stringify(path__default.dirname(args.path)))
                                .replace(/\b__filename\b/g, JSON.stringify(args.path))
                        };
                    });
                }
            }
        ]
    });
    const { text } = result.outputFiles[0];
    return {
        code: text,
        dependencies: result.metafile ? Object.keys(result.metafile.inputs) : []
    };
}
```



### loadConfigFromBundledFile

`loadConfigFromBundledFile`则是加载配置的插件，输出的内容如下：

```javascript
{
  plugins: [
    {
      name: 'react-refresh',
      enforce: 'pre',
      configResolved: [Function: configResolved],
      resolveId: [Function: resolveId],
      load: [Function: load],
      transform: [Function: transform],
      transformIndexHtml: [Function: transformIndexHtml]
    }
  ]
}
loadResult {
  path: '/Users/zhoujianpiao/Desktop/vue/vite-project/vite.config.js',
  config: { plugins: [ [Object] ] },
  dependencies: [ 'vite.config.js' ]
}
```



源码如下：

```javascript
async function loadConfigFromBundledFile(fileName, bundledCode) {
    const extension = path__default.extname(fileName);
    const defaultLoader = require.extensions[extension];
    require.extensions[extension] = (module, filename) => {
        if (filename === fileName) {
            module._compile(bundledCode, filename);
        }
        else {
            defaultLoader(module, filename);
        }
    };
    // clear cache in case of server restart
    delete require.cache[require.resolve(fileName)];
    const raw = require(fileName);
    const config = raw.__esModule ? raw.default : raw;
    require.extensions[extension] = defaultLoader;
    return config;
}
```





vite.config.js配置的信息会被合并。合并的源码如下：

![mergeConfig](/Users/zhoujianpiao/Downloads/mergeConfig.png)

## 文件更新

当文件更新之后会触发`change`函数，调用`handleHMRUpdate`函数实现文件更新

```javascript
  watcher.on('change', async (file) => {
    file = normalizePath$4(file);
    // 在文件更改时使moduleGraph缓存失效
    moduleGraph.onFileChange(file);
    if (serverConfig.hmr !== false) { // 防止重复刷新
      try {
        await handleHMRUpdate(file, server);
      }
    }
  });
```

`handleHMRUpdate`函数负责更新开发文件以及插件工具，会逐一遍历检查是否需要更新。

```javascript
async function handleHMRUpdate(file, server) { // 触发HMR更新
  const { ws, config, moduleGraph } = server;
  const shortFile = getShortName(file, config.root); // 获取更新的文件路径名称

  // 检查是否有插件需要去执行自定义HMR操作
  for (const plugin of config.plugins) {
    if (plugin.handleHotUpdate) {
      const filteredModules = await plugin.handleHotUpdate(hmrContext);
      if (filteredModules) {
        hmrContext.modules = filteredModules;
      }
    }
  }

  // 更新模块
  updateModules(shortFile, hmrContext.modules, timestamp, server);
}
```

`updateModules`开始执行模块更新操作。这里会针对全量更新(fullReload)和非全量更新做区分。两种场景下做不同的工作处理。

需要更新的所有模块全部添加进`updates`数组中。

```javascript
function updateModules(file, modules, timestamp, { config, ws }) {
  const updates = []; // 存储需要更新的模块
  let needFullReload = false;
  for (const mod of modules) {
    // 检查是否需要全量更新
    const hasDeadEnd = propagateUpdate(mod, timestamp, boundaries);
    if (hasDeadEnd) {
      needFullReload = true;
      continue;
    }
    updates.push(/*添加需要更新的模块*/);
  }
  
  if (needFullReload) { // 需要全量更新
    ws.send({
      type: 'full-reload'
    });
  }
  else { // 按需更新
    ws.send({
      type: 'update',
      updates
    });
  }
}
```

上面的更新由`ws.send`发送。

`ws`是由`createServer`函数中创建的长链接服务

```javascript
  // 创建websocket长链接服务
  const ws = createWebSocketServer(httpServer, config, httpsOptions);
```



