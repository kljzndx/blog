<script setup lang="ts">
import ArticleGroup from './ArticleGroup.vue'

import { data as Dmicro } from '../micro/micro.data.ts'
import { data as Dtech } from '../tech/tech.data.ts'
import { data as Dlife } from '../about/life/life.data.ts'

const data = [
    {
        title: "微博",
        url: "micro/",
        items: Dmicro,
    },
    {
        title: "技术",
        url: "tech/",
        items: Dtech,
    },
    {
        title: "自传",
        url: "about/life/",
        items: Dlife,
    },
]

</script>

<template>
    <div :class="$style['category-panel']">
        <ul :class="$style['cate-panel']">
            <li :class="$style['cate-item']" v-for="e of data">
                <ArticleGroup :items="e.items" :title="e.title" :url="e.url" />
            </li>
        </ul>
    </div>
</template>

<style module>
.category-panel ul.cate-panel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.category-panel li.cate-item {
    list-style: none;
}

.category-panel li.cate-item+li {
    margin: 0;
}
</style>