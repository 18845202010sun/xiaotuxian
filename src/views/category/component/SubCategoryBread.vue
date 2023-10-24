<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <XtxBreadItem :path="`/category/${target.topCategory?.id}`">
      {{ target.topCategory?.name }}
    </XtxBreadItem>
    <XtxBreadItem>
      {{ target.subCategory?.name }}
    </XtxBreadItem>
  </XtxBread>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '../../../stores/categoryStore'
const route = useRoute()
const categoryStore = useCategoryStore()
const target = computed(() =>
  categoryStore.currentTopAndSub(route.params.top as string, route.params.sub as string)
)
</script>

<style scoped>
</style>