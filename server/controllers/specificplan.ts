import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
const Plan = require('../models/plan');
var ObjectId = require('mongodb').ObjectId;
    // const data = await Plan.find()
    // res.send(data);
let errors: object[] = []


exports.specificPlan = async(req:Request, res:Response) => {

    try {
        const data = await Plan.findById(req.params.id);
      // Plan.findById(req.params.id);
      res.send(data);
    } catch (error:any) {
      res.status(500).send({ message: error.message });
    }
  };