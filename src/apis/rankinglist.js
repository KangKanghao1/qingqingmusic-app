//所有榜单内容摘要
export const getRankingListdata = '/toplist/detail'

// 排行榜详情
export const getListDetails = id => `/playlist/detail?id=${id}`

// 排行榜评论
export const getRankingsComments = id => `/comment/playlist?id=${id}`

// 数字专辑-新碟上架 
// 获取6个
export const getNewDiscShelves = "/album/list?limit=6"

//数字专辑
export const getDigitalAlbumdata = type => `/album/songsaleboard?type=${type}&albumType=0`

export const ListOptions = [
    {
        id: 0,
        name: '日榜',
        type: 'daily',
    },
    {
        id: 0,
        name: '周榜',
        type: 'week',
    },
    {
        id: 0,
        name: '总榜',
        type: 'total',
    },

]