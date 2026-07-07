let storage = localStorage.getItem("cart")
console.log(storage)
if (storage === null) {
    storage = "[]"
}
console.log(storage)
storage = JSON.parse(storage)
console.log(storage)

let cart = document.createElement("div")
cart.className = "cart"
let p = document.createElement("p")
p.textContent = "🛒"
cart.appendChild(p)
document.body.insertBefore(cart, document.body.children[1])

for (let [source, price] of storage) {
    let div = document.createElement("div")
    div.className = "cartitem"

    let bottom=document.createElement("div")

    let img = document.createElement("img")
    img.src = source

    let p = document.createElement("p")
    p.textContent = "$" + price.toString()

    div.appendChild(img)
    bottom.appendChild(p)
    bottom.appendChild(maketrash())
    div.appendChild(bottom)
    cart.appendChild(div)
}

function addtocart(div) {
    let item = div.cloneNode(true)
    item.onclick = null
    item.className = "cartitem"

    let image = div.children[0].src
    let price = parseFloat(div.children[1].textContent.substring(1))

    let bottom=document.createElement("div")
    bottom.appendChild(div.children[1])
    bottom.appendChild(maketrash())
    item.children[1].remove()
    item.appendChild(bottom)

    storage.push([image, price]);
    localStorage.setItem("cart", JSON.stringify(storage))

    cart.appendChild(item)
}

function maketrash() {
    let trash = document.createElement("button")
    trash.textContent = "🗑️"
    trash.addEventListener("click", function (ev) {
        let source = ev.target.parentElement.parentElement.children[0].src
        ev.target.parentElement.parentElement.remove()
        for (let i = 0; i < storage.length; i++) {
            if (storage[i][0] == source) {
                storage.splice(i, 1)
            }
        }
        localStorage.setItem("cart", JSON.stringify(storage))
    })
    return trash
}