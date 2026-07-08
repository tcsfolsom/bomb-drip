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

let cartleft = document.createElement("div")

let p = document.createElement("p")
p.id = "total"
cartleft.appendChild(p)

let checkout=document.createElement("a")
checkout.href="checkout.html"
checkout.textContent="checkout"
cartleft.appendChild(checkout)

cart.appendChild(cartleft)

document.body.insertBefore(cart, document.body.children[1])
updatetotal()

for (let [source, price] of storage) {
    let div = document.createElement("div")
    div.className = "cartitem"

    let bottom = document.createElement("div")

    let img = document.createElement("img")
    img.src = source

    let p = document.createElement("p")
    p.textContent = "$" + price.toFixed(2)

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
    let price = parseFloat(div.children[1].textContent.substring(1).replaceAll(",",""))

    let bottom = document.createElement("div")
    bottom.appendChild(div.children[1].cloneNode(true))
    bottom.appendChild(maketrash())
    item.children[1].remove()
    item.appendChild(bottom)

    storage.push([image, price]);
    localStorage.setItem("cart", JSON.stringify(storage))
    updatetotal()

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
        updatetotal()
        localStorage.setItem("cart", JSON.stringify(storage))
    })
    return trash
}

function updatetotal() {
    let total = 0
    for (let [source, price] of storage) {
        total += price
    }
    document.getElementById("total").textContent = "🛒$" + total.toFixed(2)
}

function checkedout(){
    let params=new URLSearchParams(window.location.search)
    document.getElementById("name").textContent = params.get("name")
    document.getElementById("address").textContent = params.get("address")
    storage =[]
    localStorage.setItem("cart", JSON.stringify(storage))
}