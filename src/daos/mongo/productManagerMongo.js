const { productModel } = require("../../models/productModel");

class ProductManagerMongo {
  async getProducts() {
    try {
      return await productModel.find()
    } catch (err) {
      return new Error(err);
    }
  }
  async paginate(query, limit, page, sort) {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }
  async getProductById(pid) {
    try {
      return await productModel.findOne({ _id: pid });
    } catch (error) {
      return new Error(error);
    }
  }
  async addProduct(prod) {
    try {
      const codeCheck = await this.getProducts();

      if (codeCheck.find((item) => item.code === prod.code)) {
        return res.send({
          status: "error",
          mensaje: "Ya existe un producto con ese código",
        });
      } else {
        let newProduct = {
          title: prod.title,
          description: prod.description,
          price: prod.price,
          thumbnail: prod.thumbnail,
          code: prod.code,
          stock: prod.stock,
          category: prod.category
        };
         await productModel.create(newProduct);
      }
    } catch (error) {
      return new Error(error);
    }
  }
  async updateProduct(pid, prodToReplace) {
    try {
      await productModel.updateOne({ _id: pid }, prodToReplace);
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(pid) {
    try {
      await productModel.deleteOne({ _id: pid });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductManagerMongo;
