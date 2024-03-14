(function(Scratch) {
    'use strict';

    let message = "";

    window.onmessage = (e) => {
        message = e.data;
    };

    class MyExtension {
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
                        opcode: "getMessage",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "get message"
                    },
                    {
                        opcode: "setMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set message [message]",
                        arguments: {
                            message: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            }
                        }
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

        getMessage() {
            return message;
        }

        setMessage(args) {
            message = args.message;
        }

        postMessage(args) {
            window.top.postMessage(args.message, "*");
        }
    }

    Scratch.extensions.register(new MyExtension());
})(Scratch);