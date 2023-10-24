<template>
  <ul>
    <li v-for="goods in goodsList" :key="goods.id">
      <GoodsItem :goods="goods" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Goods } from "../../../types/Goods";
defineProps<{ goodsList: Goods[] }>();
</script>

<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>