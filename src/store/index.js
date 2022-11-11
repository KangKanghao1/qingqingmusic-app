import Vue from 'vue'
import Vuex from 'vuex'
import { NEWSONGSAPI } from '../apis/play'

Vue.use(Vuex)


export default new Vuex.Store({
  //   modules: {
  //     user
  // },
  state: {
    keywords: '', // 搜索关键字,
    synthesisData: [], // 搜索模块综合数据
    // 歌曲列表
    songsList: [],
    // 当前播放歌曲  等于本地缓存中的 
    playingMusic: {},
    // 显示隐藏歌曲列表组件 的控件 Popup 弹出层
    showSongList: false,
    // 音乐是否正在播放 默认不播放
    audioPlayState: false,
    //判断是否登录
    isLogin: true,
    // 是否需要显示底部播放组件
    isFooterMusic: true,
    // 当前播放时间
    currentTime: 0,
    // 播放总时长
    duration: 0,
    // 控制上一首下一首music

    randommusic: 0,
    // 歌单歌曲封面
    songMusictitle: [],
    // 音乐歌词
    musiclyric: [],

  },
  getters: {
  },
  mutations: {

    onSearchKeyword(state, keywords) {
      state.keywords = keywords
    },

    onSynthesisData(state, data) {
      state.synthesisData = data
    },

    // 删除播放队列歌曲
    delsongmusic(state, id) {
      state.songsList = state.songsList.filter((t) => t.id !== id);
    },

    // 歌曲列表
    setSongsList(state, songsList) {
      state.songsList = songsList
    },

    // 当前播放音乐
    setPlayingMusic(state, music) {
      state.playingMusic = music
    },

    // 修改音乐播放总时长
    Musicduration(state, duration) {
      state.duration = duration
    },
    // 修改当前播放时间
    currenpalytTime(state, currentTime) {
      state.currentTime = currentTime
    },
    // 是否登录
    setisLogin(state, isLogin) {
      state.isLogin = isLogin

    },

    // 切换歌曲
    changeoverMusci(state, music) {
      state.playingMusic = music
      // 使用 find 方法来查找state.songsList 里面的歌曲 如果 查找输出等于undifeined
      //  则代表不是数组里面的歌曲则添加返回一个新数组对象
    let obj = state.songsList.find(x => x.id ==music.id)
    // console.log('obj ==>',obj);
    if(obj == undefined) {
      state.songsList = [...state.songsList, music]
    }

      // 存进本地缓存中
      localStorage.changerMusci = JSON.stringify(music)
      localStorage.songsList = JSON.stringify(state.songsList)
      // 点击切换歌曲之后自动播放 必须设置定时器异步控制state.audioPlayState的值
      // 因为在 app 设置的 watch 监听了 属性 上一个值需要为不同值才可以播放
      if (state.audioPlayState == false) {
        setTimeout(() => {
          state.audioPlayState = true
        }, 20);
      } else if (state.audioPlayState == true) {
        setTimeout(() => {
          state.audioPlayState = false
        }, 20);
        setTimeout(() => {
          state.audioPlayState = true
        }, 20);
      }
      console.log("当前播放", state.playingMusic);

    },

    // 随机切换歌曲到下一首音乐
    NextsongMusic(state) {

      let randomdigit = Math.floor(Math.random() * state.songsList.length)

      state.playingMusic = state.songsList[randomdigit]
      
      localStorage.changerMusci = JSON.stringify(state.playingMusic);

      if (state.audioPlayState == false) {
        setTimeout(() => {
          state.audioPlayState = true
        }, 20);
      } else if (state.audioPlayState == true) {
        setTimeout(() => {
          state.audioPlayState = false
        }, 20);
        setTimeout(() => {
          state.audioPlayState = true
        }, 20);
      }

    },

    // 控制播放暂停 
    audioPlayandstop(state) {
      state.audioPlayState = !state.audioPlayState
    },

    // 控制显示隐藏 显示
    showSongList(state) {
      state.showSongList = true
    },
    // 控制显示隐藏 隐藏 
    hideSongList(state) {
      state.showSongList = false
    },

    // 清空歌曲列表
    delallSongList(state) {
      state.songsList = []
    },
    // 获取歌单标题img等信息
    getsongMusictitle(state, data) {
      state.songMusictitle = data
    }

  },
  actions: {

    async getNewSong({ commit, state }, { axios }) {
      // songsList 等于 本地的持久化的数据
      let songsList = localStorage.songsList
      // 如果songsLists 存在 已经缓存了 则在缓存中拿数据
      if (songsList) {
        // 将本地的 json 字符串 转化为 数组
        songsList = JSON.parse(songsList)

      } else {
        // 如果没有缓存到本地则 网络请求然后存储到本地
        let { data } = await axios(NEWSONGSAPI)
        songsList = data.result
        // // 默认播放列表 存到本地缓存中   本地只能存储字符串需要转换
        localStorage.songsList = JSON.stringify(songsList)
        console.log(123);
        // 当前数据持久话的歌曲
        localStorage.changerMusci = JSON.stringify(songsList[0])

      }
      commit('setSongsList', songsList)

      // 如果当前播放歌曲等于空 则等于数据持久化的当前歌曲 否则页还是等于数据持久化的当前歌曲
      if (state.playingMusic == {}) {
        commit('setPlayingMusic', JSON.parse(localStorage.changerMusci??"{}"))
      } else {

        commit('setPlayingMusic', JSON.parse(localStorage.changerMusci??"{}"))
      }

    },

  },

})
