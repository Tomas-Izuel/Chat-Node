import fs from "fs";
import { __dirname } from "./utils.js";

const path = __dirname + "/storage/bot.json";

export const botMessageMaker = async (Object) => {
  switch (Object.message) {
    case "joke":
      const botAnswer = JSON.parse(await fs.promises.readFile(path, "utf-8"));
      const jokes = botAnswer.find((answer) => answer.type === "jokes");
      const joke = jokes.content[1];
      Object.user = "ChatNTHBot!";
      Object.message = "Here a joke: " + joke;
      return Object;
      break;
    case "fact":
      const botAnswer2 = JSON.parse(await fs.promises.readFile(path, "utf-8"));
      const jokes2 = botAnswer2.find((answer) => answer.type === "facts");
      const joke2 = jokes2.content[1];
      Object.image =
        "https://img.freepik.com/premium-vector/cute-robot-waving-hand-cartoon-character-science-technology-isolated_138676-3155.jpg?w=2000";
      Object.user = "ChatNTHBot!";
      Object.message = "Here a fact: " + joke2;
      return Object;
      break;
  }
};
