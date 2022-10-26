// 获取歌词 /lyric?id=33894312

// 推荐新音乐
export const NEW_SONGS_API = '/personalized/newsong'


// 获取音乐 url
export const getSongUrl = id => `https://music.163.com/song/media/outer/url?id=${id}.mp3`

// 获取歌曲歌词
export const getLryic = id => `/lyric?id=${id}`