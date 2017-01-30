<template>
    <section class="topicList">
        <ul>
            <li v-for="(topic, index) of topics" @mouseover="bghover(index)" @mouseout="bgout" :class="{hover: index === record}">
                <router-link :to="{name: 'user', params: {loginname: topic.author.loginname}}"><img :src="topic.author.avatar_url" :title="topic.author.loginname"></router-link>
                <span class="reply_visit_count">
                    <span class="replay_count">{{ topic.reply_count }}</span>
                    <span class="solidus">/</span>
                    <span class="visit_count">{{ topic.visit_count }}</span>
                </span>
                <div class="tab">
                    <span v-if="topic.good" class="good">精品</span>
                    <span v-else-if="topic.top" class="top">置顶</span>
                    <span v-else>{{ tab[topic.tab] }}</span> 
                    <router-link :to="{name: 'topic', params: {id: topic.id}}">{{ topic.title }}</router-link>
                </div>
                <router-link :to="{name: 'topic', params: {id: topic.id}, hash: ``}">
                    <span class="last_reply">{{ last_reply(topic.last_reply_at) }}</span> 
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                record: '',
            }
        },

        props: ['topics'],

        computed: {
            ...mapState({
                tab: 'tab',
                last_reply: 'interval',
            })
        },

        methods: {
            bghover(index) {
                this.record = index;
            },
            bgout() {
                this.record = '';
            }
        },

        store
    }
</script>