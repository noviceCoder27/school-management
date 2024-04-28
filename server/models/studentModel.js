import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
    name: {type: String,required: true},
    gender: {type: String,required: true},
    dateOfBirth: {type: String,required: true},
    contactDetails: {type: String,required: true},
    fees: {type: Number,required: true},
    assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    className: {type: String,required: true}
},{timestamps: true});

const Student = mongoose.model('Student', StudentSchema);

export default Student;