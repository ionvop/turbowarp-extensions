(function(Scratch) {
    "use strict";

    let openrouterIcon = "data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSI1MTIiCiAgaGVpZ2h0PSI1MTIiCiAgdmlld0JveD0iMCAwIDUxMiA1MTIiCiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIGZpbGw9IiM5NGEzYjgiCiAgc3Ryb2tlPSIjOTRhM2I4Igo+CiAgPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzIwNV8zKSI+CiAgICA8cGF0aAogICAgICBkPSJNMyAyNDguOTQ1QzE4IDI0OC45NDUgNzYgMjM2IDEwNiAyMTlDMTM2IDIwMiAxMzYgMjAyIDE5OCAxNThDMjc2LjQ5NyAxMDIuMjkzIDMzMiAxMjAuOTQ1IDQyMyAxMjAuOTQ1IgogICAgICBzdHJva2Utd2lkdGg9IjkwIgogICAgLz4KICAgIDxwYXRoIGQ9Ik01MTEgMTIxLjVMMzU3LjI1IDIxMC4yNjhMMzU3LjI1IDMyLjczMjRMNTExIDEyMS41WiIgLz4KICAgIDxwYXRoCiAgICAgIGQ9Ik0wIDI0OUMxNSAyNDkgNzMgMjYxLjk0NSAxMDMgMjc4Ljk0NUMxMzMgMjk1Ljk0NSAxMzMgMjk1Ljk0NSAxOTUgMzM5Ljk0NUMyNzMuNDk3IDM5NS42NTIgMzI5IDM3NyA0MjAgMzc3IgogICAgICBzdHJva2Utd2lkdGg9IjkwIgogICAgLz4KICAgIDxwYXRoIGQ9Ik01MDggMzc2LjQ0NUwzNTQuMjUgMjg3LjY3OEwzNTQuMjUgNDY1LjIxM0w1MDggMzc2LjQ0NVoiIC8+CiAgPC9nPgo8L3N2Zz4=";
    let history = [];
    let apiKey = "";
    let apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    let model = "";
    let params = {};
    let response = {};

    let modelList = [
        {
            text: "gpt-4o-mini",
            value: "gpt-4o-mini"
        },
        {
            text: "gpt-3.5-turbo",
            value: "gpt-3.5-turbo"
        }
    ];

    let retryCount = 0;
    getModelList();

    function getModelList() {
        fetch("https://openrouter.ai/api/v1/models", {
            method: "GET"
        }).then(res => res.json()).then(data => {
            modelList = [];
    
            data.data.forEach(element => {
                modelList.push({
                    text: element.name,
                    value: element.id
                });
            });
        }).catch(err => {
            console.error(err);

            if (retryCount > 3) {
                console.error("Failed to get model list");
                return;
            }

            setTimeout(() => {
                retryCount++;
                getModelList();
            }, 4000);
        });
    }

    class IonvopOpenRouter {
        getInfo() {
            return {
                id: "ionvopopenrouter",
                name: "OpenRouter",
                color1: "#aaaaaa",
                color2: "#555555",
                color3: "#111111",
                docsURI: "https://github.com/ionvop/turbowarp-extensions",
                menuIconURI: openrouterIcon,
                blocks: [
                    {
                        opcode: "setApiKey",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set api key to [key]",
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "sk-or-v1-..."
                            }
                        }
                    },
                    "---",
                    {
                        opcode: "setModel",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set model to [model]",
                        arguments: {
                            model: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "modelsMenu",
                                defaultValue: "gpt-4o-mini"
                            }
                        }
                    },
                    {
                        opcode: "model",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "model"
                    },
                    "---",
                    {
                        opcode: "setHistory",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set messages to [history]",
                        arguments: {
                            history: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "[]"
                            }
                        }
                    },
                    {
                        opcode: "addMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "add [content] as [role] to messages",
                        arguments: {
                            content: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            },
                            role: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "rolesMenu",
                                defaultValue: "user"
                            }
                        }
                    },
                    {
                        opcode: "insertMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "insert [content] as [role] at item [index] in messages",
                        arguments: {
                            content: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            },
                            role: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "rolesMenu",
                                defaultValue: "user"
                            },
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "1"
                            }
                        }
                    },
                    {
                        opcode: "deleteMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "delete item [index] in messages",
                        arguments: {
                            index: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "1"
                            }
                        }
                    },
                    {
                        opcode: "deleteAllMessages",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "delete all messages"
                    },
                    {
                        opcode: "history",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "messages"
                    },
                    {
                        opcode: "historyLength",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "length of messages"
                    },
                    "---",
                    {
                        opcode: "setParameter",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set parameter [param] to [value]",
                        arguments: {
                            param: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "paramsMenu",
                                defaultValue: "temperature"
                            },
                            value: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "1.0"
                            }
                        }
                    },
                    {
                        opcode: "removeParameter",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "remove parameter [param]",
                        arguments: {
                            param: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "paramsMenu",
                                defaultValue: "temperature"
                            }
                        }
                    },
                    {
                        opcode: "resetParameters",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "reset parameters"
                    },
                    {
                        opcode: "parameters",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "parameters"
                    },
                    "---",
                    {
                        opcode: "sendMessage",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "send messages and wait"
                    },
                    {
                        opcode: "response",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "response"
                    },
                    "---",
                    {
                        opcode: "resetAll",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "reset all"
                    }
                ],
                menus: {
                    rolesMenu: {
                        acceptReporters: true,
                        items: [
                            "system",
                            "user",
                            "assistant"
                        ]
                    },
                    modelsMenu: {
                        acceptReporters: true,
                        items: "modelsMenuFunction"
                    },
                    paramsMenu: {
                        acceptReporters: true,
                        items: [
                            "temperature",
                            "top_p",
                            "top_k",
                            "frequency_penalty",
                            "presence_penalty",
                            "repetition_penalty",
                            "min_p",
                            "top_a",
                            "seed",
                            "max_tokens",
                            "logit_bias",
                            "logprobs",
                            "top_logprobs",
                            "response_format",
                            "stop",
                            "tools",
                            "tool_choice"
                        ]
                    }
                }
            }
        }

        setApiKey(args) {
            apiKey = args.key;
        }

        setModel(args) {
            model = args.model;
        }

        model() {
            return model;
        }

        modelList() {
            let result = "";

            modelList.forEach(element => {
                result += element.text + "\n";
            });

            result = result.trim();
            return result;
        }

        setHistory(args) {
            history = JSON.parse(args.history);
        }

        addMessage(args) {
            let message = {
                role: args.role,
                content: args.content
            };

            history.push(message);
        }

        insertMessage(args) {
            let message = {
                role: args.role,
                content: args.content
            };

            history.splice(args.index - 1, 0, message);
        }

        deleteMessage(args) {
            history.splice(args.index - 1, 1);
        }

        deleteAllMessages() {
            history = [];
        }

        history() {
            return JSON.stringify(history);
        }

        historyLength() {
            return history.length;
        }

        setParameter(args) {
            params[args.param] = args.value;
        }

        removeParameter(args) {
            delete params[args.param];
        }

        resetParameters() {
            params = {};
        }

        parameters() {
            return JSON.stringify(params);
        }

        sendMessage() {
            return fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apiKey
                },
                body: JSON.stringify({
                    model: model,
                    messages: history,
                    ...params
                })
            }).then(res => res.json()).then(data => {
                try {
                    response = data.choices[0].message.content;
                } catch {
                    response = "";
                }
            });
        }

        response() {
            return response;
        }

        resetAll() {
            history = [];
            apiKey = "";
            model = "";
            params = {};
            response = {};

            modelList = [
                {
                    text: "gpt-4o-mini",
                    value: "gpt-4o-mini"
                },
                {
                    text: "gpt-3.5-turbo",
                    value: "gpt-3.5-turbo"
                }
            ];
        }

        modelsMenuFunction() {
            return modelList;
        }
    }

    Scratch.extensions.register(new IonvopOpenRouter());
})(Scratch);