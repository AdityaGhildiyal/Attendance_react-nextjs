import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: String, required: true },
  campus: { type: String, required: true },
  course: { type: String, required: true },
  specialization: { type: String, required: true },
  yearSem: { type: String, required: true },
  branch: { type: String, required: true },
  section: { type: String, required: true },
  classRollNo: { type: String, required: true, unique: true },
  universityRollNo: { type: String, required: true, unique: true },
  highschoolPercentage: { type: String, required: true },
  intermediatePercentage: { type: String, required: true },
  password: { type: String, required: true },
});

const Student = mongoose.models.students || mongoose.model("students", studentSchema);

export default Student;
