// 获取歌词 /lyric?id=33894312

// 推荐歌曲  新音乐
export const NEWSONGSAPI = '/personalized/newsong'


// 获取音乐 url
export const getSongUrl = id => `https://music.163.com/song/media/outer/url?id=${id}.mp3`

// 获取歌曲歌词
export const getLryic = id => `/lyric?id=${id}`


// 推荐 mv
// 说明 : 调用此接口 , 可获取推荐 mv
// 接口地址 : /personalized/mv

// 调用例子 : /personalized/mv
export const getpersonalizedmv = '/personalized/mv'

// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 必选参数 : id: mv id
// 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
export const getmvplay = id => `/mv/url?id=${id}`

// 获取歌手mv
// /artist/mv?id=6452

// 获取歌手专辑
// /artist/album?id=6452&limit=5


// 专辑动态信息
// 说明 : 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数

// 必选参数 : id: 专辑 id

// 调用例子 : /album/detail/dynamic?id=32311


// 获取 mv 数据
// 必选参数 : mvid: mv 的 id

// 调用例子 : /mv/detail?mvid=5436712