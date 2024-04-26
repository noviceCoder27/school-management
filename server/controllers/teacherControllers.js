import Class from '../models/classModel.js';
import Teacher from './../models/teacherModel.js'


export const getTeacherDetails = async(req,res) => {
    const {id} = req.params;
    const teacherDetails = await Teacher.findOne({_id:id});
    res.status(200).json(teacherDetails);
}

export const addTeacher = async(req,res) => {
    const {name,gender,dateOfBirth,contactDetails,salary,className} = req.body;
    const classDetails = await Class.findOne({className});
    if(classDetails) {
        const {_id,teachers} = classDetails;
        if(teachers.length < 3) {
            const teacher = await Teacher.create({name,gender,dateOfBirth,salary,contactDetails,assignedClass: _id});
            await Class.findByIdAndUpdate(_id, {$push: {teachers: teacher._id}});
            res.send({msg: "Teacher assigned successfully"});
        } else {
            res.status(400).json({msg: "Class limit reached"});
        } 
    } else {
        res.status(404).json({msg: "Class not found"})
    }
}

export const deleteTeacher = async(req,res) => {
    const {id: _id} = req.params;
    const teacher = await Teacher.findByIdAndDelete(_id);
    const {assignedClass,_id:teacher_id} = teacher;
    const classDetails = await Class.findOne({_id: assignedClass});
    const {teachers} = classDetails;
    const updatedData = [];
    for(const teacherId of teachers) {
        if(String(teacherId) !== String(teacher_id)) {
            updatedData.push(teacherId);
        }
    }
    classDetails.teachers = updatedData;
    classDetails.save();
    res.status(201).json({msg: "Succesfully deleted teacher"});
}

export const updateTeacherDetails = async(req,res) => {
    const {name,gender,contactDetails,salary} = req.body;
    const {id: _id} = req.params;
    await Class.findByIdAndUpdate(_id,{name,gender,contactDetails,salary});
    res.status(201).json({msg: "Successfully updated teacher details"});
}