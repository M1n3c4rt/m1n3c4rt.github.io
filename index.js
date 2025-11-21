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