<template>
  <div class="current-palylist">
    <div class="present-paly">
      <div class="present-title">
        当前播放队列<span class="present-count"> ({{ songsList.length }}</span
        >)
      </div>
      <div class="songsList-icon">
        <i class="file-icon"></i>收藏
        <i class="empty-icon" @click="delplaySongList" ></i>
      </div>
    </div>
    <ul class="play-list-song">
      <li class="songslist-content" v-for="(s, i) in songsList" :key="i">
        <div class="songsList">
          <div class="song-list-top">
            <img
              class="li-iconimg"
              :class="{ listiconimg: s.id == playingMusic.id }"
              :src="s.picUrl"
              alt=""
            />
            <span v-show="s.id !== playingMusic.id">{{ i + 1 }}</span>
          </div>
          <div class="songslist-name" @click="changeoverMusci(s)">
            <p
              class="music-name"
              :class="{ selected: s.id == playingMusic.id }"
            >
              {{ s.name }}
            </p>
            <div
              class="artists"
              :class="{ selectedas: s.id == playingMusic.id }"
            >
              {{ s.song?.artists[0]?.name }}
            </div>
          </div>
          <div class="like-del-download-icon">
            <div class="like-download-icon">
              <i class="like-icon"></i>
              <i class="download-icon"></i>
            </div>
            <i class="del-icon" @click.stop="delsongmusic(s.id)"></i>
          </div>
        </div>
      </li>
      <div class="muscilist-show" v-show="songsList.length == 0">列表中还没有歌曲哦！</div>
    </ul>
    
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { Dialog } from "vant";
export default {
  computed: {
    ...mapState(["songsList", "playingMusic", "audioPlayState"]),

  },
  methods: {
    ...mapMutations(["changeoverMusci", "delallSongList","delsongmusic"]),
    // 弹出确定要清空播放队列
    delplaySongList() {
      Dialog.confirm({
        title: "清空队列",
        message: "确定要清空播放队列吗?",
      confirmButtonColor:'red'
      })
        .then(() => {
          // on confirm
          this.delallSongList();
        })
        .catch(() => {
          // on cancel
        });
    },

  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
  display: none;
}
.current-palylist {
  width: 100vw;
  // margin: 0 auto 15px;
  border-radius: 15px;
  padding: 15px;
  color: #fff;
  background-color: #242121;

  .present-paly {
    height: 30px;
    font-size: 18px;
    font-weight: 200;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .present-count {
      margin-left: 10px;
    }

    .songsList-icon {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
      font-size: 14px;

      .file-icon {
        display: block;
        width: 28px;
        height: 28px;
        background-image: url("@/assets/imgs/24gl-folderPlus.png");
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 10px;
        content: "";
      }

      .empty-icon {
        display: block;
        width: 28px;
        height: 28px;
        background-image: url("@/assets/imgs/chuck_ic_delete_white_24dp.png");
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        margin-left: 10px;
        content: "";
      }
    }
  }

  .play-list-song {
    margin-top: 10px;
    max-height: 60vh;
    min-height: 45vh;
    overflow: auto;

    .muscilist-show {
      text-align: center;
      line-height: 250px;
    }

    .songslist-content {
      .songsList {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .song-list-top {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          color: #f6750b;
          font-size: 20px;
          margin-right: 10px;

          .li-iconimg {
            width: 100%;
            height: 100%;
            border-radius: 999px;
            border: 1px solid #fff;
            display: none;

            &.listiconimg {
              display: block;
            }
          }
        }
        .songslist-name {
          margin-right: auto;
          width: 50%;
          padding: 10px 0;

          .music-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 16px;
            font-weight: 100;
            color: #fff;

            &.selected {
              font-weight: 600;
              color: red;
            }
          }
          .artists {
            margin-top: 5px;
            font-size: 12px;
            transform-origin: top left;
            color: #999;
            font-weight: 100;

            &.selectedas {
              color: rgba(255, 106, 0, 0.847);
            }
          }
        }

        .like-del-download-icon {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .like-download-icon {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .like-icon {
              display: block;
              width: 20px;
              height: 20px;
              background-image: url("../assets/imgs/未收藏 .png");
              background-position: center center;
              background-size: cover;
              background-repeat: no-repeat;
              content: "";
              margin-right: 20px;
            }

            .download-icon {
              display: block;
              width: 20px;
              height: 20px;
              background-image: url("../assets/imgs/asf.png");
              background-position: center center;
              background-size: cover;
              background-repeat: no-repeat;
              content: "";
            }
          }

          .del-icon {
            display: block;
            width: 24px;
            height: 24px;
            background-image: url("../assets/imgs/camera_close_normal.png");
            background-position: center center;
            background-size: cover;
            background-repeat: no-repeat;
            content: "";
            margin-left: 20px;
          }
        }
      }
    }
  }
}

</style>