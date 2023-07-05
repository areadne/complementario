import express from "express";
import productRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";
import mongoose, { mongo } from "mongoose";
import handlebars from "express-handlebars";
import chatRouter from "./routers/chat.router.js";
import { Server } from "socket.io";
import messageModel from "./dao/models/messages.model.js";

const app = express();

app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");
app.use(express.static("./public"));

app.use("/api/products", productRouter);

app.use("/api/cart", cartRouter);

app.use("/chat", chatRouter);

try {
  await mongoose.connect(
    "mongodb+srv://coder:coder@cluster0.ywdnzff.mongodb.net/ecommerce"
  );

  const httpServer = app.listen(8080, () => {
    console.log("estoy en ejecucion");
  });

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("handshake");

    socket.on("message", async (data) => {
      console.log(data);
      messageModel.create({ user: "Persona", message: data });

      try {
        const historial = async () => {
          return await messageModel.find();
        };
        const result = await historial();
        console.log(result);
        io.emit("historial", result);
      } catch (err) {
        console.log(err);
      }
    });
  });
} catch (error) {
  console.log(error);
}
