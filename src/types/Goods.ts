import type { Category } from "./Category";
import type { Brands } from "./Brands";

export interface Goods {
  // 添加属性
  id: string;
  name: string;
  desc: string;
  price: string;

  spuCode: string;
  oldPrice: string;
  inventory: number;
  brand: Brands[];
  salesCount: number;
  commentCount: number;
  collectCount: number;
  mainVideos: string[];
  videoScale: number;
  mainPictures: string[];
  specs: Spec[];
  skus: Sku[];
  categories: Pick<Category, "id" | "name" | "layer" | "parent">[];
  details: GoodsDetailInfo;
  isPreSale: boolean;
  isCollect: boolean;
  userAddresses: null;
  similarProducts: Goods[];
  hotByDay: Goods[];
  evaluationInfo: null;
}
// 规格
export interface Spec {
  id: string;
  name: string;
  values: SpecValue[];
}
// 库存单位
export interface Sku {
  id: string;
  skuCode: string;
  price: string;
  oldPrice: string;
  inventory: number;
  specs: { name: string; valueName: string }[];
}
// 商品详情信息
export interface GoodsDetailInfo {
  pictures: string[];
  properties: { name: string; value: string }[];
}
// 规格选项
export interface SpecValue {
  name: string;
  picture: string;
  desc: string;
}
export interface GoodsRequestParams {
  // 二级分类ID
  categoryId: string;
  // 是否仅显示有货商品
  inventory: boolean;
  // 是否只显示特惠商品
  onlyDiscount: boolean;
  // "": 默认排序
  // publishTime: 最新商品
  // orderNum: 最高人气
  // evaluate: 评论最多
  // price: 价格
  sortField: "" | "publishTime" | "orderNum" | "price" | "evaluateNum";
  // asc: 升序
  // desc: 降序
  sortMethod: "" | "asc" | "desc";
  // 品牌 ID
  brandId: string;
  // 筛选条件
  // groupName: 筛选类别名称
  // propertyName: 筛选条件名称
  attrs: { groupName: string; propertyName: string }[];
  // 当前页
  page: number;
  // 每页显示的数据条数
  pageSize: number;
  // 最低价
  lowPrice: number;
  // 最高价
  highPrice: number;
}