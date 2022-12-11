import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let userSchema = new Schema({
   name:{
      type: String,
      required: true
   },
   fname:{
    type: String,
    required: true
   },
   lname:{
    type: String || null,
    required: false
 },
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
},{
   timestamps: true,
   collection: 'users'
})

module.exports = mongoose.model('user', userSchema);