<template>
    <header class="homeNav">
        <router-link to="/">
            <img src="../images/cnodejs_light.svg" alt="logo">
        </router-link>
        <input type="text">
        <ul>
            <li v-for="nav of logined">
                <router-link :to="nav.skip">
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
                    {name: '首页', skip: '/'},
                    {name: '新手入门', skip: 'getstart'},
                    {name: 'API', skip: 'API'},
                    {name: '关于', skip: 'about'},
                    {name: '注册', skip: 'login'},
                    {name: '登录', skip: 'signin'}
                ]
            }
        },

        computed: {
            logined() {
                if(this.$store.state.logined.success) {
                    this.navs.splice(1, 0, { name: '未读消息', skip: 'message' });
                    this.navs.splice(5, 2, { name: '设置', skip: 'setup' }, { name: '退出', skip: 'skip' });
                    return this.navs;
                } else {
                    return this.navs;
                }
            }
        },

        store
    }
</script>
