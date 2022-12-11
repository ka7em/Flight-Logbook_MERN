const express = require('express');
const router = express.Router();
const { signup, signin} = require('../controllers/auth');
const { storePlan} = require('../controllers/newplan');
const { getAllPlans} = require('../controllers/allPlans');
const {specificPlan} = require('../controllers/specificPlan');
const {deleteplan} = require('../controllers/deletePlan');
const {updatePlan} = require('../controllers/update');

router.post('/signup', signup);
router.post('/signin', signin);
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
router.post('/savePlan', storePlan);
router.get('/getAll', getAllPlans);
router.get('/getOne/:id', specificPlan);
router.delete('/delete/:id', deleteplan);
router.patch("/update/:id", updatePlan);

module.exports = router;
