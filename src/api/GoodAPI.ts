import type { Goods } from "@/types/Goods";
import type { XtxResponse } from "@/types/Response";
import XtxRequestManager from "@/utils/XtxRequestManager";

export class GoodsAPI {
  // 根据商品 id 获取商品的详细信息
  static getGoodsInfo(id: string) {
    return XtxRequestManager.instance.request<XtxResponse<Goods>>({
      url: "/goods",
      params: { id },
    });
  }
}