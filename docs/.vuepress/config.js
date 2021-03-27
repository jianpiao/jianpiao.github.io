module.exports = {
  title: 'smallzip‘s Blog',
  description: 'smallzip 个人博客',
  themeConfig: {
    nav: [{
        text: '首页',
        link: '/'
      },
      {
        text: '简书',
        link: 'https://www.jianshu.com/u/e0d0e6cb34d2'
      },
      {
        text: '掘金',
        link: 'https://juejin.im/user/5a68b1945188256922633d02'
      },
      {
        text: 'Github',
        link: 'https://github.com/jianpiao'
      },
    ],
    sidebar: [{
        title: '《javascript高级程序设计》笔记',
        path: '/《javascript高级程序设计》笔记',
      },
      {
        title: 'javascript技术积累',
        path: '/javascript技术积累',
      },
      // {
      //   title: 'guide',
      //   path: '/guide/',
      //   children:[

      //   ]
      // },
      {
        title: 'linux笔记',
        path: '/linux笔记'
      },
      {
        title: 'linux课堂代码案例',
        path: '/linux课堂代码案例',
      },
      {
        title: '算法学习笔记',
        path: '/算法学习笔记'
      },
      {
        title: 'js数据结构与算法',
        path: '/js数据结构与算法'
      },
      {
        title: 'javascript设计模式',
        path: '/javascript设计模式'
      },
      {
        title: '了解HTTP',
        path: '/了解HTTP'
      },
      {
        title: 'Flutter学习笔记',
        path: '/Flutter学习笔记'
      },
      {
        title: 'css学习笔记',
        path: '/css学习笔记'
      }, {
        title: 'Vue',
        path: '/Vue'
      },
      {
        title: 'React记录',
        path: '/React'
      },
      {
        title: 'React-Native记录',
        path: '/React-Native'
      },
      {
        title: '小程序笔记',
        path: '/小程序记录'
      }, {
        title: 'Git',
        path: '/Git学习'
      },
      {
        title: 'Webpack',
        path: '/webpack'
      },
      {
        title: 'js正则积累',
        path: '/js正则积累'
      },
      {
        title: '前端题目练习',
        path: '/前端题目练习'
      },
      {
        title: '服务器端积累',
        path: '/服务器端积累'
      },
      {
        title: '计算机基础',
        path: '/计算机基础'
      },
      {
        title: '网络基础',
        path: '/网络基础知识'
      },
      {
        title: '基础面试知识积累',
        path: '/基础面试要点知识',
      },
    ],
    lastUpdated: 'Last Updated', // string | boolean
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true
  }
}