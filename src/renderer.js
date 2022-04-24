const postMessage = (message) => {
  var messageElt = document.createElement("p");
  messageElt.textContent = message;
  messagesContainer.append(messageElt);
  window.scrollTo(0, document.body.scrollHeight);
};

const STATE = { IN_PROMPT: 0, IN_MENU: 1, IN_CHAT: 2 };
let state = STATE.IN_MENU;
class Prompt {
  callback = undefined;

  question(string, callback) {
    state = STATE.IN_PROMPT;
    this.response = "";
    this.callback = callback;
    postMessage(string);
  }

  answer(value) {
    if (this.callback) {
      this.callback(value);
      this.callback = undefined;
    }
    state = STATE.IN_MENU;
  }
}

class Observable {
  observer = [];

  subscribe(obs) {
    this.observer.push(obs);
  }
  unsubscribe(obs) {
    this.observer.splice(this.observer.indexOf(obs), 1);
  }

  update(value) {
    for (let observer of this.observer) {
      observer.notify(value);
    }
  }
}

// const userInfo = window.electron.userInfo;
const getUserData = window.electron.getUserData;
const saveUserData = window.electron.saveUserData;
const userInfo = { username: "NO-NAME", domain: "My-PC" };
const isInConversationMode = false;

const prompt = new Prompt();
const inputObservable = new Observable();
// ELEMENT DOM
const messagesContainer = document.getElementById("messagesContainer");
const input = document.getElementById("input");
const debug = document.getElementById("debug");
const cursor = document.getElementById("cursor");
const pseudoElt = document.getElementById("pseudo");

// const socket = io("http://localhost:888/");
const pseudo = () => `${userInfo.username}@${userInfo.domain} ~ $`;
const messagesStack = [];
pseudoElt.textContent = pseudo();
input.focus();
input.addEventListener("blur", function (event) {
  this.focus();
});

input.addEventListener("keyup", function (event) {
  let commande = undefined;
  if (event.key === "Enter") {
    commande = input.textContent;
    switch (state) {
      case STATE.IN_MENU:
        break;
      case STATE.IN_CHAT:
        socket.emit("message", pseudo() + " " + commande);
        break;
      case STATE.IN_PROMPT:
        prompt.answer(commande);
        break;
      default:
        break;
    }
    const message = pseudo() + " " + commande;
    input.innerHTML = "";
    postMessage(message);
  }
});

// socket.on("receive-message", (message) => {
//   postMessage(message);
// });

prompt.question("Choose a pseudo :", (value) => {
  userInfo.username = value;
  pseudoElt.textContent = pseudo();
});

console.log(saveUserData({ username: undefined, theme: "dark" }));
getUserData().then((data) => {
  console.log(data);
});
