import mongoose from "mongoose";

const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true},
  title: { type: String, required: true},
  description: { type: String, required: true},
  price: { type: Number, required: true},
  thumbnail: { type: Array, required: true},
  code: { type: Number, unique: true, required: true },
  stock: { type: Number, required: true},
  category: { type: String, required: true},
  status: { type: Boolean, default: true},
}
);

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel