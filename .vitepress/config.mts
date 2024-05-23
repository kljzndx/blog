import { defineConfig } from 'vitepress'
import sidebarLoader from "./sidebarLoader"

async function setup(){
  return defineConfig({
    srcDir: "src/",
    title: "My Awesome Project",
    description: "A VitePress Site",
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
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      ],
    },
  })
}

export default await setup()
