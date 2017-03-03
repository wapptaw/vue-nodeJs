<template>
    <header class="homeNav">
        <router-link to="/">
            <img src="../images/cnodejs_light.svg" alt="logo">
        </router-link>
        <input type="text">
        <ul>
            <li v-for="nav of logined" @click="use(nav.use)">
                <router-link :to="nav.jump">
                    {{ nav.name }}
                </router-link>
            </li>
        </ul>
    </header>
</template>

<script>
    import store from '../vuex/store.js';

    export default {
        data() {
            return {
                navs: [
                    {name: '首页', jump: '/'},
                    {name: '新手入门', jump: 'getstart'},
                    {name: 'API', jump: 'API'},
                    {name: '关于', jump: 'about'},
                    {name: '注册', jump: 'login'},
                    {name: '登录', jump: 'signin'}
                ]
            }
        },

        computed: {
            logined() {
                if(this.$store.state.logined.success) {
                    let _navs = [
                        { name: '首页', jump: '/' },
                        { name: '未读消息', jump: 'message' },
                        { name: '新手入门', jump: 'getstart' },
                        { name: 'API', jump: 'API' },
                        { name: '关于', jump: 'about' },
                        { name: '设置', jump: 'setup' },
                        { name: '退出', jump: '/', use: 'quit' }
                    ];
                    return _navs;
                } else {
                    return this.navs;
                }
            }
        },

        methods: {
            use(use) {
                if(use === 'quit') {
                    this.$store.commit('changeLogined');
                }
            }
        },

        store
    }
</script>
