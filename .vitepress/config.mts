import { defineConfig } from 'vitepress'
import { readFile } from 'node:fs/promises'
import sidebarLoader from "./sidebarLoader"
import tools from './tools'

import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import minJpg from 'imagemin-mozjpeg'
import minPng from 'imagemin-pngquant'
import minGif from 'imagemin-gifsicle'

async function setup() {
  const icon_bili = await readFile('src/p-img/bilibili.svg', 'utf-8');

  return defineConfig({
    sitemap: {
      hostname: "https://kljzndx.github.io/blog/",
      lastmodDateOnly: true,
    },
    lang: "zh-CN",
    base: "/blog/",
    srcDir: "src/",
    vite: {
      publicDir: '../public/',
      plugins:[
        viteImagemin({
          plugins:{
            jpg: minJpg({
              quality:80
            }),
            png: minPng({
              quality:[0.7, 0.8],
              speed:8
            }),
            gif: minGif({
              optimizationLevel:2
            })
          },
          root:'../'
        })
      ],
    },

    title: "快乐就在你的心 的博客",
    description: "快乐就在你的心 的博客",
    head: [
      ['link', { rel: 'icon', href: '/blog/favicon.ico' }],
      ['script', {async:'', src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js'}]
    ],
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      footer:{
        message: '<span id="busuanzi_container_site_pv">本站总访问量 <span id="busuanzi_value_site_pv"></span> 次</span>，<span id="busuanzi_container_site_uv">本站总访客量 <span id="busuanzi_value_site_uv"></span> 人</span>'
      },
      nav: [
        { text: '主页', link: '/' },
        { text: '微博', link: '/micro/' },
        { text: '技术', link: '/tech/' },
        { text: '关于作者', link: '/about/life/' },
      ],

      sidebar: {
        "/micro/": await sidebarLoader.loadAsCategories("/micro/"),
        "/tech/": await sidebarLoader.loadAsCategories("/tech/"),
        "/about/": [
          ...(await sidebarLoader.loadAsCategories("/about/")), 
          {
            text:'更多信息',
            items:[
              {
                text:'我的自传',
                link:'/about/life/',
              },
              {
                text:'我的导航',
                link:'https://kljzndx.github.io/navigation/',
              }
            ]
          }
        ],
        "/about/life/": await sidebarLoader.loadAsDateTree("/about/life/"),
        "/about/self-q-a/": await sidebarLoader.loadAsCategories("/about/self-q-a/"),
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/kljzndx/blog', ariaLabel: 'Github' },
        {
          icon: { svg: icon_bili },
          link: 'https://space.bilibili.com/27062443',
          ariaLabel: 'B站 (BiliBili)'
        }
      ],

      logo: "/logo.png",
      darkModeSwitchLabel: '主题',
      darkModeSwitchTitle: '切换至 夜间模式',
      lightModeSwitchTitle: '切换至 日间模式',
      docFooter: {
        prev: '上一页',
        next: '下一页'
      },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '板块目录',
      outline: {
        label: '文章目录',
        level: 'deep'
      },
      lastUpdated: {
        text: '最后编辑于',
      },
    },
    lastUpdated: true,
    transformPageData(pageData) {
      if (pageData.frontmatter.publishDate == undefined) {
        const pubDate = tools.getPubDateOnPath(pageData.relativePath);

        if (pubDate)
          pageData.frontmatter.publishDate = pubDate;
      }

      // 禁用内置时间显示控件
      pageData.frontmatter.lastUpdated = false;
    },
  })
}

export default await setup()
