## bash内容输出

```bash
#!/bin/bash
echo '$0='$0
echo '$1='$1
echo '$2='$2
echo '$3'=$3
echo '$4'$4
#read -p "please input the name what you like:" a
#echo i like apple $a
#echo my dog like apple 
#echo apple is good 


```

## 显示当前目录文件内容

```bash
#!/bin/bash
if test $# = 0
then 
 ls .
else 
 for $i
do 
 ls -l $i
done 

fi

```

## 显示当前目录文件

```bash
#!/bin/bash
if test -d $l
then
 ls  $l
else 
 echo "not cataog file"
 
fi

```

## bash计算

```bash
#!/bin/bash
read -p "输入第一个数" a
read -p "输入第二个数" b
read -p "输入第三个数" c
chuanlian=`expr $a + $b + $c`
bin1=`expr $a \* $b \* $c`
bin2=`expr $a \* $b + $a \* $c + $c \* $c`
binlian=`expr $bin1 / $bin2`
echo "串联:" $chuanlian
echo "并联:" $binlian

```

## 输入搜索的文件

```bash
#!/bin/bash
read -p "输入文件名称" l 
if [ -f $l ]
then 
  echo "$l 是一个普通文件" && ls -l
else if [ -d $l ]
then echo "$l 是一个目录文件"
else
  echo "$l 不是一个目录也不是普通文件"
  fi
fi

```

## 判断闰年

```bash
#!/bin/bash
read -p "输入年份:" year
y1=`expr $year % 4`
y2=`expr $year % 100`
y3=`expr $year % 400`
if [ "$y1" -eq 0 -a "$y2" -ne 0 ] || [ "$y3" -eq 0  ]
 then
   echo "$year 是闰年"
else 
  echo "$year 不是闰年"
fi

```

## 求最大数

```bash
#!/bin/bash
read -p "输入数值1" a
read -p "输入数字2" b
if [ $a -gt $b ]
then 
  echo "$a 大于 $b"
else
  echo "$b 大于 $a"
fi

```

## 求最大数

```bash
#!/bin/bash
read -p "输入数字" a
read -p "输入数字" b
let "c=$a>$b?$a:$b"
echo "$c"
```

## 三个数大小排序

```bash
#!/bin/bash
read -p "输入数字" a
read -p "输入数字" b
read -p "输入数字" c
if [ $a -ge $b && $a -ge $c ] 
then  
  echo "$a"
else if [ $b -ge $a && $b -ge $c ] 
then echo "$b"
else
  echo "$c"
  fi
fi
```

## 三个数大小排序方法2

```bash
#!/bin/bash
read -p "输入数字" a
read -p "输入数字" b
read -p "输入数字" c
let "e=$a>$b&&$a>$c?$a:$b>$a&&$b>$c?$b:$c"
echo "$e"
```

## 三个数大小排序3

```bash
#!/bin/bash
read -p "输入数字" a
read -p "输入数字" b
read -p "输入数字" c
let "e=$a>$b&&$a>$c?$a:$b>$a&&$b>$c?$b:$c"
let "d=$a<$b&&$a<$c?$a:$b<$a&&$b<$c?$b:$c"
let "f=($a+$b+$c)-$e-$d"
echo "老大是:$e"
echo "老二是:$f"
echo "老三是:$d"

```

## for循环

```bash
#!/bin/bash  
for i in {1..10}  
do  
echo $i  
done  
```



## 数组

```bash
#!/bin/bash
a[0]=beijin
a[1]=shanghai
a[2]=hannan
echo ${a[*]}

b=(i am linux array)
echo ${b[0]} ${b[1]} ${b[2]} ${b[3]} ${b[4]}

while [ $# != 0 ]; do
	echo "请输入参数: $1, 参数个数为：$#";
	shift
done
```

## 九九乘法表的三种方式
```bash
#!/bin/bash
echo "方法1------------------------"
for (( i = 1; i < 10; i++ )); do
	for (( j = 1; j <= i; j++ )); do
		echo -n "$j*$i=$(($i*$j)) "
	done
	echo ""
done

echo ""
echo "方法2------------------------"
echo ""

a=1
while [[ $a -le 9 ]]; do
	b=1
	while [[ $b -le $a ]]; do
		echo -n "$b*$a=$(($b*$a)) "
		let b++
	done
	let a++
	echo ""
done

echo ""
echo "方法3------------------------"
echo ""

n=1
until ((n>9)); do
	m=1
	until ((m>n)); do
		echo -n "$m*$n=$(($m*$m)) "
		m=$((m+1))
	done
	echo ""
	n=$((n+1))
done
```

## for循环

```bash
#!/bin/bash
read -p "输入数组" -a arr
echo  $arr
for (( i = 0; i < ${#arr[*]}; i++ )); do
	echo $i
done
```

## 求最大值 

```bash
#!/bin/bash
read -p "输入最大值:" a
a1=1
a2=1
a3=0
arr=(1 1)
for (( i = 3; i < $a; i++ )); do
	a3="$(($a1+$a2))"
	let a1=a2
	let a2=a3
	let arr[i]=a3
	echo "#${arr[*]}"
done
```

## until循环

```bash
#!/bin/bash
total=0
num=0
until ((num>100)); do
	temp=$((num%2>0?num:0))
	total=$((total+temp))
	num=$((num+1))
done
echo "最终结果为：$total"
```

## case的应用
```bash
#!/bin/bash
read -p "input a number:" a
case $a in 
	1)pwd;;
	2)date;;
	3)who;;
esac
```

## case应用案例1
```bash
#!/bin/bash
read -p "输入计算的两个数字: " a b
read -p "输选择菜单[1~5]: " c
case $c in
	1 )
	echo $((a+b));;
	2 )
	echo $((a-b));;
	3 )
	echo $((a*b));;
	4 )
	echo $((a/b));;
	5 )
	echo $((a%b));;
esac
```

## 函数的应用
```bash
#!/bin/bash
f-echo(){
	echo "let us begin now!"
	echo $a $b $c
	echo $1 $2 $3 $4
	echo "the end"
}

a="working directory"
b="is"
c=$(pwd)

# 给函数赋值
f-echo one world one dream

echo "today is `date`"
```

## 函数配合case
```bash
#!/bin/bash
read -p "输入计算的两个数字: " a b
read -p "输选择菜单[1~5]: " c
f-echo(){
	if (($c==1)); then
		echo $((a+b))

		elif (($c==2)); then
			echo $((a-b))
		elif (($c==3)); then
			echo $((a*b))
		elif (($c==4)); then
			echo $((a/b))
		elif (($c==5)); then
			echo $((a%b))
	fi
}
# 执行函数
f-echo
```