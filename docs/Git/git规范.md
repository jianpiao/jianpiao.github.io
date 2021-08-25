# git-操作步骤

### 注意事项

代码提交阶段如果code master没有时间，或许不会进行code review则通常不需要在GitLab中发起Merge Requests进行merge，直接自己本地执行git merge即可。

### 分支命名规范

开发期间自己拉取一个开发分支，分支的命名规格为：{分支特性}/{分支名称}-{负责人}，举例：feature/dev-smallzip。

**分支特性通常有如下几个：**

| 特性名称 | 特性介绍                                                     |
| -------- | ------------------------------------------------------------ |
| feature  | 增加新特性                                                   |
| hotfix   | 修改bug，特性发布后可能会出现一些bug，从tag/master中切除分支进行修改，后面merger进去 |
| release  | 热发布，在正式发布之前做一个预发布测试的分支                 |
| master   | 主要分支，即正式发布的                                       |

**分支名称**

分支名称一般按照开发的内容进行一个简单的命名就好，尽量语义化，能够一眼看得懂的。

比如本次要发布一个新的特性，是做一个游戏路线引导的canvas画布，则命名为：`addGamePath`，或者`addPathCanvas`等等，语义化能简单的理解即可。

**负责人**

这个根据自己的英文名称命名即可，可以使用全名，也可以使用艺名。

### 迭代开发

由于人员不多，更多情况下是自己拉取一个分支，自己进行开发，开发完毕之后进行自测，在自己的分支中测试好自己的代码。提交阶段注意好push之前先pull一边最新的master分支代码，防止代码冲突。

#### 开发阶段

```bash
# 第一步 拉取仓库代码
git clone https://gitcode-url

# 第二步 基于target/master切出一个本开发分支
git checkout -b feature/addGamePath-smallzip

# 第三步 开发完毕提交代码前，进行一次代码自检
git diff
```

代码自检是一个非常重要的环节，要确保改动的代码都在自己的可控范围内，尽量做到自己改了那些，都能够知道，当别人问到代码改动了什么的时候能够快速想得到，并清晰的回复。这一步要查看变动的代码是否符合预期的，这个代码diff阶段建议在开发工具中进行可视化预览比对，如vscode的源码管理中是可以进行源码diff的，改动的内容都审阅一边。

#### 提交代码阶段

```bash
# 第一步 将所有的代码都添加进暂存区
git add .

# 第二步 提交代码
git commit -m "feat:描述一下做的内容 tapd:需求文档的路径"

# 第三步 拉取最新的代码
git pull origin master

# 第四步 如果有冲突则需要解决，没有冲突可以忽略这一步
git commit -m "chore:解决冲突 pull origin master"

# 第五步 提交代码
git push origin feature/addGamePath-smallzip

# 第六步 切换到master
git checkout master

# 第七步 测试完毕特性代码后合并到预发布/发布环境
git merge feature/addGamePath-smallzip

# 第八步 推送/发布
git push origin master
```

#### 额外补充

代码流程code master对于code有严格要求的，可以在GitLab上面发起一个merge requests请求，code master进行CR（code review），CR审阅通过后直接进行merge，没有通过则打回。