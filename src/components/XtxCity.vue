<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder" v-if="!fullLocation">{{ placeholder }}</span>
      <span class="value" v-else>{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <template v-if="status === 'success'">
        <span
          @click="updateCities(city.code, city.level, city.name)"
          v-for="city in cities"
          :key="city.code"
        >
          {{ city.name }}
        </span>
      </template>
      <template v-if="status === 'loading'">
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { Status } from '../types/Status'
import axios from 'axios'
// 声明城市数据类型
interface City {
  code: string
  level: number
  name: string
  areaList: City[]
}
//城市编码接口规范
interface AddressCode {
  provinceCode: string
  cityCode: string
  countyCode: string
}
const addressCode: Partial<AddressCode> = {} //记录用户选择的省市区编码
// 定义要触发的自定义事件 (用户选择城市结束后将城市码传递到组件外部)
const emit = defineEmits<{
  (e: 'onChanged', code: AddressCode): void
}>()
// 声明城市数据
let cachedCities: City[] = []
// 城市数据的加载状态
const status = ref<Status>('idle')
// placeholder: 提示用户操作的文字
const props = withDefaults(defineProps<{ placeholder?: string,fullLocation:any }>(), {
  placeholder: '请选择收货地址',
  fullLocation: "",
})
//再页面中展示用户的选择结果（城市名称）
const fullLocation= useVModel(props, 'fullLocation')
type AddressName = {
  provinceName: string
  cityName: string
  countyName: string
}
const addressName: Partial<AddressName> = {}
// 在页面中展示的城市状态
const cities = ref<City[]>([])
//控制弹层的显示和隐藏
const visible = ref(false)
//存储城市选择组件的最外层元素
const target = ref<HTMLDivElement>()
//显示
async function show() {
  visible.value = true
  cities.value = cachedCities
  if (cachedCities.length === 0) {
    status.value = 'loading'
    //发送请求获取城市数据
    let res = await axios.get(
      'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
    )
    cachedCities = res.data
    status.value = 'success'
  }
}
//隐藏
function hide() {
  visible.value = false
}
// 状态切换
function toggle() {
  visible.value ? hide() : show()
}
// 更新城市弹层内容, 记录用户选择的城市编码
function updateCities(code: string, level: Number, name: string) {
  // 匹配地址级别
  switch (level) {
    // 省
    case 0:
      // 存储省编码
      addressCode.provinceCode = code
      addressName.provinceName = name
      break
    // 市
    case 1:
      // 存储市编码
      addressCode.cityCode = code
      addressName.cityName = name
      break
    // 区
    case 2:
      // 存储区编码
      addressCode.countyCode = code
      addressName.countyName = name
      fullLocation.value =
        addressName.provinceName! + addressName.cityName! + addressName.countyName!
      // 隐藏弹层
      hide()
      // 触发自定义事件将用户选择的城市码传递到父组件
      emit('onChanged', addressCode as Required<AddressCode>)
  }

  //更新城市弹层内容
  cities.value = cities.value.find((city) => city.code === code)!.areaList!
  

}
// 在城市选择组件外部点击时隐藏该组件
onClickOutside(target, hide)
</script>


<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>