<template>
  <div class="singer-mv-view">
    <div class="singer-mv-count">{{ singertMv.length }}个视频</div>
    <ul class="singer-mv-list">
      <li v-for="s in singertMv" :key="s.id">
        <div class="singer-title-mv" @click="gotoMvrouter(s.id)">
          <img class="singermv-img" :src="s.imgurl" alt="" />
          <div class="singer-title-text">
            <p class="van-ellipsis">{{ s.name }}</p>
            <p class="title-name">{{ s.artistName }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
// import 
export default {
  props: {
    singertMv: Array,
  },

  
  methods: {
    gotoMvrouter(id) {
      this.$router.push(`/singermv/?mvid=${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.singer-mv-view {
  .singer-mv-count {
    padding: 10px 20px;
  }

  .singer-mv-list {
    .singer-title-mv {
      padding: 10px 20px;
      display: flex;
      align-items: center;
      .singermv-img {
        width: 80px;
        border-radius: 15px;
        display: block;
      }

      .singer-title-text {
        margin-left: 10px;
        width: 60%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .title-name {
          margin-top: 5px;
          color: #666;
        }
      }
    }
  }
}
</style>