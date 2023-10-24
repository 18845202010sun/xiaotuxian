import XtxRequestManager from "@/utils/XtxRequestManager";
import type { Category } from "@/types/Category";
import type { XtxResponse } from "../types/Response";
import type { Goods, GoodsRequestParams } from "@/types/Goods";
import type { Pagination } from "@/types/Response";
export class CategoryAPI {
  static getCategories() {
    return XtxRequestManager.instance?.request<XtxResponse<Category[]>>({
      url: '/home/category/head'
    })
  }
  // 根据一级分类ID获取一级分类下的具体信息
  static getTopCategoryById(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<Category>>({
      url: "/category",
      params: { id },
    });
  }
  // 根据二级分类ID获取该分类下的商品的筛选条件
  static getSubCategoryFilters(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<Category>>({
      url: "/category/sub/filter",
      params: { id },
    });
  }
  // 获取商品列表 请求参数中二级分类id是必传的 所以此处将它设置为单独的参数
  static getCategoryGoods(
    categoryId: GoodsRequestParams["categoryId"],
    reqParams?: Partial<Omit<GoodsRequestParams, "categoryId">>
  ) {
    return XtxRequestManager.instance.request<
      XtxResponse<Pagination<Goods>>,
      Partial<GoodsRequestParams>
    >({
      url: "/category/goods",
      method: "post",
      data: { categoryId, ...reqParams },
    });
  }
}