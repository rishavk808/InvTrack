const mongoose = require('mongoose');

const InventoryLogSchema = new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
  staffId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  qtyChange:Number,
  reason:{type:String, enum:['SALE','RECEIVE','ADJUST']},
  relatedInvoiceId:{type:mongoose.Schema.Types.ObjectId, ref:'Sale', default:null},
  notes:String
},{timestamps:true});

module.exports = mongoose.model('InventoryLog',InventoryLogSchema);
