import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = mongoose.Schema({
  id: { type: Number },
  products: {
    type: [
      {
        product: { type: Number },
        quantity: { type: Number },
      },
    ]
    ,
    default: []
  },
});

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel