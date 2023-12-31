let corrupted = false;
setInterval(function () {
    if (!corrupted) {
        if (Math.random() < 0.01) {
            toggleCorrupted();
        }
    }
}, 10000);

function toggleCorrupted() {
    if (corrupted) {
        corrupted = false;
        var main = document.getElementsByTagName("main")[0];
        main.style.cssText = "display: block;";
    } else if (!corrupted) {
        corrupted = true;
        var main = document.getElementsByTagName("main")[0];
        main.style.cssText = "display: none;";

        var corruptedSection = document.createElement("section");
        corruptedSection.id = "corrupted";

        var corruptedH1 = document.createElement("h1");
        corruptedH1.id = "corrupted-h1";
        corruptedH1.innerHTML = "CORRUPTED";
        corruptedSection.appendChild(corruptedH1);

        var corruptedText = document.createElement("p");
        corruptedText.id = "corrupted-text";
        corruptedText.innerHTML = "You've been infected!";
        corruptedSection.appendChild(corruptedText);

        var corruptedButton = document.createElement("button");
        corruptedButton.id = "corrupted-button";
        corruptedButton.innerHTML = "Fix Corruption";
        corruptedButton.onclick = promptPuzzle;
        corruptedSection.appendChild(corruptedButton);

        document.body.appendChild(corruptedSection);
    }
}

function promptPuzzle() {
    const types = ["fix-error", "guess-output"];
    const type = types[Math.floor(Math.random() * types.length)];
    console.log(type);

    if (type === "fix-error") {
        fixError();
    } else if (type === "guess-output") {
        guessOutput();
    }
}

function fixError() {
    const codes = [
        {
            code: `x = 10\ny = 5\nif x > y\n    print("x is greater than y")`,
            solution: `x = 10\ny = 5\nif x > y:\n    print("x is greater than y")`,
            lang: "python"
        },
        {
            code: `def multiply_numbers(a, b)\n    result = a * b\n    return result`,
            solution: `def multiply_numbers(a, b):\n    result = a * b\n    return result`,
            lang: "python"
        },
        {
            code: `numbers = [1, 2, 3, 4, 5]\nfor number in numbers\n    print(number)`,
            solution: `numbers = [1, 2, 3, 4, 5]\nfor number in numbers:\n    print(number)`,
            lang: "python"
        },
        {
            code: `greeting = "Hello, world!"\nprint(greetng)`,
            solution: `greeting = "Hello, world!"\nprint(greeting)`,
            lang: "python"
        },
        {
            code: `print("Hello, world!"`,
            solution: `print("Hello, world!")`,
            lang: "python"
        }
    ];

    const code = codes[Math.floor(Math.random() * codes.length)];

    var corruptedSection = document.getElementById("corrupted");
    corruptedSection.style.cssText = "display: none;";

    var puzzleSection = document.createElement("section");
    puzzleSection.id = "puzzle";

    var puzzleH1 = document.createElement("h1");
    puzzleH1.id = "puzzle-h1";
    puzzleH1.innerHTML = "Fix the error";

    var puzzleText = document.createElement("p");
    puzzleText.id = "puzzle-text";
    puzzleText.innerHTML =  `The following ${code.lang} code contains an error. Fix it to continue.`;

    var textareaElement = document.createElement("textarea");
    textareaElement.id = "puzzle-textarea";
    textareaElement.value = code.code;
    textareaElement.onkeyup = function () {
        this.style.cssText = "height: 1px;";
        this.style.cssText = "height: " + (this.scrollHeight) + "px;";
    };

    var submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click", function () {
        if (textareaElement.value === code.solution) {
            alertCorrect();
        } else {
            alertIncorrect();
            textareaElement.value = code.code;
        }
    });

    puzzleSection.appendChild(puzzleH1);
    puzzleSection.appendChild(puzzleText);
    puzzleSection.appendChild(textareaElement);
    puzzleSection.appendChild(submitButton);

    document.body.appendChild(puzzleSection);

    document.getElementById("puzzle-textarea").style.cssText = "height: 1px;";
    document.getElementById("puzzle-textarea").style.cssText = "height: " + (document.getElementById("puzzle-textarea").scrollHeight) + "px;";
}

function guessOutput() {
    const codes = [
        {
            code: `x = 10\ny = 5\nif x > y:\n    print("x is greater than y")\nelif x < y:\n    print("x is less than y")`,
            output: `x is greater than y`,
            lang: "python"
        },
        {
            code: `x = 10\ny = 6\nprint(x-y)`,
            output: `4`,
            lang: "python"
        },
        {
            code: `numbers = [1, 2, 3, 4, 5]\nfor number in numbers:\n    print(number)`,
            output: `1\n2\n3\n4\n5`,
            lang: "python"
        },
        {
            code: `greeting = "Hello, world!"\nprint(greeting)`,
            output: `Hello, world!`,
            lang: "python"
        },
        {
            code: `print("4*8")`,
            output: `4*8`,
            lang: "python"
        }
    ];

    const code = codes[Math.floor(Math.random() * codes.length)];

    var corruptedSection = document.getElementById("corrupted");
    corruptedSection.style.cssText = "display: none;";

    var puzzleSection = document.createElement("section");
    puzzleSection.id = "puzzle";

    var puzzleH1 = document.createElement("h1");
    puzzleH1.id = "puzzle-h1";
    puzzleH1.innerHTML = "Guess the output";

    var puzzleText = document.createElement("p");
    puzzleText.id = "puzzle-text";
    puzzleText.innerHTML = `The following ${code.lang} code will produce an output. Guess what it will be.`;

    var codeTextareaElement = document.createElement("textarea");
    codeTextareaElement.id = "puzzle-code";
    codeTextareaElement.value = code.code;
    codeTextareaElement.disabled = true;

    var outputTextareaElement = document.createElement("textarea");
    outputTextareaElement.id = "puzzle-output";
    outputTextareaElement.placeholder = "Enter the output...";
    outputTextareaElement.onkeyup = function () {
        this.style.cssText = "height: 1px;";
        this.style.cssText = "height: " + (this.scrollHeight) + "px;";
    }

    var submitButton = document.createElement("button");
    submitButton.innerText = "Submit";
    submitButton.addEventListener("click", function () {
        if (outputTextareaElement.value === code.output) {
            alertCorrect();
        } else {
            alertIncorrect();
            outputTextareaElement.value = "";
        }
    });

    puzzleSection.appendChild(puzzleH1);
    puzzleSection.appendChild(puzzleText);
    puzzleSection.appendChild(codeTextareaElement);
    puzzleSection.appendChild(outputTextareaElement);
    puzzleSection.appendChild(submitButton);

    document.body.appendChild(puzzleSection);

    document.getElementById("puzzle-code").style.cssText = "height: 1px;";
    document.getElementById("puzzle-code").style.cssText = "height: " + (document.getElementById("puzzle-code").scrollHeight) + "px;";
    document.getElementById("puzzle-output").style.cssText = "height: 1px;";
    document.getElementById("puzzle-output").style.cssText = "height: " + (document.getElementById("puzzle-output").scrollHeight) + "px;";
}

function alertCorrect() {
    var corruptedSection = document.getElementById("corrupted");
    corruptedSection.parentNode.removeChild(corruptedSection);

    var puzzleSection = document.getElementById("puzzle");
    puzzleSection.parentNode.removeChild(puzzleSection);

    var correctSection = document.createElement("section");
    correctSection.id = "correct";

    var correctH1 = document.createElement("h1");
    correctH1.id = "correct-h1";
    correctH1.innerHTML = "Correct!";

    var correctText = document.createElement("p");
    correctText.id = "correct-text";
    correctText.innerHTML = "You've fixed the corruption.";

    var correctButton = document.createElement("button");
    correctButton.id = "correct-button";
    correctButton.innerHTML = "Continue";
    correctButton.onclick = function () {
        document.body.removeChild(correctSection);
        toggleCorrupted();
    };

    correctSection.appendChild(correctH1);
    correctSection.appendChild(correctText);
    correctSection.appendChild(correctButton);

    document.body.appendChild(correctSection);
}

function alertIncorrect() {
    var puzzleSection = document.getElementById("puzzle");
    puzzleSection.style.cssText = "display: none;";

    var incorrectSection = document.createElement("section");
    incorrectSection.id = "incorrect";

    var incorrectH1 = document.createElement("h1");
    incorrectH1.id = "incorrect-h1";
    incorrectH1.innerHTML = "Incorrect";

    var incorrectText = document.createElement("p");
    incorrectText.id = "incorrect-text";
    incorrectText.innerHTML = "The corruption persists...";

    var incorrectButton = document.createElement("button");
    incorrectButton.id = "incorrect-button";
    incorrectButton.innerHTML = "Try Again";
    incorrectButton.onclick = function () {
        puzzleSection.style.cssText = "display: flex;";
        document.body.removeChild(incorrectSection);
    };

    incorrectSection.appendChild(incorrectH1);
    incorrectSection.appendChild(incorrectText);
    incorrectSection.appendChild(incorrectButton);
    
    document.body.appendChild(incorrectSection);
}

let sectionId = 1;
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        if (this.id === "continue") {
            hideSection();
            sectionId++;
            displaySection();
        } else if (this.id === "back") {
            hideSection();
            sectionId--;
            displaySection();
        }
    });
});

displaySection();

function displaySection() {
    let section = document.getElementById(sectionId);
    if (section == null) {
        sectionId = 1;
        section = document.getElementById(sectionId);
    }
    section.style.display = "block";
}

function hideSection() {
    let section = document.getElementById(sectionId);
    section.style.display = "none";
}

// The following code here is based on https://codepen.io/hi-im-si/pen/ALgzqo but has been modified
// Here is the license for the code:
// > Copyright (c) 2023 by Simon Shahriveri (https://codepen.io/hi-im-si/pen/ALgzqo)
// > Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// > The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// > THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// start modified snippet
var TxtType = function (el, toRotate, period, initialDelay, deleteSpeedFactor) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.initialDelay = initialDelay || 0;
    this.deleteSpeedFactor = deleteSpeedFactor || 2;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

// Adjustable values
var initialDelay = 0;
var deleteSpeedFactor = 2;

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= this.deleteSpeedFactor;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period, initialDelay, deleteSpeedFactor);
        }
    }
};
// end modified snippet


// terminal
const terminal = document.createElement("div");
terminal.classList.add("terminal");

const terminalBody = document.createElement("div");
terminalBody.id = "terminal-body";
terminal.appendChild(terminalBody);

const commandInputContainer = document.createElement("div");
commandInputContainer.id = "command-input-container";
terminal.appendChild(commandInputContainer);

const commandPrompt = document.createElement("span");
commandPrompt.id = "command-prompt";
commandPrompt.innerText = "~ ❯";
commandInputContainer.appendChild(commandPrompt);

const commandInput = document.createElement("input");
commandInput.type = "text";
commandInput.id = "command-input";
commandInput.autofocus = true;
commandInputContainer.appendChild(commandInput);

let terminalOpen = false;

function executeCommand(command) {
    command = command.trim().toLowerCase();

    const aliases = {
        "help": ["help", "h", "?"],
        "music": ["music"],
        "arch": ["arch", "archlinux", "arch linux", "arch-linux"],
        "rainbow": [ "lgbt", "lgbtq", "lgbtq+", "rainbow", "pride"],
        "trans": ["trans", "transgender"],
        "mlm": ["mlm", "gay"],
        "lesbian": ["lesbian", ],
        "bi": ["bi", "bisexual"],
        "pan": ["pan", "pansexual"],
        "enby": ["enby", "nonbinary", "non-binary", "nb"],
        "aromantic": ["aromantic", "aro"],
        "asexual": ["asexual", "ace"],
        "desktop": ["desktop"],
        "clear": ["clear"]
    };

    const matchedCommand = Object.keys(aliases).find(key => aliases[key].includes(command));

    switch (matchedCommand) {
        case "help":
            terminalBody.innerHTML += "figure it out<br>";
            break;
        case "music":
            terminalBody.innerHTML += "Playing music...<br>";
            const audio = new Audio("./assets/music.mp3");
            audio.play();
            break;
        case "arch":
            terminalBody.innerHTML += "Arch Linux is the best distro because it's lightweight and highly customizable.<br>";
            break;
        case "rainbow":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, red, orange, yellow, green, blue, indigo, violet)');
            break;
        case "trans":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #5BCEFA, #F5A9B8, #FFFFFF, #F5A9B8, #5BCEFA)');
            document.documentElement.style.setProperty('--text', '#000000');
            break;
        case "mlm":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #078d70, #26ceaa, #99e8c2, #efefff, #7bade3, #5049cb, #3e1a78)');
            document.documentElement.style.setProperty('--text', '#000000');
            break;
        case "lesbian":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #D52D00, #EF7627, #FF9A56, #FFFFFF, #D162A4, #B55690, #A30262)');
            document.documentElement.style.setProperty('--text', '#000000');
            break;
        case "bi":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #D60270, #9B4F96, #0038A8)');
            break;
        case "pan":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #FF218C 0%, #FF218C 20%, #FFD800 50%, #FFD800 50%, #21B3FF 80%, #21B3FF 100%)');
            document.documentElement.style.setProperty('--text', '#000000');
            break;
        case "enby":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #FCF434 20%, #FFFFFF 40%, #9C59D1 60%, #2C2C2C 90%)');
            document.documentElement.style.setProperty('--text', '#000000');
            break;
        case "aromantic":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #3DA542, #A7D379, #FFFFFF, #A9A9A9, #000000)');
            document.documentElement.style.setProperty('--text', '#000');
            break;
        case "asexual":
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #000000, #A3A3A3, #FFFFFF, #800080)');
            document.documentElement.style.setProperty('--text', '#000');
            break;
        case "desktop":
            terminalBody.innerHTML += "<img src='./assets/desktop.png' alt='Desktop Screenshot' style='width: 100%; height: 100%;'><br>";
            break;
        case "clear":
            terminalBody.innerHTML = "";
            break;
        default:
            if (command.startsWith("un")) {
                document.documentElement.style.setProperty('--background', '');
                document.documentElement.style.setProperty('--text', '');
                break;
            }
            terminalBody.innerHTML += `Command not found: ${command}<br>`;
    }
    commandInput.value = "";
}


document.addEventListener("keyup", (e) => {
    if (e.key === "`") {
        if (terminalOpen === false) {
            document.body.appendChild(terminal);
            terminalOpen = true;
        } else {
            document.querySelector(".terminal").remove();
            terminalOpen = false;
        }
    }
});

commandInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const command = commandInput.value;
        terminalBody.innerHTML += `~ ❯ ${command}<br>`;
        executeCommand(command);
    }
});
