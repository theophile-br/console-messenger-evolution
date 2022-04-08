const userInfo = window.electron.userInfo

const messagesContainer = document.getElementById("messagesContainer")
const input = document.getElementById("input")
const debug = document.getElementById("debug")
const cursor = document.getElementById("cursor")
const pseudo = document.getElementById("pseudo")
const socket = io("http://localhost:888/");
const pseudoTxt = `${userInfo.username}@${userInfo.domain} ~ $`
const messagesStack = []
pseudo.textContent = pseudoTxt
input.focus()
input.addEventListener("blur", function (event) {
    this.focus()
})

input.addEventListener("keyup", function (event) {
    let commande = undefined
    if (event.key === "Enter") {
        console.log(input.innerHTML)
        commande = input.textContent
        messagesStack.push(pseudoTxt + " " + commande)
        messagesContainer.innerHTML = ""
        input.innerHTML = ""
        for (let i = 0; i < messagesStack.length; i++) {
            var messageElt = document.createElement("p")
            messageElt.textContent = messagesStack[i]
            messagesContainer.append(messageElt)
        }
        window.scrollTo(0, document.body.scrollHeight);
        socket.emit("message", pseudoTxt + " " + commande)
    }
});


socket.on("recive-message", (message) => {
    messagesStack.push(message)
    messagesContainer.innerHTML = ""
    for (let i = 0; i < messagesStack.length; i++) {
        var messageElt = document.createElement("p")
        messageElt.textContent = messagesStack[i]
        messagesContainer.append(messageElt)
    }
    window.scrollTo(0, document.body.scrollHeight);
})
