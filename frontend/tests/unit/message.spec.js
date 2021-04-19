import message from "../../src/store/message";
import { createStore } from "vuex";

describe("Unit tests for message vuex unit", () => {
    describe("test getter messageCount", () => {
        it("should retun 2 for array of two messages", () => {
            // Arrange - підготовка оточення;
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
            ];
            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                getters: {
                    messageCount: message.getters.messageCount
                }
            });

            // Act - Виклик функції що тестується
            const count = store.getters.messageCount

            //Assert - твердження яке тестується
            expect(count).toEqual(2);
        });

        it("should retun 0 for empty array of messages", () => {
            // Arrange
            const store = createStore({
                state: {
                    messages: []
                },
                getters: {
                    messageCount: message.getters.messageCount
                }
            });

            // Act
            const count = store.getters.messageCount

            //Assert 
            expect(count).toEqual(0);
        });
    });

    describe("test getter messages", () => {
        it("should return the same array messages from state", () => {
            // Arrange 
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
            ];
            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                getters: {
                    messages: message.getters.messages
                }
            });
            // Act  
            const messages = store.getters.messages;

            //Assert 
            expect(messages).toEqual(expect.arrayContaining(testMessages));
        });
    });

    describe("test mutation addMessage", () => {
        it("should state.messages contain added message", () => {
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
            ];
            const newTestMessage = {
                text: "new message",
                title: "New"
            };
            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                mutations: {
                    addMessage: message.mutations.addMessage
                },
            });

            store.commit("addMessage", newTestMessage);

            expect(store.state.messages).toContainEqual(newTestMessage);
        });
    });

    describe("test mutation removeMessage", () => {
        it("should state.messages not contain removed messagge", () => {
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
                // {
                //     text: "This is other message",
                //     title: "Test 3",
                // },
            ];

            const messageToRemove = {
                text: "This is other message",
                title: "Test 2",
            };

            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                mutations: {
                    removeMessage: message.mutations.removeMessage
                },
            });

            store.commit("removeMessage", messageToRemove);

            expect(store.state.messages).not.toContainEqual(messageToRemove);
        });

        it("should not change state.messages if it not contain messagge to remove", () => {
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
            ];

            const messageToRemove = {
                text: "There is no such message",
                title: "Test 3",
            };

            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                mutations: {
                    removeMessage: message.mutations.removeMessage
                },
            });

            store.commit("removeMessage", messageToRemove);

            expect(store.state.messages).not.toContainEqual(messageToRemove);
            
        });
    });

    describe("tets action showMessageForTime", () => {
        it("should state.messages contain shown message", () => {
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
            ];
            const newTestMessage = {
                text: "new message",
                title: "New"
            };
            const timeout = 500;
            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                mutations: {
                    ...message.mutations
                },
                actions: {
                    showMessageForTime: message.actions.showMessageForTime
                }
            });

            store.dispatch("showMessageForTime", { message: newTestMessage, timeout });

            expect(store.state.messages).toContainEqual(newTestMessage);
            expect(store.state.messages).toEqual(expect.arrayContaining(testMessages));
        });

        it("should state.messages not contain shown message after timeout have passed", done => {
            const testMessages = [
                {
                    text: "This is test message",
                    title: "Test1",
                },
                {
                    text: "This is other message",
                    title: "Test 2",
                },
            ];
            const newTestMessage = {
                text: "new message",
                title: "New"
            };
            const timeout = 500;
            const store = createStore({
                state: {
                    messages: [...testMessages]
                },
                mutations: {
                    ...message.mutations
                },
                actions: {
                    showMessageForTime: message.actions.showMessageForTime
                }
            });

            jest.useFakeTimers();

            store.dispatch("showMessageForTime", { message: newTestMessage, timeout });

            setTimeout(() => {
                expect(store.state.messages).not.toContainEqual(newTestMessage);
                done();
            }, timeout);

            jest.runAllTimers();
        });
    });
});