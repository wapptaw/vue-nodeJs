<template>
    <div class="home">
        <article class="topicSorts">
            <nav>
                <ul>
                    <li v-for="(sort, index) of sorts" @click="select(index)" :class="{selected: sort.selected}">
                        <router-link :to="{ path: '/', query: {tab: sort.en} }">{{ sort.name }}</router-link>
                    </li>
                </ul>
            </nav>
            <topicList :topics="topics | sort($route.query.tab)"></topicList>
        </article>
    </div>
</template>

<script>
    import topicList from './topicList.vue'
    import { getTopics } from '../api.js';
    import { sort } from '../filters.js';

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
            }
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
            }
        },

        created() {
            getTopics()
            .then((data) => {
                this.topics = data.data;
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