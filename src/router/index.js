import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscovrView from '@/views/DiscovrView/DiscovrView.vue'
import MyMusic from '@/views/MyMusic/MyMusic.vue'
import VideoClipView from '@/views/VideoClipView/VideoClipView.vue'
import UserView from '@/views/UserView/UserView.vue'
import UserPage from "@/views/UserView/UserPage.vue"
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
      component: () => import("../views/TypeNavView/RankingList.vue")
    }, {
      path: "esch-rankingList",
      name: "esch-rankingList",
      component: () => import("../views/TypeNavView/EschRankingList.vue")
    },

    {
      path: "search",
      name: "search",
      component: () => import("@/views/DiscovrView/SearchView")
    },
    ]

  },

  {
    path: '/mymusic',
    name: 'mymusic',
    component: MyMusic
  },

  {
    path: '/video',
    name: 'video',
    component: VideoClipView,
  },

  {
    path: '/user',
    name: 'user',
    component: UserView,
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
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
