const cartManagerMongo = require("../daos/mongo/cartManagerMongo");
const carts = new cartManagerMongo();

class CartController {
  getOneCart = async (req, res) => {
    try {
      const { cid } = req.params;

      const cart = await carts.getCart(cid);

      if (!cart) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }

      const newCart = [];
      for (let i = 0; i < cart.products.length; i++) {
        newCart[i] = cart.products[i].product;
      }

      const flattenedCart = newCart.map((item) => ({
        _id: item._id,
        title: item.title,
        price: item.price,
        description: item.description,
        thumbnail: item.thumbnail,
        code: item.code,
        stock: item.stock,
        category: item.category,
      }));

      res.render("cart", {
        status: "success",
        newCart: flattenedCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getAllCarts = async (req, res) => {
    try {
      res.send(await carts.getCarts());
    } catch (error) {
      console.log(error);
    }
  };
  addProdToCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
  
      const findedCart = await carts.getCart(cid);
      const foundProductIndex = findedCart.products.findIndex(prod => prod.product.id === pid);
 
      if (foundProductIndex !== -1) {
        // El producto ya existe en el carrito, se incrementa la cantidad
        await carts.updateQuantityOfProduct(cid, pid);
      } else {
        // El producto no existe en el carrito, se agrega uno nuevo con cantidad 1
        await carts.addProduct(cid, pid, 1);
      }
  
      // Obtener el carrito actualizado después de la operación
      const updatedCart = await carts.getCart(cid);
  
      res.send({
        status: "success",
        payload: "El producto fue agregado con éxito",
        cart: updatedCart
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: "error",
        payload: "Error al agregar el producto al carrito",
      });
    }
  };
  
  
  
  emptyCart = async (req, res) => {
    try {
      const { cid } = req.params;
      await carts.emptyCart(cid);
      res.status(200).send(await carts.getCart(cid));
    } catch (error) {
      console.log(error);
    }
  };
  deleteProdFromCart = async (req, res) => {
    try {
      const { cid } = req.params;
      const { pid } = req.params;
      await carts.deleteProduct(cid, pid);
      res.send(await carts.getCart(cid));
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new CartController();
