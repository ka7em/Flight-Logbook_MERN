const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {createJWT} = require("../utils/auth");
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import jwtDecode from 'jwt-decode'
import { nextTick } from 'process';
import axios from 'axios'
// next can be added when necessary

exports.signup = (req:Request, res:Response, next:NextFunction) => {
  let { name, fname, lname,  email, password, password_confirmation }:{name:string, fname:string, lname?:string,  email:string, password:string, password_confirmation?:string} = req.body;
  let errors:Object[] = [];

  if (!name) {
    errors.push({ name: "required" });
  }
  if (!fname) {
    errors.push({ fname: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
     password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
    return res.status(421).json({ errors: errors });
  }
  if (errors.length > 0) {
    return res.status(401).json({ errors: errors });
  }

 User.findOne({email: email})
    .then((user:any)=>{
       if(user){
         return res.status(423).json({ errors: { user: "email already exists" } });
       }else {
         const user = new User({
           name: name,
           fname: fname,
           lname: lname,
           email: email,
           password: password,
         });
 bcrypt.genSalt(10, function(err:Error, salt:any) { bcrypt.hash(password, salt, function(err:Error, hash:any) {
         if (err) throw err;
         user.password = hash;

         user.save()
             .then((response:Response) => {
              return  res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch((err:Error) => {
             return  res.status(500).json({
                  errors: [{ error: err }]
               });
            });
         });
      });
     }
  }).catch((err:Error) =>{
     return res.status(501).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })


}
////////////-----------------------------------------//////////////////////////////////////------------//////


exports.signin = (req:Request, res:Response) => {

  let  {email, password}  = req.body;

  User.findOne({ email: email }).then((user:any) => {
       bcrypt.compare(password, user.password).then((isMatch:boolean)=> {
          if (!isMatch) {
           return res.status(400).json({ errors: [{ password:
"incorrect" }]
           });
          }
    let access_token = createJWT(
      user.email,
      user._id,
      3600
    );
    jwt.verify(access_token, process.env.TOKEN_SECRET, (err: any,decoded: any) => {
      if (err) {
         res.status(500).json({ erros: err });
      }
      if (decoded) {
          return res.status(200).json({
             success: true,
             token: access_token,
             message: user
          });
        }
      });
     }).catch((err: any) => {
       res.status(500).json({ erros: err });
     });
  // }
}).catch((err: any )=> {
   res.status(500).json({ erros: err });
});
}







