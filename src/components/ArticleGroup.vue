<script setup lang="ts">
import { computed } from 'vue';
import { withBase } from 'vitepress';

import ArticleList from './ArticleList.vue';

interface Props {
    items: {
        url: string,
        publishDate: string,
        title: string
    }[],
    isDescending: boolean,
    title: string,
    url: string,
}

const props = withDefaults(defineProps<Props>(), {
    isDescending: true,
    title: "无标题"
})

const url = computed(() => withBase(props.url))

</script>

<template>
    <div :class="$style['acs-group']">
        <div :class="$style.header">
            <h3>{{ props.title }}</h3>
            <a :href="url">更多>>></a>
        </div>
        <div :class="$style['acs-container']">
            <ArticleList :source="props.items" :isDescending="props.isDescending" takeNumber="10" />
        </div>
    </div>
</template>

<style module>
.acs-group {
    width: 22rem;
    background-color: var(--vp-c-gray-2);
    border: 1rem solid var(--vp-c-gray-2);
    border-radius: 1rem;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 1rem 0;
}
.header>h3 {
    margin: 0;
}
.acs-container {
    background-color: var(--vp-c-neutral-inverse);
}
</style>
