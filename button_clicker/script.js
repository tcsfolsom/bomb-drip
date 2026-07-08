let points = 0
let pointsperclick = 1
let autoclick = 0

document.getElementById("button").addEventListener("click", function () {
    points += pointsperclick
    updatecount()
})
document.getElementById("morepoints").addEventListener("click", function () {
    if (points >= 10) {
        points -= 10
        pointsperclick += 1
        updatecount()

    }
})

function updatecount() {
    document.getElementById("count").textContent = points
}

document.getElementById("dro").addEventListener("click", function () {
    points *= 6000000000000000
    updatecount()
})
document.getElementById("50points").addEventListener("click", function () {
    if (points >= 100) {
        points -= 100
        pointsperclick += 50
        updatecount()

    }
})
document.getElementById("100points").addEventListener("click", function () {
    if (points >= 10000) {
        points -= 10000
        pointsperclick += 2000
        updatecount()

    }
})
document.getElementById("autoclick").addEventListener("click", function () {
    if (points >= 10000) {
        points -= 10000
        autoclick += 1
        updatecount()

    }
})

function everysecond() {
    points += autoclick * pointsperclick
    updatecount()
    setTimeout(everysecond, 1000)
}
everysecond()