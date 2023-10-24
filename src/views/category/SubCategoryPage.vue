<template>
  <div class="container">
    <SubCategoryBread />
    <SubCategoryFilter
      @onChanged="updateFilterParams($event),sendRequest()"
    />
  </div>
  <div class="goods-list">
    <SubCategorySort
      @onChanged="
        updateSortParams($event),
        sendRequest()
      "
    />
    <GoodsList :goodsList="categoryGoods.result.items" />
    <XtxInfiniteLoading
      @infinite="loadMore"
      :loading="categoryGoods.status === 'loading'"
      :finished="categoryGoods.status === 'finished'"
    />
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '../../stores/categoryStore'
import type { GoodsRequestParams } from '../../types/Goods'
const categoryStore = useCategoryStore()
const route = useRoute()
const { categoryGoods } = storeToRefs(categoryStore)
const { getCategoryGoods } = categoryStore

// 用于存储筛选条件
let filterParams = {}
// 用于存储排序条件
let sortParams = {}
// 用于存储分页数据
let pageParams = { page: 1, pageSize: 20 }
// 用于更新筛选条件
function updateFilterParams(params: Partial<GoodsRequestParams>) {
  filterParams = params
}
// 用于更新排序条件
function updateSortParams(params: Partial<GoodsRequestParams>) {
  sortParams = params
}
// 获取请求参数
function getReqParams() {
  return { ...filterParams, ...sortParams, ...pageParams }
}
// 用于发送请求获取商品列表
function sendRequest() {
  // 合并请求参数
  const reqParams = getReqParams()
  // 发送请求获取商品列表
  getCategoryGoods(route.params.sub as string, reqParams)
  // 筛选条件、排序条件发生变化 重置页码
  pageParams.page = 1
  // 重置请求状态
  categoryGoods.value.status = 'loading'
}
// 初始获取商品列表数据
sendRequest()
// 加载更多商品
function loadMore() {
  // 累加页码
  pageParams.page = pageParams.page + 1
  // 获取请求参数
  const reqParams = getReqParams()
  // 发送请求获取商品列表
  getCategoryGoods(route.params.sub as string, reqParams)
}
// 路由发生变化时
onBeforeRouteUpdate((to) => {
  // 重置筛选条件
  filterParams = {}
  // 重置排序条件
  sortParams = {}
  // 重置页码
  pageParams.page = 1
  // 重置请求加载状态
  categoryGoods.value.status = 'loading'
  // 获取请求参数
  const reqParams = getReqParams()
  // 发送请求获取商品列表
  getCategoryGoods(to.params.sub as string, reqParams)
})
</script>

<style scoped>
</style>