<template>
  <div v-if="topCategories.result[route.params.id]">
    <div class="ref-goods" v-for="subCategory in topCategories.result[route.params.id]?.children" :key="subCategory.id">
      <div class="head">
        <h3>- {{ subCategory.name }} -</h3>
        <p class="tag">温暖柔软，品质之选</p>
        <XtxMore />
      </div>
      <div class="body">
        <GoodsItem :goods="goods" v-for="goods in subCategory.goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useCategoryStore } from '../../../stores/categoryStore'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const route = useRoute()
const categoryStore = useCategoryStore()
const { topCategories } = storeToRefs(categoryStore)
categoryStore.getTopCategoryById(route.params.id as string) //获取一级分类详细信息
onBeforeRouteUpdate((to) => categoryStore.getTopCategoryById(to.params.id as string))
</script>


<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>