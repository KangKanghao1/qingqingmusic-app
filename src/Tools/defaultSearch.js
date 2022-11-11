
export const SEARCH_PLACEHOLDER = [
  "原谅我改变 经典老歌",
  "人生何处不相逢 《最真的梦》",
  "我曾用心爱过你 至爱",
  "桥边姑娘 - 海伦",
  "不过人间 - 海来阿木",
  "富士山下 粤语",
  "微微 - 傅如乔",
  "若把你 最新很火哦"
];
//: 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
export const SEARCH_TAB = [{
    id: "1018",
    title: "综合",
    type: "synthesis"
  },
  {
    id: "1",
    title: "单曲",
    type: "single"
  },
  {
    id: "10",
    title: "专辑",
    type: "album"
  },
  {
    id: "100",
    title: "歌手",
    type: "singer"
  },
  {
    id: "1000",
    title: "歌单",
    type: "songlist"
  },
  // {
  //   id: "1002",
  //   title: "用户",
  //   type: "user"
  // },
  {
    id: "1004",
    title: "MV",
    type: "MV"
  },
  // {
  //   id: "1006",
  //   title: "歌词",
  //   type: "lyric"
  // },
  {
    id: "1009",
    title: "电台",
    type: "transceiver"
  },
  {
    id: "1014",
    title: "视频",
    type: "video"
  },
  // {
  //   id: "2000",
  //   title: "声音",
  //   type: "sound"
  // }
]
export const  searchKeywords = val => `/cloudsearch?limit=16&keywords=${val}`

// 综合数据
export const ALL_SEARCH_CONTENT =async ({
  $axios,
  val
}) => {
  let allSearchData = [];
  
    for(let i = 0; i < SEARCH_TAB.length; i++) {

    let {data} = await $axios.get(`/cloudsearch?type=${SEARCH_TAB[i].id}&keywords=${val}`)
      const type = SEARCH_TAB[i].type
      const title = SEARCH_TAB[i].title
    allSearchData.push({
      type,
      title,
      data: data.result
    })

    }
    console.log(allSearchData);
    return new Promise((relsove)=> {
      relsove(allSearchData)
    })

}

// 搜索分类获取一项数据
export const SEARCH_TABS_CONTENT = ({$axios, id, val,limit = 20,offset = 0}) => {

  return new Promise((relsove) => {

    $axios.get(`/cloudsearch?limit=${limit}&offset=${offset}&type=${id}&keywords=${val}`).then(({data}) => {

      relsove(data)

    })

  })
  
}


// 歌手粉丝数量
export const singerFansCount = id => `/artist/follow/count?id=${id}`

