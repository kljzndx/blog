<script setup lang="ts">
import { withBase } from 'vitepress';
import { computed } from 'vue';

interface Props {
    source: {
        url: string,
        publishDate: string,
        title: string
    }[],
    isDescending: boolean,
    takeNumber?: number
}

const props = defineProps<Props>();

const endId = computed(() => props.takeNumber == 0 ? undefined : props.takeNumber);
const source = computed(() => {
    let result = [...props.source];
    if (props.isDescending)
        result = result.reverse();

    result = result.slice(0, endId.value);
    return result;
});
</script>

<template>
    <div :class="$style['article-list']">
        <ul :class="$style['acs-list']">
            <li :class="$style['ac-item']" v-for="item of source" :key="item.url">
                <span style="font-family: sans-serif; margin-right: 1em;">{{ item.publishDate }}</span>
                <a :href="withBase(item.url)"> {{ item.title }} </a>
            </li>
        </ul>
    </div>
</template>

<style module>
.article-list ul.acs-list {
    margin: 0;
    padding: 0.5rem;
}

.article-list li.ac-item{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>