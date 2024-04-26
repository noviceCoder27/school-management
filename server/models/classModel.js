import mongoose from "mongoose";


const ClassSchema = new mongoose.Schema({
  className: {type: String,required: true},
  year: {type: Number,required: true},
  month: {type: Number,required: true},
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher',default: []}],
  studentFees: {type:Number, required: true,default: 0},
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student',default: []}]
},{
  timestamps: true
});

const Class = mongoose.model('Class', ClassSchema);

export default Class;

