import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
const Plan = require('../models/plan');
var ObjectId = require('mongodb').ObjectId;
    // const data = await Plan.find()
    // res.send(data);
let errors: object[] = []


exports.deleteplan = async (req:Request, res:Response) => {
    try {
      const id = req.params.id;
      const data = await Plan.findByIdAndDelete(id);
      res.send(`Document with ${data._id} has been deleted..`);
    } catch (error:any) {
      res.status(400).send({ message: error.message });
    }
  };