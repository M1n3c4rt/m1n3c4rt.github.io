
var tree = {"final":"","subhints":[]}


function renderInit() {

    var storedTree = decodeURIComponent(document.cookie)
    try {
        tree = JSON.parse(storedTree.split("=")[1])
        const startbutton = document.getElementById("startbutton")
        startbutton.parentNode.removeChild(startbutton)
        renderTree()
        return
    } catch {
        console.log("no tree stored!",storedTree)
    }

    var head = document.createElement("div")
    head.setAttribute("id","mainHead")
    head.appendChild(document.createElement("hr"))
    uplink = document.createElement("a")
    uplink.setAttribute("class","bracketcitybutton")
    uplink.setAttribute("id","uplink")
    uplink.setAttribute("onclick","promptUpload()")
    uplink.appendChild(document.createTextNode("Upload JSON"))
    head.appendChild(uplink)

    playlink = document.createElement("a")
    playlink.setAttribute("class","bracketcitybutton")
    playlink.setAttribute("id","playlink")
    playlink.setAttribute("href","bracketcity.html")
    playlink.appendChild(document.createTextNode("Play puzzles ⇗ "))
    head.appendChild(playlink)

    document.body.appendChild(head)
}

function init() {
    var p = prompt("Enter headline:","")
    tree.final = p
    tree.subhints = []
    const startbutton = document.getElementById("startbutton")
    startbutton.parentNode.removeChild(startbutton)
    renderTree()
}

function promptDownload() {
    var hashed = hashTree(tree,hashString(tree.final))
    s = JSON.stringify(hashed)
    const file = new File([s],"bracket_city_puzzle.json")
    downloadFile(file)
}

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
            tree = hashTree(tree,-hashString(tree.final))
            try { renderTree() } catch { alert("Error reading the file. Please try again."); renderInit() }
        };
        reader.onerror = () => {
            alert("Error reading the file. Please try again.", "error");
        };
        reader.readAsText(file);
    }
    input.click();
}

function hashTree(t,n) {
    var newTree = structuredClone(t)
    if ("answer" in newTree) {
        newTree.answer = caesarCipher(newTree.answer,n)
    }
    for (let i = 0; i < t.subhints.length; i++) {
        newTree.subhints[i] = hashTree(newTree.subhints[i],n)
    }
    return newTree
}

function isClean() {
    return document.getElementsByClassName("bracketcityerror").length == 0
}

function renderTree() {

    document.cookie = "editorTree="+JSON.stringify(tree)

    try {
        document.body.removeChild(document.getElementById("mainHead"))
    } catch {

    }
    var head = document.createElement("div")
    head.setAttribute("id","mainHead")
    head.appendChild(document.createTextNode(tree.final))
    head.appendChild(createEditButton([]))
    head.appendChild(createAddButton([]))
    
    if (getBrackets(tree.final).some(x => x < 0 || x >= tree.subhints.length)) {
        var error = document.createElement('div')
        error.appendChild(document.createTextNode("Some brackets in this hint ("+String(getBrackets(tree.final).filter(x => x < 0 || x >= tree.subhints.length))+") do not exist! Try adding a bracket."))
        error.setAttribute("class","bracketcityerror")
    }
    
    duplicates = getBrackets(tree.final).filter((e, i, a) => a.indexOf(e) !== i)
    if (duplicates.length != 0) {
        var error = document.createElement('div')
        error.appendChild(document.createTextNode("Bracket numbers can't appear more than once in the same hint! ("+String(duplicates)+")"))
        error.setAttribute("class","bracketcityerror")
    }

    if (duplicates.length != 0 || getBrackets(tree.final).some(x => x < 0 || x >= tree.subhints.length)) {
        head.appendChild(error)
        head.appendChild(document.createElement("br"))
        head.setAttribute("class","bracketcitylistitem bracketcityinvalid")
    } else {
        head.setAttribute("class","bracketcitylistitem")
    }

    head.appendChild(document.createElement("br"))
    var subList = document.createElement("ol")
    subList.setAttribute("start",0)
    for (let i = 0; i < tree.subhints.length; i++) {
        const element = tree.subhints[i];
        subList.appendChild(renderSubTree(element,[i],getBrackets(tree.final)))
    }
    head.appendChild(subList)
    document.body.appendChild(head)
    head.appendChild(document.createElement("hr"))
    uplink = document.createElement("a")
    uplink.setAttribute("class","bracketcitybutton")
    uplink.setAttribute("id","uplink")
    uplink.setAttribute("onclick","promptUpload()")
    uplink.appendChild(document.createTextNode("Upload JSON"))
    head.appendChild(uplink)

    if (isClean()) {
        downlink = document.createElement("a")
        downlink.setAttribute("class","bracketcitybutton")
        downlink.setAttribute("id","downlink")
        downlink.setAttribute("onclick","promptDownload()")
        downlink.appendChild(document.createTextNode("Download JSON"))
        head.appendChild(downlink)
    }

    playlink = document.createElement("a")
    playlink.setAttribute("class","bracketcitybutton")
    playlink.setAttribute("id","playlink")
    playlink.setAttribute("href","bracketcity.html")
    playlink.appendChild(document.createTextNode("Play puzzles ⇗ "))
    head.appendChild(playlink)

    document.body.appendChild(head)
}

function renderSubTree(subtree,crumbs,parentbrackets) {
    var head = document.createElement("li")
    head.appendChild(document.createTextNode(subtree.answer))
    sep = document.createElement('span')
    sep.setAttribute("class","bracketcityseparator")
    sep.appendChild(document.createTextNode('|'))
    head.appendChild(sep)
    head.appendChild(document.createTextNode(subtree.hint))
    head.appendChild(createEditAnswerButton(crumbs))
    head.appendChild(createEditHintButton(crumbs))
    head.appendChild(createRemoveButton(crumbs))
    head.appendChild(createAddButton(crumbs))
    head.appendChild(document.createElement("br"))

    if (getBrackets(subtree.hint).some(x => x < 0 || x >= subtree.subhints.length)) {
        var error = document.createElement('div')
        error.appendChild(document.createTextNode("Some brackets in this hint ("+String(getBrackets(subtree.hint).filter(x => x < 0 || x >= subtree.subhints.length))+") do not exist! Try adding a bracket."))
        error.setAttribute("class","bracketcityerror")
    }

    if (!parentbrackets.includes(crumbs.slice(-1)[0])) {
        var error = document.createElement('div')
        error.appendChild(document.createTextNode("This bracket is an orphan! Try adding ["+String(crumbs.slice(-1)[0])+"] somewhere in the parent bracket."))
        error.setAttribute("class","bracketcityerror")
    }
    
    duplicates = getBrackets(subtree.hint).filter((e, i, a) => a.indexOf(e) !== i)
    if (duplicates.length != 0) {
        var error = document.createElement('div')
        error.appendChild(document.createTextNode("Bracket numbers can't appear more than once in the same hint! ("+String(duplicates)+")"))
        error.setAttribute("class","bracketcityerror")
    }

    if (duplicates.length != 0 || !parentbrackets.includes(crumbs.slice(-1)[0]) || getBrackets(subtree.hint).some(x => x < 0 || x >= subtree.subhints.length)) {
        head.appendChild(error)
        head.appendChild(document.createElement("br"))
        head.setAttribute("class","bracketcitylistitem bracketcityinvalid")					
    } else {
        head.setAttribute("class","bracketcitylistitem")
    }

    var subList = document.createElement("ol")
    subList.setAttribute("start",0)
    for (let i = 0; i < subtree.subhints.length; i++) {
        const element = subtree.subhints[i];
        subList.appendChild(renderSubTree(element,crumbs.concat(i),getBrackets(subtree.hint)))
    }
    head.appendChild(subList)
    return head
}

function createEditButton(crumbs) {
    b = document.createElement("a")
    b.setAttribute("class","bracketcitybutton bracketcitybuttonstart")
    b.setAttribute("id","edit")
    b.setAttribute("onclick","edit()")
    b.appendChild(document.createTextNode("Edit"))
    return b
}

function createEditAnswerButton(crumbs) {
    b = document.createElement("a")
    b.setAttribute("class","bracketcitybutton bracketcitybuttonstart")
    b.setAttribute("id","editAnswer-["+String(crumbs)+"]")
    b.setAttribute("onclick","editAnswer(["+String(crumbs)+"])")
    b.appendChild(document.createTextNode("Edit Answer"))
    return b
}

function createEditHintButton(crumbs) {
    b = document.createElement("a")
    b.setAttribute("class","bracketcitybutton")
    b.setAttribute("id","editHint-["+String(crumbs)+"]")
    b.setAttribute("onclick","editHint(["+String(crumbs)+"])")
    b.appendChild(document.createTextNode("Edit Hint"))
    return b
}

function createRemoveButton(crumbs) {
    b = document.createElement("a")
    b.setAttribute("class","bracketcitybutton")
    b.setAttribute("id","remove-["+String(crumbs)+"]")
    b.setAttribute("onclick","remove(["+String(crumbs)+"])")
    b.appendChild(document.createTextNode("Remove"))
    return b
}

function createAddButton(crumbs) {
    b = document.createElement("a")
    b.setAttribute("class","bracketcitybutton")
    b.setAttribute("id","add-["+String(crumbs)+"]")
    b.setAttribute("onclick","add(["+String(crumbs)+"])")
    b.appendChild(document.createTextNode("Add Bracket"))
    return b
}

function edit() {
    var n = prompt("New headline:",tree.final)
    if (n != null) {
        tree.final = n
    }
    renderTree()
}

function editAnswer(crumbs) {
    var current = tree
    for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        current = current.subhints[crumb]
    }
    var n = prompt("New answer:",current.answer)
    if (n != null) {
        current.answer = n
    }
    renderTree()
}

function editHint(crumbs) {
    var current = tree
    for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        current = current.subhints[crumb]
    }
    var n = prompt("New hint:",current.hint)
    if (n != null) {
        current.hint = n.replaceAll(/(?<=\[)0+(?=\d)/g,"")
    }
    renderTree()
}

function remove(crumbs) {
    var current = tree
    for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        if (i == crumbs.length - 1) {
            current.subhints.splice(crumb,1)
        } else {
            current = current.subhints[crumb]
        }
    }
    renderTree()
}

function add(crumbs) {
    var current = tree
    for (let i = 0; i < crumbs.length; i++) {
        const crumb = crumbs[i];
        current = current.subhints[crumb]
    }
    current.subhints.push({"answer":"Sample answer","hint":"Sample hint","subhints":[]})
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

function downloadFile(file) {
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = URL.createObjectURL(file);
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        URL.revokeObjectURL(link.href);
        link.parentNode.removeChild(link);
    }, 0);
}