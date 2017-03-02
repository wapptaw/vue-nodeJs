<template>
    <div v-if="loading">加载中...</div>
    <article class="createTopic" v-else>
        <section>
            <div class="path">
                <router-link to='/'>主页</router-link>
                <span class="slash">/</span>
                <span>发布话题</span>
            </div>
            <div class="creation">
                <div v-if="hint" class="hint">{{ message }}</div>
                <div class="module">
                    选择模块：
                    <select v-model="tab">
                        <option :value="option.val" v-for="option of selects">{{ option.option }}</option>
                    </select>
                </div>
                <div class="topicTitle">
                    <input type="text" placeholder="标题字数10字以上" v-model="title">
                </div>
                <div class="assist">
                    <span v-for="markIcon of markIcons" :style="markIcon.btnStyle" @click="tagType(markIcon.type)">{{ markIcon.message }}</span>
                </div>
                <div class="editor">
                    <textarea v-model="myTopic"></textarea>
                </div>
                <div class="submit">
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
                hint: false,
                message: '',
                markIcons: [
                    { btnStyle: {backgroundColor: '',}, message: '加粗', type: '****' },
                    { btnStyle: {backgroundColor: '',}, message: '斜体', type: '**' },
                    { btnStyle: {backgroundColor: '',}, message: '引用', type: '>' },
                    { btnStyle: {backgroundColor: '',}, message: '无序列表', type: '*' },
                    { btnStyle: {backgroundColor: '',}, message: '有序列表', type: '1.' },
                    { btnStyle: {backgroundColor: '',}, message: '加粗' },
                    { btnStyle: {backgroundColor: '',}, message: '加粗' },
                    { btnStyle: {backgroundColor: '',}, message: '加粗' },
                    { btnStyle: {backgroundColor: '',}, message: '加粗' },
                ]
            }
        },

        created() {
            this.loading = false;
        },

        computed: {
            // trans() {
            //     this.myTopic.replace(/^#{3}\s(.*(?=\n))/g, '<h2>$&</h2>')
            // },

            ...mapState({
                accesstoken: 'accesstoken',
            })
        },

        methods: {
            submit(val) {
                let content = {};
                if(this.accesstoken) {
                    content.accesstoken = this.accesstoken;
                    this.hint = false;
                } else {
                    this.hint = true;
                    this.message = '请先登录';
                    return;
                }
                if(this.title) {
                    content.title = this.title;
                    this.hint = false;
                } else if (this.title.length < 10) {
                    this.hint = true;
                    this.message = '标题不能小于10个字符';
                    return;
                }
                if(this.tab) {
                    content.tab = this.tab;
                    this.hint = false;
                } else {
                    this.hint = true;
                    this.message = '请选择一个板块';
                    return;
                }
                if(this.myTopic) {
                    content.content = this.myTopic;
                    this.hint = false;
                } else {
                    this.hint = true;
                    this.message = '内容不能为空';
                    return;
                }
                createTopic(content);
            },
            tagType(mark) {
                this.myTopic = this.myTopic + mark;
            }
        },


        store
    }
</script>