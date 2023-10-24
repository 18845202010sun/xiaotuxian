<template>
  <div class="container">
    <TopCategoryBread/>
     <XtxCarousel
      v-if="banners.status === 'success'"
      :carousels="banners.result"
      style="height: 500px"
      :count="banners.result.length"
    >
     <template
        v-for="(item, index) in banners.result"
        :key="item.id"
        v-slot:[`default-${index}`]
      >
        <RouterLink :to="item.hrefUrl">
          <img :src="item.imgUrl" :alt="item.imgUrl" />
        </RouterLink>
      </template>
    </XtxCarousel>
     <AllSubCategories />
     <RecommendsGoods />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import {useHomeStore} from '../../stores/homeStore'
const homeStore=useHomeStore()
const { banners } = storeToRefs(homeStore);
const {getBanners}=homeStore
getBanners(2)
</script>

<style scoped>
</style>