module.exports = {
  title: 'smallzip‘s blog',
  description: 'smallzip 个人博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/guide/' },
      { text: 'Github', link: 'https://github.com/jianpiao' },
    ],
    sidebar: [
      {
        title: '《javascript高级程序设计》笔记',
        path: '/《javascript高级程序设计》笔记',
      },
      {
        title: 'javascript技术积累',
        path: '/javascript技术积累',
      },
      {
        title: '基础面试要点知识',
        path: '/基础面试要点知识',
      },
      {
        title: 'guide',
        path: '/guide/',
        children:[
          
        ]
      },
      {
        title: 'linux知识点',
        path: '/linux/',
        children: [
          [
            '/linux/3月27号linux上课内容',
            '3月27号linux上课内容'
          ],
          [
            '/linux/3月31号上课内容',
            '3月31号上课内容'
          ],
          [
            '/linux/4月3号linux上课内容',
            '4月3号linux上课内容'
          ],
          [
            '/linux/4月7号上课内容',
            '4月7号上课内容'
          ],
          [
            '/linux/4月10号上课内容',
            '4月10号上课内容'
          ],
          [
            '/linux/4月14号上课内容',
            '4月14号上课内容'
          ],
          [
            '/linux/4月17号上课内容',
            '4月17号上课内容'
          ],
          [
            '/linux/4月21号上课内容',
            '4月21号上课内容'
          ],
          [
            '/linux/4月24上课内容',
            '4月24上课内容'
          ],
          [
            '/linux/4月28号上课内容',
            '4月28号上课内容'
          ],
        ]
      },
      {
        title: 'linux课堂代码案例',
        path: '/linux课堂代码案例',
      },
      {
        title:'算法',
        path:'/算法/',
        children:[
          [
            '/算法/二分查找',
            '二分查找'
          ]
        ]
      }
    ],
    lastUpdated: 'Last Updated', // string | boolean
    // 默认值是 true 。设置为 false 来禁用所有页面的 下一篇 链接
    nextLinks: true,
    // 默认值是 true 。设置为 false 来禁用所有页面的 上一篇 链接
    prevLinks: true
  }
}