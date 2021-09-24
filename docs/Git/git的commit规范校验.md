# git的commit规范校验

不立规矩，不成方圆。团队协作，规范很重要。

## 背景

git每次提交代码都应该写上commit message，否则就不允许提交，一般来说写commit message应该清晰明了，能够具体的说明本次做了什么操作，操作的目的是什么，影响了什么范围。

在日常开发中，大家的commit message千奇百怪，有中文的，有英文的，有图标的，各式各样。这就导致了后续代码维护成本变得特别大，有时候自己进行代码复盘都不知道之前的fix bug修改的到底是什么。基于以上的问题，希望在每次commit message提交的时候进行规范校验，让规范更好的服务于质量，一方面提升commit message的质量，另一方面也提升后期代码维护的效率。

## 使用git hooks监听commit

在.git文件中可以看到有很多的钩子，我们可以在项目根目录下，打开终端输入如下命令：

```bash
# 进入git文件
cd .git
 
# 进入钩子文件
cd hooks
 
# 查看所有钩子
ls -a
```

![效果](https://pic1.zhimg.com/80/v2-a0534e7eee362c859d7f6e69d5ed6b8e_720w.png)

这里只需要使用到`commit-msg`钩子，我们回到根目录下，找到package.json文件，在最下面新增一个钩子指令：

```json
{
  "name": "项目名称",
  "version": "1.1.1",
  "scripts": {
      // 指令
  },
  "dependencies": {
      // 依赖
  },
 "gitHooks": {
    "commit-msg": "node ./git/index.ts" // 增加这一行
  }
}
```

## 编写钩子函数

根据指令指向的地址，创建一个git文件夹，在文件下新建一个index.ts文件，写入如下内容：

```javascript
const chalk = require("chalk")
const msgPath = process.env.GIT_PARAMS
const msg = require("fs")
  .readFileSync(msgPath, "utf-8")
  .trim()
const commitRE = /^(revert: )?(create|fix|feat|chore|refactor|hotfix|revert|update|build|test|save)(\(.+\))?: .{1,50}/
chalk.level = 1
if (!commitRE.test(msg)) {
  console.log()
  console.log(
    `${chalk.bgRed.white(" ERROR ")} ${chalk.bold.red(
      `无效的commit提交格式`
    )}\n\n` +
      chalk.red(
        `请遵循正确的格式提交. 例如: ` +
          chalk.underline.red(`git commit -m "feat：完成游戏详情"\n`)
      )
  )
  console.table([
    {
      [chalk.cyan("注释")]: "新建项目",
      [chalk.cyan("commit：description")]: `create：创建 XXX项目`
    },
    {
      [chalk.cyan("注释")]: "修复 bug",
      [chalk.cyan("commit：description")]: `fix：修复XXXbug`
    },
    {
      [chalk.cyan("注释")]: "新增特性/完成XXXX",
      [chalk.cyan("commit：description")]: `feat：新增特性XXXX`
    },
    {
      [chalk.cyan("注释")]: "改变构建流程",
      [chalk.cyan("commit：description")]: `chore：pull origin [分支名称]`
    },
    {
      [chalk.cyan("注释")]: "重构内容",
      [chalk.cyan("commit：description")]: `refactor：重构XXXX`
    },
    {
      [chalk.cyan("注释")]: "紧急修复",
      [chalk.cyan("commit：description")]: `hotfix：紧急修复XXXX`
    },
    {
      [chalk.cyan("注释")]: "回滚",
      [chalk.cyan("commit：description")]: `revert：回滚XXX版本`
    },
    {
      [chalk.cyan("注释")]: "更新文档",
      [chalk.cyan("commit：description")]: `update：更新文档`
    },
    {
      [chalk.cyan("注释")]: "打包项目",
      [chalk.cyan("commit：description")]: `build：打包XXXX`
    },
    {
      [chalk.cyan("注释")]: "测试文件",
      [chalk.cyan("commit：description")]: `test：测试XXXX`
    },
    {
      [chalk.cyan("注释")]: "暂存文件（保存进度）",
      [chalk.cyan("commit：description")]: `save：暂存XXXX`
    }
  ])
  console.log(
    chalk.red(
      `\ndescription：文字描述不得超过50个字符，推荐以动词开头：创建、修复、完成、修改、增加、更新等` +
        `\n\nSee https://shimo.im/docs/uJRXiSTYx2UhfVG5/  for more details.\n`
    )
  )
  process.exit(1)
}
```

接下来执行git指令检验钩子

在终端输入：

```bash
git commit -m "asdf"
```

最后看到结果：

![img](https://pica.zhimg.com/80/v2-b751b12208fd39b28d71edbb79be0179_720w.png)

## 小结

主要是利用git自带的commit-msg钩子监听自定义文件，实现commit校验。