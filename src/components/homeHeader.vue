<template>
    <header class="homeNav">
        <router-link to="/">
            <img src="../images/cnodejs_light.svg" alt="logo">
        </router-link>
        <input type="text">
        <ul>
            <li v-for="nav of navs">
                <router-link :to="nav.skip">
                    {{ nav.name }}
                </router-link>
            </li>
        </ul>
    </header>
</template>

<script>
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
        }
    }
</script>
