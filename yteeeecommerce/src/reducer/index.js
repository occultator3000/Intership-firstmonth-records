//reducer 函数处理发送的 action

const initState = {
    value: "默认值"
}
const reducer = (state = initState, action) => {
    console.log("reducer:",state, action);
    switch (action.type) {
        case "send_type":
            return Object.assign({}, state, action);
        default:
            return state;
    }
};

export default reducer; 