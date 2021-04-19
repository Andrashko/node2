import store from "@/store";

const ERROR_MESSAGE_DELAY = 10000;
const MESSAGE_DELAY = 3000;

function showErrorMessage(err) {
    console.error(err);
    store.dispatch("showMessageForTime", {
        message: {
            title: err.name,
            text: err.message
        },
        timeout: ERROR_MESSAGE_DELAY
    });
}

function showMessage(title, text){
    store.dispatch("showMessageForTime", {
        message: {
            title,
            text
        },
        timeout: MESSAGE_DELAY
    });
}

export {showErrorMessage , showMessage};