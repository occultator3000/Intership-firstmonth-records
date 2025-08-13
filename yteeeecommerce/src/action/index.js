//action的构建函数
const sendAction = (payload) => {
    return {
        type: "send_type",//必须要写
        value: "我是一个 action",
        payload: payload
    };
};

module.exports = {
    sendAction
};