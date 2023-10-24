<template>
  <div class="xtx-checkbox" @click="toggle">
    <i class="iconfont icon-checked" v-if="isChecked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const toggle = () => {
  isChecked.value = !isChecked.value;
  // 如果未使用双向数据绑定, 手动触发自定义事件将状态传递到组件外部
  // 如果使用了双向数据绑定, 则 useVModel 内部自动触发自定义事件
  if(!isVModel) emit('onChange',isChecked.value)
};
const props = withDefaults(
  defineProps<{ modelValue?: boolean; checked?: boolean }>(),
  { modelValue: undefined }
);
const emit = defineEmits<{
  (e: "update:modelValue"): void;
  (e: "onChange", checked: boolean): void;
}>();
// 是否使用双向数据绑定
const isVModel = typeof props.modelValue !== "undefined";
// 声明复选框是否选中状态
const isChecked = isVModel? useVModel(props, "modelValue", emit): ref(props.checked);

</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>