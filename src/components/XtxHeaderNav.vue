<template>
  <ul class="app-header-nav">
    <li class="home"><router-link to="/">首页</router-link></li>
    <!-- 真实数据未请求完成前显示的假数据 -->
    <template v-if="categories.status !== 'success'">
      <li v-for="category in CATEGORIES" :key="category.id">
        <a href="javascript:">{{ category.name }}</a>
      </li>
    </template>
    <!-- 真实数据未请求完成后显示的真数据 -->
    <template v-else>
      <li
        @mouseleave="toggle(category.id, false)"
        @mouseenter="toggle(category.id, true)"
        @click="toggle(category.id, false)"
        v-for="category in categories.headerNav"
        :key="category.id"
      >
        <RouterLink :to="`/category/${category.id}`">
          {{ category.name }}
        </RouterLink>
        <div class="layer" :class="{ open: category.isOpen }">
          <ul>
            <li v-for="subCategory in category.children" :key="subCategory.id">
              <RouterLink :to="`/category/sub/${category.id}/${subCategory.id}`">
                <img :src="subCategory.picture" alt="" />
                <p>{{ subCategory.name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '../stores/categoryStore'
import { CATEGORIES } from '../vendors/constants/categories'
const store = useCategoryStore()
const { categories } = storeToRefs(store)
const { getCategories, toggle } = store
// 发送请求获取分类数据
getCategories()
</script>


<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  .layer {
    width: 1240px;
    background-color: #fff;
    position: absolute;
    left: -200px;
    top: 56px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s 0.1s;
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 70px;
      align-items: center;
      height: 132px;
      li {
        width: 110px;
        text-align: center;
        img {
          width: 60px;
          height: 60px;
        }
        p {
          padding-top: 10px;
        }
        &:hover {
          p {
            color: @xtxColor;
          }
        }
      }
    }
    &.open {
      height: 132px;
      opacity: 1;
    }
  }

  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }

    &:hover {
      > a {
        color: @xtxColor;
        border-bottom: 1px solid @xtxColor;
      }
    }
  }
}
</style>