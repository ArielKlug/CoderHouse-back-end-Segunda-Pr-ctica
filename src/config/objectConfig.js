const { connect } = require("mongoose");

const JWT_PRIVATE_KEY = 'CoderPalabraTOPSecreta'
const url =
  "mongodb+srv://ArielKlug:gAlu9Nr8tC0xp2hO@proyect0.0lbl7pm.mongodb.net/Ecommerce?retryWrites=true&w=majority";

module.exports = {
  JWT_PRIVATE_KEY,
  connectDB: () => {
    
    connect(url);
    console.log('DB conectada con éxito');
  },
};
