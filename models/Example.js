const mongoose = require("mongoose"); //import mongoose
const Schema = mongoose.Schema; //get class schema from mongoose

//Create Schema
const ExampleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//Create Model
module.exports = Item = mongoose.model("Item", ExampleSchema);
