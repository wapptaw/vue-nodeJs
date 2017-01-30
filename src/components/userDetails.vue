<template>  
    <article>
        <section>
            <div>
                <router-link to='/'>主页</router-link>
                <span>/</span>
            </div>
            <div>
                <img :src="user.avatar_url" :alt="user.loginname">
                <span>{{ user.loginname }}</span>
            </div>
            <div>{{ user.score }}积分</div>
            <div>
                <router-link :to="`${user.loginname}/collections`">{{ topicCollect.length }}个话题收藏</router-link>
                <div>
                    <a :href="`https://github.com/${user.githubUsername}`">
                        <span>https://github.com/{{ user.githubUsername }}</span>
                        <span>@{{ user.githubUsername }}</span>
                    </a>
                </div>
                <div>注册时间{{ create_at(user.create_at) }}</div>
            </div>
        </section>
        <section>
            <h3>最近创建的话题</h3>
            <topicList :topics="user.recent_topics"></topicList>
        </section>
        <section>
            <h3>最近参与的话题</h3>
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

    export default {
        data() {
            return {
                user: '',
                topicCollect: '',
            }
        },

        created() {
            getUser(this.$route.params.loginname)
            .then((response) => {
                this.user = response.data;
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

        components: {
            topicList
        },

        store
    }
</script>