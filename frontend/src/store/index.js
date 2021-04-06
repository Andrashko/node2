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
        }
    }
});

export default store;