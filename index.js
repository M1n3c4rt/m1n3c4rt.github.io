addEventListener("resize", (event) => {
    w = document.getElementsByClassName("stuff")[0].clientWidth
    document.getElementsByClassName('intro')[0].setAttribute("style",`margin-left: ${(w%440)/2+20}px`)
})
w = document.getElementsByClassName("stuff")[0].clientWidth
document.getElementsByClassName('intro')[0].setAttribute("style",`margin-left: ${(w%440)/2+20}px`)

function updateAgeTime() {
    document.getElementById('agetime').textContent = ((new Date().getTime() - 1191221880000).toString())
}

setInterval(updateAgeTime,1)

function copyButton() {
    navigator.clipboard.writeText(
        "<a href=\"https://m1n3c4rt.github.io\" target=\"_blank\"><img src=\"https://m1n3c4rt.github.io/websitewhatchamacallit.webp\"></a>"
    ).then(function() {
        document.getElementById("buttondialog").textContent = "↓ copied!"
        setTimeout(() => document.getElementById("buttondialog").textContent = "↓ click to copy!",2000)
    }, function(err) {
        document.getElementById("buttondialog").textContent = err
    })
}