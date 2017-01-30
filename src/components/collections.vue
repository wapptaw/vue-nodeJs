<template>
    <article>
        <section>
            <div>
                <router-link to='/'>主页</router-link>
                <span>/</span>
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
                collections: ''
            }
        },

        created() {
            getTopicCollect(this.$route.params.loginname).then((response) => {
                this.collections = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },

        components: {
            topicList
        }
    }
</script>