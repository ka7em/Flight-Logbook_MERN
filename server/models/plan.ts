import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let planSchema = new Schema({
   encodedpoly:{
     type: String,
     required: false
   },
   orig:{
      type: String,
      required: true
   },
   dest:{
    type: String,
    required: true
   },
   date:{
    type: String ,
    required: false
 },
   aircraft: {
      type: String,
      required: true
   },
   flight: {
      type: String,
      required: true
   },
   flightime: {
    type: Number,
    required: true
 },
},{
   timestamps: true,
   collection: 'plan'
})

module.exports = mongoose.model('plan', planSchema);