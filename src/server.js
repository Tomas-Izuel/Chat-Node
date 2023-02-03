import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import { botMessageMaker } from "./botRouter.js";

const app = express();

const messageCards = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
  console.log(
    "\u001b[" +
      32 +
      "m" +
      "      * Server runing on: http://localhost:8080" +
      "\u001b[0m"
  );
});

export const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  socket.on("sendMessage", async (ObjMessage) => {
    if (!ObjMessage.bot) {
      messageCards.push(ObjMessage);
    } else {
      const botMessage = await botMessageMaker(ObjMessage);
      await messageCards.push(botMessage);
    }
    socketServer.emit("sendChat", messageCards);
  });
});
