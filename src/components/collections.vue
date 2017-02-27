<template>
    <div v-if="loading">加载中...</div>
    <article v-else>
        <section>
            <div class="path">
                <router-link to='/'>主页</router-link>
                <span class="slash">/</span>
                <span>{{ $route.params.loginname }}收藏的话题</span>
            </div>
            <topicList :topics="collections"></topicList>
        </section>
    </article>
</template>

<script>
    import topicList from './topicList.vue';
    import { getTopicCollect } from '../api.js';

    export default {
        data() {
            return {
                collections: '',
                loading: true,
            }
        },

        created() {
            getTopicCollect(this.$route.params.loginname).then((response) => {
                this.collections = response.data;
                this.loading = false;
            }).catch((error) => {
                console.log(error);
            });
        },

        components: {
            topicList
        }
    }
</script>