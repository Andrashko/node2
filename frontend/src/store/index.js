import { createStore } from 'vuex';

const store = createStore({
    state:{
        messages: [
        ]
    },
    getters:{
        messageCount({messages}){
            return messages.length;
        }
    },
    mutations:{
        addMessage({messages}, message){
            messages.push(message);
        },
        removeMessage({messages}, message){
            const indexOfMessage = messages.findIndex(
                m => message.text === m.text 
            );
            if (indexOfMessage>-1)
                messages.splice(indexOfMessage, 1);
        }
    },
    actions:{
        showMessageForTime({commit}, {message, timeout}){
            commit("addMessage", message);
            setTimeout(()=>{
                commit("removeMessage", message);
            }, timeout);
        }
    }
});

export default store;