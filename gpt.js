(function (Scratch) {
    'use strict';

    let gptIcon = "data:image/png;base64,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";
    let log = [];
    let settings = {
        system: "",
        dialogue: [],
        memory: 0,
        prePrompt: "",
        midPrompt: "",
        postPrompt: "",
        apiKey: "",
        apiUrl: "https://api.openai.com/v1/chat/completions",
        model: "gpt-3.5-turbo"
    }

    let response = {
        reply: "",
        result: [],
        fullPrompt: [],
        response: {}
    }

    class IonvopGPT {
        getInfo() {
            return {
                id: "ionvopgpt",
                name: "GPT",
                color1: "#001100",
                color2: "#005500",
                color3: "#00aa00",
                docsURI: "https://github.com/ionvop/turbowarp-extensions#gpt",
                menuIconURI: gptIcon,
                blocks: [
                    {
                        opcode: "resetAll",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "reset all"
                    },
                    {
                        opcode: "setSettings",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set [option] to [value]",
                        arguments: {
                            option: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SETTINGS_MENU"
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "You are a helpful assistant."
                            }
                        }
                    },
                    {
                        opcode: "setMemory",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set memory to [value]",
                        arguments: {
                            value: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: "addPrompt",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "add [content] as [role] to [list]",
                        arguments: {
                            content: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            },
                            role: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ROLES_MENU"
                            },
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "LISTS_MENU"
                            }
                        }
                    },
                    {
                        opcode: "addJsonPrompt",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "[method] json array [content] to [list]",
                        arguments: {
                            method: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "METHODS_MENU"
                            },
                            content: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "[{\"role\": \"user\", \"content\": \"Hello, world!\"}]"
                            },
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "LISTS_MENU"
                            }
                        }
                    },
                    {
                        opcode: "clearPrompts",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "clear [list]",
                        arguments: {
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "LISTS_MENU"
                            }
                        }
                    },
                    {
                        opcode: "send",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "send [message] and wait",
                        arguments: {
                            message: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello, world!"
                            }
                        }
                    },
                    {
                        opcode: "getResponse",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "get data of [response]",
                        arguments: {
                            response: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "RESPONSES_MENU"
                            }
                        }
                    },
                    {
                        opcode: "getSettings",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "get setting [option]",
                        arguments: {
                            option: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "SETTINGS_MENU"
                            }
                        }
                    },
                    {
                        opcode: "getCurrent",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "get current [list]",
                        arguments: {
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "LISTS_MENU"
                            }
                        }
                    }
                ],
                menus: {
                    SETTINGS_MENU: {
                        acceptReporters: true,
                        items: [
                            "system",
                            {
                                text: "pre-prompt",
                                value: "prePrompt"
                            },
                            {
                                text: "mid-prompt",
                                value: "midPrompt"
                            },
                            {
                                text: "post-prompt",
                                value: "postPrompt"
                            },
                            {
                                text: "api key",
                                value: "apiKey"
                            },
                            {
                                text: "api url",
                                value: "apiUrl"
                            },
                            "model"
                        ]
                    },
                    ROLES_MENU: {
                        acceptReporters: true,
                        items: [
                            "user",
                            "assistant"
                        ]
                    },
                    LISTS_MENU: {
                        acceptReporters: true,
                        items: [
                            "log",
                            "dialogue"
                        ]
                    },
                    METHODS_MENU: {
                        acceptReporters: true,
                        items: [
                            "set",
                            "add"
                        ]
                    },
                    RESPONSES_MENU: {
                        acceptReporters: true,
                        items: [
                            "reply",
                            "result",
                            {
                                text: "full-prompt",
                                value: "fullPrompt"
                            },
                            "response"
                        ]
                    }
                }
            };
        }

        resetAll() {
            log = [];
            settings = {
                system: "",
                dialogue: [],
                memory: 0,
                prePrompt: "",
                midPrompt: "",
                postPrompt: "",
                apiKey: "",
                apiUrl: "https://api.openai.com/v1/chat/completions",
                model: "gpt-3.5-turbo"
            }

            response = {
                reply: "",
                result: [],
                fullPrompt: [],
                response: {}
            }
        }

        setSettings(args) {
            settings[args.option] = args.value;
        }

        setMemory(args) {
            settings.memory = args.value;
        }

        addPrompt(args) {
            switch (args.list) {
                case "log":
                    log.push({
                        role: args.role,
                        content: args.content
                    });

                    break;
                case "dialogue":
                    settings.dialogue.push({
                        role: args.role,
                        content: args.content
                    });

                    break;
            }
        }

        addJsonPrompt(args) {
            let content = JSON.parse(args.content);

            switch (args.list) {
                case "log":
                    if (args.method == "set") {
                        log = []
                    }

                    for (let element of content) {
                        log.push(element);
                    }

                    break;
                case "dialogue":
                    if (args.method == "set") {
                        settings.dialogue = [];
                    }

                    for (let element of content) {
                        settings.dialogue.push(element);
                    }

                    break;
            }
        }

        clearPrompts(args) {
            switch (args.list) {
                case "log":
                    log = []
                    break;
                case "dialogue":
                    settings.dialogue = [];
                    break;
            }
        }

        send(args) {
            let data = [];
            response.reply = "";
            response.result = [];
            response.fullPrompt = [];
            response.response = {};

            if (settings.system != "") {
                data.push({
                    role: "system",
                    content: settings.system
                });
            }

            for (let element of settings.dialogue) {
                data.push(element);
            }

            if (settings.prePrompt != "") {
                settings.prePrompt += "\n\n";
            }

            if (settings.midPrompt != "") {
                settings.midPrompt = "\n\n" + settings.midPrompt;
            }

            if (settings.memory == 0) {
                for (let element of log) {
                    data.push(element);
                }
            } else {
                let min = log.length - settings.memory;

                if (min < 0) {
                    min = 0;
                }

                for (let i = min; i < log.length; i++) {
                    data.push(log[i]);
                }
            }

            data.push({
                role: "user",
                content: settings.prePrompt + args.message + settings.midPrompt
            });

            return new Promise((resolve, reject) => {
                fetch(settings.apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + settings.apiKey
                    },
                    body: JSON.stringify({
                        model: settings.model,
                        messages: data
                    })
                }).then((res) => res.text()).then((text) => {
                    let res = JSON.parse(text);
                    data.push(res.choices[0].message);
    
                    if (settings.postPrompt != "") {
                        data.push({
                            role: "user",
                            content: settings.postPrompt
                        });
    
                        fetch(settings.apiUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + settings.apiKey
                            },
                            body: JSON.stringify({
                                model: settings.model,
                                messages: data
                            })
                        }).then((res) => res.text()).then((text) => {
                            let res = JSON.parse(text);
                            data.push(res.choices[0].message);
                            response.reply = res.choices[0].message.content;
                            response.fullPrompt = data;
                            response.response = res;
            
                            for (let element of log) {
                                response.result.push(element);
                            }
            
                            response.result.push({
                                role: "user",
                                content: args.message
                            });
            
                            response.result.push(res.choices[0].message);
                            resolve();
                            return;
                        });

                        return;
                    }
    
                    response.reply = res.choices[0].message.content;
                    response.fullPrompt = data;
                    response.response = res;
    
                    for (let element of log) {
                        response.result.push(element);
                    }
    
                    response.result.push({
                        role: "user",
                        content: args.message
                    });
    
                    response.result.push(res.choices[0].message);
                    resolve();
                    return;
                });
            });
        }

        getResponse(args) {
            switch (args.response) {
                case "reply":
                    return response[args.response];
                default:
                    return JSON.stringify(response[args.response]);
            }
        }

        getSettings(args) {
            return settings[args.option];
        }

        getCurrent(args) {
            switch (args.list) {
                case "log":
                    return JSON.stringify(log);
                case "dialogue":
                    return JSON.stringify(settings.dialogue);
            }
        }
    }
    Scratch.extensions.register(new IonvopGPT());
})(Scratch);
