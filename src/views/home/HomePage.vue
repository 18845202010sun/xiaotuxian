<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomePanel title="主标题" subTitle="副标题">
    <template v-slot:default> 内容 </template>
    <template v-slot:right>
      <XtxMore />
    </template>
  </HomePanel>
  <FreshGoods />
  <HotRecommends />
  <HotBrands />
   <HomeGoods />
   <HomeSpecial />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
//要监听得元素
const target = ref<HTMLDivElement>()
//监听元素
const { stop } = useIntersectionObserver(
  target,function([{isIntersecting}]){
    // 该函数会在页面初始化时执行、在 target 元素进入、离开可视区时执行
    // isIntersecting: 布尔类型, 元素进入可视区为true, 元素离开可视区为false
    if(isIntersecting) stop()
  }
)
</script>

<style lang="less">
</style>