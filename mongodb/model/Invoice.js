const mongoose = require('mongoose');
const { Schema } = mongoose;

const InvoiceSchema = new mongoose.Schema({
    
  Currency: {
    type: String,
    default: ''
  },
  Inv_Basic_Amt: {
    type: Number,
    default: 0
  },
  Inv_Tax_Amt: {
    type: Number,
    default: 0
  },
  Total_Inv_Amt: {
    type: Number,
    default: 0
  },
  Advanced_Paid: {
    type: String,
    default: ''
  },
  TDS_Applicable: {
    type: String,
    default: ''
  },
  Net_Payable_Amt: {
    type: Number,
    default: 0
  },
  payee1:{
    type:String,
    default: ''
  },
  payee2:{
    type:String,
    default: ''
  },
  city:{
    type:String,
    default: ''
  },
  street:{
    type:String,
    default: ''
  },
  country:{
    type:String,
    default: ''
  },
  IFSC_code:{
    type:String,
    default: ''
  },
  Acc_Number:{
    type:Number,
    default: 0
  },
  Reference:{
    type:String,
    default: ''
  },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);