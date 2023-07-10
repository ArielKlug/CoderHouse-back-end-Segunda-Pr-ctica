class ViewsController {
  register = (req, res) => {
    res.render("registerForm", {
      style: "index.css",
    });
  };
  login = (req, res) => {
    res.render("login", {
      style: "index.css",
    });
  };
  restorePass = (req, res) => {
    res.render("passRestore", {
      style: "index.css",
    });
  };
  
}
module.exports = new ViewsController();
