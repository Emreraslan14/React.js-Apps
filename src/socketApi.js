import io from "socket.io-client";

let socket;
export const init = () => {
  console.log("Bağlanılıyor.");

  socket = io("http://localhost:3000", {
    transports: ["websocket"],
  });

  socket.on("connect", () => console.log("Bağlantı kuruldu."));
};

export const sendMessage = (message) => {
  if (socket) socket.emit("new-message", message);
};

export const subscribeChat = (cb) => {
  if (socket)
    socket.on("receive-message", (message) => {
      console.log("yeni mesaj var", message);
      cb(message);
    });
};

export const subInitMessages = (cb) => {
  if (!socket) return;

  socket.on("message-list", (messages) => {
    console.log("Eski mesajlar yüklendi.",messages);
    cb(messages);
  });
};
