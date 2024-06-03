import { defineConfig } from 'vitepress'
import sidebarLoader from "./sidebarLoader"
import { readFile } from 'node:fs/promises'

async function setup() {
  const icon_bili = await readFile('public/img/bilibili.svg', 'utf-8');

  return defineConfig({
    sitemap: {
      hostname: "https://kljzndx.github.io/blog/",
      lastmodDateOnly: true,
    },
    base: "/blog/",
    srcDir: "src/",
    vite: {
      publicDir: '../public/'
    },

    title: "快乐就在你的心 的博客",
    description: "快乐就在你的心 的博客",
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: '主页', link: '/' },
        { text: '微博', link: '/micro/' },
        { text: '技术', link: '/tech/' },
        { text: '自传', link: '/life/' },
      ],

      sidebar: {
        "/micro/": await sidebarLoader.loadAsDateTree("/micro/", true, true),
        "/tech/": await sidebarLoader.loadAsDateTree("/tech/", true),
        "/life/": await sidebarLoader.loadAsDateTree("/life/"),
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/kljzndx/blog', ariaLabel: 'Github' },
        {
          icon: { svg: icon_bili },
          link: 'https://space.bilibili.com/27062443',
          ariaLabel: 'B站 (BiliBili)'
        }
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
          pageData.frontmatter.publishDate = fn.slice(0, 10);
      }

      // 禁用内置时间显示控件
      pageData.frontmatter.lastUpdated = false;
    },
  })
}

export default await setup()
