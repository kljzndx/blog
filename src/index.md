---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "欢迎访问本博客"
  text: "望您能不虚此行"
  tagline: 乐在此心，方得安宁
  actions:
    - theme: brand
      text: 简历
      link: /about/
    - theme: alt
      text: 邮箱
      link: mailto:kljzndx@outlook.com
---

<script setup lang="ts">
    import CategoryPanel from './components/CategoryPanel.vue'
    
</script>

<CategoryPanel />