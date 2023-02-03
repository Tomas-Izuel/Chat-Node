const botValidator = (message) => {
  if (message.substr(0, 1) === "!") {
    return true;
  } else {
    return false;
  }
};

const socket = io();

const formMessage = document.getElementById("formMessage");
const message = document.getElementById("message");
const chat = document.getElementById("chat");

let user;

Swal.fire({
  title: "Welcome",
  text: "Select your username",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "A username is required";
    }
  },
}).then((username) => {
  Swal.fire({
    position: "center",
    icon: "info",
    title: "You can use the bot with: !joke, !fact",
    showConfirmButton: false,
    timer: 2500,
  });
  user = username.value;
  sessionStorage.setItem("user", user);
});

formMessage.onsubmit = (e) => {
  e.preventDefault();

  const date = new Date();

  const ObjMessage = {
    user: user,
    image:
      "https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc=",
    message: message.value,
    date: date.toLocaleString(),
    bot: false,
  };

  if (botValidator(message.value)) {
    ObjMessage.message = message.value.substr(1, message.value.length - 1);
    ObjMessage.bot = true;
  }
  socket.emit("sendMessage", ObjMessage);
  message.value = "";
};

socket.on("sendChat", (messageCards) => {
  const chatRender = messageCards.map((card) => {
    if (sessionStorage.getItem("user") === card.user) {
      return `<div class="flex justify-start items-start flex-col gap-2 bg-emerald-50 w-96 text-slate-900 p-6 rounded-xl">
          <div class="flex justify-start items-center gap-4">
            <img src="${card.image}" alt="" class="w-10 h-10 rounded-full" />
            <h3 class="text-xl text-medium">${card.user}</h3>
          </div>
          <p>${card.message}</p>
          <p class="text-slate-400">${card.date}</p>
        </div>`;
    } else {
      return `<div class="flex justify-start items-start flex-col gap-2 bg-slate-100 w-96 text-slate-900 p-6 rounded-xl">
          <div class="flex justify-start items-center gap-4">
            <img src="https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc=" alt="" class="w-10 h-10 rounded-full" />
            <h3 class="text-xl text-medium">${card.user}</h3>
          </div>
          <p>${card.message}</p>
          <p class="text-slate-400">${card.date}</p>
        </div>`;
    }
  });
  chat.innerHTML = chatRender;
});
