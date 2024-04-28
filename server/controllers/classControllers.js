import Student from "../models/studentModel.js";
import Teacher from "../models/teacherModel.js";
import Class from "./../models/classModel.js"



export const getAllData = async(req,res) => {
    const classes = await Class.find({});
    const students = await Student.find({});
    const teachers = await Teacher.find({});
    const years = classes.map(classObj => classObj.year);
    const months = classes.map(classObj => classObj.month);
    res.status(200).json({classCount: classes.length,studentCount:students.length,teacherCount: teachers.length,years,months});
}

export const getAllClasses = async(req,res) => {
    const classes = await Class.find({});
    res.status(200).json(classes)
}

export const getClassDetails = async(req,res) => {
    const {id} = req.params;
    const classDetails = await Class.findOne({_id: id});
    res.status(200).json(classDetails)    
}

export const getClassNames = async(req,res) => {
    const classes = await Class.find({});
    const names = classes.map(classObj => classObj.className);
    res.status(200).json(names)
}


export const addClass = async(req,res) => {
    const {className,year,month} = req.body;
    const findClass = await Class.findOne({className});
    if(!findClass) {
        const classData = await Class.create({className, year,month});
        res.status(201).json(classData);
    }else {
        res.status(400).json({msg: "Class already exists"});
    }  
    
}

export const deleteClass = async(req,res) => {
    const {id: _id} = req.params;
    const classDetails = await Class.findByIdAndDelete(_id);
    const {students,teachers} = classDetails;
    await Student.deleteMany({_id: {$in: students}});
    await Teacher.deleteMany({_id: {$in: teachers}});
    res.status(201).json(classDetails);
}

export const updateClassDetails = async(req,res) => {
    const {className,month,year} =req.body;
    const {id: _id} = req.params;
    await Class.findByIdAndUpdate(_id,{className,month,year});
    res.status(201).json({msg: "Successfully updated class details"});
}

export const getIncomeDetails = async(req,res) => {
    const {time,year,month} = req.query;
    const timeBool = time === "true"? true: false;
    const classes = await Class.find(timeBool ? {year}: {month});
    let totalExpense = 0;
    let totalFees = 0;
    for (const cls of classes) {
        const teachers = await Teacher.find({ _id: { $in: cls.teachers } });
        const teacherSalaries = teachers.reduce((acc, teacher) => acc + teacher.salary, 0);
        totalExpense += teacherSalaries;
        const students = await Student.find({ _id: { $in: cls.students }});
        const studentFees = students.reduce((acc, student) => acc + student.fees, 0);
        totalFees += studentFees;
    }
    res.json({expense: totalExpense,income: totalFees - totalExpense});   
}

