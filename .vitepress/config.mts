import { defineConfig } from 'vitepress'
import sidebarLoader from "./sidebarLoader"

async function setup() {
  return defineConfig({
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
    },
    lastUpdated: true,
    transformPageData(pageData) {
      if (pageData.frontmatter.publishDate == undefined) {
        const rp = pageData.relativePath
        const fn = rp.slice(rp.lastIndexOf('/') + 1, rp.lastIndexOf('.'));
        if (fn.match(/\d{4}\-\d{2}\-\d{2}\-.+/))
          pageData.frontmatter.publishDate = fn.slice(0, fn.lastIndexOf('-'));
      }

      pageData.frontmatter.lastUpdated = false;
    },
  })
}

export default await setup()
