const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
  message:String,
  level:{type:String, enum:['warning','critical'], default:'warning'},
  isRead:{type:Boolean, default:false}
},{timestamps:true});

module.exports = mongoose.model('Notification',NotificationSchema);
