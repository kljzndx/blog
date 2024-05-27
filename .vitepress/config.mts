import { defineConfig } from 'vitepress'
import sidebarLoader from "./sidebarLoader"

async function setup() {
  return defineConfig({
    sitemap: {
      hostname: "https://kljzndx.github.io/blog/",
      lastmodDateOnly: true,
    },
    base: "/blog/",
    srcDir: "src/",
    title: "快乐就在你的心 的博客",
    description: "快乐就在你的心 的博客",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Technology', link: '/tech/' }
      ],

      sidebar: {
        "/tech/": await sidebarLoader.loadAsDateTree("/tech/")
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/kljzndx/blog' }
      ],

      darkModeSwitchLabel: '主题',
      darkModeSwitchTitle: '切换至 夜间模式',
      lightModeSwitchTitle: '切换至 日间模式',
      docFooter: {
        prev: '上一页',
        next: '下一页'
      },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '目录',
    },
    lastUpdated: true,
    transformPageData(pageData) {
      if (pageData.frontmatter.publishDate == undefined) {
        const rp = pageData.relativePath
        const fn = rp.slice(rp.lastIndexOf('/') + 1, rp.lastIndexOf('.'));
        if (fn.match(/\d{4}\-\d{2}\-\d{2}\-.+/))
          pageData.frontmatter.publishDate = fn.slice(0, fn.lastIndexOf('-'));
      }

      // 禁用内置时间显示控件
      pageData.frontmatter.lastUpdated = false;
    },
  })
}

export default await setup()
