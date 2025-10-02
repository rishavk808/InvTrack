const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  invoiceNumber:String,
  staffId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  items:[{
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
    qty:Number,
    unitPrice:Number,
    discount:Number,
    taxPercent:Number,
    lineTotal:Number
  }],
  payments:[{
    method:{type:String, enum:['CASH','CARD','UPI','SPLIT']},
    amount:Number,
    transactionId:String
  }],
  grandTotal:Number,
  status:{type:String, enum:['PAID','PENDING','CANCELLED'], default:'PAID'},
  notes:String
},{timestamps:true});

module.exports = mongoose.model('Sale',SaleSchema);
