import { defineConfig } from 'vitepress'
import sidebarLoader from "./sidebarLoader"

async function setup(){
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
  })
}

export default await setup()
