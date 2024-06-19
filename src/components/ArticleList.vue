<script setup lang="ts">
import { withBase } from 'vitepress';
import { computed } from 'vue';

interface Props {
    source: {
        url: string,
        publishDate: string,
        title: string
    }[]
    isDescending: boolean
}

const props = defineProps<Props>();

const source = computed(() => props.isDescending ? [...props.source].reverse() : [...props.source]);
</script>

<template>
    <ul>
        <li v-for="item of source" :key="item.url">
            <span style="font-family: sans-serif; margin-right: 1em;">{{ item.publishDate }}</span>
            <a :href="withBase(item.url)"> {{ item.title }} </a>
        </li>
    </ul>
</template>