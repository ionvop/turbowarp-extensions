(function(Scratch) {
    'use strict';

    let message = "";

    window.addEventListener("message", (event) => {
        message = event.data;
        Scratch.vm.runtime.startHats("ionvoppostmessage_whenMessageReceived");
    });

    class IonvopPostMessage {
        getInfo () {
            return {
                id: "ionvoppostmessage",
                name: "PM",
                color1: "#001111",
                color2: "#005555",
                color3: "#00aaaa",
                docsURI: "https://github.com/ionvop/turbowarp-extensions",
                blocks: [
                    {
                        opcode: "whenMessageReceived",
                        blockType: Scratch.BlockType.EVENT,
                        text: "when message received",
                        isEdgeActivated: false
                    },
                    {
                        opcode: "message",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "message"
                    },
                    {
                        opcode: "postMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "post message [message]",
                        arguments: {
                            message: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            }
                        }
                    }
                ]
            };
        }

        message() {
            return message;
        }

        postMessage(args) {
            window.top.postMessage(args.message, "*");
        }
    }

    Scratch.extensions.register(new IonvopPostMessage());
})(Scratch);