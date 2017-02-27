import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/topics.vue';
import homebody from '../components/homebody.vue';
import topicContent from '../components/topicContent.vue';
import userDetails from '../components/userDetails.vue';
import collections from '../components/collections.vue';
import createTopic from '../components/createTopic.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', 
            component: home,
            children: [
                {
                    path: '',
                    component: homebody,
                    meta: {
                        scrollToTop: true,
                    }
                },
                {
                    path: 'topic/create',
                    component: createTopic,
                },
                {
                    path: 'topic/:id',
                    name: 'topic',
                    component: topicContent,
                },
                {
                    path: 'user/:loginname',
                    name: 'user',
                    component: userDetails,
                    meta: {
                        scrollToTop: true,
                    }
                },
                {
                    path: 'user/:loginname/collections',
                    component: collections,
                }
            ]
        },
    ],

    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            const position = {};
            if(to.hash) {
                position.selector = to.hash;
            }
            if(to.matched.some(m => m.meta.scrollToTop)) {
                position.x = 0;
                position.y = 0;
            }
            return position;
        }
    }
})