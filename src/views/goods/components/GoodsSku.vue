<template>
  <div class="goods-sku">
    <dl v-for="(spec, index) in specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="(item, i) in spec.values" :key="item">
          <img
            @click="setSelectedUIState(index, i), sendGoodsInfoToParent()"
            :class="{
              selected: UIStatus[index][i].selected,
              disabled: UIStatus[index][i].disabled
            }"
            v-if="item.picture"
            :src="item.picture"
            :alt="item.name"
          />
          <span
            @click="setSelectedUIState(index, i), sendGoodsInfoToParent()"
            :class="{
              selected: UIStatus[index][i].selected,
              disabled: UIStatus[index][i].disabled
            }"
            v-else
            >{{ item.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import type { Spec,Sku } from '../../../types/Goods'
import type { Data } from '../../../stores/GoodsStore'
import bwPowerSet from '../../../vendors/power-set'

interface UIStatus {
  // 是否选中
  selected: boolean
  // 是否禁用
  disabled: boolean
}
// 声明当前组件触发的自定义事件
const emit = defineEmits<{
  (e: 'complete', data: Data): void
  (e: 'uncomplete'): void
}>()

// 获取规格查询字典
const pathMap = createPathMap()
// 创建规格查询字典

const props = defineProps<{ specs: Spec[];skus: Sku[]; skuId?: string  }>() //接收规格
console.log(props);

function createPathMap() {
  // 用于存储最终的规格查询对象
  const pathMap: any = {}
  // 过滤出有库存的商品规格组合
  props.skus
    .filter((sku) => sku.inventory > 0)
    // 遍历有库存的商品规格组合
    .forEach((sku) => {
      // 将当前遍历的规格组合中的规格名称临时存到一个数组中
      // ['蓝色', '20cm', '中国']
      const valueNames = sku.specs.map((spec) => spec.valueName)
      // 获取用户可以选择的所有可能的规格及规格组合
      // ['蓝色', '20cm', '中国']
      // [['蓝色'], ['20cm'], ['中国'], ['蓝色', '20cm'], ['蓝色', '中国'], ['20cm', '中国'], ['蓝色', '20cm', '中国']]
      const sets = bwPowerSet(valueNames).filter((set) => set.length > 0)
      // 获取当前商品的规格数量, 将用于判断某个规格是否是完整的
      const max = valueNames.length
      // 遍历用户可以选择的所有可能的规格及规格组合
      sets.forEach((set) => {
        // 将规格名称以 _ 进行拼接
        const key = set.join('_')
        // 用于判断当前规格是否是完整的
        const isCompleted = set.length === max
        // 判断规格查询对象中是否已经存储了当前规格
        if (!(key in pathMap)) {
          // 如果当前规格是完整的
          if (isCompleted) {
            // 将当前规格或规格组合添加到规格查询对象中并赋值 sku id
            pathMap[key] = sku.id
          } else {
            // 将当前规格或规格组合添加到规格查询对象中
            pathMap[key] = null
          }
        }
      })
    })
  return pathMap
}
// eslint-disable-next-line no-redeclare
const UIStatus = reactive(createUIStatus(props.specs))
//根据规格数据创建对应的界面状态
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createUIStatus(specs: Spec[]) {
  //状态数组
  const UIStatus: UIStatus[][] = []
  //遍历源规格数组
  specs.forEach((spec) => {
    //创建规格分组
    const group: UIStatus[] = []
    //遍历具体的规格选项
    spec.values.forEach(() => group.push({ selected: false, disabled: false }))
    UIStatus.push(group)
  })
  return UIStatus
}
//设置规格的选中状态
function setSelectedUIState(index: number, i: number) {
  //获取当前用户点击的规格
  const current = UIStatus[index][i]

  // 获取当前用户点击的规格对应的规格组
  const group = UIStatus[index]
  // 如果用户点击的规格已经是选中的
  if (current.selected) {
    current.selected = false
  } else {
    group.forEach((item) => (item.selected = false))
    current.selected = true
  }
}
// 向父组件传递商品信息
function sendGoodsInfoToParent() {
  // 获取用户选择的规格名称数组 ["黑色", undefined, undefined] => ["黑色"]
  const selected = getUserSelected().filter((item) => item)
  // 判断用户是否选择了完整的规格信息
  if (selected.length === props.specs.length) {
    // 获取规格 skuId
    // { "黑色_中国_10cm": "skuId", "黑色": null }
    const skuId = pathMap[selected.join('_')]!
    // 根据 skuId 查找规格对象
    const sku = props.skus.find((sku) => sku.id === skuId)
    // 如果找到了规格对象
    if (typeof sku !== 'undefined') {
      // 触发自定义事件, 向外部传递最新商品信息
      emit('complete', {
        price: sku.price,
        oldPrice: sku.oldPrice,
        inventory: sku.inventory,
        skuId: skuId
      })
    }
  } else {
    // 用户没有选择完整的规则
    emit('uncomplete')
  }
}
// 获取用户选择的规格名称数组
function getUserSelected() {
  // 声明用于存储用户选择的规格名称数组
  const names: (string | undefined)[] = []
  // 遍历规格组
  props.specs.forEach((spec, index) => {
    // 查找当前规格组中被选中的规格的索引
    const selectedIndex = UIStatus[index].findIndex((item) => item.selected)
    // 如果找到了
    if (selectedIndex !== -1) {
      // 将该规格放在它自己的位置上
      names[index] = spec.values[selectedIndex].name
    } else {
      // 如果没有找到, 当前规格使用 undefined 进行占位
      names[index] = undefined
    }
  })
  // 返回用户选择的规格名称数组
  return names
}
</script>

<style scoped lang='less'>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}

</style>