const Plan = require('../models/plan');
import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';

exports.getAllPlans= async(req:Request,res:Response)=>{

    // const data = await Plan.find()
    // res.send(data);
let errors: object[] = []
try {
        const data = await Plan.find()
            res.send(data);
}
 catch(err:any) {
    res.status(500).send({ message: err.message });
 }
}

