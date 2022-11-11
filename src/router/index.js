import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscovrView from '@/views/DiscovrView/DiscovrView.vue'
import MyMusic from '@/views/MyMusic/MyMusic.vue'
import VideoClipView from '@/views/VideoClipView/VideoClipView.vue'
import UserView from '@/views/UserView/UserView.vue'
import UserPage from "@/views/UserView/UserPage.vue"
import LoginView from "@/views/UserView/LoginView.vue"
import store from "@/store/index"

// import CommentsView from "@/views/VideoClipView/CommentsView.vue"

Vue.use(VueRouter)

const routes = [
  {
    // 自定义重定义跳转到主页
    path: '',
    redirect: '/discovr',

  },
  {
    path: '/',
    redirect: '/discovr',

  },
  {
    path: '/discovr',
    name: 'discovr',
    component: DiscovrView,

    children: [{
      path: "ranking-list",
      name: "ranking-list",
      component: () => import("../views/TypeNavView/RankingListView/RankingList.vue")
    }, {
      path: "esch-rankingList",
      name: "esch-rankingList",
      component: () => import("../views/TypeNavView/RankingListView/EschRankingList.vue"),
      children: [{
        path: "/esch-rankingList/comments-section",
        name: "/esch-rankingList/comments-section",
        component: () => import("../views/TypeNavView/RankingListView/CommentsSection.vue")
      }]
    },
    {
      path: "digital-album",
      name: "digital-album",
      component: () => import("../views/TypeNavView/DigitalAlbumView/DigitalAlbum.vue")
    },
    {
      path: "search",
      name: "search",
      component: ()=> import('@/views/DiscovrView/SearchView/SearchView.vue'),
    }
  ]
  },

  {
    path: '/mymusic',
    name: 'mymusic',
    component: MyMusic,
    children: [{
      path: "recently-played",
      name: "recently-played",
      component: () => import("../views/MyMusic/RecentlyPlayed/RecentlyPlayed.vue")
    },
    {
      path:"live",
      name:"live",
      component:() => import("../views/MyMusic/MyLive.vue")
    }
  ]
  },

  {
    path: '/video',
    name: 'video',
    component: VideoClipView,
  },
  {
    path: '/login',
    name: 'login',
    //  component: ()=> import('@/views/UserView/LoginView.vue'),
    component: LoginView,

  },

  {
    path: '/user',
    name: 'user',
    component: UserView,
    beforeEnter:(to,from,next) => {
      if (store.state.isLogin) {
        next()
      }else {
        next('/login')
      }
    },
    children: [{
      path: "user-page",
      name: "user-page",
      component: UserPage
    }]
  },
  {
    path: "/Comments-list",
    name: "comments-list",
    component: () => import("../views/VideoClipView/CommentsView")
  },

  {
    path: "/songdata/:id",
    name: "songdata",
    component: () => import("../views/SongDetailView/SongDetailView.vue")
  },

  {
    path: "/musicrecommend",
    name: "musicrecommend",
    component: () => import("@/views/DiscovrView/MusicRecommend/MusicRecommend.vue")
  },
  {
    path: "/moresinger",
    name: "moresinger",
    component: () => import("@/views/DiscovrView/MoreSinger/MoreSinger.vue")
  },
  {
    path: "/gedanmusic",
    name: "gedanmusic",
    component: () => import("@/views/GedanMusicView/GedanMusicView.vue")
  },
  {
    path: "/singer",
    name: "singer",
    component: () => import("@/views/SingerDetailed/SingerDetailed.vue")
  }



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to) => {
//   console.log(to);
//   // if(to.path == "/login") {
//   //   store.state.isFooterMusic = false
//   // }else {
//   //   store.state.isFooterMusic = true
//   // }
// })

export default router
