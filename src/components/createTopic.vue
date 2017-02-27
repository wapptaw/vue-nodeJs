<template>
    <div v-if="loading">加载中...</div>
    <article class="createTopic" v-else>
        <section>
            <div class="path">
                <router-link to='/'>主页</router-link>
                <span class="slash">/</span>
                <span>发布话题</span>
            </div>
            <div>
                <div>
                    选择模块：
                    <select v-model="tab">
                        <option :value="option.val" v-for="option of selects">{{ option.option }}</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="标题字数10字以上" v-model="title">
                </div>
                <div>
                    <span v-for="markIcon of markIcons" :style="markIcon.btnStyle"></span>
                </div>
                <div>
                    <textarea name="" id="" cols="30" rows="10" v-model="myTopic"></textarea>
                </div>
                <div>
                    <input type="submit" @click="submit">
                </div>
            </div>
        </section>
    </article>
</template>

<script>
    import { createTopic } from '../api.js';
    import store from '../vuex/store.js';
    import { mapState } from 'vuex';

    export default {
        data() {
            return {
                loading: true,
                selects: [
                    { option: '请选择', val: '' },
                    { option: '分享', val: 'share' },
                    { option: '回答', val: 'ask' },
                    { option: '招聘', val: 'job' },
                ],
                title: '',
                tab: '',
                myTopic: '',
                markIcons: [
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                    { btnStyle: {backgroundColor: 'red',} },
                ]
            }
        },

        created() {
            this.loading = false;
        },

        computed: {
            trans() {
                this.myTopic.replace(/^#{3}\s(.*(?=\n))/g, '<h2>$&</h2>')
            },

            ...mapState({
                accesstoken: 'accesstoken',
            })
        },

        methods: {
            submit(val) {
                let content = {};
                if(this.accesstoken) {
                    content.accesstoken = this.accesstoken;
                } else {
                    console.log('请先登录');
                    return;
                }
                if(this.title) {
                    content.title = this.title;
                } else {
                    console.log('标题不能为空');
                    return;
                }
                if(this.tab) {
                    content.tab = this.tab;
                } else {
                    console.log('请选择一个板块')
                    return;
                }
                if(this.myTopic) {
                    content.content = this.myTopic;
                } else {
                    console.log('内容不能为空');
                    return;
                }
                createTopic(content);
            }
        },

        store
    }
</script>