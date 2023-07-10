const { userModel } = require("../../models/userModel");

class UserManagerMongo {
  addUser = async (newUser) => {
    try {
      const { first_name, last_name, age, email, password, cartId, role } =
        newUser;
      const user = await userModel.create({
        first_name,
        last_name,
        age,
        email,
        password,
        cartId,
        role,
      })
      return user._id;
    } catch (error) {
      return new Error(error);
    }
  };

  findUser = async (email) => {
    try {
      return await userModel.findOne(email);
    } catch (error) {
      console.log(error);
    }
  };
  findUserRegistered = async (email, password) => {
    try {
      return await userModel.findOne({ email, password });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserManagerMongo;
