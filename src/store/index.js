import Vue from 'vue'
import Vuex from 'vuex'
import { NEWSONGSAPI } from '../apis/play'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keywords: '', // 搜索关键字,
    synthesisData: [] // 搜索模块综合数据
    // 歌曲列表
    songsList: [],
    // 当前播放歌曲  等于本地缓存中的 changerMusci
    playingMusic: JSON.parse(localStorage.changerMusci),
    // 显示隐藏歌曲列表组件 的控件 Popup 弹出层
    showSongList: false,
    // 音乐是否正在播放 默认不播放
    audioPlayState: false,
    // 播放时长
    duration: 0,


  },
  getters: {
  },
  mutations: {

    onSearchKeyword(state, keywords) {
      state.keywords = keywords
    },

    onSynthesisData(state,  data ){
      state.synthesisData = data
    }

    // 歌曲列表
    setSongsList(state, songsList) {
      state.songsList = songsList
    },
    // 持久化

    // 当前播放音乐
    setPlayingMusic(state, music) {
      state.playingMusic = music
    },

    // 音乐播放时长
    setMusicduration(state, duration) {
      state.duration = duration

    },

    // 切换歌曲
    changeoverMusci(state, music) {
      state.playingMusic = music
      // 存进本地缓存中
      localStorage.changerMusci = JSON.stringify(music)
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
        // 当前数据持久话的歌曲
        localStorage.changerMusci = JSON.stringify(songsList[0])

      }
      commit('setSongsList', songsList)
      // 如果当前播放音乐为空
      if (!state.playingMusic) {
        commit('setPlayingMusic', JSON.parse(localStorage.changerMusci))
      }
    }
  },
  modules: {
  }
})
