const mongoose = require("mongoose");

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true }
})

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
//employees , a new table will be created in db
const employeeModel = mongoose.model("employees", employeeSchema);
//products , a new table will be created in db
const productModel = mongoose.model("products", productSchema);

module.exports = {
  employeeModel,
  productModel,
};
