# Git指令学习

### 基础指令

1. 查看所有分支

   ```git
   git branch -a
   ```

2. 查看当前使用分支(结果列表中前面标*号的表示当前使用分支)

   ```git
   git branch
   ```

3. 切换分支

   ```git
   git checkout 分支名称
   ```

4. 初始化git

   ```git
   git init
   ```

5. 提交变更到暂存区

   > 这里的差异适用于git 2.0版本以上

   ```git
   git add .    // 暂存所有（新的，修改的，已删除的）文件
   
   git add -u   //  仅修改和删除文件
   
   git add -A    // 暂存所有（新的，修改的，已删除的）文件
   ```

6. 添加说明

   ```git
   git commit -m
   ```

7. 推送到仓库

   ```git
   git push -u origin dev    // 第一次
   
   git push    // 第一次连接到远程仓库之后只需要执行push即可
   
   git push origin dev:master -f    // 本地的dev分支完全覆盖远程仓库master分支，后面的-f代表覆盖
   ```

### git将一个分支的代码完全覆盖另一个分支

自己开发的代码有时候需要和测试环境的代码尽量保持同步，所有每天都要把自己打代码提交一遍，同时让测试环境下的代码保持同步。

自己的代码分支名为dev，测试分支名叫test，需要做如下操作

1. 将自己本地dev分支的代码完全覆盖test分支，首先需要切换到test分支

   ```git
   git checkout test
   ```

2. 之后可以直接把本地的dev分支代码链接到远程测试test分支的代码，

   ```git
   git reset --hard origin/dev
   ```

3. 执行上面代码后会显示`HEAD is now at 827333e4 提交到test分支`说明已经提交成了，但是要注意，只是本地分支被改变了，我们可以看到本地的代码已经变更，也可以对现在的代码进行修改操作，修改完成之后，需要将本地dev分支推送到远程test分支，或者强制覆盖

   ```git
   git push -f
   ```

   

