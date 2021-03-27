(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{354:function(a,t,s){"use strict";s.r(t);var e=s(33),v=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h3",{attrs:{id:""}},[s("a",{staticClass:"header-anchor",attrs:{href:"#"}},[a._v("#")])]),a._v(" "),s("h1",{attrs:{id:"_3月27号linux上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3月27号linux上课内容"}},[a._v("#")]),a._v(" 3月27号linux上课内容")]),a._v(" "),s("h4",{attrs:{id:"软连接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#软连接"}},[a._v("#")]),a._v(" 软连接")]),a._v(" "),s("blockquote",[s("p",[a._v("1.软链接，以路径的形式存在。类似于Windows操作系统中的快捷方式")]),a._v(" "),s("p",[a._v("2.软链接可以 跨文件系统 ，硬链接不可以")]),a._v(" "),s("p",[a._v("3.软链接可以对一个不存在的文件名进行链接")]),a._v(" "),s("p",[a._v("4.软链接可以对目录进行链接")])]),a._v(" "),s("h4",{attrs:{id:"硬链接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#硬链接"}},[a._v("#")]),a._v(" 硬链接")]),a._v(" "),s("blockquote",[s("p",[a._v("1.硬链接，以文件副本的形式存在。但不占用实际空间。")]),a._v(" "),s("p",[a._v("2.不允许给目录创建硬链接")]),a._v(" "),s("p",[a._v("3.硬链接只有在同一个文件系统中才能创建")])]),a._v(" "),s("h4",{attrs:{id:"命令参数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令参数"}},[a._v("#")]),a._v(" 命令参数")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[a._v("必要参数:\n-b 删除，覆盖以前建立的链接\n-d 允许超级用户制作目录的硬链接\n-f 强制执行\n-i 交互模式，文件存在则提示用户是否覆盖\n-n 把符号链接视为一般目录\n-s 软链接(符号链接)\n-v 显示详细的处理过程\n\n选择参数:\n-S “-S<字尾备份字符串> ”或 “--suffix=<字尾备份字符串>”\n-V “-V<备份方式>”或“--version-control=<备份方式>”\n--help 显示帮助信息\n--version 显示版本信息\n")])])]),s("h4",{attrs:{id:"执行命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行命令"}},[a._v("#")]),a._v(" 执行命令")]),a._v(" "),s("blockquote",[s("p",[a._v("创建软链接")]),a._v(" "),s("p",[a._v("ln  -s  [源文件或目录]  [目标文件或目录]")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("ln –s  /var/www/test  test\n")])])]),s("p"),a._v(" "),s("blockquote",[s("p",[a._v("删除test")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("rm –rf test\n")])])]),s("blockquote",[s("p",[a._v("修改软链接")]),a._v(" "),s("p",[a._v("ln –snf  [新的源文件或目录]  [目标文件或目录]")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("ln –snf  /var/www/test1   /var/test\n\n")])])]),s("h4",{attrs:{id:"添加组学生班级-gid-600"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#添加组学生班级-gid-600"}},[a._v("#")]),a._v(" 添加组学生班级 gid=600")]),a._v(" "),s("blockquote",[s("p",[a._v("创建两个用户stu001，stu002 并且将这两个指定到组用户")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 用户1\ngroupadd -g 600 class01 useradd stu001 -u 5\n// 用户2\ngroupadd -g 502 class02 useradd stu002 -u 5\n// 删除用户\nuserdel\n// \n\n")])])]),s("h4",{attrs:{id:"修改用户权限"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修改用户权限"}},[a._v("#")]),a._v(" 修改用户权限")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 普通方式\nchmod 0764 p1\n//  符号方式\nchmod u=rwx,g=rw,o=r p1\n")])])]),s("h2",{attrs:{id:"第四章内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#第四章内容"}},[a._v("#")]),a._v(" 第四章内容")]),a._v(" "),s("h4",{attrs:{id:"进程概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进程概念"}},[a._v("#")]),a._v(" 进程概念")]),a._v(" "),s("blockquote",[s("p",[a._v("显示日期")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("date\n")])])]),s("h4",{attrs:{id:"进程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进程"}},[a._v("#")]),a._v(" 进程")]),a._v(" "),s("blockquote",[s("p",[a._v("进程是程序在某个数据集合的运行活动是系统进行资源分配和调度的一个独立单位")])]),a._v(" "),s("h4",{attrs:{id:"进程的类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进程的类型"}},[a._v("#")]),a._v(" 进程的类型")]),a._v(" "),s("ol",[s("li",[a._v("交互式进程")])]),a._v(" "),s("blockquote",[s("p",[a._v("处理用户交互")])]),a._v(" "),s("ol",{attrs:{start:"2"}},[s("li",[a._v("批处理进程")])]),a._v(" "),s("blockquote",[s("p",[a._v("系统进程")])]),a._v(" "),s("ol",{attrs:{start:"3"}},[s("li",[a._v("守护进程")])]),a._v(" "),s("blockquote",[s("p",[a._v("监控进程")])]),a._v(" "),s("h4",{attrs:{id:"进程状态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#进程状态"}},[a._v("#")]),a._v(" 进程状态")]),a._v(" "),s("ol",[s("li",[a._v("运行状态")])]),a._v(" "),s("blockquote",[s("p",[a._v("它的程序正在处理机上执行")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("running\n")])])]),s("ol",{attrs:{start:"2"}},[s("li",[a._v("就绪状态")])]),a._v(" "),s("blockquote",[s("p",[a._v("进程已具备运行的条件，但是因为其他进程正在占用cpu所以展示不能运行而等待分配cpu状态")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("readly\n")])])]),s("ol",{attrs:{start:"3"}},[s("li",[a._v("堵塞状态")])]),a._v(" "),s("blockquote",[s("p",[a._v("进程因为等待某种事件发生，而暂时不能运行的状态")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("blocked\n")])])]),s("h4",{attrs:{id:"单道程序设计"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#单道程序设计"}},[a._v("#")]),a._v(" 单道程序设计")]),a._v(" "),s("h5",{attrs:{id:"特征"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特征"}},[a._v("#")]),a._v(" 特征")]),a._v(" "),s("blockquote",[s("ol",[s("li",[a._v("失去封闭性")]),a._v(" "),s("li",[a._v("程序与计算不再一一对应")]),a._v(" "),s("li",[a._v("并发程序在执行期间相互制约")])])]),a._v(" "),s("h4",{attrs:{id:"显示进程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#显示进程"}},[a._v("#")]),a._v(" 显示进程")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("//  显示进程\nps\n// 所有的进程信息\nps -e\n\n// 进程的所有信息\nps -f\n\n// 父进程\nps -ef\n\n")])])]),s("h4",{attrs:{id:"用户以及组"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#用户以及组"}},[a._v("#")]),a._v(" 用户以及组")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("chmod 命令：\nchmod 0(***) 文件名\n0 是特殊权限，括号内是权限的八进制\n \n文件权限范围：\nu 即文件或目录的拥有者\ng 即文件或目录的所属群组\no 除了文件或目录拥有者或所属群组之外，其他用户皆属于这个范围\na 即全部的用户，包含拥有者、所属群组以及其他用户\n权限代号：\nr：读取权限，数字代号为4\nw：写入权限，数字代号为2\nx：执行或切换权限，数字代号为1\n-：不具任何权限，数字代号为0\n \n \numask命令：\n指定在建立文件时预设的权限掩码\n-p 以掩码形式表示权限\n-S 以文字的方式来表示权限掩码\numask 0*** 文件名\n掩码的写法是与八进制相反，如权限755，对应的掩码就是022\n \n \n \n添加用户：\nadduser 用户名   新建用户\npasswd 密码      修改密码\nuserdel -r 用户名  删除用户\n \n \ncat /etc/group  查看所有用户组\ncat /etc/passwd  查看组和用户\n \n \nchgrp命令：\n变更文件或目录的所属群组\n用法：\nchgrp 群组名 文件名\n\n\nlinux下创建用户及组：\n1.创建组\ngroupadd  组名\n2.创建用户，并将用户添加到组\nuseradd  用户名  -g  组名\n3.更改用户的密码\npassword  用户名\n4.修改目录的属主和属组\nchown  -R   组名:用户名  文件的目录\n\n")])])]),s("h1",{attrs:{id:"_3月31号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3月31号上课内容"}},[a._v("#")]),a._v(" 3月31号上课内容")]),a._v(" "),s("h2",{attrs:{id:"yes命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yes命令："}},[a._v("#")]),a._v(" yes命令：")]),a._v(" "),s("blockquote",[s("p",[a._v("一直输出")]),a._v(" "),s("p",[a._v("格式：yes 输出内容")]),a._v(" "),s("p",[a._v("Ctrl+c 终止进程")]),a._v(" "),s("p",[a._v("Ctrl+z 暂停进程，挂起进程")]),a._v(" "),s("p",[a._v("fg 把挂起的进程继续执行")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 输出gg\nyes gg\n")])])]),s("h2",{attrs:{id:"ps命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ps命令"}},[a._v("#")]),a._v(" ps命令")]),a._v(" "),s("blockquote",[s("p",[a._v("-e 显示所有进程")]),a._v(" "),s("p",[a._v("-f 进程的所有信息（全格式）")]),a._v(" "),s("p",[a._v("-ef 查看全格式的全部进程")]),a._v(" "),s("p",[a._v("-aux 显示所有包含其他使用者的行程")])]),a._v(" "),s("h2",{attrs:{id:"kill命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#kill命令："}},[a._v("#")]),a._v(" kill命令：")]),a._v(" "),s("blockquote",[s("p",[a._v("用于删除执行中的程序或工作")]),a._v(" "),s("p",[a._v("-l 查看信息")]),a._v(" "),s("p",[a._v("-s 指定送出的信息")]),a._v(" "),s("p",[a._v("SIGHUP 重启")]),a._v(" "),s("p",[a._v("SIGQUIT 终止")]),a._v(" "),s("p",[a._v("SIGKILL  强行杀掉进程")]),a._v(" "),s("p",[a._v("使用格式：kill -s [kill] 进程号")])]),a._v(" "),s("h2",{attrs:{id:"s-a-查看隐藏文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#s-a-查看隐藏文件"}},[a._v("#")]),a._v(" s -a 查看隐藏文件")]),a._v(" "),s("h2",{attrs:{id:"exit-停止所有任务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#exit-停止所有任务"}},[a._v("#")]),a._v(" exit 停止所有任务")]),a._v(" "),s("h2",{attrs:{id:"find命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#find命令："}},[a._v("#")]),a._v(" find命令：")]),a._v(" "),s("blockquote",[s("p",[a._v("在指定目录下查找文件")]),a._v(" "),s("p",[a._v("格式：find /路径 根据什么")]),a._v(" "),s("p",[a._v("-name 文件名称符合 name 的文件")]),a._v(" "),s("p",[a._v("-type 按照文件类型")])]),a._v(" "),s("h4",{attrs:{id:"文件类型："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#文件类型："}},[a._v("#")]),a._v(" 文件类型：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("d: 目录\nc: 字型装置文件\nb: 区块装置文件\np: 具名贮列\nf: 一般文件\nl: 符号连结\ns: socket\n")])])]),s("p",[a._v("jobs命令：直接查看挂起进程")]),a._v(" "),s("h4",{attrs:{id:"杀掉进程命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#杀掉进程命令"}},[a._v("#")]),a._v(" 杀掉进程命令")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 显示信息 \nkill -l\n\n// 杀死3308\nkill 3308端口\n\n// 强制杀死进程\nkill -s KILL 3714\n\n// 通过数字代表强行杀掉进程\nkill -9 3310\n")])])]),s("h5",{attrs:{id:"动态显示进程信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态显示进程信息"}},[a._v("#")]),a._v(" 动态显示进程信息")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("top\n")])])]),s("h5",{attrs:{id:"挂在后台"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#挂在后台"}},[a._v("#")]),a._v(" 挂在后台")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("&符号可以挂在后台\n\n// 把p21放在后台\nvi p21&\n")])])]),s("h4",{attrs:{id:"找内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#找内容"}},[a._v("#")]),a._v(" 找内容")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('// 查找名称为。。的文件\nfind . -name "p*"\n')])])]),s("h1",{attrs:{id:"_4月3号linux上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月3号linux上课内容"}},[a._v("#")]),a._v(" 4月3号linux上课内容")]),a._v(" "),s("h2",{attrs:{id:"sleep"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sleep"}},[a._v("#")]),a._v(" sleep")]),a._v(" "),s("blockquote",[s("p",[a._v("s表示秒(默认设置)")]),a._v(" "),s("p",[a._v("m表示分钟")]),a._v(" "),s("p",[a._v("h表示小时")]),a._v(" "),s("p",[a._v("d表示天")])]),a._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[a._v("// 停顿三秒钟\n"),s("span",{pre:!0,attrs:{class:"token function"}},[a._v("sleep")]),a._v(" 3s\n")])])]),s("h2",{attrs:{id:"bash"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bash"}},[a._v("#")]),a._v(" bash")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('// 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序\n#!/bin/bash\necho "Hello World !"\n')])])]),s("h2",{attrs:{id:"nohup"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nohup"}},[a._v("#")]),a._v(" nohup")]),a._v(" "),s("blockquote",[s("p",[a._v("&符号：在后台运行文件，加了&符号脚本后台运行，前台可以继续执行其他命令，不加&前台需等脚本运行完才能继续执行其他命令（假如在运行时关闭终端，不会影响结果文件的生成）")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 放在后台执行，关掉终端也会继续执行\nnohup bash a.sh &\n")])])]),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 查看所有的nohup\ncat nohup.out\n")])])]),s("h2",{attrs:{id:"wait"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#wait"}},[a._v("#")]),a._v(" wait")]),a._v(" "),s("blockquote",[s("p",[a._v("所有的子进程执行完才执行下面的")]),a._v(" "),s("p",[a._v("等1，2和sleep执行完才执行wait下面的")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("echo 1\necho 2\nsleep 5s&\nsleep 5s over\nwait\necho 3\necho 4\n")])])]),s("h2",{attrs:{id:"压缩、解压-gzip"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#压缩、解压-gzip"}},[a._v("#")]),a._v(" 压缩、解压 gzip")]),a._v(" "),s("blockquote",[s("p",[a._v("不可以对目录压缩")]),a._v(" "),s("p",[a._v("-r 常用选项")]),a._v(" "),s("p",[a._v("-d 解压")]),a._v(" "),s("p",[a._v("-z 压缩")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 递归操作\ngzip -r l\n\n// 解压p2.gz\ngzip -d p2.gz\n\n")])])]),s("h2",{attrs:{id:"zip"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zip"}},[a._v("#")]),a._v(" zip")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 压缩\nzip -r 1.zip 1\n\n// 解压\nunzip 1.zip\n")])])]),s("h2",{attrs:{id:"tar"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tar"}},[a._v("#")]),a._v(" tar")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("// 压缩\ntar -ef 1.tar 1\n\n// 解压\ntar -xf 1.tar\n")])])]),s("h1",{attrs:{id:"_4月7号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月7号上课内容"}},[a._v("#")]),a._v(" 4月7号上课内容")]),a._v(" "),s("h3",{attrs:{id:"vi和vim"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vi和vim"}},[a._v("#")]),a._v(" vi和vim")]),a._v(" "),s("p",[a._v("vim是vi的增强版")]),a._v(" "),s("h4",{attrs:{id:"行编辑器和屏幕编辑器"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#行编辑器和屏幕编辑器"}},[a._v("#")]),a._v(" 行编辑器和屏幕编辑器")]),a._v(" "),s("p",[a._v("底行显示：行（L），字数（C）")]),a._v(" "),s("blockquote",[s("p",[a._v("命令状态：输入的属于命令")]),a._v(" "),s("p",[a._v("插入方式：输入的都为普通字符")]),a._v(" "),s("p",[a._v("Ex转义方式：（:）进入")]),a._v(" "),s("p",[a._v("转义命令：")]),a._v(" "),s("p",[a._v(":wq 保存退出")]),a._v(" "),s("p",[a._v(":x(ZZ) 保存修改时的缓冲区内容写到文件上")]),a._v(" "),s("p",[a._v(":q! 强行退出不保存")])]),a._v(" "),s("h4",{attrs:{id:"wq"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#wq"}},[a._v("#")]),a._v(" :wq")]),a._v(" "),s("p",[a._v("把编辑缓冲区内容写到你的编辑的文件中")]),a._v(" "),s("h4",{attrs:{id:"x"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#x"}},[a._v("#")]),a._v(" :x")]),a._v(" "),s("p",[a._v("大写字母ZZ，保存修改时的缓冲区内容写到文件上")]),a._v(" "),s("h4",{attrs:{id:"q"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#q"}},[a._v("#")]),a._v(" :q!")]),a._v(" "),s("p",[a._v("强制退出vi，感叹号告诉vi无跳转退出，丢弃缓冲区内容")]),a._v(" "),s("h4",{attrs:{id:"set"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#set"}},[a._v("#")]),a._v(" :set")]),a._v(" "),s("p",[a._v(":set number 序列\n:set nuhlsearch 不要高亮")]),a._v(" "),s("h2",{attrs:{id:"vim有三种模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#vim有三种模式"}},[a._v("#")]),a._v(" vim有三种模式")]),a._v(" "),s("blockquote",[s("p",[a._v("命令模式")]),a._v(" "),s("p",[a._v("输入模式")]),a._v(" "),s("p",[a._v("底行指令模式")])]),a._v(" "),s("h3",{attrs:{id:"命令模式下："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令模式下："}},[a._v("#")]),a._v(" 命令模式下：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("i 在光标所在位置开始输入\n\nshift + i 在光标所在行首部开始输入\n\nshift + a 在光标所在行尾部开始输入\n\nshift + o 在光标上面新建一行开始输入\n\nx 删掉光标所在字符\n\ndd 剪切该行\n\nd + → 删掉光标往右的字符\n\nd + ← 删掉光标往左的字符\n\nd + 数字 + ←/→ 指定方向和删掉指定长度的字符串\n\np 粘贴\n\ny  + ←/→ 复制\n\ny + 数字 + ←/→ 复制指定长度\n\nw 跳到下一个词首\n\nb 返回上一个词首\n")])])]),s("h3",{attrs:{id:"修改命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#修改命令："}},[a._v("#")]),a._v(" 修改命令：")]),a._v(" "),s("p",[a._v("c 修改光标前的内容，esc退出")]),a._v(" "),s("p",[a._v("C 紧接着新输入文本，esc退出")]),a._v(" "),s("p",[a._v("c^删除光标前当前行的内容")]),a._v(" "),s("p",[a._v("cc 删除一行并进入编辑模式")]),a._v(" "),s("p",[a._v("14.取代命令：")]),a._v(" "),s("p",[a._v("r 替代光标单个字符")]),a._v(" "),s("p",[a._v("R 替代光标后当前行所有内容")]),a._v(" "),s("h3",{attrs:{id:"替换命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#替换命令："}},[a._v("#")]),a._v(" 替换命令：")]),a._v(" "),s("p",[a._v("s 输入内容替代光标字符")]),a._v(" "),s("p",[a._v("S 输入内容替代整行")]),a._v(" "),s("h3",{attrs:{id:"字符串检索"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#字符串检索"}},[a._v("#")]),a._v(" 字符串检索")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("向前检索：/ 字符串 <Enter>\n\n向后检索：? 字符串 <Enter>\n\n查找下一个，按n即可\n\nN是向反方向查找\n")])])]),s("h1",{attrs:{id:"_4月10号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月10号上课内容"}},[a._v("#")]),a._v(" 4月10号上课内容")]),a._v(" "),s("h4",{attrs:{id:"设置vi文本内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置vi文本内容"}},[a._v("#")]),a._v(" 设置vi文本内容")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("syntax on 高亮\n\nset number 显示行数\n\nset cursorline 显示光标线\n\nset wrap 文本自动换行\n\nset showcmd \n\nmap S :w<CR> 保存快捷键\n\nmap Q :q<CR> 退出快捷键\n\nmap W :wq<CR> 保存退出快捷键\n\nmap R :source $MYVIMRC<CR> 立即生效\n\nnoremap U 5k 快速翻页\n\nnoremap E 5j 同上\n\nset hlsearch 搜索到后高亮\n\nset incsearch 编写同时搜索\n\nset ignorecase 大小写不敏感\n\nset smartcase 智能大小写，输入了有大小写的字符就会区分\n")])])]),s("h4",{attrs:{id:"输入内容到文本里面"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#输入内容到文本里面"}},[a._v("#")]),a._v(" 输入内容到文本里面")]),a._v(" "),s("p",[a._v("cat >> p2.txt << EDF <<是指把内容输入进去p2.txt EDF是开始和结束符，结尾要输入EDF来结束，类似标签语言")]),a._v(" "),s("h1",{attrs:{id:"_4月14号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月14号上课内容"}},[a._v("#")]),a._v(" 4月14号上课内容")]),a._v(" "),s("p",[a._v('修改字体颜色 echo -e "\\e[1;32m neirong\\e[0m"')]),a._v(" "),s("p",[a._v("创建文件，创建成功显示ok mkdir -p 1/12/123 && echo ok")]),a._v(" "),s("p",[a._v("删除空文件 rmdir -p 1/12/123")]),a._v(" "),s("p",[a._v("删除文件,递归删除 rm -f")]),a._v(" "),s("p",[a._v("所有可能的命令列出来 type -a pwd")]),a._v(" "),s("p",[a._v("与或非 && || !")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("例子1: mkdir -p 1/12/123 && echo ok\n例子2: mkdir 1/2/3 || echo ok\n")])])]),s("h3",{attrs:{id:"echo-命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#echo-命令"}},[a._v("#")]),a._v(" echo 命令")]),a._v(" "),s("p",[a._v("输出")]),a._v(" "),s("p",[a._v("-e 开启转义字符")]),a._v(" "),s("p",[a._v("-n 不换行输出")]),a._v(" "),s("p",[a._v("\\ 转义符，后面可以输出空格等特殊字符")]),a._v(" "),s("p",[a._v("\\e[31;42m 红字绿底")]),a._v(" "),s("p",[a._v("\\e[0m 恢复")]),a._v(" "),s("p",[a._v("1是加粗，颜色后面要加m，中间需要加分号")]),a._v(" "),s("p",[a._v("echo > 文件 覆盖输入内容")]),a._v(" "),s("p",[a._v("echo > 文件 接着下一行输入内容")]),a._v(" "),s("h3",{attrs:{id:"分节符输入："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分节符输入："}},[a._v("#")]),a._v(" 分节符输入：")]),a._v(" "),s("p",[a._v("cat >> 文件 << 结束语")]),a._v(" "),s("p",[a._v("正常接着下行输入，直到输入结束语结束")]),a._v(" "),s("h3",{attrs:{id:"history命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#history命令："}},[a._v("#")]),a._v(" history命令：")]),a._v(" "),s("p",[a._v("查看历史命令，前面数字为命令号")]),a._v(" "),s("p",[a._v("！命令号，重复执行该命令号所对应的命令")]),a._v(" "),s("h3",{attrs:{id:"两条同时命令执行："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#两条同时命令执行："}},[a._v("#")]),a._v(" 两条同时命令执行：")]),a._v(" "),s("p",[a._v("用；隔开，两条命令毫无联系各自执行")]),a._v(" "),s("p",[a._v("&& 两条命令都正确才执行")]),a._v(" "),s("p",[a._v("||   有一条命令正确就执行")]),a._v(" "),s("h3",{attrs:{id:"type命令-："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#type命令-："}},[a._v("#")]),a._v(" type命令 ：")]),a._v(" "),s("p",[a._v("用来显示指定命令的类型，判断给出的指令是内部指令还是外部指令。")]),a._v(" "),s("h3",{attrs:{id:"脚本命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#脚本命令："}},[a._v("#")]),a._v(" 脚本命令：")]),a._v(" "),s("p",[a._v("变量：不用定义类型直接用，如：a=apple，赋值号“=”两边没有空格")]),a._v(" "),s("p",[a._v("引用变量：$a")]),a._v(" "),s("p",[a._v("read 变量名   可以从键盘输入，中间加入-p 双引号可以设置提示语句")]),a._v(" "),s("h1",{attrs:{id:"_4月17号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月17号上课内容"}},[a._v("#")]),a._v(" 4月17号上课内容")]),a._v(" "),s("h4",{attrs:{id:"位置参数："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#位置参数："}},[a._v("#")]),a._v(" 位置参数：")]),a._v(" "),s("p",[a._v("不定义变量，直接用$1 $2 $3 $4")]),a._v(" "),s("p",[a._v("在运行脚本后面空格 加你要输出的内容，每个变量相隔一个空格")]),a._v(" "),s("p",[a._v("单引号直接输出内容")]),a._v(" "),s("p",[a._v("双引号有变量的话则会调用变量输出")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("#!/bib/bash\necho '$0='$0\necho '$1='$1\necho '$2='$2\necho '$3='$3\necho '$4='$4\necho '$5='$5\n")])])]),s("h4",{attrs:{id:"shift命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shift命令"}},[a._v("#")]),a._v(" shift命令")]),a._v(" "),s("p",[a._v("使用shift命令之后，原来的$2会变成$1，并且原有的$1变得不可用，通过$#命令获得的参数个数也会少1。")]),a._v(" "),s("p",[a._v("$0  这个脚本的执行名字")]),a._v(" "),s("p",[a._v("$n  第n个参数值")]),a._v(" "),s("p",[a._v("$*  全部参数")]),a._v(" "),s("p",[a._v("$@ 全部参数，可以当作数组使用")]),a._v(" "),s("p",[a._v("$# 参数个数")]),a._v(" "),s("p",[a._v("$$ 这个脚本的PID")]),a._v(" "),s("p",[a._v("$? 上一条指令的返回值，成功是0，不成功是1")]),a._v(" "),s("p",[a._v("$!  Shell最后运行后台Process的PID")]),a._v(" "),s("p",[a._v("unset 变量名  清除变量内容")]),a._v(" "),s("p",[a._v("在调用变量名时可以用 {变量名} 来区分变量名")]),a._v(" "),s("h4",{attrs:{id:"命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令"}},[a._v("#")]),a._v(" 命令")]),a._v(" "),s("p",[a._v("直接输入 name=zhangsan")]),a._v(" "),s("p",[a._v("输出 echo name // 结果显示 zhangsan")]),a._v(" "),s("h4",{attrs:{id:"目录"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#目录"}},[a._v("#")]),a._v(" 目录")]),a._v(" "),s("p",[a._v("echo $(dir)36/36/1  // 括号代表dir是一个整体")]),a._v(" "),s("h1",{attrs:{id:"_4月21号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月21号上课内容"}},[a._v("#")]),a._v(" 4月21号上课内容")]),a._v(" "),s("ol",[s("li",[a._v("$0  这个脚本的执行名字")]),a._v(" "),s("li",[a._v("$n  第n个参数值")]),a._v(" "),s("li",[a._v("$*  全部参数")]),a._v(" "),s("li",[a._v("$@ 全部参数，可以当作数组使用")]),a._v(" "),s("li",[a._v("$# 参数个数")]),a._v(" "),s("li",[a._v("$$ 这个脚本的PID")]),a._v(" "),s("li",[a._v("$? 上一条指令的返回值，成功是0，不成功是1")]),a._v(" "),s("li",[a._v("$!  Shell最后运行后台Process的PID")]),a._v(" "),s("li",[a._v("if test  #表达式为真")]),a._v(" "),s("li",[a._v("if test ! #表达式为假")]),a._v(" "),s("li",[a._v("test 表达式1 –a 表达式2  #两个表达式都为真")]),a._v(" "),s("li",[a._v("test 表达式1 –o 表达式2  #两个表达式有一个为真")]),a._v(" "),s("li",[a._v("test 表达式1 ! 表达式2  #条件求反")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("-b<文件>：如果文件为一个块特殊文件，则为真；\n-c<文件>：如果文件为一个字符特殊文件，则为真；\n-d<文件>：如果文件为一个目录，则为真；\n-e<文件>：如果文件存在，则为真；\n-f<文件>：如果文件为一个普通文件，则为真；\n-g<文件>：如果设置了文件的SGID位，则为真；\n-G<文件>：如果文件存在且归该组所有，则为真；\n-k<文件>：如果设置了文件的粘着位，则为真；\n-O<文件>：如果文件存在并且归该用户所有，则为真；\n-p<文件>：如果文件为一个命名管道，则为真；\n-r<文件>：如果文件可读，则为真；\n-s<文件>：如果文件的长度不为零，则为真；\n-S<文件>：如果文件为一个套接字特殊文件，则为真；\n-u<文件>：如果设置了文件的SUID位，则为真；\n-w<文件>：如果文件可写，则为真；\n-x<文件>：如果文件可执行，则为真。\n")])])]),s("h4",{attrs:{id:"管道命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#管道命令："}},[a._v("#")]),a._v(" 管道命令：")]),a._v(" "),s("p",[a._v("前命令输出是后命令的输入")]),a._v(" "),s("h4",{attrs:{id:"bc命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bc命令："}},[a._v("#")]),a._v(" bc命令：")]),a._v(" "),s("p",[a._v("交互型算术运算\nquit退出")]),a._v(" "),s("h3",{attrs:{id:"expr命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#expr命令："}},[a._v("#")]),a._v(" expr命令：")]),a._v(" "),s("ol",[s("li",[a._v("算数运算")]),a._v(" "),s("li",[a._v("数字与算数符要有空格隔开")]),a._v(" "),s("li",[a._v("当使用 * 号时 需要在前面加 转义符 \\ 或者用双引号")]),a._v(" "),s("li",[a._v("如 expr 2 * 3")])]),a._v(" "),s("p",[a._v("$((运算表达式)) 也可以进行运算，可用echo输出\n其中幂运算符是** 如echo $((2**2))  输出是 4")]),a._v(" "),s("p",[a._v("$[运算表达式] 方法与上一致")]),a._v(" "),s("p",[a._v("let 变量名=算数表达式\necho $变量名\n输出算术答案\nread 命令：\n键盘输入内容\n-p 提示语句\n-a 后跟一个变量，该变量会被认为是数组\n-n 后跟一个数字 定义输入文本长度\n-s 在屏幕输入不显示")]),a._v(" "),s("p",[a._v("循环判断：\n-le小于等于")]),a._v(" "),s("h1",{attrs:{id:"_4月24号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月24号上课内容"}},[a._v("#")]),a._v(" 4月24号上课内容")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("read 命令：\n键盘输入内容\n-p 提示语句\n-a 后跟一个变量，该变量会被认为是数组\n-n 后跟一个数字 定义输入文本长度\n-s 在屏幕输入不显示\n$REPLY 临时存放最近一次没有指定变量的内容\n \nif语句：\nif 和fi必须成对出现\n格式：\nif 测试条件\nthen 命令1\nelse 命令2\nfi\n判定方法：\nif test 条件\nif [ 测试条件 ]\nif [[ 测试条件 ]]\n \ntest的用法：\nif test  #表达式为真\nif test ! #表达式为假\ntest 表达式1 –a 表达式2  #两个表达式都为真\ntest 表达式1 –o 表达式2  #两个表达式有一个为真\ntest 表达式1 ! 表达式2  #条件求反\n \n-b<文件>：如果文件为一个块特殊文件，则为真；\n-c<文件>：如果文件为一个字符特殊文件，则为真；\n-d<文件>：如果文件为一个目录，则为真；\n-e<文件>：如果文件存在，则为真；\n-f<文件>：如果文件为一个普通文件，则为真；\n-g<文件>：如果设置了文件的SGID位，则为真；\n-G<文件>：如果文件存在且归该组所有，则为真；\n-k<文件>：如果设置了文件的粘着位，则为真；\n-O<文件>：如果文件存在并且归该用户所有，则为真；\n-p<文件>：如果文件为一个命名管道，则为真；\n-r<文件>：如果文件可读，则为真；\n-s<文件>：如果文件的长度不为零，则为真；\n-S<文件>：如果文件为一个套接字特殊文件，则为真；\n-u<文件>：如果设置了文件的SUID位，则为真；\n-w<文件>：如果文件可写，则为真；\n-x<文件>：如果文件可执行，则为真。\n \n多行注释：\n1. 首先按esc进入命令行模式下，按下Ctrl + v，进入列（也叫区块）模式;\n2. 在行首使用上下键选择需要注释的多行;\n3. 按下键盘（大写）“I”键，进入插入模式；\n4. 然后输入注释符（“//”、“#”等）;\n5. 最后按下“Esc”键。\n注：在按下esc键后，会稍等一会才会出现注释，不要着急~~时间很短的\n \n删除多行注释：\n1. 首先按esc进入命令行模式下，按下Ctrl + v, 进入列模式;\n2. 选定要取消注释的多行;\n3. 按下“x”或者“d”.\n注意：如果是“//”注释，那需要执行两次该操作，如果是“#”注释，一次即可\n \n长格式 ll 或 ls -l\n")])])]),s("h1",{attrs:{id:"_4月28号上课内容"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4月28号上课内容"}},[a._v("#")]),a._v(" 4月28号上课内容")]),a._v(" "),s("ol",[s("li",[a._v("-gt是大于")]),a._v(" "),s("li",[a._v("-lt是小于")]),a._v(" "),s("li",[a._v("-eq是等于")]),a._v(" "),s("li",[a._v("-ne是不等于")]),a._v(" "),s("li",[a._v("-ge是大于等于")]),a._v(" "),s("li",[a._v("-le是小于等于")])]),a._v(" "),s("blockquote",[s("p",[a._v("示例")])]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v('#!/bin/bash\nread -p "输入数值1" a\nread -p "输入数字2" b\nif [ $a -gt $b ]\nthen \n  echo "$a 大于 $b"\nelse\n  echo "$b 大于 $a"\nfi\n')])])]),s("h2",{attrs:{id:"at命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#at命令："}},[a._v("#")]),a._v(" at命令：")]),a._v(" "),s("p",[a._v("在用户指定的始课执行指定命令货命令序列\nat [选项] [时间]\nCtrl + D  结束at命令的输入")]),a._v(" "),s("h3",{attrs:{id:"选项："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#选项："}},[a._v("#")]),a._v(" 选项：")]),a._v(" "),s("p",[a._v("-m 当指定的任务被完成后，将给用户发送邮件，即使没有标准输出\n-c 打印任务内容到标准输出")]),a._v(" "),s("h3",{attrs:{id:"时间定义："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#时间定义："}},[a._v("#")]),a._v(" 时间定义：")]),a._v(" "),s("p",[a._v("格式hh:mm\n模糊词：midnight，noon，teatime等\n12小时制：12pm\n指定具体日期：month day（月 日），mm/dd/yy或dd.mm.yy，yy-mm-dd,mmddyy\n相对计时法：now+count time-units，now就是当前时间，time-units是时间单位，这里能够是minutes（分钟）、hours（小时）、days（天）、weeks（星期）。count是时间的数量，几天，几小时。例如：now + 5 minutes 04pm + 3 days\n直接使用：today（今天）、tomorrow（明天）来指定完成命令的时间")]),a._v(" "),s("h2",{attrs:{id:"相关命令："}},[s("a",{staticClass:"header-anchor",attrs:{href:"#相关命令："}},[a._v("#")]),a._v(" 相关命令：")]),a._v(" "),s("p",[a._v("atq：列出用户计划任务\natrm：根据jobnumber删除at任务\nbatch命令：在系统平均负载低于0.8时，立即执行成批命令货命令序列")]),a._v(" "),s("h3",{attrs:{id:"crontab命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#crontab命令"}},[a._v("#")]),a._v(" crontab命令")]),a._v(" "),s("p",[a._v("配置定时器，告诉提供定时器功能的cron守护进程让用户定时执行命令货命令序列")])])}),[],!1,null,null,null);t.default=v.exports}}]);