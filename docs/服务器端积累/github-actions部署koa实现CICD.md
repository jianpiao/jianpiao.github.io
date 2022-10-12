# github-actions部署koa实现CI/CD

## 背景

公司项目之前使用的jenkins实现的自动化部署流程（这里指dev）。

当项目开发完毕，提交dev分支检查无冲突，随后执行`git push`命令，会把代码提交到gitlab仓库。jenkins设置了轮训检查仓库是否有change变化，轮训的时间间隔是5分钟。当检查到刚刚提交的代码之后就会自动触发流水线CI/CD这个过程。构建好的镜像会被部署到了公司内部的服务器中，删除旧的镜像、停止并删除容器，重新实例新的容器。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1631866491198-433e2731-3fbf-424e-9681-a4de72b98c72.png)

本月（12月）公司项目的CI/CD更换为Gitlab-CI，原因是Gitlba-CI与Gitlab集成度高，可以直接在gitlab项目中查看流水线UI。

公司的CI/CD流程相对来说较为专业、成熟且复杂，需要考虑通用性、安全性、可维护性等等，假如我们个人开发者也想要搞CI/CD，功能相对简单，使用的是github仓库，可以考虑github actions，接下来我就以一个koa的demo来实现CI/CD。

## 目标

我们要实现的流程包括，`push`之后将构建成为镜像，推送到docker hub中，服务器拉取docker hub最新镜像并在宿主机运行容器，钉钉能够监控CI/CD流程是否成功，并推送到钉钉群中。

![image-20211222095638878](https://raw.githubusercontent.com/jianpiao/photos/master/image-20211222095638878.png)

## 新建koa项目

### 初始化kao

初始一个空项目

```bash
# 创建文件夹，名称为koa-demo
mkdir koa-demo

# 初始化一个package.json描述文件，描述这个NPM包的所有相关信息，包括作者、简介、包依赖、构建等信息
npm init -y
```

接下来安装koa，在终端输入命令

```bash
npm install koa
# 或者
yarn add koa
```

安装完毕后需要在根目录下创建一个index.js文件，来使用一下koa

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3010);
```

koa项目初始化完毕后，我们要跑起来看看，找到`package.json`，在`scripts`中新增命令行，命令为`start`，意思为启动项目，执行它会映射为执行`node index.js`，在node环境下执行`index.js`文件的代码，`index.js`就是我们上面创建的文件。

```json
  "scripts": {
    "start": "node index.js"
  },
```

验证项目是否成功，直接在终端输入

```bash
npm start
# 或者
yarn start
```

### 验证kao

然后在浏览器访问：[localhost:3010](http://localhost:3010)，浏览器看到`hello world`字样即为成功。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639551805519-bce66b04-68ea-4e9e-919e-6243b2992e37.png)

### 小结

经过以上步骤，一个简单的koa项目创建完毕，并能够在本地运行正常运行起来，接下来需要将其打包构建成为一个镜像，最终成为容器运行起来。

## 部署koa项目

部署koa项目第一步需要先编写一个构建镜像的脚本文件。

### dockerfile

我们的部署需要用到docker，首先需要在根目录下创建两个文件

- Dockerfile
- .dockerignore

Dockerfile 是一个文本文件，其内包含了一条条的 **指令(Instruction)**，每一条指令构建一层，因此每一条指令的内容，就是描述该层应当如何构建。Docker通过`docker build`执行Dockerfile中的一系列命令自动构建image镜像。

`.dockerignore`就类似于git中的`.gitignore`在构建过程忽略的内容。

Dockerfile文件需要写入以下内容

```bash
# 制定node镜像的版本
FROM node:17
# 移动当前目录下面的文件到app目录下
ADD . /app/
# 进入到app目录下面，类似cd
WORKDIR /app
# 安装依赖
RUN npm install
# 对外暴露的端口，这里的3010需要和inde.js监听的端口一致
EXPOSE 3010
# 程序启动脚本，意思为 执行 npm start
CMD ["npm", "start"]
```

- **FROM：**构建所需要的镜像，就是一个定制化的过程，那么就需要以一个镜像为基础，在其基础上进行修改定制。而FROM指令就是用来指定基础镜像，因此在Dockerfile中，FROM指令是必备指定，并且必需是第一条指令！
- **ADD：**当from的镜像拉取下面之后，可以将后续的文件内容都放到该镜像指定的目录位置，比如上面的将运行的koa项目放入到了node镜像下的`/app/`目录下。

- **RUN：**构建镜像时执行的命令。RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定`--no-cache`选项，如：`docker build --no-cache`。
- **CMD：**Docker不是虚拟机，容器就是进程。既然是进程，那么在启动容器的时候，就需要指定运行的程序及参数。所以，CMD指令的主要用途是为启动容器时指定运行的程序及参数，而RUN指令用于指定镜像构建时所要执行的命令。

`.dockerignore`文件写入一下内容，它的作用的过滤掉一些不必要的文件。

```bash
# Logs
logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules
jspm_packages

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history
.idea
.node_modules
node_modules
.vscode
```

## docker构建镜像

我本机安装了docker桌面端，所以可以在本地测试。[docker桌面端下载地址](https://www.docker.com/get-started)

在项目根目录下，使用docker下的build命令构建镜像，`-t`为镜像的名字及标签

```bash
docker build -t koa-demo .
```

终端会输出下面内容

```bash
[+] Building 4.3s (10/10) FINISHED                                                                                 
 => [internal] load build definition from Dockerfile                                                          0.0s
 => => transferring dockerfile: 301B                                                                          0.0s
 => [internal] load .dockerignore                                                                             0.0s
 => => transferring context: 661B                                                                             0.0s
 => [internal] load metadata for docker.io/library/node:17                                                    2.5s
 => [auth] library/node:pull token for registry-1.docker.io                                                   0.0s
 => [internal] load build context                                                                             0.0s
 => => transferring context: 1.12kB                                                                           0.0s
 => CACHED [1/4] FROM docker.io/library/node:17@sha256:13621aa823b6b92572d19c08a75f7b1a061633089f37873f8b5be  0.0s
 => [2/4] ADD . /app/                                                                                         0.0s
 => [3/4] WORKDIR /app                                                                                        0.0s
 => [4/4] RUN npm install                                                                                     1.6s
 => exporting to image                                                                                        0.1s
 => => exporting layers                                                                                       0.1s
 => => writing image sha256:c33e69d13b82487230b435ee7ae117b209d14a11631a57c57ec4dee9a92f5f5e                  0.0s
 => => naming to docker.io/library/koa-demo
```

- 上面执行build会触发dockerfile文件，从docker中指定一个node版本，这里指定为最新的17版本，然后从docker仓库中拉取对应版本的node，其实是执行了`docker pull node:17`
- 接下来将koa项目所有文件（不包括被忽略的文件）添加进`/app/`目录下

- 接下来进入app目录内容，将app设置为工作目录
- 接下来安装依赖

以上就是dockerfile执行的所以流程了，那么我们如何运行起来呢，这个就是CMD命令做的事情了，CMD是负责指定运行的程序和参数。

### 查看镜像

先不着急启动，我们先看看镜像是否构建成功了。

```bash
docker images
```

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639551316259-e667cea6-1856-43bf-b4e8-ae4b36847eb3.png)

可以看到镜像的构建成功了的。

### 运行镜像

将镜像运行起来，会触发CMD命令，会将koa项目跑起来，并且我们要在浏览器中看到运行的koa输出内容。

```bash
docker run -d -p 8888:3010 koa-demo
```

- -d 是后台运行，不要阻塞shell指令窗口
- -p 来制定内外端口映射

- 8888 将内部端口和外部端口3010做一个简单的映射，这里是  外部端口：内部端口

运行`docker-demo`镜像，并设置运行的内部端口为3010，因为koa设置的运行端口为3010所以要保持一致，8888是映射给容器外面的端口，即为用户访问的端口。

### 查看容器

```bash
docker ps
```

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639551592408-5b75c9c4-0ded-4cd1-abba-fd632aef6ac9.png)

### 浏览器访问项目

容器启动成功后，docker就启动了一个进程。

在浏览器访问：http://localhost:8888

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639551708393-59661171-4696-44ef-977b-5d009bff211e.png)

浏览器已经可以正常查看到运行的项目。

### 小结

编写了Dockerfile脚本文件，负责执行构建的流程，为了优化构建包`.dockerignore`大小忽略一下没必要的文件。

通过执行`docker build`命令触发Dockerfile脚本生成了一个koa-demo镜像，执行`docker run`运行了一个容器，最后我们可以在浏览器中访问运行中的koa项目。

## github actions

项目在本地docker环境能够正常运行，接下来开始用到github actions。

### 使用github actions

在github中，如果已经有项目的可以先把项目提交，若没有项目，直接新建一个项目，随后将本地修改后的代码提交上去。

随后点击并打开Actions页面

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639618755214-12a0e18a-f3f4-444a-80b5-5568c8ba2bb9.png)

会展示很多种构建类型，我们不用管它，只选择第一个，最简单的镜像构建就可以了。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639618805244-ef10f619-29dd-4ee6-8ceb-443ba7a4b34f.png)

选择第一个docker镜像后，会生成一些代码

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639618879511-0ffc0efd-f16d-469a-8935-f8e5c7111e5c.png)

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，我们公司内部使用的是私有仓库，这里我们使用Docker Hub共有仓库即可。

因为我们需要将docker镜像构建完毕后推送到Docker Hub中，所以需要新增一个镜像推送，需要用到Docker Hub的账户和密码，需要去注册一下，[点我去注册](https://hub.docker.com/)

`docker-image.yml`需要做一些简单的修改，内容如下：

```yaml
name: Docker Image CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Build the Docker image
        uses: elgohr/Publish-Docker-Github-Action@master
        with:
          name: smallzip7799/koa-github-action
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
```

为了更好的理解，来讲解一下每一行的含义

- **line1：**`actions`工作流的名称。
- **line3~7：**当我们用`main`分支，将代码推送（`push`或者`pull_request`）到仓库的时候，会触发我们的工作流程（`workflow`）。

- **line8~11：**我们定义了一个`workflow`工作流，由一个或者多个`jobs`构成，能一次持续集成的运行，完成多个任务。后面的每个工作流都在虚拟环境的新实例中运行，其中的`runs-on`字段指定运行所需要的虚拟环境。
- **line13**：`steps`指定每一个`job`的运行步骤，可以包含一个或者多个步骤。

- **line14：**使用github提供的`actions/checkout@v2`，它的作用就是让我们的`workflow`可以访问到`repo`源码的内容。
- **line15：**第二个步骤的名称，可以根据实际情况写个步骤简要描述，它会显示在构建流程中

- **line16：**使用用户名为`elgohr`定制的`Publish-Docker-Github-Action@master`钩子执行docker镜像的构建和推送流程，最终推送到docker hub中。
- **line17~20：**这里定义推送的docker hub所需要的参数

- - **name：**是推送到docker hub的镜像名称
  - **username：**registry的登录用户名，即为docker hub的用户名

- - **password：**registry的登录密码，即为docker hub的密码

其中的`username`和`pasword`是属于私密内容，不应该直接显示在代码中，因此我们需要在github 的secrets设置一下，将`username`和`password`设置为局部变量。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639618242119-1b0ada4d-47af-42cb-ad57-0d4b03a81f23.png)

写完代码后，直接提交，第一次会执行一次构建流程。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639619112456-2972a8e9-2856-4ee4-baea-54d8b26cfeea.png)

显示打钩则代表构建成功了。

详细的pipeline流程，可以点击进去查看详情。

![img](https://cdn.nlark.com/yuque/0/2021/png/457751/1639713598394-43e278fe-b9a3-4998-bab2-3b7b10c31fa9.png)

### 检查镜像

推送代码后，我们可以通过在docker hub里面检查已经构建成功的镜像。

![image-20211221161203163](https://raw.githubusercontent.com/jianpiao/photos/master/image-20211221161203163.png)

又或者在本机docker桌面端中查看

![image-20211221161250170](https://raw.githubusercontent.com/jianpiao/photos/master/image-20211221161250170.png)

## 部署到服务器

当前构建过程中，只包含了镜像的构建，并推送到docker hub公共仓库，还没有做到在服务器中的部署流程。这些操作需要使用到：

* 一个个人服务器
* 服务器中启动`openssh-server`

如果有个人服务器可以直接看下一步，如果没有服务器，可以去腾讯云、阿里云、华为云这些平台购买一个便宜的服务器用来学习，这里推荐不到25岁的小伙伴们，去腾讯云购买学生服务器，一年只需要108rmb，[购买地址](https://cloud.tencent.com/act/campus?utm_source=qcloud&utm_medium=navigation&utm_campaign=campus#step1)

购买好服务器，第一步是安装好`openssh-server`，第二步是安装好docker环境，由于我购买的是CentOS7.6，不同服务器安装方式不太一样，具体安装教程参见[官网](https://docs.docker.com/engine/install/centos/)

### 新增部署流程

github actions默认生成的workflow工作流只包含了镜像推送，要实现服务器的部署和钉钉推送需要再新增两个工作流

```yaml
name: Docker Image CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Build the Docker image
        uses: elgohr/Publish-Docker-Github-Action@master
        with:
          name: smallzip7799/koa-github-action
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      # 部署服务器
      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: 22
          script: |
            docker pull smallzip7799/koa-github-action
            docker inspect -f '{{.Name}}' koa-docker
            if [ $? == 0 ] ;then
              echo "docker exist"
              docker container stop koa-docker
              docker container rm koa-docker
              docker images remove smallzip7799/koa-github-action
            else
              echo "docker don't exist"
            fi
            docker run -d -p 8888:3010 --name koa-docker smallzip7799/koa-github-action

      # 发送钉钉消息
      - name: dingtalk robot message
        uses: fifsky/dingtalk-action@master
        with:
          url: ${{ secrets.DINGTALK_WEBHOOK}}
          type: markdown
          content: |
            ## 监控提示：💯👨‍💻 Success 🎉🎉🎉
              构建成功了

```

为了都能理解，这里解释新增的两个工作流：

* **line32**：`executing remote ssh commands using password`是当前工作流的名称或者描述，可以自己修改。
* **line24**：这里使用了第三方用户封装好的`actions`钩子，它的作用是通过ssh登录远程服务器。（持续集成由很多操作组成，比如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions，如果需要某个 action，不必自己写复杂的脚本，直接引用他人写好的 action 即可，[actions仓库](https://github.com/marketplace?type=actions)）。
* **line25**：`with`表示`actions`拥有参数。
* **line26~line29**：`host`是服务器公网的ip地址，`username`和`password`分别是docker注册是账户名和密码，`post`是ssh访问端口，默认为22。其中`host`、`username`、`password`建议使用局部变量，不要直接现实在代码中。
* **line30~line41**：执行shell命令
  * `docker pull smallzip7799/koa-github-actions`：拉取docker hub上面的镜像
  * `docker inspect -f '{{.Name}}' koa-docker`：检查是否存在名字为`koa-docker`的容器
  * `if [ $? == 0 ] ;then`：`$?`是代表上一条命令的返回值，判断是否存在
  * `docker container stop koa-docker`：将`koa-docker`容器暂停
  * `docker container rm koa-docker`：删除`koa-docker`容器
  * `docker run -d -p 8888:3010 --name koa-docker smallzip7799/koa-github-action`：运行镜像，设置对外端口8888，映射到内部端口3010，设置容器的名称为koa-docker
* **line43**：`dingtalk robot message`工作流名称
* **line44**：`fifsky/dingtalk-action@master`，使用钉钉消息通知`actions`
* **line46~line50**：`url`为钉钉配置的`webhook`，`type`为`markdown`，内容中包括了钉钉通知配置的关键词和内容。[参见钉钉机器人](https://open.dingtalk.com/document/robots/custom-robot-access)

### 重新构建

修改完毕后，提交代码，等待github actions工作流完成，如果顺利将会在钉钉收到通知

![image-20211221173640135](https://raw.githubusercontent.com/jianpiao/photos/master/image-20211221173640135.png)

打开浏览器输入服务器IP地址+端口号，会看到

![image-20211221173812942](https://raw.githubusercontent.com/jianpiao/photos/master/image-20211221173812942.png)

以上即为github actions实现的koa项目CI/CD。

### 小结

使用ssh远程到服务器，并在服务器中执行docker拉取和运行的命令，将项目运行起来。

利用钉钉群中的机器人生成webhook钩子，实现消息群通知。

## 总结

github actions部署koa项目最核心的地方是编写workflow工作流，工作流中可以做非常多的操作，如抓取代码、运行测试、登录远程服务器，发布到第三方服务等等，当一些操作相对复杂或者具有相似性，可以直接引用他人写好的 action，亦或自己写run命令。

当前项目是基于node运行环境，若项目为静态文件，比如vue项目、react项目则需要使用其他的运行环境，如nginx等，原因是vue、react会打包成dist或者build可运行文件，将其运行不需要使用到进程服务，可以直接在浏览器访问，因此只需要将其放置到代理服务器中，将访问文件地址暴露给外网访问即可。

在Dockerfile文件下修改

```dockerfile
FROM nginx

# 核心就是一句，当执行
# docker build -t test:v1 . 
# 意思是打包docker镜像，名称为test:v1，打包的内容为当下目录的所有文件
# 也就是./build下所有文件拷贝到/usr/share/nginx/html文件夹下
# 这个文件夹是nginx默认访问的位置
COPY ./build /usr/share/nginx/html

# 非首页路由会报404，react的react-router或者vue的history刷新页面都会报404
# 匹配url路径如果不存在则重定向到index.html
# 用本地创建的nginx.conf替换掉nginx镜像的default.conf
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
# 暴露映射到内部的80端口
EXPOSE 80
```

其他的流程基本差不多。

## 参考文献

- [阮一峰github actions入门](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

- [github actions官网文档](https://docs.github.com/en/actions)
- [GitHub Marketplace page](https://github.com/marketplace?type=actions&query=ssh+)