const Plan = require('../models/plan');
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';


exports.storePlan = (req:Request, res:Response, next:NextFunction) => {
    let { encodedpoly, orig, dest,  date, aircraft, flight, flightime }:{ encodedpoly:string, orig:string, dest:string,  date:string, aircraft:string, flight:string, flightime:number } = req.body;

    let errors:Object[] = [];

    if (!orig) {
      errors.push({ orig: "required" });
    }
    if (!dest) {
      errors.push({ dest: "required" });
    }
    if (!aircraft) {
      errors.push({ aircraft: "required" });
    }
    if (!flight) {
        errors.push({ flight: "required" });
      }

    if (errors.length > 0) {
      return res.status(401).json({ errors: errors });
    }

    const plan = new Plan({
        encodedpoly: encodedpoly,
        orig: orig,
        dest: dest,
        date: date,
        aircraft: aircraft,
        flight:flight,
        flightime: flightime,
      })

      plan.save()
      .then((response:Response) => {
       return  res.status(200).json({
           success: true,
           result: response
         })
      }).catch((err:Error) => {
      return  res.status(500).json({
           errors: [{ error: err }]
        });
     })

    }