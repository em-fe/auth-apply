const base = process.env.GH ? '/auth-apply/' : '/'

module.exports = {
  title: '权限申请',
  base,
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ],
  dest: './docs',
  serviceWorker: true,
  themeConfig: {
    repo: 'em-fe/authapply',
    editLinks: false,
    searchMaxSuggestions: 5,
    docsDir: 'emauthapply',
    editLinkText: '帮助我们改善此页面！',
    sidebar: [
      '/',
      '/authapply/zh-cn',
    ]
  }
}
