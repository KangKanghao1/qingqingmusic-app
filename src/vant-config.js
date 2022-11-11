

import {Slider, NavBar, Tabbar,PullRefresh, List, TabbarItem, Icon, Search, Swipe, SwipeItem,Toast, Lazyload, Tab, Tabs,Popup,NoticeBar,Dialog ,Sticky,ShareSheet,Checkbox,CheckboxGroup,Loading,Overlay,Collapse, CollapseItem} from 'vant'



const vantCompontents = [
    Slider,
    NavBar,
    Tabbar,
    TabbarItem,
    Icon,
    Toast ,
    PullRefresh,
    Search,
    Swipe,
    SwipeItem,
    Lazyload,
    Tab,
    Tabs,
    List,
    Popup,
    NoticeBar,
    Sticky,
    ShareSheet,
    Checkbox,
    CheckboxGroup,
    Loading ,
    Dialog,
    Overlay,
    Collapse,
    CollapseItem
]

export default {
    install(Vue) {
        vantCompontents.forEach(Component => {
            Vue.use(Component)
        })
    }
}

// ui 库专用