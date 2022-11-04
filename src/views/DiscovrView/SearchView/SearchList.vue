<template>
  <div class="search-list" v-show="!loadingShow">
    <div
      @click="onSearchDetails(s.name)"
      class="search-item"
      v-for="s in songList"
      :key="s.id"
    >
      <van-icon name="search" size="17px" color="#777"
       />
      <span class="search-title">{{ s.name }}</span>
    </div>
   
  </div>
</template>

<script>
import { ALL_SEARCH_CONTENT } from "@/Tools/defaultSearch"
import {mapState, mapMutations } from "vuex";
import { searchKeywords } from "@/apis/search";
export default {
  data() {
    return {
      songList: [],
      
    };
  },

  props: {
    searchText: String,
    loadingShow:Boolean
  },

  watch: {
    searchText() {
      this.getSearchList()
    },
  },
  created(){
    this.getSearchList()
  },
  computed: {
    ...mapState(['keywords'])
  },
  methods: {
    getSearchList() {
      this.$emit("on-loading-show");
      this.$axios.get(searchKeywords(this.searchText)).then(({ data }) => {
        // 搜索加载失败
        if (data.result?.songCount == "0" || this.searchText=="") {
        
          this.$emit('onInexistenceShow', true);
         
        } else {
        
          this.$emit('onInexistenceShow', false);
   
        }

        let newSongArr = [];
        let saveSongListName = [];
        // 数组数据去重, 保留10项
        data.result?.songs?.forEach((s) => {
          if (saveSongListName.indexOf(s.name) < 0 && newSongArr.length < 10) {
            saveSongListName.push(s.name);

            newSongArr.push({
              name: s.name,
              id: s.id,
              al: s.al,
            });
          }

        });
        this.$emit("on-loading-show");
        this.songList = newSongArr;
      });
    },

    async onSearchDetails(val) {
      
      this.$emit("onChangeSearchText", val);
      this.$emit("on-loading-show");

    let data = await ALL_SEARCH_CONTENT({$axios: this.$axios, val})
          
          this.$emit("on-loading-show");
          this.$emit("onSearchListShow");
          this.onSynthesisData(data);
    },
    
     ...mapMutations(["onSearchKeyword","onSynthesisData"]),
  },
};
</script>

<style lang="scss" scoped>
.search-list {
 
  position: fixed;
  left: 0px;
  top: 54px;
  width: 100%;
  height: 100%;
  background-color: #151515;
  padding-left: 10px;

 
  .search-item {
    line-height: 45px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .search-title {
      color: #bbb;
      font-size: 14px;
      letter-spacing: 1px;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      width: 100%;
      margin-left: 5px;
      border-bottom: 1px solid rgba(255, 255, 255, .15);
    }
  }
}
</style>