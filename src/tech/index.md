<script setup lang="ts">
    import {data} from './tech.data.ts'
    import ArticleList from '../components/ArticleList.vue'
</script>

# 测试主页

::: details 文章目录（时间降序）

<ArticleList :source="data" isDescending />

:::