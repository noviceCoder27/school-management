import express from 'express'
const router = express.Router();
import tryCatch from '../utils/globalTryCatch.js';
import { getClassDetails,addClass,deleteClass,updateClassDetails, getAllClasses, getClassNames, getAllData, getIncomeDetails } from '../controllers/classControllers.js';

router.get('/',tryCatch(getAllClasses));
router.get('/all',tryCatch(getAllData));
router.get('/income', tryCatch(getIncomeDetails));
router.get('/names',tryCatch(getClassNames));
router.get('/:id',tryCatch(getClassDetails));
router.post('/add',tryCatch(addClass));
router.delete('/:id',tryCatch(deleteClass));
router.patch('/:id',tryCatch(updateClassDetails));

export default router;