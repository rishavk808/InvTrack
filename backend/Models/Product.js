const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name:String,
  barcode:String,
  price:Number,
  costPrice:Number,
  stock:Number,
  threshold:Number,
  category:String,
  taxPercent:Number
},{timestamps:true});

module.exports = mongoose.model('Product',ProductSchema);
