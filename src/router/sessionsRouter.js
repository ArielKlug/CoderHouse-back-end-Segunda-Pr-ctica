const { SessionsController } = require("../controllers/sessionsController");
const { passportAuth } = require("../passportConfig/passportAuth");
const { RouterClass } = require("./routerClass");
const session = new SessionsController()

class SessionsRouter extends RouterClass {
  init() {
    this.post("/register", ['PUBLIC'],session.register);
    this.post("/login",['PUBLIC'], session.login);
    this.post("/restaurarpass",['PUBLIC'], session.restorePass);
    this.get("/failregister", ['PUBLIC'],session.failRegister);
    this.get("/faillogin",['PUBLIC'], session.failLogin);
    this.get("/current",['USER', 'USER_PREMIUM', 'ADMIN'], passportAuth('current'), session.current);
  }
}

module.exports = { SessionsRouter };
