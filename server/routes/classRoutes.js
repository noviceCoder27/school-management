import express from 'express'
const router = express.Router();
import tryCatch from '../utils/globalTryCatch.js';
import { getClassDetails,addClass,deleteClass,updateClassDetails } from '../controllers/classControllers.js';

router.get('/:id',tryCatch(getClassDetails));
router.post('/add',tryCatch(addClass));
router.delete('/:id',tryCatch(deleteClass));
router.patch('/:id',tryCatch(updateClassDetails));

export default router;