<template>
    <aside class="loginname">
        <h3>{{ title }}</h3>
        <div>
            <router-link :to="{name: 'user', params: {loginname: user.loginname}}">
                <img :src="user.avatar_url" alt="user.loginname">
                <span>{{ user.loginname }}</span>
            </router-link>
            <div>积分：{{ user.score }}</div>
            <em>不知道这句话在哪个API里</em>
        </div>
    </aside>
</template>

<script>
    export default {
        data() {
            return {
                title: '个人详情'
            }
        },

        props: ['user'],
    }
</script>