<template>
    <div class="box">

        <div class="rankinglist-nav">
            <div @click="gotoPreviousPage">
                <van-icon name="arrow-left" size="24" />
            </div>
            <div class="nav-text">排行榜</div>
        </div>

        <div class="officiallist-box">

            <div class="text">官方榜</div>

            <div class="minibox" v-for="l in RankingListdata" :key="l.id" @click="getId(l.id)">
                <div class="minibox-tou">
                    <div class="name">{{l.name}}</div>
                    <div class="updateFrequency">{{l.updateFrequency}}</div>
                </div>
                <div class="minibox-content">
                    <div class="coverImgUrl">
                        <img :src="l.coverImgUrl" alt="">
                    </div>
                    <div class="tracks">
                        <div class="first" v-for="(t,i) in l?.tracks" :key="i">{{i+1}}  {{t?.first}} <span>- {{t?.second}}</span> </div>
                      
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getRankingListdata } from '@/apis/rankinglist'
export default {
    data() {
        return {
            RankingListdata: [],
            track:[]
        }   
    },
    mounted() {
        this.getRankingListdata()
       
    },
    methods: {
        async getRankingListdata() {
            let { data } = await this.$axios(getRankingListdata);
               this.RankingListdata=data.list;
         
            
            console.log('aaaa',this.RankingListdata);
           
        },
         
        gotoPreviousPage(){
            this.$router.go(-1);
        },
        getId(id){
            this.$router.push(`/discovr/esch-rankingList?i=${id}`);
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    position: fixed;
    padding: 40px 10px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #222325;
    overflow: auto;
    z-index: 11;

    .rankinglist-nav {
        position: fixed;
        display: flex;
        padding: 10px;
        left: 0;
        top: 0;
        width: 100%;
        height: 40px;
        font-size: 16px;
        font-weight: bolder;
        color: #fff;
        align-items: center;
        background-color: #222325;

        .nav-text {
            margin: 0 auto;
            transform: translateX(-10px);
        }
    }

    .officiallist-box {
        .text{
            font-size: 14px;
           margin:10px;
           color: #fff;
        }
        .minibox {
            padding: 15px;
            margin-bottom: 15px;
            width: 100%;
            // height: 150px;
            border-radius: 15px;
            background-color: rgb(59 59 59);

            .minibox-tou {
                margin-bottom: 5px;
                display: flex;
                justify-content: space-between;

                .name {
                    font-size: 16px;
                    font-weight: bolder;
                    color: #fff;
                }

                .updateFrequency {
                    font-size: 20px;
                    transform: scale(0.5);
                    transform-origin: right top;
                    color: #9a9a9a;
                }
            }

            .minibox-content {
                
                display: flex;
                align-items: center;

                .coverImgUrl {
                    margin-right: 20px;
                    width: 70px;
                    height: 70px;
                    background-color: #fff;
                    img{
                        width: 100%;
                        display: block;
                    }
                }

                .tracks {
                    font-size: 13px;
                    margin-top: 10px;
                    .first {
                        margin-bottom: 10px;
                        width: 200px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #eee;
                        span {
                            color: rgb(143, 143, 143);
                        }
                    }
                }
            }
        }
    }
}
</style>