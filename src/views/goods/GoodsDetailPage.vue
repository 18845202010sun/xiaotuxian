<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goodsInfo.status === 'success'">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem path="/">手机</XtxBreadItem>
        <XtxBreadItem path="/">华为</XtxBreadItem>
        <XtxBreadItem path="/">p30</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <!-- 左侧 -->
        <div class="media">
          <GoodsImages />
          <GoodsSales />
        </div>
        <!-- 右侧 -->
        <div class="spec">
          <GoodsInfo />
          <GoodsSku :specs="goodsInfo.result.specs" @complete="goodsStore.updateGoods($event); skuId = $event.skuId;" @uncomplete="skuId = undefined"/>
        </div>
      </div>
      <!-- 同类商品 -->
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜 -->
        <div class="goods-aside"></div>
      </div>
    </div>
    <div class="container loading-container" v-if="goodsInfo.status === 'loading'">
      <img src="@/assets/images/loading.gif" alt="" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useGoodsStore } from '../../stores/GoodsStore'
const goodsStore = useGoodsStore()
const { goodsInfo } = storeToRefs(goodsStore)
const { getGoodsInfo } = goodsStore
const route = useRoute()
const skuId= ref<string | undefined>();
getGoodsInfo(route.params.id as string)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
onBeforeRouteUpdate((to) => getGoodsInfo(route.params.id as string))
</script>


<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  background: #fff;
}
</style>