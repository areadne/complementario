import cartModel from "../models/cart.model.js";
import productsModel from "../models/products.model.js";

export class cartManagerDB {
  constructor() {}

  createCart = async (request, response) => {
    let id;
    let readFile = await cartModel.find();

    id = readFile.length === 0 ? 1 : readFile[readFile.length - 1].id + 1;

    await cartModel.create({
      id,
    });

    response.send("cart created");
  };

  getProductById = async (id, response) => {
    let readFile = await cartModel.find();

    let search = readFile.find((el) => el.id === id);

    search ? search : (search = "Not found");

    response.send(search);
  };

  addProductInCart = async (request, response) => {
    const cid = Number(request.params.cid);
    const pid = Number(request.params.pid);

    const readCartFile = await cartModel.find();
    const readProductsFile = await productsModel.find();

    const validateCid = readCartFile.find((item) => item.id === cid);
    const validatePid = readProductsFile.find((item) => item.id === pid);

    if (validateCid === undefined || validatePid === undefined) {
      response.status(400).send("Cart or product id does not exist");
      return;
    }

    const itemsCurrentCart = await readCartFile.filter(
      (item) => item.id != cid
    );

    const validatePidInArray = validateCid.products.find(
      (item) => item.product === pid
    );

    const otherProductsInCart = validateCid.products.filter(
      (item) => item.product != pid
    );

    // console.log(validateCid);

    if (validateCid.products.length === 0 || validatePidInArray === undefined) {
      //   const nuevoItem = { product: pid, quantity: 1 };

      await cartModel.findOneAndUpdate(validateCid._id, {
        $push: { products: [{ product: pid, quantity: 1 }] },
      });

      response.send("Cart updated successfully");
      return;
    }

    // let newCartContent;

    if (validatePidInArray) {
      await cartModel.findOneAndUpdate(validateCid._id, {
        $push: { products: [{ product: pid, quantity: 1 }] },
      });

      response.send("Cart updated successfully");
      return;
      //   let newProductContent = {
      //     id: cid,
      //     products: [
      //       ...otherProductsInCart,
      //       { product: pid, quantity: validatePidInArray.quantity + 1 },
      //     ],
      //   };

      //   newCartContent = [...itemsCurrentCart, newProductContent];

      //   this.orderArray(newCartContent);
      //   const itemFounded = await validateCid.products.filter(
      //     (item) => item.product === pid
      //   );

      //   console.log(validateCid._id);

      //   for (const document of itemFounded) {
      //     console.log("Documento:", document);
      //     const { _id, product } = document;
      //     console.log(_id);

      // const idDocumento = validateCid._id;
      // const productId = _id;
      // const newQuantity = 2;

      // cartModel.findOneAndUpdate(
      //   { _id: idDocumento, id: productId },
      //   { $set: { quantity: newQuantity } },
      //   { new: true }
      // );
      // // console.log(itemFounded);

      // console.log(validatePidInArray.quantity);
      // quantity: validatePidInArray.quantity + 1,
      // const nuevoItem = {
      //   product: pid,
      //   quantity: 100,
      // };
      // //     const nuevoItem = {
      // //     //   product: pid,
      // //       quantity: 100,
      // //     };
      // await cartModel.findOneAndUpdate(_id, { quantity: 100 });

      // const filter = { product: 2 };
      // const update = { quantity: 59 };

      // await cartModel.findOneAndUpdate(_id, update);
      //   }

    //   response.send("Cart updated successfully");
    }
  };
}
