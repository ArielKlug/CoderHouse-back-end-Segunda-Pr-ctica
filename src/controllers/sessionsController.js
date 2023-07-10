const CartManagerMongo = require("../daos/mongo/cartManagerMongo");
const userManagerMongo = require("../daos/mongo/userManagerMongo");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const { generateToken } = require("../utils/generateTokenJwt");
const userMongo = new userManagerMongo();
const cartManager = new CartManagerMongo();
class SessionsController {
  register = async (req, res) => {
    try {
      const { age, first_name, last_name, email, password } = req.body;

      const idCart = await cartManager.addCart();
      if (!age || !first_name || !last_name || !email || !password) {
        res.userError("All fields are necesary");
      }
      const newUser = {
        first_name: first_name,
        last_name: last_name,
        age: age,
        email: email,
        password: createHash(password),
        cartId: idCart,
        role: "user",
      };

      const userId = await userMongo.addUser(newUser);

      if (!userId) {
        res.send({ status: "error", error: "Error creating new user" });
      }

      await cartManager.updateCart(idCart, userId);

      res.status(200).redirect("http://localhost:8080/");
    } catch (error) {
      res.sendServerError(error);
    }
  };
  login = async (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "") {
      return res.send("Complete todos los campos para iniciar sesión");
    }
    const userDB = await userMongo.findUser({ email });

    let verifyPass = isValidPassword(password, userDB);

    if (!userDB) {
      return res.send({
        status: "error",
        message: "No existe ese usuario, revise los campos",
      });
    }
    if (!verifyPass) {
      return res.userError("Email or password incorrect");
    }
    let userToToken = {
      first_name: userDB.first_name,
      last_name: userDB.last_name,
      age: userDB.age,
      email: userDB.email,
      cartId: userDB.cartId,
      role: userDB.role,
    };

    const access_token = generateToken(userToToken);
    if (!access_token) {
      return res.send({
        status: "error",
        message: "Token generation error",
      });
    }

    res
      .cookie("coderCookie", access_token, {
        maxAge: 60 * 60 * 100 * 10000,
        httpOnly: true,
      })
      .redirect("http://localhost:8080/api/products");
  };

  restorePass = async (req, res) => {
    const { email, password } = req.body;

    const userDB = await userMongo.findUser({ email });

    if (!userDB) {
      return res
        .status(401)
        .send({ status: "error", message: "El usuario no existe" });
    }

    userDB.password = createHash(password);
    await userDB.save();

    res.status(200).send({
      status: "success",
      message: "Contraseña actualizada correctamente",
    });
  };
  failRegister = async (req, res) => {
    console.log("Falla en estrategia de autenticación");
    res.send({
      status: "error",
      message: "Falló la autenticación del registro",
    });
  };
  failLogin = async (req, res) => {
    console.log("Falla en estrategia de autenticación");
    res.send({ status: "error", message: "Falló la autenticación del login" });
  };
  current = async (req, res) => {
    res.send(req.user);
  };
}

module.exports = { SessionsController };
