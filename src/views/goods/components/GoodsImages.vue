<template>
  <div class="goods-image">
    <div v-if="show" class="large" :style="{ backgroundImage: `url(${mainPictures[current]})`,backgroundPositionX: bgPosition.x + 'px', backgroundPositionY: bgPosition.y + 'px' }">

    </div>
    <div class="middle" ref="middleElement">
      <img :src="mainPictures[current]" />
      <div v-if="show" :style="{left: layerPosition.left + 'px',top: layerPosition.top + 'px'}" class="layer"></div>
    </div>
    <ul class="small">
      <li
        :class="{ active: index === current }"
        v-for="(item, index) in mainPictures"
        :key="item"
        @mouseenter="current = index"
      >
        <img :src="item" />
      </li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
import { useGoodsStore } from '../../../stores/GoodsStore'
const goodsStore = useGoodsStore()
const { mainPictures } = storeToRefs(goodsStore)
//要展示的图片的索引
const current = ref(0)
const show = ref(false) //控制大图的显示和隐藏
// 用于获取中图元素
const middleElement = ref(null)
const { isOutside, elementX, elementY } = useMouseInElement(middleElement)
//用于记录镜片位置
const layerPosition = reactive({ left: 0, top: 0 })


//用于记录大图的位置
const bgPosition = reactive({ x: 0, y: 0 })
watchEffect(() => {
  show.value = !isOutside.value
  //记录镜片位置
  layerPosition.left = elementX.value - 100
  layerPosition.top = elementY.value - 100
  //对镜片元素的水平方向位置进行限制。
  if (layerPosition.left < 0) {
    layerPosition.left = 0
  } else if (layerPosition.left > 200) {
    layerPosition.left = 200
  }
  //对镜片元素的垂直方向位置进行限制。
  if (layerPosition.top < 0) {
    layerPosition.top = 0
  } else if (layerPosition.top > 200) {
    layerPosition.top = 200
  }
  //记录大图的位置。
  bgPosition.x= -layerPosition.left*2
  bgPosition.y= -layerPosition.top*2
})
</script>


<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>