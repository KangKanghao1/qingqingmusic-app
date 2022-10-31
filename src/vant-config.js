
import { NavBar, Tabbar, List, TabbarItem, Icon, Search, Swipe, SwipeItem, Lazyload, Tab, Tabs,Popup,Dialog } from 'vant'

const vantCompontents = [
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Search,
    Swipe,
    SwipeItem,
    Lazyload,
    Tab,
    Tabs,
    List,
    Popup,
    Dialog
]

export default {
    install(Vue) {
        vantCompontents.forEach(Component => {
            Vue.use(Component)
        })
    }
}

// ui 库专用