<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="path" :to="path"><slot></slot></RouterLink>
    <span v-else><slot></slot></span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ path?: string }>()
</script>

<style scoped lang='less'>
.xtx-bread-item {
  a {
    color: #666;
    transition: all 0.4s;
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>