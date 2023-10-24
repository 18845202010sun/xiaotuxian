import axios from "axios"
import { type AxiosInstance, type AxiosRequestConfig, AxiosError, type AxiosResponse } from "axios";
import { useUserStore } from '@/stores/userStore'
import router from '@/router'
interface XtxAxiosInstance extends AxiosInstance {
  request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
}
//创建单例类，实现单例模式
export default class XtxRequestManager {
  //获取user仓库对象
  private _userStore = useUserStore()
  //用于保存axios实例对象
  private readonly _instance: XtxAxiosInstance;
  //用于发送请求的方法
  public request<T = any,D=any>(config:AxiosRequestConfig<D>):Promise<T>{
    return this._instance.request<T,D>(config)
  }
  //请求基准地址
  public static baseURL: string = 'https://pcapi-xiaotuxian-front-devtest.itheima.net/'
  //用于保存单例对象的静态属性
  //该属性不允许开发者直接访问 所以将该属性设置为私有属性 开发者必须通过instance 静态方法获取单例对象
  //因为该属性需要被 instance 静态方法访问 所以将该属性设置为静态属性
  private static _singletonInstance: XtxRequestManager
  //为防止开发者直接实例化XtxRequestManager类，将该类的构造函数设为私有
  private constructor() {
    //创建axios实例对象专门用于小兔鲜项目发送请求
    this._instance = axios.create({
      baseURL: XtxRequestManager.baseURL
    })
    this._instance.interceptors.response.use(
      //剥离axios响应对象，直接返回服务端的响应状态(响应拦截器》成功态)
      this._peelOffAxiosResponse,
      //登录状态失效，清空用户信息，跳转到登录页面（响应拦截器》失败态）
      this._unauthorized.bind(this)
    )
  }
  // 剥离 axios 响应对象, 直接返回服务端的响应状态  (响应拦截器 -> 成功态)
  private _peelOffAxiosResponse(response: AxiosResponse) {
    return response.data;
  }
  //登录状态失效，清空用户信息（响应拦截器》失败态）
  private _unauthorized(error:unknown){
    if(error instanceof AxiosError){
      // 如果请求都没发送成功 就是这个请求压根就没发出去 有可能是客户端发送请求的代码报错了 那就没有 response 属性
      // 如果请求发送成功了, 只不过服务端返回了失败状态 那就存在 response 属性
      if(error.response?.status==401){
        //清空用户信息
        this._userStore.$reset()
        //跳转到登录页面
        return router.replace('/login')
      }
    }
    return Promise.reject(error)
  }
  //在请求头中加入 token
  private _addTokenToRequestHeader(config: AxiosRequestConfig) {
    //从userStore中获取 token
    const token = this._userStore.profile.token
    if (token) config.headers = { Authorization: `Bearer ${token}` }
    //返回配置对象使其生效
    return config
  }
  static get instance(): XtxRequestManager {
    // 判断单例是否存在
    if (typeof XtxRequestManager._singletonInstance === "undefined") {
      // 单例对象不存在, 创建单例对象
      XtxRequestManager._singletonInstance = new XtxRequestManager();
    }
    // 返回单例对象
    return XtxRequestManager._singletonInstance;
  }
}