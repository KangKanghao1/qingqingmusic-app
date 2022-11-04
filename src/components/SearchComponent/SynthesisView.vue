<template>
  <div class="synthesis">
    <SingleView />
    <AlbumView />
    <SingerView />
    <SonglistView />
    <MvView />
    <TransceiverView />
  </div>
</template>

<script>
import SingleView from "@/components/SearchComponent/SingleView.vue";
import AlbumView from "@/components/SearchComponent/AlbumView.vue";
import SingerView from "@/components/SearchComponent/SingerView.vue";
import SonglistView from "@/components/SearchComponent/SonglistView.vue";
import MvView from "@/components/SearchComponent/MvView.vue";
import TransceiverView from "@/components/SearchComponent/TransceiverView.vue";

export default {
  components: {
    SingleView,
    AlbumView,
    SingerView,
    SonglistView,
    MvView,
    TransceiverView,
  },
};
</script>

<style lang="scss" scoped>
.synthesis {
  padding: 0px 15px 90px;
  margin-top: 15px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  
}
</style>