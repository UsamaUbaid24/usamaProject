const mongoose = require("mongoose");
const ServiceSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  service: {
    type: String,
    require: true,
  }, 
  price: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("service", ServiceSchema);
