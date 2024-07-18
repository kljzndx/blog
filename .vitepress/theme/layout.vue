<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed, onMounted, ref, watchEffect } from 'vue';

const { Layout } = DefaultTheme;
const { frontmatter, page } = useData();

/* copy from https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDocFooterLastUpdated.vue */
const last = computed(() => new Date(page.value.lastUpdated!))
const lastDate = ref('');

onMounted(() => {
    watchEffect(() => {
        lastDate.value = new Intl.DateTimeFormat('zh-cn', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).formatToParts(last.value).filter(m => m.type != 'literal').map(m => m.value).join('-');
    })
})

</script>
<template>
    <Layout>
        <template #doc-before>
            <div class="article-date">
                <p v-if="frontmatter.publishDate">发布时间：{{ frontmatter.publishDate }}</p>
                <p>更新时间：{{ lastDate }}</p>
                <p id="busuanzi_container_page_pv" style="display: none;">本文章访问量：<span id="busuanzi_value_page_pv"></span>次</p>
            </div>
        </template>
    </Layout>
</template>
<style scoped>
.article-date {
    display: flex;
    column-gap: 1rem;
    justify-content: end;

/* copy from https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/components/VPDocFooterLastUpdated.vue */
    color: var(--vp-c-text-2);
    line-height: 24px;
    font-size: 14px;
    font-weight: 500;
}
@media (min-width: 640) {
    .article-date{
        line-height: 32px;
    }
}
</style>