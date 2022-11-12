<template>
  <div class="singer-song-com">
    <div class="special-album">{{ singerHotAlbums.length }}张专辑</div>
    <ul class="singer-ul">
      <li v-for="s in singerHotAlbums" :key="s.id" >
        <div class="singer-al-name" @click="toAlbumDetail(s.id)">
          <img class="singer-al-img" :src="s.blurPicUrl" alt="" />
          <div class="singer-song-name">
            <span class="singer-title-1hang">{{ s.name }}</span>
            <p class="singer-name">{{ s.alias[0] }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    singerHotAlbums: Array,
  },
  methods: {
    // 去专辑详情页
    toAlbumDetail(id){
      this.$router.push(`/discovr/search/album?id=${id}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.singer-song-com {
  overflow: auto;

  .special-album {
    padding: 10px 20px;
  }
  .singer-ul {
    li {
      margin-top: 15px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .singer-al-name {
        display: flex;
        align-items: center;
        .singer-al-img {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 15px;
          margin-right: 10px;
        }
        .singer-song-name {
          width: 60%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .singer-name {
            margin-top: 5px;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
