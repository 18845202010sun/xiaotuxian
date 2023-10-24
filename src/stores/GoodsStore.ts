import { defineStore } from 'pinia';
import { GoodsAPI } from "../api/GoodAPI";
import type { Goods } from "@/types/Goods";
import type { Status } from "@/types/Status";
export interface Data {
  price: string;
  oldPrice: string;
  inventory: number;
  skuId: string;
}
type State = {
  // 商品信息
  goodsInfo: {
    status: Status;
    result: Goods;
  };
};

type Actions = {
  // 根据商品id获取商品信息
  getGoodsInfo(id: string): Promise<void>;
  updateGoods(data: Data): void;
};

type Getters = {
  //获取商品图片
  mainPictures(): string[];
  // 获取商品基本信息
  baseInfo(): Pick<Goods, "name" | "desc" | "price" | "oldPrice">;
};

export const useGoodsStore = defineStore<"Goods", State, Getters, Actions>("Goods", {
  state: () => ({
    // 商品信息
    goodsInfo: {
      status: "idle",
      result: {
        id: "",
        name: "",
        desc: "",
        price: "",
        picture: "",
        discount: null,
        orderNum: null,
        spuCode: "",
        oldPrice: "",
        inventory: 0,
        brand: [],
        salesCount: 0,
        commentCount: 0,
        collectCount: 0,
        mainVideos: [],
        videoScale: 0,
        mainPictures: [],
        specs: [],
        skus: [],
        categories: [],
        details: {
          pictures: [],
          properties: [],
        },
        isPreSale: false,
        isCollect: false,
        userAddresses: null,
        similarProducts: [],
        hotByDay: [],
        evaluationInfo: null,
      },
    },
  }),
  actions: {
    // 根据商品id获取商品信息
    async getGoodsInfo(id) {
      this.goodsInfo.status = "loading";
      try {
        const response = await GoodsAPI.getGoodsInfo(id);
        this.goodsInfo.result = response.result;
        this.goodsInfo.status = "success";
      } catch (e) {
        this.goodsInfo.status = "error";
      }
    },
    //更新商品信息（规格更新）
    updateGoods(data) {
      this.goodsInfo.result.price = data.price;
      this.goodsInfo.result.oldPrice = data.oldPrice;
      this.goodsInfo.result.inventory = data.inventory;
    },
  },
  getters: {
    //获取商品图片
    mainPictures() {
      return this.goodsInfo.result.mainPictures
    },
    baseInfo() {
      //获取商品的基本信息
      const { name, desc, price, oldPrice } = this.goodsInfo.result;
      return { name, desc, price, oldPrice }
    }

  }
});