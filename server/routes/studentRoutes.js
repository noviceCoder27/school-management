import express from 'express'
const router = express.Router();
import tryCatch from '../utils/globalTryCatch.js';
import { addStudent, deleteStudent, getAllStudents, getStudentDetails, updateStudentDetails } from '../controllers/studentControllers.js';

router.get('/',tryCatch(getAllStudents));
router.get('/:id',tryCatch(getStudentDetails));
router.post('/add',tryCatch(addStudent));
router.delete('/:id',tryCatch(deleteStudent));
router.patch('/:id',tryCatch(updateStudentDetails));

export default router;