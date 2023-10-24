import { HomeAPI } from "@/api/HomeAPI";
import type { Brands } from "@/types/Brands";
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Banner } from "@/types/Banner";
import type { Status } from "@/types/Status";
import type { Goods } from "@/types/Goods";
import type { Category } from "@/types/Category";
import type { HotRecommends } from "../types/HotRecommends";
import type { Special } from "@/types/Special";
type brands = {
  result: Brands[];
  status: Status,
}
type freshGoods = {
  result: Goods[];
  status: Status,
}
type banners = {
  result: Banner[];
  status: Status,
}
type hotRecommends = {
  result: HotRecommends[];
  status: Status,
}
type goods = {
  result: Category[];
  status: Status,
}
type specials = {
  result: Special[];
  status: Status,
}
type getBrands = (limit?: number) => Promise<void>
type getFreshGoods = (limit?: number) => Promise<void>
type getBanners = (distributionSite?: 1 | 2) => Promise<void>
type getHotRecommends = (distributionSite?: 1 | 2) => Promise<void>
type getGoods = () => Promise<void>
type getSpecial = (limit?: number) => Promise<void>

export const useHomeStore = defineStore('home', () => {
  const brands = ref<brands>({
    result: [],
    status: "idle"
  })
  const banners = ref<banners>({
    result: [],
    status: "idle"
  })
  const freshGoods = ref<freshGoods>({
    result: [],
    status: "idle"
  })
  const hotRecommends = ref<hotRecommends>({
    result: [],
    status: "idle"
  })
  const goods = ref<goods>({
    result: [],
    status: "idle"
  })
  const specials = ref<specials>({
    result: [],
    status: "idle"
  })

  //获取推荐品牌
  const getBrands: getBrands = async (limit = 10) => {
    brands.value.status = 'loading'
    // 捕获错误
    try {
      // 发送请求获取推荐品牌数据
      const response = await HomeAPI.getHotBrands(limit);
      if (response) {
        brands.value.result = response.result;
      }
      brands.value.status = "success";
    } catch (e) {
      brands.value.status = "error";
    }
  }
  //轮播
  const getBanners: getBanners = async (distributionSite = 1) => {
    banners.value.status = 'loading'
    // 捕获错误
    try {
      // 发送请求获取推荐品牌数据
      const response = await HomeAPI.getBanners(distributionSite);
      // 存储推荐品牌数据
      if (response) {
        banners.value.result = response.result;
      }
      // 更新加载状态
      banners.value.status = "success";
    } catch (e) {
      // 更新加载状态
      banners.value.status = "error";
    }
  }
  //获取新鲜好物
  const getFreshGoods: getFreshGoods = async (limit = 4) => {
    freshGoods.value.status = 'loading'
    // 捕获错误
    try {
      // 发送请求获取推荐品牌数据
      const response = await HomeAPI.getFreshGoods(limit);
      if (response) {
        freshGoods.value.result = response.result;
      }
      freshGoods.value.status = "success";
    } catch (e) {
      freshGoods.value.status = "error";
    }
  }
  //人气推荐
  const getHotRecommends: getHotRecommends = async () => {
    hotRecommends.value.status = 'loading'
    // 捕获错误
    try {
      // 发送请求获取推荐品牌数据
      const response = await HomeAPI.getHotRecommends();
      if (response) {
        hotRecommends.value.result = response.result;
      }
      hotRecommends.value.status = "success";
    } catch (e) {
      hotRecommends.value.status = "error";
    }
  }
  //最新专题
  const getSpecial: getSpecial = async (limit = 3) => {
    specials.value.status = 'loading'
    // 捕获错误
    try {
      // 发送请求获取推荐品牌数据
      const response = await HomeAPI.getSpecial(limit);
      if (response) {
        specials.value.result = response.result;
      }
      specials.value.status = "success";
    } catch (e) {
      specials.value.status = "error";
    }
  }
  //获取产品
  const getGoods: getGoods = async () => {
    goods.value.status = 'loading'
    // 捕获错误
    try {
      // 发送请求获取推荐品牌数据
      const response = await HomeAPI.getGoods();
      if (response) {
        goods.value.result = response.result;
      }
      console.log(goods.value);
      goods.value.status = "success";
    } catch (e) {
      goods.value.status = "error";
    }
  }
  return {specials,getSpecial,goods,getGoods, brands, getBrands, getBanners, banners, freshGoods,getFreshGoods,hotRecommends,getHotRecommends }
}, { persist: true })
