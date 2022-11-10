// 歌手描述
export const getSingerDataAPI = id =>`artist/desc?id=${id}`

//歌手榜 /toplist/artist
export const gettoplistartistData = '/toplist/artist'

// 获取歌手详情
// 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
// 必选参数 : id: 歌手 id
// 调用例子 : /artist/detail?id=11972054 (Billie Eilish)
export const getartistdetail = id =>`/artist/detail?id=${id}`

// 获取相似歌手
// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
// 必选参数 : id: 歌手 id
// 调用例子 : /simi/artist?id=6452 ( 对应和周杰伦相似歌手 

// 获取歌手单曲
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 调用例子 : /artists?id=6452

// 获取歌手专辑
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
// 必选参数 : id: 歌手 id
// 可选参数 : limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
// 调用例子 : /artist/album?id=6452&limit=5