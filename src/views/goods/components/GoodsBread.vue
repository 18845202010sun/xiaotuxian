<template>
  <XtxBread>
    <XtxBreadItem path="/"> 首页 </XtxBreadItem>
    <XtxBreadItem :path="`/category/${goodsInfo.result.categories[1].id}`">
      {{ goodsInfo.result.categories[1].name }}
    </XtxBreadItem>
    <XtxBreadItem
      :path="`/category/sub/${goodsInfo.result.categories[1].id}/${goodsInfo.result.categories[0].id}`"
    >
      {{ goodsInfo.result.categories[0].name }}
    </XtxBreadItem>
    <XtxBreadItem>
      {{ goodsInfo.result.name }}
    </XtxBreadItem>
  </XtxBread>
</template>

<script setup lang="ts">
import { useGoodsStore } from "../../../stores/GoodsStore";
const goodsStore=useGoodsStore()
const {goodsInfo}=goodsStore


</script>

<style scoped>

</style>