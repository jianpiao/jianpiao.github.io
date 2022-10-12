module.exports = {
  title: "smallzip‘s Blog",
  description: "smallzip 个人博客",
  themeConfig: {
    nav: [
      {
        text: "首页",
        link: "/",
      },
      {
        text: "简书",
        link: "https://www.jianshu.com/u/e0d0e6cb34d2",
      },
      {
        text: "掘金",
        link: "https://juejin.im/user/5a68b1945188256922633d02",
      },
      {
        text: "Github",
        link: "https://github.com/jianpiao",
      },
    ],
    sidebar: [
      {
        title: "《javascript高级程序设计》笔记",
        path: "/《javascript高级程序设计》笔记",
      },
      {
        title: "javascript技术积累",
        collapsable: true,
        children: [
          "/javascript技术积累/日常积累",
          "/javascript技术积累/深入浅出koa-static",
          "/javascript技术积累/深入事件循环和定时器",
          "/javascript技术积累/Node、node-watch、Chokidar实现文件监听封装思路解析",
          "/javascript技术积累/探索nodemon的实现",
        ],
      },
      {
        title: "linux笔记",
        path: "/linux笔记",
      },
      {
        title: "linux课堂代码案例",
        path: "/linux课堂代码案例",
      },
      {
        title: "算法学习笔记",
        path: "/算法学习笔记",
      },
      {
        title: "js数据结构与算法",
        path: "/js数据结构与算法",
      },
      {
        title: "javascript设计模式",
        path: "/javascript设计模式",
      },
      {
        title: "了解HTTP",
        path: "/了解HTTP",
      },
      {
        title: "Flutter学习笔记",
        path: "/Flutter学习笔记",
      },
      {
        title: "css学习笔记",
        path: "/css学习笔记",
      },
      {
        title: "Vue",
        children: [
          "/vue/vue手动实现一个简易版subscribeAction",
          "/vue/Vue积累",
          "/vue/vue的nextTick原理",
          "/vue/Vue源码的奥秘"
        ]
      },
      {
        title: "React记录",
        children: [
          "/react/reacthook",
          "/react/生命周期",
          "/react/React",
          "/react/setState更新是同步还是异步",
        ],
      },
      {
        title: "React-Native记录",
        path: "/React-Native",
      },
      {
        title: "小程序笔记",
        path: "/小程序记录",
      },
      {
        title: "Git",
        children: ["/Git/Git学习", "/Git/git规范"],
      },
      {
        title: "Webpack",
        path: "/webpack",
      },
      {
        title: "js正则积累",
        path: "/js正则积累",
      },
      {
        title: "前端题目练习",
        path: "/前端题目练习",
      },
      {
        title: "服务器端积累",
        children: ["/服务器端积累/服务器端积累", "/服务器端积累/MySQL索引原理", "/服务器端积累/docker笔记"],
      },
      {
        title: "计算机基础",
        path: "/计算机基础",
      },
      {
        title: "网络基础",
        path: "/网络基础知识",
      },
      {
        title: "基础面试知识积累",
        path: "/基础面试要点知识",
      },
    ],
    // 展开侧栏所有内容
    displayAllHeaders: false,
    // 启动夜间模式
    darkMode: true,
    // 最大展开的深度
    sidebarDepth: 1,
    lastUpdated: "Last Updated", // string | boolean
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true,
    // 页面滚动效果
    smoothScroll: true,
  },
};
