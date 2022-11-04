
import Vue from 'vue'
import Vuex from 'vuex'
import { NEWSONGSAPI } from '../apis/play'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 歌曲列表
    songsList: [],
    // 当前播放歌曲  等于本地缓存中的 changerMusci
    playingMusic: '',
    // JSON.parse(localStorage.changerMusci),
    // 显示隐藏歌曲列表组件 的控件 Popup 弹出层
    showSongList: false,
    // 音乐是否正在播放 默认不播放
    audioPlayState: false

  },
  getters: {
  },
  mutations: {
    // 歌曲列表
    setSongsList(state, songsList) {
      state.songsList = songsList
    },

    // 当前播放音乐
    setPlayingMusic(state, music) {
      state.playingMusic = music
    },

    // 切换歌曲
    changeoverMusci(state, music) {
      state.playingMusic = music
      state.audioPlayState = true
      console.log('控制1', state.audioPlayState);
      // 存进本地缓存中
      localStorage.changerMusci = JSON.stringify(music)
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

      let songsList = localStorage.songsList

      // 如果songsLists 存在 已经缓存了 则在缓存中拿数据
      if (songsList) {
        // 将本地的 json 字符串 转化为 数组
        songsList = JSON.parse(songsList)

      } else {
        // 如果没有缓存到本地则 网络请求然后存储到本地
        let { data } = await axios(NEWSONGSAPI)

        songsList = data.result

        // // 存到本地缓存中   本地只能存储字符串需要转换
        localStorage.songsList = JSON.stringify(songsList)
      }
      commit('setSongsList', songsList)
      if (!state.playingMusic) {
        commit('setPlayingMusic', songsList[0])
      }
    }
  },
  modules: {
  }
})
