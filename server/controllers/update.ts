const Plan = require('../models/plan');
import { NextFunction, Request, Response } from 'express';


exports.updatePlan = async (req:Request, res:Response) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const options = { new: true };

      const result = await Plan.findByIdAndUpdate(id, updatedData, options);

      res.send(result);
    } catch (error:any) {
      res.status(400).send({ message: error.message });
    }
  }