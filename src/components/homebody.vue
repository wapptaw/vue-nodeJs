<template>
    <article class="home">
        <section class="topicSorts">
            <nav>
                <ul>
                    <li v-for="(sort, index) of sorts" @click="select(index)" :class="{selected: sort.selected}">
                        <router-link :to="{ path: '/', query: {tab: sort.en, page: $route.query.page}}">{{ sort.name }}</router-link>
                    </li>
                </ul>
            </nav>
            <topicList :topics="topics | sort($route.query.tab)"></topicList>
            <ul class="pageNav">
                <li>
                    <router-link :to="{path: '/', query: {page: 1, tab: $route.query.tab}}">«</router-link>
                </li>
                <li v-if="font" class="ellipsis">...</li>
                <li v-for="num of pages">
                    <router-link :to="{path: '/', query: {page: num.number, tab: $route.query.tab}}" :class="{selected_page: num.selected}">
                        {{ num.number }}
                    </router-link>
                </li>
                <li v-if="back" class="ellipsis">...</li>
                <li>
                    <router-link :to="{path: '/', query: {page: 100, tab: $route.query.tab}}">»</router-link><!--不清楚总共有多少页，不知道咋写-->
                </li>
            </ul>
        </section>
    </article>
</template>

<script>
    import topicList from './topicList.vue'
    import { getTopics } from '../api.js';
    import { sort } from '../filters.js';
    import { getTopic } from '../api.js';

    export default {
        data() {
            return {
                topics: '',
                sorts: [
                    {name: '全部', en: 'all', selected: true},
                    {name: '精华', en: 'good', selected: false},
                    {name: '分享', en: 'share', selected: false},
                    {name: '问答', en: 'ask', selected: false},
                    {name: '招聘', en: 'job', selected: false},
                ],
                font: false,
                back: true,
                counter: 1,
            }
        },

        computed: {
            pages() {
                let pages = [];
                const count = this.counter;
                for(let i=count; i<count+5; i++) {
                    let page = { number: i, selected: false };
                    pages.push(page);
                }
                const to_query_page = this.$route.query.page;
                if(to_query_page) {
                    if(to_query_page > 3) {
                        pages[2].selected = true;
                    }else {
                        pages[to_query_page-1].selected = true;
                    }
                }else {
                    pages[0].selected = true;
                }
                return pages;
            }
        },

        beforeRouteUpdate(to, from, next) {
            let to_query_page = to.query.page;
            getTopics(to_query_page).then((response) => {
                this.topics = response.data;
                this.last_reply(response.data);
                if(to_query_page > 3) {
                    this.counter = to_query_page - 2;
                    this.font = true;
                }else {
                    this.counter = 1;
                    this.font =false;
                }
                next();
            });
        },

        methods: {
            select(index) {
                this.sorts.forEach((val, ind) => {
                    if(index === ind) {
                        val.selected = true;
                    }else {
                        val.selected = false;
                    }
                })
            },
            last_reply(data) {
                data.forEach((val) => {
                    getTopic(val.id).then((response) => {
                        const replies_len = response.data.replies.length;
                        if(replies_len > 0) {
                            val.last_reply_avatar_url = response.data.replies[replies_len-1].author.avatar_url;
                            val.last_reply_loginname = response.data.replies[replies_len-1].author.loginname;
                            val.last_reply_id = response.data.replies[replies_len-1].id;
                            val.last_reply_img = true;
                        } else {
                            val.last_reply_img = false;
                        }
                    }).catch((error) => {
                        console.log(error);
                    })
                })
            }
        },

        created() {
            getTopics()
            .then((response) => {
                this.topics = response.data;
                this.last_reply(this.topics);
            })
            .catch((error) => {
                console.log(error);
            })
        },

        filters: {
            sort,
        },

        components: {
            topicList
        },
    }
</script>