import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Category } from '@/types/Category'
import { CategoryAPI } from "../api/CategoryAPI";
import type { Status } from '@/types/Status'
import type { Goods, GoodsRequestParams } from "@/types/Goods";
import type { Pagination } from "@/types/Response";
type categories = {
  headerNav: (Category & { isOpen: boolean })[],
  status: string,
  homeCategory: Category[]
};
type toggle = (id: string, isOpen: boolean) => void
type currentTop = (topCategoryId: string) => Category | undefined;
type currentTopAndSub = (topCategoryId: string, subCategoryId: string) => { topCategory: Category | undefined; subCategory: Category | undefined };
type topCategories = {
  result: { [id: string]: Category; };
  status: Status;
};
type getTopCategoryById = (id: string) => Promise<void>
type subCategoryFilters = {
  result: { [id: string]: Category; };
  status: Status;
};
type getSubCategoryFilters = (id: any) => Promise<void>;
type getCategoryGoods = (
  categoryId: GoodsRequestParams["categoryId"],
  reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>
) => Promise<void>;
type categoryGoods = {
  result: Pagination<Goods>
  status: Status;
};
export const useCategoryStore = defineStore('category', () => {
  //用于存储导航分类列表数据
  const categories = ref<categories>({
    headerNav: [],
    status: "idle",
    homeCategory: []
  })
  const topCategories = ref<topCategories>({
    result: {},
    status: "idle",
  })
  //获取导航分类列表数据
  const getCategories = async () => {
    categories.value.status = 'loading'
    try {
      // 发送请求 获取分类状态
      const response = await CategoryAPI.getCategories();
      // 存储分类状态
      if (response) {
        categories.value.headerNav = response.result.map(item => ({ ...item, isOpen: false }))
        categories.value.homeCategory = response.result.map((item) => ({ ...item, children: item.children?.slice(0, 2), }))
      }
      // 记录请求状态
      categories.value.status = 'success'
    } catch (error) {
      // 记录请求状态
      categories.value.status = 'error'
    }
  }
  // 根据 id 查找目标分类, 将它的 isOpen 属性值设置为 target
  const toggle: toggle = (id, target) => {
    const category = categories.value.headerNav.find(category => category.id === id);
    if (category) category.isOpen = target;
  }
  const currentTop = computed<currentTop>(() => {
    return function (topCategoryId) {
      return categories.value.headerNav.find(
        (item: { id: string; }) => item.id === topCategoryId
      );
    };
  })
  //二级分类面包屑导航
  const currentTopAndSub = computed<currentTopAndSub>(() => {
    return function (topCategoryId: any, subCategoryId: any) {
      const topCategory = categories.value.headerNav.find((item: any) => item.id === topCategoryId)
      const subCategory = topCategory?.children?.find((item: any) => item.id === subCategoryId)
      return { topCategory, subCategory }
    }
  })
  //根据一级分类id获取二级分类的信息
  const getTopCategoryById: getTopCategoryById = async (id) => {
    topCategories.value.status = "loading";
    try {
      // 发送请求根据一级分类 id 获取分类信息
      const response = await CategoryAPI.getTopCategoryById(id);
      // 存储一级分类信息
      topCategories.value.result[response.result.id] = response.result;
      console.log(topCategories.value.result);

      // 更新加载状态
      topCategories.value.status = "success";
    } catch (e) {
      // 更新加载状态
      topCategories.value.status = "error";
    }
  }
  //二级分类筛选信息
  const subCategoryFilters = ref<subCategoryFilters>({
    result: {},
    status: "idle",
  })
  // 根据二级分类 id 获取该分类下的商品的筛选条件
  const getSubCategoryFilters: getSubCategoryFilters = async (id) => {
    subCategoryFilters.value.status = "loading";
    try {
      const response = await CategoryAPI.getSubCategoryFilters(id);
      subCategoryFilters.value.result[response.result.id] = response.result;
      subCategoryFilters.value.status = "success";
    } catch (e) {
      subCategoryFilters.value.status = "error";
    }
  }
  //二级分类商品
  const categoryGoods = ref<categoryGoods>({
    result: {
      page: 0,
      pages: 0,
      pageSize: 0,
      counts: 0,
      items: [],
    },
    status: "idle",
  })
  //获取二级分类商品
  const getCategoryGoods: getCategoryGoods = async (categoryId, reqParams) => {
    if (categoryGoods.value.status === "finished") return;
    categoryGoods.value.status = "loading";
    try {
      const response = await CategoryAPI.getCategoryGoods(categoryId,reqParams);
      if(reqParams?.page === 1){
        categoryGoods.value.result = response.result;
      }else{
         // 累加状态
         categoryGoods.value.result = {
          ...response.result,
          items: [
            ...categoryGoods.value.result.items,
            ...response.result.items,
          ],
        };
      }
      if (reqParams?.page === response.result.pages || response.result.pages === 0) {
        // 更新加载状态
        categoryGoods.value.status = "finished";
      } else {
        // 更新加载状态
        categoryGoods.value.status = "success";
      }
      console.log(categoryGoods.value);
      
    } catch (e) {
      categoryGoods.value.status = "error";
    }
  }
  return { categories, categoryGoods, getCategoryGoods, subCategoryFilters, getSubCategoryFilters, getTopCategoryById, topCategories, getCategories, toggle, currentTop, currentTopAndSub }
}, { persist: true })



