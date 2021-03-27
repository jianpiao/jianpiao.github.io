(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{362:function(s,a,_){"use strict";_.r(a);var v=_(33),t=Object(v.a)({},(function(){var s=this,a=s.$createElement,_=s._self._c||a;return _("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[_("h1",{attrs:{id:"服务器端日常应用积累"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#服务器端日常应用积累"}},[s._v("#")]),s._v(" 服务器端日常应用积累")]),s._v(" "),_("p",[s._v("每次ssh链接服务器都要输入密码是很麻烦的事情，这个时候可以把本地公钥放在服务器的"),_("code",[s._v("authorized_key")]),s._v("中就，每次ssh链接就可以直接省略密码输入环节啦！")]),s._v(" "),_("p",[s._v("操作如下：")]),s._v(" "),_("ol",[_("li",[_("p",[s._v("先在本地生成公钥和私钥，然后复制公钥，即"),_("code",[s._v("id_rsa.pub")]),s._v("；")])]),s._v(" "),_("li",[_("p",[s._v("进入到服务器输入如下内容")]),s._v(" "),_("blockquote",[_("div",{staticClass:"language-bash extra-class"},[_("pre",{pre:!0,attrs:{class:"language-bash"}},[_("code",[_("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ~/.ssh\n"),_("span",{pre:!0,attrs:{class:"token function"}},[s._v("ls")]),s._v("\nauthorized_keys  id_rsa       known_hosts\nconfig            id_rsa.pub\n")])])]),_("p",[s._v("这个时候打开"),_("code",[s._v("authorized_keys")])]),s._v(" "),_("div",{staticClass:"language-bash extra-class"},[_("pre",{pre:!0,attrs:{class:"language-bash"}},[_("code",[_("span",{pre:!0,attrs:{class:"token function"}},[s._v("vi")]),s._v(" authorized_keys\n")])])]),_("p",[s._v("在下面添加对应的公钥就可以了~")])])])]),s._v(" "),_("h2",{attrs:{id:"ssh公钥和私钥生成方法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#ssh公钥和私钥生成方法"}},[s._v("#")]),s._v(" ssh公钥和私钥生成方法")]),s._v(" "),_("p",[s._v("一般工作中，会使用到ssh远程登录服务器，对于频繁访问的用户来说，每次登录都输入一次密码是极其繁琐的。而ssh公钥就可以实现不需要输入密码即登录到远程服务器。")]),s._v(" "),_("p",[s._v("使用公钥前，我们需要在本机中生成对应的公钥(public key)和私钥(private key)")]),s._v(" "),_("ol",[_("li",[_("p",[s._v("第一步在终端中切换到ssh目录")]),s._v(" "),_("div",{staticClass:"language-bash extra-class"},[_("pre",{pre:!0,attrs:{class:"language-bash"}},[_("code",[_("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" ~/.ssh   "),_("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#切换到ssh目录")]),s._v("\n")])])])]),s._v(" "),_("li",[_("p",[s._v("以rsa的加密方式生成秘钥对")]),s._v(" "),_("div",{staticClass:"language-bash extra-class"},[_("pre",{pre:!0,attrs:{class:"language-bash"}},[_("code",[s._v("ssh-keygen -t rsa  "),_("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#以rsa的加密方式生成秘钥对")]),s._v("\n")])])])]),s._v(" "),_("li",[_("p",[s._v("此时按照终端上显示的提示，输入私钥密码即可")])])]),s._v(" "),_("h3",{attrs:{id:"私钥和公钥的作用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#私钥和公钥的作用"}},[s._v("#")]),s._v(" 私钥和公钥的作用")]),s._v(" "),_("ol",[_("li",[s._v("很多服务器都是需要认证的，ssh认证是其中的一种。在客户端生成公钥，把生成的公钥添加到服务器中，你以后链接服务器就不需要每次都输入用户名和密码了。")]),s._v(" "),_("li",[s._v("很多git服务器都是用ssh认证方式，你需要把你生成的公钥发送给代码仓库管理员，让他给你添加到服务器上，你就可以通过ssh自由地拉取和提交代码了。")])]),s._v(" "),_("p",[_("strong",[s._v("公钥和私钥区别")])]),s._v(" "),_("ol",[_("li",[s._v("一个公钥对应着一个公钥")]),s._v(" "),_("li",[s._v("秘钥对中，一般把公钥公开，私钥只有自己本人知道")]),s._v(" "),_("li",[s._v("如果用其中一个密钥加密数据，则只有对应的那个秘钥才可以解密")]),s._v(" "),_("li",[s._v("如果用其中一个密钥进行解密数据，则该数据必然是对应的那个密钥进行的加密")])]),s._v(" "),_("h3",{attrs:{id:"公钥登录原理"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#公钥登录原理"}},[s._v("#")]),s._v(" 公钥登录原理")]),s._v(" "),_("p",[s._v("一般登录的流程就是在终端中输入如下命令")]),s._v(" "),_("div",{staticClass:"language-bash extra-class"},[_("pre",{pre:!0,attrs:{class:"language-bash"}},[_("code",[_("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 格式如下")]),s._v("\n"),_("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ssh root@host")]),s._v("\n"),_("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 下面举例")]),s._v("\n"),_("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" root@145.23.22.98\n")])])]),_("p",[s._v("主要有两种登录方式：")]),s._v(" "),_("ol",[_("li",[s._v("密码口令登录")]),s._v(" "),_("li",[s._v("公钥登录")])]),s._v(" "),_("p",[_("strong",[s._v("密码口令登录")])]),s._v(" "),_("p",[s._v("通过密码进行登录，主要流程为：")]),s._v(" "),_("p",[s._v("1、客户端连接上服务器之后，服务器把自己的公钥传给客户端")]),s._v(" "),_("p",[s._v("2、客户端输入服务器密码通过公钥加密之后传给服务器")]),s._v(" "),_("p",[s._v("3、服务器根据自己的私钥解密登录密码，如果正确那么就让客户端登录")]),s._v(" "),_("p",[_("strong",[s._v("公钥登录")])]),s._v(" "),_("p",[s._v("公钥登录是为了解决每次登录服务器都要输入密码的问题，流行使用RSA加密方案，主要流程包含：")]),s._v(" "),_("p",[s._v("1、客户端生成RSA公钥和私钥")]),s._v(" "),_("p",[s._v("2、客户端将自己的公钥存放到服务器")]),s._v(" "),_("p",[s._v("3、客户端请求连接服务器，服务器将一个随机字符串发送给客户端")]),s._v(" "),_("p",[s._v("4、客户端根据自己的私钥加密这个随机字符串之后再发送给服务器")]),s._v(" "),_("p",[s._v("5、服务器接受到加密后的字符串之后用公钥解密，如果正确就让客户端登录，否则拒绝。这样就不用使用密码了。")]),s._v(" "),_("h3",{attrs:{id:"rsa算法的作用"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#rsa算法的作用"}},[s._v("#")]),s._v(" RSA算法的作用")]),s._v(" "),_("ol",[_("li",[_("p",[s._v("加密：公钥加密，私钥解密")]),s._v(" "),_("p",[s._v("主要用于将数据资料加密不被其他人非法获取，保证数据安全性。使用公钥将数据资料加密，只有私钥可以解密。即使密文在网络上被第三方获取由于没有私钥则无法解密。从而保证数据安全性。")])]),s._v(" "),_("li",[_("p",[s._v("认证(签名)：私钥签名，公钥验证")]),s._v(" "),_("p",[s._v("主要用于身份验证，判断某个身份的真实性。使用私钥加密(签名)之后，用对应的公钥解密(验证)从而验证身份真实性。")])])]),s._v(" "),_("p",[_("strong",[s._v("SSH公钥登录其实使用的就是第二种认证方式。")])]),s._v(" "),_("blockquote",[_("p",[s._v("加深理解：")]),s._v(" "),_("p",[s._v("RSA既然是加密，那肯定是不希望别人知道我的消息，所以只有我才能解密，所以可得出"),_("strong",[s._v("公钥负责加密，私钥负责解密")]),s._v("；同理，既然是签名，那肯定是不希望有人冒充我发消息，只有我才能发布这个签名，所以可得出"),_("strong",[s._v("私钥负责签名，公钥负责验证")]),s._v("。")])])])}),[],!1,null,null,null);a.default=t.exports}}]);