<template>
  <div class="sub-filter" v-if="categoryStore.subCategoryFilters.status === 'loading'">
    <XtxSkeleton class="item" width="800px" height="25px" />
    <XtxSkeleton class="item" width="800px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
    <XtxSkeleton class="item" width="600px" height="25px" />
  </div>
  <div v-else class="sub-filter">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="onSelectedFiltersChanged({ brandId: undefined })"
          :class="{ active: selectedFilters.brandId === undefined }"
        >
          全部
        </a>
        <a
          v-for="brand in subCategory?.brands"
          :key="brand.id"
          @click="onSelectedFiltersChanged({ brandId: brand.id })"
          :class="{ active: selectedFilters.brandId === brand.id }"
        >
          {{ brand.name }}
        </a>
      </div>
    </div>
    <div
      class="item"
      v-for="saleProperties in subCategory?.saleProperties"
      :key="saleProperties.id"
    >
      <div class="head">{{ saleProperties.name }}:</div>
      <div class="body">
        <a
          :class="{
            active: selectedFilters[saleProperties.name] === undefined
          }"
          @click="onSelectedFiltersChanged({ [saleProperties.name]: undefined })"
        >
          全部
        </a>
        <a
          v-for="property in saleProperties.properties"
          :key="property.id"
          @click="onSelectedFiltersChanged({ [saleProperties.name]: property.name })"
          :class="{ active: selectedFilters[saleProperties.name] === property.name }"
        >
          {{ property.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from '../../../stores/categoryStore'
// import { storeToRefs } from 'pinia'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import omitBy from 'lodash/omitBy'
import transform from 'lodash/transform'
import type { GoodsRequestParams } from '../../../types/Goods'
import { computed, ref } from 'vue'
type FilterParams = Partial<Pick<GoodsRequestParams, 'brandId' | 'attrs'>>
interface SelectedFilters {
  brandId: string
  [groupName: string]: string
}
const categoryStore = useCategoryStore()
const route = useRoute()
// const { subCategoryFilters } = storeToRefs(categoryStore)

const { getSubCategoryFilters } = categoryStore
getSubCategoryFilters(route.params.sub as string)
onBeforeRouteUpdate((to) => {
  getSubCategoryFilters(to.params.sub as string)
})
// 定义当前组件要触发的自定义事件
const emit = defineEmits<{
  (e: 'onChanged', params: FilterParams): void
}>()
// 用于存储用户选择的筛选条件
const selectedFilters = ref<Partial<SelectedFilters>>({})
// 更新筛选条件
function onSelectedFiltersChanged(filters: Partial<SelectedFilters>) {
  // 更新筛选条件状态
  selectedFilters.value = { ...selectedFilters.value, ...filters }
  // 重构筛选条件
  const params = transform(
    // 清除属性值为空字符串的属性
    omitBy(selectedFilters.value, (value) => value === undefined),
    // 对筛选条件进行重构
    (result: FilterParams, value, key) => {
      // 如果属性是品牌ID
      if (key === 'brandId') {
        // 存储品牌ID
        result[key] = value!
      } else {
        // 否则属性是其他的筛选条件
        // 判断 attrs 数组是否存在, 如果不存在, 创建它
        if (typeof result.attrs === 'undefined') result.attrs = []
        // 存储筛选条件类别的名字和具体的筛选条件名字
        result.attrs.push({
          groupName: key,
          propertyName: value!
        })
      }
    },
    {}
  )
  // 将用户选择的筛选条件传递到父父组件以备使用
  emit('onChanged', params)
}

// 获取二级分类对象
const subCategory = computed(() => {
  const subCategoryId = route.params.sub as string
  // 根据二级分类 id 获取分类对象
  const subCategory = categoryStore.subCategoryFilters.result[subCategoryId]
  // 如果当前二级分类不存在
  if (subCategory === undefined)
    // 发送请求获取二级分类
    categoryStore.getSubCategoryFilters(subCategoryId)
  // 返回二级分类对象
  return subCategory
})

// 当路由变化时
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onBeforeRouteUpdate((to) => {
  // 重置筛选条件
  selectedFilters.value = {}
})
</script>


<style scoped lang="less">
.xtx-skeleton {
  margin: 10px 0;
}
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>