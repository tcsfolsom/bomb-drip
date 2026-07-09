
document.getElementById("button").addEventListener("click", function () {
    let item = document.createElement("div")

    let input = document.createElement("input")
    input.type = "text"

    let del = document.createElement("button")
    del.textContent = "🗑️";
    del.className = "item-button";
    del.addEventListener("click", function () {
        item.remove()
    })
    let done = document.createElement("button")
    done.textContent = "✅";
    done.className = "item-button";
    done.addEventListener("click", function () {
        let p = document.createElement("p")
        p.textContent = item.children[0].value
        document.getElementById("completed").appendChild(p)

        item.remove()
    })


    item.appendChild(input)
    item.appendChild(del)
    item.appendChild(done)

    document.getElementById("items").appendChild(item)
})











