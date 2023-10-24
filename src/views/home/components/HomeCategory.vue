<template>
  <div class="home-category">
    <ul class="menu">
      <!-- 如果导航分类数据正在加载中 -->
      <template v-if="categories.status === 'loading'">
        <li v-for="category in CATEGORIES" :key="category.id">
          <!-- 渲染本地一级分类 -->
          <a>{{ category.name }}</a>
          <!-- 渲染二级分类骨架屏 -->
          <XtxSkeleton
            animated="fade"
            width="60px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
            style="margin-right: 5px"
          >
          </XtxSkeleton>
          <XtxSkeleton
            animated="fade"
            width="60px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
        </li>
      </template>
      <!-- 导航数据加载完成, 渲染真实导航数据 -->
      <template v-else>
        <li v-for="topCategory in categories.homeCategory" :key="topCategory.id">
          <!-- 一级分类 -->
          <RouterLink :to="`/category/${topCategory.id}`">
            {{ topCategory.name }}
          </RouterLink>
          <!-- 二级分类 -->
          <RouterLink
            :to="`/category/sub/${topCategory.id}/${subCategory.id}`"
            v-for="subCategory in topCategory.children"
            :key="subCategory.id"
          >
            {{ subCategory.name }}
          </RouterLink>
          <!-- 分类弹框 - 推荐商品 -->
          <div class="layer">
            <h4>分类商品推荐 <small>根据您的购买或浏览记录推荐</small></h4>
            <ul>
              <li v-for="goods in topCategory.goods" :key="goods.id">
                <RouterLink to="/">
                  <img :src="goods.picture" alt="" />
                  <div class="info">
                    <p class="name ellipsis-2">{{ goods.name }}</p>
                    <p class="desc ellipsis">{{ goods.desc }}</p>
                    <p class="price"><i>¥</i>{{ goods.price }}</p>
                  </div>
                </RouterLink>
              </li>
            </ul>
          </div>
        </li>
      </template>
      <li>
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">推荐品牌</RouterLink>
        <div class="layer">
          <h4>分类品牌推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li class="brand" v-for="item in brands.result" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" :alt="item.name" />
                <div class="info">
                  <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
                  <p class="name ellipsis">{{ item.name }}</p>
                  <p class="desc ellipsis-2">{{ item.desc }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '../../../stores/categoryStore'
import { useHomeStore } from '../../../stores/homeStore'
const categoryStore = useCategoryStore()
const homeStore = useHomeStore()
const { categories } = storeToRefs(categoryStore)
const { brands } = storeToRefs(homeStore)
const { getBrands } = homeStore
getBrands(9)
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    > li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background-color: @xtxColor;
        .layer {
          display: block;
        }
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        li.brand {
          height: 180px;
          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info {
              p {
                margin-top: 8px;
              }
              .place {
                color: #999;
              }
            }
          }
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>../../../stores/homeStore21../../../stores/homeStore