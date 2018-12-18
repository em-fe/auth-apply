const path = require('path');

const resolve = p => path.resolve(__dirname, '../../', p);

const base = process.env.GH ? '/auth-applay/' : '/'

module.exports = {
  title: '权限申请',
  base,
  head: [
    ['link', { rel: 'menu', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  configureWebpack: {
    resolve: {
      alias: {
        helper: resolve('emauthapplay/helper'),
        assets: resolve('emauthapplay/assets'),
        message: resolve('emauthapplay/core/message'),
      }
    }
  },
  themeConfig: {
    repo: 'em-fe/authapplay',
    editLinks: false,
    docsDir: 'site',
    lastUpdated: '上次更新', // string | boolean
    searchMaxSuggestions: 5,
    editLinkText: '帮助我们改善此页面！',
    sidebar: [
      '/',
      '/authapplay',
    ]
  }
}
