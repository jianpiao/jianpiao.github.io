# Docker笔记

docker有三个基本概念：镜像、容器和仓库。镜像是运行容器的前提，一个镜像可以生成多个容器，镜像包含了容器启动所需要的信息，包括运行程序和配置数据。镜像生成的容器就是我们用来运行程序的承载体；仓库是集中存放镜像的地方，可以像使用GitHub那样利用云端拉取和推送。

### 下载docker

> yum install docker  // CentOS
>
> apt-get install docker  // ubuntu
>
> brew install docker // macOS

也可以在浏览器中搜索docker官网下载可视化的docker客户端

[点击打开docker客户端](https://www.docker.com)

### 搜索镜像

可以通过`search`来搜索对应的镜像

> docker search [镜像名称]

比如搜索`node`镜像

> docker search node

比如搜索`utuntu`镜像

> docker search ubuntu

### 下载镜像

搜索到对应点镜像后可以拉取镜像

> docker pull node

按照上面操作是默认的拉取最新版本的镜像，如果要指定对应的版本可以添加tag

