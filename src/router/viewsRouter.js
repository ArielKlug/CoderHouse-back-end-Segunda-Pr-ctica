const { restorePass, login, register } = require("../controllers/viewsController");
const { RouterClass } = require("./routerClass");


class ViewsRouter extends RouterClass{
    init(){
        this.get("/views/register", ['PUBLIC'], register);
        this.get("/",['PUBLIC'], login);
        this.get('/views/passRestore',['PUBLIC'], restorePass)
    
       
    
    
    
    }
}

module.exports = {ViewsRouter}







