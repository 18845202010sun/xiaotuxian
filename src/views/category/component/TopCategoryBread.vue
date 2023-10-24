<template>
  <XtxBread>
    <XtxBreadItem path="/">首页</XtxBreadItem>
    <transition name="fade-right" mode="out-in">
      <XtxBreadItem :key="target?.id">{{ target?.name }}</XtxBreadItem>
    </transition>
  </XtxBread>
</template>

<script setup lang="ts">
import { useCategoryStore } from '../../../stores/categoryStore'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const categoryStore = useCategoryStore()
const route = useRoute()
const target = computed(() => categoryStore.currentTop(route.params.id as string))
//获取
</script>

<style scoped>
</style>