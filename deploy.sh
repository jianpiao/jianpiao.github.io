#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

currentDate=`date "+%Y-%m-%d~%H:%M:%S"`

# 先把源码提交到仓库
git add .
git commit -m $currentDate
git push

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME


git init
git add -A
git commit -m $currentDate

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:jianpiao/jianpiao.github.io.git master
git push -f git@gitee.com:smallzip/smallzip.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -