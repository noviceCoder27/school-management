import express from 'express'
const router = express.Router();
import tryCatch from '../utils/globalTryCatch.js';
import { addTeacher, deleteTeacher, getAllTeachers, getTeacherDetails, updateTeacherDetails } from '../controllers/teacherControllers.js';

router.get('/',tryCatch(getAllTeachers))
router.post('/add',tryCatch(addTeacher))
router.get('/:id',tryCatch(getTeacherDetails));
router.delete('/:id',tryCatch(deleteTeacher));
router.patch('/:id',tryCatch(updateTeacherDetails));

export default router;