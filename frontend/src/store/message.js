export default{
    state:{
        messages: [],
    },
    getters: {
        messageCount({ messages }) {
            return messages.length;
        },
        messages(state){
            return state.messages;
        },
    },
    mutations: {
        addMessage({ messages }, message) {
            messages.push(message);
        },
        removeMessage({ messages }, message) {
            const indexOfMessage = messages.findIndex(
                m => message.text === m.text
            );
            if (indexOfMessage > -1)
                messages.splice(indexOfMessage, 1);
        },
    },
    actions: {
        showMessageForTime({ commit }, { message, timeout }) {
            commit("addMessage", message);
            setTimeout(() => {
                commit("removeMessage", message);
            }, timeout);
        },
    }
}