let touchCoords;
let src = document.getElementsByClassName("sc-layers")[0];
let areaX = 480;
let areaY = 360;
let touchIcon = "data:image/png;base64,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";

if (src != null) {
    let eventList = ["touchstart", "touchend", "touchmove", "touchcancel"];

    eventList.forEach((element) => {
        src.addEventListener(element, (event) => {
            getTouchCoords(event);
        }, false);
    })
}

function getTouchCoords(event) {
    let result = [];
    let coordX;
    let coordY;

    for (let i = 0; i < event.touches.length; i++) {
        coordX = event.touches[i].clientX - src.offsetLeft;
        coordY = event.touches[i].clientY - src.offsetTop;

        if (coordX < 0) {
            coordX = 0;
        } else if (coordX > src.offsetWidth) {
            coordX = src.offsetWidth;
        }

        if (coordY < 0) {
            coordY = 0;
        } else if (coordY > src.offsetHeight) {
            coordY = src.offsetHeight;
        }

        coordX = coordX / src.offsetWidth;
        coordY = coordY / src.offsetHeight;

        result.push([coordX, coordY]);
    }

    touchCoords = result;
}

class MultiTouch {
    getInfo() {
        return {
            id: "ionvopmultitouch",
            name: "MultiTouch",
            color1: "#001111",
            color2: "#005555",
            color3: "#00aaaa",
            menuIconURI: touchIcon,
            blocks: [{
                opcode: "isTouchscreen",
                blockType: Scratch.BlockType.BOOLEAN,
                text: "is touchscreen?"
            }, {
                opcode: "setInputArea",
                blockType: Scratch.BlockType.COMMAND,
                text: "set input area width to [A] and height to [B]",
                arguments: {
                    A: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: "480"
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: "360"
                    }
                }
            }, {
                opcode: "getTouchInputs",
                blockType: Scratch.BlockType.REPORTER,
                text: "touch inputs"
            }, {
                opcode: "getTouchCoordsItem",
                blockType: Scratch.BlockType.REPORTER,
                text: "[COORD] coord of touch item [A]",
                arguments: {
                    COORD: {
                        type: Scratch.ArgumentType.NUMBER,
                        menu: "COORD_MENU"
                    },
                    A: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: "1"
                    }
                }
            }],
            menus: {
                COORD_MENU: {
                    acceptReporters: true,
                    items: [{
                        text: "x",
                        value: "x"
                    }, {
                        text: "y",
                        value: "y"
                    }]
                }
            }
        };
    }

    isTouchscreen() {
        return (touchCoords != undefined);
    }

    setInputArea(args) {
        areaX = args.A;
        areaY = args.B;
    }

    getTouchInputs() {
        if (touchCoords == undefined) {
            return 0;
        }

        return touchCoords.length;
    }

    getTouchCoordsItem(args) {
        if (touchCoords == undefined || touchCoords.length == 0 || args.A > touchCoords.length) {
            return 0;
        }

        switch (args.COORD) {
            case "x":
                let x = JSON.stringify(touchCoords[args.A - 1][0]);
                x = Number(x);
                x = (x - 0.5) * areaX;
                return x;
            case "y":
                let y = JSON.stringify(touchCoords[args.A - 1][1]);
                y = Number(y);
                y = (y - 0.5) * -areaY;
                return y;
        }
        
        return 0;
    }
}

Scratch.extensions.register(new MultiTouch());