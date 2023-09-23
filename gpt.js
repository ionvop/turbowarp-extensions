(function (Scratch) {
    'use strict';

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
                blocks: [
                    {
                        opcode: "setSetting",
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
                        text: "add json array [content] to [list]",
                        arguments: {
                            content: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "[{\"role\": \"user\", \"content\": \"Hello, world!\"}]"
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
                            "dialogue",
                            "log"
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

        setSetting(args) {
            settings[args.option] = args.value;
        }

        setMemory(args) {
            settings.memory = args.value;
        }

        addPrompt(args) {
            switch (args.list) {
                case "dialogue":
                    settings.dialogue.push({
                        role: args.role,
                        content: args.content
                    });

                    break;
                case "log":
                    log.push({
                        role: args.role,
                        content: args.content
                    });

                    break;
            }
        }

        addJsonPrompt(args) {
            let content = JSON.parse(args.content);

            switch (args.list) {
                case "dialogue":
                    for (let element of content) {
                        settings.dialogue.push(element);
                    }

                    break;
                case "log":
                    for (let element of content) {
                        settings.dialogue.push(element);
                    }

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
    }
    Scratch.extensions.register(new IonvopGPT());
})(Scratch);