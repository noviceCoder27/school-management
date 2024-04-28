import mongoose from "mongoose";


const TeacherSchema = new mongoose.Schema({
    name: {type: String, required: true},
    gender: {type: String, required: true},
    dateOfBirth: {type: String, required: true},
    contactDetails: {type: String, required: true},
    salary: {type: Number, required: true},
    assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    className: {type: String,required: true}
},{timestamps: true});

const Teacher = mongoose.model('Teacher', TeacherSchema);

export default Teacher;