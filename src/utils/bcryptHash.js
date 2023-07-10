const bcrypt = require('bcrypt')

//crear el hash
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

//comparar la password hasheada
const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)



module.exports = { createHash, isValidPassword }
