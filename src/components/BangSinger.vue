<template>
  <div class="bang-singer">
    <div class="mv-content">
      <h3 class="mv-title">TOP歌手</h3>
      <span>更多</span>
    </div>
    <div class="bang">
      <div v-for="t in toplistartistData" :key="t.id">
        <div class="bang-img-title">
          <img class="bang-img" v-lazy="t.picUrl" />

          <div class="score-data">
            <i>1111</i>
            <span class="score">{{
              t.score > 10000
                ? (t.score = Math.floor(t.score / 1000) / 10 + "万")
                : t.score
            }}</span>
          </div>

          <div class="bang-title-alias">
            <h3 class="bang-title">{{ t.name }}</h3>
            <div class="bang.alias">
              <div v-for="(a, i) in t.alias" :key="i">
                <p class="alias">{{ a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toplistartistData: Array,
  },

  compontent: {},
};
</script>

<style lang="scss" scoped>
.bang-singer {
  width: 100%;
  padding: 0px 30px;

  .mv-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px 0;
    font-weight: bold;
    font-size: 16px;
  }

  .bang {
    padding: 15px;

    .bang-img-title {
      position: relative;
      width: 100%;
      box-shadow: 2px 0 7px 0;
      border-radius: 15px;
      overflow: hidden;
      margin-top: 20px;
      .score-data {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: rgba(255, 255, 255, 0.5);
        padding: 10px;
        border-radius: 999px;
        font-size: 20px;
        transform-origin: top right;
         transform: scale(0.5);
         color: #ff3333;
        .score {
          margin-left: 5px;
        }
      }

      .bang-img {
        display: block;
        width: 100%;
        border-radius: 15px;
      }

      .bang-title-alias {
        position: absolute;
        left: 10px;
        bottom: 10px;
        .bang-title {
          position: absolute;
          left: 0px;
          bottom: 40px;
          font-size: 30px;
          font-weight: bold;
          color: rgb(250, 87, 87);
        }

        .alias {
          font-size: 20px;
          font-weight: bold;
          color: #FF0000 ;
        }
      }
    }
  }
}
</style>