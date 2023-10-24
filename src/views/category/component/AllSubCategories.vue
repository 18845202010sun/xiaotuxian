<template>
  <div class="sub-list">
    <h3>全部分类</h3>
    <ul>
      <li v-for="item in currentTop(route.params.id)?.children" :key="item.id">
        <a href="javascript:">
          <img :src="item.picture" :alt="item.name" />
          <p>{{ item.name }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '../../../stores/categoryStore'
const route = useRoute()
const categoryStore = useCategoryStore()
const { currentTop } = storeToRefs(categoryStore)
</script>


<style lang="less" scoped>
.sub-list {
  margin-top: 20px;
  background-color: #fff;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  ul {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
    li {
      width: 168px;
      height: 160px;
      a {
        text-align: center;
        display: block;
        font-size: 16px;
        img {
          width: 100px;
          height: 100px;
        }
        p {
          line-height: 40px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>