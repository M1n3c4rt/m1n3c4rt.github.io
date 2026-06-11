
var tree = {"final":"Welcome to B[0] Neighbour[1]","subhints":[{"answer":"਷ਦਨਰਪਹ","hint":"tennis equipment or annoying cacophony","subhints":[]},{"answer":"ਭ਴਴਩","hint":"a covert operation is under one of these","subhints":[]}]}

var stats = {
    reveals: 0,
    peeks: 0,
    incorrect: 0,
    keystrokes: 0
}
var peeked = []
var flavortext = ""
var greentext = {
    start: 0,
    end: 0,
    bracketsbefore: 0,
    location: [-1]
}
var originalHeadline = "Welcome to B[0] Neighbour[1]"

function promptUpload() {
    var input = document.createElement("input")
    input.type = "file"
    var file = undefined
    input.onchange = e => {
        file = e.target.files[0]; 

        if (!file) {
            alert("No file selected. Please choose a file.", "error");
            return;
        }

        if (!file.type.startsWith("application/json")) {
            alert("Unsupported file type. Please select a JSON file.", "error");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            var fileText = reader.result;
            tree = JSON.parse(fileText)
            originalHeadline = tree.final
            stats = {
                reveals: 0,
                peeks: 0,
                incorrect: 0,
                keystrokes: 0
            }
            flavortext = ""
            greentext = {
                start: 0,
                end: 0,
                bracketsbefore: 0,
                location: [-1]
            }
            try { renderTree() } catch { alert("Error reading the file. Please try again."); renderInit() }
        };
        reader.onerror = () => {
            alert("Error reading the file. Please try again.", "error");
        };
        reader.readAsText(file);
    }
    input.click();
}

function getFillableAnswers(crumbs,t) {
    var brackets = []
    if ("final" in t) {
        brackets = getBrackets(t.final)
    } else {
        brackets = getBrackets(t.hint)
    }

    if (brackets.length == 0) {
        if ("final" in t) {
            return []
        } else {
            return [[crumbs,caesarCipher(t.answer,-hashString(originalHeadline))]]
        }
    } else {
        var full = []
        for (let i = 0; i < brackets.length; i++) {
            const bracket = brackets[i];
            full = full.concat(getFillableAnswers(crumbs.concat(bracket),t.subhints[bracket]))
        }
        return full
    }
    
}

function manageInput(guess) {
    if (getBrackets(tree.final).length == 0) {
        return
    }
    var matches = getFillableAnswers([],tree).filter(x => x[1].toLowerCase() == guess.toLowerCase())
    if (matches.length == 0) {
        stats.incorrect += 1
        flavortext = "incorrect!"
        renderTree()
    } else {
        flavortext = "correct!"
        for (let i = 0; i < matches.length; i++) {
            const match = matches[i];
            replaceAnswer(match[0],match[1])
        }
    }
}

function replaceAnswer(crumbs,answer) {
    var current = tree
    for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        if (i == crumbs.length - 1) {
            try {
                var brackets = getBrackets(current.hint)
                before = 0
                for (let i = 0; i < brackets.length; i++) {
                    const bracket = brackets[i];
                    if (bracket == crumb) {break} else {before += 1}
                }
                greentext.bracketsbefore = before

                greentext.start = current.hint.split(/\[\d+\]/)[before].length
                greentext.end = greentext.start + answer.length
                
                current.hint = current.hint.replace(new RegExp("\\["+String(crumb)+"\\]"),answer)
                greentext.location = crumbs.slice(0,-1)
            } catch {
                var brackets = getBrackets(current.final)
                before = 0
                for (let i = 0; i < brackets.length; i++) {
                    const bracket = brackets[i];
                    if (bracket == crumb) {break} else {before += 1}
                }
                greentext.bracketsbefore = before

                greentext.start = current.final.split(/\[\d+\]/)[before].length
                greentext.end = greentext.start + answer.length
                
                current.final = current.final.replace(new RegExp("\\["+String(crumb)+"\\]"),answer)
                greentext.location = crumbs.slice(0,-1)
            }
        } else {
            current = current.subhints[crumb]
        }
    }
    renderTree()
}

function displayScore() {
    var head = document.createElement("div")
    head.setAttribute("class","bracketcityresults")
    var score = 100 - 2*stats.incorrect - 5*stats.peeks - 15*stats.reveals
    head.appendChild(document.createElement("hr"))
    head.appendChild(document.createTextNode("Score: "+String(score)+"/100"))
    head.appendChild(document.createElement("br"))
    head.appendChild(document.createTextNode("❌ Wrong guesses (-2 per guess): "+String(stats.incorrect)))
    head.appendChild(document.createElement("br"))
    head.appendChild(document.createTextNode("👀 Clues peeked (-5 per peek): "+String(stats.peeks)))
    head.appendChild(document.createElement("br"))
    head.appendChild(document.createTextNode("🛟 Answers revealed (-10 per reveal): "+String(stats.reveals)))
    head.appendChild(document.createElement("br"))
    head.appendChild(document.createTextNode("⌨️ Keystrokes used: "+String(stats.keystrokes)))
    return head
}

function renderTree() {
    
    try {
        document.body.removeChild(document.getElementById("head"))
    } catch {

    }
    
    var head = document.createElement("div")
    head.setAttribute("class","bracketcitymain")
    head.setAttribute("id","head")

    var input = document.createElement("input")
    input.setAttribute("type","text")
    input.setAttribute("placeholder","enter any answer...")
    input.setAttribute("class","bracketcityinput")
    input.setAttribute("id","input")
    input.setAttribute("tabindex",0)
    input.setAttribute("autofocus","")

    input.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            manageInput(input.value)
            document.getElementById("input").focus()
        } else {
            stats.keystrokes += 1
        }
    })

    head.appendChild(input)

    var flavor = document.createElement("div")
    if (flavortext == "correct!") {
        flavor.setAttribute("class","bracketcityflavor bracketcityflavorcorrect")
    } else {
        flavor.setAttribute("class","bracketcityflavor bracketcityflavorincorrect")
    }
    flavor.setAttribute("id","flavor")
    flavor.appendChild(document.createTextNode(flavortext))
    head.appendChild(flavor)
    
    var subBrackets = getBrackets(tree.final)
    var textParts = tree.final.split(/\[\d+\]/)
    for (let i = 0; i < textParts.length; i++) {
        const textPart = textParts[i];
        if (greentext.bracketsbefore == i && String(greentext.location) == String([])) {
            head.appendChild(document.createTextNode(textPart.slice(0,greentext.start)))
            green = document.createElement("span")
            green.setAttribute("class","bracketcitygreen")
            green.appendChild(document.createTextNode(textPart.slice(greentext.start,greentext.end)))
            head.appendChild(green)
            head.appendChild(document.createTextNode(textPart.slice(greentext.end)))
        } else {
            head.appendChild(document.createTextNode(textPart))
        }
        if (i != subBrackets.length) {
            head.appendChild(document.createTextNode("["))
            const sub = tree.subhints[subBrackets[i]]
            head.appendChild(renderSubTree(sub,[subBrackets[i]]))
            head.appendChild(document.createTextNode("]"))
        }
    }

    if (subBrackets.length == 0) {
        head.appendChild(displayScore())
    }

    document.body.append(head)
}

function renderSubTree(subtree,crumbs) {
    var head = document.createElement("span")
    var subBrackets = getBrackets(subtree.hint)
    var textParts = subtree.hint.split(/\[\d+\]/)
    
    if (subBrackets.length == 0) {
        head.setAttribute("onclick","processClick(["+String(crumbs)+"])")
        head.setAttribute("class","bracketcityleaf")
    }

    for (let i = 0; i < textParts.length; i++) {
        const textPart = textParts[i];
        if (greentext.bracketsbefore == i && String(greentext.location) == String(crumbs)) {
            head.appendChild(document.createTextNode(textPart.slice(0,greentext.start)))
            green = document.createElement("span")
            green.setAttribute("class","bracketcitygreen")
            green.appendChild(document.createTextNode(textPart.slice(greentext.start,greentext.end)))
            head.appendChild(green)
            head.appendChild(document.createTextNode(textPart.slice(greentext.end)))
        } else {
            head.appendChild(document.createTextNode(textPart))
        }
        if (i != subBrackets.length) {
            head.appendChild(document.createTextNode("["))
            const sub = subtree.subhints[subBrackets[i]]
            head.appendChild(renderSubTree(sub,crumbs.concat(subBrackets[i])))
            head.appendChild(document.createTextNode("]"))
        }
    }
    return head
}

function processClick(crumbs) {
    console.log("click processed at: ",crumbs)
    var current = tree
    for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        current = current.subhints[crumb]
    }
    if (peeked.map(x => String(x)).includes(String(crumbs)) && confirm("You sure you want to reveal this answer?")) {
        replaceAnswer(crumbs,caesarCipher(current.answer,-hashString(originalHeadline)))
        stats.reveals += 1
    } else if (confirm("You sure you want to peek at the first letter of this answer?")) {
        console.log("adding",crumbs,"to peeked")
        peeked = peeked.concat([crumbs])
        current.hint = current.hint.concat(" ("+caesarCipher(current.answer,-hashString(originalHeadline)).toUpperCase()[0]+")")
        stats.peeks += 1
    }
    renderTree()
}

function getBrackets(str) {
    try {
        return [...str.matchAll(/\[\d+\]/g)].flat().map(x => parseInt(x.slice(1,-1)))
    } catch {
        return []
    }
}

function caesarCipher(s,n) {
    return s.split("").map(x => String.fromCharCode(x.charCodeAt(0)+n)).join("")
}

function hashString(s) {
    return s.split("").map(x => x.charCodeAt(0)).reduce((a,b)=>a+b,0)
}