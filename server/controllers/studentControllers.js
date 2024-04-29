import Class from "../models/classModel.js";
import Student from "../models/studentModel.js"

export const getAllStudents = async(req,res) => {
    const {search} = req.query;
    let students;
    if(search) {
        students = await Student.find({
            name: {
                $regex: search,
                $options: 'i'
            }
        });
    } else {
        students = await Student.find({});
    }
    res.status(200).json(students);
}

export const getStudentCount = async(req,res) => {
    const students = await Student.find({});
    res.status(200).json({count: students.length}); 
}


export const getStudentDetails = async(req,res) => {
    const {id} = req.params;
    const student = await Student.findOne({_id: id});
    res.status(200).json(student);
}

export const addStudent = async(req,res) => {
    const {name,gender,dob:dateOfBirth,contact:contactDetails,fees,className} = req.body;
    const classDetails = await Class.findOne({className});
    if(classDetails) {
        const {_id,students} = classDetails;
        if(students.length < 10) {
            const student = await Student.create({name,gender,dateOfBirth,fees,contactDetails,assignedClass: _id,className});
            await Class.findByIdAndUpdate(_id, {$push: {students: student._id}, $inc: {studentFees: fees}});
            res.status(201).json(student);
        } else {
            res.status(400).json({msg: "Class limit reached"});
        } 
    } else {
        res.status(404).json({msg: "Class not found"})
    }
}

export const deleteStudent = async(req,res) => {
    const {id: _id} = req.params;
    const student = await Student.findByIdAndDelete(_id);
    const {assignedClass,_id:student_id} = student;
    const classDetails = await Class.findOne({_id: assignedClass});
    const {students} = classDetails;
    const updatedData = [];
    for(const studentId of students) {
        if(String(studentId) !== String(student_id)) {
            updatedData.push(studentId);
        }
    }
    classDetails.students = updatedData;
    classDetails.studentFees -= student.fees;
    classDetails.save();
    res.status(201).json(student);
}

export const updateStudentDetails = async(req,res) => {
    const {name,gender,contactDetails,fees} =req.body;
    const {id: _id} = req.params;
    await Class.findByIdAndUpdate(_id,{name,gender,contactDetails,fees});
    res.status(201).json({msg: "Successfully updated student details"});
}



