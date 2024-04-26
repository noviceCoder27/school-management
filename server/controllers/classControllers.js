import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import Class from "./../models/classModel.js"


export const getAllDetails = async(req,res) => {
    const classes = await Class.find({});
    res.status(200).json(classes)
}

export const getClassDetails = async(req,res) => {
    const {id} = req.params;
    const classDetails = await Class.findOne({_id: id});
    res.status(200).json(classDetails)    
}

export const addClass = async(req,res) => {
    const {className,year,month} = req.body;
    await Class.create({className, year,month});
    res.status(201).json({msg: "Successfully created class"});
}

export const deleteClass = async(req,res) => {
    const {id: _id} = req.params;
    const classDetails = await Class.findByIdAndDelete(_id);
    const {students,teachers} = classDetails;
    await Student.deleteMany({_id: {$in: students}});
    await Teacher.deleteMany({_id: {$in: teachers}});
    res.status(201).json({msg: "Successfully deleted class"});
}

export const updateClassDetails = async(req,res) => {
    const {className,month,year} =req.body;
    const {id: _id} = req.params;
    await Class.findByIdAndUpdate(_id,{className,month,year});
    res.status(201).json({msg: "Successfully updated class details"});
}





