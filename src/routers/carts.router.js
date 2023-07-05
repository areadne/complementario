import { Router, query } from "express";
import "/Users/luis_/OneDrive/Documents/Areadne/Backend/Primera-pre-entrega/src/data/cart.json" assert { type: "json" };
// import fs, { writeFile } from "fs";
import { ProductManager } from "../dao/file-manager/productManager.js";
import { MongoDBProductManager } from "../dao/mongo-manager/product.manager.js";
import { cartManagerDB } from "../dao/mongo-manager/cart.manager.js";

const router = Router();
const manager = new ProductManager(
  "/Users/luis_/OneDrive/Documents/Areadne/Backend/Primera-pre-entrega/src/data/cart.json"
);

const managerDB = new cartManagerDB()

router.post("/", async (request, response) => {
  managerDB.createCart(request, response);
});

router.get("/:cid", async (request, response) => {
  const id = Number(request.params.cid);

  await managerDB.getProductById(id, response);
});

router.post("/:cid/products/:pid", async (request, response) => {
  managerDB.addProductInCart(request, response);
});

export default router;
