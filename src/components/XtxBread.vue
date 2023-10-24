<template>
  <render />
</template>

<script setup lang="ts">
import { h, useSlots } from 'vue'
import type { VNode } from 'vue'
//获取默认插槽
//useSlots只能在顶层调用
const defaults = useSlots().default?.()
function render() {
  // 在每一个导航的后面加分隔符, 除了最后一个
  let result = defaults?.reduce(
    (result: VNode[], item, index, array) =>
      result.concat(
        index < array.length - 1 ? [item, h('i', { class: 'iconfont icon-angle-right' })] : [item]
      ),
    []
  )
  return h('div', { class: 'xtx-bread' }, result)
}
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
}

:deep(i) {
  font-size: 12px;
  margin-left: 5px;
  margin-right: 5px;
  line-height: 20px;
}
</style>