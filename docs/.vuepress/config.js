module.exports = {
  themeConfig: {
    title: 'smallzip blog',
    description: 'smallzip个人博客',
    displayAllHeaders: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jianpiao' },
    ],
    sidebar: [
      [
        '/javascript高程笔记',
        'javascript高程笔记'
      ],
      [
        '/javascript技术积累',
        'javascript技术积累'
      ],
      [
        '/基础面试要点知识',
        '基础面试要点知识'
      ]
    ],
    lastUpdated: 'Last Updated', // string | boolean
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true
  }
}