import Vue from 'vue';
import Vuex from 'vuex';
import { loginCheck } from '../api.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tab: {
            ask: '问答',
            share: '分享',
            job: '工作'
        },
        interval(time) {
            const current_date = new Date();
            const second = (current_date - Date.parse(time))/1000;
            const year = Math.floor(second/(60*60*24*365));
            const month = Math.floor(second/(60*60*24*30));
            const date = Math.floor(second/(60*60*24));
            const hour = Math.floor(second/(60*60));
            const minute = Math.floor(second/60);
            if(year) {
                return `${year} 年前`;
            } else if(month) {
                return `${month} 个月前`;
            } else if(date) {
                return `${date} 天前`;
            } else if(hour) {
                return `${hour} 小时前`;
            } else if(minute) {
                return `${minute} 分钟前`;
            } else {
                return `${Math.floor(second)} 秒前`;
            }
        },
        logined: '',
        accesstoken: ''
    },

    getters: {
        
    },

    actions: {
        logining({ state }, accessToken) {
            state.accesstoken = accessToken;
            loginCheck(accessToken).then((response) => {
                state.logined = response;
            }).catch((error) => {
                console.log(error);
            })
        }
    },

    mutatuins: {
        
    },

    modules: {

    }
})