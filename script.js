let storage = localStorage.getItem("cart")
if (storage == null) {
    storage = "[]"
}
storage = JSON.parse(storage)

let cart = document.createElement("div")
cart.className = "cart"
let p = document.createElement("p")
p.textContent = "🛒"
cart.appendChild(p)
document.body.insertBefore(cart, document.body.children[1])

for (let [source, price] of storage) {
    let div = document.createElement("div")
    div.className = "cartitem"

    let img = document.createElement("img")
    img.src = source

    let p = document.createElement("p")
    p.textContent = "$" + price.toString()

    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(maketrash())
    cart.appendChild(div)
}

function addtocart(div) {
    let item = div.cloneNode(true)
    item.onclick = null
    item.className = "cartitem"

    item.appendChild(maketrash())

    let image = div.children[0].src
    let price = parseFloat(div.children[1].textContent.substring(1))
    let storage = JSON.parse(localStorage.getItem("cart"))
    storage.push([image, price]);
    localStorage.setItem("cart", JSON.stringify(storage))


    cart.appendChild(item)
}

function maketrash() {
    let trash = document.createElement("button")
    trash.textContent = "🗑️"
    trash.addEventListener("click", function (ev) {
        let source=ev.target.parentElement.children[0].src
        ev.target.parentElement.remove()
        let storage = JSON.parse(localStorage.getItem("cart"))
        for(let i=0;i<storage.length;i++){
            if(storage[i][0]==source){
                storage.splice(i,1)
            }
        }
        localStorage.setItem("cart", JSON.stringify(storage))
    })
    return trash
}