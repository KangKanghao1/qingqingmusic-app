// 歌曲详情
export const getSongDetail = id => `/song/detail?ids=${id}`

// 推荐歌单
// /top/playlist/highquality
export const getPlaylistdata = `/personalized?limit=6`


// 每日推荐/recommend/songs
export const getdailylisttdata = `/recommend/songs`

// 歌单所有歌曲 /playlist/track/all?id=24381616&limit=10&offset=1


// 获取精品歌单
// 说明 : 调用此接口 , 可获取精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 50
// 接口地址 : /top/playlist/highquality
// 调用例子 : /top/playlist/highquality?before=1503639064232&limit=3

export const BoutiqueSonglistdata = `/top/playlist/highquality`

// 热门歌单分类 /top/playlist
export const popularplaylistdata = `/top/playlist`

//歌单分类 /playlist/catlist 
export const getcatlistlistdata = `/playlist/catlist`


// 相关歌单推荐
// 说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 https://music.163.com/#/playlist?id=1)
// 必选参数 : id : 歌单 id
// 接口地址 : /related/playlist
// 调用例子 : /related/playlist?id=1


// 获取歌单详情 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐
// /playlist/detail?id=24381616

// 获取歌单所有歌曲 必选参数 : id : 歌单 id
// 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
export const getSongListdetailed = id => `/playlist/track/all?id=${id}&limit=30&offset=1`

// 歌手分类列表
// limit: 返回数量, 默认为 30
// offset: 偏移数量，用于limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial:
// 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 
// 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0分页, 如 : 如: (页数 - 1) * 30, 
// 其中 30 为 limit 的值, 默认为 0 initial: 按首字母索引查找参数, 如 / artist / list ? type = 1 & area=96 & initial=b 
// 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传 - 1, #传 0
// /artist/list?type=1&area=96&initial=b
export const getSongtypeareaList = (type,area,data) => `/artist/list?type=${type}&area=${area}&initial=${data}&limit=100`
// type 取值:
// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队
// area 取值:
// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他



// 获取歌曲详情 /song/detail?ids=347230

// 获取相似歌单 调用例子 : /simi/playlist?id=347230 ( 对应 ' 光辉岁月 ' 相似歌单 )


// 获取专辑内容 调用例子 : /album?id=32311


// 获取歌手单曲id: 歌手id      /artists?id=6452

// 获取歌手 mv 歌手id       /artist/mv?id=6452

// 获取歌手专辑 id: 歌手 id    /artist/album?id=6452&limit=5 ( 周杰伦 )

// 获取歌手描述歌手 id      /artist/desc?id=6452

// 获取歌手详情   /artist/detail?id=11972054

// 获取相似歌手id: 歌手 id   /simi/artist?id=6452 ( 对应和周杰伦相似歌手 )

// 推荐新音乐
// /personalized/newsong

// 排行榜

// 新歌

// 新碟

// 数字专辑

// 获取热门话题
// /hot/topic?limit=30&offset=30

// 获取话题详情
// /topic/detail?actid=111551188




