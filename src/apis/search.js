// 默认搜索关键词
// /search/default

// 搜索
// /search?keywords=海阔天空
// http://localhost:3000/cloudsearch?type=1002&keywords=陈奕迅
//: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
export const hotSearchList = '/search/hot/detail'

export const searchKeywords = (val) => {
  return `/cloudsearch?keywords=${val}`
}
/*
热搜列表(详细)
说明 : 调用此接口,可获取热门搜索列表

接口地址 : /search/hot/detail

调用例子 : /search/hot/detail

搜索建议
说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息

必选参数 : keywords : 关键词

可选参数 : type : 如果传 'mobile' 则返回移动端数据

接口地址 : /search/suggest

调用例子 : /search/suggest?keywords=海阔天空 /search/suggest?keywords=海阔天空&type=mobile
*/
