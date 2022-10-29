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

// 搜索 必选参数 : keywords : 
// 关键词    /search?keywords=海阔天空


// 默认搜索关键词// 说明 : 调用此接口 , 可获取默认搜索关键词
// 接口地址 : /search/default

// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表

// 接口地址 : /search/hot

// 调用例子 : /search/hot


// 热搜列表(详细)
// 说明 : 调用此接口,可获取热门搜索列表

// 接口地址 : /search/hot/detail

// 调用例子 : /search/hot/detail

// 搜索建议  调用例子 : /search/suggest?keywords=海阔天空

// 搜索多重匹配  /search/multimatch?keywords=海阔天空


