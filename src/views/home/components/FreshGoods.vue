<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <template v-slot:right>
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul class="goods-list" ref="target">
        <li v-for="item in freshGoods.result" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" :alt="item.name" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <Transition name="fade">
        <HomeSkeleton v-if="freshGoods.status === 'loading'" />
      </Transition>
    </template>
  </HomePanel>
</template>

<script lang='ts' setup>
import { useHomeStore } from '../../../stores/homeStore'
import { storeToRefs } from 'pinia'
import useLazyLoad from '../../../logics/useLazyLoad'
const homeStore = useHomeStore()
const { freshGoods } = storeToRefs(homeStore)
const { getFreshGoods } = homeStore
const target = useLazyLoad(getFreshGoods)
getFreshGoods()
</script>


<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>