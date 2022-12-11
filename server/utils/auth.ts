const jwt = require("jsonwebtoken");

exports.createJWT = ( email:string, userId:any, duration:number) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};