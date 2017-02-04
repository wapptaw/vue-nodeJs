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