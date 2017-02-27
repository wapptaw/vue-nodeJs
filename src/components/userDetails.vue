<template>  
    <div v-if="loading">加载中...</div>
    <article class="user" v-else>
        <section class="userPage">
            <div class="path">
                <router-link to='/'>主页</router-link>
                <span class="slash">/</span>
            </div>
            <div class="loginname">
                <img :src="user.avatar_url" :alt="user.loginname">
                <span>{{ user.loginname }}</span>
            </div>
            <div class="score">{{ user.score }}积分</div>
            <div class="github">
                <router-link :to="`${user.loginname}/collections`">{{ topicCollect.length }}个话题收藏</router-link>
                <div>
                    <a :href="`https://github.com/${user.githubUsername}`">
                        <span>https://github.com/{{ user.githubUsername }}</span>
                        <span>@{{ user.githubUsername }}</span>
                    </a>
                </div>
                <div class="createTime">注册时间{{ create_at(user.create_at) }}</div>
            </div>
        </section>
        <section>
            <div class="path">
                <h3>最近创建的话题</h3>
            </div>
            <topicList :topics="user.recent_topics"></topicList>
        </section>
        <section>
            <div class="path">
                <h3>最近创建的话题</h3>
            </div>
            <topicList :topics="user.recent_replies"></topicList>
        </section>
    </article>
</template>

<script>
    import topicList from './topicList.vue';
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';
    import { getUser } from '../api.js';
    import { getTopicCollect } from '../api.js';
    import { getTopic } from '../api.js';

    export default {
        data() {
            return {
                user: '',
                topicCollect: '',
                loading: true,
            }
        },

        created() {
            getUser(this.$route.params.loginname)
            .then((response) => {
                this.user = response.data;
                this.recent(response.data.recent_topics);
                this.recent(response.data.recent_replies);
                this.loading = false;
            })
            .catch((error) => {
                console.log(error);
            })

            getTopicCollect(this.$route.params.loginname)
            .then((response) => {
                this.topicCollect = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        },

        watch: {
            $route(to, from) {
                getUser(this.$route.params.loginname)
                .then((response) => {
                    this.user = response.data;
                    this.recent(response.data.recent_topics);
                    this.recent(response.data.recent_replies);
                })
                .catch((error) => {
                    console.log(error);
                });

                getTopicCollect(this.$route.params.loginname)
                .then((response) => {
                    this.topicCollect = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },

        computed: {
            ...mapState({
                create_at: 'interval',
            })
        },

        methods: {
            recent(data) {
                data.forEach((val) => {
                    getTopic(val.id).then((response) => {
                        val.reply_count = response.data.reply_count;
                        val.visit_count = response.data.visit_count;
                        val.good = response.data.good;
                        val.top = response.data.top;
                        val.tab = response.data.tab;
                    }).catch((error) => {
                        console.log(error);
                    });
                })
            }
        },

        components: {
            topicList
        },

        store
    }
</script>