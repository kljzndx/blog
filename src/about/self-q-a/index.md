<script setup lang="ts">
    import { data } from './selfqa.data.ts'
    import ArticleList from '../../components/ArticleList.vue'
</script>

# 情绪回收站

此板块是我的一个实验场所，专门试验有关情绪释放的方法论的，目前在试验《一念之转》中的方法论

由于主要目的是情绪释放，所以本版块内容都不一定真实可信，同时有可能会言论过激

::: info 文章目录（时间降序）

<ArticleList :source="data" isDescending />

:::