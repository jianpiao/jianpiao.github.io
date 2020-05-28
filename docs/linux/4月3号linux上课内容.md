# 4月3号linux上课内容

## sleep
> s表示秒(默认设置)
> 
> m表示分钟
> 
> h表示小时
> 
> d表示天
> 
> 
```bash
// 停顿三秒钟
sleep 3s
```

## bash
```
// 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序
#!/bin/bash
echo "Hello World !"
```


## nohup
> &符号：在后台运行文件，加了&符号脚本后台运行，前台可以继续执行其他命令，不加&前台需等脚本运行完才能继续执行其他命令（假如在运行时关闭终端，不会影响结果文件的生成）
> 
```
// 放在后台执行，关掉终端也会继续执行
nohup bash a.sh &
```
```
// 查看所有的nohup
cat nohup.out
```

## wait
> 所有的子进程执行完才执行下面的
> 
> 等1，2和sleep执行完才执行wait下面的
```
echo 1
echo 2
sleep 5s&
sleep 5s over
wait
echo 3
echo 4
```

## 压缩、解压 gzip
> 不可以对目录压缩
> 
> -r 常用选项
> 
> -d 解压
> 
> -z 压缩
> 

```
// 递归操作
gzip -r l

// 解压p2.gz
gzip -d p2.gz

```

## zip
```
// 压缩
zip -r 1.zip 1

// 解压
unzip 1.zip
```

## tar 
```
// 压缩
tar -ef 1.tar 1

// 解压
tar -xf 1.tar
```



