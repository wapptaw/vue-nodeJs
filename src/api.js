// 获取话题列表
export const getTopics = async (num=1) => {
    const response = await fetch(`https://cnodejs.org/api/v1/topics?page=${num}`, {
        mode: 'cors'
    }).catch((error) => {
        console.log(error);
    });

    return await response.json().catch((error) => {
        console.log(error);
    });
}
// 获取话题详情
export const getTopic = async (id) => {
    const response = await fetch(`https://cnodejs.org/api/v1/topic/${id}`, {
        mode: 'cors'
    }).catch((error) => {
        console.log(error);
    });
    
    return await response.json().catch((errot) => {
        console.log(error);
    });
}
// 获取用户详情
export const getUser = async (loginname) => {
    const response = await fetch(`https://cnodejs.org/api/v1/user/${loginname}`, {
        mode: 'cors'
    }).catch((error) => {
        console.log(error);
    });

    return await response.json().catch((error) => {
        console.log(error);
    });
}
// 验证登录信息
export const loginCheck = async (accessToken) => {
    const response = await fetch(`https://cnodejs.org/api/v1/accesstoken`, {
        method: 'POST',
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: `accesstoken=${accessToken}`,
        mode: 'cors'
    }).catch((error) => {
        console.log(error);
    });

    return await response.json().catch((error) => {
        console.log(error);
    })
}
// 新建主题
export const createTopic = async (backval) => {
    const response = await fetch(`https://cnodejs.org/api/v1/topics`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `accesstoken=${backval.accesstoken}&title=${backval.title}&tab=${backval.tab}&content=${backval.content}`,
        mode: 'cors'
    }).catch(error => {
        console.log(error);
    });

    return await response.json().catch(error => {
        console.log(error);
    })
}
// 获取用户收藏页
export const getTopicCollect = async (loginname) => {
    const response = await fetch(`https://cnodejs.org/api/v1/topic_collect/${loginname}`, {
        mode: 'cors'
    }).catch((error) => {
        console.log(error);
    });

    return await response.json().catch((error) => {
        console.log(error);
    })
}