/*首页-发现
说明 : 调用此接口, 可获取APP首页信息

接口地址 : /homepage/block/page

可选参数 : refresh: 是否刷新数据,默认为 false

cursor: 上一条数据返回的 cursor
*/
export const getDiscoverDataAPI = '/homepage/block/page'

/*
首页-发现-圆形图标入口列表
说明 : 调用此接口 , 可获取 APP 首页圆形图标入口列表

接口地址 : /homepage/dragon/ball
*/
export const getHomepageItemList = '/homepage/dragon/ball'


// 轮播图
export const getBannerList = 'banner?type=1'
