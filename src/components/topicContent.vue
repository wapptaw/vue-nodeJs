<template>
    <div v-if="loading">加载中...</div>
    <article class="topic_content" v-else>
        <section class="topic_header">
            <div class="title">
                <span v-if="topic.top">置顶</span>
                <span v-else-if="topic.good">精华</span>
                <h2>{{ topic.title }}</h2>
                <div>{{ topicMessage }}</div>
            </div>
            <div v-html="topic.content"></div>
        </section>
        <section class="topic_replies">
            <span>{{ topic.reply_count }} 回复</span>
            <ul>
                <li v-for="(reply, index) of topic.replies" :id="`hash${reply.id}`">
                    <router-link :to="{name: 'user', params: {loginname: reply.author.loginname}}" class="authorMess">
                        <img :src="reply.author.avatar_url" alt="reply.author.loginname">
                        <span>{{ reply.author.loginname }}</span>
                    </router-link>
                    <router-link :to="{hash: `hash${reply.id}`}" class="replyMess"> <!--这里采用document.querySelector()取得dom节点，不支持开头时数字的id名，所以加了辅助字符hash-->
                        <span>{{ `${index + 1}楼` }}</span>
                        <span>{{ create_at(reply.create_at) }}</span>
                    </router-link>
                    <span>{{ ups(reply) }}</span>
                    <div v-html="reply.content"></div>
                </li>
            </ul>
        </section>
    </article>
</template>

<script>
    import { getTopic } from '../api.js';
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default{
        data() {
            return {
                topic: '',
                loading: true,
            }
        },

        computed: {
            topicMessage() {
                if(this.topic !== ''){
                    return `• 发布于 ${this.create_at(this.topic.create_at)} • 作者 ${this.topic.author.loginname} • ${this.topic.visit_count} 次浏览 • 来自 ${this.tab[this.topic.tab]}`
                }
            },

            ...mapState({
                tab: 'tab',
                create_at: 'interval'
            })
        },

        methods: {
            ups(reply) {
                return reply.ups.length;
            }
        },

        created() {
            getTopic(this.$route.params.id)
            .then((response) => {
                this.topic = response.data;
                this.loading = false;
            });
        },

        store,
    }
</script>